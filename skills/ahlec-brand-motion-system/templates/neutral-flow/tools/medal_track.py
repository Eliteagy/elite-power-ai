import numpy as np
from PIL import Image
from scipy import ndimage
def lum(a): return 0.2126*a[...,0]+0.7152*a[...,1]+0.0722*a[...,2]
def load(p): return np.asarray(Image.open(p).convert("RGB")).astype(np.float32)
# medallions: bright discs (lum>150) ~ 60-110 px diameter, inside y 250-750
for fr in range(436,492,2):
    L=lum(load(f"_ref/frames_full/{fr+1:04d}.png"))
    m=L>150; m[:250]=False; m[760:]=False; m[:, :350]=False; m[:, 1600:]=False
    lab,n=ndimage.label(m)
    out=[]
    for i in range(1,n+1):
        ys,xs=np.nonzero(lab==i); a=len(xs)
        if 1500<a<14000:
            w=xs.max()-xs.min()+1; h=ys.max()-ys.min()+1
            if 0.35<w/h<3: out.append((int(xs.mean()),int(ys.mean()),a,w,h))
    out.sort()
    print(fr, " ".join(f"({x},{y} a{a} {w}x{h})" for x,y,a,w,h in out))
