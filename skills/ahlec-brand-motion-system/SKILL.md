---
name: ahlec-brand-motion-system
description: 'Design system "AMK SaaS" — sistema visual e motion escuro da marca pessoal do Ahlec (AHLEC MagiKraft) para thumbnails, posts, stories, legendas, animações de vídeo (9:16 e 16:9) e como o logótipo se comporta dentro do sistema. Paleta escura AMK (chão preto, Dark Neon / Cinematic Tech / Dark Dashboard, blooms Aurora Mesh) + fundo Shadow Grid (reproduzido em código) + MECÂNICA DE ANIMAÇÃO do "SaaS Animation Style Neutral Flow" (medida frame a frame num vídeo SaaS de referência e reproduzida em Remotion até às métricas — pilha de luz volumétrica, curvas exp-out com soft start, câmara por spline, grelha de compassos, arquétipos de cena, catálogo de elementos, SFX, workflow de verificação — ver references/neutral-flow-mechanics.md e templates/neutral-flow/) + CATÁLOGO B de variações (references/neutral-flow-variacoes-lovio.md: tipografia cinética sincronizada com a voz, typewriter com glitch, montagem de letras, match-cut por escala, dispositivos, cursor como ator, geração glow/white-out, moldura → pill, anel de cards, flip de luminância) + CATÁLOGO C de variações em 2 sub-estilos (references/neutral-flow-variacoes-c-neon-aurora.md — C1 «Neon roll-call»: orbes + eclipse claro→escuro, badge néon com troca de rótulo por letras, tiles com glints, blur-out, ícone que tranca + contornos-eco, anel de estrelas + cometa, contador chrome com barra em loop; C2 «Aurora product»: dispositivo sobe, leque de cards, sequência de chat, pan em sino, tilt-through match cut, estrela que gira e vira palavra, arco aurora). Sistema irmão: ahlec-glass-motion-system (AMK Glass, claro/translúcido). Usar sempre que o pedido for para produzir algo visual ou uma animação para a marca pessoal do Ahlec, incluindo animações que ilustrem o que é dito num vídeo — não para clientes (KW, imobiliário, etc., que têm os seus próprios agents).'
---

# Sistema de Marca — AMK SaaS

Design system escuro para toda a marca pessoal do Ahlec: thumbnails, posts, stories, animações de vídeo, legendas de story, e o comportamento do logótipo. É um de dois sistemas irmãos — o outro é [[MagiKraft Skills/ahlec-glass-motion-system/SKILL|ahlec-glass-motion-system]] (**AMK Glass**), claro e translúcido, para peças de tom mais leve/Apple-style. Escolher **um por peça**, nunca misturar os dois. Nenhum dos dois é para clientes — [[editor-imobiliario]], [[editor-kw-palestras]] e os outros agents de cliente têm os seus próprios sistemas.

**AMK SaaS vs AMK Glass:** AMK SaaS é o default — cósmico, denso, chão preto. AMK Glass é para conteúdo mais leve/produto/Apple-style, fundo claro e vidro fosco (ver [[MagiKraft Skills/ahlec-glass-motion-system/SKILL|ahlec-glass-motion-system]]).

Fonte: [[Animation Styles]] → callout **SaaS Animation** (mecânica medida em 570+342 frames de dois tutoriais de referência) + fundo `1 Shadow Grid` (medido diretamente do ficheiro do Ahlec, não de uma referência genérica) + **[[Design Systems/SaaS Animation Style Neutral Flow/SaaS Animation Style Neutral Flow|SaaS Animation Style — Neutral Flow]]** (estilo neutro medido frame a frame em 601 frames de um vídeo SaaS profissional e reproduzido em Remotion até às métricas; é a mecânica de animação deste sistema — cópia em `references/neutral-flow-mechanics.md`, código em `templates/neutral-flow/`).

## 0. Como este sistema se lê — a divisão que importa

**Claude Design (Adobe Express) não executa animação.** Confirmado no `create_visual_design_express_skill`: JS, `@keyframes`, transições e `mix-blend-mode`/animação não correm — a importação achata tudo a **um frame estático**. PPTX, PDF e imagem fazem o mesmo. Por isso este sistema separa-se em duas camadas que partilham os mesmos tokens (cor, tipografia, fundo, componentes) mas se consomem de forma diferente:

| Camada | Onde corre | O que produz | Secção |
|---|---|---|---|
| **Visual** | Claude Design / Adobe Express | thumbnails, posts, stories, frames-chave, lockups de logo — tudo estático | §1–4 |
| **Motion** | Remotion (ou HyperFrames) | vídeo real: entradas, transições, contadores, o fundo Shadow Grid a derivar | §5 |

Um frame de um card SaaS a meio da entrada **é** uma thumbnail válida — os dois mundos usam a mesma imagem, só que um pára o relógio e o outro deixa correr. Ao pedir uma thumbnail ou post, usa a camada Visual; ao pedir um vídeo ou animação, usa a Motion.

## 1. Paleta — três humores, um chão

Chão partilhado por todos: fundo **preto puro** `#030303`–`#0A0A0F` (nunca cinzento), branco `#E8ECF0` para texto e traço fino, glow sempre **da cor do elemento**, nunca branco neutro genérico.

Por cima do chão, escolhe **um** dos três humores (tabela A do [[Animation Styles]]) por peça — não é preciso comprometer-se a um só para sempre, tal como o sistema de thumbnails usa cor por função:

| Humor | Acento | Energia | Quando usar |
|---|---|---|---|
| **Dark Neon** | azul `#3EA1F9` → magenta `#9B33F6`, glassmorphism | cósmico, premium | motion graphics, reveals, conteúdo de posicionamento |
| **Cinematic Tech** | navy `#050E1D` + UI hero flutuante | reveal de produto/serviço | quando o vídeo mostra "o produto" (a própria edição, o processo) |
| **Dark Dashboard / Bento** | preto `#0A0A0F` + grid de dados | data-driven, prova social | métricas, antes/depois, contadores de resultado |

Gradiente-assinatura quando precisares de um: **azul → magenta na diagonal**, medido nos glifos de referência: `#4369F8` → `#9B33F6`. Blobs de apoio: `#2F9FFC` `#88C8FB` `#D132FB` `#E389FB`.

### Aurora Mesh — tons extra para o fundo

O chão preto por si só fica vazio em peças mais longas ou mais cheias de texto. **Aurora Mesh** é um bloom de cor extra, opcional, que se injeta no fundo por baixo do campo de estilhaços — nunca substitui o chão preto, só o enche. Referência: o gradiente mesh vívido do "Liquid Glass" da Apple (rosa/violeta/azul desfocados) — importa-se a **paleta**, não o vidro (isso é o [[MagiKraft Skills/ahlec-glass-motion-system/SKILL|ahlec-glass-motion-system]]).

| Tom | Hex | Papel |
|---|---|---|
| Aurora Pink | `#FF3EA6` | quente, o mais saturado — usar com moderação, 1 bloom por peça no máximo |
| Aurora Violet | `#8B3FFA` | ponte entre o pink e o magenta já existente do Dark Neon |
| Aurora Blue | `#3E7BFA` | ponte entre o pink e o azul já existente |
| Aurora Coral | `#FF7A5C` | contraste quente, só como acento pontual (ex. um badge, nunca um bloom grande) |
| Aurora Lavender | `#C9A6FF` | highlight suave, para bordas/glow em vez de branco puro quando a peça já leva Aurora |

**Como aplicar:** 2–3 blobs radiais muito desfocados (`blur` ≥ 80px), opacidade **8–18%**, posicionados nos cantos ou fora do centro — nunca atrás do texto principal. Sobre eles continua o campo de estilhaços e a malha de pontos normalmente; o preto do chão mantém-se dominante, o bloom só quebra o vazio. Combina com qualquer um dos três humores (o glow dos elementos em primeiro plano continua a seguir a cor do humor, §1 — o Aurora Mesh é só do fundo). Não usar em peças que já têm muito conteúdo/dados na tela — aí o vazio é funcional, não um problema.

### Papéis de luz e material → tokens AMK (para animação)

A mecânica de animação (§5) vem do Neutral Flow, cujas receitas estão escritas com a paleta do vídeo original. **Aqui a paleta é a do AMK** — este é o mapa de substituição (em código: `templates/neutral-flow/remotion/lib/theme-amk.ts`). Os valores de opacidade, tamanhos e envelopes das receitas mantêm-se; só a cor troca.

Valores escritos para o humor **Dark Neon**; `#050E1D` e `#0A0A0F` são chão partilhado e não contam como humor. **Cinematic Tech:** core do beam `#4369F8`, acento claro `#98CEFC` (≈`#88C8FB` na pilha), navy do chão mais presente. **Dark Dashboard:** luz a ≤0,6 de intensidade, sem Aurora, grelha de dados por cima. O resto da pilha é igual nos três — a escolha do humor muda o acento, não a mecânica.

| Papel na receita | Neutral Flow | **AMK SaaS** |
|---|---|---|
| Chão (gradiente base + grelha) | `#060713` → `#010307` → `#0a2650` + grelha 2 px a 5 % | **Shadow Grid** (§3): preto `#030303`–`#0A0A0F` + malha de pontos + estilhaços; banda inferior iluminada pelo horizonte `#050E1D` (Cinematic Tech); não adicionar outra grelha |
| Beam core / hot / edge | `#1d79c2` / `#cfeaff` / `#0b2a4e` | `#3EA1F9` / `#88C8FB` / `#050E1D` (ou `#4369F8` a ≤30 %) |
| God rays | `#3f9be6` | `#3EA1F9` a 0,3–0,55 |
| Névoa de teto / tinta ambiente | `rgba(30,111,191,0.55)` / `rgba(24,52,110,0.16)` | `rgba(62,161,249,0.5)` / `rgba(67,105,248,0.12)` |
| Horizonte: rim / glow / banda violeta / disco | `#b9dcff` / `#3b7fe6` / `#5b46c9` / `#1a3f95` | `#C9A6FF` (Aurora Lavender; `#88C8FB` se a peça não leva Aurora) / `#3E7BFA` (Aurora Blue) / `#8B3FFA` (Aurora Violet) / `#050E1D` levantado com `#4369F8` a 40 % |
| Partículas | `#6aa0ea` | os **estilhaços do Shadow Grid** já são as partículas de campo — só acrescentar a faixa densa junto ao horizonte, em `#88C8FB` |
| Vidro (painel, cards, pills) | azul `#2f66ad` → navy `#171f4c`; highlight `#93dbf5` | topo `#4369F8` a 45–55 %, base `#050E1D` a 85–95 %, highlight 1–2 px `#88C8FB`, ring `#E8ECF0` a 10–16 % |
| Esfera de vidro / medalhão | tint `#5aa0ff`, rim branco-azul | radial `#2F9FFC` → `#4369F8`, rim `#88C8FB`, glow `#2F9FFC` |
| Pill de input (gradiente horizontal) | navy → cinza-azul → `#349af4` → navy | `#050E1D` → `#E8ECF0` a 35 % (zona do texto) → `#3EA1F9` (54 %) → `#4369F8` → `#050E1D` |
| Pill de ação clara (Ask AI) | `#a9e2f2` + texto navy | `#88C8FB` + texto `#050E1D` |
| Wordmark / títulos (gradiente) | branco → `#b9dcfd` / `#6f9fe0` | `#E8ECF0` → `#88C8FB` (suave) ou `#3EA1F9` (forte) |
| Texto de UI / apoio / mudo | `#f2f6ff` / `#aeb7d6` / `#8d95bd` | `#E8ECF0` / `#E8ECF0` a 60 % / a 45 % |
| Wordmark gigante desfocado (fundo) | azuis `#2c6fa8` → `#46acff` → `#1b4194` | `#4369F8` → `#3EA1F9` → `#4369F8` |
| Acento único (janela-estrela) | magenta `#c669d1`, claro `#d871da`, lavanda `#a677dd`, bordo `#9a33ab` | bordo `#9B33F6`, corpo `#D132FB`, claro `#E389FB`, lavanda `#C9A6FF`; pico de ecrã inteiro pode usar Aurora Pink `#FF3EA6` a ≤18 % — continua a ser **o único** elemento magenta/pink da peça |
| Branco de passagem (estrela → logo) | `#fafdfe` | `#E8ECF0` |

**Aurora Mesh vs luz:** os *blobs* Aurora Mesh (8–18 %, decoração opcional, restrita a peças com pouco conteúdo) são uma coisa; os *tokens* Aurora usados na luz (rim `#C9A6FF`, glow `#3E7BFA`, banda `#8B3FFA`) são outra e estão sempre permitidos — uma cena com horizonte não "leva Aurora" por isso. As camadas 03–09 da pilha de luz (§5.2) são *luz* e usam as intensidades do Neutral Flow (névoa 0,5, glows de emissor 0,7–1) — não se aplicam a elas os 8–18 %.

**Regra do magenta em movimento:** a regra 13 do Neutral Flow (um acento magenta por peça) lê-se no AMK como *um único elemento magenta em primeiro plano* — o clímax (janela-estrela ou equivalente), uma vez por peça. O gradiente-assinatura azul→magenta e os blooms Aurora são fundo/decoração e não contam; numa peça Dark Neon que já use o gradiente-assinatura em primeiro plano, omitir o pico Aurora Pink do clímax para não duplicar o acento. Sem clímax, a peça é 100 % azul.

O `Beam` tem prop `hot` (topo do núcleo), o `Horizon` tem `discMid/discDeep/discEdge`, a `GlassSphere` tem `gradient`, o `Wordmark` tem `text`/`direction` — todos com os valores AMK já em `theme-amk.ts`.

## 2. Tipografia — uma família, dois papéis

Regra herdada do sistema de thumbnails (mesma lógica, sistema irmão): **uma fonte só, o espaçamento não varia, a cor é que muda.**

| Papel | Fonte | Uso |
|---|---|---|
| Display / heading | **Inter**, peso Black/Bold | títulos, headlines, contadores |
| Corpo / label | **Inter**, peso Regular/Medium | texto de apoio, descrições |
| Dados / timestamp / etiqueta técnica | **ui-monospace** (SF Mono no Mac) | métricas, timecodes, labels tipo "PORMENOR A", contadores em bruto |

Inter é o que já está no resto da tua identidade (sistema de thumbnails, website). O par com monospace é o que a Dark Dashboard / Bento pede — é o vocabulário visual de produto de dados, e reforça o humor "SaaS" sem precisar de uma segunda display face. **Isto é o default, não um facto** — se preferires trocar por outra já instalada (Barlow Condensed, por exemplo, que também já usas), o resto do sistema não depende da escolha exata, só de ser **sempre a mesma**.

**Escala e tracking em animação (do Neutral Flow, `references/neutral-flow-mechanics.md` §2):** wordmark 128–144 px (cap 93–105) a 1080p; palavra-herói 169 px; H1 72; H2/tagline 48; input 34; etiquetas e bullets do chat 30 (lh 35); corpo de card 19 (lh 1,5); títulos de card 32/28/21/18; UI 13–18; etiqueta de secção 11 maiúsculas. "O espaçamento não varia" lê-se **por papel**: wordmark +0,065 em, tagline +0,045 em, H1/hero −0,01 em, UI 0 — fixo dentro da peça. Todo o texto grande com gradiente (`background-clip: text`), line-height 1 em linhas únicas. **Pesos em animação:** a escala do Neutral Flow usa 500 (wordmark) / 700 (herói, H1) / 600 (sub) / 400 (corpo) — é o que o kit carrega (`lib/fonts.ts`, `public/fonts/Inter-{Regular,Medium,SemiBold,Bold}.woff2`). O Inter Black 900 em caixa alta fica para as peças estáticas (thumbnails, posts); para o usar em vídeo, acrescentar `Inter-Black.woff2` a `public/fonts/` e registá-lo em `fonts.ts`.

## 3. Fundo Shadow Grid — reproduzido em código

Nunca o ficheiro `.mp4` (fica preso a `/Volumes/Ex Projects`, a 1080×1920, 30fps). Sempre gerado — dá qualquer resolução, corre em qualquer motor, e é editável.

**Medido diretamente de `1 Shadow Grid/HD/Black/Black BG 1 (HD).mp4`** (frame @3s, 1080×1920 nativo):

- **Malha de pontos:** período **~17px horizontal × ~10px vertical**, branco a **~5% de opacidade** sobre preto quase absoluto. É textura ambiente, não desenho — quase invisível de perto, dá densidade ao preto de longe.
- **Campo de estilhaços (triângulos):** **57 por frame** em 1080×1920. Tamanho (raiz da área) entre **1.7px e 28px**, mediana 13.5px. Brilho entre **26 e 131** (de 255), mediana 56 — a maioria cinzenta discreta, poucos quase brancos.
- **Deriva:** lenta, maioritariamente para cima (ângulo 250°–290°), com **paralaxe por tamanho** — estilhaços maiores = mais próximos = mais rápidos e mais opacos.
- **Vinheta:** radial, pesada nos cantos, quase invisível no centro (o preto já lá está perto do zero).

Ficheiros prontos, com este dataset já embutido — não recriar do zero:

- `templates/shadow-grid-static.html` — 1 frame, 1080×1920, pronto para Claude Design/Adobe Express
- `templates/shadow-grid-static-16x9.html` — o mesmo dataset, x/y escalados proporcionalmente (`x·1920/1080`, `y·1080/1920`) para 1920×1080. **Não é o vídeo rodado** — é o mesmo gerador aplicado a outro canvas, por isso a distribuição continua uniforme.
- `templates/ShadowGridBackground.tsx` — componente Remotion com a deriva a animar, parametrizado por `canvasWidth`/`canvasHeight` (usa a mesma regra de escala acima, calculada em runtime)
- `assets/shadow-grid-reference-frame.png` — o frame original capturado, só como referência visual, nunca para usar diretamente numa peça

**Regra ao gerar novas variações** (por exemplo, mais estilhaços para uma peça mais "cheia"): manter a densidade de ~2.75×10⁻⁵ estilhaços/px² e a mesma curva de tamanho→brilho→velocidade — não distribuir tamanho, brilho e velocidade de forma independente, senão perde-se a sensação de profundidade por paralaxe.

**Em vídeo (§5):** o Shadow Grid é a camada 01–02 da pilha de luz do Neutral Flow (chão + textura). Por cima dele vão, pela ordem, beam → névoa de teto → tinta ambiente → god rays → (partículas = os estilhaços; só a faixa do horizonte é extra) → horizonte → glows de emissor → conteúdo → vinheta → grão 0,03. A deriva dos estilhaços continua linear; o resto da luz tem envelopes próprios. `ShadowGridBackground` tem `vignette` (pôr `false` quando a pilha leva a sua própria `<Vignette>`, senão fica vinheta dupla) e `shardGlow` (desligar se um render longo abrandar ou piscar); a malha é fixa a 17×10 px em qualquer canvas (igual ao template HTML 16:9). Banda inferior iluminada pelo horizonte: `linear-gradient(180deg, transparent 60%, #050E1D 100%)` a 0,6 — só em cenas com horizonte (logo, reveal, outro); inserts de meio de vídeo não levam horizonte nem banda.

## 4. Componentes visuais (frames estáticos)

Para thumbnails, posts e stories em Claude Design/Adobe Express — a HTML segue as regras do `create_visual_design_express_skill` (canvas fixo, `data-canvas-width/height`, sem animação/JS, imagens embutidas em base64).

**Card / badge:** cantos suaves, fundo `rgba(255,255,255,0.04)` sobre o Shadow Grid, borda 1px `rgba(255,255,255,0.08)`, glow exterior da cor do humor escolhido (§1). É o "estado de repouso" do que em vídeo entra a animar (§5.B3) — usa exatamente o mesmo visual, só que parado.

**Contador / métrica:** número grande em Inter Black, fill em gradiente vertical branco→acento (nunca cor lisa), barra de progresso por baixo com o mesmo gradiente. Etiqueta em monospace por cima, pequena, maiúsculas.

**Glow:** sempre da cor do elemento em cima dele, nunca branco genérico — regra herdada de B4 do [[Animation Styles]] e vale tanto em frame parado como em movimento.

### Zonas seguras

| Formato | Canvas | Zona segura (corte de grelha/preview) |
|---|---|---|
| 9:16 (Reels, Stories, Shorts) | 1080×1920 | conteúdo essencial entre y=240 e y=1680 (corte 3:4 do IG) |
| 16:9 (YouTube, apresentações) | 1920×1080 | margem de 60px em todos os lados para title-safe |
| 1:1 (posts de feed) | 1080×1080 | margem de 60px; testar sempre como aparece cortado a 4:5 no feed |

### Como cada aplicação deriva do sistema

- **Thumbnail de vídeo:** um frame estático do humor+fundo escolhidos, com um card/contador do sistema por cima do ponto de maior impacto do vídeo. *(Nota: isto é um sistema separado do que já foi discutido para thumbnails de Reels com cara-à-câmara — esse vive nas notas de identidade visual em produção, ver Notion. Este sistema serve os vídeos motion-first: reveals, explicativos, dados.)*
- **Post de feed:** o mesmo vocabulário de card/contador, canvas 1080×1080 ou 1080×1350.
- **Story:** 1080×1920, texto e CTA sempre dentro da zona segura acima; se levar legenda, usar a fonte e cor do sistema (§2), nunca uma fonte de story genérica do telemóvel.
- **Logótipo dentro do sistema:** este ficheiro não desenha o logótipo (isso é uma sessão de design à parte) — mas define como qualquer logótipo se comporta aqui: fundo sempre Shadow Grid ou preto sólido, nunca claro; se o logótipo tiver uma versão com glow, a cor do glow segue o humor da peça (§1), não uma cor fixa própria do logo.

## 5. Mecânica de movimento e luz — Neutral Flow aplicado ao AMK

**Regra de ouro:** qualquer animação para a marca — em especial as que ilustram o que se diz num vídeo — é construída com a mecânica do **SaaS Animation Style Neutral Flow**, com a paleta AMK (§1, tabela de mapeamento) e o Shadow Grid como chão (§3). A mecânica completa, com todos os números medidos, vive em **`references/neutral-flow-mechanics.md`** (ler antes de animar; ~80 KB) e o código pronto em **`templates/neutral-flow/`** (importar, não reescrever). O que segue é o resumo operacional — chega para não errar, não substitui a referência.

### 5.1 O que não se negocia

1. **Um herói por cena, centrado** (x 960±5 a 1080p); até 3 satélites a 0,4–0,6 de opacidade ou desfocados 2–6 px.
2. **Entradas = decaimento exponencial** `1−e^(−k·x)` normalizado, com **soft start de 1–3 frames** (`softExpOut(k, 0.06–0.12)`), k por elemento: painel/card grande **6,3** · anel **≈4** · cards em cascata **8–10** · pill/estrela **4** · títulos, botões, linhas de UI **4–5** · ambiente lento **3** · palavra-herói **2,5** · UI de produto reativa **3,2**. Nunca `Easing.out(cubic)`.
3. **Câmara = spline C¹** (`spline()` Fritsch–Carlson) sobre uma tabela por frame (medida, ou desenhada com o perfil: exp de entrada k 6,3 → settle → **creep** −0,5 px/lado/f → aceleração para o corte). Nunca keyframes lineares nem sine-in-out encadeados.
4. **Grupos já visíveis deslocam-se com in-out medido** (`easeFromSamples`: pico ao 4.º frame, cauda longa, depois creep −0,4…−0,6 px/f). Só entradas são exp-out.
5. **Nada pára:** creep residual (−0,4…−0,9 px/f ou flutuação ±6 px em seno) depois de cada settle; overshoot <2 %, sem bounce (única exceção: uma pill com `backOut(2,2)` + flash).
6. **Saídas aceleram** (`cubicIn`, 8–16 f) com fade só parcial (0,5–0,55); o corte acaba o plano. Ocultação em vez de fade quando o herói novo tapa o antigo.
7. **Cortes duros só em downbeats; um evento grande por compasso**; cenas de 1 / 1,5 / 2 compassos; hold ≈ meio compasso depois de o herói pousar; hit de SFX 1 frame antes do corte.
8. **Texto entra por 6 modos** (fade quad-in + blur leve para o logo; slide-up 14–29 px + fade para títulos; wipe esq→dir para subtítulos e linhas; typewriter linear 1 char/frame com cursor; blur-in 32→0 px para o logo do outro; base ténue + wipe de brilho para taglines). Corpo e etiquetas chegam tarde e ténues (≤0,55–0,6).
9. **Vidro sem `backdrop-filter`**, sem `drop-shadow` em SVG animado; render `swangle`; blur só em bounding boxes; grão 0,03.
10. **Verificar por métricas** (jerk, flicker, luminância por cena) antes de "pronto".

### 5.2 Pilha de luz (de baixo para cima) — valores AMK

| # | Camada | Componente | Valor de partida (1080p) |
|---|---|---|---|
| 01–02 | Chão + textura | `templates/ShadowGridBackground.tsx` | preto `#030303`–`#0A0A0F`, malha 17×10, 57 estilhaços; banda inferior `#050E1D` |
| 03 | Beam | `templates/neutral-flow/remotion/components/Beam.tsx` | x 960–1000, topWidth 300–440, bottomWidth 1250–1500, blur 50–70, core `#3EA1F9`, edge `#050E1D`; intensidade 0,45–1,1 por cena, com envelope (apaga 1→0,25 quando o herói chega ao topo, reacende 0,25→0,7 no push-back) |
| 04 | Névoa de teto | `Glow` | (975,120) 900×620 `rgba(62,161,249,0.5)` op 0,5, sem blur |
| 05 | Tinta ambiente | `AbsoluteFill` | `rgba(67,105,248,0.12)` op 0,5–1 (cantos a 8–13 lum) |
| 06 | God rays | `Rays.tsx` | 4 feixes `#3EA1F9`, intensity 0,3–0,55, sway 18 px, blur 26 só na bbox, frame **global** |
| 07 | Partículas | (estilhaços do Shadow Grid) + `Particles` | só a faixa densa junto ao horizonte: 90–140 pontos 1–2,8 px `#88C8FB`, twinkle 0,7 |
| 08 | Horizonte | `Horizon.tsx` | rim 4–5 px `#C9A6FF`, glow `#3E7BFA`, violeta `#8B3FFA`, disco `#050E1D`+`#4369F8`@40 %; intro r 620 a subir com a curva do herói, outro R 3800 a entrar por baixo com creep até ao último frame |
| 09 | Glows de emissor | `Glow` | atrás do herói, na cor do humor (`#3EA1F9`/`#4369F8`), rx 600–980, op 0,7–1, blur ≤16; luz **dentro** de um cilindro 3D vai entre os cards traseiros e dianteiros |
| 10 | Conteúdo | | vidro AMK (§1 tabela), glow da cor do elemento |
| 11 | Vinheta | `Vignette` | 0,5–0,7 (0,85 durante um push-back) |
| 12 | Grão | `Grain` | 0,03, seed por frame |

Calibrar por **grelha de luminância 3×6** contra uma referência ou entre versões (`templates/neutral-flow/tools/light_cmp2.py`): célula com >10 lum de diferença = um elemento de luz a corrigir; média por cena a ±3 lum. Alvos típicos do estilo (0–255): cena de logo ≈38, painel ≈51, chat escuro ≈16–28, cards ≈24, clímax ≈46, outro ≈51.

### 5.3 Curvas — importar, não reescrever

```ts
import { softExpOut, saasOut, uiOut, spline, smooth, cubicIn, backOut, moveInOut, tween, progress } from "./lib/motion";   // templates/neutral-flow/remotion/lib/motion.ts
import { easeFromSamples, CHAT_MOVE_1, CHAT_MOVE_2, SPHERE_RISE } from "./lib/measured";
// saasOut = softExpOut(6.3, 0.08) (motion graphics) · uiOut = softExpOut(3.2, 0.08) (UI reativa) · tween/progress já usam softExpOut(6.3, 0.08) por defeito
// entrada: progress(f, start, start + 28, softExpOut(k, 0.08))     câmara: spline(f, TABELA)
// grupo já visível: progress(f, a, b, moveInOut(0.25)) — ou CHAT_MOVE_1 / easeFromSamples(amostras próprias)     saída: progress(f, a, b, cubicIn)
```

`keyframes()` (linear por defeito) e `sineInOut` existem no ficheiro por compatibilidade — não os usar em câmara/posições. Tabelas de exemplo (câmara do painel, horizonte, raio do anel, rim do outro, eases de grupo) em `templates/neutral-flow/remotion/lib/measured.ts`; ao desenhar uma tabela nova, suavizar (Savitzky-Golay 7–15) antes da spline. **fps:** todas as janelas do estilo estão em frames a 30 fps; se o vídeo alvo for 25/50/60 fps, manter os tempos em segundos e converter (`f·fps/30`), SFX incluídos.

### 5.4 Gramática de cena (para ilustrar o que se diz num vídeo)

1. **Grelha de compassos.** Com música: medir o BPM → `BAR = 60/BPM·4·fps` frames → downbeats. **Sem música (insert sobre fala):** escolher um BPM que divida a duração em compassos inteiros (a 30 fps, 120 BPM → BAR 60 f = 2 s; 8 s = 4 compassos) ou pôr os downbeats nas sílabas tónicas da fala; f0 é o 1.º downbeat. **Um evento grande por compasso** — evento grande = entrada ou saída de um herói, corte, mudança de estado; deslocações de grupo, texto secundário e satélites são preenchimento e podem encavalitar no compasso seguinte.
2. **Inserts curtos (o caso normal aqui):** sem logo nem outro, ecrã cheio 1920×1080 opaco (nunca alpha — regra «animações sempre com fundo»), herói a x 960; PiP/sobreposição só a pedido. Estrutura mínima: uma `<Sequence>` por cena; 1 compasso por evento; passagem por câmara contínua ou um corte único no downbeat central; sem horizonte nem banda inferior (só cenas de palco: logo/reveal/outro). `templates/neutral-flow/remotion/scaffold/src/AmkStage.tsx` é um insert de 4 compassos pronto a adaptar (herói + esfera + texto, pilha de luz completa, SFX em modo `sfx`). **Exemplos reais, verificados por métricas** (teste «3 coisas antes de publicar», 2026-09-14) em `scaffold/src/examples/`: `TresCoisas.tsx` (hook: orbital «3» → push-back + trio de cards k 8 → checks em stagger → pill «Publicar» com backOut + 3 satélites) e `Coisa.tsx` (uma peça de 8 s por item: reveal de painel k 6,3 com cascata do título **ainda durante o settle** (medalhão f18, H1 f21, sub f23 — um card vazio mais de meio segundo lê-se como erro), linhas em wipe, checks + barra `1−e^(−2,5t)`, «próximo» = card seguinte a espreitar ou pill). `Root.exemplo-3-coisas.tsx` mostra o registo com props (textos trocáveis). Uma frase-gancho com N itens = 1 hook + N peças de 8 s, não um hook esticado.
3. **Arquétipos** (referência §6.4), com o comprimento em compassos: **logo em palco** (pickup) · **reveal de painel** (1,5: sobe k 6,3, cascata do título com 2–7 f entre passos, settle + creep) · **push-back** (0,5: in-out assimétrico, DoF, periféricos atrás) · **painel flutuante + mudança de estado** (1,4: fade-out 5 f → fade-in + slide-up 36 px em stagger 4–5 f) · **orbital / palavra-herói** (1: anel fecha k ≈4, arcos, esferas em órbita) · **input typewriter** (1) · **resposta em streaming** (1: card + wipes linha a linha 12 f / 9 f) · **carrossel 3D** (1,5: trio sobe k 8–10, fan-out, spin com ω medido, tilt com a câmara por cima) · **janela-máscara → ícone** (1) · **outro** (1,3: blur-in do wordmark, tagline em wipe, pan 0,32 px/f, sem fade visual).
4. **Passagens:** câmara contínua · corte no downbeat (hit 1 f antes; num insert o corte de entrada é feito no NLE — o hit de entrada vai no f0 da comp; o hit de **saída** não cabe na comp (1 frame de cauda = clique) — entrega-se à parte ou põe-se no NLE) · janela-máscara · só-áudio. A luz muda com a cena (x, largura e intensidade do beam por cena). Ocultação em vez de fade quando o herói novo tapa o antigo.
5. **Quantidades:** 1 herói; 1–3 satélites; campo de partículas = os estilhaços do Shadow Grid (57 a 1080×1920, densidade 2,75×10⁻⁵/px² noutro canvas) + 90–140 partículas só na faixa do horizonte quando há horizonte; 4 rays; 2–5 glows. Mais do que isto e o herói perde.
7. **Variedade obrigatória (catálogos B e C).** Além dos arquétipos acima, cada peça usa **≥2 mecânicas e ≥1 elemento dos catálogos B ou C** (§5.8, §5.9) que não tenham sido usados na peça anterior da mesma série; uma frase do narrador que vale a pena mostrar é uma **cena de frase** (M1/M2), não um card com texto. Nunca duas peças seguidas com o mesmo par «card sobe + linhas em wipe».
6. **Luminância alvo por arquétipo** (média 0–255 a 480×270, um valor por cena): valores do Neutral Flow — logo 38 · reveal/painel 51 · push-back 45 · orbital 43 · input 16 · resposta 28 · carrossel 24 · clímax-estrela 46 · outro 51; tolerância ±3. **Baseline AMK medida** (chão `#030303`, pilha completa, beam 1,05, teste «3 coisas» 2026-09-14): orbital 39 · push-back 36 · trio de cards 34 · checks 35 · pill 39 · reveal de card-painel 34–35 · linhas 37 · próximo 40 — o chão preto e o vidro AMK dão 5–15 lum abaixo dos alvos do NeuraFlow; sem referência, calibrar contra estes valores AMK (±3), não contra os do NeuraFlow. Cantos sempre 10–13.

### 5.5 Elementos

Vidro = gradiente vertical (180deg; 160deg nos cards flutuantes; 155deg + sheen no card de resposta; 90deg só na pill de input) + highlight 1–2 px no topo (α 0,10 interiores, 0,25 painel, 0,45–0,55 flutuantes, 0,9 em ciano nos cards 3D) + ring 1 px (0,08–0,18) + glow da cor. Esferas e medalhões **entram por scale** (0,45–0,85 → 1); cards e pills **por translate**; texto desliza ≤30 px. Anel 3D: 6–8 cards em cilindro (r 330–400), `perspective ≈ 3,5·R`, rotação = integral de uma tabela de velocidade angular, `rotateX` negativo (câmara por cima), luz por face `cos²` + banho ciano interior. Geometrias, tamanhos e contagens de referência em `references/neutral-flow-mechanics.md` §5. Cores dos materiais em `lib/theme-amk.ts` (`AMK.glassGradient`, `AMK.sphereGradient`, `AMK.medallionGradient`, `AMK.pillGradient`, …); `GlassCard`/`GlassSphere`/`Beam`/`Horizon`/`Wordmark` aceitam-nas por props.

### 5.6 SFX

Kit em `templates/neutral-flow/sfx/` (14 wav procedurais + gerador + plano JSON). Mapeamento: corte → `hit_cut` **1 f antes**; movimento grande → `whoosh_rise` no 1.º frame do movimento (3 f antes do downbeat); deslocação curta / saída → `whoosh_short`; elemento de UI aparece → `pop_ui`; linha fina / tick / linha de texto → `blip_hi`; typewriter → `click_type` por caractere; vidro / reveal brilhante → `sparkle` / `sparkle_soft`; logo ou texto a brilhar → `shimmer_intro`; batida de anel → `thump_low` no downbeat (+ eco −4 dB 7 f depois); tilt → `swell_pad`; clímax → `riser_star` **33 f antes** do downbeat; fim de build → `pulse_soft`. Ganhos em cascata descem (−4, −5, −5, −6…); cues a partir de `duckFrom` (NeuraFlow: f520, 15 f antes do fade em f535) seguem o envelope da música; sem cues de enchimento. Componente genérico `SoundDesign({ mode, cues, sfxDir, bed, original, bedGain, envelope, duckFrom })` em `templates/neutral-flow/remotion/audio/SoundDesign.tsx` — modo `"sfx"` = só cues, sem música (o caso dos inserts sobre fala: a voz é a música; nível de referência: hits a ≈−6 dBFS de pico, ticks a ≈−24). Copiar os wav de `templates/neutral-flow/sfx/` para `public/sfx/`.

### 5.7 Produção e verificação

**Projeto novo:** seguir `templates/neutral-flow/remotion/scaffold/README.md` (pasta APFS local fora do vault; `package.json` com versões pinadas; copiar `lib/`, `components/`, `audio/`, `ShadowGridBackground.tsx`, `remotion.config.ts`; fontes de `public-fonts/` para `public/fonts/`; wav para `public/sfx/`; `npm run typecheck` + `npm run still` como smoke test). `remotion.config.ts` do kit (jpeg, overwrite, concurrency 1, **`swangle`**); **custo real:** ≈2,5 s/frame a 1080p com a pilha completa (57 estilhaços com `drop-shadow`, 3 glows com blur, grão) → 8 s = 10 min; várias composições renderizam em paralelo sem problema (3 Braves em simultâneo, mesma velocidade cada); `shardGlow={false}` poupa se for preciso. Uma ronda = render direto para mp4 + `ffmpeg -i x.mp4 -start_number 0 -q:v 2 frames/element-%03d.jpeg` para as métricas (poupa o render em sequência). Render com o **Brave** do sistema (`--browser-executable="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"` — nunca o Chrome do Remotion, que o macOS mata) e `--timeout=120000`; versões novas por cópia (`rsync -a --exclude out/`), a anterior intacta.

**Verificação (ferramentas em `templates/neutral-flow/tools/`, pastas de frames auto-detetadas — `element-NNN.jpeg` base 0 ou `NNNN.png` base 1):**
```bash
npx remotion render <CompId> out/frames --sequence --image-format=jpeg --timeout=120000 --browser-executable="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --concurrency=1
python tools/compare.py [--ref <REF_DIR>] out/frames cmp.png 20 60 100 …          # folha (REF vs) render; sem --ref sai só a coluna RENDER
python tools/smoothness.py REF=<REF_DIR> V=out/frames --range 0 <N-1>              # jerk
python tools/flicker_lum.py REF=<REF_DIR> V=out/frames --n <N> --cuts <f,f> --scenes 0-59:cena1,60-119:cena2   # flicker + luminância por cena
python tools/light_cmp2.py REF=<REF_DIR> V=out/frames --frames 20,60,…             # grelha 3×6
```
Com referência (vídeo copiado ou versão anterior): jerk médio ≤ REF, ≤~5 picos >2,5 fora dos cortes, 0 frames de flicker > REF + 2,5, luminância por cena a ±3 lum. **Sem referência (peça original AMK):** a 1.ª versão é a baseline; aceitar por alvos absolutos — jerk médio ≤0,47, flicker (excl. cortes) ≤1,7, luminância por arquétipo (§5.4 item 6) ±3, célula da grelha sem saltos >10 lum entre versões; cada ronda seguinte compara-se com a anterior. Só depois «pronto», com a lista honesta de diferenças. Render final só com aprovação explícita do Ahlec.

**Isolamento (§8 do `create_visual_design_express_skill`, vale também aqui):** cada composição/cena é autocontida — sem estado partilhado entre cenas. Importa em dobro porque a mesma composição pode ter de virar um frame estático para uma thumbnail.

### 5.8 Catálogo B — variações de mecânica e elementos (Lovio)

Medido frame a frame num segundo vídeo do mesmo estúdio (Zelios, «Lovio», 73 s, 25 fps) para dar **variedade** ao que o catálogo A já faz — não substitui nada. Referência completa (18 mecânicas, 24 elementos, transições, som, mapeamento AMK): **`references/neutral-flow-variacoes-lovio.md`**. Código no kit (`templates/neutral-flow/remotion/components/`): `KineticWords`, `Typewriter`, `LetterAssembly`, `Cursor` (+ `cursorPath`), `Counter` (+ `countValue`), `ChromaticRays`, `GenerationBurst` + `SkeletonBlocks`, `PillRings`, `DeviceMock`, `CardCloud`; fonte de acento `Instrument Serif Italic` (`lib/fonts.ts` → `SERIF`). Exemplos verificados: `scaffold/src/examples/LovioVariations.tsx` (frase → push → monitor + cursor → geração → letras + substituição) e `LovioVariations2.tsx` (anel de cards → blocos → pill com anéis → wordmark); **`IvaHook.tsx`** é a peça de teste real (frase «Já te aconteceu… pagar o IVA…»: M1 → M6b → M15 → M9 + M12 → magenta na tensão → M4a + M2), com métricas por cena 0,49 / 0,15 / 0,17 / 0,11 — o modelo a seguir para ilustrar uma frase de gancho.

| Mecânica | O que é | Números | Componente |
|---|---|---|---|
| **M1 Frase sincronizada com a voz** | palavras aparecem inteiras em 1 f ao ritmo da fala (6–12 f entre si), a linha recentra com **expOut(5) em 7 f sem soft start** (é deslocação, não entrada), ≤3 palavras visíveis, as antigas saem em 1 f; saída: encolhe 13 % + sobe 40 px em 14 f | 108 px sans 400 + 1 serif itálica azul | `KineticWords` |
| **M2 Typewriter com glitch** | 1 char/2 f; no frame ímpar um carácter-glitch (`#&>*)`) ocupa o lugar da letra seguinte; cursor fino com gradiente, sem piscar, some 6 f depois | | `KineticWords` (`typeAt`) / `Typewriter` |
| **M3 Substituição por cursor-bloco** | um cursor-bloco come a palavra da esquerda e escreve código no lugar (1 troca/2 f); a frase sans descolora → passou a string | «generates» → `@/components` | `Typewriter mode="replace"` |
| **M4 Blur-in / varrimento de cor** | palavra chega desfocada 12 px → 0 em 5 f; ou chega ciano e assenta azul em 8 f | | `KineticWords` (`blurIn`, `arriveColor`) |
| **M5 Ícone como letra / transportador** | o ícone ocupa o «o» de uma palavra e depois viaja para ser o ícone do lockup seguinte — liga duas frases sem corte | | (composição) |
| **M6 Montagem de letras** | (a) da última para a primeira, 1 letra/frame, da direita, tracking fecha em 6 f, chegam azuis; (b) dispersas a 80–140 px, 1,3×, blur 8, convergem em 9 f, stagger 1–2 f | | `LetterAssembly` |
| **M7 Match-cut por escala** | o herói encolhe com ease-in até ao corte e **cai já do tamanho do slot** na cena seguinte (±5 %) | 8 f | (composição) |
| **M8 Footage → moldura + widgets** | footage 30 f → zoom-out k4 para card r40 com barra de browser; widgets montam à volta (slide 20–30 px, 8–12 f, stagger 4–6 f) | | `GlassCard` + `Counter` |
| **M9 UI → ecrã de dispositivo** | por corte, a mesma composição vira o ecrã de um monitor/tablet/telemóvel; zoom-out **k4, 10 % em 40 f**; dispositivo desloca-se 230 px em 12 f para dar lugar a texto | | `DeviceMock` |
| **M10 Cursor como ator** | mão arrasta chip até alvo «+» que pulsa, larga; clique = botão acende 1 f + tap 0,85 em 2 f; entra sempre de fora; só quando a voz diz o verbo | | `Cursor` + `cursorPath` |
| **M11 Geração** | (a) painel desfoca 2 f → glow radial rx 300→900 em 30 f com núcleo (**o magenta único** no AMK) + scanlines + código a subir 1 linha/6 f → white-out 8 f → UI nasce por blur-in 8 f; (b) código → barras gradiente → retângulo → UI (50 f) | ≈2 s | `GenerationBurst` / `SkeletonBlocks` |
| **M12 Contador** | `1−e^(−2,5t)`, 20–45 f, começa antes de o card pousar | | `Counter` |
| **M13 Moldura → pill com anéis** | o frame inteiro ganha cantos e encolhe (a acelerar) até uma pill 250×120 com 2–3 anéis lavanda→ciano a convergir; a cena continua viva dentro | 28 f | `PillRings` |
| **M14 Anel de cards** | 1 card → 15 rebentam em 14 f para uma elipse 700×350 inclinada 25°, ω 1,2°/f, paralaxe; dispersam em 10 f | | `CardCloud` |
| **M15 Push com a moldura** | a cena clara desliza para a direita com rotateY 8° e a escura entra pela esquerda | 7 f | (composição) |
| **M16 Share → flor → logo** | botão pop `backOut(2,2)` (+14 %), cursor clica, clímax orgânico floresce k5 em 26 f, hold 8, fecha 16 f → ícone → letras (M6a) | outro | (composição) |
| **M17 Flip de luminância** | claro = a voz (frases, logo), escuro = o produto; 8 flips/73 s, sempre em cortes ou passagens ≤8 f | | (estrutura) |
| **M18 Placeholder gradiente** | ao reordenar, o destino vira bloco gradiente 4–6 f enquanto os vizinhos deslizam 200–300 px in-out; revela por blur-in 4 f | | (composição) |

**Em AMK:** chão claro das cenas de frase = `#E8ECF0` com texto `#050E1D` e acento `#3EA1F9` (ou, numa peça 100 % escura, frase `#E8ECF0` sobre preto com o beam apagado — o flip faz-se pela luz); navy dos dispositivos = `#030303`→`#050E1D` com glow `#4369F8` por trás; núcleo da geração `#D132FB` = o único magenta; anéis/blocos `#88C8FB`→`#C9A6FF`; Share/pills claras `#88C8FB` + texto navy. Tabela completa em `references/neutral-flow-variacoes-lovio.md` §9. **Métricas para peças B:** jerk **por cena, fora das transições declaradas** (push, geração, cortes) — frase ≤0,6 com ≤1 pico > 2,5 por 3 palavras, produto ≤0,5; a média global de uma peça B (1,5–2,5) não conta; referência e aceitação em `references/neutral-flow-variacoes-lovio.md` §11.

### 5.9 Catálogo C — variações em dois sub-estilos (Neon roll-call · Aurora product)

Medido frame a frame em dois vídeos de 30 fps (2026-09-16): o short *SaaS Explainer* da Vane Motion (C1, 19 s, conduzido por voz, chão preto com néon) e o ad *Doks.AI* da Zelios (C2, 20 s, só música, navy com arco aurora verde). Referência completa (20 mecânicas M19–M38, 24 elementos, transições, som, métricas, mapeamento AMK por sub-estilo): **`references/neutral-flow-variacoes-c-neon-aurora.md`**. **Regra de conflito (decisão do Ahlec):** os dois sub-estilos vivem em subsecções separadas, **nunca se misturam na mesma peça** e **nunca trazem as cores originais** — C1 mapeia para Dark Neon (gradiente-assinatura `#9B33F6`→`#4369F8`, halo `#88C8FB`), C2 para Cinematic Tech (aurora `#4369F8`, cards `#3EA1F9`/`#E8ECF0`); tabelas em §9-C1/§9-C2 da referência. Escolher pelo tipo de peça: **narrador → C1** (roll-call: 1 claim = 1 símbolo, tudo encadeado sem cortes); **sem voz → C2** (sequência de produto com cortes nos tempos fortes).

Código no kit (`templates/neutral-flow/remotion/components/`): `OrbEclipse`, `NeonBadge`, `TileGlints`, `BlurExit`, `LockSeal` (+ `LockIcon`, `EchoRings`), `StarRing` (+ `Star5`), `Comet` (+ `cometPath`), `ChromeCounter`, `CardFan`, `ChatSequence`, `SpinStar` (+ `StarSentence`, `spinAngle`), `AuroraArc`; curvas em `lib/motionC.ts` (`riseDrift`, `bellPan`, `overshootTo`, `linearCapped`, `cycle`). Exemplos verificados: `scaffold/src/examples/NeonRollCall.tsx` (C1, 300 f) e `AuroraProduct.tsx` (C2, 330 f).

| Mecânica | O que é | Números | Componente |
|---|---|---|---|
| **C1 · M19 Orbes** | dois orbes gradiente (rim claro + corpo) derivam num chão claro, trocam de lado a meio (encolhem ao cruzar) — o 2.º é o simétrico do 1.º | 3–15 px/f, jerk 0,42 | `OrbEclipse` |
| **C1 · M20 Eclipse** | os orbes chocam; a interseção é PRETA e cresce; em 12 f escalam e^(0,107·t) até o preto encher o frame = flip claro→escuro sem corte; o elemento seguinte nasce DENTRO (linha → retângulo → card) | 36 f, evento | `OrbEclipse` (children) |
| **C1 · M21 Badge néon** | card gradiente cresce 15 % em 7 f; letras 1/f com fade 3 f; ponto no canto → ✓ em 4 f; **halo só depois do texto** (+6 f, rampa 10 f) | | `NeonBadge` |
| **C1 · M22 Troca de rótulo** | letras antigas apagam da esquerda 1/f enquanto as novas escrevem 1/f (coexistem 4–6 f); largura do card segue o texto com **overshoot 15 %** e assenta em 10 f; o ✓ volta a ponto e desliza à frente da escrita | 14 f | `NeonBadge` (`swap`) |
| **C1 · M23 Tiles + glints** | grelha de contornos atrás, 12 f depois do card; luzes de 1 tile correm nas arestas (1 tile/8 f, 3–5 em simultâneo) | jerk 0,1 | `TileGlints` |
| **C1 · M24 Blur-out** | saída por foco: blur + fade em 13 f cubic-in (nitidez 730 → 3); fica um blob de glow que se define no ícone seguinte | | `BlurExit` |
| **C1 · M25 Ícone tranca + anéis** | silhueta sobre glow da cor do elemento; tranca em 7 f e encolhe 40 %; no fecho 3 contornos-eco com a forma do ícone aparecem de uma vez e assentam 6 f | | `LockSeal` / `EchoRings` |
| **C1 · M26 Anel de estrelas** | 12 estrelas chegam cada uma da sua direção, 1 por 1,2 f, viagem 8 f expOut; texto ao centro 1 letra/f que cai 10–20 px em 3 f | | `StarRing` |
| **C1 · M27 Cometa** | estrela com cauda ∝ velocidade orbita (18°/f = 1 volta/20 f), apaga letras 1/f, engole estrelas, sai em curva (pico 65 px/f) e pousa; a cauda achata na barra do contador | 55 f, jerk 0,17 | `Comet` + `cometPath` |
| **C1 · M28 Contador chrome** | valor LINEAR 2,7 %/f com cap 99,9; escala do texto expOut 0,27 → 1 em 36 f (τ≈10 f); gradiente vertical + stroke; barra com gradiente que percorre em loop (período 52 f) | | `ChromeCounter` |
| **C1 · M29 Roll-call** | 1 claim da voz = 1 símbolo em 1,0–1,6 s; nada corta, cada elemento nasce do anterior; 1 SFX por nascimento | estrutura | (composição) |
| **C2 · M30 Dispositivo sobe** | tablet em perspetiva sobe de fora: expOut τ≈6 f (73 → 8 px/f) **e continua a subir 2 px/f**; ecrã em cascata (1 linha/2 f); saída blur leve 8 f + corte | jerk 1,46 (evento) | `DeviceMock` + `riseDrift` |
| **C2 · M31 Leque de cards** | pill por blur-in 3 f; 3 cards sobem escalonados 4 f, 5 f cada, rotação ≤3°; bolha cresce; zoom lento 0,2 %/f | | `CardFan` |
| **C2 · M32 Botão + anéis** | botão enche em 15 f; a pill afasta-se 15 % em 30 f com 2 contornos-eco a 0,3 | | `EchoRings` (path pill) |
| **C2 · M33 Chat** | placeholder pop 1 f → sobe 275 px em 24 f (τ 5) → bolha escura + pergunta POR PALAVRAS (1/1,5 f) → «…» 18 f → resposta expande 1 linha/4 f | | `ChatSequence` |
| **C2 · M34 Pan em sino** | 800 px em 30 f com velocidade 2 → 72 → 2 px/f (smootherstep, não expOut); deriva 2–6 px/f antes e depois | jerk 0,6 sem picos | `bellPan` |
| **C2 · M35 Tilt-through** | card com grelha de ícones (1/f) inclina rotateX ≈45° + zoom em 36 f e corta para uma parede de ícones no mesmo ângulo (deriva 1–2 px/f) | corte invisível | (composição) |
| **C2 · M36 Estrela gira e vira palavra** | estrela roda em Y ≈11°/f (1.ª meia volta ≈15°/f) e encolhe 756 → 119 px em 24 f; grupos de palavras crescem à volta dela a cada 9–10 f; nunca pára de girar | jerk 0,18 / 0,09 | `SpinStar` + `StarSentence` |
| **C2 · M37 Arco aurora + fim** | um único anel de glow gigante tangente a uma borda; logo entra 14 % maior e assenta em 12 f, botão fade 5 f | | `AuroraArc` |
| **C2 · M38 Só-música** | cortes e pops nos onsets (±2 f); alternar evento / respiração | estrutura | (composição) |

**Som (medido nos stems):** C1 = voz em cima, cama 124 BPM a −15 dB, **1 SFX por nascimento de símbolo** (pop / stab tonal 1,4 kHz 0,8 s / hit / thump / riser / ding) a −8 dB da voz, **typewriter mudo** (nada por letra) e 2 texturas contínuas (nota do badge, tom 6 kHz do contador); C2 = groove de kick ≈116 BPM, whoosh/riser em cada corte, pop por card, tick por grupo de palavras, um swell 1,4–1,8 kHz por linha de texto, tudo ao nível dos drums. Tabelas evento → som → ficheiro do kit em `references/neutral-flow-variacoes-c-neon-aurora.md` §7.

**Métricas para peças C:** jerk por cena fora dos eventos declarados (eclipse, chegadas, cortes): orbes/typewriter/tiles/cometa/frase ≤0,3–0,5; eventos (eclipse, estrelas, dispositivo, leque) ≤1,0–1,5 com picos só nos frames do evento; pan em sino ≤0,7 **sem picos**; flicker excl. cortes ≤1,7 (C1) / ≤2,0 (C2, arco aurora e pans). Tabela de referência em `references/neutral-flow-variacoes-c-neon-aurora.md` §11.

### 5.10 Sub-estilo «Violet rápido» (variante do catálogo A)

O NeuraFlow do catálogo A em roxo e com entradas mais nervosas; referência completa e **graus de confiança por número** em `references/neutral-flow-variante-violet-rapida.md`. É um **sub-estilo**: usa `lib/theme-amk-violet.ts` em vez de `theme-amk.ts` (nunca os dois na mesma peça) e `lib/tempoFast.ts` para os três tempos sustentados — push-back rápido **167 ms**, pop do card de resposta **67 ms**, overshoot do dashboard **13 px** com recuo ≈117 ms. **Não existe multiplicador global de velocidade** e os tempos do anel ficam os do catálogo A (o anel do original não foi comparado pelo mesmo método). Jerk @30 fps: entradas ≤0,7, resto ≤0,47 — medir sempre a 30 fps (a 60 fps os valores saem ≈metade e enganam). **Antes de produzir uma peça neste sub-estilo, perguntar ao Ahlec** se o glow fica violeta `#8B3FFA` (default) ou é o magenta único `#D132FB`.

## 6. Checklist antes de dar por feito

**Sempre:**
- [ ] Preto puro `#030303`–`#0A0A0F`, não cinzento?
- [ ] Um humor só por peça (Dark Neon / Cinematic Tech / Dark Dashboard), não misturado?
- [ ] Mesma fonte, mesmo espaçamento — só a cor varia?
- [ ] Fundo Shadow Grid gerado a partir de `templates/`, nunca o `.mp4`?
- [ ] Glow da cor do elemento, nunca branco genérico?
- [ ] Se levar Aurora Mesh: no máximo 2–3 blobs, opacidade 8–18%, longe do texto principal, chão continua a dominar?

**Se for peça estática (Claude Design/Express):**
- [ ] `data-canvas-width/height` + `hz:slide-selector` corretos?
- [ ] Conteúdo essencial dentro da zona segura do formato (§4)?
- [ ] Sem CSS animation/JS — é um frame só?

**Se for vídeo (Remotion/HyperFrames):**
- [ ] Li `references/neutral-flow-mechanics.md` e importei `templates/neutral-flow/remotion/lib/motion.ts` (não reescrevi curvas)?
- [ ] Entradas com `softExpOut(k, 0.06–0.12)` e k do elemento; nenhuma `Easing.out(cubic)`, nenhum `expOut` cru?
- [ ] Câmara e posições medidas por `spline()` sobre tabela suavizada; grupos visíveis por in-out medido; saídas `cubicIn` com fade parcial?
- [ ] Creep residual depois de cada settle; overshoot <2 %; ≥3 propriedades por entrada com fins desencontrados?
- [ ] Cortes só em downbeats; um evento grande por compasso; hit de SFX 1 frame antes do corte?
- [ ] Pilha de luz completa e pela ordem (Shadow Grid → beam → névoa → tinta → rays → horizonte → glows de emissor → conteúdo → vinheta → grão 0,03), paleta AMK pela tabela de mapeamento (§1)?
- [ ] Um herói centrado; ≤3 satélites; partículas/rays/glows dentro das quantidades?
- [ ] Texto pelos 6 modos; corpo e etiquetas ténues e tardios?
- [ ] Sem `backdrop-filter`, sem `drop-shadow` em SVG animado, blur só em bounding boxes, `swangle`, `will-change: transform` em texto escalado?
- [ ] Fundo com deriva linear, primeiro plano com curva SaaS — não trocados?
- [ ] Sub-estilo «Violet rápido» (§5.10)? Então: tema violet e não o azul, jerk medido a **30 fps** (entradas ≤0,7), nenhum fator global de velocidade, e a decisão do magenta confirmada com o Ahlec.
- [ ] ≥2 mecânicas + ≥1 elemento dos catálogos B ou C (§5.8, §5.9) que a peça anterior não usou? Se usou o catálogo C: só UM sub-estilo (C1 Neon ou C2 Aurora) e nunca as cores originais (magenta/ciano néon, verde, amarelo)? Frases do narrador como cena de frase (M1/M2), não como texto num card?
- [ ] SFX do kit mapeados por evento, ganhos em cascata a descer?
- [ ] Métricas corridas (jerk, flicker, luminância por cena) e folhas de comparação feitas antes de "pronto"?
- [ ] Render final só depois de aprovação explícita?
