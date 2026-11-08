"""Passo 0 — inventário da footage (deduplica cópias repetidas por nome+tamanho, ignora ._ e zips).
Uso:  python make_clips.py "/pasta/da/footage"   -> PROJECT/clips.json
"""
import json, os, subprocess, sys
from paths import P

root = sys.argv[1]
seen, out = {}, {}
for d, _, fs in os.walk(root):
    for f in sorted(fs):
        if f.startswith("._") or not f.lower().endswith((".mp4", ".mov", ".mxf")):
            continue
        p = os.path.join(d, f); key = (os.path.splitext(f)[0].split("-")[0].upper(), os.path.getsize(p))
        if key in seen:
            continue
        seen[key] = p
        name = key[0] if key[0] not in out else f"{key[0]}_{len(out)}"
        r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=codec_type,width,height,r_frame_rate",
                            "-of", "json", p], capture_output=True, text=True)
        j = json.loads(r.stdout or "{}"); vs = [s for s in j.get("streams", []) if s["codec_type"] == "video"]
        out[name] = {"path": p, "dur": round(float(j.get("format", {}).get("duration", 0)), 2),
                     "w": vs[0]["width"] if vs else None, "h": vs[0]["height"] if vs else None, "fps": vs[0]["r_frame_rate"] if vs else None}
        print(name, out[name]["dur"], out[name]["w"], out[name]["h"], out[name]["fps"], p)
json.dump(dict(sorted(out.items())), open(P("clips.json"), "w"), indent=1)
print("clips:", len(out), "| total min", round(sum(v["dur"] for v in out.values()) / 60, 1))
