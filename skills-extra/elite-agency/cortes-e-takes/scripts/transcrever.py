#!/usr/bin/env python3
"""Transcrição PT com Whisper turbo (sherpa-onnx) + Silero VAD.

Uso:
  python transcrever.py VIDEO_OU_AUDIO --modelos PASTA_MODELOS [--lingua pt] [--intervalos 10-20 35.5-40]

PASTA_MODELOS deve conter:
  sherpa-onnx-whisper-turbo/turbo-encoder.int8.onnx, turbo-decoder.int8.onnx, turbo-tokens.txt
  silero_vad.onnx
Download (GitHub releases k2-fsa/sherpa-onnx):
  asr-models/sherpa-onnx-whisper-turbo.tar.bz2   e   asr-models/silero_vad.onnx
Saída: uma linha por frase -> "  12.34-  15.67 | texto"
"""
import argparse, subprocess, numpy as np, sherpa_onnx

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("--modelos", required=True)
ap.add_argument("--lingua", default="pt"); ap.add_argument("--intervalos", nargs="*")
ap.add_argument("--silencio_min", type=float, default=0.35)
a = ap.parse_args()

SR = 16000
pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", a.src, "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                     capture_output=True, check=True).stdout
x = np.frombuffer(pcm, dtype=np.float32)
m = a.modelos.rstrip("/") + "/sherpa-onnx-whisper-turbo/turbo-"
rec = sherpa_onnx.OfflineRecognizer.from_whisper(encoder=m + "encoder.int8.onnx", decoder=m + "decoder.int8.onnx",
                                                 tokens=m + "tokens.txt", language=a.lingua, task="transcribe", num_threads=2)

def decode(samples):
    st = rec.create_stream(); st.accept_waveform(SR, np.asarray(samples, dtype=np.float32)); rec.decode_stream(st)
    return st.result.text.strip()

if a.intervalos:
    for r in a.intervalos:
        s, e = map(float, r.split("-"))
        print(f"{s:7.2f}-{e:7.2f} | {decode(x[int(s*SR):int(e*SR)])}", flush=True)
    raise SystemExit

cfg = sherpa_onnx.VadModelConfig(); cfg.silero_vad.model = a.modelos.rstrip("/") + "/silero_vad.onnx"
cfg.silero_vad.min_silence_duration = a.silencio_min; cfg.silero_vad.max_speech_duration = 20; cfg.sample_rate = SR
vad = sherpa_onnx.VoiceActivityDetector(cfg, buffer_size_in_seconds=max(60, len(x) / SR + 10))

def drain():
    while not vad.empty():
        seg = vad.front; st = seg.start / SR; en = st + len(seg.samples) / SR
        print(f"{st:7.2f}-{en:7.2f} | {decode(seg.samples)}", flush=True); vad.pop()

for i in range(0, len(x), 512):
    vad.accept_waveform(x[i:i+512]); drain()
vad.flush(); drain()
