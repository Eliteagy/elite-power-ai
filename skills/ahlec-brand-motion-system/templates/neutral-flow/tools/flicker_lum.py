#!/usr/bin/env python
"""Flicker + luminância média por cena.
Usage: flicker_lum.py REF=DIR A=DIR [B=DIR ...] [--n 601] [--cuts 212,274,395] [--scenes 0-28:logo,29-105:dashboard,...]
Flicker por frame = média |L[i] − (L[i−1]+L[i+1])/2| a 480×270 (Rec.709); média excl. ±1 frame dos cortes; frame suspeito
se um render > REF + 2,5 fora dos cortes. Pastas com element-NNN.jpeg (base 0) ou NNNN.png/jpg (base 1). Sem REF: só médias.
"""
import sys, os, numpy as np
from PIL import Image
import os
def frame_path(d, i):
    """Frame i (base 0) numa pasta com element-NNN.jpeg/png (base 0) ou NNNN.png/jpg (base 1)."""
    for c in (f"element-{i:03d}.jpeg", f"element-{i:03d}.png", f"element-{i:03d}.jpg", f"{i+1:04d}.png", f"{i+1:04d}.jpg"):
        p = os.path.join(d, c)
        if os.path.exists(p): return p
    raise FileNotFoundError(f"frame {i} em {d}")

def lum(a): return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
def ld(p): return lum(np.asarray(Image.open(p).convert("RGB").resize((480, 270))).astype(np.float32))
args = sys.argv[1:]; n = 601; cuts = set(); scenes = []
def take(flag):
    global args
    if flag in args:
        i = args.index(flag); v = args[i+1]; args = args[:i] + args[i+2:]; return v
v = take("--n");  n = int(v) if v else n
v = take("--cuts"); cuts = set(int(x) for x in v.split(",")) if v else cuts
v = take("--scenes")
if v:
    for part in v.split(","):
        rng, name = part.split(":"); a, b = rng.split("-"); scenes.append((int(a), int(b), name))
dirs = dict(s.split("=", 1) for s in args)
res = {}
for k, d in dirs.items():
    L = [ld(frame_path(d, i)) for i in range(n)]
    fl = [np.abs(L[i]-(L[i-1]+L[i+1])/2).mean() for i in range(1, n-1)]
    res[k] = (fl, [x.mean() for x in L])
excl = lambda i: i in cuts or i-1 in cuts or i+1 in cuts
print("flicker mean (excl cuts): " + "  ".join(f"{k} {np.mean([v for i, v in enumerate(r[0], 1) if not excl(i)]):.3f}" for k, r in res.items()))
if "REF" in res:
    ref = res["REF"][0]
    for k, r in res.items():
        if k == "REF": continue
        bad = [(i+1, round(r[0][i], 2), round(ref[i], 2)) for i in range(len(ref)) if r[0][i] > ref[i]+2.5 and not excl(i+1)]
        print(f"{k} flicker frames >> REF:", bad[:30])
if scenes:
    print("\nmean lum per scene: scene | " + " | ".join(res))
    for a, b, name in scenes:
        print(f"{name:12s} | " + " | ".join(f"{np.mean(res[k][1][a:b+1]):5.1f}" for k in res))
else:
    print("mean lum (all): " + "  ".join(f"{k} {np.mean(r[1]):.1f}" for k, r in res.items()))
