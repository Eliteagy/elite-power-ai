#!/usr/bin/env python
"""Pixel measurement helpers. Import or run as CLI.
CLI examples:
  measure.py color FRAME X Y [R]            -> mean RGB hex in (2R+1)^2 box at full-res coords
  measure.py bbox FRAME x0,y0,x1,y1 THRESH   -> bbox+centroid+count of pixels with luminance>THRESH inside region (full-res)
  measure.py track F0 F1 x0,y0,x1,y1 THRESH  -> per-frame count/centroid/bbox/meanlum of bright pixels in region (prints table)
  measure.py fit F0 F1 x0,y0,x1,y1 THRESH prop -> fits the normalized progress of prop (count|cx|cy|lum|w|h|x0|y0|x1|y1) over F0..F1 to easing models, prints RMSE table + exp k
  measure.py diff F0 F1 x0,y0,x1,y1         -> per-frame mean abs diff vs previous frame in region (motion energy)
  measure.py hist FRAME x0,y0,x1,y1          -> dominant colors (k-means-ish via quantize) in region
"""
import sys, os, numpy as np
from PIL import Image
# pasta com os frames NNNN.png (base 1): env NF_FRAMES_FULL, default = projeto NeuraFlow
FULL=os.environ.get("NF_FRAMES_FULL","/Users/ahlec/Desktop/TESTE Remotion SaaS/_ref/frames_full")
def frame(i):
    return np.asarray(Image.open(f"{FULL}/{i+1:04d}.png").convert("RGB"),dtype=np.float32)
def lum(a): return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
def hexc(rgb): return "#%02x%02x%02x"%tuple(int(round(v)) for v in rgb)
def region(a,box):
    x0,y0,x1,y1=box; return a[y0:y1,x0:x1]
def stats(a,box,th):
    r=region(a,box); L=lum(r); m=L>th; n=int(m.sum())
    if n==0: return dict(count=0,cx=None,cy=None,x0=None,y0=None,x1=None,y1=None,w=0,h=0,lum=float(L.mean()),maxlum=float(L.max()))
    ys,xs=np.nonzero(m); x0,y0=box[0],box[1]
    return dict(count=n,cx=float(xs.mean()+x0),cy=float(ys.mean()+y0),x0=int(xs.min()+x0),y0=int(ys.min()+y0),x1=int(xs.max()+x0),y1=int(ys.max()+y0),w=int(xs.max()-xs.min()+1),h=int(ys.max()-ys.min()+1),lum=float(L.mean()),maxlum=float(L.max()),meanlum_masked=float(L[m].mean()))
def parse_box(s): return tuple(int(v) for v in s.split(","))
EASINGS={
 "linear":lambda x:x,
 "quad-out":lambda x:1-(1-x)**2,"cubic-out":lambda x:1-(1-x)**3,"quart-out":lambda x:1-(1-x)**4,"quint-out":lambda x:1-(1-x)**5,"expo-out":lambda x:1-2**(-10*x),
 "quad-in":lambda x:x**2,"cubic-in":lambda x:x**3,
 "quad-inout":lambda x:2*x*x if x<.5 else 1-(-2*x+2)**2/2,"cubic-inout":lambda x:4*x**3 if x<.5 else 1-(-2*x+2)**3/2,"quart-inout":lambda x:8*x**4 if x<.5 else 1-(-2*x+2)**4/2,
 "sine-inout":lambda x:-(np.cos(np.pi*x)-1)/2,"sine-out":lambda x:np.sin(x*np.pi/2),
 "exp-decay-6.3":lambda x:1-np.exp(-6.3*x),"exp-decay-3.2":lambda x:1-np.exp(-3.2*x),"exp-decay-4.5":lambda x:1-np.exp(-4.5*x),"exp-decay-9":lambda x:1-np.exp(-9*x),
 "back-out(1.7)":lambda x:1+2.70158*(x-1)**3+1.70158*(x-1)**2,
}
def fit(vals):
    v=np.array(vals,dtype=np.float64); n=len(v)
    if n<3 or v.max()==v.min(): print("not enough variation"); return
    p=(v-v[0])/(v[-1]-v[0]); x=np.linspace(0,1,n)
    print("normalized progress:", " ".join(f"{q:.3f}" for q in p))
    res=[]
    for k,f in EASINGS.items():
        y=np.array([f(t) for t in x]); res.append((np.sqrt(np.mean((y-p)**2)),k))
    for r,k in sorted(res)[:8]: print(f"  {k:18s} RMSE={r:.4f}")
    # best exp k grid
    best=min(((np.sqrt(np.mean(((1-np.exp(-k*x))-p)**2)),k) for k in np.arange(1,20,0.1)))
    print(f"  best exp-decay k={best[1]:.1f} RMSE={best[0]:.4f}  (half-life {np.log(2)/best[1]*n:.2f} frames of {n})")
    # overshoot
    print(f"  max progress={p.max():.3f} (overshoot {100*(p.max()-1):+.1f}%) at idx {int(p.argmax())}")
if __name__=="__main__":
    cmd=sys.argv[1]
    if cmd=="color":
        i,x,y=int(sys.argv[2]),int(sys.argv[3]),int(sys.argv[4]); R=int(sys.argv[5]) if len(sys.argv)>5 else 2
        a=frame(i); r=a[y-R:y+R+1,x-R:x+R+1].reshape(-1,3).mean(0); print(hexc(r), r.round(1))
    elif cmd=="bbox":
        i=int(sys.argv[2]); box=parse_box(sys.argv[3]); th=float(sys.argv[4]); print(stats(frame(i),box,th))
    elif cmd=="track":
        f0,f1=int(sys.argv[2]),int(sys.argv[3]); box=parse_box(sys.argv[4]); th=float(sys.argv[5])
        print("frame   count     cx      cy    x0   y0   x1   y1    w    h   lum  maxlum")
        for i in range(f0,f1+1):
            s=stats(frame(i),box,th)
            print(f"{i:5d} {s['count']:7d} {s['cx'] if s['cx'] is None else round(s['cx'],1)!s:>7} {s['cy'] if s['cy'] is None else round(s['cy'],1)!s:>7} {s['x0']!s:>5} {s['y0']!s:>4} {s['x1']!s:>5} {s['y1']!s:>4} {s['w']:4d} {s['h']:4d} {s['lum']:5.1f} {s['maxlum']:6.1f}")
    elif cmd=="fit":
        f0,f1=int(sys.argv[2]),int(sys.argv[3]); box=parse_box(sys.argv[4]); th=float(sys.argv[5]); prop=sys.argv[6]
        vals=[]
        for i in range(f0,f1+1):
            s=stats(frame(i),box,th); v=s[prop]; vals.append(0 if v is None else v)
        print("raw:"," ".join(f"{v:.1f}" for v in vals)); fit(vals)
    elif cmd=="diff":
        f0,f1=int(sys.argv[2]),int(sys.argv[3]); box=parse_box(sys.argv[4]); prev=None
        for i in range(f0,f1+1):
            r=region(frame(i),box)
            if prev is not None: print(f"{i:5d} {np.abs(r-prev).mean():6.2f}")
            prev=r
    elif cmd=="hist":
        i=int(sys.argv[2]); box=parse_box(sys.argv[3]); r=region(frame(i),box).astype(np.uint8)
        im=Image.fromarray(r).quantize(8); pal=im.getpalette(); cnt=sorted(im.getcolors(),reverse=True)
        tot=sum(c for c,_ in cnt)
        for c,idx in cnt: print(f"{hexc(pal[idx*3:idx*3+3])} {100*c/tot:5.1f}%")
