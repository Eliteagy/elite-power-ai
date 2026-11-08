import numpy as np
from PIL import Image
def lum(a): return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
def load(p): return np.asarray(Image.open(p).convert("RGB")).astype(np.float32)
def geom(L, fr):
    xmax = 660 if fr>=527 else 1150
    m = L>170; m[:, xmax:] = False
    ys,xs=np.nonzero(m)
    if len(xs)<20: return None
    cx,cy=xs.mean(),ys.mean()
    d=np.hypot(xs-cx,ys-cy); r=np.percentile(d,99.7)
    k=np.argmax(d); ang=np.degrees(np.arctan2(ys[k]-cy, xs[k]-cx))%90
    return cx,cy,r,ang,len(xs)
print("fr | REF cx cy r ang n | V2 cx cy r ang n")
for fr in range(512,556,1):
    R=geom(lum(load(f"_ref/frames_full/{fr+1:04d}.png")),fr)
    V=geom(lum(load(f"_ref/work/v2full/element-{fr:03d}.jpeg")),fr)
    fmt=lambda g: "  ---" if g is None else f"{g[0]:6.0f} {g[1]:5.0f} {g[2]:5.0f} {g[3]:4.0f} {g[4]:6d}"
    print(f"{fr} | {fmt(R)} | {fmt(V)}")
