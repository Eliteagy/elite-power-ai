#!/usr/bin/env python3
"""Pre-selecao tecnica de trechos de video, pagina de votos e aprendizagem de criterios."""
import argparse
import html
import json
import os
import subprocess
import sys

import cv2
import numpy as np

AQUI = os.path.dirname(os.path.abspath(__file__))
DADOS = os.path.join(AQUI, "..", "dados")
CRITERIOS = os.path.join(DADOS, "criterios.json")
ACUMULADOS = os.path.join(DADOS, "votos_acumulados.json")
EXT = (".mp4", ".mov", ".mxf", ".mkv", ".avi", ".m4v")
LARGURA = 320
FPS = 15
MIN_VOTOS = 10
# limite: valor a partir do qual a medida penaliza; pior: valor em que a penalizacao e total
INICIAIS = {
    "tremor_px": {"limite": 0.5, "pior": 2.0, "peso": 35, "sentido": "max"},
    "salto_px": {"limite": 3.0, "pior": 10.0, "peso": 20, "sentido": "max"},
    "velocidade_px": {"limite": 4.0, "pior": 15.0, "peso": 10, "sentido": "max"},
    "nitidez": {"limite": 120.0, "pior": 30.0, "peso": 20, "sentido": "min"},
    "estourado_pct": {"limite": 8.0, "pior": 35.0, "peso": 10, "sentido": "max"},
    "escuro_pct": {"limite": 15.0, "pior": 50.0, "peso": 5, "sentido": "max"},
}


def ler_criterios():
    if os.path.exists(CRITERIOS):
        with open(CRITERIOS, encoding="utf-8") as f:
            return json.load(f)
    return json.loads(json.dumps(INICIAIS))


def medir_clip(path):
    """Devolve medidas frame a frame, a FPS fixo e baixa resolucao."""
    cap = cv2.VideoCapture(path)
    if not cap.isOpened():
        raise RuntimeError("nao abre: " + path)
    origem = cap.get(cv2.CAP_PROP_FPS) or 30.0
    passo = max(1, int(round(origem / FPS)))
    fps = origem / passo
    janela = None
    anterior = None
    linhas = []
    i = 0
    while cap.grab():
        if i % passo == 0:
            ok, fr = cap.retrieve()
            if not ok:
                break
            h = int(round(fr.shape[0] * LARGURA / fr.shape[1]))
            cinza = cv2.cvtColor(cv2.resize(fr, (LARGURA, h), interpolation=cv2.INTER_AREA), cv2.COLOR_BGR2GRAY)
            f32 = np.float32(cinza)
            if janela is None:
                janela = cv2.createHanningWindow((LARGURA, h), cv2.CV_32F)
            dx = dy = 0.0
            if anterior is not None:
                (dx, dy), _ = cv2.phaseCorrelate(anterior, f32, janela)
            anterior = f32
            linhas.append((dx, dy, cv2.Laplacian(cinza, cv2.CV_64F).var(),
                           float((cinza >= 250).mean() * 100), float((cinza <= 12).mean() * 100)))
        i += 1
    cap.release()
    return np.array(linhas, dtype=np.float64).reshape(-1, 5), fps


def alisar(x, n):
    n = min(n, len(x))
    if n < 2:
        return x.copy()
    return np.convolve(np.pad(x, (n // 2, n - n // 2 - 1), mode="edge"), np.ones(n) / n, mode="valid")


def medidas_janela(m, a, b, sx, sy):
    dx, dy = m[a:b, 0], m[a:b, 1]
    res = np.hypot(dx - sx[a:b], dy - sy[a:b])
    return {
        "tremor_px": round(float(np.median(res)), 3),
        "salto_px": round(float(np.percentile(np.hypot(dx, dy), 98)), 3),
        "velocidade_px": round(float(np.median(np.hypot(sx[a:b], sy[a:b]))), 3),
        "nitidez": round(float(np.percentile(m[a:b, 2], 20)), 1),
        "estourado_pct": round(float(m[a:b, 3].mean()), 2),
        "escuro_pct": round(float(m[a:b, 4].mean()), 2),
    }


def nota(med, crit):
    total = 100.0
    avisos = []
    for k, c in crit.items():
        v = med[k]
        if c["sentido"] == "max":
            frac = (v - c["limite"]) / max(c["pior"] - c["limite"], 1e-6)
        else:
            frac = (c["limite"] - v) / max(c["limite"] - c["pior"], 1e-6)
        frac = float(np.clip(frac, 0, 1))
        if frac > 0:
            total -= frac * c["peso"]
            avisos.append(k)
    return round(total, 1), avisos


def escolher(m, fps, crit, por_clip, dur_s):
    n = int(round(dur_s * fps))
    if len(m) < max(n + 1, 4):
        return []
    w = int(fps * 0.5) | 1
    sx, sy = alisar(m[:, 0], w), alisar(m[:, 1], w)
    cand = []
    for a in range(1, len(m) - n + 1, max(1, n // 4)):
        med = medidas_janela(m, a, a + n, sx, sy)
        s, avisos = nota(med, crit)
        cand.append((s, a, med, avisos))
    cand.sort(key=lambda c: -c[0])
    fora = []
    for s, a, med, avisos in cand:
        if all(abs(a - b["_a"]) >= n for b in fora):
            fora.append({"_a": a, "inicio": round(a / fps, 2), "fim": round((a + n) / fps, 2),
                         "nota": s, "avisos": avisos, "medidas": med})
        if len(fora) == por_clip:
            break
    return fora


def previa(path, ini, fim, destino):
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(ini), "-to", str(fim), "-i", path, "-an",
                    "-vf", "scale=-2:640", "-c:v", "libx264", "-preset", "veryfast", "-crf", "24",
                    "-pix_fmt", "yuv420p", "-movflags", "+faststart", destino], check=True)


PAGINA = """<!doctype html><html lang="pt-PT"><meta charset="utf-8"><title>Rever planos</title>
<style>body{background:#111;color:#eee;font:15px system-ui;margin:0;padding:20px}h1{font-size:20px;margin:0 0 4px}
#t{position:sticky;top:0;background:#111;padding:10px 0;z-index:2}button{font:inherit;padding:7px 12px;border:1px solid #555;background:#222;color:#eee;border-radius:6px;cursor:pointer}
.g{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px}.c{background:#1b1b1b;padding:10px;border-radius:8px;border:2px solid transparent}
.c.bom{border-color:#3fa45b}.c.mau{border-color:#c54848}video{width:100%;border-radius:4px;background:#000}.m{font-size:12px;color:#aaa;margin:6px 0}
.b{display:flex;gap:6px;margin:6px 0}.bom .vb,.mau .vm{background:#eee;color:#111}input{width:100%;box-sizing:border-box;background:#222;border:1px solid #444;color:#eee;padding:6px;border-radius:4px}</style>
<div id="t"><h1>Rever planos</h1><span id="n"></span> <button onclick="exp()">Exportar votos</button>
<p class="m">A nota só mede defeitos técnicos. Quem decide se o plano é bom és tu.</p></div><div class="g">__CARTOES__</div>
<script>const K="votos:__ID__",V=JSON.parse(localStorage.getItem(K)||"{}");
function g(){localStorage.setItem(K,JSON.stringify(V));let b=0,m=0;document.querySelectorAll(".c").forEach(c=>{const v=V[c.dataset.id]||{};c.classList.remove("bom","mau");if(v.voto)c.classList.add(v.voto);if(v.voto=="bom")b++;if(v.voto=="mau")m++;c.querySelector("input").value=v.motivo||""});document.getElementById("n").textContent=b+" bons, "+m+" maus, de "+document.querySelectorAll(".c").length}
function vt(e,x){const i=e.closest(".c").dataset.id;V[i]=V[i]||{};V[i].voto=V[i].voto==x?null:x;g()}
function mt(e){const i=e.closest(".c").dataset.id;V[i]=V[i]||{};V[i].motivo=e.value;localStorage.setItem(K,JSON.stringify(V))}
function exp(){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(V,null,1)],{type:"application/json"}));a.download="votos.json";a.click()}g()</script></html>"""


def analisar(a):
    crit = ler_criterios()
    fich = []
    for p in a.origem:
        if os.path.isdir(p):
            fich += sorted(os.path.join(p, f) for f in os.listdir(p) if f.lower().endswith(EXT))
        else:
            fich.append(p)
    if not fich:
        sys.exit("sem videos")
    os.makedirs(os.path.join(a.o, "previas"), exist_ok=True)
    planos = []
    for f in fich:
        nome = os.path.splitext(os.path.basename(f))[0]
        try:
            m, fps = medir_clip(f)
            esc = escolher(m, fps, crit, a.por_clip, a.duracao)
        except Exception as e:
            print("ERRO", nome, e)
            continue
        for k, t in enumerate(esc):
            pid = "%s_%d" % (nome, k)
            previa(f, t["inicio"], t["fim"], os.path.join(a.o, "previas", pid + ".mp4"))
            t.pop("_a")
            planos.append(dict(id=pid, clip=f, **t))
        print(nome, len(esc), "trechos", [t["nota"] for t in esc], flush=True)
    planos.sort(key=lambda t: (t["clip"], t["inicio"]))
    with open(os.path.join(a.o, "planos.json"), "w", encoding="utf-8") as h:
        json.dump(planos, h, ensure_ascii=False, indent=1)
    cartoes = []
    for t in planos:
        av = (" · avisos: " + ", ".join(t["avisos"])) if t["avisos"] else ""
        cartoes.append('<div class="c" data-id="%s"><video src="previas/%s.mp4" controls loop muted preload="none" onmouseenter="this.play()"></video>'
                       '<div class="m"><b>%s</b> %.2f–%.2f s · técnica %.0f%s</div>'
                       '<div class="b"><button class="vb" onclick="vt(this,\'bom\')">Bom</button><button class="vm" onclick="vt(this,\'mau\')">Mau</button></div>'
                       '<input placeholder="Porquê?" oninput="mt(this)"></div>'
                       % (html.escape(t["id"]), html.escape(t["id"]), html.escape(os.path.basename(t["clip"])),
                          t["inicio"], t["fim"], t["nota"], html.escape(av)))
    pid = json.dumps(os.path.abspath(a.o).replace("\\", "/"))[1:-1]
    pag = PAGINA.replace("__CARTOES__", "".join(cartoes)).replace("__ID__", pid)
    with open(os.path.join(a.o, "revisao.html"), "w", encoding="utf-8") as h:
        h.write(pag)
    print(len(planos), "trechos ->", os.path.join(a.o, "revisao.html"))


def aprender(a):
    with open(a.votos, encoding="utf-8") as f:
        votos = json.load(f)
    with open(a.planos, encoding="utf-8") as f:
        planos = {t["id"]: t for t in json.load(f)}
    os.makedirs(DADOS, exist_ok=True)
    acum = []
    if os.path.exists(ACUMULADOS):
        with open(ACUMULADOS, encoding="utf-8") as f:
            acum = json.load(f)
    chave = {(v["clip"], v["inicio"]) for v in acum}
    novos = 0
    for pid, v in votos.items():
        t = planos.get(pid)
        if not t or v.get("voto") not in ("bom", "mau") or (t["clip"], t["inicio"]) in chave:
            continue
        acum.append({"clip": t["clip"], "inicio": t["inicio"], "voto": v["voto"],
                     "motivo": v.get("motivo", ""), "medidas": t["medidas"]})
        novos += 1
    with open(ACUMULADOS, "w", encoding="utf-8") as f:
        json.dump(acum, f, ensure_ascii=False, indent=1)
    bons = [v["medidas"] for v in acum if v["voto"] == "bom"]
    maus = [v["medidas"] for v in acum if v["voto"] == "mau"]
    print("novos", novos, "| acumulados: bons", len(bons), "maus", len(maus))
    for v in acum:
        if v["motivo"]:
            print(" ", v["voto"], os.path.basename(v["clip"]), v["inicio"], "-", v["motivo"])
    if len(bons) < MIN_VOTOS or len(maus) < MIN_VOTOS:
        print("limites nao alterados: faltam votos (minimo %d de cada)" % MIN_VOTOS)
        return
    crit = ler_criterios()
    for k, c in crit.items():
        b, m = float(np.median([x[k] for x in bons])), float(np.median([x[k] for x in maus]))
        sb, sm = float(np.std([x[k] for x in bons])), float(np.std([x[k] for x in maus]))
        forte = abs(m - b) >= 0.8 * max((sb + sm) / 2, 1e-6)
        separa = forte and ((m > b) if c["sentido"] == "max" else (m < b))
        if separa:
            c["limite"], c["pior"] = round(b, 3), round(m, 3)
            print(k, "limite", c["limite"], "pior", c["pior"])
        else:
            print(k, "nao separa bons de maus: sem alteracao")
    with open(CRITERIOS, "w", encoding="utf-8") as f:
        json.dump(crit, f, indent=1)


def main():
    p = argparse.ArgumentParser()
    s = p.add_subparsers(dest="cmd", required=True)
    x = s.add_parser("analisar")
    x.add_argument("origem", nargs="+")
    x.add_argument("-o", required=True)
    x.add_argument("--por-clip", type=int, default=3)
    x.add_argument("--duracao", type=float, default=2.5)
    x.set_defaults(fn=analisar)
    y = s.add_parser("aprender")
    y.add_argument("votos")
    y.add_argument("--planos", required=True)
    y.set_defaults(fn=aprender)
    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
