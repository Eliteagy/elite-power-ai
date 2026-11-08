import subprocess, numpy as np, cv2, sys
from paths import YUNET
def shake(path, start=190):
    p=subprocess.Popen(["ffmpeg","-v","error","-i",path,"-vf","scale=540:960","-f","rawvideo","-pix_fmt","gray","-"],stdout=subprocess.PIPE)
    det=cv2.FaceDetectorYN_create(YUNET,"",(540,960),score_threshold=0.6)
    prev=None; D=[]; i=0
    while True:
        b=p.stdout.read(540*960)
        if len(b)<540*960: break
        g=np.frombuffer(b,np.uint8).reshape(960,540)
        if prev is not None and i>=start:
            d=np.array([np.nan,np.nan])
            _,f=det.detect(cv2.cvtColor(prev,cv2.COLOR_GRAY2BGR))
            if f is not None and len(f):
                f=max(f,key=lambda r:r[2]*r[3]); x,y,w,h=[int(v) for v in f[:4]]
                m=np.zeros_like(prev); m[max(y,0):y+int(.62*h),max(x+int(.1*w),0):x+int(.9*w)]=255
                pts=cv2.goodFeaturesToTrack(prev,150,0.01,3,mask=m)
                if pts is not None and len(pts)>8:
                    n,st,_=cv2.calcOpticalFlowPyrLK(prev,g,pts,None,winSize=(15,15),maxLevel=3)
                    dd=(n-pts)[st.ravel()==1].reshape(-1,2)*2
                    if len(dd)>5: d=np.median(dd,axis=0)
            D.append(d)
        prev=g; i+=1
    D=np.array(D); ok=~np.isnan(D[:,0]); D[~ok]=0
    P=np.cumsum(D,axis=0)
    k=np.arange(-12,13); w=np.exp(-k**2/(2*4.0**2)); w/=w.sum()
    S=np.stack([np.convolve(np.pad(P[:,j],12,mode='edge'),w,mode='valid') for j in range(2)],1)
    J=np.hypot(*(P-S).T)
    acc=np.hypot(*np.diff(D,axis=0).T)
    return np.median(J),np.percentile(J,90),np.median(acc),np.percentile(acc,90)
for name in sys.argv[1:]:
    a,b,c,d=shake(name.split("=")[1])
    print(f"{name.split('=')[0]:22s} tremor(desvio do caminho suave) med {a:5.2f} p90 {b:5.2f} | solavanco/frame med {c:5.2f} p90 {d:5.2f}")
