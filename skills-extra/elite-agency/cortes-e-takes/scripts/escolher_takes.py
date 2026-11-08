#!/usr/bin/env python3
"""Escolhe a ÚLTIMA repetição completa de cada frase a partir da transcrição de transcrever.py.

Uso:
  python escolher_takes.py transcricao.txt -o segmentos.json [--sim 0.55] [--min_palavras 4]

Lógica:
  - ignora frases curtas/lixo ("E aí", "Novamente", "vamos repetir", contagens 3-2-1, palavrões no fim)
  - agrupa frases parecidas (difflib, por início comum) -> um "bloco" do guião
  - em cada bloco fica a última ocorrência que não termina em falha; ordem final = ordem do 1.º aparecimento
Saída JSON: [{"inicio": s, "fim": e, "texto": "..."}]  — REVÊ SEMPRE À MÃO antes de cortar.
"""
import argparse, json, re, difflib

ap = argparse.ArgumentParser()
ap.add_argument("txt"); ap.add_argument("-o", default="segmentos.json")
ap.add_argument("--sim", type=float, default=0.55); ap.add_argument("--min_palavras", type=int, default=4)
a = ap.parse_args()

LIXO = re.compile(r"^(e aí|ok|novamente|vamos (fazer|repetir)|let'?s go|exato|até lá|[\d ,.]+)\W*$", re.I)
FALHA = re.compile(r"(novamente|f[ou]d|merda|porra|vamos repetir|não\.?$|\.\.\.$|hum\W*$)", re.I)

linhas = []
for l in open(a.txt, encoding="utf-8"):
    if "|" not in l: continue
    t, txt = l.split("|", 1); s, e = map(float, t.split("-")); txt = txt.strip()
    if len(txt.split()) < a.min_palavras or LIXO.match(txt): continue
    linhas.append(dict(inicio=s, fim=e, texto=txt))

def norm(t): return re.sub(r"[^\w ]", "", t.lower())
blocos = []
for l in linhas:
    n = norm(l["texto"])[:80]
    for b in blocos:
        if difflib.SequenceMatcher(None, b["chave"], n).ratio() >= a.sim:
            b["ocorr"].append(l); break
    else:
        blocos.append(dict(chave=n, ocorr=[l]))

out = []
for b in blocos:
    boas = [o for o in b["ocorr"] if not FALHA.search(o["texto"])]
    escolha = (boas or b["ocorr"])[-1]
    out.append(escolha)
json.dump(out, open(a.o, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for o in out: print(f'{o["inicio"]:7.2f}-{o["fim"]:7.2f} | {o["texto"]}')
print(f"{len(out)} segmentos, {sum(o['fim']-o['inicio'] for o in out):.1f}s")
