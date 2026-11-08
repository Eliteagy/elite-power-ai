"""Exemplo (vídeos do Carlos Dias): correções às palavras do Whisper antes das legendas."""

def fix_v1(ws): return ws

def fix_v2(ws):
    out = []
    i = 0
    while i < len(ws):
        w = ws[i]
        if w["w"].lower() == "ar" and i + 1 < len(ws) and ws[i + 1]["w"].lower() == "funcionado":
            n = dict(w); n["w"] = "ar-condicionado"; n["e"] = ws[i + 1]["e"]; n["sent_end"] = ws[i + 1]["sent_end"]; n["comma"] = ws[i + 1]["comma"]
            out.append(n); i += 2; continue
        if w["w"] == "Master" and i + 1 < len(ws) and ws[i + 1]["w"] == "Suite":
            n = dict(w); n["w"] = "Master Suite"; n["e"] = ws[i + 1]["e"]; n["sent_end"] = ws[i + 1]["sent_end"]; n["comma"] = ws[i + 1]["comma"]
            out.append(n); i += 2; continue
        if w["w"] == "E" and i > 0 and ws[i - 1]["w"] == "ele" and i + 1 < len(ws) and ws[i + 1]["w"] == "antes":
            i += 1; continue
        out.append(w); i += 1
    return out

def fix_v3(ws):
    out = []
    for i, w in enumerate(ws):
        if w["w"] == "esse" and i + 1 < len(ws) and ws[i + 1]["w"] == "investimento":
            d = (w["e"] - w["s"]) / 3
            for j, t in enumerate(["e", "sim", "um"]):
                out.append({"w": t, "s": w["s"] + j * d, "e": w["s"] + (j + 1) * d, "sent_end": False, "comma": False})
            continue
        out.append(w)
    return out

def fix_v2a(ws):
    out = fix_v2(ws)
    for w in out:
        if w["w"].lower() == "arconcionado": w["w"] = "ar-condicionado"
    return out

def fix_v2b(ws):
    out = []
    for i, w in enumerate(ws):
        if w["w"] == "móvel" and i > 0 and ws[i - 1]["w"] == "esse": w = dict(w); w["w"] = "imóvel"
        out.append(w)
    return out

FIX = {"v1": fix_v1, "v2": fix_v2, "v3": fix_v3, "v2a": fix_v2a, "v2b": fix_v2b}

