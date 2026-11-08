"""Deteta os olhos (YuNet) frame a frame no troço do gancho (C0005), já na vertical."""
import json, subprocess, numpy as np, cv2

from paths import PROJECT, YUNET
import os
W = PROJECT
VKEY = os.environ.get("EYE_VIDEO", "v1"); PIECE = int(os.environ.get("EYE_PIECE", "0")); TAG = f"{VKEY}_{PIECE}"
plan = json.load(open(f"{W}/cut_plan.json"))[VKEY][PIECE]
SRC, A, B = plan["path"], plan["src_in"], plan["src_out"]
FPS = 30000 / 1001
DW, DH = 1080, 1920                   # detection resolution (upright)
SC = 2160 / DW                        # -> full-res upright coords

det = cv2.FaceDetectorYN_create(YUNET, "", (DW, DH), score_threshold=0.6)
p = subprocess.Popen(["ffmpeg", "-v", "error", "-ss", f"{A / FPS:.4f}", "-i", SRC, "-frames:v", str(B - A),
                      "-vf", f"transpose=2,scale={DW}:{DH}", "-f", "rawvideo", "-pix_fmt", "bgr24", "-"], stdout=subprocess.PIPE)
out = []
for i in range(B - A):
    buf = p.stdout.read(DW * DH * 3)
    if len(buf) < DW * DH * 3:
        break
    img = np.frombuffer(buf, np.uint8).reshape(DH, DW, 3)
    _, faces = det.detect(img)
    if faces is None or len(faces) == 0:
        out.append(None); continue
    f = max(faces, key=lambda r: r[2] * r[3])
    # YuNet landmarks: right eye (x,y), left eye (x,y), nose, mouth r, mouth l
    re_, le_ = (f[4] * SC, f[5] * SC), (f[6] * SC, f[7] * SC)
    out.append({"re": re_, "le": le_, "box": [float(v * SC) for v in f[:4]], "score": float(f[14])})
json.dump({"src_in": A, "frames": [o if o is None else {k: (list(map(float, v)) if isinstance(v, tuple) else v) for k, v in o.items()} for o in out]},
          open(f"{W}/eyes_{TAG}.json", "w"))
ok = [i for i, o in enumerate(out) if o]
print("frames", len(out), "detected", len(ok))
for i in range(0, len(out), 15):
    o = out[i]
    t = (A + i) / FPS
    if o:
        d = np.hypot(o["re"][0] - o["le"][0], o["re"][1] - o["le"][1])
        ang = np.degrees(np.arctan2(o["le"][1] - o["re"][1], o["le"][0] - o["re"][0]))
        print(f"{i:4d} t={t:5.2f}s mid=({(o['re'][0]+o['le'][0])/2:6.0f},{(o['re'][1]+o['le'][1])/2:6.0f}) iod={d:5.0f} ang={ang:5.1f}")
    else:
        print(f"{i:4d} t={t:5.2f}s  -")
