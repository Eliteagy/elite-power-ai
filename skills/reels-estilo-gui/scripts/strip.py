import json, subprocess, sys
from PIL import Image, ImageDraw, ImageFont
from paths import PROJECT, FONT_SF
W = PROJECT
C = json.load(open(f"{W}/clips.json"))
f = ImageFont.truetype(FONT_SF, 18)
def frame(k, t, w=144, h=256):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.2f}", "-i", C[k]["path"], "-frames:v", "1", "-vf", f"transpose=2,scale={w}:{h}", "-f", "rawvideo", "-pix_fmt", "rgb24", "-"], capture_output=True).stdout
    return Image.frombytes("RGB", (w, h), raw) if len(raw) == w * h * 3 else Image.new("RGB", (w, h))
def strip(label, k, a, b, n=8):
    tiles = []
    for i in range(n):
        t = a + (b - a) * i / (n - 1)
        im = frame(k, t); ImageDraw.Draw(im).text((3, 2), f"{t:.1f}", font=f, fill=(255, 255, 0)); tiles.append(im)
    row = Image.new("RGB", (130 + 144 * n, 256)); d = ImageDraw.Draw(row)
    d.text((4, 100), f"{label}\n{k}\n{a:.1f}-{b:.1f}", font=f, fill=(255, 255, 255))
    for i, t in enumerate(tiles): row.paste(t, (130 + 144 * i, 0))
    return row
if __name__ == "__main__":
    out = sys.argv[1]; specs = json.loads(sys.argv[2])
    rows = [strip(*s) for s in specs]
    sh = Image.new("RGB", (rows[0].width, 256 * len(rows)))
    for j, r in enumerate(rows): sh.paste(r, (0, 256 * j))
    sh.save(out)
