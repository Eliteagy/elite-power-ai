"""Legendas palavra a palavra e graficos de texto em ASS (renderizados pelo libass do ffmpeg).

Design segue Apple HIG adaptado a video: Inter (substituto livre da SF Pro) em Semibold/Bold/Black,
nunca pesos leves; 1 cor de destaque e so na palavra-chave; contraste >= 4.5:1 (sombra suave ou
material escuro por tras); motion curto (120-250 ms), com ease, sempre com motivo.

Usado por render.py. Nao correr sozinho.
"""
import os, re

from PIL import ImageFont

FONTS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "fonts")
WEIGHT_FILE = {"Inter Medium": "Inter-Medium.ttf", "Inter SemiBold": "Inter-SemiBold.ttf",
               "Inter": "Inter-Bold.ttf", "Inter Bold": "Inter-Bold.ttf", "Inter ExtraBold": "Inter-ExtraBold.ttf", "Inter Black": "Inter-Black.ttf"}

# Cores de sistema Apple (modo escuro) -> &HBBGGRR&
PALETTE = {"amarelo": "#FFD60A", "laranja": "#FF9F0A", "verde": "#30D158", "azul": "#0A84FF", "vermelho": "#FF453A",
           "branco": "#FFFFFF", "preto": "#000000", "cinza": "#8E8E93", "material": "#1C1C1E", "dourado": "#E8C27A"}


def _hex(c):
    return PALETTE.get(c, c).lstrip("#")


def rel_lum(c):
    """Luminancia relativa WCAG de uma cor hex."""
    h = _hex(c)
    ch = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    ch = [v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4 for v in ch]
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]


def contrast(l1, l2):
    a, b = max(l1, l2), min(l1, l2)
    return (a + 0.05) / (b + 0.05)


def accent_for(accent, bg, minimo=3.0):
    """Ajusta o acento ate ter contraste >= minimo com o fundo (WCAG texto grande): escurece em fundo claro."""
    h = _hex(accent)
    rgb = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
    hx = "#" + h
    for _ in range(14):
        hx = "#" + "".join(f"{v:02X}" for v in rgb)
        if bg is None or contrast(rel_lum(hx), bg) >= minimo:
            break
        rgb = [int(v * 0.85) for v in rgb] if bg > 0.3 else [min(255, int(v + (255 - v) * 0.25)) for v in rgb]
    return hx


def col(c):
    c = PALETTE.get(c, c).lstrip("#")
    return f"&H{c[4:6]}{c[2:4]}{c[0:2]}&".upper()


def ts(t):
    t = max(0.0, t)
    h, r = divmod(t, 3600)
    m, s = divmod(r, 60)
    return f"{int(h)}:{int(m):02d}:{s:05.2f}"


_font_cache = {}


def text_width(text, fn, fs):
    """Largura em px de texto ASS com \\fs=fs (libass usa altura de linha = ascent+descent)."""
    key = (fn, fs)
    if key not in _font_cache:
        path = os.path.join(FONTS, WEIGHT_FILE.get(fn, "Inter-Bold.ttf"))
        probe = ImageFont.truetype(path, 100)
        a, d = probe.getmetrics()
        _font_cache[key] = ImageFont.truetype(path, max(1, round(fs * 100 / (a + d))))
    return _font_cache[key].getlength(text)


def esc(s):
    return s.replace("{", "(").replace("}", ")").replace("\\", "/")


def rounded_rect(w, h, r):
    r = min(r, h / 2, w / 2)
    k = r * 0.4477  # aproximacao bezier de quarto de circulo
    return (f"m {r} 0 l {w - r} 0 b {w - k} 0 {w} {k} {w} {r} l {w} {h - r} b {w} {h - k} {w - k} {h} {w - r} {h} "
            f"l {r} {h} b {k} {h} 0 {h - k} 0 {h - r} l 0 {r} b 0 {k} {k} 0 {r} 0")


class Ass:
    def __init__(self, W, H):
        self.W, self.H, self.ev = W, H, []

    def add(self, layer, t0, t1, text, style="Base"):
        if t1 - t0 > 0.02:
            self.ev.append(f"Dialogue: {layer},{ts(t0)},{ts(t1)},{style},,0,0,0,,{text}")

    def write(self, path):
        hdr = f"""[Script Info]
ScriptType: v4.00+
PlayResX: {self.W}
PlayResY: {self.H}
WrapStyle: 2
ScaledBorderAndShadow: yes
YCbCr Matrix: TV.709

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Base,Inter SemiBold,60,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,0,0,5,0,0,0,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""
        with open(path, "w", encoding="utf-8") as f:
            f.write(hdr + "\n".join(self.ev) + "\n")


# ---------------------------------------------------------------- legendas

CAPTION_STYLES = {
    # premium/limpo (default). Frase curta, palavra activa a branco e restantes a 55%.
    "apple": dict(fn="Inter Bold", size=0.04, max_chars=22, max_words=5, upper=False, shadow=True, pop=False,
                  dim=True, outline=0.0018),
    # viral/energia: 1-3 palavras, Black maiusculas, pop, palavra activa na cor de destaque
    "impacto": dict(fn="Inter Black", size=0.05, max_chars=14, max_words=3, upper=True, shadow=True, pop=True,
                    dim=False, outline=0.0045),
    # karaoke: bloco inteiro, palavra activa colorida
    "karaoke": dict(fn="Inter ExtraBold", size=0.042, max_chars=20, max_words=4, upper=False, shadow=True, pop=False,
                    dim=False, active_color=True),
    # minimal: legenda pequena com material escuro (YouTube longo, entrevistas)
    "minimal": dict(fn="Inter SemiBold", size=0.034, max_chars=38, max_words=8, upper=False, shadow=False, pop=False,
                    dim=False, box=True),
}


def _clean(w, upper):
    w = w.strip()
    w = re.sub(r"[.,;:…]+$", "", w)
    if upper:
        w = w.upper()
    return esc(w)


def chunk_words(words, max_chars, max_words, gap=0.35):
    chunks, cur = [], []
    for k, w in enumerate(words):
        if cur:
            text_len = sum(len(x["w"]) + 1 for x in cur) + len(w["w"])
            brk = (w["s"] - cur[-1]["e"] > gap or text_len > max_chars or len(cur) >= max_words
                   or re.search(r"[.!?…]$", cur[-1]["w"]))
            if brk:
                chunks.append(cur)
                cur = []
        cur.append(w)
    if cur:
        chunks.append(cur)
    return chunks


def captions(ass, words, style="apple", accent="amarelo", highlight=(), y=None, hide=()):
    """words: [{w,s,e}] ja em tempo de saida. highlight: palavras (minusculas) em cor de destaque.
    hide: lista [t0,t1] onde nao ha legendas (ex.: enquanto ha titulo grande)."""
    st = CAPTION_STYLES[style]
    W, H = ass.W, ass.H
    fs = round(H * st["size"]) if H > W else round(H * st["size"] * 1.25)
    vertical = H > W
    cy = y if y is not None else (0.70 if vertical else 0.86)
    cy = round(H * cy)
    hl = {h.lower() for h in highlight}
    acc = col(accent)
    words = [w for w in words if not any(a <= w["s"] < b for a, b in hide)]
    merged = []  # whisper parte hifenizadas: "Bem" + "-vindos" -> "Bem-vindos"
    for w in words:
        if merged and w["w"].startswith("-"):
            merged[-1] = {**merged[-1], "w": merged[-1]["w"] + w["w"], "e": w["e"]}
        else:
            merged.append(dict(w))
    words = merged
    chunks = chunk_words(words, st["max_chars"], st["max_words"])
    for ci, ch in enumerate(chunks):
        t0 = ch[0]["s"]
        nxt = chunks[ci + 1][0]["s"] if ci + 1 < len(chunks) else ch[-1]["e"] + 0.4
        t1 = min(ch[-1]["e"] + 0.25, nxt) if nxt - ch[-1]["e"] > 0.6 else nxt
        toks = [_clean(w["w"], st["upper"]) for w in ch]
        base = f"\\an5\\pos({W // 2},{cy})\\fn{st['fn']}\\fs{fs}\\bord0\\shad0"
        if st.get("box"):
            tw = text_width(" ".join(toks), st["fn"], fs)
            pw, ph = tw + fs * 0.9, fs * 1.55
            ass.add(0, t0, t1, f"{{\\an7\\pos({W / 2 - pw / 2:.0f},{cy - ph / 2:.0f})\\c{col('material')}\\alpha&H30&\\bord0\\shad0\\p1}}{rounded_rect(pw, ph, ph * 0.3)}{{\\p0}}")
            ass.add(1, t0, t1, f"{{{base}\\c&HFFFFFF&}}{' '.join(toks)}")
            continue
        # um evento por palavra activa (permite cor/dim/pop por palavra)
        for wi, w in enumerate(ch):
            a = t0 if wi == 0 else w["s"]
            b = ch[wi + 1]["s"] if wi + 1 < len(ch) else t1
            parts = []
            for k, tok in enumerate(toks):
                raw = re.sub(r"[^\wÀ-ÿ]", "", ch[k]["w"]).lower()
                c = "&HFFFFFF&"
                alpha = "&H00&"
                if raw in hl:
                    c = acc
                if st.get("active_color") and k == wi:
                    c = acc
                if st["dim"] and k > wi:
                    alpha = "&H4D&"  # 70%: palavras ainda nao ditas (legivel em fundo claro)
                parts.append(f"{{\\c{c}\\alpha{alpha}}}{tok}")
            txt = " ".join(parts)
            anim = ""
            if wi == 0:
                if st["pop"]:
                    anim = "\\fscx82\\fscy82\\t(0,90,0.6,\\fscx106\\fscy106)\\t(90,170,1.4,\\fscx100\\fscy100)"
                else:
                    anim = "\\fad(90,0)"
            if st["shadow"]:
                ol = st.get("outline")
                if ol:
                    ass.add(0, a, b, f"{{{base}{anim}\\c&H000000&\\3c&H000000&\\3a&H50&\\bord{H * ol:.1f}\\blur1.2}}{re.sub(r'{[^}]*}', '', txt)}")
                ass.add(0, a, b, f"{{{base}{anim}\\c&H000000&\\alpha&H50&\\blur{fs * 0.22:.0f}}}{re.sub(r'{[^}]*}', '', txt)}")
            ass.add(1, a, b, f"{{{base}{anim}}}{txt}")


# ---------------------------------------------------------------- graficos

def _pos(ass, pos):
    W, H = ass.W, ass.H
    vertical = H > W
    named = {"top": (0.5, 0.20 if vertical else 0.14), "center": (0.5, 0.45), "upper": (0.5, 0.32),
             "lower": (0.5, 0.58 if vertical else 0.72), "bottom_left": (0.08, 0.62 if vertical else 0.80)}
    x, y = named[pos] if isinstance(pos, str) else pos
    return round(W * x), round(H * y)


DEFAULT_POS = {"hook": "top", "titulo": "upper", "card": "upper", "numero": "center", "lower_third": "bottom_left",
               "capitulo": "center", "cta": "lower"}


def resolve_pos(ass, g):
    return _pos(ass, g.get("pos", DEFAULT_POS[g["type"]]))


def _rich(text, accent, base_c="&HFFFFFF&"):
    """*palavra* -> cor de destaque."""
    return re.sub(r"\*([^*]+)\*", lambda m: f"{{\\c{accent}}}{m.group(1)}{{\\c{base_c}}}", esc(text))


def graphic(ass, g, accent="amarelo"):
    """g: {type, t, dur, text, sub, pos, accent}. Tipos: hook, titulo, card, numero, lower_third, capitulo, cta."""
    W, H = ass.W, ass.H
    vertical = H > W
    U = H if vertical else H * 1.6  # unidade de escala (16:9 ve-se maior no ecra)
    bg = g.get("bg")  # luminancia do fundo na zona do texto (medida pelo render) -> texto claro ou escuro
    light = bg is not None and contrast(1.0, bg) < contrast(rel_lum("#1C1C1E"), bg)
    TXT = col("#1C1C1E") if light else "&HFFFFFF&"
    acc = col(accent_for(g.get("accent", accent), bg))
    t0, t1 = g["t"], g["t"] + g.get("dur", 2.0)
    typ = g["type"]
    x, y = resolve_pos(ass, g)
    if light:  # texto escuro em fundo claro: halo branco suave em vez de sombra
        shadow = lambda fs: f"\\c&HFFFFFF&\\alpha&H80&\\blur{fs * 0.3:.0f}\\bord0\\shad0"
    else:
        shadow = lambda fs: f"\\c&H000000&\\alpha&H6A&\\blur{fs * 0.22:.0f}\\bord0\\shad0"

    if typ in ("hook", "titulo"):
        fs = round(U * (0.058 if typ == "hook" else 0.046))
        fn = "Inter Black" if typ == "hook" else "Inter ExtraBold"
        lines = g["text"].split("\n")
        # nunca sair das margens: a linha mais larga cabe em 86% da largura (conta com o \fsp negativo)
        widest = max(text_width(re.sub(r"\*", "", esc(l)), fn, fs) - fs * 0.02 * len(l) for l in lines)
        if widest > W * 0.86:
            fs = int(fs * W * 0.86 / widest)
        lh = fs * 1.08
        for li, line in enumerate(lines):
            ly = y + (li - (len(lines) - 1) / 2) * lh
            d = li * 70  # linhas desfasadas 70 ms
            tag = f"\\an5\\fn{fn}\\fs{fs}\\fsp{-fs * 0.02:.1f}"
            mv = f"\\move({x},{ly + fs * 0.35:.0f},{x},{ly:.0f},{d},{d + 220})"
            fade = f"\\alpha&HFF&\\t({d},{d + 160},\\alpha&H00&)\\fad(0,140)"
            plain = re.sub(r"\*", "", esc(line))
            ass.add(2, t0, t1, f"{{{tag}{mv}{fade}{shadow(fs)}}}{plain}")
            ass.add(3, t0, t1, f"{{{tag}{mv}{fade}\\c{TXT}\\bord0\\shad0}}{_rich(line, acc, TXT)}")
        return

    if typ in ("card", "cta"):
        fs = round(U * (0.03 if typ == "card" else 0.032))
        fn = "Inter SemiBold"
        plain = re.sub(r"\*", "", g["text"])
        tw = text_width(plain, fn, fs)
        if tw + fs * 1.6 > W * 0.86:  # nunca encostar as margens: encolhe a fonte
            fs = int(fs * W * 0.86 / (tw + fs * 1.6))
            tw = text_width(plain, fn, fs)
        pw, ph = tw + fs * (1.3 if typ == "card" else 1.6), fs * (1.9 if typ == "card" else 2.1)
        r = ph * (0.32 if typ == "card" else 0.5)  # cta = capsula (botao HIG)
        fill = col("material") if typ == "card" else acc
        txt_c = "&HFFFFFF&" if typ == "card" else col(g.get("text_color", "preto"))
        pop = "\\fscx92\\fscy92\\t(0,220,0.5,\\fscx100\\fscy100)\\fad(140,140)"
        ass.add(4, t0, t1, f"{{\\an5\\pos({x},{y + 6})\\c&H000000&\\alpha&H80&\\blur14\\bord0\\shad0{pop}\\p1}}{rounded_rect(pw, ph, r)}{{\\p0}}")
        ass.add(5, t0, t1, f"{{\\an5\\pos({x},{y})\\c{fill}\\alpha&H12&\\bord0\\shad0{pop}\\p1}}{rounded_rect(pw, ph, r)}{{\\p0}}")
        ass.add(6, t0, t1, f"{{\\an5\\pos({x},{y})\\fn{fn}\\fs{fs}\\c{txt_c}\\bord0\\shad0{pop}}}{_rich(g['text'], acc if typ == 'card' else txt_c, txt_c)}")
        return

    if typ == "numero":
        fs = round(U * 0.11)
        ass.add(2, t0, t1, f"{{\\an5\\pos({x},{y})\\fnInter Black\\fs{fs}\\fsp{-fs * 0.03:.1f}{shadow(fs)}\\fad(120,150)}}{esc(g['text'])}")
        ass.add(3, t0, t1, f"{{\\an5\\pos({x},{y})\\fnInter Black\\fs{fs}\\fsp{-fs * 0.03:.1f}\\c{acc}\\bord0\\shad0\\fscx88\\fscy88\\t(0,240,0.5,\\fscx100\\fscy100)\\fad(120,150)}}{esc(g['text'])}")
        if g.get("sub"):
            sf = round(fs * 0.26)
            sy = y + fs * 0.62
            ass.add(2, t0, t1, f"{{\\an5\\pos({x},{sy:.0f})\\fnInter SemiBold\\fs{sf}{shadow(sf)}\\fad(200,150)}}{esc(g['sub'])}")
            ass.add(3, t0, t1, f"{{\\an5\\pos({x},{sy:.0f})\\fnInter SemiBold\\fs{sf}\\c{TXT}\\bord0\\shad0\\fad(200,150)}}{esc(g['sub'])}")
        return

    if typ == "lower_third":
        fs = round(U * 0.03)
        sf = round(fs * 0.72)
        mv = f"\\move({x - 40},{y},{x},{y},0,260)"
        ass.add(2, t0, t1, f"{{\\an4{mv}\\fnInter Bold\\fs{fs}{shadow(fs)}\\fad(160,160)}}{esc(g['text'])}")
        ass.add(3, t0, t1, f"{{\\an4{mv}\\fnInter Bold\\fs{fs}\\c{TXT}\\bord0\\shad0\\fad(160,160)}}{esc(g['text'])}")
        if g.get("sub"):
            mv2 = f"\\move({x - 40},{y + fs * 1.05:.0f},{x},{y + fs * 1.05:.0f},60,320)"
            ass.add(3, t0, t1, f"{{\\an4{mv2}\\fnInter Medium\\fs{sf}\\c{TXT}\\alpha&H40&\\bord0\\shad0\\fad(220,160)}}{esc(g['sub'])}")
        bar_h = fs * 1.05 + (sf * 1.2 if g.get("sub") else 0)
        ass.add(3, t0, t1, f"{{\\an7\\pos({x - fs * 0.55:.0f},{y - fs * 0.55:.0f})\\c{acc}\\bord0\\shad0\\fad(120,160)\\fscy0\\t(0,260,0.5,\\fscy100)\\p1}}{rounded_rect(fs * 0.16, bar_h, fs * 0.08)}{{\\p0}}")
        return

    if typ == "capitulo":
        fs = round(U * 0.05)
        num = g.get("sub", "")
        if num:
            ass.add(3, t0, t1, f"{{\\an5\\pos({x},{y - fs * 1.0:.0f})\\fnInter Bold\\fs{round(fs * 0.5)}\\c{acc}\\bord0\\shad0\\fad(150,150)}}{esc(num)}")
        ass.add(2, t0, t1, f"{{\\an5\\pos({x},{y})\\fnInter ExtraBold\\fs{fs}{shadow(fs)}\\fad(150,150)}}{esc(g['text'])}")
        ass.add(3, t0, t1, f"{{\\an5\\pos({x},{y})\\fnInter ExtraBold\\fs{fs}\\c{TXT}\\bord0\\shad0\\fad(150,150)\\fscx96\\fscy96\\t(0,300,0.5,\\fscx100\\fscy100)}}{esc(g['text'])}")
        return

    raise ValueError(f"tipo de grafico desconhecido: {typ}")
