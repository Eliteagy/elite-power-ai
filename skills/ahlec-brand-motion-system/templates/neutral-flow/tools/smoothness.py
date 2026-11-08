#!/usr/bin/env python
"""Suavidade: energia de movimento por frame (média |frame − anterior| em cinzentos a 480×270) e o seu salto (jerk = |Δenergia|).
Usage: smoothness.py LABEL=DIR [LABEL=DIR ...] [--range A B]
Pastas com element-NNN.jpeg (base 0) ou NNNN.png/jpg (base 1). Se existir um conjunto chamado REF, os outros são comparados com ele
(frames com jerk > 2,5 são assinalados com '<=='). Sem REF: usar a versão anterior como baseline.
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

args = sys.argv[1:]; a, b = 0, 600
if "--range" in args:
    i = args.index("--range"); a, b = int(args[i+1]), int(args[i+2]); args = args[:i] + args[i+3:]
sets = dict(s.split("=", 1) for s in args)
def load(k, f): return np.asarray(Image.open(frame_path(sets[k], f)).convert("L").resize((480, 270)), dtype=np.float32)
res = {}
for k in sets:
    prev = None; e = []
    for f in range(a, b+1):
        im = load(k, f); e.append(0 if prev is None else float(np.abs(im-prev).mean())); prev = im
    res[k] = np.array(e)
print("frame  " + "  ".join(f"{k:>7s}" for k in res) + "   | jerk (|Δenergy|) " + "  ".join(f"{k:>6s}" for k in res))
for i, f in enumerate(range(a, b+1)):
    if i < 2: continue
    row = [res[k][i] for k in res]; jerk = [abs(res[k][i]-res[k][i-1]) for k in res]
    flag = " <==" if any(j > 2.5 for k, j in zip(res, jerk) if k != "REF") else ""
    print(f"{f:5d}  " + "  ".join(f"{v:7.2f}" for v in row) + "   | " + "  ".join(f"{j:6.2f}" for j in jerk) + flag)
print("\nsummary (mean jerk, max jerk) per set:")
for k in res:
    j = np.abs(np.diff(res[k])); print(f"  {k:6s} mean {j.mean():.3f}  max {j.max():.2f}  n>2.5: {(j>2.5).sum()}")
