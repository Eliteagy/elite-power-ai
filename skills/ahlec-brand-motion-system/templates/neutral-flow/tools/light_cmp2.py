#!/usr/bin/env python
"""Calibração de luz: grelha de luminância 3×6 + perfil de 12 colunas do terço superior + 9 linhas, REF vs render, em frames-chave.
Usage: light_cmp2.py REF=DIR V=DIR [--frames 20,60,100,...]
Regra: >10 lum de diferença numa célula = um elemento de luz a corrigir; média por still a ±3 lum.
Pastas com element-NNN.jpeg (base 0) ou NNNN.png/jpg (base 1).
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

def load(p): return np.asarray(Image.open(p).convert("RGB")).astype(np.float32)
def lum(a): return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
args = sys.argv[1:]
frames = [20, 60, 100, 150, 180, 240, 300, 320, 360, 430, 460, 479, 500, 520, 540, 560, 590]
if "--frames" in args:
    i = args.index("--frames"); frames = [int(x) for x in args[i+1].split(",")]; args = args[:i] + args[i+2:]
dirs = dict(s.split("=", 1) for s in args); REF = dirs["REF"]; V = dirs.get("V") or dirs[[k for k in dirs if k != "REF"][0]]
for fr in frames:
    r = load(frame_path(REF, fr)); v = load(frame_path(V, fr))
    if v.shape != r.shape: v = np.asarray(Image.fromarray(v.astype(np.uint8)).resize((r.shape[1], r.shape[0]))).astype(np.float32)
    lr, lv = lum(r), lum(v); H, W = lr.shape
    print(f"\n== f{fr} mean REF {lr.mean():5.1f} V {lv.mean():5.1f} | p90 {np.percentile(lr,90):5.1f}/{np.percentile(lv,90):5.1f} | p99 {np.percentile(lr,99):5.1f}/{np.percentile(lv,99):5.1f} | RGB REF {r.mean((0,1)).round(0)} V {v.mean((0,1)).round(0)}")
    for name, L in (("REF", lr), ("V  ", lv)):
        rows = [" ".join(f"{L[gy*H//3:(gy+1)*H//3, gx*W//6:(gx+1)*W//6].mean():5.1f}" for gx in range(6)) for gy in range(3)]
        print(f"  {name} grid3x6: " + " | ".join(rows))
    for name, L in (("REF", lr), ("V  ", lv)):
        print(f"  {name} top-third cols: " + " ".join(f"{L[:H//3, k*W//12:(k+1)*W//12].mean():4.0f}" for k in range(12)))
    for name, L in (("REF", lr), ("V  ", lv)):
        print(f"  {name} rows(9): " + " ".join(f"{L[k*H//9:(k+1)*H//9].mean():4.0f}" for k in range(9)))
    diff = np.array([[abs(lr[gy*H//3:(gy+1)*H//3, gx*W//6:(gx+1)*W//6].mean() - lv[gy*H//3:(gy+1)*H//3, gx*W//6:(gx+1)*W//6].mean()) for gx in range(6)] for gy in range(3)])
    print(f"  cells >10 lum: {(diff > 10).sum()} (max {diff.max():.1f})")
