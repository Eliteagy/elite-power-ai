#!/usr/bin/env python
"""Procedural SFX generator (numpy/scipy). JSON-driven.
Usage: sfx_synth.py SPEC.json OUT_DIR
SPEC.json: {"sfx":[{"file":"whoosh_01.wav","kind":"whoosh","params":{...},"gainDb":-6}, ...]}
Kinds & params (all times in seconds, freqs in Hz):
  whoosh   : dur, f0, f1 (bandpass center sweep), q (bandwidth ratio, default 0.7), attack, decay, pan0, pan1 (-1..1), noise ('white'|'pink')
  riser    : dur, f0, f1 (tonal sweep), noiseMix (0..1), attack, decay
  impact   : dur, subF (e.g. 45), subDecay, noiseDur, noiseLow, noiseHigh
  sparkle  : dur, n (partials), fLow, fHigh, decay, spread (onset spread s)
  blip     : dur, f, harmonics [[ratio,amp],...], decay
  click    : dur (e.g. 0.008), fLow, fHigh
  shimmer  : dur, fLow, fHigh, n, tremRate
  tone     : dur, f, attack, decay, wave ('sine'|'tri')
  pad_swell: dur, freqs [..], attack, decay, detune
Each entry may also have "reverb": {"decay": 0.4, "mix": 0.25} and "lowpass"/"highpass" Hz.
"""
import sys, json, os, numpy as np
from scipy.signal import butter, sosfilt, fftconvolve
from scipy.io import wavfile
SR=48000
rng=np.random.default_rng(7)
def env(n,attack,decay,hold=0.0):
    a=int(attack*SR); h=int(hold*SR); d=max(1,n-a-h)
    e=np.concatenate([np.linspace(0,1,max(a,1)), np.ones(h), np.exp(-np.linspace(0,6,d))])
    return e[:n] if len(e)>=n else np.pad(e,(0,n-len(e)))
def noise(n,kind='white'):
    w=rng.standard_normal(n)
    if kind=='pink':
        # simple pink via cumulative filter
        b=[0.049922035,-0.095993537,0.050612699,-0.004408786]; a=[1,-2.494956002,2.017265875,-0.522189400]
        from scipy.signal import lfilter; w=lfilter(b,a,w); w/=np.abs(w).max()+1e-9
    return w
def bandpass_sweep(x,f0,f1,q=0.7,steps=64):
    n=len(x); out=np.zeros(n); seg=n//steps+1
    for i in range(steps):
        t=i/max(steps-1,1); fc=f0*(f1/f0)**t
        lo=max(20,fc/(1+q)); hi=min(SR/2-100,fc*(1+q))
        sos=butter(2,[lo,hi],btype='band',fs=SR,output='sos')
        s=slice(i*seg,min(n,(i+1)*seg))
        if s.start>=n: break
        # filter a window with context to avoid clicks
        c0=max(0,s.start-2000); y=sosfilt(sos,x[c0:s.stop]); out[s]=y[s.start-c0:]
    return out
def pan(x,p0,p1):
    n=len(x); p=np.linspace(p0,p1,n); l=x*np.sqrt((1-p)/2); r=x*np.sqrt((1+p)/2); return np.stack([l,r],1)
def stereo(x): return np.stack([x,x],1) if x.ndim==1 else x
def reverb(x,decay=0.4,mix=0.25):
    n=int(decay*SR); ir=rng.standard_normal(n)*np.exp(-np.linspace(0,7,n)); ir/=np.abs(ir).sum()/8
    y=np.stack([fftconvolve(x[:,c],ir)[:len(x)] for c in range(x.shape[1])],1); return (1-mix)*x+mix*y
def gen(kind,p):
    d=p.get('dur',0.5); n=int(d*SR); t=np.arange(n)/SR
    if kind=='whoosh':
        x=noise(n,p.get('noise','white')); x=bandpass_sweep(x,p['f0'],p['f1'],p.get('q',0.7)); x*=env(n,p.get('attack',0.2),p.get('decay',0.3))
        return pan(x,p.get('pan0',0),p.get('pan1',0))
    if kind=='riser':
        f=p['f0']*(p['f1']/p['f0'])**(t/d); ph=2*np.pi*np.cumsum(f)/SR; tone=np.sin(ph)*0.6+np.sin(2*ph)*0.2
        nz=bandpass_sweep(noise(n),p['f0']*2,p['f1']*2,0.8); x=(1-p.get('noiseMix',0.5))*tone+p.get('noiseMix',0.5)*nz
        x*=env(n,p.get('attack',d*0.8),p.get('decay',d*0.2)); return stereo(x)
    if kind=='impact':
        sub=np.sin(2*np.pi*p.get('subF',45)*t*np.exp(-t*2))*np.exp(-t/p.get('subDecay',0.25))
        nn=int(p.get('noiseDur',0.06)*SR); nz=np.zeros(n); sos=butter(2,[p.get('noiseLow',200),p.get('noiseHigh',6000)],btype='band',fs=SR,output='sos')
        nz[:nn]=sosfilt(sos,noise(nn))*np.exp(-np.linspace(0,6,nn)); x=sub*0.9+nz*0.5; return stereo(x)
    if kind=='sparkle':
        x=np.zeros(n)
        for i in range(p.get('n',8)):
            f=np.exp(rng.uniform(np.log(p.get('fLow',2500)),np.log(p.get('fHigh',9000)))); on=int(rng.uniform(0,p.get('spread',0.25))*SR)
            m=n-on; e=np.exp(-np.arange(m)/SR/p.get('decay',0.35)); x[on:]+=np.sin(2*np.pi*f*np.arange(m)/SR)*e*rng.uniform(0.3,1)
        x/=np.abs(x).max()+1e-9; return pan(x,-0.3,0.3)
    if kind=='blip':
        x=np.zeros(n)
        for r,a in p.get('harmonics',[[1,1],[2,0.4]]): x+=a*np.sin(2*np.pi*p['f']*r*t)
        x*=env(n,0.003,p.get('decay',0.08)); return stereo(x)
    if kind=='click':
        sos=butter(2,[p.get('fLow',1500),p.get('fHigh',9000)],btype='band',fs=SR,output='sos'); x=sosfilt(sos,noise(n))*np.exp(-np.linspace(0,8,n)); return stereo(x)
    if kind=='shimmer':
        x=np.zeros(n)
        for i in range(p.get('n',6)):
            f=np.exp(rng.uniform(np.log(p.get('fLow',3000)),np.log(p.get('fHigh',8000)))); x+=np.sin(2*np.pi*f*t)*(0.6+0.4*np.sin(2*np.pi*p.get('tremRate',6)*t+rng.uniform(0,6)))
        x*=env(n,p.get('attack',0.15),p.get('decay',0.4)); x/=np.abs(x).max()+1e-9; return pan(x,-0.4,0.4)
    if kind=='tone':
        w=np.sin(2*np.pi*p['f']*t) if p.get('wave','sine')=='sine' else 2*np.abs(2*((p['f']*t)%1)-1)-1
        return stereo(w*env(n,p.get('attack',0.01),p.get('decay',0.3)))
    if kind=='pad_swell':
        x=np.zeros(n)
        for f in p.get('freqs',[110,165,220]):
            for dt in (-p.get('detune',0.3),0,p.get('detune',0.3)): x+=np.sin(2*np.pi*(f*(1+dt/100))*t+rng.uniform(0,6))
        x/=np.abs(x).max()+1e-9; x*=env(n,p.get('attack',d*0.6),p.get('decay',d*0.4)); return stereo(x)
    raise ValueError(kind)
def render(entry):
    x=gen(entry['kind'],entry.get('params',{}))
    if 'lowpass' in entry: sos=butter(2,entry['lowpass'],btype='low',fs=SR,output='sos'); x=np.stack([sosfilt(sos,x[:,c]) for c in range(2)],1)
    if 'highpass' in entry: sos=butter(2,entry['highpass'],btype='high',fs=SR,output='sos'); x=np.stack([sosfilt(sos,x[:,c]) for c in range(2)],1)
    if 'reverb' in entry: x=reverb(x,**entry['reverb'])
    peak=np.abs(x).max()+1e-9; x=x/peak*10**(entry.get('gainDb',-3)/20)
    return np.clip(x,-1,1)
if __name__=="__main__":
    spec=json.load(open(sys.argv[1])); out=sys.argv[2]; os.makedirs(out,exist_ok=True)
    for e in spec['sfx']:
        x=render(e); wavfile.write(os.path.join(out,e['file']),SR,(x*32767).astype(np.int16)); print("wrote",e['file'],f"{len(x)/SR:.2f}s")
