#!/usr/bin/env python
"""Folha lado-a-lado: referência (esq.) vs render (dir.), uma linha por frame.
Usage: compare.py [--ref REF_DIR] RENDER_DIR OUT.png f1 f2 f3 ...
Pastas com element-NNN.jpeg (base 0) ou NNNN.png/jpg (base 1) — auto-detetado. REF: --ref, senão env NF_FRAMES_HALF;
sem nenhum (peça original, sem referência) a folha sai só com a coluna RENDER. Numa 2.ª ronda passar --ref <frames da versão anterior>.
"""
import sys, os
from PIL import Image, ImageDraw, ImageFont
import os
def frame_path(d, i):
    """Frame i (base 0) numa pasta com element-NNN.jpeg/png (base 0) ou NNNN.png/jpg (base 1)."""
    for c in (f"element-{i:03d}.jpeg", f"element-{i:03d}.png", f"element-{i:03d}.jpg", f"{i+1:04d}.png", f"{i+1:04d}.jpg"):
        p = os.path.join(d, c)
        if os.path.exists(p): return p
    raise FileNotFoundError(f"frame {i} em {d}")

args = sys.argv[1:]
ref = os.environ.get("NF_FRAMES_HALF")
if args and args[0] == "--ref": ref = args[1]; args = args[2:]
if ref and not os.path.isdir(ref): print(f"aviso: REF {ref} não existe — folha só com RENDER"); ref = None
rd, out = args[0], args[1]; frames = [int(x) for x in args[2:]]
try: font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
except Exception: font = ImageFont.load_default()
W, H = 640, 360; PAD = 4
cols = 2 if ref else 1
sheet = Image.new("RGB", (cols*W+(cols+1)*PAD, len(frames)*(H+PAD)+PAD), (40,40,40)); d = ImageDraw.Draw(sheet)
for k, f in enumerate(frames):
    y = PAD + k*(H+PAD); x = PAD
    if ref:
        try: a = Image.open(frame_path(ref, f)).convert("RGB").resize((W, H))
        except FileNotFoundError: a = Image.new("RGB", (W, H), (0, 0, 80))
        sheet.paste(a, (x, y)); d.rectangle([x, y, x+90, y+20], fill=(0,0,0)); d.text((x+4, y+2), f"REF {f}", fill=(255,255,0), font=font)
        x += W + PAD
    try: b = Image.open(frame_path(rd, f)).convert("RGB").resize((W, H))
    except FileNotFoundError: b = Image.new("RGB", (W, H), (80, 0, 0))
    sheet.paste(b, (x, y)); d.rectangle([x, y, x+110, y+20], fill=(0,0,0)); d.text((x+4, y+2), f"RENDER {f}", fill=(0,255,255), font=font)
sheet.save(out); print("saved", out)
