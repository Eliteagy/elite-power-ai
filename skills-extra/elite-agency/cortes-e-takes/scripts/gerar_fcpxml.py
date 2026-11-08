#!/usr/bin/env python3
"""Gera FCPXML 1.9 (DaVinci: Arquivo > Importar > Linha de Tempo) a partir de um plano JSON.

Uso:  python gerar_fcpxml.py plano.json saida.fcpxml

plano.json:
{
  "nome": "Reel Imovel",
  "sequencia": {"largura": 1080, "altura": 1920, "fps": 29.97},
  "pasta_base": "C:/Users/NOME/Downloads/",          # caminhos relativos são resolvidos aqui
  "media": {
    "c1": {"ficheiro": "IMG_0843.MOV", "fps": 24, "duracao": 532.25, "largura": 2160, "altura": 3840},
    "c2": {"ficheiro": "pasta/IMG_0846 2.MOV", "fps": 29.97, "duracao": 6.45, "largura": 1080, "altura": 1920}
  },
  "clips": [ {"media": "c1", "inicio": 82.0, "fim": 85.0}, {"media": "c2", "inicio": 0, "fim": 6.4} ]
}
fps aceites: 23.976, 24, 25, 29.97, 30, 50, 59.94, 60. Tempos racionais exatos, ao frame.
"""
import json, sys
from fractions import Fraction as Fr
from urllib.parse import quote

FD = {23.976: Fr(1001, 24000), 24: Fr(1, 24), 25: Fr(1, 25), 29.97: Fr(1001, 30000), 30: Fr(1, 30),
      50: Fr(1, 50), 59.94: Fr(1001, 60000), 60: Fr(1, 60)}
def fd(fps): return FD[min(FD, key=lambda k: abs(k - fps))]
def r(v): return f"{v.numerator}/{v.denominator}s" if v.denominator != 1 else f"{v.numerator}s"
def snap(t, f): return round(Fr(t).limit_denominator(100000) / f) * f

p = json.load(open(sys.argv[1], encoding="utf-8"))
sq = p["sequencia"]; tf = fd(sq["fps"]); base = p.get("pasta_base", "")
fmts, fmt_ids, assets = [], {}, []
def fmt(w, h, f):
    k = (w, h, f)
    if k not in fmt_ids:
        fmt_ids[k] = f"r{len(fmt_ids)+1}"
        fmts.append(f'<format id="{fmt_ids[k]}" frameDuration="{r(f)}" width="{w}" height="{h}"/>')
    return fmt_ids[k]
seq_fmt = fmt(sq["largura"], sq["altura"], tf)
for mid, m in p["media"].items():
    f = fd(m["fps"]); fid = fmt(m.get("largura", sq["largura"]), m.get("altura", sq["altura"]), f)
    path = m["ficheiro"] if ":" in m["ficheiro"][:3] else base + m["ficheiro"]
    src = "file:///" + quote(path.replace("\\", "/"), safe="/:")
    m["_f"], m["_fid"] = f, fid
    name = path.replace("\\", "/").split("/")[-1]
    assets.append(f'<asset id="{mid}" name="{name}" start="0s" duration="{r(snap(m["duracao"], f))}" hasVideo="1" hasAudio="1" '
                  f'format="{fid}" audioSources="1" audioChannels="2"><media-rep kind="original-media" src="{src}"/></asset>')
clips, pos = [], Fr(0)
for c in p["clips"]:
    m = p["media"][c["media"]]; dur = snap(c["fim"] - c["inicio"], tf)
    clips.append(f'<asset-clip ref="{c["media"]}" name="{c["media"]}" offset="{r(pos)}" start="{r(snap(c["inicio"], m["_f"]))}" '
                 f'duration="{r(dur)}" format="{m["_fid"]}" tcFormat="NDF"/>')
    pos += dur
nl = "\n"
xml = f'''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.9">
<resources>
{nl.join(fmts)}
{nl.join(assets)}
</resources>
<library><event name="{p.get('nome','Edicao')}"><project name="{p.get('nome','Edicao')}">
<sequence format="{seq_fmt}" duration="{r(pos)}" tcStart="3600s" tcFormat="NDF"><spine>
{nl.join(clips)}
</spine></sequence></project></event></library>
</fcpxml>'''
open(sys.argv[2], "w", encoding="utf-8").write(xml)
print(f"{len(clips)} clips, {float(pos):.2f}s")
