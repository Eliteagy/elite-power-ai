"""Legendas estilo Gui (branco SF Pro 900 + palavra-chave azul manuscrita com glow) -> PNG RGBA por frame."""
import json, os, re, sys, wave, numpy as np, cv2
from paths import PROJECT, FONT_SF, FONT_SCRIPT
from PIL import Image, ImageDraw, ImageFont

W_DIR = PROJECT
FPS = 30000 / 1001
CW, CH = 1080, 1920
SF = FONT_SF
SCRIPT = FONT_SCRIPT

WHITE_SIZE, WHITE_TRACK, WHITE_WGHT, WHITE_ALPHA = 106, -0.035, 900, 0.92
BLUE_SIZE, BLUE_SX = 185, 0.75
LINE1, LINE2 = 1412, 1512          # baselines
MAX_W = 940
REVEAL_RATE = 4.7                  # letters per frame (white L->R)
GLOW_SIGMA, GLOW_ALPHA, GLOW_RGB = 11, 0.24, (90, 170, 255)
LIGHT, DARK = np.array([95, 190, 248]) / 255, np.array([60, 115, 188]) / 255

STOP = set("""a o as os um uma uns umas e é de do da dos das em no na nos nas para pra por com que se me te
você vocês eu já aqui lá mais muito esse essa esses essas este esta isso ao aos à mas porém porque não sim ainda
também tem temos vai vou pode podem seu sua seus suas onde como quem agora então bom ele dela dele sobre só mesmo
assim além disso todo toda todos todas sem nesse nessa desse dessa deixa seria há acho vem conta pouco outro temos veio""".split())


def norm_words(words, fixes):
    out = []
    for w in words:
        t = w["w"].strip()
        if t.startswith("-") and out:
            out[-1]["w"] += t; out[-1]["e"] = w["e"]; out[-1]["end_punct"] = bool(re.search(r"[.?!]$", t)); continue
        out.append({"w": t, "s": w["s"], "e": w["e"]})
    for o in out:
        o["sent_end"] = bool(re.search(r"[.?!]$", o["w"]))
        o["comma"] = o["w"].endswith(",")
        o["w"] = re.sub(r"[.,!?;:]", "", o["w"])
    out = fixes(out)
    return [o for o in out if o["w"]]


def refine_starts(words, wav):
    with wave.open(wav) as wf:
        x = np.frombuffer(wf.readframes(wf.getnframes()), np.int16).astype(np.float32) / 32768; sr = wf.getframerate()
    hop = sr // 100; n = len(x) // hop
    db = 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)
    thr = max(np.percentile(db, 10) + 8, np.percentile(db, 90) - 28)
    prev_e = 0
    for w in words:
        a, b = int(w["s"] * 100), int(w["e"] * 100)
        on = next((i for i in range(a, max(a + 1, b - 5)) if (db[i:i + 4] > thr).all()), a)
        w["s"] = max(prev_e, min(on / 100 - 0.03, w["e"] - 0.12), w["s"])
        prev_e = w["s"] + 0.01
    return words


def _blue_of(ws):
    content = [w for w in ws if w["w"].lower() not in STOP and len(w["w"]) > 2]
    return max(content, key=lambda w: len(w["w"])) if content else None


def _lines(ws, blue):
    if blue is None:
        return [ws]
    i = ws.index(blue)
    before, after = ws[:i], ws[i + 1:]
    if before and after:
        return None
    return [l for l in (before, [blue], after) if l]


def blocks_of(words):
    chunks, cur = [], []
    for w in words:
        if cur and (cur[-1]["sent_end"] or cur[-1]["comma"] or w["s"] - cur[-1]["e"] > 0.35):
            chunks.append(cur); cur = []
        cur.append(w)
    if cur: chunks.append(cur)
    blocks = []
    for ch in chunks:
        i = 0
        while i < len(ch):
            chosen = None
            for n in (3, 2, 1):
                ws = ch[i:i + n]
                if len(ws) < n: continue
                blue = _blue_of(ws)
                lines = _lines(ws, blue)
                if lines is None: continue
                if any(sum(len(x["w"]) + 1 for x in l) - 1 > 16 for l in lines if not (len(l) == 1 and l[0] is blue)): continue
                if n > 1 and ws[-1]["s"] - ws[0]["s"] > 0.75: continue
                chosen = (ws, blue, lines); break
            ws, blue, lines = chosen
            for w in ws: w["blue"] = w is blue
            blocks.append({"words": ws, "lines": lines})
            i += len(ws)
    return blocks


# ---------------- glyph rendering ----------------
def white_font():
    f = ImageFont.truetype(SF, WHITE_SIZE); f.set_variation_by_axes([100, 96, 400, WHITE_WGHT]); return f


def render_white(text):
    f = white_font(); pad = 40
    adv = [f.getlength(c) + WHITE_TRACK * WHITE_SIZE for c in text]
    width = int(sum(adv) + 2 * pad); h = int(WHITE_SIZE * 1.9); base = int(WHITE_SIZE * 1.35)
    letters, x = [], pad
    full = Image.new("L", (width, h), 0)
    for c, a in zip(text, adv):
        im = Image.new("L", (width, h), 0); ImageDraw.Draw(im).text((x, base), c, font=f, fill=255, anchor="ls")
        letters.append(np.array(im, np.float32) / 255); full.paste(im, (0, 0), im); x += a
    arr = np.array(full, np.float32) / 255
    xs = np.where(arr.max(0) > 0.05)[0]
    ink_w = xs.max() - xs.min()
    scale = min(1.0, MAX_W / ink_w)
    if scale < 1:
        letters = [cv2.resize(L, (int(width * scale), int(h * scale)), interpolation=cv2.INTER_AREA) for L in letters]
        base = base * scale; xs = (xs * scale).astype(int)
    cx = (xs.min() + xs.max()) / 2
    return {"letters": letters, "ox": cx, "oy": base}


def render_blue(text):
    f = ImageFont.truetype(SCRIPT, BLUE_SIZE); pad = 60
    w = int(f.getlength(text) + 2 * pad); h = int(BLUE_SIZE * 2.2); base = int(BLUE_SIZE * 1.35)
    im = Image.new("L", (w, h), 0); ImageDraw.Draw(im).text((pad, base), text, font=f, fill=255, anchor="ls")
    al = np.array(im, np.float32) / 255
    al = cv2.resize(al, (int(w * BLUE_SX), h), interpolation=cv2.INTER_AREA)
    xs = np.where(al.max(0) > 0.05)[0]; ink_w = xs.max() - xs.min()
    scale = min(1.0, MAX_W / ink_w)
    if scale < 1:
        al = cv2.resize(al, (int(al.shape[1] * scale), int(h * scale)), interpolation=cv2.INTER_AREA); base *= scale
        xs = np.where(al.max(0) > 0.05)[0]
    y = np.arange(al.shape[0])[:, None] - base
    xh = 0.33 * BLUE_SIZE * scale
    t = np.clip((y + xh) / xh, 0, 1)
    rgb = LIGHT[None, None, :] * (1 - t[..., None]) + DARK[None, None, :] * t[..., None]
    rgb = np.broadcast_to(rgb, al.shape + (3,)).copy()
    glow = cv2.GaussianBlur(al, (0, 0), GLOW_SIGMA)
    return {"al": al, "rgb": rgb, "glow": glow, "ox": (xs.min() + xs.max()) / 2, "oy": base}


def over(dst_rgb, dst_a, src_rgb, src_a, x, y):
    H, W = dst_a.shape; h, w = src_a.shape
    x0, y0 = max(x, 0), max(y, 0); x1, y1 = min(x + w, W), min(y + h, H)
    if x1 <= x0 or y1 <= y0: return
    s_a = src_a[y0 - y:y1 - y, x0 - x:x1 - x]
    s_rgb = src_rgb[y0 - y:y1 - y, x0 - x:x1 - x] if src_rgb.ndim == 3 else src_rgb
    d_a = dst_a[y0:y1, x0:x1]; d_rgb = dst_rgb[y0:y1, x0:x1]
    out_a = s_a + d_a * (1 - s_a)
    num = s_rgb * s_a[..., None] + d_rgb * (d_a * (1 - s_a))[..., None]
    dst_rgb[y0:y1, x0:x1] = num / np.maximum(out_a, 1e-6)[..., None]; dst_a[y0:y1, x0:x1] = out_a


def render_white_line(words):
    text = " ".join(w["w"] for w in words)
    g = render_white(text)
    owner, k = [], 0
    for wi, w in enumerate(words):
        for j in range(len(w["w"])):
            owner.append((wi, j))
        if wi < len(words) - 1:
            owner.append((wi, len(w["w"])))
    g["owner"] = owner
    return g


def layout(blocks, total_frames):
    items = []
    for bi, blk in enumerate(blocks):
        b = blk["words"]; lines = blk["lines"]
        nxt = blocks[bi + 1]["words"][0]["s"] if bi + 1 < len(blocks) else total_frames / FPS
        end = min(nxt, b[-1]["e"] + 0.4) if nxt - b[-1]["e"] > 0.6 else nxt
        f_end = int(round(end * FPS)) - 1
        if len(lines) == 2:
            bases = [LINE1, LINE2]
        else:
            bases = [LINE2] if lines[0][0]["blue"] else [LINE1]
        for line, base in zip(lines, bases):
            if len(line) == 1 and line[0]["blue"]:
                w = line[0]
                items.append({"blue": True, "g": render_blue(w["w"]), "f0": int(round(w["s"] * FPS)), "f1": f_end, "base": base, "text": w["w"]})
            else:
                g = render_white_line(line)
                items.append({"blue": False, "g": g, "starts": [int(round(w["s"] * FPS)) for w in line],
                              "f0": int(round(line[0]["s"] * FPS)), "f1": f_end, "base": base, "text": " ".join(w["w"] for w in line)})
    return items


def render(items, total_frames, outdir, extra=None, frames=None):
    os.makedirs(outdir, exist_ok=True)
    for f in (frames if frames is not None else range(total_frames)):
        rgb = np.zeros((CH, CW, 3), np.float32); al = np.zeros((CH, CW), np.float32)
        if extra: extra(f, rgb, al)
        for it in items:
            if not (it["f0"] <= f <= it["f1"]): continue
            g = it["g"]; k = f - it["f0"]
            x = int(round(CW / 2 - g["ox"])); y = int(round(it["base"] - g["oy"]))
            if it["blue"]:
                dy, op, blur = [(50, 0.3, 6), (10, 0.95, 1.5), (-2, 1.0, 0)][k] if k < 3 else (0, 1.0, 0)
                a_, g_, c_ = g["al"] * op, g["glow"] * GLOW_ALPHA * op, g["rgb"]
                if blur:
                    a_ = cv2.GaussianBlur(a_, (0, 0), blur); g_ = cv2.GaussianBlur(g_, (0, 0), blur)
                sh = cv2.GaussianBlur(a_, (0, 0), 6) * 0.32
                over(rgb, al, np.zeros(3, np.float32), sh, x, y + dy + 4)
                over(rgb, al, np.array(GLOW_RGB, np.float32) / 255, g_, x, y + dy)
                over(rgb, al, c_, a_, x, y + dy)
            else:
                m = np.zeros_like(g["letters"][0])
                for i, L in enumerate(g["letters"]):
                    wi, j = g["owner"][i]
                    t = (f - it["starts"][wi] + 1) * REVEAL_RATE
                    m = m + L * np.clip(t - j, 0, 1)
                m = np.clip(m, 0, 1)
                sh = cv2.GaussianBlur(m, (0, 0), 5) * 0.22
                over(rgb, al, np.zeros(3, np.float32), sh, x, y + 3)
                over(rgb, al, np.array([0.98, 0.98, 0.98], np.float32), m * WHITE_ALPHA, x, y)
        Image.fromarray(np.clip(np.dstack([rgb, al]) * 255, 0, 255).astype(np.uint8)).save(f"{outdir}/{f:05d}.png")
