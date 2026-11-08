"""Passo 1 — transcrever todos os clips de clips.json (para escolher takes).
Uso:  python transcribe.py            -> escreve PROJECT/transcripts/<CLIP>.json e imprime o texto com tempos
clips.json: {"C0005": {"path": "/caminho/C0005.MP4"}, ...}  (make_clips.py gera-o a partir de uma pasta)
"""
import json, os
from paths import P, T
import asr

C = json.load(open(P("clips.json")))
os.makedirs(P("transcripts"), exist_ok=True)
for k, v in C.items():
    out = P("transcripts", f"{k}.json")
    if not os.path.exists(out):
        wav = T(f"{k}.wav")
        if not os.path.exists(wav):
            asr.to_wav(v["path"], wav)
        json.dump({"segments": asr.words(wav)}, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    print(f"===== {k}")
    for s in json.load(open(out, encoding="utf-8"))["segments"]:
        if "CD CD CD" in s["text"]:      # alucinação típica do whisper em silêncio final
            continue
        print(f"  [{s['start']:6.1f}-{s['end']:6.1f}] {s['text'].strip()}")
