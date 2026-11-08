# AMK SaaS — briefing de marca

Sistema visual e de motion escuro da marca pessoal do Ahlec (AHLEC MagiKraft). Usar em thumbnails, posts, stories e animações de vídeo (9:16 e 16:9). Não usar em trabalho de cliente (KW, imobiliário, etc. — esses têm sistemas próprios). Sistema irmão, mais claro/translúcido: **AMK Glass** (upload separado).

## Cor

Chão sempre preto puro `#030303`–`#0A0A0F`, nunca cinzento. Por cima do chão escolhe-se **um** dos três humores por peça — não misturar:

- **Dark Neon** — acento `#3EA1F9` → `#9B33F6` (gradiente diagonal azul→magenta). Cósmico, premium. Para motion graphics e reveals de posicionamento.
- **Cinematic Tech** — fundo `#050E1D`, acento `#98CEFC`. Reveal de produto, quando o vídeo mostra o processo em si.
- **Dark Dashboard** — fundo `#0A0A0F`, acento `#3EA1F9`, grelha de dados subtil. Data-driven, prova social, contadores, antes/depois.

Texto: branco `#EDEFF2` (primário), `#8C97A3` (apoio). O glow de qualquer elemento é **sempre a cor do próprio elemento** — nunca branco genérico.

### Aurora Mesh — extra para fundos vazios

Blooms de cor extra e opcionais por baixo do campo de estilhaços, para peças onde o chão preto fica demasiado vazio (paleta inspirada no Liquid Glass da Apple, sem o vidro):

`#FF3EA6` (pink) · `#8B3FFA` (violet) · `#3E7BFA` (blue) · `#FF7A5C` (coral, só acentos pontuais) · `#C9A6FF` (lavender, highlight)

2–3 blobs radiais muito desfocados, opacidade 8–18%, nos cantos, nunca atrás do texto principal — o preto continua a dominar.

## Tipografia

Uma família só: **Inter**, como default de repouso — usar sempre que não houver pedido específico noutro sentido. Se for pedida explicitamente outra fonte para uma peça, seguir o pedido; o que não deve acontecer é o sistema trocar de fonte por conta própria ou misturar fontes dentro da mesma peça sem ter sido pedido.
- Display / títulos / contadores (peças estáticas): Inter Black (900), caixa alta, letter-spacing −0.02em
- Em animação: escala do Neutral Flow — wordmark Medium 500 (+0,065em), herói/H1 Bold 700 (−0,01em), sub 600, corpo 400; o kit carrega 400–700
- Corpo / legendas: Inter Regular ou Medium (400–500)
- Dados / timestamps / etiquetas técnicas: monospace (ui-monospace / SF Mono)

## Fundo — Shadow Grid

Fundo assinatura do sistema, sempre gerado (nunca um ficheiro de vídeo): malha de pontos finos (período 17×10px, branco a ~5% opacidade) + campo de 57 estilhaços triangulares por frame (tamanho 1.7–28px, brilho 26–131/255, maioria discretos) em deriva lenta para cima (ângulo 250°–290°, com paralaxe: quanto maior o estilhaço, mais rápido e mais opaco) + vinheta radial pesada nos cantos. Opcionalmente com blooms Aurora Mesh por baixo (ver acima).

## Mecânica de movimento

Mecânica do **SaaS Animation Style — Neutral Flow** (medida frame a frame; ver a skill): entradas por decaimento exponencial `1 − e^(−k·x)` com soft start de 1–3 frames (k 6,3 em painéis, 4–5 em UI, 8–10 em cards), nunca `cubic-out`; câmara por spline sobre tabelas; grupos já visíveis por in-out (pico ao 4.º frame); creep residual depois de cada settle; overshoot <2 %, sem bounce; ≥3 propriedades por entrada com fins desencontrados; um evento grande por compasso da música, cortes só em downbeats (hit 1 frame antes); passagens por câmara contínua, corte no downbeat ou janela-máscara — o herói novo tapa o antigo em vez de fade. Luz em pilha (beam de cima, névoa, god rays, horizonte, glows de emissor) sobre o Shadow Grid.

## Aplicações

Thumbnail e Story em 1080×1920 (9:16), Post em 1080×1080 (1:1), vídeo horizontal em 1920×1080 (16:9). Título + descritor centrados no terço inferior (thumbnail/story) ou centrados em card com glow (post).
