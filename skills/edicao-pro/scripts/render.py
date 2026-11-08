"""Motor de render da EDL (edl.json) -> MP4 final.

Uso:
  python render.py edl.json --plano      # so resolve timeline: escreve plano.txt (tempo de saida de cada palavra)
  python render.py edl.json --preview    # render rapido a 50% para rever
  python render.py edl.json              # render final

Formato da EDL: ver ../references/edl.md. Tempos aceitam segundos (12.4), "w:IDX" (inicio da palavra IDX
no video final), "w:IDX:e" (fim), "w:IDX+0.2", "c:N" (inicio do clip N da timeline), "fim-1.5".
Intermedios ficam em <pasta da EDL>/_render (cache por clip: so re-renderiza o que mudou).
"""
import argparse, hashlib, json, math, os, re, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import graficos  # noqa: E402
from luts import write_lut  # noqa: E402

SKILL = os.path.dirname(HERE)
SFX_DIRS = [os.path.join(SKILL, "..", "efeitos-sonoros"), os.path.join(SKILL, "assets", "sfx"),
            r"C:\Users\Goldrajch\Documents\apps e wb sites ai\Elite Agency\Apollo OB Memoria\10 - Projects\EDICOES\efeitos-sonoros"]  # para a copia em ~/.claude


def sh(cmd, cwd=None):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode:
        sys.stderr.write(r.stderr[-3000:])
        raise SystemExit(f"ffmpeg falhou: {' '.join(cmd[:6])} ...")
    return r


def probe(path):
    r = sh(["ffprobe", "-v", "error", "-print_format", "json", "-show_format", "-show_streams", path])
    j = json.loads(r.stdout)
    v = next((s for s in j["streams"] if s["codec_type"] == "video"), None)
    a = next((s for s in j["streams"] if s["codec_type"] == "audio"), None)
    w, h = (v["width"], v["height"]) if v else (0, 0)
    for sd in (v or {}).get("side_data_list", []) or []:
        if abs(int(sd.get("rotation", 0))) in (90, 270):
            w, h = h, w
    return {"w": w, "h": h, "dur": float(j["format"]["duration"]), "audio": a is not None}


def even(x):
    return int(round(x / 2)) * 2


# ------------------------------------------------------------------ plano

class Plan:
    def __init__(self, edl, base):
        self.edl, self.base = edl, base
        f = edl.get("formato", {})
        self.W, self.H, self.fps = f.get("w", 1080), f.get("h", 1920), f.get("fps", 30)
        self.src = {}
        for k, v in edl["fontes"].items():
            v = {"path": v} if isinstance(v, str) else dict(v)
            v["path"] = self.abs(v["path"])
            v["info"] = probe(v["path"])
            if v.get("analise"):
                an = json.load(open(self.abs(v["analise"]), encoding="utf-8"))
                v["words"] = an.get("words", [])
                v["faces"] = an.get("faces", [])
                v["black"] = an.get("black", [])
            self.src[k] = v
        self.clips, self.words = [], []
        self.build()

    def abs(self, p):
        return p if os.path.isabs(p) else os.path.normpath(os.path.join(self.base, p))

    def build(self):
        e = self.edl
        if "aroll" in e:
            self._aroll(e["aroll"])
        for c in e.get("clips", []):
            self.clips.append(self._clip(c))
        if e.get("cortar_no_beat"):
            self._snap_beats(e["cortar_no_beat"])
        if e.get("seguir_rosto", True):
            for c in self.clips:
                self._face(c)
        t = 0.0
        for c in self.clips:
            n = max(1, round((c["out"] - c["in"]) / c["vel"] * self.fps))
            c["frames"], c["t0"] = n, t
            t += n / self.fps
        self.total = t
        self._map_words()

    def _face(self, c):
        if c.get("foco_fixo"):
            return
        fs = [f for f in self.src[c["fonte"]].get("faces") or [] if f[3] >= 0.06]  # ignora caras ao fundo
        near = [f for f in fs if c["in"] - 0.5 <= f[0] <= c["out"] + 0.5] or fs
        if not near:
            return
        med = lambda k: sorted(f[k] for f in near)[len(near) // 2]
        x, y, w, h = med(1), med(2), med(3), med(4)
        c["face"] = [round(x + w / 2, 4), round(y + h / 2, 4)]
        c["face_box"] = [x, y, w, h]

    def face_at(self, t):
        for c in self.clips:
            if c["t0"] <= t < c["t0"] + c["frames"] / self.fps:
                return face_out(self.src[c["fonte"]]["info"], c, self.W, self.H)
        return None

    def auto_y(self, t0, t1, kind):
        """Posicao vertical (0-1) para um grafico entre t0 e t1 sem tapar o rosto."""
        boxes = [b for b in (self.face_at(t0 + (t1 - t0) * k / 4) for k in range(5)) if b]
        if not boxes:
            return None
        top, bot = min(b[0] for b in boxes), max(b[1] for b in boxes)
        need = 0.16 if kind == "hook" else 0.09
        cap = 0.66  # limite superior das legendas
        safe_top = 0.13 if self.H > self.W else 0.08  # UI das redes no topo
        if top - safe_top - 0.02 >= need:
            return safe_top + (top - safe_top) / 2
        if cap - bot >= need:
            return bot + (cap - bot) / 2
        # close-up apertado: encosta por baixo do queixo (hook pode descer: legendas escondidas durante o hook)
        return min(bot + need / 2 + 0.015, 0.72 if kind == "hook" else 0.645)

    def _clip(self, c):
        z = c.get("zoom", 1.0)
        return {"fonte": c["fonte"], "in": float(c["in"]), "out": float(c["out"]), "vel": float(c.get("vel", 1.0)),
                "zoom": z, "foco": c.get("foco", self.edl.get("foco", [0.5, 0.5])), "som": c.get("som", self.edl.get("som_clips", True)),
                "shake": c.get("shake"), "foco_fixo": c.get("foco_fixo"), "words": []}

    def _aroll(self, a):
        pad0, pad1 = a.get("pad", [0.06, 0.12])
        gap = a.get("max_gap", 0.3)
        punch = a.get("punch")  # {"cada": 4, "niveis": [1.0, 1.14]}
        push = a.get("push", 0.0)  # empurrao lento por clip (ex.: 0.03)
        foco = a.get("foco", [0.5, 0.4])
        since, lvl = 0.0, 0
        cada = punch.get("cada", 4.0) if punch else None
        for si, seg in enumerate(a["segmentos"]):
            fonte = seg.get("fonte", a["fonte"])  # A-roll com varias fontes (takes de clips diferentes)
            if "palavras" not in seg:  # insert: plano sem voz na sequencia (ex.: tour de b-roll entre falas)
                c = self._clip(dict(seg, fonte=fonte, som=seg.get("som", False)))
                c["seg"] = si
                self.clips.append(c)
                continue
            src = self.src[fonte]
            W = src["words"]
            black_end = max([b[1] for b in src.get("black", []) if b[0] < 0.1] or [0.0])  # preto no inicio da camara
            i0, i1 = seg["palavras"]
            ws = W[i0:i1 + 1]
            # runs: quebra nas pausas (corte real) e, com punch, em fronteiras de frase longas sem pausa
            # (corte "virtual": nada e removido, so muda o zoom -> pattern interrupt)
            runs, cur, virt = [], [ws[0]], [False]
            for w in ws[1:]:
                p = cur[-1]
                if w["s"] - p["e"] > gap:
                    runs.append(cur)
                    cur = []
                    virt.append(False)
                elif cada and w["s"] - cur[0]["s"] > cada and (re.search(r"[.,!?;:]$", p["w"]) or w["s"] - p["e"] > 0.12):
                    runs.append(cur)
                    cur = []
                    virt.append(True)
                cur.append(w)
            runs.append(cur)
            for ri, run in enumerate(runs):
                cin = max(0.0, run[0]["s"] - pad0)
                cout = min(src["info"]["dur"], run[-1]["e"] + pad1)
                if ri + 1 < len(runs) and virt[ri + 1]:
                    cout = (run[-1]["e"] + runs[ri + 1][0]["s"]) / 2
                if virt[ri] and self.clips:
                    cin = self.clips[-1]["out"]
                if self.clips and self.clips[-1]["fonte"] == fonte and cin < self.clips[-1]["out"] \
                        and cin > self.clips[-1]["in"]:
                    cin = self.clips[-1]["out"]  # sem sobreposicao
                z = seg.get("zoom")
                if z is None and punch:
                    if since >= punch.get("cada", 4.0):
                        lvl, since = (lvl + 1) % len(punch["niveis"]), 0.0
                    z = round(punch["niveis"][lvl] * seg.get("base", 1.0), 4)  # base: escala do plano (largo -> mais zoom)
                z = 1.0 if z is None else z
                if isinstance(z, (int, float)) and push:
                    z = [z, z * (1 + push)]
                if ri == 0 and seg.get("entrada") == "impacto":
                    zb = z if isinstance(z, (int, float)) else z[0]
                    z = {"kf": [[0, zb * 1.22], [0.22, zb, "out"]] + ([[cout - cin, z[1]]] if isinstance(z, list) else [])}
                c = self._clip({"fonte": fonte, "in": cin, "out": cout, "zoom": z, "foco": seg.get("foco", foco),
                                "shake": seg.get("shake") if ri == 0 else None, "foco_fixo": seg.get("foco_fixo")})
                c["seg"] = si
                if cin < black_end:  # preto da camara: mantem o audio, congela o 1.o frame bom
                    c["vskip"] = round(black_end - cin + 0.3, 3)  # +0.3: fade-in da camara
                self.clips.append(c)
                since += cout - cin

    def _snap_beats(self, cfg):
        b = json.load(open(self.abs(cfg["beats"]), encoding="utf-8"))
        off = self.edl.get("musica", {}).get("inicio", 0.0)
        grid = [x - off for x in b["downbeats" if cfg.get("downbeat") else "beats"] if x - off > 0]
        t = 0.0
        for c in self.clips:
            d = (c["out"] - c["in"]) / c["vel"]
            cand = [g for g in grid if g > t + 0.35]
            if not cand:
                break
            tgt = min(cand, key=lambda g: abs(g - (t + d)))
            nd = tgt - t
            c["out"] = c["in"] + nd * c["vel"]
            t = tgt

    def _map_words(self):
        for ci, c in enumerate(self.clips):
            src = self.src[c["fonte"]]
            for w in src.get("words", []):
                if w["s"] >= c["in"] - 0.02 and w["e"] <= c["out"] + 0.05:
                    s = c["t0"] + max(0.0, w["s"] - c["in"]) / c["vel"]
                    e = c["t0"] + min(c["out"] - c["in"], w["e"] - c["in"]) / c["vel"]
                    self.words.append({"i": w["i"], "w": w["w"], "s": round(s, 3), "e": round(e, 3), "clip": ci,
                                       "fonte": c["fonte"]})
        self.word_by_i = {}
        for w in self.words:
            self.word_by_i.setdefault(w["i"], w)

    def t(self, ref):
        if isinstance(ref, (int, float)):
            return float(ref)
        m = re.fullmatch(r"\s*(w|c):(\d+)(:e)?\s*([+-][\d.]+)?\s*", ref)
        if m:
            kind, idx, end, off = m.groups()
            idx = int(idx)
            if kind == "w":
                if idx not in self.word_by_i:
                    raise SystemExit(f"palavra {idx} nao esta na timeline (foi cortada?)")
                w = self.word_by_i[idx]
                base = w["e"] if end else w["s"]
            else:
                base = self.clips[idx]["t0"]
            return base + float(off or 0)
        m = re.fullmatch(r"\s*fim\s*([+-][\d.]+)?\s*", ref)
        if m:
            return self.total + float(m.group(1) or 0)
        raise SystemExit(f"tempo invalido: {ref}")

    def write_txt(self, path):
        L = [f"duracao total: {self.total:.2f}s  ({len(self.clips)} clips)  formato {self.W}x{self.H}@{self.fps}", "",
             "CLIPS (c:N  inicio  dur  fonte in-out  zoom)"]
        for i, c in enumerate(self.clips):
            L.append(f"c:{i:<3} {c['t0']:7.2f} {c['frames'] / self.fps:5.2f}s  {c['fonte']} {c['in']:.2f}-{c['out']:.2f}  "
                     f"z={json.dumps(c['zoom'])}  rosto(topo,fundo,x)={face_out(self.src[c['fonte']]['info'], c, self.W, self.H)}")
        L += ["", "PALAVRAS (w:IDX  tempo de saida  texto)"]
        line = []
        for w in self.words:
            line.append(f"{w['i']}@{w['s']:.2f} {w['w']}")
            if re.search(r"[.!?]$", w["w"]) or len(line) >= 10:
                L.append("  ".join(line))
                line = []
        if line:
            L.append("  ".join(line))
        open(path, "w", encoding="utf-8").write("\n".join(L) + "\n")


# ------------------------------------------------------------------ video chains

def zoom_expr(z, T):
    """z: numero | [z0,z1] (ease ao longo do clip) | {"kf":[[t,z,ease?],...]} -> expressao de T."""
    if isinstance(z, (int, float)):
        return f"{z}"
    if isinstance(z, list):
        z = {"kf": [[0, z[0]], ["dur", z[1]]]}
    kf = z["kf"]
    expr = f"{kf[-1][1]}"
    for a, b in reversed(list(zip(kf[:-1], kf[1:]))):
        ta, za = a[0], a[1]
        tb, zb = b[0], b[1]
        ease = b[2] if len(b) > 2 else "io"
        p = f"clip(({T}-{ta})/({tb}-{ta}),0,1)"
        e = {"io": f"({p}*{p}*(3-2*{p}))", "out": f"(1-pow(1-{p},3))", "in": f"pow({p},3)", "lin": p}[ease]
        expr = f"if(lt({T},{tb}),{za}+({zb}-{za})*{e},{expr})"
    return f"if(lt({T},{kf[0][0]}),{kf[0][1]},{expr})"


def zmax(z):
    if isinstance(z, (int, float)):
        return z
    if isinstance(z, list):
        return max(z)
    return max(k[1] for k in z["kf"])


FACE_Y = 0.36  # sem rosto: o alvo fica a 36% da altura
HEADROOM = 0.07  # com rosto: topo do cabelo a 7% do topo do frame (nunca cortar a cabeca)


def geometry(src_info, c, W, H):
    """Crop de aspecto (cobre WxH) + alvo do zoom (ax, ay relativos ao frame cortado).
    Com rosto detectado o crop segue o rosto; senao usa 'foco'."""
    sw, sh_ = src_info["w"], src_info["h"]
    ar = W / H
    if sw / sh_ > ar:
        cw, ch = sh_ * ar, sh_
    else:
        cw, ch = sw, sw / ar
    fb = c.get("face_box")
    if fb:  # x = centro do rosto, y = topo da cabeca (caixa do rosto nao inclui cabelo: +25%)
        fx, fy = fb[0] + fb[2] / 2, fb[1] - 0.25 * fb[3]
    else:
        fx, fy = c["foco"]
    cx = min(max(0, fx * sw - cw / 2), sw - cw)
    cy = min(max(0, fy * sh_ - HEADROOM * ch), sh_ - ch) if fb else min(max(0, fy * sh_ - ch / 2), sh_ - ch)
    ax, ay = (fx * sw - cx) / cw, (fy * sh_ - cy) / ch
    return cw, ch, cx, cy, ax, ay, (HEADROOM if fb else FACE_Y)


def face_out(src_info, c, W, H):
    """Caixa do rosto no video final (0-1) com o zoom inicial do clip -> [topo, fundo, centro_x]."""
    fb = c.get("face_box")
    if not fb:
        return None
    cw, ch, cx, cy, ax, ay, ky = geometry(src_info, c, W, H)
    z = c["zoom"]
    z = z if isinstance(z, (int, float)) else (z[0] if isinstance(z, list) else z["kf"][-1][1])
    rw, rh = cw / z, ch / z
    L = min(max(0, ax * cw - 0.5 * rw), cw - rw)
    T = min(max(0, ay * ch - ky * rh), ch - rh)
    sw, sh_ = src_info["w"], src_info["h"]
    top = (((fb[1] - 0.25 * fb[3]) * sh_ - cy) - T) / rh  # inclui cabelo
    bot = ((fb[1] + fb[3]) * sh_ - cy - T) / rh
    mid = ((fb[0] + fb[2] / 2) * sw - cx - L) / rw
    return [round(top, 3), round(bot, 3), round(mid, 3)]


def video_chain(src_info, c, W, H, fps, dur):
    """Cadeia de filtros: velocidade -> crop de aspecto -> zoom subpixel (perspective) -> WxH."""
    cw, ch, cx, cy, ax, ay, ky = geometry(src_info, c, W, H)
    z = c["zoom"]
    if isinstance(z, list):
        z = [z[0], z[1]]
        z = {"kf": [[0, z[0]], [dur, z[1]]]}
    elif isinstance(z, dict):
        z = {"kf": [[dur if k[0] == "dur" else k[0]] + k[1:] for k in z["kf"]]}
    shake = c.get("shake")
    zm = zmax(z) * (1.03 if shake else 1)
    f = [f"setpts=(PTS-STARTPTS)/{c['vel']}"] + ([f"tpad=start_duration={c['vskip'] / c['vel']:.3f}:start_mode=clone"]
                                                  if c.get("vskip") else []) + [f"fps={fps}",
         f"crop={even(cw)}:{even(ch)}:{int(cx)}:{int(cy)}"]
    static = isinstance(z, (int, float)) and not shake
    if static:
        zz = float(z)
        rw, rh = cw / zz, ch / zz
        L = min(max(0, ax * cw - 0.5 * rw), cw - rw)
        T = min(max(0, ay * ch - ky * rh), ch - rh)
        f.append(f"crop={even(rw)}:{even(rh)}:{int(L)}:{int(T)}")
        f.append(f"scale={W}:{H}:flags=lanczos")
    else:
        SW = max(W, even(min(cw, W * zm)))
        SH = even(SW * H / W)
        f.append(f"scale={SW}:{SH}:flags=lanczos")
        T = f"(in/{fps})"
        Z = f"({zoom_expr(z, T)}{'*1.03' if shake else ''})"
        shx = shy = "0"
        if shake:
            st, sd, amp = shake["t"], shake.get("dur", 0.35), shake.get("amp", 0.012)
            env = f"(between({T},{st},{st + sd})*(1-({T}-{st})/{sd}))"
            shx = f"({env}*{amp}*W*sin({T}*61))"
            shy = f"({env}*{amp}*H*sin({T}*47+1))"
        rw, rh = f"(W/{Z})", f"(H/{Z})"
        L = f"(clip({ax:.4f}*W-0.5*{rw},0,W-{rw})+{shx})"
        Tp = f"(clip({ay:.4f}*H-{ky}*{rh},0,H-{rh})+{shy})"
        R, B = f"({L}+{rw})", f"({Tp}+{rh})"
        f.append(f"perspective=x0='{L}':y0='{Tp}':x1='{R}':y1='{Tp}':x2='{L}':y2='{B}':x3='{R}':y3='{B}'"
                 f":interpolation=cubic:eval=frame")
        f.append(f"scale={W}:{H}:flags=lanczos")
    f += ["setsar=1", "format=yuv420p"]
    return ",".join(f)


def atempo(v):
    out = []
    while v > 2.0:
        out.append("atempo=2.0")
        v /= 2
    while v < 0.5:
        out.append("atempo=0.5")
        v /= 0.5
    out.append(f"atempo={v:.5f}")
    return ",".join(out)


def render_clip(plan, c, work, enc, scale):
    W, H, fps = even(plan.W * scale), even(plan.H * scale), plan.fps
    src = plan.src[c["fonte"]]
    dur = c["frames"] / fps
    key = hashlib.md5(json.dumps([c["fonte"], src["path"], c["in"], c["out"], c["vel"], c["zoom"], c["foco"], c["som"],
                                  c.get("face_box"), FACE_Y, HEADROOM,
                                  c.get("shake"), c.get("vskip"), W, H, fps, enc]).encode()).hexdigest()[:12]
    out = os.path.join(work, f"clip_{key}.mkv")
    if os.path.exists(out):
        return out
    srclen = c["out"] - c["in"]
    vskip = c.get("vskip", 0.0)
    cmd = ["ffmpeg", "-v", "error", "-y", "-ss", f"{c['in'] + vskip:.3f}", "-t", f"{srclen + 0.1:.3f}", "-i", src["path"],
           "-ss", f"{c['in']:.3f}", "-t", f"{srclen + 0.1:.3f}", "-i", src["path"]]
    has_a = src["info"]["audio"] and c["som"]
    if not has_a:
        cmd += ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=stereo"]
    vf = video_chain(src["info"], c, W, H, fps, dur)
    if has_a:
        af = f"aresample=48000,asetpts=PTS-STARTPTS,{atempo(c['vel'])}" if c["vel"] != 1 else "aresample=48000,asetpts=PTS-STARTPTS"
        af += f",apad,atrim=0:{dur:.4f},afade=t=in:d=0.008,afade=t=out:st={max(0, dur - 0.012):.4f}:d=0.012"
        af += ",aformat=channel_layouts=stereo"
        amap = ["-map", "1:a:0"]
    else:
        af = f"atrim=0:{dur:.4f}"
        amap = ["-map", "2:a"]
    cmd += ["-map", "0:v:0"] + amap + ["-vf", vf, "-af", af, "-frames:v", str(c["frames"])]
    cmd += enc_args(enc, intermediate=True) + ["-c:a", "pcm_s16le", "-ar", "48000", out]
    sh(cmd)
    return out


def enc_args(enc, intermediate=False):
    if enc == "nvenc":
        return ["-c:v", "h264_nvenc", "-preset", "p5", "-rc", "vbr", "-cq", "14" if intermediate else "17", "-b:v", "0",
                "-pix_fmt", "yuv420p"]
    if intermediate:
        return ["-c:v", "libx264", "-preset", "veryfast", "-crf", "12", "-pix_fmt", "yuv420p"]
    return ["-c:v", "libx264", "-preset", "slow", "-crf", "16", "-profile:v", "high", "-pix_fmt", "yuv420p",
            "-maxrate", "30M", "-bufsize", "60M"]


def bg_luma(work, ass, g):
    """Luminancia relativa (0-1) do fundo onde o grafico vai ficar, medida no base.mkv (p75 da faixa).
    Decide texto claro vs escuro e acento com contraste (HIG/WCAG)."""
    import numpy as np
    x, y = graficos.resolve_pos(ass, g)
    U = ass.H if ass.H > ass.W else ass.H * 1.6
    fs = U * {"hook": 0.058, "titulo": 0.046, "numero": 0.11, "capitulo": 0.05, "lower_third": 0.03}[g["type"]]
    lines = re.sub(r"\*", "", g.get("text", "")).split("\n")
    tw = max(graficos.text_width(l, "Inter ExtraBold", fs) for l in lines)
    half = fs * 0.6 * len(lines)
    bx0, bx1 = (x, x + tw) if g["type"] == "lower_third" else (x - tw / 2, x + tw / 2)
    vals, spread = [], []
    for k in (0.25, 0.75):
        t = g["t"] + g.get("dur", 2.0) * k
        r = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", "base.mkv", "-frames:v", "1", "-vf",
                            "scale=180:-2,format=gray", "-f", "rawvideo", "-"], cwd=work, capture_output=True)
        if not r.stdout:
            continue
        h = len(r.stdout) // 180
        img = np.frombuffer(r.stdout[:180 * h], np.uint8).reshape(h, 180) / 255.0
        s = h / ass.H
        y0, y1 = max(0, int((y - half) * s)), min(h, int((y + half) * s) + 1)
        sx = 180 / ass.W
        band = img[y0:y1, max(0, int(bx0 * sx)):min(180, int(bx1 * sx) + 1)] ** 2.2  # ~luminancia linear
        vals.append(float(np.mean(band)))
        spread.append(float(np.percentile(band, 90) - np.percentile(band, 10)))
    if not vals:
        return None
    if max(spread) > 0.35:  # fundo misto (parede + camisa): texto branco com sombra le-se melhor
        return None
    return max(vals)


def find_sfx(name):
    if os.path.isabs(name) and os.path.exists(name):
        return name
    for d in SFX_DIRS:
        for ext in ("", ".wav", ".mp3"):
            p = os.path.join(d, name + ext)
            if os.path.exists(p):
                return os.path.normpath(p)
        for root, _, files in os.walk(d):
            for fn in files:
                if os.path.splitext(fn)[0] == os.path.basename(name):
                    return os.path.join(root, fn)
    raise SystemExit(f"SFX nao encontrado: {name}")


# ------------------------------------------------------------------ main

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edl")
    ap.add_argument("--plano", action="store_true")
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--enc", default="auto", choices=["auto", "x264", "nvenc"])
    a = ap.parse_args()
    edl_path = os.path.abspath(a.edl)
    base = os.path.dirname(edl_path)
    edl = json.load(open(edl_path, encoding="utf-8"))
    plan = Plan(edl, base)
    work = os.path.join(base, "_render")
    os.makedirs(work, exist_ok=True)
    plan.write_txt(os.path.join(base, "plano.txt"))
    json.dump({"total": plan.total, "clips": plan.clips, "words": plan.words},
              open(os.path.join(base, "plano.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"plano: {len(plan.clips)} clips, {plan.total:.2f}s -> plano.txt")
    if a.plano:
        return

    enc = a.enc
    if enc == "auto":
        enc = "nvenc" if "h264_nvenc" in sh(["ffmpeg", "-hide_banner", "-encoders"]).stdout else "x264"
    scale = 0.5 if a.preview else 1.0
    W, H, fps = even(plan.W * scale), even(plan.H * scale), plan.fps
    T = plan.total

    # 1) clips -> base
    parts = []
    for i, c in enumerate(plan.clips):
        parts.append(render_clip(plan, c, work, enc, scale))
        print(f"\r  clips {i + 1}/{len(plan.clips)}", end="", flush=True)
    print()
    lst = os.path.join(work, "concat.txt")
    open(lst, "w", encoding="utf-8").write("".join(f"file '{os.path.basename(p)}'\n" for p in parts))
    sh(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", "concat.txt", "-c", "copy", "base.mkv"], cwd=work)

    # 2) graficos + legendas (ASS)
    ass = graficos.Ass(W, H)
    leg = edl.get("legendas")
    gfx = edl.get("graficos", [])
    for g in gfx:
        g = dict(g)
        g["t"] = plan.t(g["t"])
        if "ate" in g:
            g["dur"] = plan.t(g["ate"]) - g["t"]
        if g.get("pos", "auto") == "auto" and g["type"] in ("hook", "titulo", "card", "cta", "numero"):
            y = plan.auto_y(g["t"], g["t"] + g.get("dur", 2.0), g["type"])
            if y is not None:
                g["pos"] = (0.5, y)
            else:
                g.pop("pos", None)
        if g["type"] not in ("card", "cta") and "bg" not in g:
            g["bg"] = bg_luma(work, ass, g)
        graficos.graphic(ass, g, accent=edl.get("cor_destaque", "amarelo"))
    if leg:
        fix = {k.lower(): v for k, v in leg.get("corrigir", {}).items()}
        words = []
        for w in plan.words:
            core = re.sub(r"[^\wÀ-ÿ-]", "", w["w"]).lower()
            txt = w["w"]
            if core in fix:
                txt = re.sub(re.escape(re.sub(r"[^\wÀ-ÿ-]", "", w["w"])), fix[core], w["w"])
            if f"{w['i']}" in leg.get("remover", []) or w["i"] in leg.get("remover", []):
                continue
            words.append({**w, "w": txt})
        hide = [[plan.t(h[0]), plan.t(h[1])] for h in leg.get("esconder", [])]
        if leg.get("esconder_durante_graficos", True):
            hide += [[plan.t(g["t"]), plan.t(g["t"]) + g.get("dur", 2.0)] for g in gfx if g["type"] in ("hook", "numero", "capitulo")]
        graficos.captions(ass, words, leg.get("estilo", "apple"), leg.get("cor", edl.get("cor_destaque", "amarelo")),
                          leg.get("destaque", []), leg.get("y"), hide)
    ass.write(os.path.join(work, "graficos.ass"))
    fdir = os.path.join(work, "fonts")
    if not os.path.isdir(fdir):
        shutil.copytree(os.path.join(SKILL, "assets", "fonts"), fdir)

    # 3) composicao final
    inputs = ["-i", "base.mkv"]
    fc = []
    n = 1
    v = "[0:v]"
    for bi, b in enumerate(edl.get("broll", [])):
        t0 = plan.t(b["t"])
        d = plan.t(b["ate"]) - t0 if "ate" in b else b.get("dur", 1.5)
        vel = b.get("vel", 1.0)
        c = {"fonte": b["fonte"], "in": b.get("in", 0.0), "out": b.get("in", 0.0) + d * vel, "vel": vel,
             "zoom": b.get("zoom", [1.0, 1.06]), "foco": b.get("foco", [0.5, 0.5]), "shake": b.get("shake")}
        info = plan.src[b["fonte"]]["info"]
        inputs += ["-ss", f"{c['in']:.3f}", "-t", f"{d * vel + 0.1:.3f}", "-i", plan.src[b["fonte"]]["path"]]
        chain = video_chain(info, c, W, H, fps, d)
        fc.append(f"[{n}:v]{chain},trim=0:{d:.4f},setpts=PTS+{t0:.4f}/TB[b{bi}]")
        fc.append(f"{v}[b{bi}]overlay=eof_action=pass:enable='between(t,{t0:.4f},{t0 + d - 0.001:.4f})'[vb{bi}]")
        v = f"[vb{bi}]"
        n += 1
    # grade
    gr = edl.get("grade", {})
    gchain = []
    if gr.get("look"):
        write_lut(gr["look"], gr.get("intensidade", 0.7), os.path.join(work, "grade.cube"))
        gchain.append("lut3d=file=grade.cube:interp=tetrahedral")
    if gr.get("nitidez"):
        gchain.append(f"cas=strength={gr['nitidez']}")
    if gchain:
        fc.append(f"{v}{','.join(gchain)}[vg]")
        v = "[vg]"
    if gr.get("halation"):
        sig = W * 0.012
        fc.append(f"{v}split[hA][hB]")
        fc.append(f"[hB]format=gbrp,colorlevels=rimin=0.72:gimin=0.72:bimin=0.72,gblur=sigma={sig:.1f},"
                  f"colorchannelmixer=rr=1:gg=0.38:bb=0.18,format=yuv420p[hC]")
        fc.append(f"[hA][hC]blend=all_mode=screen:all_opacity={gr['halation']}[vh]")
        v = "[vh]"
    post = []
    if gr.get("vinheta"):
        post.append(f"vignette=angle={0.15 + 0.55 * gr['vinheta']:.3f}")
    if gr.get("grao"):
        post.append(f"noise=c0s={gr['grao'] * 40:.1f}:c0f=t")
    if gr.get("barras"):
        ratio = 2.39 if gr["barras"] is True else gr["barras"]
        bh = max(0, int((H - W / ratio) / 2))
        if bh:
            post.append(f"drawbox=0:0:{W}:{bh}:black:t=fill,drawbox=0:{H - bh}:{W}:{bh}:black:t=fill")
    if post:
        fc.append(f"{v}{','.join(post)}[vp]")
        v = "[vp]"
    # transicoes (flash / dip)
    for ti, tr in enumerate(edl.get("transicoes", [])):
        t0 = plan.t(tr["t"])
        kind = tr.get("tipo", "flash")
        colr, d_in, d_out = ("white", 0.04, 0.22) if kind == "flash" else ("black", 0.18, 0.22)
        st = max(0, t0 - d_in)
        fc.append(f"color=c={colr}:s={W}x{H}:r={fps}:d={d_in + d_out:.3f},format=rgba,"
                  f"fade=t=in:st=0:d={d_in}:alpha=1,fade=t=out:st={d_in}:d={d_out}:alpha=1,"
                  f"colorchannelmixer=aa={tr.get('forca', 0.85)},setpts=PTS+{st:.4f}/TB[tr{ti}]")
        fc.append(f"{v}[tr{ti}]overlay=eof_action=pass:enable='between(t,{st:.4f},{st + d_in + d_out:.4f})'[vt{ti}]")
        v = f"[vt{ti}]"
    # overlays externos com alfa (HyperFrames/Remotion .mov/.webm)
    for oi, o in enumerate(edl.get("overlays", [])):
        t0 = plan.t(o["t"])
        inputs += ["-i", plan.abs(o["file"])]
        fc.append(f"[{n}:v]scale={W}:{H},setpts=PTS-STARTPTS+{t0:.4f}/TB[o{oi}]")
        fc.append(f"{v}[o{oi}]overlay=eof_action=pass[vo{oi}]")
        v = f"[vo{oi}]"
        n += 1
    fc.append(f"{v}ass=graficos.ass:fontsdir=fonts,format=yuv420p[vout]")

    # audio
    au = edl.get("audio", {})
    voice = "[0:a]highpass=f=75"
    if au.get("voz_eq", True):
        voice += (",equalizer=f=200:t=q:w=1.0:g=-1.5,equalizer=f=3500:t=q:w=1.2:g=2,"
                  "acompressor=threshold=0.08:ratio=3:attack=8:release=120:makeup=1.6")
    fc.append(f"{voice},asplit=2[vox][vkey]")
    mix = ["[vox]"]
    mu = edl.get("musica")
    if mu:
        inputs += ["-ss", f"{mu.get('inicio', 0)}", "-i", plan.abs(mu["path"])]
        fo = mu.get("fade_out", 1.5)
        m = (f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,volume={mu.get('db', -20)}dB,"
             f"afade=t=in:d={mu.get('fade_in', 0.3)},apad,atrim=0:{T:.3f},afade=t=out:st={max(0, T - fo):.3f}:d={fo}")
        for s0, s1 in mu.get("silencio", []):  # buracos na musica (ex.: 0,4 s antes do CTA)
            m += f",volume=0:enable='between(t,{plan.t(s0):.3f},{plan.t(s1):.3f})'"
        n += 1
        if mu.get("ducking", True):
            fc.append(f"{m}[mraw]")
            fc.append("[mraw][vkey]sidechaincompress=threshold=0.025:ratio=6:attack=25:release=400:makeup=1[mus]")
        else:
            fc.append(f"{m}[mus]")
            fc.append("[vkey]anullsink")
        mix.append("[mus]")
    else:
        fc.append("[vkey]anullsink")
    for si, s in enumerate(edl.get("sfx", [])):
        t0 = plan.t(s["t"])
        inputs += ["-i", find_sfx(s["som"])]
        ms = int(max(0, t0) * 1000)
        fc.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,volume={s.get('db', -14)}dB,"
                  f"adelay={ms}|{ms}[s{si}]")
        mix.append(f"[s{si}]")
        n += 1
    fc.append(f"{''.join(mix)}amix=inputs={len(mix)}:normalize=0:duration=first,atrim=0:{T:.3f}[aout]")

    open(os.path.join(work, "final.fc"), "w", encoding="utf-8").write(";\n".join(fc))
    tmp = "final_tmp.mkv"
    sh(["ffmpeg", "-v", "error", "-y"] + inputs + ["-/filter_complex", "final.fc", "-map", "[vout]", "-map", "[aout]",
                                                   "-t", f"{T:.3f}", "-r", str(fps)]
       + enc_args(enc) + ["-c:a", "pcm_s24le", tmp], cwd=work)

    # 4) loudness (2 passos: medir -> ganho linear + limitador)
    target = au.get("lufs", -14)
    r = sh(["ffmpeg", "-v", "info", "-i", tmp, "-vn", "-af", "ebur128", "-f", "null", "-"], cwd=work)
    I = float(re.findall(r"I:\s+(-?[\d.]+) LUFS", r.stderr)[-1])
    gain = target - I
    out = plan.abs(edl.get("saida", "final.mp4"))
    if a.preview:
        out = os.path.splitext(out)[0] + "_preview.mp4"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    sh(["ffmpeg", "-v", "error", "-y", "-i", tmp, "-c:v", "copy", "-af",
        f"volume={gain:.2f}dB,alimiter=limit=0.85:attack=3:release=50:level=false", "-c:a", "aac", "-b:a", "320k",
        "-ar", "48000", "-movflags", "+faststart", out], cwd=work)
    ev = [plan.t(x["t"]) for x in edl.get("broll", []) + edl.get("graficos", []) + edl.get("transicoes", [])]
    ev += [plan.t(b["t"]) + (plan.t(b["ate"]) - plan.t(b["t"]) if "ate" in b else b.get("dur", 1.5)) for b in edl.get("broll", [])]
    json.dump({"total": plan.total, "clips": plan.clips, "words": plan.words, "eventos": sorted(round(x, 3) for x in ev)},
              open(os.path.join(base, "plano.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"OK -> {out}  ({T:.2f}s, loudness {I:.1f} -> {target} LUFS)")


if __name__ == "__main__":
    main()
