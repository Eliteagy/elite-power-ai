#!/usr/bin/env python3
"""Renderiza legendas dinâmicas (palavra a palavra) para um .mov com alfa (qtrle ARGB) -> pôr em V2/V3 no DaVinci.

Uso:
  python legendas_dinamicas.py legendas.srt saida.mov --fonte Inter-Black.ttf [opções]
  python legendas_dinamicas.py legendas.srt preview --fonte F.ttf --preview 2.0 5.3 10.1   (gera JPGs para verificar)

Opções principais:
  --formato 1920x1080 | 1080x1920     --fps 30
  --estilo  brush     (YouTube: 1 linha, palavra-chave vermelha ou branca sobre pincel vermelho a cada 3 cues)
            destaque  (reels: 1 linha, palavra-chave colorida maior; ex. --cor ff4fa3 rosa / 3ddc84 verde / ffd400 amarelo)
            empilhado (reels: palavra-chave GIGANTE numa linha própria, resto pequeno por cima/baixo)
            minimal   (frase inteira pequena, branca, fade — look de filme/documentário)
  --cor HEX           cor de destaque (padrão e82818)
  --y FRACAO          posição vertical da linha base (0.91 YouTube; 0.68–0.72 reels, acima da UI do Instagram)
  --tamanho PX        tamanho base (palavra-chave = 1.26x); encolhe sozinho para caber em 88% da largura
  --maiusculas / --sem-maiusculas
  --partes N          divide em ficheiros de N frames (ponte para o PC aceita até ~30 MB por ficheiro)
Palavra-chave = palavra mais longa que não seja stopword (números ganham bónus). Tempo de cada palavra
proporcional ao comprimento dentro do cue. Para controlo total, edita o SRT (1 cue = 2–6 palavras).
"""
import argparse, re, random, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ap = argparse.ArgumentParser()
ap.add_argument("srt"); ap.add_argument("out"); ap.add_argument("--fonte", required=True)
ap.add_argument("--formato", default="1920x1080"); ap.add_argument("--fps", type=float, default=30)
ap.add_argument("--estilo", default="brush", choices=["brush", "destaque", "empilhado", "minimal"])
ap.add_argument("--cor", default="e82818"); ap.add_argument("--y", type=float)
ap.add_argument("--tamanho", type=int); ap.add_argument("--sem-maiusculas", action="store_true")
ap.add_argument("--partes", type=int, default=0); ap.add_argument("--preview", nargs="*", type=float)
a = ap.parse_args()

W, H = map(int, a.formato.split("x")); FPS = a.fps
ACC = tuple(int(a.cor[i:i+2], 16) for i in (0, 2, 4)) + (255,); WHITE = (255, 255, 255, 255)
vertical = H > W
BASE = a.tamanho or (int(W * 0.024) if not vertical else int(W * 0.062))
if a.estilo == "minimal": BASE = a.tamanho or (int(W * 0.02) if not vertical else int(W * 0.045))
YB = int(H * (a.y if a.y else (0.912 if not vertical else 0.70)))
UPPER = not a.sem_maiusculas and a.estilo != "minimal"

def ts(s):
    h, m, r = s.strip().replace(".", ",").split(":"); sec, ms = r.split(",")
    return int(h) * 3600 + int(m) * 60 + int(sec) + int(ms) / 1000
cues = []
for b in re.split(r"\n\s*\n", open(a.srt, encoding="utf-8-sig").read().strip()):
    l = b.strip().split("\n")
    if len(l) < 3 or "-->" not in l[1]: continue
    s, e = l[1].split("-->"); cues.append((ts(s), ts(e), " ".join(l[2:]).strip()))

STOP = set("um uma uns umas de do da dos das no na nos nas em e o a os as que por para com ao à é ou se teu tua seu sua "
           "já está mais ainda isso não mas muito como quando the and of to you".split())
def keyword(words):
    best, bi = -1, None
    for i, w in enumerate(words):
        c = re.sub(r"[^\wÀ-ú]", "", w).lower()
        if c in STOP or len(c) < 4: continue
        sc = len(c) + (3 if any(ch.isdigit() for ch in c) else 0)
        if sc > best: best, bi = sc, i
    return bi

L = []
for ci, (s, e, txt) in enumerate(cues):
    words = (txt.upper() if UPPER else txt).replace("…", "").split()
    if not words: continue
    lens = [len(w) + 2 for w in words]; tot = sum(lens); t = s; times = []
    for n in lens: times.append(t); t += (e - s) * 0.85 * n / tot
    k = None if a.estilo == "minimal" else keyword(words)
    L.append(dict(s=s, e=e, w=words, t=times, k=k, box=(a.estilo == "brush" and k is not None and ci % 3 == 1), seed=ci))

fcache = {}
def F(sz):
    if sz not in fcache: fcache[sz] = ImageFont.truetype(a.fonte, sz)
    return fcache[sz]
def ease(p): p = max(0.0, min(1.0, p)); return 1 - (1 - p) ** 3

def brush(img, x0, y0, x1, y1, seed):
    rnd = random.Random(seed); lay = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(lay); n = 14; pts = []
    for i in range(n + 1): pts.append((x0 + (x1 - x0) * i / n + rnd.uniform(-6, 6), y0 + rnd.uniform(-10, 6)))
    pts.append((x1 + rnd.uniform(8, 22), (y0 + y1) / 2))
    for i in range(n, -1, -1): pts.append((x0 + (x1 - x0) * i / n + rnd.uniform(-6, 6), y1 + rnd.uniform(-6, 10)))
    pts.append((x0 - rnd.uniform(8, 22), (y0 + y1) / 2)); d.polygon(pts, fill=ACC)
    for _ in range(10):
        yy = rnd.uniform(y0, y1); d.line([(x0 - rnd.uniform(0, 30), yy), (x0 + rnd.uniform(10, 60), yy)], fill=ACC, width=rnd.randint(2, 5))
        yy = rnd.uniform(y0, y1); d.line([(x1 - rnd.uniform(10, 60), yy), (x1 + rnd.uniform(0, 40), yy)], fill=ACC, width=rnd.randint(2, 5))
    img.alpha_composite(lay)

def word(img, x, y, w, f, col, t0, t, shadow=True, anchor="ls"):
    p = (t - t0) / 0.15
    if p < 0: return
    e_ = ease(p); alpha = int(255 * ease(p * 1.5)); dy = int(H * 0.009) * (1 - e_)
    wl = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if shadow:
        sh = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ImageDraw.Draw(sh).text((x + 3, y + dy + 4), w, font=f, fill=(0, 0, 0, 170), anchor=anchor)
        wl.alpha_composite(sh.filter(ImageFilter.GaussianBlur(5)))
    ImageDraw.Draw(wl).text((x, y + dy), w, font=f, fill=col, anchor=anchor)
    if alpha < 255: wl.putalpha(wl.getchannel("A").point(lambda v: v * alpha // 255))
    img.alpha_composite(wl)

def line_layout(words, idx, k, base, kw, maxw, pad=0):
    while True:
        fs, fk = F(base), F(kw); sp = fs.getlength(" ") * 1.1
        ws = [(fk if i == k else fs).getlength(words[i]) for i in idx]
        tot = sum(ws) + sp * (len(idx) - 1) + 2 * pad
        if tot <= maxw or base <= 16: return fs, fk, sp, ws, tot
        base -= 2; kw -= 2

def render(t):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); cur = None
    for c in L:
        if c["s"] - 0.02 <= t < c["e"] + 0.15: cur = c
    if not cur: return img
    w, k = cur["w"], cur["k"]; maxw = W * 0.88
    if a.estilo == "empilhado" and k is not None:
        rows = [r for r in (list(range(0, k)), [k], list(range(k + 1, len(w)))) if r]
        big = int(BASE * 2.1); sizes = [big if r == [k] else BASE for r in rows]
        y = YB - sum(s * 0.9 for s in sizes[1:]) - 0.2 * BASE * (len(rows) - 1)  # linha base da 1.ª linha
        for r, sz in zip(rows, sizes):
            isk = r == [k]
            fs, fk, sp, ws, tot = line_layout(w, r, k, sz, sz, maxw)
            x = (W - tot) / 2
            for j, i in enumerate(r):
                word(img, x, y, w[i], fk if isk else fs, ACC if isk else WHITE, cur["t"][i], t); x += ws[j] + sp
            nxt = sizes[rows.index(r) + 1] if rows.index(r) + 1 < len(rows) else 0
            y += nxt * 0.9 + 0.2 * BASE
        return img
    kw = BASE if a.estilo == "minimal" else int(BASE * 1.26)
    pad = int(BASE * 0.6) if cur["box"] else 0
    fs, fk, sp, ws, tot = line_layout(w, list(range(len(w))), k, BASE, kw, maxw, pad)
    x = (W - tot) / 2
    for i in range(len(w)):
        f = fk if i == k else fs; boxed = (i == k and cur["box"])
        if boxed:
            x += pad
            if t >= cur["t"][i]:
                rv = ease((t - cur["t"][i]) / 0.18); asc = f.getbbox(w[i])[1]
                brush(img, x - 18, YB - f.size + asc - 8, x - 18 + (ws[i] + 36) * rv, YB + 14, cur["seed"])
        col = ACC if (i == k and not boxed) else WHITE
        t0 = cur["s"] if a.estilo == "minimal" else cur["t"][i]
        word(img, x, YB, w[i], f, col, t0, t, shadow=not boxed)
        x += ws[i] + sp + (pad if boxed else 0)
    return img

if a.preview:
    for tt in a.preview:
        bg = Image.new("RGBA", (W, H), (60, 70, 80, 255)); bg.alpha_composite(render(tt))
        bg.convert("RGB").resize((W // 2, H // 2)).save(f"{a.out}_{tt}.jpg"); print(f"{a.out}_{tt}.jpg")
    sys.exit()

n = int((L[-1]["e"] + 0.5) * FPS); empty = bytes(W * H * 4)
per = a.partes or n; part = 0
for start in range(0, n, per):
    part += 1; name = a.out if not a.partes else a.out.replace(".mov", f"_parte{part}.mov")
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgba", "-s", f"{W}x{H}", "-r", str(FPS),
                          "-i", "-", "-c:v", "qtrle", "-pix_fmt", "argb", name], stdin=subprocess.PIPE)
    for i in range(start, min(n, start + per)):
        im = render(i / FPS); p.stdin.write(im.tobytes() if im.getbbox() else empty)
    p.stdin.close(); p.wait(); print(name, f"começa em {start/FPS:.2f}s")
