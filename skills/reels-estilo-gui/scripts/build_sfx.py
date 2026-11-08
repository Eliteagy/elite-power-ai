import json, subprocess, numpy as np, sys, os
from paths import P, SFX_POP
from run_captions import build
import icons
FPS = 30000 / 1001; SR = 48000
SFX = SFX_POP
def load(p, mono=False):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "1" if mono else "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    x = np.frombuffer(raw, np.float32); return x if mono else x.reshape(-1, 2)
s = load(SFX); env = np.abs(s).max(1); onset = int(np.argmax(env > env.max() * 0.1))
s = s[max(0, onset - 48):]           # trim to ~1ms before onset
def rms_peak(x):
    h = int(0.02 * SR); n = len(x) // h; r = np.sqrt((x[:n * h].reshape(n, h, -1) ** 2).mean((1, 2))); return r.max()
os.makedirs(P('sfx'), exist_ok=True)
for v in sys.argv[1:]:
    words, blocks, total = build(v)
    groups = icons.build_icons(v, words, total)
    voice = load(P(f"{v}_cut.wav"), mono=True)
    h = int(0.02 * SR); n = len(voice) // h; vr = np.sqrt((voice[:n * h].reshape(n, h) ** 2).mean(1))
    vref = np.percentile(vr[vr > 1e-3], 90)
    gain = vref * 10 ** (-7 / 20) / rms_peak(s)
    out = np.zeros((int(total / FPS * SR) + SR, 2), np.float32)
    for t in icons.sfx_times(groups):
        st = int((t + 2 / FPS) * SR)
        seg = s * gain; e = min(len(out), st + len(seg)); out[st:e] += seg[:e - st]
    out = out[:int(round(total / FPS * SR))]
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s24le", P("sfx", f"SFX {v}.wav")], input=out.tobytes(), check=True)
    print(v, "cues", len(icons.sfx_times(groups)), f"gain {20*np.log10(gain):.1f} dB", "dur", round(len(out) / SR, 2))
