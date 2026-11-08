"""Controlo de qualidade antes de entregar. Nada sai sem passar aqui.

Uso: python qc.py FINAL.mp4 [--edl edl.json]
Verifica: formato, loudness (-14 LUFS / TP <= -1), pretos e congelados, silencios mortos, hook nos primeiros
segundos, ritmo (maior intervalo sem mudanca visual) e gera qc_sheet.jpg (12 frames) para revisao visual.
Sai com codigo 1 se houver FALHA.
"""
import argparse, json, os, re, subprocess, sys


def run(cmd):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--edl")
    a = ap.parse_args()
    res = []
    ok = lambda m: res.append(("OK   ", m))
    warn = lambda m: res.append(("AVISO", m))
    fail = lambda m: res.append(("FALHA", m))

    j = json.loads(run(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", a.video]).stdout)
    v = next(s for s in j["streams"] if s["codec_type"] == "video")
    au = next((s for s in j["streams"] if s["codec_type"] == "audio"), None)
    dur = float(j["format"]["duration"])
    W, H = v["width"], v["height"]
    vertical = H > W
    fps = eval(v["r_frame_rate"])
    (ok if (W, H) in ((1080, 1920), (1920, 1080), (1080, 1350), (3840, 2160), (2160, 3840), (1080, 1080)) else warn)(
        f"resolucao {W}x{H} @ {fps:.2f} fps, {v['codec_name']}/{v.get('pix_fmt')}, {dur:.2f}s")
    if v.get("pix_fmt") != "yuv420p":
        fail("pix_fmt tem de ser yuv420p (compatibilidade redes)")
    if not au:
        fail("sem audio")
    if vertical and dur > 90:
        warn(f"reel com {dur:.0f}s: acima de 90s a retencao cai; confirma que e intencional")

    # loudness
    r = run(["ffmpeg", "-v", "info", "-i", a.video, "-vn", "-af", "ebur128=peak=true", "-f", "null", "-"])
    tail = r.stderr[-1500:]
    I = float(re.search(r"I:\s+(-?[\d.]+) LUFS", tail).group(1))
    tp = float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", tail).group(1))
    (ok if abs(I + 14) <= 1.0 else warn)(f"loudness {I:.1f} LUFS (alvo -14 redes / -16 voz)")
    (ok if tp <= -0.8 else fail)(f"true peak {tp:.1f} dBTP (max -1)")

    # pretos / congelados / silencio
    r = run(["ffmpeg", "-v", "info", "-i", a.video, "-vf", "blackdetect=d=0.15:pix_th=0.08,freezedetect=n=0.002:d=2.5",
             "-af", "silencedetect=n=-45dB:d=0.7", "-f", "null", "-"])
    blacks = re.findall(r"black_start:([\d.]+) black_end:([\d.]+)", r.stderr)
    freezes = re.findall(r"freeze_start: ([\d.]+)", r.stderr)
    sil = re.findall(r"silence_start: ([\d.]+)", r.stderr)
    (ok if not blacks else fail)(f"frames pretos: {blacks or 'nenhum'}")
    (ok if not freezes else warn)(f"imagem parada >2.5s em: {freezes or 'nenhum'}")
    sil = [float(s) for s in sil if float(s) < dur - 1.0]
    (ok if not sil else warn)(f"silencios >0.7s (ar morto) em: {[round(s, 2) for s in sil] or 'nenhum'}")

    # primeiro frame: e o thumbnail do scroll. Desfocado/escuro = hook morto
    import numpy as np
    def frame_stats(t):
        rr = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", a.video, "-frames:v", "1", "-vf",
                             "scale=320:-2,format=gray", "-f", "rawvideo", "-"], capture_output=True)
        img = np.frombuffer(rr.stdout, np.uint8).astype(float)
        img = img[: (len(img) // 320) * 320].reshape(-1, 320)
        lap = img[1:-1, 1:-1] * 4 - img[:-2, 1:-1] - img[2:, 1:-1] - img[1:-1, :-2] - img[1:-1, 2:]
        return lap.var(), img.mean()
    s0, l0 = frame_stats(min(0.3, dur / 4))  # depois do zoom de impacto
    ref = sorted(frame_stats(dur * k / 8)[0] for k in range(1, 8))[3]
    (ok if s0 >= 0.35 * ref else warn)(f"nitidez do 1.o frame {s0:.0f} vs mediana {ref:.0f} (desfocado = hook morto)")
    (ok if l0 >= 40 else warn)(f"brilho do 1.o frame {l0:.0f}/255 (escuro = parece fade/erro no feed)")

    # EDL: hook e ritmo
    if a.edl:
        base = os.path.dirname(os.path.abspath(a.edl))
        edl = json.load(open(a.edl, encoding="utf-8"))
        plan = json.load(open(os.path.join(base, "plano.json"), encoding="utf-8"))
        gfx = edl.get("graficos", [])
        hook = [g for g in gfx if g["type"] == "hook" or (g["type"] in ("titulo", "numero") and isinstance(g["t"], (int, float)) and g["t"] <= 1.0)]
        first_word = plan["words"][0]["s"] if plan["words"] else None
        if hook:
            ok("hook visual presente")
        else:
            warn("sem grafico 'hook': os primeiros 2s precisam de texto/visual forte")
        if first_word is not None:
            (ok if first_word <= 0.4 else warn)(f"primeira palavra aos {first_word:.2f}s (alvo <= 0.4s, sem ar morto)")
        # mudancas visuais: cortes, b-roll, graficos, transicoes
        ev = {0.0, plan["total"]}
        for c in plan["clips"]:
            ev.add(round(c["t0"], 2))
        ev.update(plan.get("eventos", []))
        ev = sorted(ev)
        gaps = [(b - a_, a_) for a_, b in zip(ev, ev[1:])]
        mx, at = max(gaps)
        lim = 4.0 if vertical else 8.0
        (ok if mx <= lim else warn)(f"maior plano sem mudanca visual: {mx:.1f}s aos {at:.1f}s (limite {lim}s)")
        avg = plan["total"] / max(1, len(ev) - 1)
        ok(f"duracao media por mudanca visual: {avg:.2f}s ({len(ev) - 1} mudancas)")
        if edl.get("legendas") is None and vertical and plan["words"]:
            warn("reel sem legendas: 80%+ ve sem som")

    # contact sheet
    out = os.path.join(os.path.dirname(os.path.abspath(a.video)), "qc_sheet.jpg")
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from analisar import contact_sheet
    contact_sheet(a.video, dur, out, n=12, cols=6, width=240 if vertical else 400)
    ok(f"contact sheet -> {out} (VER antes de entregar)")

    for tag, m in res:
        print(f"[{tag}] {m}")
    if any(t == "FALHA" for t, _ in res):
        sys.exit(1)


if __name__ == "__main__":
    main()
