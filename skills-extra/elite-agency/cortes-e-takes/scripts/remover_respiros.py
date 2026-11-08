#!/usr/bin/env python3
"""Remove respiros e pausas da fala (voz off ou talking-head).

Uso:
  python remover_respiros.py ENTRADA SAIDA.wav [--segmentos segmentos.json] [--pausa 0.12] [--limiar 24] [--ar 0.09]

  --segmentos  JSON [{"inicio","fim"}] (ex.: de escolher_takes.py). Sem ele usa o ficheiro inteiro.
  --pausa      remove trechos não-fala >= isto (s). 0.12 = respiros; 0.35 = só pausas.
  --limiar     dB abaixo do percentil 95 que contam como não-fala (24 = respiros/ruído de sala).
  --ar         silêncio inserido entre segmentos (s).
Gera SAIDA.wav (48 kHz, HPF 80 Hz, compressão, loudnorm -16 LUFS) e SAIDA.json com os pedaços mantidos
(tempos na fonte) -> usa-os para cortar o vídeo exatamente igual (ffmpeg/FCPXML).
"""
import argparse, json, subprocess, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--segmentos"); ap.add_argument("--pausa", type=float, default=0.12)
ap.add_argument("--limiar", type=float, default=24); ap.add_argument("--ar", type=float, default=0.09)
ap.add_argument("--pad", type=float, default=0.04)
a = ap.parse_args()

SR = 48000; HOP = int(0.01 * SR)
x = np.frombuffer(subprocess.run(["ffmpeg", "-v", "error", "-i", a.src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                                 capture_output=True, check=True).stdout, dtype=np.float32).copy()
segs = [(s["inicio"], s["fim"]) for s in json.load(open(a.segmentos))] if a.segmentos else [(0, len(x) / SR)]
minrun = int(round(a.pausa / 0.01)); pad = int(round(a.pad / 0.01))
pieces, kept, removed = [], [], 0.0
for s0, s1 in segs:
    seg = x[int(s0 * SR):int(s1 * SR)]; n = len(seg) // HOP
    if n < 5: continue
    db = 20 * np.log10(np.sqrt((seg[:n * HOP].reshape(n, HOP) ** 2).mean(1)) + 1e-9)
    sp = db > np.percentile(db, 95) - a.limiar
    i = 0
    while i < n:  # tapar buracos < 60 ms dentro da fala
        if not sp[i]:
            j = i
            while j < n and not sp[j]: j += 1
            if 0 < i and j < n and j - i <= 6: sp[i:j] = True
            i = j
        else: i += 1
    keep = np.ones(n, bool); i = 0
    while i < n:
        if not sp[i]:
            j = i
            while j < n and not sp[j]: j += 1
            lo = i + (0 if i == 0 else pad); hi = j - (0 if j == n else pad)
            if (j - i >= minrun or i == 0 or j == n) and hi > lo: keep[lo:hi] = False; removed += (hi - lo) * 0.01
            i = j
        else: i += 1
    idx = np.where(keep)[0]
    for r in np.split(idx, np.where(np.diff(idx) != 1)[0] + 1):
        if len(r) < 3: continue
        p = seg[r[0] * HOP:(r[-1] + 1) * HOP].copy(); f = min(int(0.008 * SR), len(p) // 2); ramp = np.linspace(0, 1, f)
        p[:f] *= ramp; p[-f:] *= ramp[::-1]; pieces.append(p)
        kept.append([round(s0 + r[0] * 0.01, 3), round(s0 + (r[-1] + 1) * 0.01, 3)])
    pieces.append(np.zeros(int(a.ar * SR), np.float32))
y = np.concatenate(pieces)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "1", "-i", "-",
                "-af", "highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=11",
                "-ar", str(SR), a.out], input=y.tobytes(), check=True)
json.dump(kept, open(a.out.rsplit(".", 1)[0] + ".json", "w"))
print(f"removido {removed:.2f}s -> duração {len(y)/SR:.2f}s, {len(kept)} pedaços")
