# Neutral Flow — mecânica de animação (referência da skill AMK SaaS)

> Cópia da parte mecânica do documento canónico [[Design Systems/SaaS Animation Style Neutral Flow/SaaS Animation Style Neutral Flow|SaaS Animation Style Neutral Flow]] (paleta do original NeuraFlow omitida — no AMK usa-se a tabela «papéis de luz e material → tokens AMK» do `SKILL.md` §1 e `templates/neutral-flow/remotion/lib/theme-amk.ts`). Ler **antes** de animar qualquer coisa para a marca. Código pronto em `templates/neutral-flow/` (mesmo conteúdo do `templates/neutral-flow/` do estilo; caminhos `templates/neutral-flow/…` abaixo já foram traduzidos). Se este ficheiro e o canónico divergirem, o canónico manda — e atualizar este.

Os valores de cor que aparecem nas tabelas abaixo são os do estilo neutro (para leitura das receitas); substituir pelos tokens AMK. Tudo o resto (frames, px, curvas, k, contagens, envelopes, SFX, métricas) aplica-se tal e qual. As receitas de gradiente do §2.2 do canónico (pill de 10 stops, vidro lavanda, rampa da estrela, avatares) estão no documento canónico; os equivalentes AMK estão em `theme-amk.ts`.

---

## 1. A identidade em 14 regras

1. **Chão navy-preto, cor pela luz.** O fundo é quase preto; toda a cor da cena vem de um feixe que desce do topo e de um horizonte que ilumina em baixo. Nada é "pintado" de azul.
2. **Um herói por cena, centrado.** O centro x do herói é 960±5 (lockup, dashboard, anel, pill/card, trio de cards, estrela, logo). Satélites ficam a 0,4–0,6 de opacidade e/ou desfocados 2–6 px.
3. **Vidro sem `backdrop-filter`.** Vidro = gradiente vertical azul→navy + highlight de 1–2 px no topo + ring de 1 px + glow da cor do elemento. Determinístico no render.
4. **Entradas = decaimento exponencial** `1−e^(−k·x)` normalizado, k por elemento (2,5–10), com **soft start de 1–3 frames** (`softExpOut(k, 0,06–0,12)` — fração da duração). Nunca `cubic-out`.
5. **Câmara = spline C¹** (Fritsch–Carlson) sobre tabelas medidas e suavizadas (Savitzky-Golay). Nunca keyframes lineares nem segmentos sine-in-out encadeados.
6. **Grupos já visíveis deslocam-se com ease-in-out** medido (pico de velocidade ao 4.º frame, cauda longa). Só as *entradas* são exp-out.
7. **Nada pára.** Depois de cada settle há creep residual (dolly-out −0,4…−0,9 px/f, ou flutuação ±6 px em seno). Holds são vivos mas não tremem — o movimento tem direção.
8. **Saídas aceleram para dentro do corte** (cubic-in, 9–14 f) com fade só parcial (0,5–0,55). É o corte que acaba o plano, não um fade. Exceções medidas: o anel New Updates apaga 50 % em 5 f (smoothstep) e o grupo do título faz fade total em 9 f (smoothstep) ao subir.
9. **Cortes duros só em downbeats; um evento grande por compasso.** Cenas de 1, 1,5 ou 2 compassos; o resto é settle, creep e preenchimento secundário.
10. **Ocultação em vez de fade.** O herói novo tapa o antigo (o wordmark cai por baixo do dashboard que sobe; o anel roda por baixo da janela-estrela).
11. **Texto entra por 6 modos fixos** (§4.9): fade quad-in + blur-in leve (logo), slide-up 14–29 px + fade (títulos), wipe esq→dir (subtítulos e linhas de corpo), typewriter linear 1 char/frame (input), blur-in 32→0 px (logo do outro), wipe de brilho (tagline). Corpo/etiquetas chegam tarde e ténues (≤0,55–0,6).
12. **Overshoot <2 %, sem bounce.** Única exceção medida: uma pill que entra de baixo com back-out (s=2,2) e um flash de brilho.
13. **Um acento magenta por vídeo** (≈1 s: f486–514, resíduo do rim até f528 — a transição-estrela). Tudo o resto é azul.
14. **Tudo determinístico e verificado.** Pseudo-aleatório por hash, GL por software (`swangle`), e três métricas (jerk, flicker, luminância por cena) contra a referência.

---

## 2. Tipografia (escala) e geometria do logo

Família segue o AMK (`SKILL.md` §2); os pesos abaixo (500/700/600/400) são os medidos e os que o kit carrega; daqui vêm **tamanhos, proporções e tracking por papel**.

### 2.3 Tipografia

**Uma família: Inter 4.1**, pesos 400/500/600/700, carregada **localmente** (woff2 em `public/fonts/`, `@remotion/fonts` `loadFont`) — nunca Google Fonts em render. Ainda em aberto se o original é Inter ou SF Pro (`[medido]` por cap height com a razão da Inter, 0,727 em); as métricas de comparação bateram com Inter.

| Papel | Peso | Tamanho a 1080p | Tracking | Onde |
|---|---|---|---|---|
| Wordmark (intro) | 500 | 144 px efetivos (cap 105) | +0,065 em `[impl.]` | 158 px × câmara 0,912 = 144 px no ecrã em f20; largura "NeuraFlow" 807 px; o spec estimou ≈−0,01 em e a largura nunca foi verificada por render — em aberto (§10) |
| Wordmark (outro) | 500 | 128 px (cap 93) | +0,065 em | bbox 683–1395 × 455–548 |
| Wordmark gigante de fundo | 500 | 262 px | −0,01 em | blur 5 px, opacidade ≤0,85 |
| Wordmark na sidebar | 500 | 28 px | 0 | com estrela 20 px, gap 12 |
| Palavra-herói ("New") | 700 | 169 px (cap 123) | −0,01 em | gradiente vertical |
| Sub-herói ("Updates") | 600 | 86 px | +0,04 em | |
| H1 ("Smart Control") | 700 | 72 px (cap 51 → ~70) | −0,01 em | bbox 711–1197 × 193–244 |
| H2 ("Customized Dashboard") | 400 | 48 px | 0 | bbox 662–1183 × 265–324 |
| Tagline | 400 | 48 px `[impl.]` / ~42 `[medido]` | +0,045 em | bbox 637–1283 × 610–652 |
| Input (typewriter) | 400 | 34 px | −0,005 em | `#eef5ff` |
| Etiquetas e bullets (chat) | 400 | 30 px, line-height 35 px | 0 | |
| Saudação do dashboard | 600 | 48 / 47 px | 0 | "Hello, Mark" / "How can I help you today?" |
| Títulos de card | 600 / 400 | 40 / 32 / 28 / 21 / 18 px | 0 | 600: nome 32, Costs 28, Task completion 21, Processes/Tasks 18; 400: Documents 40, Analytics 28, "Welcome back," 18 |
| Nav / botões | 400 / 600 | 18 / 16 px | 0 | ativo 600 branco |
| Corpo de card | 400 | 19 px, lh 1,5 | 0 | |
| Dados / eixos / meta | 400 | 13–15 px | 0 | |
| Etiqueta de secção | 600 | 11 px maiúsculas | +0,08 em | "PREFERENCE" |
| Texto dentro dos cards 3D | 400 | 16,5 / 12,5 / 11,5 px | 0 | visto em perspetiva, ténue (≤0,55) |

Regras: **line-height 1** em todo o texto de uma linha (posiciona-se por top/left e os bboxes medidos copiam-se diretamente); 1,3–1,5 em parágrafos; **todo o texto grande leva gradiente** (`background-clip: text`, `color: transparent`): vertical para palavras-herói centradas, horizontal para wordmark e títulos (o beam ilumina um lado), radial só no wordmark da intro. O tracking é **fixo por papel** — não varia dentro de uma peça.

### 2.4 Logo — a estrela de 4 pontas

Geometria (`templates/neutral-flow/remotion/components/StarIcon.tsx`): 4 pontas nos eixos de uma caixa 100×100 ligadas por curvas quadráticas cujo ponto de controlo está a `50·waist` do centro na diagonal.

```ts
export const starPath = (waist = 0) => { const c = 50, w = 50 * waist;
  return `M ${c} 0 Q ${c+w} ${c-w} 100 ${c} Q ${c+w} ${c+w} ${c} 100 Q ${c-w} ${c+w} 0 ${c} Q ${c-w} ${c-w} ${c} 0 Z`; };
```

- `waist 0` = lados a 35 % do raio da ponta — **é o ícone do logo tal como implementado** (todas as instâncias: 140 intro, 124 outro, 56 esfera da órbita, 44 chat, 40 título, 26 botão, 20 sidebar, 18 sparkles, 16 Ask AI). `[medido]` o comentário do componente diz que o sparkle original está mais perto de 21 % (waist −0,2) — discrepância em aberto (§10). Valores positivos engordam (janela magenta 0,16 → 0,11 → 0,05 → 0 → −0,03 em f515 → 0 em f527), negativos afinam.
- **Proporções do lockup** `[medido]`: altura da estrela = 1,19 × cap height (0,87 em) — 125 px medidos (V3 desenha 140); gap estrela→texto 0,41 em (59 px a 144 px); centro da estrela y 546 vs bbox do texto 489–602 (centro 545,5) — alinhados (impl. `marginTop −8` no texto). `Wordmark.tsx` (ícone 0,98 em, gap 0,42 em, gradiente vertical, −0,005 em) é componente de look-dev — a receita canónica é a inline de §2.2.
- **Posições:** intro — lockup centrado em (960,548), estrela (527,546), texto x 648–1454; outro — estrela em **(585,500)** `[medido]`, raio de ponta ~60 (V3 desenha-a em (572,497) a 124 px), wordmark começa em x 683.
- **Cor:** estrela com gradiente vertical claro→azul-claro; no outro começa branca com glow branco-azul e arrefece para `#dfe9f7` (brightness 1→0,91).
- **Versão orgânica** (`StarMask.tsx` `organicStarPath(waist=-0.06, tip=0.5)`, caixa 0..1) para janelas/máscaras: mesma construção, `w = waist` direto.

---

## 3. Luz — a pilha de camadas

A luz é o que faz o estilo. Não há uma "cor de fundo": há um chão quase preto e uma pilha de camadas baratas que o iluminam. Calibra-se por números (§3.9), não a olho.

### 3.1 Ordem canónica (de baixo para cima)

| # | Camada | Componente do kit | O que faz |
|---|---|---|---|
| 01 | Gradiente base | `AbsoluteFill` com `linear-gradient` vertical | chão navy-preto (§2.2) |
| 02 | Grelha | `Grid` | linhas de 2 px a 0,05 com fade radial — só na intro (pitch a escalar com a câmara) e no outro (205); no chat não é `Grid`: são 6 linhas absolutas de 1 px `rgba(200,220,255,0.10)` (`GridLines`) que aparecem com o card |
| 03 | Beam | `Beam` | cone volumétrico do topo, 3 camadas (halo/core/hot) |
| 04 | Névoa de teto | `Glow` radial **sem** filtro | alarga a luz do topo (o perfil medido do terço superior é ~2× mais largo do que um feixe só) |
| 05 | Tinta ambiente | `AbsoluteFill` `rgba(24,52,110,0.16)` | levanta o chão de luminância nos cantos (REF 8–13 lum) |
| 06 | God rays | `Rays` | 4 feixes finos a oscilar dentro do beam |
| 07 | Partículas de campo | `Particles` | 200–260 pontos, twinkle lento |
| 08 | Horizonte | `Horizon` + `Glow` + `Particles` numa faixa acima do rim | planeta: bloom, disco, rim, banda violeta, 90–140 partículas densas |
| 09 | Glows de emissor | `Glow` | luz que "sai" do herói: atrás do dashboard, do card de resposta, do wordmark gigante, dentro do cilindro de cards |
| 10 | **Conteúdo** | UI, cards, texto | cada vidro traz o seu glow da cor do elemento |
| 11 | Vinheta | `Vignette` | 0,5–0,85 |
| 12 | Grão | `Grain` | overlay 0,03, seed por frame |

Grão é sempre a última, vinheta a penúltima. A ordem da tabela é a da intro; no kit, New Updates desenha o glow central e o violeta abaixo das partículas e Cards desenha os blobs de canto abaixo do beam — sem efeito visível, mas ao copiar seguir a tabela. `Rays` e `Particles` recebem o **frame global** (f + início da Sequence) para o sway e o twinkle não recomeçarem nos cortes.

### 3.2 Beam (cone volumétrico)

Três `<Layer>`: cada uma é um wrapper com `filter: blur` + `opacity` e, **dentro**, um filho com `clip-path: polygon(trapézio)` e `linear-gradient` vertical. O blur tem de estar no pai e o clip no filho (senão o clip re-endurece as arestas); o polígono começa a `−2·blur` px para o blur não mostrar a aresta de cima.

| Camada | topo | base | gradiente | opacidade | blur |
|---|---|---|---|---|---|
| halo (edge) | `topWidth·1,6` | `bottomWidth` | `edge 0% → edge·cc @ bottomFade·45% → transparente @ bottomFade·100%` | 0,5·intensity | blur·1,8 |
| core | `topWidth` | `bottomWidth·0,55` | `core 0% → core·cc @ bottomFade·40% → transp. @ bottomFade·95%` | 0,55·intensity | blur |
| hot | `topWidth·0,4` | `bottomWidth·0,2` | `#cfeaff 0% → core 25% → core·88 55% → transp. @ bottomFade·85%` | 0,55·intensity | blur·0,7 |

Defaults: x 960, topWidth 180, bottomWidth 1300, core `#4fb4ff`, edge `#1550a8`, blur 45, bottomFade 0,9.

| Cena | x | topWidth | bottomWidth | intensity | core / edge | blur | bottomFade |
|---|---|---|---|---|---|---|---|
| Intro/dashboard | 985 | 300 | 1250 | `beam·0,95` | `#2a8ee0` / `#0f4a9a` | 50 | 0,95 até f39, 0,7 a partir de f40 (troca seca) |
| New Updates | 960 | 360 | 1400 | 0,9 | `#2c81c2` / `#0b2a55` | 60 | 0,6 |
| Chat | 1000 | 440 | 1500 | 0,62 | `#1f74b8` / `#0a2a55` | 70 | 0,62 |
| Cards | 960 | 380 | 1300 | `0,45 + 0,15·bright` | `#1f6fb8` / `#0b2a55` | 70 | 0,62 |
| Outro | 960 | 320 | 1400 | `beam·1,1` (0,55→1) | `#2f8fe0` / `#123f80` | 70 | 1 |

`[medido]` intro: o beam acende em 12–13 f com sine-out (centro lum 3,7→109, topo 6,5→102, lado 3,6→38; cantos ficam a 6,6); largura visível 260–300 px a y=300; coluna x=960 em f20: y100 `#1d79c2` · y300 `#1581ca` · y500 `#0b6ac1` · y700 `#2850d4` · y800 `#6a86e9` (tinta violeta junto ao horizonte). Apaga quando o título chega ao topo: topo 102 (f30) → 21 (f36). Outro: pico a y=200 60 (f521) → 119 (f590), largura a meia altura 520–600 px.

### 3.3 God rays (`Rays`)

`count` feixes pendurados do topo, determinísticos por seed: base `(h1−0,5)·520` px (±260), largura `40 + h2·110`, opacidade `0,25 + h3·0,55`, fase `h4·2π`, período `90 + h5·80` frames; deslocamento `ox = base + sway·sin(frame/per·2π + ph)`; topo em `x+ox`, base em `x + ox·spread`, largura da base `w·3,2`; gradiente `color 0% → color·99 35% → transparente`. **Blur só na bounding box do feixe** (`±2·blur`) — ~10× mais barato do que desfocar o ecrã inteiro. Defaults: count 4, spread 1,7, height 900, blur 26, sway 18, cor `#3f9be6`. `hash(seed) = frac(sin(seed·127,1 + 311,7)·43758,5453)` é o pseudo-aleatório de todo o kit.

| Cena | x | intensity | cor | seed | height | outros |
|---|---|---|---|---|---|---|
| Intro | 985 | `0,55·bgIn·(f<116 ? 1 : 0,7)` | `#3f9be6` | 2 | 900 | |
| New Updates | 960 | 0,35 | `#3f9be6` | 3 | 900 | frame f+212 |
| Chat | 1000 | 0,45 | `#3a90dd` | 5 | 800 | |
| Cards | 960 | `0,3 + 0,2·bright` | `#3f9be6` | 7 | 820 | |
| Outro | 960 | `0,3·beam` | `#3a90dd` | 9 | 1000 | spread 1,4, blur 30 |

### 3.4 Névoa de teto, tinta ambiente, glows de emissor

`Glow` = elipse `2rx × 2ry` com `radial-gradient(ellipse at center, cor 0%, transparent 70%)` — o raio de luz efetivo é 0,7·rx; opacidade default 0,8; blur opcional (névoas largas usam blur 0 porque já são suaves).

| Cena | Glows (x, y, rx, ry = meios-eixos → elipse 2rx × 2ry; cor, opacidade, blur) |
|---|---|
| Intro | névoa (975,120) 900×620 `rgba(30,111,191,0.55)` op `haze = 0,5·smooth(28→60)·(f<116 ? 1 : 1→1,3 em 116→140)` blur 0 · tinta ambiente `rgba(24,52,110,0.16)` op `0,5·bgIn + 0,5·smooth(30→60)` · glow do horizonte (960, rim+60) 900×230 `rgba(55,120,255,0.85)` op `horizonInt·(1→0,3 em 30→56)` blur 12 · **emissor do dashboard** (960, topo+120·sc) `980·max(sc,0,6) × 420·max(sc,0,6)` `rgba(50,135,250,0.7)` op `softExpOut(4,0.08)(29→60)` blur 24 · push-back (f≥120): ambiente (960,560) 1150×330 `rgba(40,100,220,0.4)` op smooth(126→150); chão (960,1000) 760×220 `rgba(30,90,200,0.45)` op smooth(130→160); bloom do wordmark gigante (960,140) 1100×260 `rgba(70,150,255,0.7)` op `softExpOut(4,0.1)(122→142)·(1−0,3·linear(150→210))` blur 16; rim luminoso do dashboard por box-shadow triplo `0 0 0 2px rgba(150,215,255,0.55), 0 0 40px 6px rgba(80,170,255,0.45), 0 0 120px 30px rgba(40,120,240,0.35)` op smooth(120→140) |
| New Updates | névoa (960,140) 900×600 `rgba(30,111,191,0.5)` op 0,55 blur 0 · central atrás do anel (964,534) 620×520 `rgba(40,95,210,0.5)` op 0,9 blur 30 · violeta top-right (1480,220) 560×360 `rgba(120,80,220,0.5)` op 0,85 blur 16 |
| Chat | só o bloom do card de resposta (965,700) 620×330 `rgba(45,115,235,0.5)` op `cardOp·exitOp` blur 12 — sem névoa nem tinta: os cantos ficam pretos (é a cena mais escura, 16,2 lum) |
| Cards | névoa **só nos cantos de cima**: (110,180) 560×320 `rgba(28,78,170,0.45)` e (1830,150) 600×340 `rgba(34,90,190,0.5)`, op `0,4 + 0,35·bright`, blur 16 · ambiente (960,520) 700×500 `rgba(40,120,220,0.12+0.3·bright)` blur 30 · topo do anel (960,400) 380×130 `rgba(150,225,255,0.7)` op `0,25 + 0,6·bright` blur 30 · chão (960,1010) 760×220 `rgba(22,62,140,0.28)` op `0,5 + 0,4·bright` blur 12 · **interior do cilindro** (sanduíche entre cards traseiros e dianteiros, §4.10) |
| Outro | bloom concentrado ao centro: (960, rim+30) 440×280 `rgba(60,130,255,1)` blur 14 · (960, rim−30) 300×140 `rgba(170,215,255,0.8)` blur 12 · banda violeta (960, rim−70) 760×80 `rgba(95,70,210,0.5)` blur 12 — todos op `bgIn` |

Emissores por `box-shadow`: pill `inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(0,0,0,0.25), 0 0 40px rgba(50,130,240,0.25)`; card de resposta `inset 0 1.5px 0 rgba(120,210,255,0.9), inset 0 0 0 1px rgba(160,200,255,0.18), 0 0 60px rgba(40,110,220,0.25)`; esferas `0 0 glow tint·99, 0 0 glow·2,4 tint·44` (glow 18–40, default 24).

### 3.5 Horizonte (planeta)

Três camadas: (1) **bloom atmosférico** — círculo de raio `R = r + glowRadius` com `radial-gradient(circle, transparent (r−10), glow·dd (r+4), glow·99 (r+0,3·glowRadius), violet·55 (r+0,6·glowRadius), transparent)` e `blur(22px)`; (2) **disco** — `radial-gradient(circle at 50% 30%, disc, #091a45 40%, #050f2c 75%, #03081c 100%)` + `inset 0 rimWidth·2 glowRadius·0,5 rgba(90,150,255,0.55·innerGlow), inset 0 0 glowRadius·0,9 rgba(60,120,255,0.35·innerGlow)`; (3) **rim** — `border rimWidth solid rim` + `0 0 rimWidth·5 rimWidth·1,5 rim·bb, 0 0 rimWidth·18 rimWidth·4 glow·99`, `blur(1px)`. `[medido]`: a luminância sobe ~150 px acima do rim e cai para escuro em 40 px abaixo.

- **Intro:** cx 955, `cy = spline(HORIZON_RIM) + r`, r 620→600 (smooth f24–57); acende em duas fases (`0,7·expOut(3,1)` em 13 f, depois 0,7→1 em 13→24), apaga no push-back (108→126); glowRadius 340→120 e innerGlow 0,9→0,25 em tween suave f36→56 (na V1 trocavam a seco em f45 — pop). Medido: r≈620 centro (955,1373) topo y≈754 em f24; topo 401 (f36) → 340 (f90); glow acima do rim 18 → 71 → 123 lum (f24) com exp k≈3,1 + rampa lenta.
- **Outro:** planeta quase plano: R 3800, `cy = spline(OUTRO_RIM) + 3800`, rim 5 px `#cde8ff`, glow `#2f78d8`, glowRadius 200, innerGlow 0,9, intensidade `bgIn = softExpOut(3,0.08)(515→560)`. Medido: rim entra por baixo (y 1077 em f518) e ainda sobe em f600 (942); brilho do rim 47→215 (f533); glow acima 11→72 e ainda a subir; centro-fundo ≈110 lum vs laterais ≈22.

### 3.6 Partículas

`Particles` = SVG com `count` círculos por hash (x, y, raio, fase, alfa 0,35–1); `tw = 1 − twinkle·0,5·(1 + sin(frame/período·2π + fase))`; drift opcional com wrap.

| Cena | count | seed | área | tamanho | cor | opacidade | twinkle / período |
|---|---|---|---|---|---|---|---|
| Intro | 260 (+90 no horizonte) | 3 (7) | y 250–1080 (rim−120…rim+40) | 0,8–2,2 (1–2,6) | `#6aa0ea` (`#dbeeff`) | 0,75·bgIn (0,9·horizonInt) | 0,6/60 (0,7/45) |
| New Updates | 220 | 11 | todo | 0,8–2,2 | `#cfe6ff` | 0,7 | 0,6 |
| Chat | 260 | 21 | todo | 0,7–2 | `#cfe6ff` | 0,55 | 0,6 |
| Cards | 240 | 31 | todo | 0,7–2 | `#d6ebff` | 0,6 | 0,6 |
| Outro | 200 (+140 no horizonte) | 41 (43) | y 250–1080 (rim−260…rim−10) | 0,7–2 (1–2,8) | `#6aa0ea` (`#e6f3ff`) | 0,7·bgIn (0,95·bgIn) | 0,6 (0,7/40) |

`[medido]`: Ø≈1,8 px, cor `#5384c0`–`#64a0ee`, densidade 3× maior junto ao horizonte (linhas 900–1079 vs 360–539), brilho baixo (p50 12,6 / p90 35). Sparkles de emissor (esfera AI): 22 círculos de 1–2,6 px em anel elíptico (raio 70–200, y·0,8), twinkle `0,4 + 0,6·|sin(f/9 + i)|`, opacidade ligada à esfera.

### 3.7 Grelha, vinheta, grão

- **Grid:** dois `linear-gradient` repetidos, `backgroundSize = pitch`, offset para centrar uma célula no ponto de fuga, `mask-image: radial-gradient(ellipse at 50% 55%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)`. Intro: pitch `232,5·cam` até f36 e depois linear → 190 em f211, centrado em (960,548); outro: 205, centrado em (960,500). `[medido]` pitch 232,5 (f0) → 215 (f20), 2 px, +6 lum, mais visível onde o chão é mais claro; ausente nas cenas 5–7.
- **Vignette:** `radial-gradient(ellipse at 50% 45%, transparent 45%, #000 115%)`, opacidade = força: intro 0,55 → 0,85 no push-back (104→136), New Updates 0,7, chat 0,6, cards 0,65, outro 0,5. `[medido]`: laterais a meia altura 2,7 lum, cantos de cima 8,8 (mais claros por causa do beam).
- **Grain:** `feTurbulence fractalNoise baseFrequency 0,9 numOctaves 2 seed = frame % 97` + `feColorMatrix saturate 0`, `mix-blend-mode: overlay`, opacidade **0,03** (0,045 lia como tremor). `[medido]` ≈4 % overlay, só visível no claro.

### 3.8 A luz é um ator (envelopes por cena)

| Momento | Envelope |
|---|---|
| Acender do fundo (intro) | `bgIn = sineOut(f/12)`; horizonte `0,7·expOut(3,1)(f/13)` → 1 em 13→24 |
| Título chega ao topo | beam 1 → 0,25 em f30→37 (dá espaço ao título) |
| Push-back | beam 0,25 → 0,7 em 116→140; névoa ×1,3; vinheta 0,55→0,85; 3 glows novos; luminância global medida 59 (f105) → 46 (f124) → 56 (f145) |
| Dashboard como emissor | `dashGlow = softExpOut(4,0.08)(29→60)`, segue o card e escala com ele |
| New Updates | disco enche `expOut(3)` em 52 f (lum 19→127); saída ×0,5 em 5 f |
| Chat | card acende `softExpOut(3,0.1)` 58→71 local; bloom segue `cardOp·exitOp` |
| Cards | `bright = linear(local 58→92)` (f453→487) sobe beam, rays, blobs de canto, luz interior do cilindro e glow do topo — a cena clareia à medida que a câmara olha para dentro (medido 30 → 43 lum) |
| Estrela | luz interior `innerLight = (0,3·smooth(90→98) + 0,5·smooth(100→108) + 0,2·coreLight)·(1−white)`; fundo apaga 110→121 local, cards 110→120; bloom branco decai 138→150 |
| Outro | `bgIn = softExpOut(3,0.08)(515→560)`; beam 0,55→1 em 505→560; rim e glow ainda a subir em f600 (creep) |

### 3.9 Calibração por grelha de luminância

**Nunca "parecido a olho".** A V2 estava 20 % mais escura no push-back (35,7 vs 44,7 lum), tinha os cantos do chat várias vezes mais claros do que o original (2–5 lum medidos nas folhas) e o horizonte do outro plano — só a comparação por célula mostra onde falta ou sobra luz.

Método (`templates/neutral-flow/tools/light_cmp2.py`): luminância Rec.709 `0,2126R + 0,7152G + 0,0722B` em float; para cada frame-chave, média global, p90/p99, RGB médio, **grelha 3×6** (3 linhas × 6 colunas), **perfil de 12 colunas do terço superior** (largura e posição do beam/névoa) e **perfil de 9 linhas** (gradiente vertical/horizonte), REF vs render. Regra `[inferido]`: **>10 lum de diferença numa célula = um elemento de luz a corrigir** (x/largura/intensidade do beam, névoa, blob de canto, bloom de um elemento, cor base). Aceitação: **média a ±3 lum da referência nos stills de verificação** (V3: f20/f320/f360/f442/f461/f506/f512); nas médias de cena completa a V3 ficou fora de ±3 no dashboard (+6,6), estrela (+5,9) e outro (−3,1) — aceite, diferenças listadas em §10.

Alvos do original (média 0–255 a 480×270): logo (f0–28) **37,9** · dashboard (29–105) **51,3** · push-back (106–211) **44,7** · New Updates (212–273) **42,5** · chat-in (274–332) **16,2** · chat-resp (333–394) **27,5** · cards (395–483) **23,9** · estrela (484–527) **45,7** · outro (528–600) **50,6**. Pontos de referência (das folhas de grelha): centro do beam em f12–20 ≈102–109 lum; cantos do chat 2–5; laterais do outro ≈22 e centro-fundo ≈110. V3 final: 37,9 · 57,9 · 46,1 · 44,6 · 18,5 · 28,5 · 25,2 · 51,6 · 47,5.

### 3.10 Custo e determinismo

- Render sempre com `Config.setChromiumOpenGlRenderer("swangle")` (GL por software): com `angle` o Chrome perdia camadas em frames isolados (esfera + arco a desaparecer em f239, diferente de render para render).
- **Sem `backdrop-filter`** (vidro por gradientes + inset shadows) e **sem `filter: drop-shadow`** em SVG animado (glow dos arcos = 2.º traço largo `rgba(130,195,255,0.35)` com `width+8` por baixo). Exceção tolerada: o `StarIcon` do outro usa `drop-shadow` com glow a variar — sem flicker registado.
- `filter: blur()` em swangle custa ∝ área × raio: **nunca desfocar divs de ecrã inteiro por camada**. 5 feixes full-frame blur(34) + névoa blur 110–198 px = >28 s num frame = `delayRender … not cleared after 28000ms`. Blur só na bounding box (Rays), névoas como radial-gradient sem filtro, Glows grandes **novos** com blur ≤16 px (os herdados da V2 ficaram a 24 — dashboard — e 30 — New Updates central, cards ambiente e topo do anel — dentro do orçamento de 6–8 s/still), Beam blur 45–70. Render longo com `--timeout=120000`.
- `will-change: transform` nos contentores com texto escalado (dashboard, periféricos; `backfaceVisibility: hidden` só no dashboard) — sem isto o texto re-rasteriza a cada frame e treme.
- `<mask>` SVG inline com filtro **não renderiza** no Chrome headless: usar `mask-image` CSS com o SVG (path + `feGaussianBlur`) em data-URI, `maskSize 1920px 1080px`, `no-repeat`.

---

## 4. Movimento

### 4.1 Primitivas (`templates/neutral-flow/remotion/lib/motion.ts`)

```ts
export const expOut = (k: number): Curve => { const norm = 1 - Math.exp(-k); return (x) => (1 - Math.exp(-k * clamp01(x))) / norm; };
/** exp-out com soft start C¹: softness = fração da duração (0,06–0,12 ≈ 2–3 frames) */
export const softExpOut = (k: number, softness = 0.08): Curve => { const e = expOut(k);
  return (x) => { const xx = clamp01(x); const u = Math.min(1, xx / softness); const s = u * u * (3 - 2 * u); return e(xx) * s; }; };
/** spline monótona Fritsch–Carlson (C¹, sem overshoot em dados monótonos) por tabela [[frame, valor], …] */
export const spline = (frame: number, keys: Array<[number, number]>): number => { /* tangentes m[i] = (d[i−1]+d[i])/2, 0 em mudança de sinal; limitador s = a²+b² > 9 → t = 3/√s; Hermite h00 h10 h01 h11 */ };
/** ease a partir de amostras de progresso igualmente espaçadas no tempo */
export const easeFromSamples = (samples: number[]): Curve => { const keys = samples.map((v, i) => [i / (samples.length - 1), v] as [number, number]); return (x) => spline(x, keys); }; // em lib/measured.ts
export const smooth: Curve = (x) => { const t = clamp01(x); return t * t * (3 - 2 * t); };          // opacidades, crossfades, settles pequenos
export const smoother: Curve = (x) => { const t = clamp01(x); return t * t * t * (t * (t * 6 - 15) + 10); };
export const cubicIn: Curve = (x) => clamp01(x) ** 3;                                                 // saídas
export const backOut = (s = 1.70158): Curve => (x) => { const t = clamp01(x) - 1; return 1 + (s + 1) * t ** 3 + s * t ** 2; };
export const tween = (frame, start, end, from, to, curve = expOut(6.3)) => from + (to - from) * curve(clamp((frame - start) / (end - start)));
export const progress = (frame, start, end, curve = expOut(6.3)) => tween(frame, start, end, 0, 1, curve);
```

| Situação | Curva |
|---|---|
| Elemento **entra** (pop, slide, fade+slide) | `softExpOut(k, 0,06–0,12)` com k da tabela 4.2 |
| **Câmara** ou qualquer posição medida por frame | `spline(frame, TABELA)` sobre a tabela suavizada |
| Grupo **já visível** desloca-se | `easeFromSamples(amostras medidas)` — in-out, pico ao 4.º frame |
| Opacidade, crossfade, troca suave de parâmetro | `smooth` |
| **Saída** para fora do frame / para o corte | `cubicIn` (ou `quadIn` na queda do wordmark) |
| Overshoot (raro) | `backOut(2,2)` — só a pill "Chat" |
| Typewriter, wipes de texto longos, creep | `linear` |
| Nunca | `Easing.out(cubic)`, keyframes lineares em câmara, `sineInOut` encadeado, `expOut` cru sem soft start |

Constantes do exp-out: a curva é normalizada à janela, logo **meia-vida = janela·ln2/k** — k 6,3 numa janela de 28 f (dashboard) dá 3,1 f. Os valores "meia-vida 8 f (0,267 s), 90 % em 0,89 s, `value += (target − value)·0,083` por frame" são o ajuste original do tutorial (janela ≈69 f); k 3,2 → 0,086 s numa janela de ≈12 f (UI reativa). Contra 69 frames medidos, RMSE `cubic-out` 0,1247 vs `1−e^(−6,3x)` 0,0108 — o cubic erra 20 pontos no primeiro terço (aos 9 % do tempo o real está a 44 %, o cubic a 24 %), e é isso que lê como amador.

### 4.2 k por elemento `[medido]`

| Elemento | k | janela | como se mediu |
|---|---|---|---|
| Dashboard / painel grande a subir | **6,3** | 28 f | (README V3 diz 5,6; ajuste direto à tabela dá 5,2–6,3 conforme o frame inicial; V3 usa `spline(DASH_TOP)`) deltas do topo 106,84,62,47,36,30,24,21,17,15,13,11,10,8,7,6,6,5,4,3,3,2,2,2,2,1,1 → razão 0,80/f, meia-vida 3,1 f; entra 21 % maior (1876 → 1551 px) e encolhe com a mesma curva |
| Anel "New Updates" a fechar | **≈4** | 18 f | raio 548 → 296, razão ≈0,80/f, meia-vida ≈3,1–3,3 f (mesma forma do dashboard; o spec dizia k≈8 — refutado pelos próprios raios: em 10 f resta 12,5 % do percurso); V3 usa `spline(RING_R)/296` |
| Cards a subir (trio) | **8–10** | 28 f (settle real 24 f) | deltas 68,37,26,17,13,10,7,5,4,2,2,1 → razão 0,6/f, meia-vida 1,4 f; V3 `softExpOut(8, 0.06)` |
| Pill a alargar | **4** | 14–16 f | 655 → 928 px a partir do centro |
| Estrela do logo a entrar | **4** | 10 f | cx 452 → 501 + fade + scale 0,45→1 |
| Títulos, botões, linhas de UI | **4–5** | 8–17 f | H1 slide-up 29 px em 17 f; botões pop 14 f |
| Elementos ambientais lentos (cards laterais, card de resposta) | **3** | 13–34 f | |
| Palavra-herói "New" | **2,5** | 35 f | fade lento dentro do anel |
| Fill de gauge / contadores | 2,5 | 60 f | `100·(1−e^(−2,5·min(1,(f−58)/60)))` |
| UI de produto (variante rápida, medida noutro vídeo) | 3,2 | ~12 f | meia-vida 0,086 s |

### 4.3 Câmara — tabelas medidas + spline

A câmara nunca está parada. Toda a posição/escala de câmara vem de uma **tabela por frame medida no original, suavizada com Savitzky-Golay (janela 7–15)**, consumida por `spline()`. Na subida do dashboard (`DASH_TOP`) os 3 primeiros frames ficaram crus (992/886/803) para não perder o arranque; em `RING_R` a suavização cobre tudo. Tabelas completas em `templates/neutral-flow/remotion/lib/measured.ts`.

- **Zoom-out contínuo da intro:** linear `cam = 1 − 0,0055·max(0, f−4)` com origem (960,548) (grelha e texto encolhem juntos; medido: grelha 232,5→215 px em 20 f, texto 900→807 px de f4 a f20 — 0,37–0,65 %/f, V3 usa 0,55).
- **Subida do dashboard (f29→57):** `DASH_TOP` [29,1124] [30,992] [31,886] [32,803] … [57,462]; `DASH_SCALE` [29,1,3] [30,1,206] … [57,1] (escala = largura/1551).
- **Creep depois do settle (f57→104):** −0,5 px por lado por frame (largura 1551 → 1520 em f68 → 1469 em f104; `DASH_SCALE` [68,0,98] [80,0,967] [90,0,958] [104,0,9472]). Não cortar o movimento a zero — o creep é o que separa motion profissional de motion que "estaciona" (+2,7 % medidos noutro vídeo após o olho achar que parou).
- **Push-back (f104→136):** in-out assimétrico — lento até f114 (progresso 0,14), **57 % do percurso em 6 frames** (f117→123, 0,25→0,82; os 3 frames mais rápidos, f119→122, fazem 37 %), cauda exp longa até f136. Escala 1,666→0,996 na base do spec (882 px = 1; largura 1469→878), cy 979→541, topo 463→232, cx sempre 959,5. Tabela `DASH_SCALE` (base 1551 px): f117 0,8522 · 118 0,8284 · 119 0,7948 · 120 0,7539 · 121 0,711 · 122 0,6709 · 123 0,6383 · 124 0,6161 … 136 0,566. Aproximações paramétricas se não houver tabela: `cubic-bezier(0.7, 0, 0.2, 1)` centrado em f120,5, ou quadIn (f104–118, 0→0,38) + quase-linear (118–123, 0,38→0,82) + expOut k≈5 (123–136).
- **Dolly-out acelerado até ao corte (f136→211):** escala 0,996 → 0,847 com creep que **acelera** para o corte: 0,00065/f (136–166), 0,0015/f (166–186), 0,0023/f (186–201), 0,0036/f (201–206), 0,0072/f (206–211); cy 541→552 quase linear. O corte cai na velocidade máxima.
- **Horizonte partilha a curva do dashboard** (é um só movimento de câmara): `HORIZON_RIM` [0,1120] [5,1035] [12,935] [20,812] [24,752] [27,700] [30,610] [33,480] [36,401] [39,389] [42,372] [45,366] [48,359] [51,355] [54,352] [57,349] [63,349] [72,345] [81,342] [90,340] [99,340] [102,342] [105,347] [108,354] [111,371] [114,400] [118,470] [124,600] [130,760]; depois do settle creep −1 px / 2 f.
- **Raio do anel (local, 0 = f212):** `RING_R` [0,548] [1,506,7] [2,464,2] [3,426] [4,395,6] … [18,296,1] [43,270] [61,239] (tabela suavizada; crus do spec 515/460/422) — exp k≈4 até f230, creep ≈−1,0 px/f até f265, aceleração final 260→239 nos últimos 8 f (f265→273).
- **Estrela (local, 0 = f395):** tabelas de tamanho/rotação/posição em §4.11.
- **Rim do outro (global):** `OUTRO_RIM` [518,1077] [524,1072] [530,1062] [533,1038] [536,1021] [539,1008] [542,998] [545,991] [551,981] [560,973] [570,963] [580,955] [590,949] [600,942].
- **Profundidade no push-back:** pulso de DoF `dofBlur = 1,5·sin(π·(f−106)/22)` px em f106–128; periféricos com blur 6 px, opacidade `0,5·softExpOut(3)(126→146)·(1−0,35·linear(150→211))` e paralaxe `scale((max(0,3, sc)/0,537)^1,3)` com origem (960,545); wordmark gigante atrás (262 px, blur 5, `softExpOut(4,0.1)(122→142)·0,85`, escala 1→0,93 em f134–211).

### 4.4 Deslocações de grupo (in-out medido, não exp-out)

Grupos já visíveis (avatar + etiqueta + pill) não saltam: sobem com uma forma medida — ease-in curto, **pico de velocidade ao 4.º frame**, cauda longa — e depois continuam a subir devagar (creep).

```ts
CHAT_MOVE_1 = easeFromSamples([0, 0.031, 0.105, 0.228, 0.38, 0.53, 0.657, 0.752, 0.818, 0.873, 0.917, 0.95, 0.972, 0.989, 1]);      // f296→310, −144 px
CHAT_MOVE_2 = easeFromSamples([0, 0.03, 0.069, 0.116, 0.181, 0.284, 0.433, 0.582, 0.691, 0.754, 0.804, 0.847, 0.879, 0.904, 0.927, 0.947, 0.959, 0.97, 0.98, 0.99, 1]); // f328→348, −77 px
SPHERE_RISE = easeFromSamples([0, 0.07, 0.165, 0.34, 0.53, 0.70, 0.86, 0.94, 0.98, 0.995, 1]);   // f330→340, esfera AI −111 px
groupY = 539 − 144·m1 + creep1 − 77·m2 + creep2;  creep1 = −0,6 px/f entre as subidas, creep2 = −0,4 px/f depois
```

### 4.5 Receitas de entrada por elemento `[implementado sobre medição]`

| Elemento | Propriedades em paralelo (janela em frames) |
|---|---|
| Estrela do logo (intro) | translateX −55→0 `softExpOut(4,0.12)` f1–10 · scale 0,45→1 · opacity `min(1, 1,4·p)` |
| Texto do wordmark (intro) | opacity **quad-in** `((f−1)/9)²` f1–10 (único fade ease-in do vídeo) · blur 8→0 px f1–5 |
| Esfera do título | scale 0→1 `softExpOut(5,0.1)` f33–46 (medido 0,07→1 em 12 f) · y 188→110 `sineOut` f33–60 (deltas 5,5,5,5,5,5,5,4,4,3,3,3,2,2,2,1) |
| H1 "Smart Control" | opacity `smooth` f37–44 (7 f) · translateY 29→0 `softExpOut(4,0.1)` f37–54 |
| H2 "Customized Dashboard" | opacity `smooth` f35–46 · translateY 18→0 f40–50 · **wipe esq→dir** `clip-path inset(0 (1−p)·100% 0 0)` 0,6→1 `softExpOut(3,0.08)` f38–64 (medido x1 1086→1130→1160→1173→1183) |
| Linhas de luz | crescem para fora do centro 120→590 / 110→510 px `softExpOut(3,0.08)` f42–75 · y 138→119 f42–60 · opacity f42–47 |
| Nav do dashboard | `softExpOut(4,0.1)` de 7 f com **1,2 f** entre itens (f33+1,2i) |
| Saudação / linhas de cabeçalho | translateY 14→0 + opacity `softExpOut(4,0.1)` 8–9 f (f34–42, f38–47) |
| Botões (Ask AI, Management, New project) | scale 0,85→1 + opacity `softExpOut(5,0.1)` 14 f com 2 f de stagger (f49+2i) |
| Painéis internos | translateY 24→0 + opacity `softExpOut(4,0.1)` 12–14 f |
| Gauge | `100·(1−e^(−2,5·t))` com t em 60 f a partir de f58; arco preenche e número conta juntos |
| New task (card lateral) | translateY 80→0 + opacity `softExpOut(3,0.06)` f50–84, `rotateY(−8deg)` |
| Calendar (pill) | translateX −30→0 + opacity `softExpOut(3,0.06)` f42–70 |
| Chat (pill) | opacity `smooth` f43–50 · translateY 40→0 **`backOut(2,2)`** f43–68 (medido cy 941→899 em f44–56, volta a 926 em f68) · flash de brilho gaussiano `0,35·e^(−((f−50)/4)²)` em box-shadow |
| Anel New Updates | scale = `spline(RING_R)/296` · disco `expOut(3)` 52 f · "New" `softExpOut(2,5, 0,06)` local 1–36 · "Updates" `softExpOut(3, 0,08)` 8–30 · arcos `softExpOut(4, 0,1)` 4–16 · esferas fade 6 f `smooth` + scale 0,85→1 `softExpOut(4,0.12)` 10 f, entradas em local 5, 5, 7, 14, 16, 19, 40 · centro flutua `x 6·sin(f/9), y 4·sin(f/7+1)` |
| Pill de input | largura 656→928 a partir de x 964 `softExpOut(4,0.1)` local 0–14 · texto 1 char/frame (9 já escritos no corte) · cursor fixo até local 22, depois pisca com meio-período 16 f |
| Avatar / etiquetas do chat | opacity local 9–16 / 11–18 (avatar), 34–42 ("AI Agent") |
| Dots "a pensar" | aparecem 2 f entre si (local 22/24/26), scale 0,6→1, pulsam **em conjunto** (não em onda): `0,45 + 0,55·max(0, sin(2π(f−26+1,2i)/18))` — período 18 f (0,6 s), ~12 f claro / ~6 f escuro; apagam local 58→61 |
| Esfera AI | fade+scale 0,6→1 `softExpOut(4,0.12)` local 26–34 em x≈1500 · drift −35 px x (36→56) e −37 px y (44→56) `smooth` · **sobe** 111 px `SPHERE_RISE` local 56–66 quando a resposta chega · desliza −25 px `softExpOut(3,0.06)` 66–100 · cresce ×1,18 `softExpOut(4,0.1)` 62–76 · **estrela roda 3,3°/frame** desde local 56 · desenhada **por cima** do card |
| Card de resposta | opacity `softExpOut(3,0.1)` local 58–71 · scale 0,97→1 e y +24→0 `softExpOut(4,0.1)` 58–74 · linhas de grelha `smooth` 59–67 |
| Bullets | cada linha wipe esq→dir `clip-path inset(−4px (1−p)·100% −8px 0)` 12 f `smooth`, 9 f entre linhas; grupos começam local 63 / 81 / 83 (medido ~25 px/frame) |
| Trio de cards | translateY 192 / 279 / 340 px `softExpOut(8,0.06)` 28 f, delays 0 / 2 / 3 f · scale 0,93→1 · medalhão `softExpOut(5,0.1)` local 2–16 · texto 0,55·linear 20→36 (o card lê-se antes do conteúdo) |
| Wordmark do outro | **blur-in** 32→0 px `smooth` f528–535 · opacidade em 3 degraus `0,5·smooth(528→531) + 0,35·smooth(530→535) + 0,15·smooth(535→552)` · slide-up 12 px `softExpOut(4,0.1)` f530–546 · brilho +14 % linear f550–600 |
| Tagline do outro | `[medido]` palavra a palavra com janelas sobrepostas: "Discover" f532→544, "NeuraFlow" f536→568, "today" f556→596 · `[impl.]` cópia base ténue `(0,35 + 0,25·linear(530→580))·smooth(528→532)` + cópia clara com máscara de brilho esq→dir a **22 px/frame** (feather 140 px) desde f527 |

Regra de família: **esferas e medalhões entram por scale** (0,45–0,85→1); **cards e pills entram por translate**; **texto desliza ≤30 px**; nada escala desde 0 exceto a esfera do título.

### 4.6 Saídas

Todas aceleram (ease-in) e são apanhadas a meio pelo corte ou pela ocultação; a opacidade só cai parcialmente.

| Saída | Receita |
|---|---|
| Wordmark da intro | queda `135·d²` px com `d = (f−24)/10` **sem clamp** — continua a acelerar até ser tapado pelo card (f33–34); nunca faz fade |
| Grupo do título | `smooth` f108–117: opacity → 0, translateY −34 px, scale 0,94 |
| Cards laterais | `cubicIn` f113–127: translateX ±480 px, scale ×1,25 |
| Dashboard flutuante | creep de dolly-out que acelera ×11 até ao corte f212 (§4.3) |
| Anel New Updates | raio acelera 260→239 nos últimos 6 f + opacidade ×0,5 nos últimos 5 f |
| Chat inteiro | `cubicIn` local 112–121 (f386→395, termina no frame do corte): translateY −300 px, opacity → 0,55 |
| Esfera AI | `cubicIn` local 108–118: −98 px y, −6 px x, opacidade ×(1−0,7·smooth(114→120)) |
| Cards/anel sob a estrela | ficam por baixo da janela; fundo e cards apagam `smooth` 110→121 local |
| Outro | **não há fade visual**: só a música faz fade (§7) |

### 4.7 Transição de estado — painel A → painel B (f148→190)

Não é crossfade. Na batida f150,75: o painel antigo faz **fade-out rápido** (`1 − smooth(148→153)`, ~5 f); os cards novos entram por **fade-in + slide-up 36 px**, `softExpOut(4,0.12)` em 16 f, em **stagger de 4–5 f**: Documents 155, Analytics 159, Costs 164, checklist 170+4i (slide 30 px), botão-esfera 176; o highlight da sidebar **desliza** da linha antiga para a nova (`smooth` 150→158); o conteúdo interior enche depois de o card pousar (barra 158→174, barras mensais 163+2i→190+2i com k 4, gráfico de área linear 164→196).

### 4.8 Stagger

Irmãos usam **a mesma curva** e só o início muda: 1,2 f entre itens de nav; 2 f entre botões, dots, barras de gráfico; 0/2/3 f entre os 3 cards; 4 f entre linhas de checklist; 4–5 f entre cards de painel; 9 f entre linhas de texto; esferas em órbita em pares a 0–3 f (local 5/5, 14/16/19) com saltos de 7 e 21 f. Em listas de UI de produto (medido noutro vídeo) não há stagger de opacidade — a lista inteira faz zoom-out 1,19× + slide-up em simultâneo.

### 4.9 Texto — os 6 modos de entrada

| # | Modo | Onde | Valores |
|---|---|---|---|
| 1 | Fade **quad-in** + blur-in leve | logo herói (intro) | f1–10, blur 8→0 em f1–5 |
| 2 | Slide-up + fade | títulos, cabeçalhos | H1 29 px/17 f k4; cabeçalho de UI 14 px/8 f k4; painel 24 px |
| 3 | **Wipe esq→dir** (clip-path) | subtítulo, linhas de corpo | H2 0,6→1 em 26 f k3; bullets 12 f `smooth` por linha, 9 f de stagger, ≈25 px/frame |
| 4 | **Typewriter linear** com cursor | input do utilizador | 1 char/frame (33 ms), texto já começado no corte (9 chars), cursor `|` fixo enquanto escreve e a piscar depois (meio-período 16 f); nunca com easing |
| 5 | **Blur-in** 32→0 px + slide 12 px | logo do outro | f528–535, brilho continua a subir 50 f |
| 6 | Base ténue + **wipe de brilho** | tagline | base 0,35→0,6; wipe 22 px/frame com feather 140 px (ou palavra a palavra com janelas sobrepostas) |

Corpo e etiquetas chegam tarde e ténues (≤0,55–0,6 de opacidade); o herói lê-se antes do detalhe.

### 4.10 Anel 3D de cards (carrossel)

- **Geometria:** `[medido]` ≈8 cards a 45° num cilindro de r≈330, card ≈330 px de largura, raio dos cantos ~24; `[impl. V3]` 6 cards curvos (6 fatias de 65 px dobradas com `translateZ(−R) rotateY(δ) translateZ(R)`) de 390×455 r26 em r 400, ângulos [0, 60, 120, 180, −120, −60], `perspective 1500`, `perspectiveOrigin 50% 45%`. Regra da perspetiva: fixa-se pela razão de tamanho traseiro/dianteiro `(P−R)/(P+R)` (55–58 % ⇒ perspetiva ≈ 3,5–3,75×R; V3 1500 = 3,75×400); perspetiva fraca dá um "abajur" plano.
- **Fase plana (trio):** centro em x 0 / z 40 / escala 1,47; laterais em x ±265 / z −240 / `rotateY ∓16°` (medido ±18°) / escala 1,14 / opacidade 0,4 e `dim` 0,6 no gradiente, sem blur `[impl.]` (medido no original: 60 % + blur 2 px).
- **Fan-out (f426→442, local 31→47):** `fan = smooth`; cada card interpola da pose plana para a pose do anel: `translate3d(x·(1−t), y·(1−t), z·(1−t)) rotateY(rot·(1−t) + ang·t) translateZ(R·t) scale(sc·(1−t) + t)`; os cards traseiros só aparecem quando o tilt abre o interior (`backIn = 0,12 + 0,88·smooth(60→82)`). Medido: L.left 406→524, R.right 1518→1417 em f427–440.
- **Rotação:** não é um ângulo por keyframes — é a **integral de uma tabela de velocidade angular medida** nos medalhões (°/frame, local): `OMEGA = [[36,0],[41,0.3],[45,0.6],[51,1.1],[59,2.3],[63,4.5],[67,6],[75,5.4],[85,3.4],[91,1.5],[95,0.9],[100,0.6],[154,0.35]]`; `SPIN[i] = SPIN[i−1] + spline(i−0,5, OMEGA)`; ≈165° no total; pico 6°/f logo depois do downbeat f456; sinal negado para `rotateY`. (Uma velocidade constante de 1,6°/f dava 64° e lia falso.)
- **Tilt da câmara:** `tilt = spline([[44,3],[58,6],[66,10],[74,18],[84,30],[93,38],[105,45],[130,50]])` aplicado como `rotateX(−tilt)` (negativo = câmara **por cima**); medido aparente 10°→~40° em f486 (V3 vai a 50°, ligeiramente mais aberto do que o original).
- **Luz por face:** `facing = cos(ang + spin)`; teto `lit = 0,15 + 0,85·max(0, facing)²·(0,45 + 0,55·bright)`; banho ciano interior `inner = t·max(0, −facing)·(0,25 + 0,75·bright)·(0,35 + 0,65·sin tilt)`; na fase plana centro 0,55 / laterais 0,3. Na face: faixa de teto de 100 px `rgba(175,230,255, 0,25+0,55·lit) → rgba(110,185,255, 0,18·lit) 45% → transparente`, radial atrás do medalhão, wash ciano `radial at 50% 15%`.
- **Luz dentro do cilindro (sanduíche):** um `Glow` `(0, −40−90·sin tilt)` 330 × `(120+170·sin tilt)` `rgba(140,225,255, 0,3+0,55·bright)` blur 14 desenhado **entre** o grupo dos cards traseiros (`facing < 0`) e o dos dianteiros — dois contextos `perspective` iguais com o Glow num div 2D (só `scale(ringS)`) no meio — determinístico, sem depender da ordenação 3D do Chrome.
- **Medido no original:** luminância global 30 (f455) → 43 (f486); topo dos cards `#bfe6ff`; face dianteira mais clara, traseira escura.

### 4.11 Janela-estrela (máscara que vira logo)

Tabelas em frames locais (0 = f395), `starSize = 2 × raio da ponta`:

```
starSize [86,2200] [91,2300] [96,2600] [102,2150] [108,1550] [110,1250] [113,1050] [118,820] [123,698] [125,638] [127,570] [129,476] [130,418] [131,360] [132,312] [133,260] [135,210] [138,170] [141,142] [145,124]
starRot  [89,−30] [105,−20] [118,0] [123,7] [127,37] [132,100] [136,152] [141,170] [148,180]
starX    [86,1250] [89,1120] [91,1050] [93,1030] [95,1000] [102,900] [110,915] [123,880] [127,827] [130,742] [132,682] [136,610] [145,572]
starY    [86,−150] [89,200] [91,313] [93,450] [95,545] [102,537] [110,520] [123,534] [127,522] [132,510] [145,497]
waist    [86,0.16] [100,0.11] [106,0.05] [112,0] [120,−0.03] [132,0]
```

`[medido]`: entra pelo canto superior direito (f486 centróide (1050,313)), **cobre o frame f490–496** (área máx. 1,79 M px em f491) com o anel visível por dentro, encolhe f497→527 (1,2 M → 23 k px) com in-out (acelera até f526, desacelera depois — ≈ `quartInOut` sobre f497–540), raio de ponta 349 (f518) · 319 · 285 · 238 · 180 · 156 (f527) · ~130 · 105 · 91 · 79 · 71 · **62 (~f540)**; roda ~+10°/f em f518–527 (7°→100°), 101°→152° em f528–536, vertical ~f545 (+180° total); centróide (900,537) → (680,510) → final (585,500); magenta até ~f507, branco-azul em f508–512.

Fases `[impl.]`: corpo entra quase invisível (violeta escuro) e **acende** até magenta (`bodyL = linear` local 91→106, rampa de cor §2.2); a **janela** (anel visto só através da estrela) faz crossfade em 98→104; a luz lavanda-branca entra pela esquerda (`coreLight` 105→116); a estrela fica **branca** em 112→119 (f507→514, ≈3 f antes do downbeat f517); o rim magenta demora a apagar (121→133); fundo apaga 110→121 e cards 110→120; o anel (escala base 0,9) encolhe ×1→0,68 em 91→113 e **segue o centro da estrela** (`ringFollow` 91→108); bloom branco decai 138→150. Máscaras CSS com blur 18 (janela), 8 (corpo), 40 (luz interior).

### 4.12 Regras herdadas do SaaS Animation (medidas noutros vídeos, confirmadas aqui)

Cada entrada anima **≥3 propriedades** em paralelo com fins desencontrados (ex.: escala 0,33 s + wipe 0,30 s + desenho do ícone 0,25 s + glow 0,45 s); **overshoot <2 %**, sem bounce (spring quase crítico: damping 200, mass 0,6); **state-change em 3 tempos** com pay-off de ~0,2 s (pulso de escala + glow a expandir + um detalhe novo); **creep residual** de +2,7 % depois de "parar"; variante **UI de produto** 3× mais rápida (k 3,2); typewriter linear 33 ms/char com cursor que fica 0,2 s; listas com zoom-out 1,19× + slide-up sem stagger de opacidade.

### 4.13 Métricas de movimento

- **Jerk** (`templates/neutral-flow/tools/smoothness.py`): energia de movimento por frame = média de |frame − anterior| em cinzentos a 480×270; jerk = |Δenergia| entre frames consecutivos; assinala-se `>2,5` fora dos cortes. Resultados (601 f): REF **0,466** · V1 (keyframes lineares) 0,752 · V2 0,521 · V2.1 0,42 · **V3 0,391**; picos >2,5 fora dos cortes V1 29 → V2 5.
- **Flicker** (`templates/neutral-flow/tools/flicker_lum.py`): média de |L[i] − (L[i−1]+L[i+1])/2| a 480×270, excluindo ±1 frame dos cortes; frame suspeito se render > REF + 2,5 (camada perdida). REF 1,73 · V2 1,28 · **V3 1,21**.
- Aceitação: jerk médio ≤ REF, ≤~5 picos fora dos cortes, 0 frames com flicker > REF + 2,5 fora dos cortes (a V3 ficou com 1 — f390, saída do chat — aceite).

---

## 5. Elementos — catálogo, materiais e quantidades

### 5.1 Regra de material (vale para tudo o que é vidro)

`gradiente vertical azul→navy` + `highlight 1–2 px no topo` (`inset 0 1px 0 rgba(255,255,255,α)`) + `ring 1 px` (`inset 0 0 0 1px rgba(…,0.08–0.18)`) + `glow da cor do elemento`. Sem `backdrop-filter`.

| Superfície | α do highlight | ring | gradiente |
|---|---|---|---|
| Cards interiores do painel | 0,10 | 0,08 (chips) | 180deg |
| Painel do dashboard | 0,25 + linha `#93dbf5` 1,5 px | 1,5 px `rgba(150,200,255,0.35)` | 180deg |
| Cards / pills laterais flutuantes | 0,45–0,55 | 0,14–0,2 | 160deg |
| Pill de input | 0,55 (+ `inset 0 −1px 0 rgba(0,0,0,0.25)`) | — | 90deg |
| Card de resposta | `rgba(120,210,255,0.9)` 1,5 px | 0,18 | 155deg + sheen no canto sup-dir |
| Cards do anel 3D | `rgba(205,236,255,0.9)` 2 px | 0,14 | 180deg (4 stops) + luz de teto por face |
| Esfera de vidro | rim 2 px `rgba(225,242,255,0.95)` | — | radial deslocado (38 % 30 %) |

### 5.2 Catálogo

| Elemento | Geometria `[medido]` / `[impl.]` | Material / notas |
|---|---|---|
| **Wordmark (lockup)** | intro: centro (960,548), estrela 125 px `[medido]` / 140 `[impl.]` em (527,546), texto 648–1454 (807 px), gap 59; outro: estrela r≈60 em (585,500) `[medido]` / 124 px em (572,497) `[impl.]`, texto 683–1395 | §2.3/§2.4; texto com gradiente, estrela com gradiente vertical + glow |
| **Wordmark gigante desfocado** | 262 px, centro (960,135), y 60–210, x 240–1690 | blur 5 px, op ≤0,85, gradiente horizontal de azuis; escala 1→0,93 |
| **Esfera de vidro** (`GlassSphere`) | título Ø85–88 em (943,110); chat Ø88 ×1,18 → ~104 `[impl.]` (medido Ø108); órbita Ø165–180 `[impl.]` (spec mede Ø95–110 no disco visível, com ícone 40); botão do painel 64 | radial claro deslocado, highlight interior branco `inset 0 0 size·0,14`, sombra azul em baixo `inset 0 −size·0,08 size·0,18`, rim 2 px, 2 glows exteriores na cor tint (24–40 px); ícone branco dentro (estrela 40/44/26/56, ícones 60) |
| **Linhas de luz** | 2 px, y 119 · `[medido]` esq 607–817 → 552, dir 1093–1289 → 1338 · `[impl.]` esq cresce 120→590 px para a esquerda a partir de x 830, dir 110→510 a partir de x 1090; mini-estrelas 18 px em x 845/1065 | `linear-gradient(90deg, transparent, rgba(200,230,255,0.75) 60%, rgba(235,248,255,1))` + `0 0 10px rgba(160,210,255,0.9)` |
| **Dashboard (shell)** | 1551×1102, r 34, sidebar 307; settled x 184–1735, topo 462 (f57); entra a 1876 px; s04 largura 878 (escala 0,566) | §2.2; banda de luz radial 1300×330 em (300,60); glow topo-centro; rim luminoso a partir de f120 |
| Sidebar | logo estrela 20 + texto 28/500 em (41,52); conta 250×58 r14; nav 250×46 r12 (centros y 247, 295, 338, 384, 430, 476, 580, 623); "PREFERENCE" 11/600 em (52,534); toggle 44×24 | `rgba(38,42,108,0.92)`→`rgba(30,32,88,0.92)`; ativo `rgba(255,255,255,0.10)` |
| Cabeçalho | search 528×50 em (316,42); 3 botões-ícone 48×48 (x 1335/1402/1470); saudação 48/600 em (326,158); sub 47/600 em (326,228); Ask AI 107×46 em (1025,239), Management 155×46, New project 168×46 | pills `rgba(255,255,255,0.09–0.12)`; Ask AI cheio `#a9e2f2` |
| Vista A | Welcome 741×760 r24 em (330,342) com sub-card de evento 323×200 r18; Processes 330×300 (donut r42 stroke 18: 2 arcos desenhados 59 % + 20 %, legenda 59/20/5/14 %); Tasks 391×300 (4 linhas 335×42); Task completion 352×760 (gauge r116 stroke 14, 240°, gradiente `#2a5ec9`→`#8ec4ff`; número 42/600) | vidro sobre vidro 0,55→0,7 |
| Vista B | Documents 381×377 em (325,353) (tile 80 r18, barra 325×8 a 45 %, "974 Files", "0.9GB"); Analytics 735×377 em (726,353) (8 pares de barras 7 px r4 a cada 78 px, 5 linhas tracejadas a 61 px, eixo 50K–10K); Costs 507×284 em (325,755) (área + linha 1,5 px, grelha a 40 px); checklist 7 chips 48 px r12 em 2 colunas (x 860/1160) × 4 linhas (y 759/836/913/990); esfera-botão 64 em (1404,966) | idem |
| **New task** (card lateral) | 318×270 r22 em (1517,595), `rotateY(−8deg)`; título 23 px; 2 chips 122×32 / 100×32; "98 %" 22 px; rodapé 15 px | vidro lavanda 160deg (§2.2), highlight 0,45 |
| **Calendar / Chat** (pills) | 65 px r16; Calendar 195 px em (160,800); Chat 144 px em (118,888); ícone 26 numa coluna de 60, divisor 1×40, label 26 | `linear-gradient(160deg, rgba(150,190,255,0.55), rgba(90,130,230,0.45))`, highlight 0,55 |
| **Periféricos (cena 4)** | 2 DocsCards 270×305; 2 NewTaskCards 330 (95 % / 88 %); Processes 405×230 (donut r48 stroke 22, 4 segmentos); 2 notificações (avatar 46, nome 24, "8m ago"/"14m ago" 18); 7 chips 55 px r12; Analytics 470×220 (7 pares de barras 5 px); área 470×160; espectro de 220 barras (70 px, op ≤0,35) na base | `rgba(30,45,110,0.55)`→`rgba(12,20,60,0.6)` r22, highlight 0,10; grupo com blur 6 px, op 0,5, paralaxe |
| **Anel New Updates** | base r 296 (grupo escalado por `r(f)/296`), centro (964,534) ±10 px; disco + banda de rim 22 px (blur 9) + rim fino 5 px | rim `rgba(215,238,255,0.95)` + `0 0 30px 10px rgba(110,180,255,0.7), 0 0 90px 30px rgba(60,130,240,0.45), inset 0 0 40px 10px rgba(120,190,255,0.45)`; `[medido]` FWHM 25–30 px, pico ~140 lum (`#8fc3ff`), glow até +45 px |
| "New" / "Updates" | 169 px/700 a −108 do centro; 86 px/600 a +92; escalam com o anel (N 118→103 px de f230→264) | gradientes verticais §2.2 |
| **Arcos orbitais** | 5 arcos a r×1,5 / 2,0 / 2,0 / 2,7 / 2,7 (medido 1,45× / 1,9× / 2,6× ≈ 430/560/770 px), comprimentos 140° / 170° / 80° / 150° / 100°, traço 3–3,5 px | `#a9d6ff` sobre traço largo `rgba(130,195,255,0.35)` +8 px. Sentido `[medido]` (0° = direita, anti-horário no ecrã): interior **anti-horário** +4°/f a desacelerar, exteriores **horários** −1,1°/f. `[impl. V3]` `rotate(−60 + f·3·e^(−f/30))` e `rotate(130 − 1,05f)` / `rotate(95 − 0,8f)` — em SVG (y para baixo) `rotate()` positivo é horário, logo os sinais da V3 estão **trocados** face ao medido (e o interior inverte em local 30). Ao reutilizar: interior `rotate(60 − f·3·e^(−f/30))`, exteriores `rotate(−130 + 1,05f)` |
| **Esferas em órbita** | 7, com ícones (edit, bars, star, doc+, folder, plus, clock); `[medido]` duas famílias: órbita exterior horária −1,1°/f com r a encolher 14 px/f (espiral para dentro), interior anti-horária +1,3…+4°/f; `[impl.]` interpolação linear entre duas posições medidas (local 28 e 53), ex.: Edit (615,321)→(615,414), Bars (1590,186)→(1575,519), Star (1380,771)→(1365,684) | `GlassSphere` glow 34, tint `#5aa0ff` |
| **Pill de input** | 114 px r40, centro (951–964, 539), 656→928 px; texto a x 562 | gradiente horizontal de 10 stops §2.2 |
| Avatar do chat | Ø100, centro (428,353) em f320, ícone pessoa 56 | `radial-gradient(circle at 50% 40%, #3e5886, #25406f 60%, #1a2d55)` + ring 2 px `rgba(120,170,230,0.85)` + glow 24 |
| Dots | 3 × Ø26, x 1322/1358/1394, y 643, gap 10 | `#9fc4f5`, glow `12·pulse` px |
| Esfera AI | Ø108 em (1493,646) f320 → (1445,496) settled `[impl.]` (medido (1437,488)) | `GlassSphere` 88 glow 30 tint `#6aa8ff` + estrela 44 a rodar 3,3°/f + 22 sparkles |
| **Card de resposta** | 870×400 r30 em (530,455); bullets a x 601 (glifo) / 623 (texto), linhas y 538/572/607, 675/709, 779 | 155deg + sheen; linhas de grelha 1 px `rgba(200,220,255,0.10)` em y 268/370/455/855 e x 528/1400 |
| **Cards do anel 3D** | `[medido]` centro 491→530 px de largura, topo 251, fundo 837; laterais ~330; r ~24; `[impl.]` 390×455 r26; medalhão Ø90 (medido 110) com ring 1,5 px e anéis finos r 75/105 (medido 90/120), ícone 34; texto 16,5 / 12,5 / 11,5 px; botão ↗ 30 px; blocos de UI falsos (4 barras 6 px + retângulo 72×120) | §2.2 + luz por face (§4.10) |
| **Estrela-janela** | §4.11 | corpo por máscara CSS com gradiente vertical, bloom exterior `rgb(205,95,225)` (feGaussianBlur 0,014 em unidades 0..1), rim `rgb(225,120,235)` 0,018 + `rgb(232,140,240)` 0,012, núcleo branco radial `#ffffff → #f2f9ff 50% → #d6ebff` |
| **Ícones** | SVG viewBox 24, stroke 1,8 (bars 2,6, checks 2,2), round caps; 25 ícones (home, bars, bell, chat, calendar, pie, gear, help, search, arrow↗, chevron, check-circle, check-square, clock, clip, edit, doc, doc+, folder, user, plus, play, more, check, arrow↘); tamanhos 12–14 (chips), 18–22 (UI), 26 (pills), 34 (cards 3D), 40 (tile), 56 (avatar), 60 (esferas) | cor = cor do texto da linha; recortes `#1f2660` |
| **Avatares** | 42 (sidebar), 32 (guests, sobrepostos −10 px), 46 (notificações) | procedurais (§2.2), não fotos — decisão de projeto; o original usa fotos |

### 5.3 Quantidade de elementos por cena

| Cena | Elementos em cena (máximo simultâneo) |
|---|---|
| 1 Logo | 1 lockup · 260 + 90 partículas · grelha |
| 2 Reveal | 1 esfera · 2 linhas de luz · 2 mini-estrelas · 2 títulos · dashboard (8 nav + 1 search + 3 ícones + 3 botões + 4 cards + gauge + donut + 4 tarefas + 4 avatares: 1 de 42 + 3 de 32) · 1 New task · 2 pills |
| 3–4 Push-back / flutuante | dashboard vista B (3 cards + 7 chips + 1 esfera-botão + 16 barras + 1 área) · 1 wordmark gigante · 16 periféricos (2 docs + 2 tasks + 1 processes + 2 notificações + 7 chips + 1 analytics + 1 área) · 220 barras de espectro |
| 5 New Updates | 1 anel · 2 palavras · 5 arcos · 7 esferas · 220 partículas · 3 glows (+ beam + rays) |
| 6–7 Chat | 1 pill · 1 avatar · 2 etiquetas · 3 dots · 1 esfera + 22 sparkles · 1 card com 3 bullets (6 linhas) · 6 linhas de grelha · 260 partículas |
| 8 Cards | 3 → 6 (medido ≈8) cards, cada um com medalhão + 2 anéis + botão (+2 chips no 1.º) · 240 partículas · 2 blobs de canto + 3 glows |
| 9 Estrela | 1 estrela (corpo + bloom + 2 rims + núcleo) + o anel por dentro |
| 10 Outro | 1 estrela 124 · 1 wordmark · 1 tagline (2 cópias) · 200 + 140 partículas · 1 horizonte · 3 glows (+ beam + rays) · grelha 205 |

Regra: **um herói**; 1–3 satélites de segundo plano; 200–260 partículas de campo (+90–140 junto a um horizonte); 4 rays; 2–5 glows. Mais do que isto e o herói perde.

### 5.4 Coordenadas-chave `[medido]`

Lockup (960,548) · esfera do título (943,110) · H1 711–1197 × 193–244 · H2 662–1183 × 265–324 · linhas de luz y 119 · dashboard x 184–1735 topo 462 (f57), s04 cx 959,5 topo 232–276 · New task 1517–1835 × 595–865 · Calendar 160–355 × 800–865 · Chat 118–262 × 888–953 · anel (964,534) · pill (951,539) → 395 → 318 · avatar (428,353) · dots y 643 · esfera AI (1493,646) → (1437,488) · card de resposta 530–1400 × 455–855 · trio de cards x 695–1225 topo 251 · estrela final (585,500) · wordmark do outro 683–1395 × 455–548 · tagline 637–1283 × 610–652.

---

## 6. Gramática de cena e tempo

### 6.1 A grelha de compassos é a espinha dorsal

```ts
const BPM = 118, FPS = 30;
const BEAT = 60 / BPM * FPS;   // 15,25 frames
const BAR = BEAT * 4;          // 61,02 frames = 2,034 s
const DOWNBEATS = [28.7, 89.75, 150.75, 211.75, 272.9, 333.75, 394.9, 455.9, 516.9, 577.9]; // medidos (kick periódico 120–400 Hz)
```

Cada downbeat carrega **exatamente um evento grande**; entre downbeats só há settle, creep e preenchimento secundário: 28,7 → dashboard começa a subir (f29) · 89,75 → horizonte no pico (f90); gauge já a encher desde f58 `[impl.]` (medido: arco começa ~f84) · 150,75 → painel A→B (f148–153) · 211,75 → **corte** New Updates (f212) · 272,9 → **corte** chat (f274) · 333,75 → card de resposta (f332–345) · 394,9 → **corte** cards (f395) · 455,9 → tilt/spin do anel acelera (f456) · 516,9 → estrela fica branca = logo (f508–514) · 577,9 → hold (só "today" ainda a clarear). O primeiro beat (f13,5) não tem evento — o compasso de pickup antes de 28,7 é do logo.

**Cortes duros:** só três (f212, f274, f395), sem crossfade nem fade a preto, sempre num downbeat, com o hit de SFX **1 frame antes** do corte.

### 6.2 Timeline mestra (Remotion)

```tsx
<AbsoluteFill style={{ backgroundColor: "#03060f" }}>
  <Sequence from={0}   durationInFrames={212}><SceneIntroDashboard /></Sequence>   {/* cenas 1–4: UMA câmara contínua */}
  <Sequence from={212} durationInFrames={62}><SceneNewUpdates /></Sequence>
  <Sequence from={274} durationInFrames={121}><SceneChat /></Sequence>
  <Sequence from={505} durationInFrames={96}><SceneOutro /></Sequence>               {/* declarado ANTES = fica por baixo */}
  <Sequence from={395} durationInFrames={155}><SceneCardsStar /></Sequence>          {/* por cima; apaga o próprio fundo 505→516 */}
  <SoundDesign mode={audio} />
</AbsoluteFill>
```

O outro começa em f505 por baixo da cena de cards; esta apaga o seu fundo/vinheta/grão (`bgOp` local 110→121) e o outro aparece através da estrela branca; o ícone passa a ser desenhado pelo outro em f545, no mesmo sítio e tamanho (sem troca visível).

### 6.3 Comprimento das cenas em compassos `[inferido]`

1 compasso para "reveal + hold" (New Updates = 62 f exatos); 1,5 compassos quando há build (subir + settle + push); 2 compassos para cenas de dois estados (input → resposta; cards → estrela). Depois de o herói pousar, a cena segura ≈ meio compasso (~30 f) de preenchimento antes do próximo evento; nos últimos ~6 f antes de um corte só entra a aceleração de saída.

### 6.4 Os 10 arquétipos de cena

| # | Arquétipo | Frames (compassos) | Beats | Saída |
|---|---|---|---|---|
| 1 | **Logo em palco** | 0–34 (pickup 0,57) | 0–12 fundo acende (sine-out); 1–10 lockup entra (estrela pela esquerda k4, texto quad-in + blur); zoom-out contínuo desde f4; 15–24 glow do horizonte sobe | f24+ queda quadrática sem clamp, tapado pelo dashboard f33–34 |
| 2 | **Reveal de painel** | 24–114 (1,5) | 29 painel sobe k6,3 (entra 21 % maior); 30–37 beam apaga; 33–75 cascata do título (esfera f33 → H2 f35 → H1 f37 → linhas f42 → botões f49/51/53), passos de 2–7 f; 42–84 cards laterais; 57 settle + creep −0,5 px/lado/f; 58–118 gauge; 90 horizonte no pico | 108–127 título sobe+fade, laterais voam ±480 px cubic-in |
| 3 | **Push-back** | 104–136 (0,5) | in-out assimétrico (57 % em 3 f), DoF 1,5 px, vinheta 0,55→0,85, beam reacende, wordmark gigante e periféricos aparecem atrás | contínuo → cena 4 |
| 4 | **Painel flutuante + mudança de estado** | 126–212 (1,4) | 148–153 A faz fade-out; 155–210 B entra em stagger (cards 155/159/164, chips 170+4i até 194→210, esfera 176; fade+slide 36 px, 16 f cada); creep de dolly-out acelerado até ao corte | corte duro f212 na velocidade máxima |
| 5 | **Orbital / hero-word** | 212–274 (1,0) | 212–230 anel fecha k8; 213–248 "New" acende; 220–230 "Updates"; 216–225 arcos desenham-se; 217–252 esferas entram e orbitam; disco enche 52 f | 266–273 raio acelera + opacidade ×0,5; corte |
| 6 | **Input (typewriter)** | 274–342 (1,0) | pill cresce 14 f enquanto escreve 1 char/f (9 já escritos); 290–302 avatar+etiqueta `[medido]` (impl. 283–292); 296–310 subida 1 (in-out medido); 296–304 dots em cascata `[impl.]` (medido 309–316, a pulsar em conjunto) + 308–316 "AI Agent"; 300–308 esfera entra | contínuo → 7 |
| 7 | **Resposta (card + streaming)** | 330–395 (1,0) | 328–348 subida 2; 330–340 esfera sobe (SPHERE_RISE) e roda; 332–345 card; 333 linhas de grelha; 337–379 bullets em wipe linha a linha | 386–394 tudo sobe −300 px cubic-in com fade parcial; corte |
| 8 | **Carrossel 3D** | 395–490 (1,5) | 395–419 trio sobe k8–10 (0/2/3 f); 397–411 medalhões; 426–442 fan-out para o cilindro; 436–490 spin com ω medido (pico 6°/f em f462) e tilt 3°→50° com a câmara a olhar de cima; `bright` 453→487 | fica por baixo da estrela |
| 9 | **Janela-máscara → ícone** | 484–545 (1,0; a estrela em si 484–534 = 0,8) | 484 riser; 486 estrela entra pelo canto; 490–496 cobre o frame; 493–499 janela; 500–511 interior branqueia pela esquerda; 507–514 fica branca (downbeat 517); 505–516 fundo/cards apagam; encolhe e roda +180° até r 62 em (572,497) `[impl.]` (medido (585,500), r≈60) por f540–545 | vira o ícone do logo do outro |
| 10 | **Outro** | 520–600 (1,3) | 515–560 beam e horizonte sobem; 528–535 wordmark blur-in; 528–596 tagline; 545+ pan 0,32 px/f; estrela arrefece de branco para azul-branco 548–585; rim e glow ainda a subir em f600 | **sem fade visual** — só a música apaga (535→600) |

### 6.5 Passagens entre cenas (4 mecanismos)

1. **Câmara contínua** (cenas 1→4): push-back com DoF + vinheta; nada corta.
2. **Corte duro no downbeat** (212, 274, 395): a cena anterior sai a acelerar; o hit soa 1 frame antes.
3. **Janela-máscara** (486→545): uma forma cresce até cobrir o frame mostrando a cena antiga por dentro, depois encolhe até virar o herói novo.
4. **Só áudio** (535→600): a imagem fica; a música apaga.

Ocultação em vez de fade (§1.10); cada cena tem o seu beam (x, largura, intensidade) — a luz muda com a cena, e o beam apaga quando o herói chega ao topo e reacende no push-back.

### 6.6 Receita para um vídeo novo neste estilo

1. Medir o BPM da música (ou escolher um) → `BAR` em frames → lista de downbeats. Contar quantos eventos grandes o guião tem: **um por compasso**.
2. Atribuir a cada evento um arquétipo de §6.4 e o comprimento em compassos (1 / 1,5 / 2). Reservar um compasso de pickup para o logo e ≥1,3 compassos para o outro.
3. Por cena: montar a pilha de luz (§3.1) com os valores da cena mais parecida; colocar o herói em x 960; até 3 satélites; texto pelos 6 modos.
4. Entradas exp-out com o k do elemento e soft start; câmara por spline sobre uma tabela (medida ou desenhada com o mesmo perfil: exp de entrada + creep + aceleração para o corte); grupos por in-out; saídas cubic-in 8–16 f com fade parcial.
5. SFX: hit 1 f antes de cada corte, whoosh no início dos movimentos grandes (3 f antes do downbeat), pop/blip em cada elemento que aparece, click por caractere, riser 33 f antes do clímax, pad no tilt (§7.4).
6. Render por sequência → métricas (§8.3) contra a versão anterior ou contra uma referência; folhas de comparação; só depois "pronto".

---

## 7. Som

### 7.1 Música `[medido]`

118,0 BPM (IBI mediano 0,5067 s, desvio 6,7 ms, fase 0,45 s) → compasso 2,034 s = 61,02 frames; **Sol menor** (Krumhansl 0,897), secção final 16,4–20 s modula (Ré menor / Si♭ menor); parciais sustentados E1 41 Hz (sub), D#2, A#2, D#3, G3, A#3. Loudness −9,72 LUFS integrado, LRA 0,94 LU, TP +0,06 dBTP, crest 13,4 dB (muito limitado); momentary −16 (0,2 s) → −8,4 (1,2 s) → ≈−9/−10 até ao fim.

**Fade-out** (medido frame a frame): plateau −12,5 dB até f535; relativo ao plateau: f545 −2,7 dB · f555 −3,1 · f565 −7,8 · f575 −12,4 · f585 −16,1 · f595 −28,0 · f600 silêncio. Implementado como quadrática em dB (mais lenta no início, mais rápida no fim do que o medido):

```ts
const db = (x: number) => Math.pow(10, x / 20);
export const musicVolume = (f: number) => (f < 535 ? 1 : f >= 600 ? 0 : db(-0.011 * (f - 535) ** 2)); // −1,1 dB @545 · −9,9 @565 · −27,5 @585 · −39,6 @595
```
Alternativa mais fiel à cauda: ajuste coseno em amplitude (RMSE 3,0 dB) — parâmetros em `_ref/work/audio-music/fadeout.json`.

### 7.2 Arquitetura

- Um `SoundDesign` como último filho da composição, com `mode: "original" | "recreated" | "mute"` (três composições com `defaultProps` diferentes).
- Cada SFX é `<Sequence from={frame} name="sfx file @frame"><Audio src volume={db(gain)·(frame > 520 ? musicVolume(frame) : 1)} /></Sequence>` — ganho em dB por cue sobre o nível já cozido no ficheiro; cues depois de f520 seguem o fade da música (avaliado no frame de início).
- Bed: `volume={(f) => 0.9 · musicVolume(f)}`. Sem ducking da música sob os SFX (decisão em aberto: −3 dB durante 6 f à volta de cada hit quando houver bed limpo).

### 7.3 Taxonomia (14 ficheiros, gerados por `templates/neutral-flow/sfx/sfx_synth.py` a partir de `audio-sfx-plan.json`, 48 kHz, seed 7)

| Ficheiro | Tipo | Síntese | Nível cozido |
|---|---|---|---|
| `impact_intro` | impacto | sub 44 Hz com fase `2π·44·t·e^(−2t)` (pitch a cair até 0 em 0,5 s), decay 0,35 s, mistura sub 0,9 + rajada de ruído 0,5 (80 ms, 150–7000 Hz); reverb 0,6/0,3 | −4 dB |
| `hit_cut` | impacto | sub 50 Hz, decay 0,22, ruído 50 ms 300–9000 Hz; reverb 0,45/0,25 | −6 |
| `thump_low` | impacto | sub 60 Hz, decay 0,15, ruído 20 ms 200–2500 Hz; seco | −12 |
| `whoosh_rise` | whoosh | ruído rosa com varrimento de banda 250→3200 Hz (q 0,8), attack 0,45 s, decay 0,35, pan −0,2→0,2; reverb 0,4/0,2 | −9 |
| `whoosh_short` | whoosh | 400→4000 Hz, attack 0,18, decay 0,28, pan −0,5→0,5 | −12 |
| `riser_star` | riser | tom `sin(φ)·0,6 + sin(2φ)·0,2` 120→1800 Hz + ruído varrido (mix 0,6), attack **1,1 s**, decay 0,3; reverb 0,6/0,3 | −10 |
| `sparkle` | sparkle | 9 parciais aleatórios 3–9 kHz, decay 0,28, spread 0,22; reverb 0,4/0,25 | −15 |
| `sparkle_soft` | sparkle | 6 parciais 2,5–7 kHz, decay 0,22, spread 0,18; reverb 0,3/0,2 | −19 |
| `pop_ui` | blip | 900 Hz com harmónicos [1, 2×0,5, 3,01×0,2], attack 3 ms, decay 70 ms | −16 |
| `blip_hi` | blip | 1500 Hz [1, 2×0,35], decay 50 ms | −18 |
| `click_type` | click | 12 ms de ruído 2–9 kHz, decay exp | −20 |
| `shimmer_intro` | shimmer | 8 parciais sustentados 2,5–7,5 kHz com tremolo 5 Hz, attack 0,25, decay 0,6; reverb 0,5/0,3 | −16 |
| `pulse_soft` | tone | seno 660 Hz, attack 30 ms, decay 0,15, lowpass 3 kHz | −22 |
| `swell_pad` | pad | acorde G3-D4-G4-D5 (196/294/392/587 Hz) com 3 cópias desafinadas ±0,4 %, attack 1,0 s, decay 0,6, lowpass 2,5 kHz; reverb 0,7/0,35 | −18 |

Primitivas: `env(attack, decay, hold)` = rampa linear + hold + `e^(−linspace(0,6))`; `reverb` = ruído × `e^(−linspace(0,7))` normalizado a Σ|ir| = 8, FFT-convolve; varrimento de banda em 64 fatias Butterworth 2.ª ordem com 2000 amostras de contexto; ruído rosa por IIR; pan de potência constante.

### 7.4 Mapeamento evento → som (com avanço/atraso)

| Evento visual | Som | Quando | Cues no vídeo |
|---|---|---|---|
| Corte duro | `hit_cut` | **−1 frame** (o transiente já soa no 1.º frame novo; medido −5 ms) | 211 (0 dB), 273 (−6), 394 (−4); estrela→branco 507 (−2) |
| Corte grande, em camadas | + `whoosh_short` −1 f, `shimmer_intro` quando o texto acende, `sparkle` | | 211 + 213 + 216 |
| Movimento grande de câmara/elemento | `whoosh_rise` no **1.º frame do movimento** (crista 13 f depois = parte mais rápida) | 0 f do movimento (no painel isso dá −3 f do downbeat: 26 vs 28,7) | 26 (subida do painel f29), 104 (push-back), 427 (fan-out) |
| Deslocação curta de grupo / saída | `whoosh_short` | 0 f | 271 (saída do anel), 296 e 330 (subidas do chat) |
| Elemento de UI aparece (título, pill, botões, card) | `pop_ui` | 0 f | 37, 43, 49, 163, 309, 332, 395, 397, 398 |
| Linha fina / tick / arco / linha de texto | `blip_hi` | 0 f | 42, 152, 172; arcos 217, 219, 223, 226, 228, 231; linhas de bullets 337, 347, 355, 357, 363, 371 |
| Typewriter | `click_type` | 1 por caractere | 274…290 (17 cliques, −4 dB) |
| Vidro / partículas / reveal brilhante | `sparkle` (forte) / `sparkle_soft` | 0 f | sparkle 118, 216, 509; soft 33, 50, 126, 258, 300, 404, 532 |
| Logo / texto a brilhar | `shimmer_intro` | 0 f | 2, 213, 523 |
| Abertura do vídeo | `impact_intro` + `shimmer_intro` | f2 (medido onsets f2,2 e f4,0) | 2 |
| Batidas do anel | `thump_low` | no downbeat + eco 7 f depois | 455 (0), 462 (−4) |
| Tilt da câmara | `swell_pad` (attack 1,0 s) | no início da fase rápida do tilt (10°→40°, f466→486; a spline começa a 3° em f439) | 466 |
| Clímax (estrela → logo) | `riser_star` (attack 1,1 s = 33 f) | **33 f antes** do downbeat para o pico cair nele | 484 → pico f517 |
| Fim de um build sem transiente | `pulse_soft` | 0 f | 58, 556 |

Convenção: hits −1 f; pops/blips/sparkles 0 f; sons de attack longo pré-lançados pelo tamanho do attack; nenhum cue depois do evento. Dos 10 downbeats, 5 têm cue a ±1 f (151, 212, 273, 395, 456) e 7 a ±3 f (mais 29 ← whoosh 26 e 334 ← pop 332); 90, 517 (só o pico do riser) e 578 não têm cue.

### 7.5 Ganhos

- Duas fases: nível cozido no ficheiro (tabela 7.3) + offset por cue em dB (0 … −11).
- **Fadiga em cascatas:** o mesmo ficheiro repetido desce progressivamente — blips do New Updates −4, −5, −5, −6, −6, −6; blips dos bullets −8, −9, −9, −10, −10, −11; pops dos cards −2, −4, −5.
- **Curva de loudness ao longo do vídeo:** cena 1 a 0 dB, 2 a 0…−3, 3–4 a 0…−6, 5 a 0…−6, 6–7 a −2…−11, 8–9 a 0…−8 (a 0 só thump 455, pad 466, riser 484 e sparkle 509; pulse_soft 556 a −8). Hits dos cortes: 0, −6, −4, −2.
- Densidade por cena: 2 / 8 / 6 / 12 / 29 (17 são cliques) / 15 cues; há silêncios de ≥25 f (58→104, 126→152, 172→211, 231→258, 427→455) — sem cues de enchimento.

### 7.6 Limites conhecidos

Demucs não isola SFX (ficam em drums/other): um bed "só música" a partir do original é impossível; sem chave ACE-Step não houve música nova (prompt pronto: *cinematic tech, 118 BPM, G minor, 20 s, no vocals*). O volume de cada SFX é estático (sem automação dentro do cue).

---

## 8. Workflow de produção

### 8.1 Pipeline (comandos)

```bash
# 1. referência: descarregar (streams explícitos) e normalizar a CFR 30
yt-dlp -f 616 -o original.mp4 URL ; yt-dlp -f 251 -o audio_src.webm URL     # 403 → atualizar yt-dlp (brew) / outro itag
ffmpeg -i original.mp4 -i audio_src.webm -r 30 -vsync cfr -c:v libx264 -crf 12 -c:a aac ref_cfr30.mp4   # crf 12 = sugestão (não registado)
# 2. TODOS os frames à taxa nativa (NNNN = frame+1), full + half
ffmpeg -i ref_cfr30.mp4 -vsync 0 frames_full/%04d.png ; ffmpeg -i ref_cfr30.mp4 -vsync 0 -vf scale=960:-1 frames_half/%04d.jpg
ffmpeg -i ref_cfr30.mp4 -vn -ar 48000 audio.wav
# 3. visão global: contact sheets (PIL, não drawtext) e frames-chave
python templates/neutral-flow/tools/sheet.py 0 600 sheets.png --cols 8 --tile 240 --step 1
python templates/neutral-flow/tools/sheet.py 296 340 chat.png --cols 4 --tile 470 --crop 1200,380,1700,760 --src full --step 2
# 4. medir por pixel (caixa 'x0,y0,x1,y1' SEM espaços e ANTES do limiar)
python templates/neutral-flow/tools/measure.py color FRAME X Y [R]
python templates/neutral-flow/tools/measure.py bbox  FRAME x0,y0,x1,y1 THRESH
python templates/neutral-flow/tools/measure.py track F0 F1 x0,y0,x1,y1 THRESH          # por frame: count cx cy x0 y0 x1 y1 w h lum maxlum
python templates/neutral-flow/tools/measure.py fit   F0 F1 x0,y0,x1,y1 THRESH prop     # prop ∈ count|cx|cy|lum|w|h|x0|y0|x1|y1 → RMSE de 18 easings (imprime 8) + melhor k exp (1..19,9) + meia-vida + overshoot
# os scripts leem a pasta de frames de NF_FRAMES_FULL / NF_FRAMES_HALF (env) — default: o projeto NeuraFlow
python templates/neutral-flow/tools/measure.py diff  F0 F1 x0,y0,x1,y1 ; python templates/neutral-flow/tools/measure.py hist FRAME x0,y0,x1,y1
# 5. áudio: voz (whisper), stems (demucs htdemucs), RMS por frame em 6 bandas, BPM/fase por onsets periódicos, tom, LUFS, envelope de fade
# 6. specs por cena (markdown 'MEDIDO' escrito incrementalmente) → tabelas por frame suavizadas (Savitzky-Golay, janela 7–15, 3 primeiros frames crus)
# 7. Remotion: scaffold do kit (kit/remotion/scaffold — package.json com versões pinadas, tsconfig, Root/Example, Inter e SFX em public/); curvas do kit; Grid/ShadowGrid + pilha de luz
npx tsc --noEmit
npx remotion still <CompId> out/f100.png --frame=100 --browser-executable="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"
# 8. verificação: render por sequência a jpeg → folhas REF vs render → 3 métricas
npx remotion render <CompId> out/frames --sequence --image-format=jpeg --timeout=120000 --browser-executable="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --concurrency=1
python templates/neutral-flow/tools/compare.py --ref frames_half out/frames cmp.png 20 60 100 130 180 230 320 380 430 495 590
python templates/neutral-flow/tools/smoothness.py REF=frames_half V3=out/frames --range 0 600       # pastas com NNNN.png/jpg (base 1) ou element-NNN.jpeg (base 0), auto-detetadas
python templates/neutral-flow/tools/flicker_lum.py REF=frames_full V3=out/frames --n 601 --cuts 212,274,395 --scenes 0-28:logo,29-105:dashboard,106-211:push-back,212-273:new-updates,274-332:chat-in,333-394:chat-resp,395-483:cards,484-527:star,528-600:outro
python templates/neutral-flow/tools/light_cmp2.py REF=frames_full V=out/frames --frames 20,60,100,150,180,240,300,320,360,430,460,479,500,520,540,560,590
# 9. entrega: mux com áudio (ou render direto a mp4)
ffmpeg -framerate 30 -i out/frames/element-%03d.jpeg -i public/audio/original_mix.wav -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a aac -b:a 192k -shortest -movflags +faststart out/final_1080p.mp4
```

Nunca analisar animação a 1 fps ou a olho: fades e micro-movimentos duram 2–5 frames. Frames a meia resolução por defeito; full-res só em crops. Máscaras por limiar enchem-se com glow — verificar num frame e, se preciso, usar máscara por matiz (magenta: `R > G+35 & B > G+35`).

### 8.2 Protocolo de versões

Cada ronda de feedback = pasta nova copiada da anterior (`rsync -a --exclude out/ vN/ vN+1/`), comps renomeadas por versão, versão anterior intacta para A/B. Ciclo: **feedback verbal → causa medida por script → correção só nas frentes apontadas → render por sequência → métricas antes/depois + folhas → secção no `ESTADO.md` com "diferenças que ficam (honestas)"**. Render final e integração só com aprovação explícita; previews a meia resolução chegam para verificar.

### 8.3 Métricas e aceitação

| Métrica | Definição | Aceitação |
|---|---|---|
| Jerk | \|Δ energia de movimento\| por frame a 480×270 | média ≤ referência; ≤~5 picos >2,5 fora dos cortes |
| Flicker | \|L[i] − (L[i−1]+L[i+1])/2\| a 480×270, excl. ±1 f dos cortes | 0 frames com render > REF + 2,5 |
| Luminância | média por cena + grelha 3×6 + perfis 12 col / 9 lin | média a ±3 lum nos stills de verificação; célula >10 lum = corrigir uma camada `[inferido]` |
| Tracking | centróide / bbox / raio / ângulo por frame (`star_track.py`, `medal_track.py`) | trajetória e velocidade dentro do ruído de medição |

Segmentação de cenas para a luminância: logo 0–28 · dashboard 29–105 · push-back 106–211 · New Updates 212–273 · chat-in 274–332 · chat-resp 333–394 · cards 395–483 · estrela 484–527 · outro 528–600.

### 8.4 Inventário de ferramentas

Python 3.14 venv com pillow, numpy, scipy (+ fontTools); yt-dlp 2026.08 (brew), ffmpeg 8.1, whisper, demucs, node 26 / npm 11; Remotion 4.0.523 (`@remotion/cli`, `fonts`, `google-fonts`, `media`, `zod-types`), react 19.1, zod 4.5.4, typescript 5.8; Inter 4.1 woff2 local; `allowScripts: { "esbuild@0.28.1": true }`; render com um browser Chromium do sistema (Brave por regra; o NeuraFlow foi renderizado com Chrome), `--concurrency=1`, `swangle`, `--timeout=120000`. Agentes de análise: máx. 3–4 em simultâneo a ler imagens, specs escritos incrementalmente, reaproveitar `work/`.

---

## 9. Pitfalls (sintoma → causa → correção)

| Sintoma | Causa | Correção |
|---|---|---|
| "Movimentos clancky / aos saltos", sobretudo na abertura | keyframes lineares entre pontos medidos; segmentos sine-in-out encadeados; `expOut` cru (degrau de velocidade no frame 0); saídas abruptas; crossfade onde o original faz fade-out → fade-in+slide-up | spline C¹ sobre tabelas; `softExpOut` 2–3 f; `easeFromSamples` para formas medidas; saídas cubic-in; transição A→B medida (§4.7). Jerk 0,752 → 0,391 |
| "Tremer" em quase tudo e na câmara | ruído de medição nas tabelas por frame (±1 px, ±0,005 escala; 2.ª diferença com picos −11/+12 px) reproduzido pela spline; texto escalado a re-rasterizar; grão alto | Savitzky-Golay antes da spline (3 primeiros frames crus); `will-change: transform` + `backfaceVisibility: hidden`; grão 0,045 → 0,03; nunca inventar valores intermédios (um bump de 0,005 = 8 px) |
| Elementos "a piscar / a falhar" em frames isolados, diferente de render para render | composição do Chrome com `backdrop-filter` + SVG `drop-shadow` no renderer ANGLE | `swangle`; vidro por gradientes; arcos com 2.º traço largo. Flicker V1→V2 1,56 → 1,40 (todos os frames; excl. cortes REF 1,73 · V2 1,28 · V3 1,21) |
| Ícone "só anda para a esquerda, passa por baixo do card e desaparece" | drift medido só na fase 1 aplicado à cena toda (sem clamp); desenhado antes do card | trajetória por fases com `progress()` clampado; elemento desenhado depois do card no JSX, saída própria |
| Beam com arestas duras apesar do blur | `clip-path` e `filter: blur` no mesmo elemento | blur no pai, clip no filho, polígono a começar a −2·blur |
| `delayRender … not cleared after 28000ms` num frame | blur de ecrã inteiro por camada em GL por software (5 × blur 34 + névoa blur 110–198) | blur só na bounding box; névoas por radial-gradient sem filtro; Glows ≤16 px; `--timeout=120000` |
| Corpo da estrela invisível | `<mask>` SVG inline com filtro não renderiza no Chrome headless | `mask-image` CSS com SVG em data-URI |
| Elemento desaparece de repente / parâmetro salta | clamp a meio do movimento; troca seca de parâmetros num frame | deixar acelerar até estar tapado (queda sem clamp); tweens `smooth` entre parâmetros (horizonte f36→56); máscara entra quase invisível e acende |
| Pill a encolher em vez de crescer; saída do chat desligada | sinal trocado / código não ligado | medir a direção (656 → 928) e a saída (386→394 cubic-in) |
| Chrome do Remotion morto pelo macOS (`SIGKILL 137`, `Unknown system error -88`) | chrome-headless-shell sem assinatura | `--browser-executable` de um browser Chromium do sistema — **Brave** (`/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`, regra do Ahlec) ou Chrome; `--concurrency=1` (com browser completo, >1 dá `Visited localhost:3000 but got no response`) |
| Binários não correm em `/Volumes/Ex Projects` | exFAT não guarda o bit de execução | projeto em pasta APFS local |
| `npx create-video` pendura | prompt interativo em sessão não interativa | scaffold manual (package.json, tsconfig, remotion.config.ts, src/index.ts) |
| esbuild não instala | postinstall bloqueado | `"allowScripts": { "esbuild@0.28.1": true }` |
| Erro de tipos no Studio/schema | zod de major diferente do esperado por `@remotion/zod-types` | pinar zod 4.5.4 com zod-types 4.0.523 |
| `-x ** 2` não compila em TS | unary minus antes de `**` | parênteses na base |
| yt-dlp HTTP 403 | versão velha / itag | atualizar (`brew`/`pip --break-system-packages`), escolher outro itag (616 + 251) |
| ffmpeg sem `drawtext` | build sem libfreetype | etiquetas com PIL |
| 15 agentes em paralelo morrem com "session limit" sem escrever nada | leitura de imagens full-res por agente é caríssima; escrita no fim | máx. 3–4 agentes visuais; specs incrementais; meia resolução; reaproveitar scripts |
| Luminância "parecida a olho" mas errada (−20 % no push-back, cantos do chat muito mais claros) | camadas de luz a olho | grelha 3×6 por célula (§3.9) |
| Anel 3D lê como caixa/abajur | perspetiva fraca, cards sem espaço, rotação constante | perspetiva ≈3,5–3,75×R, ω integrado, tilt com sinal certo (câmara por cima), fatias curvas |

---

## 10. Decisões em aberto e diferenças conhecidas

**Canónico quando medido e implementado diferem:** k do painel 6,3 (não 5,6 do README antigo); k do anel ≈4 (o spec escreveu 8 — refutado pelos raios); movimentos de grupo in-out (não exp); anel com 8 cards a 45°/r≈330 é o medido — V3 usou 6 a 60°/r 400 com fatias curvas e foi aceite (com card de 390 px usar 6); sentido dos arcos orbitais = o medido (interior anti-horário, exteriores horários; os sinais da V3 estão trocados); tagline palavra a palavra é o medido — o wipe de brilho é a aproximação; estrela final (585,500) medida — V3 usou (572,497); estrela da intro 125 px medida — V3 usou 140; tracking do wordmark +0,065 em é o valor implementado que bate a largura medida (807 px a 144 px efetivos) — o spec estimou −0,01 em, nunca verificado por render; waist do ícone 0 (35 %) implementado vs ≈21 % (−0,2) que o comentário do componente dá como medido; zoom-out da intro 0,4–0,6 %/f; fade-out da música: tabela medida (§7.1) > fórmula; esferas em órbita: modelo polar medido (§5.2) > interpolação linear.

**Fica diferente do original (honesto):** anel f470–490 mais aberto/pequeno (tilt 50° vs ~40°, traseiros mais visíveis); braços da estrela f518–526 um pouco mais gordos; interior da estrela f492–498 magenta em baixo → azul em cima (original: magenta-lavanda uniforme com os cards brancos ao centro); cards do original são renders 3D com reflexos; god-rays do original são mais suaves; avatares são gradientes; grão mais forte no original; bed de stems ainda tem SFX; dashboard e New Updates da V3 ficaram 6,6 / 2,1 lum acima do alvo.

**Por confirmar:** Inter vs SF Pro; janela e polinómio exatos do Savitzky-Golay (7–15, ordem não registada); `smoother` nunca foi usado; Glows herdados com blur 24–30 violam a regra ≤16 px mas couberam no orçamento; `StarIcon` do outro ainda usa `drop-shadow` (SVG parado — sem flicker observado); ducking da música sob SFX; loudness alvo da camada de SFX vs bed.


---

## Ficheiros

- Código: `templates/neutral-flow/remotion/` (lib `motion.ts` `measured.ts` `theme.ts` `theme-amk.ts` `fonts.ts`; componentes Beam, Rays, Horizon, Glow, Particles, Grain, Vignette, Grid, GlassCard, GlassSphere, StarIcon, StarMask, Wordmark, Icons; `audio/SoundDesign.tsx` genérico; `remotion.config.ts`; `public-fonts/`; `scaffold/` = projeto novo pronto).
- Ferramentas de medição/verificação: `templates/neutral-flow/tools/` (measure, sheet, colors, compare, smoothness, flicker_lum, light_cmp2, star_track, medal_track — CLI genérica, pastas por argumento).
- SFX: `templates/neutral-flow/sfx/` (gerador + plano JSON + 14 wav).
- Fundo AMK: `templates/ShadowGridBackground.tsx` (camadas 01–02 da pilha de luz; props `vignette`, `shardGlow`).
- Exemplo completo de cada arquétipo de cena: `~/Desktop/TESTE Remotion SaaS/neuraflow-remake-v3/src/scenes/*.tsx` e `src/ui/*.tsx`; medições em `_ref/spec/*.md`; historial em `ESTADO.md`.
