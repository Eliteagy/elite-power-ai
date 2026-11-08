import json, subprocess, sys, numpy as np, os
from PIL import Image
from run_captions import render_video
from paths import P
os.chdir(P())
FPS = 30000 / 1001
v, out = sys.argv[1], sys.argv[2]; ts = [float(x) for x in sys.argv[3:]]
plan = json.load(open("cut_plan.json"))[v]
frames = [int(t * FPS) for t in ts]
tmp = out + "_ov"; render_video(v, tmp, frames=frames)
def tl_frame(f):
    rec = 0
    for p in plan:
        n = p["src_out"] - p["src_in"]
        if f < rec + n:
            t = (p["src_in"] + (f - rec)) / FPS
            vf = "transpose=2,scale=1080:1920"
            if p["clip"] == "C0005" and v == "v1" and os.path.exists("eyelock_C0005_estabilizado.mov"):
                raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{(f-rec)/FPS:.3f}", "-i", "eyelock_C0005_estabilizado.mov", "-frames:v", "1", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
            else:
                raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", p["path"], "-frames:v", "1", "-vf", vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
            return np.frombuffer(raw, np.uint8).reshape(1920, 1080, 3).astype(np.float32)
        rec += n
tiles = []
for f in frames:
    bg = tl_frame(f); ov = np.array(Image.open(f"{tmp}/{f:05d}.png")).astype(np.float32)
    a = ov[..., 3:4] / 255; comp = ov[..., :3] * a + bg * (1 - a)
    tiles.append(Image.fromarray(comp.astype(np.uint8)).resize((270, 480)))
s = Image.new("RGB", (270 * len(tiles), 480))
for i, im in enumerate(tiles): s.paste(im, (270 * i, 0))
s.save(out)
