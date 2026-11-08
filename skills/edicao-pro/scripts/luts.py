"""LUTs .cube originais (sem direitos de terceiros), geradas por matematica de cor.

Uso: python luts.py [--out ../assets/luts]       -> gera todas a 100%
     from luts import write_lut; write_lut("filme", 0.7, "x.cube")  (render.py usa isto)

Looks:
  neutro_cine   S suave, pretos ligeiramente levantados, highlights enrolados. Base para tudo.
  filme         print film: contraste, sombras ciano-verde, highlights quentes, verdes dessaturados.
  teal_orange   sombras teal, pele/highlights laranja (protege tons de pele).
  dourado       golden hour quente, sombras cor de mel.
  imob_luminoso imobiliario: medios abertos, brancos limpos, ceu/verdes vivos, sem dominante.
  frio_tech     corporativo/tech: frio, contraste limpo.
  noir          P&B contrastado.
"""
import argparse, os

import numpy as np

LOOKS = ["neutro_cine", "filme", "teal_orange", "dourado", "imob_luminoso", "frio_tech", "noir"]


def _luma(c):
    return c[..., 0] * 0.2126 + c[..., 1] * 0.7152 + c[..., 2] * 0.0722


def _s_curve(x, contrast=1.0, pivot=0.45, toe=0.0, shoulder=1.0):
    # sigmoide normalizada; toe levanta pretos, shoulder baixa brancos
    k = 4.0 * contrast
    f = lambda v: 1 / (1 + np.exp(-k * (v - pivot)))
    y = (f(x) - f(0)) / (f(1) - f(0))
    return toe + y * (shoulder - toe)


def _sat(c, s):
    l = _luma(c)[..., None]
    return l + (c - l) * s


def _split_tone(c, shadow_rgb, high_rgb, amount=1.0):
    l = _luma(c)[..., None]
    ws = (1 - l) ** 2
    wh = l ** 2
    return c + amount * (ws * np.array(shadow_rgb) + wh * np.array(high_rgb))


def _hue_mask(c, center_deg, width_deg):
    r, g, b = c[..., 0], c[..., 1], c[..., 2]
    mx, mn = c.max(-1), c.min(-1)
    d = mx - mn + 1e-9
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    dist = np.minimum(abs(h - center_deg), 360 - abs(h - center_deg))
    sat = d / (mx + 1e-9)
    return np.clip(1 - dist / width_deg, 0, 1) * np.clip(sat * 3, 0, 1)


def look(name, c):
    if name == "neutro_cine":
        c = _s_curve(c, 1.05, 0.45, 0.025, 0.975)
        c = _split_tone(c, [0, 0.004, 0.01], [0.01, 0.004, -0.008])
        return _sat(c, 0.95)
    if name == "filme":
        c = _s_curve(c, 1.25, 0.42, 0.035, 0.96)
        c = _split_tone(c, [-0.02, 0.02, 0.03], [0.04, 0.012, -0.03])
        green = _hue_mask(c, 110, 50)[..., None]
        c = c * (1 - 0.35 * green) + _luma(c)[..., None] * 0.35 * green
        return _sat(c, 0.88)
    if name == "teal_orange":
        c = _s_curve(c, 1.2, 0.44, 0.02, 0.97)
        skin = _hue_mask(c, 25, 30)[..., None]
        teal = _split_tone(c, [-0.04, 0.02, 0.05], [0.05, 0.015, -0.04])
        c = teal * (1 - 0.6 * skin) + c * 0.6 * skin
        return _sat(c, 1.05)
    if name == "dourado":
        c = _s_curve(c, 1.1, 0.45, 0.03, 0.97)
        c = _split_tone(c, [0.03, 0.015, -0.02], [0.05, 0.025, -0.04])
        return _sat(c, 1.02)
    if name == "imob_luminoso":
        c = np.power(np.clip(c, 0, 1), 0.88)  # abre medios
        c = _s_curve(c, 0.95, 0.5, 0.01, 0.99)
        sky = _hue_mask(c, 210, 35)[..., None]
        grn = _hue_mask(c, 100, 40)[..., None]
        c = _sat(c, 1.06)
        c = c + 0.08 * sky * (c - _luma(c)[..., None]) + 0.06 * grn * (c - _luma(c)[..., None])
        return c
    if name == "frio_tech":
        c = _s_curve(c, 1.15, 0.45, 0.02, 0.97)
        c = _split_tone(c, [-0.01, 0.005, 0.03], [-0.01, 0.0, 0.02])
        return _sat(c, 0.9)
    if name == "noir":
        l = _s_curve(_luma(c), 1.45, 0.45, 0.02, 0.98)
        return np.repeat(l[..., None], 3, -1)
    raise ValueError(f"look desconhecido: {name}. Opcoes: {LOOKS}")


def write_lut(name, intensity, path, size=33):
    g = np.linspace(0, 1, size)
    b, gg, r = np.meshgrid(g, g, g, indexing="ij")  # .cube: R varia mais depressa
    ident = np.stack([r, gg, b], -1)
    out = look(name, ident.copy())
    out = np.clip(ident + (out - ident) * float(intensity), 0, 1)
    with open(path, "w") as f:
        f.write(f'TITLE "{name} {intensity:.2f}"\nLUT_3D_SIZE {size}\n')
        for row in out.reshape(-1, 3):
            f.write(f"{row[0]:.6f} {row[1]:.6f} {row[2]:.6f}\n")
    return path


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=os.path.join(os.path.dirname(__file__), "..", "assets", "luts"))
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    for n in LOOKS:
        write_lut(n, 1.0, os.path.join(a.out, n + ".cube"))
        print(n)
