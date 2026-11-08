# Neutral Flow — Variações «Lovio» (catálogo B)

**O que é:** um segundo catálogo de mecânicas e elementos, medido frame a frame no vídeo *AI SaaS Product Launch Video Ad | Lovio* (Zelios, o mesmo estúdio do NeuraFlow; YouTube `z9Zt8-PdZ4g`, 73,3 s, **25 fps**, 1920×1080, 1830 frames). **Não substitui** o [[SaaS Animation Style Neutral Flow]] (catálogo A): as 14 regras, a pilha de luz, as curvas e a grelha de compassos continuam a valer. Este ficheiro acrescenta **variedade** — mais formas de entrar, de passar de cena, de ilustrar uma frase — para que duas peças seguidas não usem a mesma meia dúzia de truques.

**Como usar:** ao planear uma peça, escolher os arquétipos do catálogo A *e* pelo menos 2 mecânicas deste catálogo (§4) e 1–2 elementos (§5) que ainda não tenham sido usados nas peças anteriores da mesma série. Todos os frames aqui são a 25 fps; a 30 fps converter por `f·30/25` (as durações em segundos mantêm-se).

Ficheiros de análise: `TESTE Remotion SaaS/_ref_lovio/` (vídeo, `frames_full/`, `frames_half/`, `sheets/` visão global, `dense/` folhas frame a frame, `work_track1.txt`/`work_track2.txt` bboxes por frame, `audio_frame_rms.npy`, `frame_diff.npy`).

---

## 1. Ficha e mapa de cenas `[medido]`

Estrutura: ad de 73 s conduzido por **voz-off** (sem BPM forte — a autocorrelação da banda grave não dá tempo estável; o ritmo vem das frases). A peça alterna **cenas claras** (fundo branco `#f3f3f3`: tipografia cinética, logo, geração) e **cenas escuras** (navy `#00092a`–`#060c18` com glow azul: produto em dispositivos, input, share). A luminância média salta 239 ↔ 16–80 nos cortes — o *flip de luminância* é ele próprio um recurso rítmico (§4 M17).

| # | Frames (s) | Cena | Fundo | Lum. média |
|---|---|---|---|---|
| 01 | 0–73 (0–2,9) | Tipografia cinética «You don't start with a *product*» | branco | 239 |
| 02 | 74–182 (3,0–7,3) | Footage (carro) → vira card de site; widgets montam à volta; bateria 29→60 % | footage → escuro | 72–84 |
| 03 | 183–230 (7,3–9,2) | Janela de chat (sidebar escura + chat claro) com o site em miniatura; câmara deriva; sai a encolher | cinza-claro + grelha | 162–228 |
| 04 | 231–284 (9,2–11,4) | Logo: ícone grande encolhe em 2 fases, desloca-se, letras chegam da direita | branco + grelha ténue | 239 |
| 05 | 285–427 (11,4–17,1) | Nuvens (footage): wordmark em vidro fosco → «you don't wait» (blur-in) → «for m✿mentum» → «Build something ✿lovio» + pill de input | footage claro | 166–195 |
| 06 | 428–509 (17,1–20,4) | O hero vira ecrã de um monitor 3D numa rocha; «You … *create it*» dos lados; monitor roda e corta | céu claro | 168–188 |
| 07 | 510–664 (20,4–26,6) | Escuro: botão «+», painel de input em perspetiva, cursor arrasta 2 chips de imagem, typewriter do prompt, clique em enviar | navy + glow | 27–51 |
| 08 | 665–720 (26,6–28,8) | «Geração»: glow radial ciano/magenta, linhas de código a correr, scanlines, **white-out** | escuro → branco | 44 → 115 |
| 09 | 721–792 (28,8–31,7) | Dashboard «Wind Power Generation» nasce do branco; raios cromáticos; contador 210→230+; título palavra a palavra | branco + raios azul/roxo | 191 |
| 10 | 793–836 (31,7–33,4) | O mesmo dashboard no monitor 3D; zoom-out k≈4 | navy + glow | 114 |
| 11 | 837–882 (33,5–35,3) | Telemóvel num ramo; órbita | navy | 44 |
| 12 | 883–942 (35,3–37,7) | Monitor numa secretária; **moldura encolhe → pill com anéis** → some | navy → branco | 89–125 → 239 |
| 13 | 943–1013 (37,7–40,5) | Letras «Lovio» chegam dispersas; «*generates*» com varrimento de cor; cursor-bloco substitui a palavra por `@/components…` | branco | 239 |
| 14 | 1014–1119 (40,6–44,8) | O texto vira editor de código (13 linhas a escrever-se) → **blur → blocos gradiente → retângulo → site** «Wind Power Generation» (colinas verdes) | branco → verde | 236 → 170 |
| 15 | 1200–1294 (48,0–51,8) | Site encolhe para card → **15 cards rebentam e orbitam** num anel inclinado → dispersam | branco | 217 |
| 16 | 1295–1331 (51,8–53,2) | «Need a *change?*» (pop + typewriter) → **a moldura branca desliza** e a cena escura entra pela esquerda | branco | 237 |
| 17 | 1332–1364 (53,3–54,6) | Site «Control your systems» num card 3D sobre navy com glow; badges de % | navy + glow azul | 128–184 |
| 18 | 1365–1529 (54,6–61,2) | **Modo editor**: seleções azuis, painel de propriedades, cursor arrasta texto (reflow ao vivo), troca de layout com **placeholder gradiente** | claro (site) | 161–188 |
| 19 | 1530–1637 (61,2–65,5) | Tablet num suporte; órbita; «working app / *ready to use*» à esquerda (o tablet desloca-se para a direita para dar lugar) | navy | 44–81 |
| 20 | 1638–1829 (65,5–73,2) | Botão «Share» → clique → **flor 3D** floresce e fecha → ícone → letras chegam → hold | navy | 14–52 |

Cortes duros (MAD > 4× mediana): f74, 183, 285, 510, 793, 837, 883, 1200/1205, 1332–1334, 1363–1365, 1530, 1638. Passagens suaves: 231 (janela encolhe e some), 428 (hero → ecrã: corte com a mesma composição), 664–721 (blur + glow + white-out), 943 (pill some → letras), 1092 (blur → blocos), 1295 (cards dispersam → texto), 1495–1500 (placeholder gradiente).

---

## 2. Paleta e luz `[medido]`

**Mundo claro** (tipografia, logo, geração): fundo `#f3f3f3` (não branco puro; textura de grelha ténue nas cenas 3–4), texto `#0c0c0c`, acento **azul** da serif itálica `#3b5bd8`→`#5aa0ff` (varia por palavra; «change?» `#4a5ae0`; «generates» chega ciano `#7fd6f5` e assenta azul), ícone do logo com gradiente vertical `#78c2f7` → `#0b2263`, wordmark `#0c0c0c` (chega azul, assenta escuro). Raios cromáticos da cena 9: bandas verticais `#698ee1` / `#86a2e9` sobre `#f1fdfe`. Anéis da pill (cena 12): `#e4e4fc` / `#cce4fc` / `#b4e4fc` (lavanda→ciano, 1–2 px). Blocos de geração (cena 14): `#b4b4fc` / `#cce4fc` / `#e4e4fc` (gradiente azul-ciano → lilás).

**Mundo escuro** (dispositivos, input, share, outro): navy `#00092a` no topo → `#203495` no centro-baixo (glow azul largo, como o beam do catálogo A mas vindo de baixo/trás do dispositivo), `#060c18` nas cenas finais, `#040811` no outro. Botão «+» `#242454`; alvo de drop roxo-azul `#0c3c84`→`#5a3cf0`; botão Share vidro `#0c243c` com rim ciano. Glow de geração (cena 8): centro `#c7b0fc` (lilás), anel `#3d79ba`, exterior ciano. Flor 3D: pétalas `#849ce4` / `#6c84cc` / `#5484cc` com veios lilás `#5454b4`. Logo no escuro: ícone `#1c71dd`, texto `#fcfcfc`.

**Acento verde** (só cena 2): pill «changing» `#84b46c` sobre card escuro `#dae5db`-translúcido — cor de marca do site fictício, não do sistema.

Luminância por cena: ver tabela §1. Cantos nas cenas escuras 5–15; nas claras 225–240 (a vinheta é quase nula no mundo claro).

---

## 3. Tipografia `[medido]`

| Papel | Fonte | Tamanho a 1080p | Cor | Notas |
|---|---|---|---|---|
| Frase cinética | sans (Inter-like) **400** | ≈108 px (cap 78 px) | `#0c0c0c` / branco no escuro | centrada, uma linha, recentra a cada palavra |
| Palavra-acento | **serif itálica** (Instrument Serif Italic-like) | igual à sans (≈110 px) | azul `#3b5bd8`–`#5aa0ff` | 1 por frase; escrita à máquina (M2) ou aparece com varrimento de cor (M4b) |
| Wordmark | sans **500**, lowercase | ≈96 px (x-height) | `#0c0c0c` / `#fcfcfc` | letras chegam azuis e escurecem |
| Título de site | sans **700** + serif itálica para a 2.ª palavra («Wind Power *Generation*») | 88 / 72 px | verde-escuro `#384332` / `#4a5ae0` | palavra a palavra, 4 f cada, 4–6 f entre |
| Código | monospace 400 | 18–22 px | `from` rosa `#e878e8`, strings ciano `#7fd6f5`, tags verdes `#6ac36a`, resto `#0c0c0c` a 60 % | 13 linhas em 90 f |
| UI (input, chips, botões) | sans 400/500 | 22–30 px | branco 0,9 / navy | igual ao catálogo A |
| Texto de apoio («create it», «ready to use») | serif itálica | 64 px | azul→lilás (gradiente por palavra) | ao lado do dispositivo |

Regra herdada: uma família sans; a serif itálica é **acento**, nunca corpo. No AMK: Inter + Instrument Serif Italic (OFL; no kit `public-fonts/InstrumentSerif-Italic.ttf`).

---

## 4. Mecânicas novas (M1–M18) `[medido]`

### M1 · Palavras sincronizadas com a voz (pop + recentrar + descartar)
Cena 1 (f0–73) e 16 (f1295–1331). A frase constrói-se **palavra a palavra ao ritmo da voz**: cada palavra **aparece inteira em 1 frame** (sem fade; bbox de 178 → 468 px de f8 para f9), a linha **recentra-se** com exp-out **sem soft start**: deslocamentos de x 712→645→628→616→608→602→595 (67, 17, 12, 8, 6, 7 px → 57 % no 1.º frame ⇒ k≈5 em 6–8 f). Pops medidos: «You» f0 · «don't» f9 · «start» f15 · «with» f27 · «a» f29 — 6–12 f entre palavras (≈ cadência da fala). Palavras antigas **descartam-se** também em 1 frame quando a frase muda de segmento («You» sai f22, «don't» f25, «start» f27 — a frase nunca passa de 3 palavras visíveis). Antes de a palavra seguinte chegar, a linha já **desliza** para o lado oposto (f5–8: «You» move −60 px e sobe 80 px em 8 f) — antecipação. Saída: a linha inteira **encolhe 13 % e sobe** em 14 f (f60–73, ease-in) até ao corte. Cena 16 igual: «Need» f1297 chega com **blur-in** (2 f), «a» f1298 azul → escurece em 6 f, depois M2.

### M2 · Typewriter com glitch e cursor
A palavra-acento escreve-se **1 carácter a cada 2 frames**, com um **carácter-glitch** (`#`, `&`, `>`, `*`, `)`) a ocupar o lugar da letra seguinte no frame ímpar antes de a letra certa chegar: `p` → `p#` → `pr&` → `pro` → `pro>` → `prod*` → `produ` → `produ)` → `produc` → `product` (f37→50, 7 letras em 13 f). O cursor é uma **barra fina com gradiente vertical** (azul → transparente, 3 px × 1 em) que aparece 2 f antes da 1.ª letra (f35) e some **6 f depois** da última (f56); não pisca. A linha **recentra-se a cada letra** (bbox 952→923 px em 5 letras). Na cena 16, «ch·cha·chan·chang·change·change?» a 1 char/2 f sem glitch.

### M3 · Substituição por cursor-bloco (texto vira código)
Cena 13 (f980–1013): um **cursor-bloco** alto (retângulo 22×80 px com gradiente azul-escuro→claro) aparece **entre** a palavra sans e a serif (f980); a partir de f985, a cada 2 f **apaga uma letra da serif à esquerda e escreve um carácter de código** no seu lugar: `generates` → `@nerates` → `@/erates` → `@/c·rates` → `@/co·ates` → `@/com·es` → `@/comp·s` → `@/comp` (f985→1013). Enquanto isso a palavra sans «Lovio» **descolora** para azul-claro (f993–999) — passou a ser uma string. Em f1014 a linha **salta** para dentro de um editor: aparecem as linhas vizinhas (`} from "@/components/…"`) e a frase é a linha 3. Leitura: a frase do narrador torna-se literalmente o código.

### M4 · Blur-in de palavras (a) e varrimento de cor (b)
(a) Cena 5 (f334–348): sobre footage, cada palavra chega **desfocada e translúcida** e foca em **4–6 f** (blur ≈12→0 px, opacidade 0,4→1), 4 f entre palavras («you» f334, «don't» f338, «wait» f340); a linha recentra como em M1. (b) Cena 13 (f960–968): «*generates*» aparece **ciano** (`#7fd6f5`) com um varrimento **da direita para a esquerda** e assenta azul (`#3b5bd8`) em 8 f — a cor viaja pela palavra.

### M5 · Ícone como letra + ícone transportador
Cena 5: «for m**✿**mentum» — o ícone do logo ocupa o lugar do «o» (f356), à escala da x-height, com o seu gradiente. Em f380–390 o ícone **sai do lugar do «o» e viaja** para a direita enquanto «Build something» chega, e assenta como ícone do lockup «✿lovio» (f392) — o ícone é o **elemento transportador** entre duas frases (nada corta).

### M6 · Montagem de letras do wordmark (2 variantes)
(a) **Da direita, uma por frame** (cena 4, f267–275): com o ícone já parado, as letras chegam pela ordem `o, i, v, o, l` (da última para a primeira), **1 letra por frame**, cada uma a deslizar da direita com tracking largo que **fecha** nos 5 f seguintes (largura do grupo 300 → 430 px enquanto as letras entram, depois estabiliza); chegam **azuis** (`#1c71dd`) e escurecem para `#0c0c0c` em ≈6 f. O mesmo no outro (f1758–1766, sobre navy: letras brancas chegam azul-claro).
(b) **Dispersa radial** (cena 12→13, f943–956): cada letra parte de uma posição diferente a 80–140 px do seu lugar (L em baixo-esq, o em cima, v em baixo-dir, i em cima-dir, o à direita), grande e desfocada, e converge em **8–10 f** com exp-out, stagger 1–2 f (L f943, o f945, v f946, i f948, o f950; todas no lugar f956). Depois a serif «*generates*» junta-se (M4b).

### M7 · Match-cut por escala
Cena 2→3 (f175–183): o card do site **encolhe com ease-in** (margens 3, 5, 8, 12, 17, 33, 48, 72 px em half-res — acelera até ao corte) e no corte **já está do tamanho da miniatura** que ocupa dentro da janela de chat da cena seguinte; o olho segue o objeto. Regra: a escala no último frame antes do corte = escala do slot na cena nova ±5 %.

### M8 · Footage → moldura + widgets
Cena 2 (f74–175): footage a ecrã cheio 30 f → **zoom-out** para um card com cantos (r≈40) e barra de browser (f100–110, k≈4), fundo escuro desfocado por trás; widgets **montam à volta**: título com **pill de destaque** verde sobre a palavra-chave («changing»), mapa à esquerda, badge de bateria à direita com **contador** 29 → 60 % (f150→170, k≈2,5), toggle «Unlocked», texto de apoio; cada widget entra por slide 20–30 px + fade em 8–12 f, stagger 4–6 f. O card inteiro tem uma **oscilação 3D** lenta (rotateY ±3°).

### M9 · UI → ecrã de dispositivo + câmara
Cena 5→6 (f427→428) e 9→10 (f792→793): o hero (site) passa a ser **o conteúdo do ecrã** de um dispositivo 3D **por corte** — a composição é a mesma, só muda a moldura e o fundo. Depois do corte a câmara faz **zoom-out k≈4**: altura do ecrã 501 → 448 px em 40 f (deltas 25, 7, 6, 4, 2, 2, 1…) e continua em creep ≤1 px/f; órbita lateral de 2–4° no mesmo tempo. Sequência de dispositivos: monitor (rocha, céu) → monitor (secretária, navy) → telemóvel (ramo) → tablet (suporte) — 40–60 f cada, sempre com o **ecrã a iluminar** o objeto. Quando entra texto ao lado (cena 19, f1566–1578), o tablet **desloca-se 230 px para a direita em 12 f** (in-out) para dar lugar.

### M10 · Cursor como ator
(a) **Arrastar e largar** (cena 7): chip de imagem entra pelo canto inferior direito grande e rodado (f531), o cursor-mão «agarra» (f541) e leva-o ao alvo «+» roxo que **pulsa** (f545–557, 26 px de deslocação/f no início, desacelera), larga (f559), o 2.º chip aparece ao lado em 2 f. (b) **Clicar** (f650, f1685): o botão **acende** 1 f e o cursor faz um *tap* (escala 0,85 em 2 f). (c) **Editor** (cena 18): retângulos de seleção 1 px azul `#84ccfc` em volta do elemento sob o cursor, **painel de propriedades** (Font/X/Y/W/H, formato) ao lado; arrastar a pega direita de um bloco de texto **reflui o parágrafo ao vivo** (f1380–1410: largura 75→20 px de X, 4–5 linhas → 6); arrastar um card (f1440–1495) e a **troca de layout** (M18). Cursor-mão 34 px, seta 28 px, sempre com sombra suave.

### M11 · Geração (duas variantes)
(a) **Glow + código + white-out** (cena 8, f664–722): o painel de input **desfoca e apaga** em 2 f; nasce um **glow radial** ciano no centro (rx 300 → 900 px em 30 f) com **núcleo lilás** e **scanlines horizontais**; linhas de código brancas semi-transparentes **escrevem-se e sobem** (nova linha em cima a cada ≈6 f, as antigas descem); a partir de f712 a exposição sobe até **branco total** em 8 f (f714–720); do branco **nasce a UI** por blur-in + exposição a descer em 8 f (f722–730). (b) **Código → blocos → UI** (cena 14, f1074–1124): o editor de código **desfoca** (f1078–1084), as linhas viram **barras gradiente** azul→lilás (f1082–1090: 5–8 barras 8–20 px, comprimentos variados — um *skeleton*), as barras **fundem-se num retângulo gradiente** que cresce (f1092–1110: 60 → 90 % do frame), o retângulo **ganha a UI por blur-in** (f1114–1124: título «Wind Power» a aparecer dentro do gradiente, blur 20 → 0) e o fundo verde entra por trás. Ambas duram ≈2 s.

### M12 · Contador
Números de UI **contam** com `1−e^(−2,5·t)`: bateria 29 → 60 % em 20 f; «210+ → 230+» em 36 f (f725–761) e «206+ → 230+» em 45 f (f1120–1165); começam a contar **antes** de o card terminar de entrar.

### M13 · Moldura → pill com anéis
Cena 12 (f915–943): o frame inteiro (a cena do monitor) **encolhe para dentro de uma moldura** com cantos que arredondam até virar **pill**: topo desce 1, 2, 16, 31, 49, 104, 145 px (f915–921, acelera), largura 1920 → ≈1000 (f926) → 250 (f942); ao mesmo tempo aparecem **2–3 anéis concêntricos** (outline 1,5–2 px, lavanda `#e4e4fc` → ciano `#b4e4fc`), deslocados e ligeiramente rodados, que **convergem** para a pill (f923–938) — como ondas invertidas; a pill some em 1 f (f943) e no seu lugar chegam as letras (M6b). A cena antiga fica **a viver dentro da pill** (o monitor continua a mexer) até desaparecer.

### M14 · Nuvem/anel de cards
Cena 15 (f1200–1294): o site encolhe para um card (f1200–1215, ×0,25, ease-out) e **15 cards rebentam de trás dele** (f1216–1230: componentes 12 → 17), distribuindo-se num **anel inclinado** (elipse rx≈700 / ry≈350 px, inclinação ≈25°, centro (960,540)) que **roda ≈1,2°/f** com paralaxe (cards da frente maiores e nítidos, os de trás 60 % e desfocados 2 px); os cards são sites diferentes (claros/escuros/coloridos). Em f1284–1294 o anel **abre e dispersa** para fora do frame em 10 f (ease-in), deixando o branco para o texto seguinte. É o carrossel do catálogo A com 2,5× mais elementos e a câmara de lado, não de cima.

### M15 · Push com a moldura
Cena 16→17 (f1327–1334): a cena branca **inteira** (com o texto) desliza para a direita e **encolhe ligeiramente com perspetiva** enquanto a cena escura entra pela **esquerda** (bbox azul x 41 → 339 px em 5 f) — um push horizontal com o frame a virar página (rotateY ≈8°). 7 f no total, corte «escondido».

### M16 · Share → flor → ícone → wordmark (outro)
Cena 20: botão «Share» (vidro, ícone + label) **pop-in com overshoot**: largura 87 → 162 → 209 → 225 → 225 → 215 → 197 px (f1640–1656; pico +14 % em f1646, assenta em 10 f — `backOut(2.2)`); cursor-mão vem de fora (f1658), clica (f1685: botão escurece 1 f); a flor 3D nasce do botão (f1686) e **floresce**: largura 126 → 394 (4 f) → 561 px (f1712), exp-out k≈5 em 26 f; **hold 8 f**; **fecha** (f1720–1736: 561 → 138 px, ease-in) e no último frame vira o **ícone do logo** (f1738, 184 px → 109 px em 12 f: fast then creep); ícone desliza para a esquerda (f1755–1757, 3 f) e as letras chegam (M6a); hold 55 f com o glow a respirar. A música acaba em f1785; a imagem fica.

### M17 · Flip de luminância como ritmo
Padrão claro/escuro por função: **claro = a voz** (frases, logo, geração, «Need a change?»), **escuro = o produto** (dispositivos, input, share). 8 flips em 73 s, todos em cortes ou em passagens de 5–8 f; nunca um fade a preto/branco lento, exceto o white-out da geração (que é um evento, não uma transição).

### M18 · Mudança de estado por placeholder gradiente
Cena 18 (f1494–1502): ao largar um elemento, a área de destino vira um **bloco gradiente azul→lilás** (`#84ccfc` → `#b4b4fc`) durante 4–6 f enquanto os elementos vizinhos **se reorganizam** (cards deslizam 200–300 px em 8 f, in-out), depois o bloco **revela** o conteúdo por blur-in 4 f. É a versão «editor» da transição A→B do catálogo A (fade-out 5 f + slide-up 36 px).

---

## 5. Elementos novos (catálogo)

| Elemento | Geometria `[medido]` | Material / notas |
|---|---|---|
| **Frase cinética** | 1 linha centrada, ≤3 palavras visíveis, cap 78 px | sans 400 escuro + 1 serif itálica azul |
| **Cursor de texto** | barra 3 px × 1 em, gradiente vertical azul→transparente; **bloco** 22×80 px gradiente | sem piscar durante a escrita |
| **Card de site (moldura)** | 1380×780 r40, barra de browser 44 px com 3 pontos | fundo desfocado por trás (blur 30), sombra larga 0,35 |
| **Pill de destaque** | altura 1,3 em, r=altura/2, cor da marca do site, texto branco | sobre uma palavra do título |
| **Badge de bateria / %** | 150×90 r20, número 40 px 600 + etiqueta 18 | vidro claro; contador M12 |
| **Toggle lock** | pill 200×60 com ícone cadeado + «Unlocked» | vidro escuro |
| **Janela de chat** | 1560×880 r24; sidebar 150 px escura `#111`, área clara; avatares 44 | derivação: a mensagem contém a miniatura do site |
| **Ícone do logo** | flor de 6 lóbulos com estrela de 4 pontas no centro; gradiente vertical `#78c2f7`→`#0b2263`; 534 → 120 px | usado como letra (M5) e como transportador |
| **Pill de input (escuro)** | painel 1120×420 r32 vidro `rgba(20,40,110,0.55)`, «×» no canto, chips 120×90 r16 com miniatura + nome, «+» 44 px, chip «Public», botão enviar ↑ 40 px | entra em perspetiva (rotateY −12° → 0) |
| **Chip de imagem** | 120×90 r16, miniatura + etiqueta 14 px por baixo | entra grande e rodado (−18°), assenta a 0° |
| **Alvo de drop «+»** | círculo 90 px gradiente roxo→azul, pulsa ±6 % a 12 f | glow 30 px |
| **Cursor-mão / seta** | 34 / 28 px, branco com contorno escuro 1,5 px e sombra 8 px | sempre visível sobre qualquer fundo |
| **Stream de código** | 13 linhas 20 px, numeração cinza, sintaxe (rosa/ciano/verde) | escreve-se 1 linha/6–8 f |
| **Glow de geração** | radial rx 900 ciano `#3d79ba` → núcleo lilás `#c7b0fc`; scanlines 4 px a 25 % | white-out em 8 f |
| **Blocos gradiente (skeleton)** | 5–8 barras 8–20 px, gradiente `#84ccfc`→`#b4b4fc`, blur 6 | fundem-se num retângulo |
| **Raios cromáticos** | 12–16 bandas verticais 40–120 px, azul `#698ee1` / lilás, blur 40, opacidade 0,35 | fundo das cenas 9 (claro) — versão clara do beam |
| **Dispositivos 3D** | monitor 1500×900 (ecrã 1400×800), telemóvel 380×780, tablet 1100×760; moldura preta 24 px, reflexo de ecrã no corpo | câmara: zoom-out k≈4 + órbita 2–4° |
| **Pill com anéis** | pill final 250×120; anéis 2–3, outline 2 px, rx +80/+160 px, rotação ±6° | lavanda→ciano |
| **Anel de cards** | 15 cards 240–420 px, elipse rx 700 / ry 350, inclinação 25°, ω 1,2°/f | paralaxe 0,6–1,0 |
| **Seleção de editor** | outline 1 px `#84ccfc` + 8 pegas 8 px; painel 300×420 r12 claro com campos | cursor seta |
| **Botão Share** | pill 200×70 r35 vidro navy `#0c243c`, rim ciano 1 px, ícone share 22 + label 24 | pop backOut(2,2) |
| **Flor 3D** | 8 pétalas, 560 px, azul-lilás com veios; floresce k≈5 em 26 f, fecha em 16 f | clímax do outro (o «magenta único» do catálogo A aqui é lilás) |
| **Wordmark (escuro)** | ícone 109 px + texto 96 px branco, gap 24 | chega azul-claro |

Quantidades: as cenas claras têm **1 elemento** (a frase, o logo); as escuras 1 herói + cursor + ≤3 chips/widgets; a cena 2 é a mais cheia (card + 5 widgets); o anel tem 15 cards — a exceção deliberada.

---

## 6. Transições (resumo)

| Passagem | Mecânica | Frames |
|---|---|---|
| Frase → footage | corte seco depois de a frase encolher 13 % (M1 saída) | 1 |
| Footage → card | zoom-out para moldura (M8) | 10 |
| Card → chat | match-cut por escala (M7) | 8 + corte |
| Chat → logo | janela encolhe e desloca-se, some; ícone grande aparece | 6 |
| Logo → nuvens | corte; wordmark reaparece em vidro fosco | 1 |
| Frase → frase (nuvens) | ícone transportador (M5) | 10 |
| Hero → monitor | corte com a mesma composição (M9) | 1 |
| Monitor → input | monitor roda 15° e corte para escuro com light-leak que apaga em 8 f | 6 + 1 |
| Input → geração → dashboard | blur + glow + white-out + blur-in (M11a) | 58 |
| Dashboard → monitor | corte (M9) | 1 |
| Monitor → pill → letras | moldura → pill com anéis (M13) → M6b | 28 + 13 |
| Texto → código → site | M3 + M11b | 33 + 50 |
| Site → anel → frase | M14 (rebentar, orbitar, dispersar) | 94 |
| Frase → escuro | push com a moldura (M15) | 7 |
| Site → editor | zoom-in 1,6× para dentro do site (k 4, 20 f) | 20 |
| Editor → tablet | corte | 1 |
| Tablet → share | tablet sai pela direita (12 f, ease-in), botão pop | 12 |
| Share → flor → logo | M16 | 100 |

---

## 7. Som `[medido]`

VO contínua (−14…−22 dB RMS por segundo), música de fundo suave, sem grelha de compassos audível — **o downbeat é a palavra**. Transientes > 6 dB (SFX) nos cortes e nos eventos: f6–8 (arranque), 78 (footage), 178 (chat), 274 (logo), 335 (nuvens), 461 (monitor), 567–571 (chips), 780–804 (dashboard/monitor), 842–866 (telemóvel/monitor), 951–952 (letras), 1072–1081 (código → blocos), 1102 (site), 1198–1199 (encolhe), 1307 (Need a), 1373 (editor), 1409–1427 (arrastos), 1461–1485 (troca de layout), 1499–1522 (placeholder), 1540 (tablet), 1595–1617 (texto), 1648–1649 (Share), 1698–1699 (flor), 1738–1747 (ícone), 1755–1756 (letras), 1782–1791 (fim). Mapeamento para o kit: pop de palavra → `blip_hi` −18 dB (1 por palavra, nunca por letra), typewriter → `click_type`, chip a largar → `pop_ui`, white-out → `riser_star` 20 f antes + `impact_intro`, flor → `swell_pad` + `sparkle`, letras → `blip_hi` em cascata 1 f.

---

## 8. Como combinar com o catálogo A (gramática)

1. **Frases do narrador em ecrã claro, produto em ecrã escuro** — alternar (M17). Numa peça AMK (chão preto) o «claro» é um **fundo cinza-claro `#E8ECF0`/`#f3f3f3`** só nas cenas de frase, ou, se a peça tiver de ser 100 % escura, inverter: frase branca sobre preto puro com o acento `#3EA1F9`, e o flip faz-se pela **luz** (beam a 0 vs beam a 1).
2. **Cena de frase = 1 compasso por 2–3 palavras** (a 120 BPM ≈ 6–8 f por palavra a 30 fps — é o que a cadência medida dá); a palavra-acento leva o typewriter (M2) e ocupa o último meio compasso.
3. Todo o herói de produto **vira ecrã de um dispositivo** pelo menos uma vez (M9) — e a saída do dispositivo é uma transição-objeto (M7, M13 ou M15), não um fade.
4. **Uma geração por peça** (M11) — é o clímax; escolher a variante a (glow + white-out) para produto «mágico», b (código → blocos) para produto «técnico».
5. **Cursor só quando a voz diz o verbo** («describe», «reorder», «share»): entra de fora, faz a ação, sai. Nunca cursor decorativo.
6. **Letras que se montam** (M6) só para o wordmark, no máximo 2× por peça (intro e outro).
7. **Anel de cards** (M14) para «muitos/variedade»; **contador** (M12) para «quantidade»; **placeholder gradiente** (M18) para «mudar/reordenar»; **ícone transportador** (M5) para ligar duas frases sem corte.
8. Continuam a valer: exp-out com o k do elemento (aqui: recentrar k 5 sem soft start; zoom-out de câmara k 4; flor k 5; contador k 2,5), câmara por spline, saídas a acelerar, hit 1 f antes do corte, métricas antes de «pronto».

---

## 9. Mapeamento para o AMK SaaS (paleta intacta)

| Papel (Lovio) | Lovio | **AMK SaaS** |
|---|---|---|
| Fundo claro das frases | `#f3f3f3` | `#E8ECF0` (branco AMK) — só em cenas de frase; ou preto `#030303` com beam apagado (ver §8.1) |
| Texto da frase | `#0c0c0c` | `#050E1D` sobre claro / `#E8ECF0` sobre escuro |
| Serif itálica (acento) | `#3b5bd8`–`#5aa0ff` | `#3EA1F9` (chega `#88C8FB`, assenta `#3EA1F9`) |
| Cursor de texto | azul→transparente | `#3EA1F9`→transparente |
| Ícone do logo (gradiente) | `#78c2f7`→`#0b2263` | `#88C8FB`→`#050E1D` (o glifo AMK, não a flor Lovio) |
| Wordmark a chegar | azul `#1c71dd` → escuro | `#3EA1F9` → `#E8ECF0` (escuro) / `#050E1D` (claro) |
| Navy dos dispositivos | `#00092a`→`#203495` | `#030303`→`#050E1D` com glow `#4369F8` a 0,5 por trás do dispositivo (é o beam vindo de baixo) |
| Botão «+» / alvo de drop | `#242454` / roxo→azul | `#050E1D`+ring `#88C8FB` / `#9B33F6`→`#4369F8` (gradiente-assinatura) |
| Glow de geração | ciano→lilás `#c7b0fc` | `#3EA1F9` → núcleo `#D132FB` (o **único** magenta da peça) |
| White-out | branco | `#E8ECF0` (ou `#88C8FB` a 0,9 se a peça for escura) |
| Blocos gradiente / placeholder | `#84ccfc`→`#b4b4fc` | `#88C8FB`→`#C9A6FF` (Aurora Lavender) |
| Raios cromáticos | `#698ee1`/`#86a2e9` | `#4369F8`/`#3E7BFA` a 0,35 sobre `#E8ECF0` (claro) ou `#3EA1F9` a 0,3 sobre preto |
| Anéis da pill | `#e4e4fc`→`#b4e4fc` | `#C9A6FF`→`#88C8FB` |
| Botão Share | `#0c243c` + rim ciano | `#050E1D` + rim `#88C8FB`, label `#E8ECF0` |
| Flor 3D | azul-lilás | `#3EA1F9`→`#C9A6FF`→`#D132FB` nos veios (clímax = magenta) |
| Pill de destaque verde | `#84b46c` | `#3EA1F9` com texto `#050E1D` (a pill clara do catálogo A) |
| Seleção de editor | `#84ccfc` | `#88C8FB` |

Regras AMK que se mantêm: um humor por peça; um magenta em 1.º plano (aqui: o núcleo da geração **ou** a flor, não os dois); Shadow Grid como chão nas cenas escuras; Inter + Instrument Serif Italic.

---

## 11. Métricas e aceitação para peças do catálogo B `[medido]`

As mecânicas B são **eventos** (pops de palavra, push com a moldura, white-out, burst de cards): medir jerk **por cena e fora das janelas de transição declaradas** (push ±5 f, geração/white-out, cortes), não a média global — a média global de uma peça B fica 1,5–2,5 por causa das transições e não diz nada. Valores de referência (`smoothness.py` a 480×270, original Lovio a 25 fps):

| Cena / mecânica | Original Lovio (jerk médio · máx) | Exemplo AMK `LovioVariations` |
|---|---|---|
| Frase sincronizada (M1/M2) | 0,22 · 1,26 (f0–73) · «Need a change» 0,45 · 3,3 | 0,58 · 3,07 (2 pops > 2,5) |
| Letras a montar (M6) | 0,24 · 1,08 | 0,43 · 1,41 |
| Dispositivo com câmara (M9) | 1,30 · 20 (tem um corte dentro) | 0,15 · 1,62 |
| Geração (M11a) | 2,79 · 13,9 (30 frames > 2,5 — é um evento contínuo) | 0,11 · 1,34 |
| Push com a moldura (M15) | 9,4 · 38 (7 f) | ≈10 · 35 (10 f) |
| Moldura → pill com anéis (M13) | 3,26 · 23,6 (f912–946) | 1,71 · 11,9 (`LovioVariations2` f128–156) |
| Anel de cards (M14) | 2,78 · 19,8 (f1200–1294) | 0,29 · 6,0 (burst em f14) |
| Código → blocos → UI (M11b) | 2,54 · 13,0 (f1074–1124) | 2,43 · 8,2 |
| Share → flor → logo (M16) | 0,83 · 11,0 (f1638–1775) | — (sem componente) |

Aceitação: cena de frase ≤0,6 com ≤1 pico > 2,5 por 3 palavras; cenas de produto ≤0,5; eventos comparados com a linha do original (push ≈9–10, geração ≈3, moldura→pill ≈3, anel ≈3, blocos ≈2,5 — uma versão AMK **abaixo** destes valores é boa; acima, procurar pops sem fade); flicker excl. cortes ≤1,7; luminância: claro 220–240, escuro 15–50, geração a subir até 230+ no white-out. Continua a valer o catálogo A para tudo o que não é evento.

---

## 10. Ficheiros

- Este catálogo: `Design Systems/SaaS Animation Style Neutral Flow/neutral-flow-variacoes-lovio.md`
- Cópia para a skill: `MagiKraft Skills/ahlec-brand-motion-system/references/neutral-flow-variacoes-lovio.md`
- Código (kit e `templates/neutral-flow/`): `remotion/components/KineticWords.tsx`, `Typewriter.tsx`, `LetterAssembly.tsx`, `Cursor.tsx`, `PillRings.tsx`, `Counter.tsx`, `ChromaticRays.tsx`, `GenerationBurst.tsx`, `DeviceMock.tsx`, `CardCloud.tsx`; fonte `public-fonts/InstrumentSerif-Italic.ttf` (+ `lib/fonts.ts` `SERIF_ITALIC`); exemplo `scaffold/src/examples/LovioVariations.tsx`
- Análise: `TESTE Remotion SaaS/_ref_lovio/` (ver topo)
