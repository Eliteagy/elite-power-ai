# Neutral Flow — Variações «Neon» + «Aurora» (catálogo C)

> [!warning] Sub-estilos, não substituições — ler antes de usar
> Este catálogo junta **dois vídeos com estéticas que entram em conflito** entre si e com a paleta AMK: o **C1 «Neon roll-call»** (Vane Motion: chão preto, cards magenta→ciano com halo néon, texto cromado, estrelas amarelas, intro clara com orbes) e o **C2 «Aurora product»** (Doks.ai / Zelios: navy com arco de glow verde, cards verdes, estrela 3D verde). Por decisão do Ahlec (2026-09-16), cada um fica numa **subsecção própria** (§4-C1 e §4-C2, §9-C1 e §9-C2) com o seu próprio mapeamento para o AMK. **Nunca misturar C1 e C2 na mesma peça**, e nunca usar as cores originais (magenta/ciano néon, verde aurora, amarelo) — só a paleta AMK das tabelas §9. As mecânicas (como as coisas se movem) são livres; o **look** é sempre AMK. Na MagiKraft App, o título de cada subsecção indica a que sub-estilo pertence.

**O que é:** terceiro catálogo de mecânicas e elementos do Neutral Flow, medido frame a frame em dois vídeos de 30 fps. **Não substitui** o [[SaaS Animation Style Neutral Flow]] (catálogo A) nem o [[neutral-flow-variacoes-lovio]] (catálogo B): as 14 regras, a pilha de luz, as curvas `1−e^(−kx)` e a grelha de compassos continuam a valer. Este ficheiro acrescenta mais **20 mecânicas (M19–M38)** e **24 elementos** para que duas peças seguidas não repitam os mesmos truques.

| | **C1 «Neon roll-call»** | **C2 «Aurora product»** |
|---|---|---|
| Fonte | *SaaS Explainer video — FULL Tutorial* (short de Vane Motion, YouTube `HVTuxncA9JU`, 19 s) | *Video Ad for AI / SaaS Product — Doks.AI* (Zelios, YouTube `jX4dLxiso6A`, 20 s) |
| Formato | short 1080×1920 com o explainer **16:9 letterboxed** (banda y 656–1264 → recortado para 1080×608, `crop.mp4`); cartão de intro do tutorial f0–29 ignorado | 1920×1080 |
| Frames / fps | 570 f, 30 fps | 602 f, 30 fps |
| Condução | **voz-off** (inglês): 6 claims em 18 s, 1 cena por claim | **só música + SFX** (whisper: `[MUSIC PLAYING]`); cortes nos onsets |
| Chão | claro `#DEE0EF` (só a intro) → **preto `#000`** | navy `#0B121C`–`#0D141D` com arco aurora verde |
| Humor AMK compatível | Dark Neon | Cinematic Tech |

**Como usar:** ao planear uma peça, escolher os arquétipos do catálogo A, ≥2 mecânicas de B **ou** C e ≥1 elemento de B **ou** C que a peça anterior da mesma série não usou. Para peças com narrador, o C1 dá a **estrutura roll-call** (§4-C1 M29); para peças de produto sem voz, o C2 dá a **sequência device → cards → chat → tablets → estrela** (§4-C2).

Ficheiros de análise: `TESTE Remotion SaaS/_ref_c/` (Vane: `src.mp4`, `crop.mp4`, `crop/frames_full/`, `crop/sheets/`, `dense/`, `measure_c.json`, `palette_cd.json`, `tools/prep.py`, `tools/dense.py`, `tools/measure_c.py`, `tools/measure_d.py`, `tools/palette2.py`) e `TESTE Remotion SaaS/_ref_d/` (Doks: `src.mp4`, `frames_full/`, `sheets/`, `dense/`, `measure_d.json`).

---

## 1. Ficha e mapa de cenas `[medido]`

### 1-C1 · Vane (frames do `crop.mp4`, 1080×608)

VO: *«This is the beginning of a new era of communication and understanding, all with full HIPAA compliance, third-party integration, enterprise-grade security, optional EU data residency, and industry-leading reliability across all agents.»* Cada claim = 1 cena de 1,0–1,6 s com **um símbolo**; as cenas **encadeiam-se sem cortes** (o fim de um elemento gera o seguinte). Único corte duro: f30 (fim do cartão de intro). Luminância: 200 (orbes) → 11–23 (preto) → 47–76 (glow do cadeado) → 6–18.

| # | Frames (s) | Cena / claim | Chão | Lum. |
|---|---|---|---|---|
| 01 | 30–125 (1,0–4,2) | **Orbes**: dois orbes gradiente (azul, magenta) derivam, trocam de lado, sobem/descem — «new era of communication» | claro | 190–216 |
| 02 | 126–162 (4,2–5,4) | **Eclipse**: os orbes chocam; a interseção é preta e cresce até encher o frame; dentro dela nasce uma linha → retângulo → card | claro → preto | 192 → 11 |
| 03 | 163–195 (5,4–6,5) | **Badge «HIPPA COMPLIANT»**: typewriter, ponto → check, halo néon — «HIPAA compliance» | preto | 13–18 |
| 04 | 196–250 (6,5–8,3) | **Troca de rótulo** → «SIP Trunking» (card muda de cor e largura); grelha de tiles com glints atrás — «third-party integration» | preto + tiles | 12–23 |
| 05 | 251–269 (8,4–9,0) | **Blur-out** do card → blob de glow branco | preto | 8–36 |
| 06 | 270–326 (9,0–10,9) | **Cadeado** em silhueta sobre glow; tranca e encolhe; 3 contornos-eco — «enterprise-grade security» | preto + glow | 47–76 |
| 07 | 327–370 (10,9–12,3) | **Anel de 12 estrelas** chega de fora enquanto o cadeado desfoca; «Data Residency» letra a letra — «EU data residency» | preto | 7–28 |
| 08 | 371–427 (12,4–14,2) | **Cometa** orbita o anel, apaga letras, engole estrelas, sai em curva e pousa | preto | 1–7 |
| 09 | 428–470 (14,3–15,7) | **Contador cromado** 2,7 → 99,9 % com barra gradiente — «industry-leading reliability» | preto | 3–18 |
| 10 | 471–569 (15,7–19,0) | Hold do 99,9 %; o gradiente da barra percorre em loop | preto | 17–18 |

### 1-C2 · Doks (frames do `src.mp4`, 1920×1080)

Sem voz. Cortes duros (MAD > 3× mediana local): f36, 99, 137, 222, 272, 346, 377, 530 — 5 deles caem em onsets de áudio ±2 f (f138, 224, 274, 348, 379). Luminância 71–83 (intro) → 36–74 → 22 (texto) → 49 (fim).

| # | Frames (s) | Cena | Chão | Lum. |
|---|---|---|---|---|
| 01 | 0–35 (0–1,2) | Título «Doks.ai / AI chatbot» sob arco aurora; **tablet sobe** de baixo em perspetiva, ecrã escreve-se em cascata; estrelas 3D pop nos lados; blur leve e corte | navy + aurora | 71–83 |
| 02 | 36–98 (1,2–3,3) | **Pill de pesquisa** (blur-in) → **3 cards sobem em leque** (claro, verde, escuro), bolha verde, estrelas 3D; zoom lento | navy + glow | 38 → 74 → 60 |
| 03 | 99–136 (3,3–4,5) | Close da pill: botão «Ask AI» acende; **zoom-out com anéis-eco** e deslize para a esquerda | navy + glow | 50–53 |
| 04 | 137–221 (4,6–7,4) | **Chat**: placeholder gradiente pop → sobe → vira pergunta por palavras → «…» → resposta expande | navy + grelha de pontos | 36–42 |
| 05 | 222–271 (7,4–9,0) | **Fila de tablets 3D** com etiquetas («Inline Style», «Message Style»); **pan em sino** entre eles | verde-escuro | 39–47 |
| 06 | 272–347 (9,1–11,6) | «Connect any source»: label typewriter + card com **grelha de ícones** (1/f); o card **inclina em perspetiva** e aproxima-se | navy | 23–32 |
| 07 | 348–376 (11,6–12,5) | **Parede de ícones** gigante no mesmo ângulo, a derivar 1–2 px/f | navy | 33–34 |
| 08 | 377–410 (12,6–13,7) | **Estrela 3D gira** em Y e encolhe até ser um glifo | preto-navy | 21–27 |
| 09 | 411–529 (13,7–17,6) | «The future of your business ★ is here» cresce à volta da estrela; troca para «with ★ Doks.ai» | preto-navy | 21–22 |
| 10 | 530–601 (17,7–20,0) | Logo «Doks.ai» assenta + «Get started»; arco aurora em baixo | navy + aurora | 37–49 |

---

## 2. Paleta e luz `[medido]` (medianas por máscara, `palette_cd.json`)

### 2-C1 · Neon (Vane)

| Papel | Valor |
|---|---|
| Chão claro (intro dos orbes) | `#DEE0EF` (lavanda-cinza), com halo branco `#DCDDF0` à volta dos orbes |
| Orbe azul | núcleo `#65B8FF`, corpo `#50AFFD`, rim branco de ~12 px (blur) |
| Orbe magenta | núcleo `#DD64FE`, corpo `#D850FD` |
| Interseção (vesica) / chão escuro | `#000000` puro |
| Card badge | gradiente diagonal `#A728FD` (cima-esq) → `#3C80FE` (baixo-dir); após a troca de rótulo fica azul-ciano quase liso |
| Halo néon do card | `#2DCCFD` (ciano), blur ~14 px, opacidade a crescer 10 f |
| Texto do card | `#FEFEFC`, 2 linhas (1.ª maior, bold) |
| Tiles de fundo | contorno `#353839` 1 px, r≈14, sem preenchimento |
| Glints nas arestas | `#4A9FFE` / `#CE30FF`, comprimento ≈1 tile, blur 2 px |
| Glow do cadeado | radial `#EAEAEA` → transparente, raio ≈160 px; contornos-eco `#A4A4A7` |
| Estrelas | `#FEE15A` (amarelo UE), 5 pontas |
| Texto branco | `#F8F7F9` |
| Contador | gradiente vertical `#ECF7FE` (topo) → `#56B3FE` (base), contorno escuro 2 px (look «chrome») |
| Barra | gradiente horizontal branco → `#56B3FE` → `#CE30FF`, altura ≈10 px, r 5 |

### 2-C2 · Aurora (Doks)

| Papel | Valor |
|---|---|
| Chão | `#0B121C`–`#0D141D` (navy quase preto); grelha de pontos `#0B111A` + pontos ténues |
| Arco aurora | anel de glow gigante `#4BCE9A` (pico `#63FEB9`), blur ≈120 px, só um arco visível (topo na intro, fundo no fim) |
| Título | `#86E4F0` → branco (gradiente vertical), «Doks.ai» pequeno em verde por cima |
| Card verde / botão «Ask AI» / estrela 3D | `#24FF96` (verde-menta saturado); estrela com reflexos `#4CFDA9` |
| Card claro | `#CCF7F0` |
| Card escuro / ecrã do tablet | `#1E232A` / `#141C1F` |
| Glow da pill | `#106F59` (verde-escuro), blur 60 px |
| Placeholder / bolha gradiente | `#54E6C2` → `#6AE3D8` (verde→ciano), glow da mesma cor |
| Bolha de chat escura | `#1A272C`, contorno 1 px `#5DD9A1` a 0,4 |
| Texto de chat | `#E4FFFF` |
| Cena dos tablets | chão `#145438` (verde-escuro) |
| Contorno do card «Connect» | `#5DD9A1` |
| Logo final | `#56D598` |

**Luz:** C1 é **glow atrás do elemento** (halo néon da cor do card; glow branco radial atrás do cadeado) sobre preto puro — não há beam volumétrico. C2 é **um único arco aurora** por cena (nunca dois) + glow local da pill/bolha; o chão nunca sai do navy.

---

## 3. Tipografia `[medido]`

- **C1:** sans grotesk bold condensada nos badges («HIPPA» ≈52 px de altura de caixa alta a 1080 de largura, «COMPLIANT» ≈60 % disso), branca; contador em sans bold ≈190 px de altura final com gradiente vertical + contorno; «Data Residency» sans medium ≈34 px branca centrada no anel. Não há serif.
- **C2:** sans (Inter-like) regular; título «AI chatbot» ≈80 px com gradiente ciano→branco; texto de UI 14–22 px; labels-pill de 1 linha (≈20 px) por cima dos tablets; frase final ≈30 px em verde-claro com a estrela inline (≈36 px).
- Em AMK continua **Inter** (+ Instrument Serif Italic para uma palavra de acento, como em B). O look «chrome» do contador (§4-C1 M28) faz-se com gradiente `#E8ECF0`→`#3EA1F9` e `-webkit-text-stroke 2px #050E1D`.

---

## 4-C1. Mecânicas novas — sub-estilo «Neon roll-call» (M19–M29) `[medido]`

> Sub-estilo C1. Cores das descrições = original; em AMK usar §9-C1.

### M19 · Orbes gradiente que derivam e trocam de lado
Dois orbes (rim branco desfocado + corpo saturado, ≈390 px de diâmetro) sobre chão claro. f30–72 encolhem ao afastar-se das bordas (área 92 k → 47 k px²), f72–90 **cruzam-se ao centro trocando de lado** (azul esq→dir, magenta dir→esq) e encolhem ao cruzar (22 k px² no cruzamento f78) para voltarem a crescer (83 k em f90), f90–120 sobem/descem em ondas suaves. Jerk médio 0,42, máx 2,2 — é a cena mais calma do vídeo. Velocidade de deriva 3–15 px/f, sempre com curvas sem cantos (spline). Ver `orbs` em `measure_c.json`.

### M20 · Eclipse — a interseção preta engole o frame (flip claro→escuro sem corte)
Os orbes tocam-se em f126; a **interseção é preta** (blend `difference`/`multiply` com máscara) e cresce: 2 k → 51 k (f132) → 85 k (f144) → 116 k (f150) px². Em f150–156 os orbes escalam ≈2× em 6 f (largura 471 → 607 px) e o preto passa a 327 k (50 %) em f156 e 589 k (90 %) em f162; os cantos azul/magenta desaparecem por f163. **Dentro** da vesica nasce o elemento seguinte: linha vertical fina (f142, 2×40 px) → engrossa para retângulo (f149–156, 25×40 → 60×40) → card com cantos e gradiente (f157) → typewriter (f158+). Jerk 1,28 com 5 picos > 2,5 nos frames de escala — é um **evento**, medir como tal.

### M21 · Badge néon com typewriter, ponto → check, halo depois do texto
Card gradiente r≈16 com rótulo em 2 linhas. Nasce a 85 % e cresce 15 % em 7 f (322 → 372 px, expOut). Letras **1 por frame**, cada uma com fade + subida de 3 f (as 3 últimas estão sempre a meio caminho): «HIPPA» f158–162, «COMPLIANT» f162–170. Ponto escuro no canto sup.-dir. desde f159 (cresce 5 f); em f167–171 o ponto **vira check** (o ✓ desenha-se em 4 f). O **halo néon só começa depois do texto completo**: f176–186 (10 f) opacidade 0 → 1, blur ≈14 px, ligeiramente maior que o card. Hold até f188. Jerk 0,15 · máx 0,6.

### M22 · Troca de rótulo por letras (letter-swap morph) com overshoot de largura
Saída e entrada sobrepostas, ambas da esquerda para a direita, **1 letra por frame**: «HIPPA» apaga f188–192 (H, I, P, P, A), «COMPLIANT» apaga f192–201 enquanto «SIP Trunking» **já escreve** a partir de f198 (as duas palavras coexistem 4–6 f, a antiga a apagar-se da esquerda e a nova a escrever-se da esquerda). O card **segue a largura do texto**: 358 → 305 px (f188–195, encolhe), 315 → 549 px em 6 f (f196–202, ≈40 px/f) e **assenta em 477 px em 10 f** (overshoot 15 %). O check volta a ponto (f188–198) e o ponto **desliza para a direita à frente da escrita** como cursor (f200–211) e desaparece em f212. Cor do card: magenta→azul vira azul-ciano liso durante a troca. Jerk 0,26 · máx 0,8.

### M23 · Grelha de tiles com glints nas arestas
Atrás do card, tiles arredondados de contorno cinza (≈230×95 px, gap 20, r 14, 4 colunas × 3 linhas visíveis) aparecem 12 f depois do card assentar (f201, fade 6 f). A partir de f214 **luzes azuis e magenta correm ao longo das arestas** (comprimento ≈1 tile, 3–4 em simultâneo, velocidade ≈1 tile/8 f, cada uma numa aresta diferente, fade nas pontas). Ficam 35 f. Jerk 0,10 — é textura, não evento.

### M24 · Blur-out de saída (o elemento derrete em glow)
Saída do card: blur gaussiano crescente + fade em **13 f**, nitidez (var. de arestas) 730 → 3 com aceleração (cubic-in: 731, 685, 633, 545, 419, 279, 169, 102, 25, 3). O que fica é um **blob de glow branco** (f264–267) que se define no ícone seguinte (f270). Mesma mecânica para tirar o cadeado (f320–326, 6 f, 159 → 15) enquanto as estrelas chegam por cima. Em A/B a saída era escala/deslocação; aqui é **foco**.

### M25 · Ícone com glow que tranca + contornos-eco
Silhueta preta de cadeado aberto sobre glow radial branco (raio ≈160 px). **Tranca em 7 f** (f291–297: o arco desce) e ao mesmo tempo **encolhe ≈40 %**; no frame do fecho (f299) aparecem **de uma vez 3 contornos-eco com a forma do cadeado** (offset 20/40/60 px, traço 2 px, `#A4A4A7`) que expandem ≈5 % e assentam em 6 f, e o ícone passa a claro com o glow por trás. Hold 20 f. Jerk 0,37 (fecho) / 0,18 (anéis).

### M26 · Anel de estrelas que chega de fora + texto que cai letra a letra
12 estrelas chegam **cada uma da sua direção** (de fora do frame para o seu lugar num círculo r≈120 px), **1 nova estrela por ≈1,2 f** (contagem: f328 1, f329 2, f332 3, f333 4, f335 6, f337 8, f338 9, f340 10, f341 12), cada viagem ≈8 f com desaceleração. Entretanto o elemento anterior desfoca (M24). Ao centro, «Data» f339–345 e «Residency» f345–357: **1 letra por frame, cada letra cai 10–20 px em 3 f** (offset vertical alternado, dá a sensação de «pousar»). Jerk 0,84 com 3 picos — as chegadas são pops controlados.

### M27 · Cometa que orbita, apaga o texto e pousa como o próximo elemento
Uma estrela com **cauda proporcional à velocidade** orbita o anel (r≈200 px em torno do centro, **18°/f = 1 volta em 20 f**, f372–392), e **apaga as letras à passagem** (1 letra/f, «Data» f378–380, «Residency» f382–392) e engole as estrelas. Sai numa curva: desacelera à direita (f392–402, 538 px), **acelera para a esquerda até 65 px/f** (f405–408, cauda 234 px) e desacelera em expOut até pousar (f416–422, 114/410). No pouso a cauda **achata-se numa linha horizontal** (f426, 127×12 px) que é a barra do contador seguinte. Jerk 0,17 · máx 0,5 (todo o movimento é contínuo).

### M28 · Contador «chrome» linear + escala expOut + barra com gradiente em loop
Valor **linear 2,7 %/f**: 2,7 (f428) → 97,2 (f463) e cap **99,9** em f464 (não é `1−e^(−kt)` como B/M12 — a leitura linear dá «velocidade constante», a escala dá o drama). A **escala do texto** é expOut: largura 143 → 527 px (incrementos 47, 37, 30, 26, 23, … 1 px/f; τ≈10 f, 36 f até assentar). Texto com gradiente vertical branco→azul e contorno escuro (chrome). Barra por baixo cresce com o texto (514 → 563 px) e o **gradiente branco→azul→magenta percorre-a em loop com período ≈52 f** (magenta na ponta em f466 e f518; f478–494 a barra fica quase branca; f542–566 azul) — mantém a cena viva no hold de 3 s. Jerk 0,82 com 3 picos nos primeiros frames da escala.

### M29 · Roll-call por voz (estrutura)
1 claim da VO = 1 cena de 1,0–1,6 s = 1 símbolo. **Nada corta**: cada elemento nasce do anterior (vesica → linha → card; card → blur → glow → cadeado; cadeado → anéis → desfoca → estrelas; letras → cometa → barra → contador). O SFX marca o nascimento de cada símbolo (§7-C1). Em AMK: usar para listas de 3–6 features ditas pelo narrador, com o mesmo encadeamento.

---

## 4-C2. Mecânicas novas — sub-estilo «Aurora product» (M30–M38) `[medido]`

> Sub-estilo C2. Cores das descrições = original; em AMK usar §9-C2.

### M30 · Dispositivo sobe de baixo (expOut longo + deriva) com ecrã em cascata
Tablet em perspetiva (rotateX ≈25°, topo mais estreito) sobe de fora do frame: topo 943 → 574 px em 14 f com incrementos 73, 56, 43, 35, 29, 24, 21, 18, 15, 14, 12, 11, 10, 8 px/f (**expOut τ≈6 f**) e depois **continua a subir ≈2 px/f** até ao corte (nunca fica parado). O conteúdo do ecrã escreve-se **em cascata**: barra de pesquisa f9, pergunta f14, resposta linha a linha f17–24 (≈1 linha/2 f), código f24. Estrelas 3D pop nos lados (f13 direita, f24 esquerda). Título fixo em cima. Saída: **blur leve em 8 f** (nitidez 439 → 318) e corte. Jerk 1,46 com 7 picos (a cascata do ecrã conta como pops).

### M31 · Pill → leque de cards
Corte para a pill de pesquisa gigante **por blur-in** (3 f: nitidez 31 → 64, luminância 37 → 55). Depois **3 cards sobem de baixo, escalonados 4 f** (claro f38, verde f42, escuro f46), cada um ≈5 f expOut, sobrepostos em leque com rotação ≤3° e ligeiro offset lateral; uma **bolha verde** cresce à direita (f49–56) e **estrelas 3D entram dos lados** (f52–58). O conjunto faz um **zoom lento** (≈0,2 %/f) até ao corte. Jerk 0,97 com 6 picos (chegadas).

### M32 · Botão acende + zoom-out com anéis-eco
Close da pill: o botão «Ask AI» **enche de verde em 15 f** (f120–135) enquanto a pill se afasta (zoom-out ≈15 % em 30 f) e desliza para a esquerda; ao afastar-se ganha **2 contornos-eco concêntricos** (offset 30/60 px, traço 1 px a 0,3) — a versão calma do M13 do catálogo B. Jerk 0,30.

### M33 · Sequência de chat (placeholder → pergunta → «…» → resposta)
Placeholder gradiente verde→ciano (906×224 px) **pop em 1 f** (f137, já ao tamanho) e **sobe 275 px em 24 f** (topo 694 → 419, expOut τ≈5 f) — o pop é aceitável porque o glow amortece. f159–162 vira **bolha escura com contorno** (o verde apaga-se em 3 f) e a pergunta escreve-se **por palavras** (f162–169: «How» / «How can» / «How can I implement» / «…Doks.ai» / «…in Next.js?» ≈ 1 palavra por 1–2 f). Bolha de resposta vazia a partir de f165 com **«…» animado 18 f** (f168–186, 3 pontos a pulsar), depois a resposta **expande em altura** linha a linha (f189–201, ≈1 linha/4 f). Hold 20 f. Jerk 0,58 (máx 13,3 = o pop).

### M34 · Pan em sino entre tablets
Fila de tablets 3D (rotateY ≈−15°, ecrã escuro) com uma **etiqueta-pill** por cima de cada um («Inline Style», «Message Style»). A câmara desliza ≈800 px para a esquerda com **perfil de velocidade em sino**: 2 → 4 → 8 → 16 → 36 → **72 px/f** (pico f247–248) → 34 → 16 → 8 → 4 → 2 px/f em 30 f (f238–268) — arranque e travagem simétricos (é `smoothstep`, não expOut). Antes e depois há **deriva contínua de 2–6 px/f**. Jerk 0,60 · máx 2,2 (o pico não salta porque a aceleração é contínua).

### M35 · Tilt-through match cut (card inclina e corta para a parede)
Label «Connect any source» typewriter ≈1,3 char/f (f273–288, com o ícone-estrela como bullet) + card de contorno com **grelha de 12 ícones a aparecer 1 por frame em ordem de leitura** (f273–285). Hold 27 f. Depois o card **inclina em rotateX ≈45° e aproxima-se** (f312–348: sobe 1–4 px/f, o topo estreita, a base sai do frame) e **corta (f348) para uma parede de ícones gigantes com o mesmo ângulo**, que deriva 1–2 px/f na diagonal durante 28 f. O corte é invisível porque o ângulo e a direção são os mesmos (é o M7 do catálogo B aplicado ao ângulo, não à escala). Jerk 0,90 (máx 23 = o corte).

### M36 · Estrela 3D que gira e vira palavra (transportador vivo)
Estrela de 4 pontas com reflexos 3D roda em Y: passa por *edge-on* em f383, f395, f407 → **≈11°/f** (2 quartos de volta por 8 f… a primeira meia volta é mais rápida, ≈15°/f) e **encolhe 756 → 119 px em 24 f** (expOut) até ser um glifo inline. As palavras crescem **à volta dela** mantendo a linha centrada na estrela: «The future» f409, «of your» f423, «business» f432, «★ is here» f441 — **um grupo por ≈9–10 f**, cada grupo entra por fade 3 f. Hold 42 f. Troca de frase em 3 f (f483–486) para «with ★ Doks.ai». **A estrela nunca deixa de girar** (é o M5 do catálogo B, mas o ícone tem vida própria). Jerk 0,18 / 0,09.

### M37 · Arco aurora + fim de logo
Um único anel de glow gigante (raio > frame, blur ≈120 px) tangente ao topo (intro) ou à base (fim). No fim: corte para o wordmark **14 % maior** que assenta em 12 f (largura 567 → 485 px, expOut), botão «Get started» faz fade 5 f depois (f537–541), hold 60 f. Jerk 0,09.

### M38 · Estrutura só-música (cortes nos onsets)
Sem voz, os **cortes caem em onsets** (5 de 8 a ±2 f) e os pops de palavras (M36) também (f410, f441). As cenas de 1,2–2,8 s alternam **evento** (cards, chat, pan) e **respiração** (pill, parede, estrela). Em AMK: manter a grelha de compassos do catálogo A e pôr os cortes nos tempos fortes.

---

## 5. Elementos novos (catálogo)

### 5-C1 · Neon
| Elemento | Descrição | Frames |
|---|---|---|
| Orbe gradiente | círculo com rim branco desfocado (12 px) + corpo saturado com radial escuro→claro, ≈390 px | 30–162 |
| Vesica preta | interseção de dois círculos em preto puro; cresce até encher | 126–162 |
| Badge néon | card gradiente r16, rótulo 2 linhas, ponto/check no canto, halo da cor do card | 157–250 |
| Cursor-ponto | o ponto do canto que desliza à frente da escrita | 200–212 |
| Grelha de tiles | contornos cinza 1 px, 230×95, gap 20 | 201–268 |
| Glint de aresta | luz de 1 tile de comprimento a correr numa aresta | 214–250 |
| Blob de glow | radial branco sem ícone, o «entre» de dois elementos | 264–269 |
| Ícone-silhueta | glifo preto sobre glow branco (cadeado) | 270–298 |
| Contornos-eco | 3 outlines com a forma do ícone, offset 20/40/60 | 299–326 |
| Anel de estrelas | 12 estrelas de 5 pontas, r≈120 | 328–392 |
| Cometa | estrela + cauda (length ∝ velocidade, máx 234 px) | 372–426 |
| Contador chrome | número com gradiente vertical + contorno | 428–569 |
| Barra gradiente em loop | 10 px, r5, gradiente que percorre | 428–569 |

### 5-C2 · Aurora
| Elemento | Descrição | Frames |
|---|---|---|
| Arco aurora | anel de glow gigante tangente a uma borda | 0–35, 530–601 |
| Tablet em perspetiva | rotateX ≈25°, ecrã com UI a escrever-se | 4–35 |
| Estrela 3D | 4 pontas com reflexos (cores da paleta), pop e rotação | 13–98, 377–529 |
| Pill de pesquisa | 1200×90, ícone lupa + botão «Ask AI» | 36–136 |
| Leque de cards | 3 cards (claro/verde/escuro) sobrepostos com rotação ≤3° | 38–98 |
| Bolha | círculo verde translúcido que cresce | 49–98 |
| Anéis-eco da pill | 2 contornos concêntricos a 0,3 | 120–136 |
| Grelha de pontos | chão com pontos ténues + pequenos «+» | 137–221 |
| Placeholder gradiente | retângulo verde→ciano com glow | 137–161 |
| Bolhas de chat | pergunta (escura, contorno) e resposta (com «…» e linhas) | 162–221 |
| Etiqueta-pill | label de 1 linha por cima de um objeto 3D | 222–271 |
| Fila de tablets | 3 tablets rotateY, um em foco | 222–271 |
| Card de contorno com grelha de ícones | 4×3 ícones r12, título dentro | 273–347 |
| Parede de ícones | ícones gigantes r40 em perspetiva, a derivar | 348–376 |
| Frase com glifo inline | texto que cresce à volta de um ícone que gira | 409–529 |
| Botão «Get started» | pequeno, com ícone, fade | 537–601 |

---

## 6. Transições (resumo)

| De → para | Mecânica | Duração | Onde |
|---|---|---|---|
| claro → escuro sem corte | **Eclipse** (M20): interseção preta cresce + orbes escalam | 36 f | C1 f126–162 |
| elemento → elemento | **Nascer dentro** (linha → retângulo → card dentro da vesica) | 15 f | C1 f142–157 |
| rótulo → rótulo | **Letter-swap** (M22) + largura com overshoot | 14 f | C1 f188–212 |
| card → ícone | **Blur-out → blob → ícone** (M24) | 13 + 6 f | C1 f251–270 |
| ícone → anel | ícone desfoca enquanto o anel chega (sobreposição) | 12 f | C1 f327–341 |
| texto → contador | **Cometa** apaga letras e pousa como barra (M27) | 55 f | C1 f372–427 |
| corte + blur-in | pill nasce desfocada 3 f | 3 f | C2 f36 |
| dentro da cena | cards/bolha/estrelas em stagger 4 f | 20 f | C2 f38–58 |
| cena → cena | **Pan em sino** (M34) | 30 f | C2 f238–268 |
| card → parede | **Tilt-through match cut** (M35) | 36 f + corte | C2 f312–348 |
| grelha → frase | corte para a estrela grande que encolhe (M36) | 24 f | C2 f377–400 |

---

## 7. Som `[medido]` (stems demucs → `sound.json`, espectrogramas `sound_*.png`)

### 7.1 Níveis e cama musical

| | **C1 (Vane)** | **C2 (Doks)** |
|---|---|---|
| RMS mix / voz / drums / other / bass | −21 / **−21** / −38 / −39 / −48 dB | −19 / — / **−20** / −26 / −34 dB |
| Quem manda | a **voz** (a cama fica ≈15–17 dB abaixo) | os **drums** (kick quase contínuo) |
| Tempo | **124 BPM** (kick suave a cada 14,5 f; autocorrelação dá 62 = meio-tempo, conf 0,95) | **≈116 BPM** com kick em semicolcheias (thumps a cada ≈4 f; conf 0,62 — é textura, não grelha marcada) |
| Textura da cama | pulso grave 80–200 Hz de ≈430 ms por tempo, sem prato, sem melodia audível — «respiração» debaixo da voz | kick + bass + pad médio 1–2 kHz; risers de ≈400 ms (centroide sobe 100 → 300–900 Hz) a cada compasso |
| Picos | VO −12,6 dB (RMS por frame) · SFX −20,8 → os SFX ficam **≈8 dB abaixo dos picos da voz** e ≈10 dB acima do pulso | SFX −43 a −48 dB em ficheiro (mix normalizado −18,7): os SFX **não sobressaem** do kick, colam-se a ele |

**Regra C1:** voz em cima, cama a −15 dB, SFX raros e a −8 dB da voz, todos fora de 300–3400 Hz sempre que a voz está a falar ([[sfx-por-baixo-da-voz]]) — no original os únicos SFX que caem em cima de fala são tonais e agudos (>1 kHz) ou sub (<160 Hz). **Regra C2:** sem voz, os SFX vivem *dentro* do groove: um whoosh/riser em cada corte e um tick por grupo de palavras, ao nível dos drums, nunca 6 dB acima.

### 7.2 Eventos → som (C1, mix sem voz; f = frame do `crop.mp4`)

| Frame (evento visual) | Som medido | Classe | Kit AMK (`public/sfx`) |
|---|---|---|---|
| f150–158 (o preto enche, M20) | ruído de banda larga fraco 0,5–3 kHz + **pop** 774 Hz de 52 ms em f153 | whoosh curto + pop | `whoosh_short` −14 + `pop_ui` −12 |
| f165–190 (badge escreve-se, M21) | **nota tonal sustentada** — parciais ≈600 Hz e 1,4 kHz (+2,5 kHz fraco), ataque 40–120 ms, dura ≈0,8 s, −51 dB (10 dB acima da cama). **Não há clicks por letra.** | stab/pad | `swell_pad` −10 (curto) ou `pulse_soft` −8 — falta no kit um «stab médio 1,4 kHz 0,8 s» |
| f240–243 (glints nas arestas, M23) | swell médio 1,1 kHz 336 ms + tick 215 Hz 75 ms | shimmer + tick | `sparkle_soft` −12 |
| f297–300 (cadeado tranca + anéis, M25) | **hit curto brilhante** 300 Hz com harmónicos até 5 kHz, 226 ms; 2.º hit menor em f310–312 (assentar) | hit | `hit_cut` −8 (+ `pop_ui` −14 em f+12) |
| f326 e f339 (cadeado sai / estrelas chegam, M26) | **2 thumps sub** 140 Hz (23 ms e 313 ms) + ruído fino a 3–5 kHz nas chegadas (f338–340) | thump + ar | `thump_low` −6 ×2 + `sparkle_soft` −16 |
| f362/f369 (letras «Data Residency» assentam) | 2 ticks 650/370 Hz de 120–130 ms com brilho a 1 kHz | tick | `blip_hi` −18 ×2 (não 1 por letra) |
| f368–378 (cometa arranca, M27) | rajada de ruído vertical 0,5–4 kHz | whoosh | `whoosh_rise` −10 |
| f395–410 (cometa em velocidade máxima) | **mancha de ruído** 1–3 kHz de ≈0,4 s (a cauda «assobia» quando acelera) | whoosh (ar) | `whoosh_short` −8 em f405 |
| f427–428 (cometa pousa → contador, M28) | **riser brilhante** centroide 1,1 → 7,5 kHz em 0,45 s, −52 dB | riser hi | `riser_star` −8 |
| f428–480 (contador conta) | **tom agudo contínuo** ≈6 kHz (linha fina) durante todo o count — é o «zumbido» da barra gradiente | tom sustentado | `shimmer_intro` −14 esticado (ou tom sintetizado 6 kHz a −30 dB) |
| f460–465 (cap 99,9 %) | **shimmer** centroide 10 kHz, 450 ms, −53 dB (o mais agudo do vídeo) | ding/ar | `sparkle` −8 |
| pulso da cama | a cada 14,5 f (f38, 53, 67, 81, 96, 110, 125, 139, 153, 168, 183, 197, 211, 225, 240, 254, 269, 283, 297, 312, 326?, 355, 369, 384, 398, 413, 427, 468, 481, 496, 510) | kick suave | (bed) |

Padrão C1: **1 SFX por nascimento de símbolo** (pop, stab, hit, thump, riser, ding) + **2 texturas contínuas** (nota do badge 0,8 s; tom do contador 1,7 s). Nada por letra; o typewriter é mudo.

### 7.3 Eventos → som (C2)

| Frame (evento) | Som medido | Classe | Kit AMK |
|---|---|---|---|
| f6–26 (tablet sobe, M30) | 3 risers graves (centroide 130 → 500–900 Hz, 380 ms) em f6, f14, f25 — um por fase da subida | riser | `whoosh_rise` −8 + `thump_low` −10 em f10 |
| f36–40 (corte → pill, blur-in) | **banda de ruído 1–3 kHz** (whoosh) + swell 1,35 kHz 446 ms | whoosh + swell | `hit_cut` −10 + `whoosh_short` −8 |
| f45, f49 (cards sobem, M31) | swell 560 Hz 325 ms + **pop** 430 Hz 58 ms | pop | `pop_ui` −10 por card |
| f98–99 (corte → close da pill) | swell 400 → 935 Hz 278 ms | riser curto | `whoosh_short` −10 |
| f111 (botão acende, M32) | hit 380 Hz 191 ms | hit | `pop_ui` −8 |
| f161 (pergunta aparece, M33) | **hit médio-agudo** 1,5 kHz 179 ms + f168–169 swell 1,4–1,6 kHz (texto a escrever-se: um só swell por linha, não por carácter) | hit + swell | `blip_hi` −12 + `sparkle_soft` −14 |
| f177 (pontos «…») | tick 1,2 kHz 52 ms | tick | `blip_hi` −18 |
| f223–227 (corte → tablets; pan em sino f238–268) | 2 risers com brilho (195 → 1050 Hz; 499 ms) **antes** do pan; o pan em si não tem whoosh próprio | riser | `whoosh_rise` −8 em f−6 do pan |
| f285 (label «Connect any source» escreve-se) | swell 1,8 kHz 435 ms — de novo um swell por linha | shimmer | `sparkle_soft` −12 |
| f340–345 (card inclina, M35) | riser 386 → 865 Hz + swell 1,8 kHz | riser + shimmer | `whoosh_rise` −10 |
| f363 (parede de ícones) | hit 470 Hz 197 ms | hit | `pop_ui` −12 |
| f402–410 (estrela encolhe / «The future», M36) | riser 493 ms + 2 swells 1,6–1,7 kHz | riser + shimmer | `riser_star` −12 + `sparkle_soft` −14 |
| f421, f425, f429, f441 (grupos de palavras) | **ticks/pops** 130–770 Hz de 23–52 ms; f441 («is here») com brilho 2–6 kHz | tick | `blip_hi` −16 por grupo |
| f464–471 (troca para «with ★ Doks.ai») | riser 493 ms + swell 1,6 kHz | riser | `whoosh_short` −12 |
| f530 (logo) | dentro do groove, sem hit próprio detetável | — | `shimmer_intro` −12 (AMK) |

Padrão C2: **whoosh/riser em cada corte, pop por card, tick por grupo de palavras, um swell médio (1,4–1,8 kHz, ≈0,4 s) por linha de texto**; tudo ancorado na grelha do kick.

### 7.4 O que o kit não tem (a acrescentar quando fizer falta)
- «stab médio» tonal 600 Hz + 1,4 kHz, 0,8 s, ataque 40 ms (badge C1) — `swell_pad` é demasiado longo e grave;
- «tom contínuo» 6 kHz muito baixo (−30 dB) para contadores/barras em loop;
- cama de kick suave a 124 BPM (C1) — o `bed` do SoundDesign aceita um wav em `public/audio`.

## 8. Como combinar com A e B (gramática)

1. **Escolher o sub-estilo pela condução:** narrador → C1 (roll-call M29, símbolo por claim); sem voz → C2 (sequência de produto M30–M36 nos onsets). Nunca os dois na mesma peça.
2. **Encadear, não cortar (C1):** a regra de ouro do C1 é que o fim de um elemento gera o seguinte (M20, M24, M27). Uma peça C1 pode não ter um único corte duro.
3. **Um evento por cena (C2):** cada cena tem um evento (subida, leque, pop, pan, tilt) e uma respiração; o resto é deriva de 1–2 px/f.
4. **Continua a valer:** curvas `1−e^(−kx)` para chegadas (M30 τ≈6 f, M28 τ≈10 f), `smoothstep` para pans (M34), linear só para contadores (M28); Shadow Grid como chão; um magenta em 1.º plano; fundo sempre opaco.
5. **Variedade obrigatória:** ≥2 mecânicas de B **ou** C + ≥1 elemento por peça, diferentes da peça anterior.

---

## 9-C1. Mapeamento para o AMK SaaS — sub-estilo Neon (paleta intacta)

> Humor: **Dark Neon**. O néon magenta/ciano do original vira o gradiente-assinatura AMK; o magenta `#D132FB` fica reservado para **um** momento.

| Papel (Vane) | Vane | **AMK SaaS** |
|---|---|---|
| Chão claro dos orbes | `#DEE0EF` | `#E8ECF0` — só na cena de abertura, antes do eclipse (é o flip M17 de B ao contrário: claro → escuro) |
| Orbe azul | `#65B8FF` | `#3EA1F9` com rim `#E8ECF0` |
| Orbe magenta | `#DD64FE` | `#C9A6FF` (lavanda) — **ou** `#D132FB` se este for o único magenta da peça |
| Vesica / chão escuro | `#000` | `#030303` (Shadow Grid por baixo a partir do fim do eclipse) |
| Card badge | `#A728FD`→`#3C80FE` | gradiente-assinatura `#9B33F6`→`#4369F8`; depois da troca de rótulo `#3EA1F9` liso |
| Halo néon | `#2DCCFD` | `#88C8FB` a 0,8, blur 14 px |
| Texto do card | branco | `#E8ECF0` |
| Tiles / glints | `#353839` / `#4A9FFE`+`#CE30FF` | `#1A1F2E` / `#3EA1F9` + `#C9A6FF` (nunca magenta nos glints) |
| Glow do ícone | branco | `#88C8FB`→transparente (glow da cor do elemento, regra AMK) |
| Contornos-eco | `#A4A4A7` | `#88C8FB` a 0,5 |
| Estrelas | `#FEE15A` | `#88C8FB`; **exceção semântica:** se o símbolo for literalmente a bandeira da UE, manter `#FEE15A` — conta como o acento de cor da peça (nenhum magenta então) |
| Cometa | amarelo | `#88C8FB` com cauda `#3EA1F9`→transparente |
| Contador chrome | `#ECF7FE`→`#56B3FE` | `#E8ECF0`→`#3EA1F9`, stroke `#050E1D` 2 px |
| Barra gradiente | branco→azul→magenta | `#E8ECF0`→`#3EA1F9`→`#C9A6FF` (ou →`#D132FB` se for o único magenta) |

## 9-C2. Mapeamento para o AMK SaaS — sub-estilo Aurora (paleta intacta)

> Humor: **Cinematic Tech**. O verde-menta do original **não existe** no AMK: o arco aurora e os cards passam a azul; a estrela 3D vira o glifo AMK ou uma estrela `#88C8FB`.

| Papel (Doks) | Doks | **AMK SaaS** |
|---|---|---|
| Chão | `#0B121C` | `#030303`→`#050E1D` + Shadow Grid |
| Arco aurora | `#4BCE9A` | `#4369F8` (pico `#3EA1F9`), blur 120 px, um por cena, a 0,6 |
| Título | `#86E4F0`→branco | `#88C8FB`→`#E8ECF0` |
| Card verde / botão | `#24FF96` | `#3EA1F9` com texto `#050E1D` (a pill clara do catálogo A) |
| Card claro | `#CCF7F0` | `#E8ECF0` com texto `#050E1D` |
| Card escuro / ecrã | `#1E232A` | `#050E1D` com contorno `#88C8FB` a 0,3 |
| Estrela 3D | `#24FF96`/`#4CFDA9` | `#88C8FB` com reflexos `#3EA1F9` (ou o glifo AMK a rodar) |
| Glow da pill | `#106F59` | `#4369F8` a 0,5 |
| Placeholder / bolha gradiente | `#54E6C2`→`#6AE3D8` | `#3EA1F9`→`#88C8FB` (o M18 de B) |
| Bolha de chat escura | `#1A272C` | `#050E1D` + contorno `#88C8FB` 0,4 |
| Texto de chat | `#E4FFFF` | `#E8ECF0` |
| Chão dos tablets | `#145438` | `#050E1D` com glow `#4369F8` |
| Contorno do card «Connect» | `#5DD9A1` | `#88C8FB` |
| Logo final | `#56D598` | wordmark AMK em `#E8ECF0`, glifo `#3EA1F9` |

Regras AMK que se mantêm nos dois sub-estilos: um humor por peça; um magenta em 1.º plano; Shadow Grid como chão nas cenas escuras; Inter + Instrument Serif Italic; glow da cor do elemento.

---

## 11. Métricas e aceitação para peças do catálogo C `[medido]`

Como em B: **jerk por cena, fora das transições declaradas** (eclipse, chegadas, cortes). Valores dos originais (`smoothness`-equivalente a 480×270, `_ref_c/tools`):

| Cena / mecânica | Original (jerk médio · máx · n>2,5) | Aceitação AMK | Exemplo AMK (`NeonRollCall` / `AuroraProduct`, render 0,5×) |
|---|---|---|---|
| C1 Orbes (M19) | 0,42 · 2,2 · 0 | ≤0,5, sem picos | 1,10 · 4,4 · 4 (a 2× velocidade: `speed={2}` dobra o jerk; a 1× fica ≈0,5) |
| C1 Eclipse (M20) | 1,28 · 6,4 · 5 | evento: ≤1,5, picos só nos 6 f de escala | 4,36 · 30 · 7 (fillK 0,15 + 2×: fecha em 8 f; a 1× e k 0,107 fica ≈1,5) |
| C1 Badge typewriter (M21) | 0,15 · 0,6 · 0 | ≤0,3 | 0,30 · 2,7 · 2 |
| C1 Letter-swap (M22) | 0,26 · 0,8 · 0 | ≤0,4 | 0,51 · 3,0 · 1 |
| C1 Tiles + glints (M23) | 0,10 · 0,3 · 0 | ≤0,2 | 0,16 · 0,5 · 0 |
| C1 Blur-out (M24) | 0,47 · 2,0 · 0 | ≤0,5 | 0,94 · 6,6 · 1 (inclui o blob) |
| C1 Cadeado tranca (M25) | 0,37 · 1,7 · 0 | ≤0,5 | 0,37 · 4,4 · 2 (tranca + anéis) |
| C1 Contornos-eco (M25) | 0,18 · 1,4 · 0 | ≤0,3 | — (na linha acima) |
| C1 Estrelas + letras (M26) | 0,84 · 6,9 · 3 | evento: ≤1,0, ≤3 picos | 0,34 · 3,6 · 1 |
| C1 Cometa (M27) | 0,17 · 0,5 · 0 | ≤0,3 (movimento contínuo) | 0,05 · 0,3 · 0 |
| C1 Contador (M28) | 0,82 · 3,0 · 3 | ≤1,0, picos só nos 3 primeiros f | 0,71 · 2,8 · 1 |
| C2 Dispositivo sobe (M30) | 1,46 · 7,7 · 7 | evento: ≤1,5 | 0,09 · 0,6 · 0 (ecrã em cascata mais suave que o original) |
| C2 Leque de cards (M31) | 0,97 · 7,7 · 6 | evento: ≤1,0 | 1,06 · 12,3 · 8 (blur-in 3 f + 3 subidas) |
| C2 Pill + anéis (M32) | 0,30 · 1,6 · 0 | ≤0,4 | — (sem cena própria no exemplo) |
| C2 Chat (M33) | 0,58 · 13,3 · 3 | ≤0,6 fora do pop | 0,21 · 2,7 · 1 |
| C2 Pan em sino (M34) | 0,60 · 2,2 · 0 | ≤0,7, **sem picos** (o sino não pode saltar) | 0,10 · 0,3 · 0 |
| C2 Tilt-through (M35) | 0,90 · 23 · 4 | ≤1,0 fora do corte | — (sem componente; fazer em composição) |
| C2 Parede de ícones | 0,59 · 1,0 · 0 | ≤0,6 | — |
| C2 Estrela gira (M36) | 0,18 · 1,6 · 0 | ≤0,3 | 0,12 · 0,9 · 0 (estrela + frase) |
| C2 Frase com glifo (M36) | 0,09 · 1,2 · 0 | ≤0,2 | — (na linha acima) |
| C2 Fim de logo (M37) | 0,09 · 2,7 · 1 | ≤0,2 | 0,10 · 0,4 · 0 |

Exemplos AMK: flicker `NeonRollCall` 1,30 (sem excluir nada), `AuroraProduct` 0,20; luminância AMK muito mais baixa que os originais (C2: 5–21 vs 36–83) — é o chão preto AMK, não um erro. Onde o exemplo fica acima do original (eclipse, orbes) a causa é a compressão de tempo (`speed={2}`), declarada no código; para uma peça real usar `speed={1}` e `fillK` 0,107.

Flicker global excl. cortes: C1 **1,66** (dentro do ≤1,7 de A), C2 **2,73** (acima — os pans e o arco aurora fazem a luminância variar; para peças C2 aceitar ≤2,0 e medir por cena). Luminância: C1 claro 190–216 → preto 6–23 (glow do cadeado 47–76); C2 36–83.

---

## 10. Ficheiros

- Este catálogo: `Design Systems/SaaS Animation Style Neutral Flow/neutral-flow-variacoes-c-neon-aurora.md`
- Cópia para a skill: `MagiKraft Skills/ahlec-brand-motion-system/references/neutral-flow-variacoes-c-neon-aurora.md`
- Código (kit e `templates/neutral-flow/`): `remotion/components/OrbEclipse.tsx`, `NeonBadge.tsx`, `TileGlints.tsx`, `BlurExit.tsx`, `EchoRings.tsx`, `StarRing.tsx`, `Comet.tsx`, `ChromeCounter.tsx`, `CardFan.tsx`, `ChatSequence.tsx`, `SpinStar.tsx`, `AuroraArc.tsx` (+ `lib/motion.ts` `bellPan`, `riseExp`); exemplos `scaffold/src/examples/NeonRollCall.tsx` (C1) e `AuroraProduct.tsx` (C2)
- Análise: `TESTE Remotion SaaS/_ref_c/` e `_ref_d/` (ver topo); som: `*/stems/htdemucs/audio/`, `*/sound.json`, `*/sound_*.png`, script `_ref_c/tools/sound.py`
