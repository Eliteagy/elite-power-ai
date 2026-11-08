"""Passo 6 — música instrumental (voz da faixa removida com Demucs) ao nível certo, com fades.
Uso:  python music_bed.py v1 "/caminho/faixa.mp3" [inicio_seg]
 - sem inicio_seg escolhe o troço mais energético e estável com a duração do vídeo
 - nível = fala − 12 LU ; fade-in 0,5 s ; fade-out 1,5 s
-> PROJECT/musica/Musica <v> - <faixa> (instrumental).wav
"""
import json, os, re, subprocess, sys, numpy as np
from paths import P, T

FPS = 30000 / 1001
v, track = sys.argv[1], sys.argv[2]
start = float(sys.argv[3]) if len(sys.argv) > 3 else None
name = os.path.splitext(os.path.basename(track))[0]
sep = T("demucs", "htdemucs", name, "no_vocals.wav")
if not os.path.exists(sep):
    subprocess.run(["demucs", "--two-stems=vocals", "-n", "htdemucs", "-o", T("demucs"), track], check=True)
L = sum(p["src_out"] - p["src_in"] for p in json.load(open(P("cut_plan.json")))[v]) / FPS


def lufs(p):
    e = subprocess.run(["ffmpeg", "-i", p, "-af", "ebur128", "-f", "null", "-"], capture_output=True, text=True).stderr
    return float(re.findall(r"I:\s+(-?[\d.]+) LUFS", e)[-1])


if start is None:
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", sep, "-ac", "1", "-ar", "8000", "-f", "f32le", "-"], capture_output=True).stdout
    a = np.frombuffer(raw, np.float32); hop = 2000; n = len(a) // hop
    e = 20 * np.log10(np.sqrt((a[:n * hop].reshape(n, hop) ** 2).mean(1)) + 1e-9); sm = np.convolve(e, np.ones(8) / 8, mode="same")
    win = int(L * 4)
    start = max(range(0, max(1, n - win)), key=lambda s: sm[s:s + win].mean() - 0.5 * sm[s:s + win].std()) / 4
seg = T(f"music_{v}.wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{start:.3f}", "-t", f"{L + 0.05:.3f}", "-i", sep, "-ar", "48000", "-ac", "2", seg], check=True)
gain = (lufs(P(f"{v}_cut.wav")) - 12) - lufs(seg)
os.makedirs(P("musica"), exist_ok=True)
out = P("musica", f"Musica {v} - {name[:40]} (instrumental).wav")
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", seg, "-af", f"volume={gain:.2f}dB,afade=t=in:st=0:d=0.5,afade=t=out:st={L - 1.5:.3f}:d=1.5",
                "-t", f"{L:.3f}", "-c:a", "pcm_s24le", out], check=True)
print(v, f"start {start:.1f}s len {L:.1f}s ->", out, f"{lufs(out):.1f} LUFS")
