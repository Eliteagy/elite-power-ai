---
name: edicao-pro
description: Edição de vídeo profissional de ponta a ponta. O Claude edita sozinho a partir do footage bruto e entrega o MP4 final, com hook forte, retenção, cortes limpos, punch-ins, b-roll, legendas e gráficos com design Apple HIG, grade cinematográfica, sound design e QC automático. Usa para "edita este vídeo", "faz um reel/short", "corta este talking head", "vídeo de imobiliário", "vídeo para YouTube", "anúncio", "deixa isto profissional/cinematográfico". Formatos: reels talking head, imobiliário, YouTube longo e anúncios.
---

# Edição Pro: o Claude edita e entrega o MP4

Princípio: **o Claude não edita às cegas**. Lê o footage (transcrição palavra a palavra, rostos, cenas, beats), toma as decisões de editor numa **EDL** (`edl.json`), o motor renderiza de forma determinística e o **QC** verifica antes de entregar. Para corrigir alguma coisa, muda-se a EDL e volta-se a renderizar; a cache só re-renderiza os clips que mudaram.

Scripts em `scripts/` (Python 3 + ffmpeg; Whisper na GPU via faster-whisper):
| Script | O que faz |
|---|---|
| `analisar.py` | probe, transcrição palavra a palavra com índices, silêncios, cenas, preto, rostos (YuNet), loudness, contact sheet; `--musica` dá BPM e beats |
| `render.py` | EDL → MP4. `--plano` (só a timeline, sem render), `--preview` (50%, rápido) e render final |
| `qc.py` | formato, loudness, preto, congelados, ar morto, hook, ritmo, nitidez/brilho do 1.º frame + contact sheet |
| `graficos.py` / `luts.py` | módulos internos: legendas e gráficos ASS (design HIG) e LUTs originais |

`S="<pasta desta skill>/scripts"`, `P=<pasta do projeto>` (por defeito ao lado do footage, em `_edicao/<nome>`).

## Pipeline obrigatório

### 1. Briefing (máx. 1 pergunta, só se faltar)
Formato e plataforma, duração alvo, objetivo (o que o espectador deve **sentir e fazer**) e a marca (cor de destaque, CTA). Se não for dito, usa os defaults do formato (`references/formato-*.md`). Música: pergunta se há uma; se não houver, usa a da pasta do utilizador ou gera com a skill `acestep`.

### 2. Analisar
```
python $S/analisar.py VIDEO1 VIDEO2 ... --out $P/analise [--sem-voz para b-roll]
python $S/analisar.py --musica MUSICA.mp3 --out $P/analise
```
**Lê sempre**: `*_transcricao.txt` (frases com `[i0-i1]` de índices de palavras, pausas e palavras duvidosas) e **vê** os `*_sheet.jpg`. Sem ver o footage não há edição.

### 3. Decisões de editor (pensar antes de escrever a EDL)
Por esta ordem. Cada uma tem a referência ao lado:
1. **Hook** (`references/hooks.md`): escolhe a frase mais forte do vídeo inteiro (pode vir do meio) e põe-na em primeiro lugar. Hook = verbal + visual + texto, os três nos primeiros 1,5 s. Gera 3 opções mentalmente e escolhe a melhor.
2. **Estrutura** (`references/formato-*.md`): hook → promessa → conteúdo em blocos → payoff → CTA. Corta tudo o que não serve a promessa.
3. **Takes**: com repetições fica a **última** completa. Tira falsos arranques ("por exemplo, Por exemplo"), "hum", "ok", "bem", frases redundantes ("estejam atentos" ×2) e despedidas longas.
4. **Retenção** (`references/retencao.md`): mapa de pattern interrupts. Uma mudança visual a cada 2–4 s nos reels (6–8 s no YouTube): punch-in, b-roll, gráfico, SFX. Re-hook a cada 30–60 s no longo.
5. **Look** (`references/look.md`) e **som** (`references/som.md`).
6. **Design** dos gráficos e legendas (`references/design-hig.md`): 1 cor de destaque, só em palavras-chave; contraste ≥ 4,5:1; motion curto.

### 4. Escrever a EDL → plano
Esquema completo em `references/edl.md`. Para talking head usa `aroll.segmentos` com **índices de palavras** (permite reordenar para pôr o hook primeiro). Depois:
```
python $S/render.py $P/edl.json --plano
```
Lê `plano.txt`: os clips com tempos e posição do rosto, e o **tempo de saída de cada palavra**. Ancora gráficos, SFX, b-roll e transições a palavras (`"t": "w:123"`, `"w:123:e"`, `"w:123+0.2"`, `"c:4"`, `"fim-2"`). Assim sobrevivem a mudanças nos cortes.

### 5. Preview → ver → corrigir
```
python $S/render.py $P/edl.json --preview
```
Extrai frames dos momentos-chave (hook, cada gráfico, cada b-roll, o fim) e **olha para eles**:
`ffmpeg -ss T -i preview.mp4 -frames:v 1 f.jpg` ou um tile com `select`. Procura:
- cabeça cortada, rosto tapado por texto, texto ilegível, gráfico a sair da safe area;
- 1.º frame fraco (mão na cara, desfocado, a ajeitar-se) → muda o início;
- texto redundante com a legenda → esconde as legendas durante o card (`legendas.esconder`).

### 6. Render final + QC (obrigatório)
```
python $S/render.py $P/edl.json
python $S/qc.py $P/saida/FINAL.mp4 --edl $P/edl.json
```
`FALHA` bloqueia a entrega. Cada `AVISO` resolve-se ou justifica-se ao utilizador. Vê sempre o `qc_sheet.jpg`.

### 7. Entregar
Caminho do MP4, duração, as 3–5 decisões principais (hook escolhido, o que foi cortado, look) e o que está pendente (ex.: "transcrição ouviu 'aspas', corrigi para 'hacks'; confirma"). Guarda a EDL: é o projeto.

## Padrões que separam o profissional do amador (não negociáveis)
1. **Os primeiros 1,5 s decidem tudo.** Sem logo, sem "olá", sem "bem-vindos" a abrir: entra a meio da ação ou com a frase mais forte. O 1.º frame já tem rosto nítido, com texto ou movimento.
2. **Nunca ar morto.** Pausas > 0,3 s cortadas (`max_gap`); a primeira palavra cai antes de 0,4 s.
3. **Movimento constante e subtil.** `push` 0,02–0,03 em todos os clips e punch-ins (1,0 ↔ 1,12–1,18) nas mudanças de ideia. Os cortes virtuais em fronteiras de frase já vêm automáticos com `punch`.
4. **O enquadramento segue o rosto.** É automático: headroom de 7% e a cabeça nunca é cortada. Confirma em `plano.txt` (`rosto(topo,fundo,x)`).
5. **Os gráficos nunca tapam a cara.** Usa `pos: "auto"` (o default), que escolhe acima ou abaixo do rosto e respeita as safe areas das redes.
6. **Contraste sempre legível.** O render mede o fundo real e escolhe texto claro ou escuro e um acento com contraste (WCAG). Não forces cores.
7. **Cada elemento entra quando é dito.** O gráfico ancora à palavra (`w:IDX`) e o SFX ao frame do gráfico ou do corte.
8. **Som = 50% do cinematográfico.** SFX em cada transição e gráfico, música com ducking debaixo da voz, voz com EQ e compressão; loudness −14 LUFS e true peak ≤ −1 dBTP.
9. **Um look por vídeo.** Uma LUT com intensidade 0,6–0,8, grão subtil e vinheta leve. Menos é mais.
10. **Payoff + CTA claros no fim.** Loop para o início quando faz sentido (é o que dá replays).

## Formatos (lê o ficheiro antes de editar)
- Reel/Short talking head → `references/formato-talking-head.md`
- Imobiliário cinematográfico → `references/formato-imobiliario.md`
- YouTube longo 16:9 → `references/formato-youtube.md`
- Anúncio/promo 15–30 s → `references/formato-anuncio.md`

## Recursos
- SFX: `../efeitos-sonoros/` (52 SFX originais por categoria; o render encontra-os pelo nome, ex.: `"som": "whoosh_rapido_01"`). Mapa em `references/som.md`.
- Fontes: `assets/fonts/` (Inter, OFL; é o substituto livre da SF Pro). LUTs: `assets/luts/` (originais) ou geradas por intensidade.
- Motion graphics complexos (gráficos animados, UI, 3D): renderiza um `.mov` com alfa com as skills `hyperframes` ou `remotion-best-practices` e mete-o em `overlays` na EDL.
- Edição manual no DaVinci (quando pedido): skill `edicao-cinematografica` (plugin antigo) + MCP Resolve.

## Falhas conhecidas e soluções
- Whisper erra nomes e anglicismos ("hikigai", "7 aspas") → `legendas.corrigir`. Lê as `[duvida: ...]` da transcrição.
- O Whisper perde a pontuação em monólogos longos → as frases do `_transcricao.txt` partem por comprimento; confirma as fronteiras de frase ao escolher takes.
- Câmaras gravam preto e fade no início → é automático (o áudio fica e o vídeo congela o 1.º frame bom), mas o melhor é não abrir no início do ficheiro.
- Rosto não detetado (de costas, muito pequeno) → define `foco` manual no clip ou `"seguir_rosto": false`.
