"""Analisa footage antes de editar.

Para cada video: ffprobe, transcricao palavra a palavra (faster-whisper, GPU se houver),
silencios, cortes de cena, loudness e contact sheet. Para musica (--musica): BPM e beats.

Uso:
  python analisar.py VIDEO [VIDEO...] --out PASTA [--lang pt] [--model large-v3-turbo] [--sem-voz]
  python analisar.py --musica MUSICA.mp3 --out PASTA

Saidas em PASTA:
  <nome>.json             tudo (probe, words[{i,w,s,e,p}], silences, scenes, loudness)
  <nome>_transcricao.txt  frases com indices de palavras -> para escolher takes e hook
  <nome>_sheet.jpg        contact sheet (24 frames)
  <musica>_beats.json     {bpm, beats[], downbeats[]}
"""
import argparse, glob, json, os, re, subprocess, sys

import numpy as np


def run(cmd, **kw):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", **kw)


def probe(path):
    r = run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", path])
    j = json.loads(r.stdout)
    v = next((s for s in j["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in j["streams"] if s["codec_type"] == "audio"), None)
    info = {"path": os.path.abspath(path), "duration": float(j["format"]["duration"]), "has_audio": a is not None}
    if v:
        num, den = v["r_frame_rate"].split("/")
        rot = 0
        for sd in v.get("side_data_list", []) or []:
            if "rotation" in sd:
                rot = int(sd["rotation"])
        w, h = v["width"], v["height"]
        if abs(rot) in (90, 270):
            w, h = h, w
        info.update(width=w, height=h, fps=round(float(num) / float(den), 3), rotation=rot, vcodec=v["codec_name"])
    return info


def contact_sheet(path, dur, out, n=24, cols=6, width=320):
    """n frames por seek (rapido mesmo em 4K HEVC longo) + tempo em cada um."""
    import io
    from PIL import Image, ImageDraw, ImageFont
    font = ImageFont.truetype(os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "fonts",
                                           "Inter-SemiBold.ttf"), 18)
    tiles = []
    for k in range(n):
        t = dur * (k + 0.5) / n
        r = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path, "-frames:v", "1",
                            "-vf", f"scale={width}:-2", "-f", "image2pipe", "-c:v", "png", "-"], capture_output=True)
        if not r.stdout:
            continue
        im = Image.open(io.BytesIO(r.stdout)).convert("RGB")
        d = ImageDraw.Draw(im)
        label = f"{int(t // 60)}:{t % 60:04.1f}"
        d.rectangle([0, 0, 8 + d.textlength(label, font=font), 26], fill=(0, 0, 0))
        d.text((4, 3), label, font=font, fill=(255, 255, 255))
        tiles.append(im)
    if not tiles:
        return
    w, h = tiles[0].size
    rows = (len(tiles) + cols - 1) // cols
    sheet = Image.new("RGB", (w * cols, h * rows))
    for i, im in enumerate(tiles):
        sheet.paste(im.resize((w, h)), ((i % cols) * w, (i // cols) * h))
    sheet.save(out, quality=85)


def silences(path, db=-32, d=0.25):
    r = run(["ffmpeg", "-v", "info", "-i", path, "-vn", "-af", f"silencedetect=n={db}dB:d={d}", "-f", "null", "-"])
    out, start = [], None
    for line in r.stderr.splitlines():
        m = re.search(r"silence_start: ([\d.]+)", line)
        if m:
            start = float(m.group(1))
        m = re.search(r"silence_end: ([\d.]+)", line)
        if m and start is not None:
            out.append([round(start, 3), round(float(m.group(1)), 3)])
            start = None
    return out


def scenes(path, thr=0.32):
    """Cortes de cena + intervalos pretos (camaras gravam preto no inicio). -> (scenes, black)"""
    r = run(["ffmpeg", "-v", "info", "-i", path, "-an", "-vf",
             f"scale=320:-2,blackdetect=d=0.05:pix_th=0.08,select='gt(scene,{thr})',showinfo", "-f", "null", "-"])
    sc = [round(float(m.group(1)), 3) for m in re.finditer(r"pts_time:([\d.]+)", r.stderr)]
    bl = [[float(a), float(b)] for a, b in re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", r.stderr)]
    return sc, bl


def loudness(path):
    r = run(["ffmpeg", "-v", "info", "-i", path, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
    tail = r.stderr[-1500:]
    i = re.search(r"I:\s+(-?[\d.]+) LUFS", tail)
    tp = re.search(r"Peak:\s+(-?[\d.]+) dBFS", tail)
    return {"integrated_lufs": float(i.group(1)) if i else None, "true_peak_db": float(tp.group(1)) if tp else None}


def faces(path, dur, every=1.0):
    """Maior rosto por amostra (YuNet). [[t, x, y, w, h]] normalizado 0-1 -> enquadramento e graficos fora da cara."""
    import cv2, shutil, tempfile
    model = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "models",
                         "face_detection_yunet_2023mar.onnx")
    # OpenCV dnn nao abre caminhos com acentos (ex-EDICOES; mantido por seguranca) -> copia para TEMP
    tmp = os.path.join(tempfile.gettempdir(), "yunet_2023mar.onnx")
    if not os.path.exists(tmp):
        shutil.copy(model, tmp)
    model = tmp
    cap = cv2.VideoCapture(path)
    det, out, t = None, [], 0.0
    while t < dur:
        cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
        ok, f = cap.read()
        if not ok:
            break
        h, w = f.shape[:2]
        sw, sh = 640, int(640 * h / w)
        f = cv2.resize(f, (sw, sh))
        if det is None:
            det = cv2.FaceDetectorYN.create(model, "", (sw, sh), 0.75)
        _, fs = det.detect(f)
        if fs is not None and len(fs):
            x, y, bw, bh = max(fs, key=lambda r: r[2] * r[3])[:4]
            out.append([round(t, 2)] + [round(float(v), 4) for v in (x / sw, y / sh, bw / sw, bh / sh)])
        t += every
    return out


def _cuda_dlls():
    # pip nvidia-cublas-cu12 / nvidia-cudnn-cu12 metem as DLLs em site-packages/nvidia/*/bin
    for base in sys.path:
        for d in glob.glob(os.path.join(base, "nvidia", "*", "bin")):
            try:
                os.add_dll_directory(d)
            except (OSError, AttributeError):
                pass
            os.environ["PATH"] = d + os.pathsep + os.environ.get("PATH", "")


def transcribe(path, lang, model_name):
    _cuda_dlls()
    from faster_whisper import WhisperModel
    model = None
    for dev, ct in (("cuda", "float16"), ("cpu", "int8")):
        try:
            model = WhisperModel(model_name, device=dev, compute_type=ct)
            segs, _ = model.transcribe(path, language=lang, word_timestamps=True, vad_filter=True,
                                       vad_parameters={"min_silence_duration_ms": 300}, beam_size=5,
                                       condition_on_previous_text=False)
            segs = list(segs)
            print(f"  whisper {model_name} em {dev}", file=sys.stderr)
            break
        except Exception as e:  # sem CUDA -> CPU
            print(f"  whisper {dev} falhou ({str(e)[:120]}), a tentar outro", file=sys.stderr)
            segs = None
    if segs is None:
        raise SystemExit("transcricao falhou")
    words = []
    for s in segs:
        for w in s.words or []:
            words.append({"i": len(words), "w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3),
                          "p": round(w.probability, 2)})
    return words


def transcript_txt(words, gap=0.6):
    """Frases (quebra em pontuacao final ou pausa > gap) com indices -> facil escolher takes."""
    lines, cur = [], []
    for k, w in enumerate(words):
        cur.append(w)
        nxt = words[k + 1] if k + 1 < len(words) else None
        end = (re.search(r"[.!?…]$", w["w"]) or nxt is None or nxt["s"] - w["e"] > gap
               or (len(cur) >= 18 and (re.search(r"[,;:]$", w["w"]) or nxt["s"] - w["e"] > 0.2)) or len(cur) >= 26)
        if end:
            a, b = cur[0], cur[-1]
            pausa = f"  (+{nxt['s'] - b['e']:.2f}s)" if nxt else ""
            low = [x["w"] for x in cur if x["p"] < 0.5]
            dub = f"  [duvida: {' '.join(low)}]" if low else ""
            lines.append(f"[{a['i']:>4}-{b['i']:<4}] {a['s']:7.2f}-{b['e']:7.2f}  {' '.join(x['w'] for x in cur)}{pausa}{dub}")
            cur = []
    return "\n".join(lines)


def beats(path):
    """BPM + beats por spectral flux (numpy). Suficiente para cortar no beat."""
    sr = 22050
    r = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar", str(sr), "-f", "f32le", "-"], capture_output=True)
    y = np.frombuffer(r.stdout, dtype=np.float32)
    hop, n = 512, 2048
    frames = 1 + (len(y) - n) // hop
    idx = np.arange(n)[None, :] + hop * np.arange(frames)[:, None]
    spec = np.abs(np.fft.rfft(y[idx] * np.hanning(n), axis=1))
    spec = np.log1p(spec)
    flux = np.maximum(0, np.diff(spec, axis=0)).sum(axis=1)
    flux = (flux - flux.mean()) / (flux.std() + 1e-9)
    fps = sr / hop
    # tempo por autocorrelacao (70-180 BPM)
    ac = np.correlate(flux, flux, "full")[len(flux) - 1:]
    lags = np.arange(len(ac))
    bpm_lags = (lags > fps * 60 / 180) & (lags < fps * 60 / 70)
    lag = lags[bpm_lags][np.argmax(ac[bpm_lags])]
    bpm = 60 * fps / lag
    # fase: escolhe o offset que maximiza energia na grelha
    best, phase = -1, 0
    for off in range(int(lag)):
        sc = flux[off::int(round(lag))].sum() if lag >= 1 else 0
        if sc > best:
            best, phase = sc, off
    period = 60 / bpm
    t0 = (phase + 1) / fps
    dur = len(y) / sr
    bt = list(np.round(np.arange(t0, dur, period), 3))
    # downbeat: das 4 fases, a mais forte
    strength = [sum(flux[min(len(flux) - 1, int(b * fps))] for b in bt[k::4]) for k in range(4)]
    k = int(np.argmax(strength))
    return {"bpm": round(float(bpm), 2), "beats": [float(b) for b in bt], "downbeats": [float(b) for b in bt[k::4]],
            "duration": round(dur, 3)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("videos", nargs="*")
    ap.add_argument("--out", required=True)
    ap.add_argument("--lang", default="pt")
    ap.add_argument("--model", default="large-v3-turbo")
    ap.add_argument("--sem-voz", action="store_true", help="nao transcrever (b-roll, imobiliario sem fala)")
    ap.add_argument("--musica", nargs="*", default=[])
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)

    for m in a.musica:
        stem = os.path.splitext(os.path.basename(m))[0]
        b = beats(m)
        b["path"] = os.path.abspath(m)
        json.dump(b, open(os.path.join(a.out, stem + "_beats.json"), "w"), indent=1)
        print(f"{stem}: {b['bpm']} BPM, {len(b['beats'])} beats")

    for v in a.videos:
        stem = os.path.splitext(os.path.basename(v))[0].strip()
        print(f"> {stem}", file=sys.stderr)
        info = probe(v)
        contact_sheet(v, info["duration"], os.path.join(a.out, stem + "_sheet.jpg"))
        info["scenes"], info["black"] = scenes(v)
        info["faces"] = faces(v, info["duration"])
        if info["faces"]:
            info["rosto"] = [round(float(np.median([f[k] for f in info["faces"]])), 4) for k in range(1, 5)]
        if info["has_audio"]:
            info["silences"] = silences(v)
            info["loudness"] = loudness(v)
        if info["has_audio"] and not a.sem_voz:
            info["words"] = transcribe(v, a.lang, a.model)
            txt = transcript_txt(info["words"])
            open(os.path.join(a.out, stem + "_transcricao.txt"), "w", encoding="utf-8").write(txt + "\n")
        json.dump(info, open(os.path.join(a.out, stem + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"{stem}: {info['duration']:.1f}s {info.get('width')}x{info.get('height')} @{info.get('fps')} "
              f"cenas={len(info['scenes'])} palavras={len(info.get('words', []))} rosto={info.get('rosto')}")


if __name__ == "__main__":
    main()
