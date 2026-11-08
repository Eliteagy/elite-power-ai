"""Trajetória precisa dos olhos: KLT nos pontos da cara (frame a frame) + correção lenta pela deteção YuNet."""
import json, subprocess, numpy as np, cv2

from paths import PROJECT, YUNET
import os
W = PROJECT
VKEY = os.environ.get("EYE_VIDEO", "v1"); PIECE = int(os.environ.get("EYE_PIECE", "0")); TAG = f"{VKEY}_{PIECE}"
E = json.load(open(f"{W}/eyes_{TAG}.json"))          # detections in full-res upright coords
plan = json.load(open(f"{W}/cut_plan.json"))[VKEY][PIECE]
SRC, A, B = plan["path"], plan["src_in"], plan["src_out"]
N = B - A
FPS = 30000 / 1001
DW, DH, SC = 1080, 1920, 2.0

fr = E["frames"]
valid = np.array([o is not None and np.hypot(o["re"][0] - o["le"][0], o["re"][1] - o["le"][1]) > 45 for o in fr])
idx = np.arange(N)
def series(fn):
    v = np.array([fn(o) if ok else np.nan for o, ok in zip(fr, valid)], float)
    g = ~np.isnan(v); return np.interp(idx, idx[g], v[g])
dmx = series(lambda o: (o["re"][0] + o["le"][0]) / 2) / SC
dmy = series(lambda o: (o["re"][1] + o["le"][1]) / 2) / SC
dang = series(lambda o: np.arctan2(o["le"][1] - o["re"][1], o["le"][0] - o["re"][0]))
diod = series(lambda o: np.hypot(o["re"][0] - o["le"][0], o["re"][1] - o["le"][1])) / SC
bx = series(lambda o: o["box"][0]) / SC; by = series(lambda o: o["box"][1]) / SC
bw = series(lambda o: o["box"][2]) / SC; bh = series(lambda o: o["box"][3]) / SC

p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", f"{A / FPS:.4f}", "-i", SRC, "-frames:v", str(N),
                      "-vf", f"transpose=2,scale={DW}:{DH}", "-f", "rawvideo", "-pix_fmt", "gray", "-"], stdout=subprocess.PIPE)
prev = None
inc = [None] * N        # per-frame similarity (from i-1 to i): dx, dy (of eye-mid), dtheta, dscale, ok
lk = dict(winSize=(21, 21), maxLevel=3, criteria=(cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 30, 0.01))
for i in range(N):
    buf = p.stdout.read(DW * DH)
    if len(buf) < DW * DH: break
    g = np.frombuffer(buf, np.uint8).reshape(DH, DW)
    if prev is not None and valid[max(0, i - 1)]:
        mask = np.zeros_like(prev)
        x0, y0 = int(bx[i - 1] + 0.1 * bw[i - 1]), int(by[i - 1])
        x1, y1 = int(bx[i - 1] + 0.9 * bw[i - 1]), int(by[i - 1] + 0.62 * bh[i - 1])
        mask[max(y0, 0):max(y1, 0), max(x0, 0):max(x1, 0)] = 255
        pts = cv2.goodFeaturesToTrack(prev, 200, 0.01, 4, mask=mask)
        if pts is not None and len(pts) >= 12:
            nxt, st, _ = cv2.calcOpticalFlowPyrLK(prev, g, pts, None, **lk)
            back, st2, _ = cv2.calcOpticalFlowPyrLK(g, prev, nxt, None, **lk)
            fb = np.linalg.norm(back - pts, axis=2).ravel()
            ok = (st.ravel() == 1) & (st2.ravel() == 1) & (fb < 0.6)
            if ok.sum() >= 10:
                M, inl = cv2.estimateAffinePartial2D(pts[ok], nxt[ok], method=cv2.RANSAC, ransacReprojThreshold=1.0)
                if M is not None and inl.sum() >= 8:
                    c = np.array([dmx[i - 1], dmy[i - 1]])
                    c2 = M[:, :2] @ c + M[:, 2]
                    inc[i] = (c2[0] - c[0], c2[1] - c[1], np.arctan2(M[1, 0], M[0, 0]), np.hypot(M[0, 0], M[1, 0]), int(inl.sum()))
    prev = g

# integrate KLT increments, fuse with detections via complementary filter
def lowpass(v, s):
    k = int(s * 3); x = np.arange(-k, k + 1); w = np.exp(-x ** 2 / (2 * s * s)); w /= w.sum()
    return np.convolve(np.pad(v, k, mode="edge"), w, mode="valid")

kx, ky, ka, ks = [np.zeros(N) for _ in range(4)]
good = np.zeros(N, bool)
for i in range(1, N):
    if inc[i] is None:
        kx[i], ky[i], ka[i], ks[i] = kx[i - 1], ky[i - 1], ka[i - 1], ks[i - 1]
    else:
        dx, dy, da, dsc, n = inc[i]
        kx[i], ky[i], ka[i], ks[i] = kx[i - 1] + dx, ky[i - 1] + dy, ka[i - 1] + da, ks[i - 1] + np.log(dsc)
        good[i] = True
# where KLT missing, follow detection increments instead (keep continuity)
for i in range(1, N):
    if not good[i]:
        kx[i] = kx[i - 1] + (dmx[i] - dmx[i - 1]); ky[i] = ky[i - 1] + (dmy[i] - dmy[i - 1])
        ka[i] = ka[i - 1] + (dang[i] - dang[i - 1]); ks[i] = ks[i - 1] + np.log(diod[i] / diod[i - 1])
SIG = 12.0
fx = kx + lowpass(dmx - kx, SIG)
fy = ky + lowpass(dmy - ky, SIG)
fa = ka + lowpass(dang - ka, SIG * 1.5)
fiod = np.exp(ks + lowpass(np.log(diod) - ks, SIG * 1.5))
out = {"mx": (fx * SC).tolist(), "my": (fy * SC).tolist(), "ang": fa.tolist(), "iod": (fiod * SC).tolist(),
       "klt_ok": good.tolist(), "first_valid": int(np.argmax(valid))}
json.dump(out, open(f"{W}/eyes_{TAG}_fused.json", "w"))
print("KLT ok frames:", int(good.sum()), "of", N, "| first valid", int(np.argmax(valid)))
d = np.diff(fx[160:]); print("fused eye-mid step px (half-res) median", np.median(np.abs(d)).round(2))
