#!/usr/bin/env python
"""Contact sheet builder. Usage:
  sheet.py START END OUT.png [--cols N] [--tile W] [--crop x0,y0,x1,y1] [--step S] [--src full|half]
Every frame START..END (inclusive, 0-based frame index) is tiled with its index+time label.
--crop applies to FULL-RES coords (1920x1080) regardless of src.
"""
import sys, os, argparse
from PIL import Image, ImageDraw, ImageFont
p=argparse.ArgumentParser()
p.add_argument("start",type=int); p.add_argument("end",type=int); p.add_argument("out")
p.add_argument("--cols",type=int,default=6); p.add_argument("--tile",type=int,default=320)
p.add_argument("--crop",default=None); p.add_argument("--step",type=int,default=1)
p.add_argument("--src",default="half")
a=p.parse_args()
FULL=os.environ.get("NF_FRAMES_FULL","/Users/ahlec/Desktop/TESTE Remotion SaaS/_ref/frames_full")
HALF=os.environ.get("NF_FRAMES_HALF","/Users/ahlec/Desktop/TESTE Remotion SaaS/_ref/frames_half")
try: font=ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc",14)
except: font=ImageFont.load_default()
frames=list(range(a.start,a.end+1,a.step))
crop=None
if a.crop:
    x0,y0,x1,y1=map(int,a.crop.split(","))
    crop=(x0,y0,x1,y1)
def load(i):
    if a.src=="full":
        im=Image.open(f"{FULL}/{i+1:04d}.png").convert("RGB")
        if crop: im=im.crop(crop)
    else:
        im=Image.open(f"{HALF}/{i+1:04d}.jpg").convert("RGB")
        if crop: im=im.crop(tuple(v//2 for v in crop))
    return im
im0=load(frames[0]); ar=im0.height/im0.width
W=a.tile; H=int(W*ar); PAD=2
rows=(len(frames)+a.cols-1)//a.cols
sheet=Image.new("RGB",(a.cols*(W+PAD),rows*(H+PAD)),(50,50,50)); d=ImageDraw.Draw(sheet)
for k,i in enumerate(frames):
    im=load(i).resize((W,H),Image.LANCZOS)
    x=(k%a.cols)*(W+PAD); y=(k//a.cols)*(H+PAD); sheet.paste(im,(x,y))
    t=f"{i} | {i/30:.3f}s"; d.rectangle([x,y,x+len(t)*8+6,y+18],fill=(0,0,0)); d.text((x+3,y+1),t,fill=(255,255,0),font=font)
sheet.save(a.out); print("saved",a.out,"frames",frames[0],"-",frames[-1],"n=",len(frames),"tile",W,"x",H)
