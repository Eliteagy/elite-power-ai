"""Cartões de ícones (Material Symbols) sincronizados com palavras — mesma paleta azul das legendas."""
import json, os, numpy as np, cv2
from paths import PROJECT, FONT_ICONS, ICON_CODEPOINTS
from PIL import Image, ImageDraw, ImageFont
from captions import FPS, CW, CH, SF, LIGHT, DARK, over

W_DIR = PROJECT
ICON_FONT = FONT_ICONS
CP = {l.split()[0]: int(l.split()[1], 16) for l in open(ICON_CODEPOINTS)}
CARD, RADIUS, GAP = 196, 38, 22
ROW_Y = 1150                       # card center
ICON_PX, LABEL_PX = 92, 25
HOLD = 1.8                         # seconds after last card if no explicit end
IN_F, OUT_F, SHIFT_F = 8, 6, 7

# Cues por vídeo: PROJECT/icons_cues.json  ->  {"v1": [{"cards": [["palavra", n_ocorrencia, "icone_material", "ETIQUETA"], ...], "end": seg|null}, ...]}
_CF = os.path.join(PROJECT, "icons_cues.json")
CUES = json.load(open(_CF, encoding="utf-8")) if os.path.exists(_CF) else {}


def find_word(words, w, nth):
    k = 0
    for x in words:
        if x["w"].lower() == w:
            k += 1
            if k == nth:
                return x["s"]
    raise KeyError(f"{w}#{nth} not found")


def label_font(px):
    f = ImageFont.truetype(SF, px); f.set_variation_by_axes([100, 96, 400, 800]); return f


def render_card(icon, label):
    """returns dict rgb (h,w,3 float), al (h,w float) with glow, centered at its middle."""
    # label layout
    px = LABEL_PX
    while True:
        f = label_font(px); tw = f.getlength(label) + 0.04 * px * len(label)
        if tw <= CARD - 26 or px <= 19: break
        px -= 1
    w = max(CARD, int(tw + 40)); h = CARD
    pad = 40
    Wd, Hd = w + 2 * pad, h + 2 * pad
    body = Image.new("L", (Wd, Hd), 0)
    ImageDraw.Draw(body).rounded_rectangle([pad, pad, pad + w - 1, pad + h - 1], RADIUS, fill=255)
    border = Image.new("L", (Wd, Hd), 0)
    d = ImageDraw.Draw(border); d.rounded_rectangle([pad, pad, pad + w - 1, pad + h - 1], RADIUS, outline=255, width=3)
    body = np.array(body, np.float32) / 255; border = np.array(border, np.float32) / 255
    # icon glyph
    fi = ImageFont.truetype(ICON_FONT, ICON_PX); fi.set_variation_by_axes([1, 0, 48, 500])
    ic = Image.new("L", (Wd, Hd), 0)
    ImageDraw.Draw(ic).text((Wd / 2, pad + h * 0.40), chr(CP[icon]), font=fi, fill=255, anchor="mm")
    ic = np.array(ic, np.float32) / 255
    lb = Image.new("L", (Wd, Hd), 0)
    dl = ImageDraw.Draw(lb); x = (Wd - tw) / 2
    for ch in label:
        dl.text((x, pad + h * 0.80), ch, font=f, fill=255, anchor="lm"); x += f.getlength(ch) + 0.04 * px
    lb = np.array(lb, np.float32) / 255
    # compose
    rgb = np.zeros((Hd, Wd, 3), np.float32); al = np.zeros((Hd, Wd), np.float32)
    glow = cv2.GaussianBlur(body, (0, 0), 14) * 0.45
    over(rgb, al, np.array([90, 170, 255], np.float32) / 255, glow, 0, 0)
    over(rgb, al, np.array([12, 18, 32], np.float32) / 255, body * 0.84, 0, 0)
    over(rgb, al, np.array([90, 170, 255], np.float32) / 255, border * 0.8, 0, 0)
    y = np.linspace(0, 1, Hd)[:, None, None]
    yy = np.clip((y * Hd - (pad + h * 0.40 - ICON_PX * 0.5)) / ICON_PX, 0, 1)
    icol = LIGHT[None, None, :] * (1 - yy) + DARK[None, None, :] * yy * 0.6 + LIGHT[None, None, :] * yy * 0.4
    icol = np.broadcast_to(icol, (Hd, Wd, 3)).copy()
    iglow = cv2.GaussianBlur(ic, (0, 0), 6) * 0.5
    over(rgb, al, np.array([90, 170, 255], np.float32) / 255, iglow, 0, 0)
    over(rgb, al, icol, ic, 0, 0)
    over(rgb, al, np.array([0.97, 0.97, 0.97], np.float32), lb, 0, 0)
    return {"rgb": rgb, "al": al, "w": w, "W": Wd, "H": Hd}


def build_icons(v, words, total_frames):
    groups = []
    starts = []
    for gi, g in enumerate(CUES.get(v, [])):
        cards = []
        for (w, nth, icon, label) in g["cards"]:
            t = find_word(words, w, nth)
            cards.append({"t": t, "f0": int(round(t * FPS)), "img": render_card(icon, label), "label": label})
        starts.append(cards[0]["t"])
        groups.append({"cards": cards, "end": g["end"]})
    for gi, g in enumerate(groups):
        end = g["end"] if g["end"] is not None else total_frames / FPS
        end = min(end, (starts[gi + 1] - 0.08) if gi + 1 < len(groups) else total_frames / FPS)
        g["f1"] = int(round(end * FPS)) - 1
    return groups


def ease_out_back(x):
    x = np.clip(x, 0, 1); c1, c3 = 1.70158, 2.70158
    return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2


def smoothstep(x):
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)


def draw_icons(groups, f, rgb, al):
    for g in groups:
        if f < g["cards"][0]["f0"] or f > g["f1"]:
            continue
        vis = [c for c in g["cards"] if c["f0"] <= f]
        n = len(vis)
        def layout(m):
            ws = [c["img"]["w"] for c in vis[:m]]
            tot = sum(ws) + GAP * (m - 1); x = CW / 2 - tot / 2; xs = []
            for wv in ws:
                xs.append(x + wv / 2); x += wv + GAP
            return xs
        cur = layout(n)
        if n > 1:
            k = smoothstep((f - vis[-1]["f0"]) / SHIFT_F)
            prev = layout(n - 1) + [cur[-1]]
            cur = [p + (c - p) * k for p, c in zip(prev, cur)]
        out_k = smoothstep((g["f1"] - f) / OUT_F)          # 1 normally, ->0 at end
        for c, cx in zip(vis, cur):
            age = f - c["f0"]
            s = 0.55 + 0.45 * ease_out_back(age / IN_F)
            s *= 0.9 + 0.1 * out_k
            a = min(1.0, age / 4.0) * out_k
            dy = (1 - smoothstep(age / IN_F)) * 26
            im = c["img"]
            if abs(s - 1) > 1e-3:
                Ws, Hs = max(2, int(im["W"] * s)), max(2, int(im["H"] * s))
                c_rgb = cv2.resize(im["rgb"], (Ws, Hs), interpolation=cv2.INTER_LINEAR)
                c_al = cv2.resize(im["al"], (Ws, Hs), interpolation=cv2.INTER_LINEAR)
            else:
                c_rgb, c_al, Ws, Hs = im["rgb"], im["al"], im["W"], im["H"]
            x = int(round(cx - Ws / 2)); y = int(round(ROW_Y + dy - Hs / 2))
            over(rgb, al, c_rgb, c_al * a, x, y)


def sfx_times(groups):
    return sorted(c["t"] for g in groups for c in g["cards"])
