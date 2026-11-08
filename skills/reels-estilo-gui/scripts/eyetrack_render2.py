"""Estabilização centrada nos olhos: cancela o tremor (alta freq.) e segue suavemente a cara (baixa freq.), sempre dentro da imagem."""
import json, subprocess, sys, numpy as np, cv2

from paths import PROJECT, YUNET
import os
W = PROJECT
VKEY = os.environ.get("EYE_VIDEO", "v1"); PIECE = int(os.environ.get("EYE_PIECE", "0")); TAG = f"{VKEY}_{PIECE}"
F = json.load(open(f"{W}/eyes_{TAG}_fused.json"))
plan = json.load(open(f"{W}/cut_plan.json"))[VKEY][PIECE]
SRC, A, B = plan["path"], plan["src_in"], plan["src_out"]
N = B - A
FPS = 30000 / 1001
IW, IH = 2160, 3840
OW, OH = 1080, 1920
EYE_OUT = np.array([540.0, 680.0])     # where the eyes sit on screen when centered
IOD_OUT = 250.0
S_MIN = float(sys.argv[5]) if len(sys.argv) > 5 else 0.6
S_MAX = 1.0
BLEND = 12
LF = float(sys.argv[2]) if len(sys.argv) > 2 else 12.0
CAPX = float(sys.argv[3]) if len(sys.argv) > 3 else 90.0
CAPY = float(sys.argv[4]) if len(sys.argv) > 4 else 70.0
OUT = sys.argv[1] if len(sys.argv) > 1 else f"{W}/eyelock_{TAG}.mov"

def smooth(v, s):
    k = int(s * 3); x = np.arange(-k, k + 1); g = np.exp(-x ** 2 / (2 * s * s)); g /= g.sum()
    return np.convolve(np.pad(v, k, mode="edge"), g, mode="valid")

ex, ey = np.array(F["mx"]), np.array(F["my"])
th = smooth(np.array(F["ang"]), 2.0)
s = smooth(np.clip(IOD_OUT / smooth(np.array(F["iod"]), 8.0), S_MIN, S_MAX), 6.0)
first = F["first_valid"]

lfx, lfy = smooth(ex, LF), smooth(ey, LF)
hfx, hfy = np.clip(ex - lfx, -CAPX, CAPX), np.clip(ey - lfy, -CAPY, CAPY)
lfx, lfy = smooth(ex - hfx, 3.0), smooth(ey - hfy, 3.0)   # excess of big moves goes to the (smoothed) follow path
hfx, hfy = ex - lfx, ey - lfy
mhx = np.percentile(np.abs(hfx[first:]), 99.5) + 4
mhy = np.percentile(np.abs(hfy[first:]), 99.5) + 4

# crop center so that eyes land at EYE_OUT (in output), using the low-frequency eye path
off = (np.array([OW / 2, OH / 2]) - EYE_OUT)   # output-space offset from eyes to frame center
def feasible(cx, cy, i):
    hw, hh = OW / 2 / s[i], OH / 2 / s[i]
    c, sn = abs(np.cos(th[i])), abs(np.sin(th[i]))
    ex_, ey_ = hw * c + hh * sn, hw * sn + hh * c          # half-extents of rotated crop
    return (np.clip(cx, ex_ + mhx, IW - ex_ - mhx) if IW - 2 * (ex_ + mhx) > 0 else IW / 2,
            np.clip(cy, ey_ + mhy, IH - ey_ - mhy) if IH - 2 * (ey_ + mhy) > 0 else IH / 2)
bx, by = np.zeros(N), np.zeros(N)
for i in range(N):
    c, sn = np.cos(th[i]), np.sin(th[i])
    o = np.array([[c, -sn], [sn, c]]) @ (off / s[i])        # offset rotated back into source space
    bx[i], by[i] = feasible(lfx[i] + o[0], lfy[i] + o[1], i)
bx, by = smooth(bx, 6.0), smooth(by, 6.0)
for i in range(N):
    bx[i], by[i] = feasible(bx[i], by[i], i)
cx, cy = bx + hfx, by + hfy

def M_stab(i):
    a = -th[i]; c, sn = np.cos(a) * s[i], np.sin(a) * s[i]
    R = np.array([[c, -sn], [sn, c]])
    t = np.array([OW / 2, OH / 2]) - R @ np.array([cx[i], cy[i]])
    return np.hstack([R, t[:, None]])
M_id = np.array([[0.5, 0, 0], [0, 0.5, 0]], float)

def cover_shift(M):
    """exact: output corners mapped back to source must lie inside the image; returns output-space translation fix."""
    Ai = np.linalg.inv(M[:, :2])
    O = np.array([[0, 0], [OW, 0], [OW, OH], [0, OH]], float)
    P = (Ai @ (O - M[:, 2]).T).T
    dx = max(0.0, -P[:, 0].min()) - max(0.0, P[:, 0].max() - IW)
    dy = max(0.0, -P[:, 1].min()) - max(0.0, P[:, 1].max() - IH)
    d = -(M[:, :2] @ np.array([dx, dy]))
    return d[0], d[1]

def _env(v, k=6, sg=3.0):
    out = np.zeros_like(v)
    for i in range(len(v)):
        w = v[max(0, i - k):i + k + 1]; out[i] = w[np.argmax(np.abs(w))]
    return smooth(out, sg)
FIXX, FIXY = np.zeros(N), np.zeros(N)
_M0 = M_stab
def M_stab(i):
    m = _M0(i).copy(); m[0, 2] += FIXX[i]; m[1, 2] += FIXY[i]; return m
for _ in range(5):
    R = np.array([cover_shift(M_stab(i)) if i >= first else (0.0, 0.0) for i in range(N)])
    if np.abs(R).max() < 0.5: break
    FIXX += _env(R[:, 0] * 1.15); FIXY += _env(R[:, 1] * 1.15)
print("residual after fix", np.abs(R).max().round(2), "frames touched", int(((np.abs(FIXX) + np.abs(FIXY)) > 0.5).sum()))

def ease(x):
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)

if OUT == "LIST":
    res = []
    for i in range(N):
        b = ease((i - first) / BLEND) if i >= first else 0.0
        if b <= 0: continue
        M = (1 - b) * M_id + b * M_stab(i)
        Ms = M.copy(); Ms[:, :2] *= 8   # evaluate on 1/8 res mask
        mk = cv2.warpAffine(np.full((IH // 8, IW // 8), 255, np.uint8), Ms, (OW, OH), flags=cv2.INTER_NEAREST)
        u = (mk < 255).mean()
        if u > 0.002: res.append((i, round(u * 100, 2)))
    print(res); sys.exit()
enc = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{OW}x{OH}", "-r", "30000/1001", "-i", "-",
                        "-c:v", "prores_ks", "-profile:v", "3", "-pix_fmt", "yuv422p10le", "-vendor", "apl0", OUT], stdin=subprocess.PIPE)
dec = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", f"{A / FPS:.4f}", "-i", SRC, "-frames:v", str(N), "-vf", "transpose=2",
                        "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
border_frames = 0; worst = 0.0
for i in range(N):
    buf = dec.stdout.read(IW * IH * 3)
    if len(buf) < IW * IH * 3: break
    img = np.frombuffer(buf, np.uint8).reshape(IH, IW, 3)
    b = ease((i - first) / BLEND) if i >= first else 0.0
    M = (1 - b) * M_id + b * M_stab(i)
    small = cv2.resize(img, (OW, OH), interpolation=cv2.INTER_AREA)
    if b <= 0:
        out = small
    else:
        out = cv2.warpAffine(img, M, (OW, OH), flags=cv2.INTER_CUBIC, borderMode=cv2.BORDER_REPLICATE)
        mask = cv2.warpAffine(np.full((IH, IW), 255, np.uint8), M, (OW, OH), flags=cv2.INTER_NEAREST, borderMode=cv2.BORDER_CONSTANT)
        if (mask < 255).any():
            border_frames += 1
            unc = (mask < 255).mean(); worst = max(worst, unc)
    enc.stdin.write(out.tobytes())
enc.stdin.close(); enc.wait()
print(f"first {first} | margins hf x {mhx:.0f} y {mhy:.0f} | scale {s.min():.2f}-{s.max():.2f} | frames with border {border_frames} worst uncovered {worst*100:.1f}%")
