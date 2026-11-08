#!/usr/bin/env python
"""stdin lines: LABEL FRAME X Y [R]  -> mean hex in box"""
import sys
sys.path.insert(0,"/Users/ahlec/Desktop/TESTE Remotion SaaS/_ref/tools")
from measure import frame, hexc, lum
cache={}
for line in sys.stdin:
    p=line.split()
    if not p or p[0].startswith("#"): 
        if p: print(line.rstrip())
        continue
    lab,f,x,y=p[0],int(p[1]),int(p[2]),int(p[3]); R=int(p[4]) if len(p)>4 else 3
    if f not in cache: cache[f]=frame(f)
    a=cache[f]; r=a[y-R:y+R+1,x-R:x+R+1].reshape(-1,3).mean(0)
    print(f"{lab:22s} f{f} ({x},{y}) {hexc(r)} lum={lum(r):.0f}")
