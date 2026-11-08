import json, sys
from captions import *

TW = json.load(open(f"{W_DIR}/timeline_words.json"))
PLAN = json.load(open(f"{W_DIR}/cut_plan.json"))

# Correções de transcrição específicas do projeto: PROJECT/project_fixes.py com FIX = {"v1": fn(words)->words, ...}
sys.path.insert(0, W_DIR)
try:
    from project_fixes import FIX
except ImportError:
    FIX = {}

def build(v):
    words = norm_words(TW[v], FIX.get(v, lambda ws: ws))
    words = refine_starts(words, f"{W_DIR}/{v}_cut.wav")
    total = sum(p["src_out"] - p["src_in"] for p in PLAN[v])
    blocks = blocks_of(words)
    return words, blocks, total

if __name__ == "__main__":
    for v in sys.argv[1:]:
        words, blocks, total = build(v)
        print(f"===== {v}  frames={total}  blocks={len(blocks)}")
        for b in blocks:
            print(f"  {b['words'][0]['s']:6.2f}  " + "  //  ".join(" ".join(("[B]" if w["blue"] else "") + w["w"] for w in l) for l in b["lines"]))


def render_video(v, outdir, frames=None):
    import icons
    words, blocks, total = build(v)
    items = layout(blocks, total)
    groups = icons.build_icons(v, words, total)
    render(items, total, outdir, extra=lambda f, rgb, al: icons.draw_icons(groups, f, rgb, al), frames=frames)
    return total, groups
