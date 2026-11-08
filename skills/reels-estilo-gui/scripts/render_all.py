import sys, subprocess, shutil, os
from paths import P, T
from multiprocessing import Pool
from run_captions import render_video
def job(v):
    d = T(f"ovl_{v}"); shutil.rmtree(d, ignore_errors=True)
    total, _ = render_video(v, d)
    os.makedirs(P("legendas"), exist_ok=True); out = P("legendas", f"Legendas+Icones {v}.mov")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "30000/1001", "-i", f"{d}/%05d.png", "-c:v", "prores_ks", "-profile:v", "4444",
                    "-pix_fmt", "yuva444p10le", "-alpha_bits", "16", "-vendor", "apl0", out], check=True)
    shutil.rmtree(d, ignore_errors=True)
    return v, total, out
if __name__ == "__main__":
    with Pool(4) as p:
        for r in p.map(job, sys.argv[1:]): print(r)
