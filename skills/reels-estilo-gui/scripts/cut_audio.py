"""Passo 3 — áudio já cortado de cada vídeo (igual à timeline) + palavras com tempos de timeline.
Uso:  python cut_audio.py v1 v2 ...   -> PROJECT/<v>_cut.wav  e  PROJECT/timeline_words.json
Verificar o texto impresso: se faltar/sobrar alguma palavra nas junções, rever o corte.
"""
import json, os, subprocess, sys
from paths import P, T
import asr

FPS = 30000 / 1001
plan = json.load(open(P("cut_plan.json")))
tw_path = P("timeline_words.json")
tw = json.load(open(tw_path, encoding="utf-8")) if os.path.exists(tw_path) else {}
C = json.load(open(P("clips.json")))
for v in sys.argv[1:]:
    parts = []
    for i, q in enumerate(plan[v]):
        full = T(f"{q['clip']}.wav")
        if not os.path.exists(full): asr.to_wav(C[q["clip"]]["path"], full)
        out = T(f"{v}_{i:02d}.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{q['src_in'] / FPS:.4f}", "-i", full,
                        "-t", f"{(q['src_out'] - q['src_in']) / FPS:.4f}", out], check=True)
        parts.append(out)
    lst = T(f"{v}_list.txt"); open(lst, "w").write("".join(f"file '{x}'\n" for x in parts))
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, P(f"{v}_cut.wav")], check=True)
    tw[v] = [w for s in asr.words(P(f"{v}_cut.wav")) for w in s["words"]]
    print(v, " ".join(w["w"] for w in tw[v]))
json.dump(tw, open(tw_path, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
