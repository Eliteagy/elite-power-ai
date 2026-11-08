"""Passo 2 — plano de cortes a partir dos takes escolhidos.
PROJECT/segments.json  (janela aproximada de cada take, em segundos do clip; ordem = ordem no vídeo):
  {"v1": [["hook","C0005",6.0,16.3], ["coz","C0007",52.6,62.2], ...], "v2": [...]}
Faz: palavras exatas por take, ataque/fim reais por RMS, corta silêncios >= 0,5 s (jump cut), margens:
  início = ataque − 0,10 s ; fim = última voz + 0,27 s (8 f) ; silêncios internos com 0,08 s de folga.
-> PROJECT/cut_plan.json  {"v1": [{"seg","clip","path","src_in","src_out"}, ...]}  (frames do clip a 29,97)
"""
import json, os, wave, numpy as np
from paths import P, T
import asr

FPS = 30000 / 1001
PRE, TAIL, SPAD, MIN_SIL = 0.10, 0.27, 0.08, 0.5
C = json.load(open(P("clips.json")))
SEG = json.load(open(P("segments.json")))


def rms_db(wav):
    with wave.open(wav) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768; sr = w.getframerate()
    hop = sr // 100; n = len(x) // hop
    return 20 * np.log10(np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9)


plan, words_out = {}, {}
for v, segs in SEG.items():
    plan[v] = []
    for name, k, a, b in segs:
        full = T(f"{k}.wav")
        if not os.path.exists(full): asr.to_wav(C[k]["path"], full)
        part = T("seg.wav"); asr.to_wav(full, part, ss=a, t=b - a)
        ws = [w for s in asr.words(part, offset=a) for w in s["words"]]
        words_out[f"{v}_{name}"] = {"clip": k, "words": ws}
        db = rms_db(full)[int(a * 100):int(b * 100)]
        thr = max(np.percentile(db, 10) + 8, np.percentile(db, 90) - 28); voiced = db > thr
        i0 = int((ws[0]["s"] - a) * 100)
        onset = next((a + i / 100 for i in range(max(i0, 0), len(voiced) - 5) if voiced[i:i + 5].all()), ws[0]["s"])
        j1 = min(len(voiced) - 1, int((ws[-1]["e"] + 0.5 - a) * 100))
        last = next((a + i / 100 for i in range(j1, 3, -1) if voiced[i - 3:i + 1].all()), ws[-1]["e"])
        sil, run = [], None
        for i in range(int((onset - a) * 100), int((last - a) * 100)):
            if not voiced[i]:
                run = i if run is None else run
            else:
                if run is not None and i - run >= MIN_SIL * 100: sil.append((a + run / 100, a + i / 100))
                run = None
        cur = max(0.0, onset - PRE); pieces = []
        for s0, s1 in sil:
            pieces.append((cur, s0 + SPAD)); cur = s1 - SPAD
        pieces.append((cur, last + TAIL))
        for s0, s1 in pieces:
            plan[v].append({"seg": f"{v}_{name}", "clip": k, "path": C[k]["path"], "src_in": round(s0 * FPS), "src_out": round(s1 * FPS),
                            "t_in": round(s0, 3), "t_out": round(s1, 3)})
        print(f"{v}_{name:10s} {k} {onset:.2f}->{last:.2f} silences {[(round(x, 2), round(y, 2)) for x, y in sil]}")
    print(v, "total", round(sum(p["src_out"] - p["src_in"] for p in plan[v]) / FPS, 1), "s")
json.dump(plan, open(P("cut_plan.json"), "w"), indent=1)
json.dump(words_out, open(P("words.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
