---
name: look-cinematografico
description: Look cinematográfico — color grading, film look (grão, halation, vinheta), LUTs Log→Rec709, formatos 2.39:1 e 4:3, frame rate/shutter, slow-motion, zooms e efeitos de câmara. Usa quando pedem "deixa cinematográfico", "film look", "cor", "grading", "efeitos", "mais elaborado", ou ao finalizar qualquer vídeo.
---

# Look cinematográfico

## 1. Ordem do grading (DaVinci, um nó por passo)
1. **Normalizar**: exposição e balanço de brancos por plano (Parade). Se for Log (S-Log3, Apple Log, D-Log): Color Space Transform ou LUT de conversão → Rec.709 **primeiro**.
2. **Look geral que serve a história** (não o contrário): decide a paleta antes.
3. **Split tone**: sombras para azul/teal, altas luzes quentes. Subtil (offset/lift 2–5%).
4. **Matizes** (HSL/Hue vs Hue): verdes → oliva/teal dessaturado; amarelos → laranja do local; céu ligeiramente teal; pele protegida (vectorscope, skin-tone line).
5. **Subtrair** em vez de adicionar: baixar saturação global 5–15%, densidade nas cores fortes, paleta de 2–3 cores. "Stop adding colors."
6. **Equilibrar plano a plano** para a sequência parecer filmada no mesmo dia.
7. **Textura** no fim: halation leve, bloom/glow nas altas, grão fino (35 mm), vinheta 10–20%, opcional RGB split mínimo, gate weave. Film Look Creator do Resolve ou Dehancer. Menos é mais.

## 2. Looks prontos (receitas)
- **Teal & orange suave** (YouTube premium, viagens): split tone clássico, pretos levemente levantados, contraste em S suave.
- **Quente interior / frio exterior**: interiores com luz prática quente, exteriores frios/nevados — a temperatura conta a emoção.
- **Monocromático teal/verde** (curtas intimistas): dessaturar tudo exceto uma gama; luz dividida amarelo/azul na cara.
- **Film emulation** (Kodak-like): cores ricas, vermelhos profundos, halation vermelha à volta das luzes, grão, gate 4:3 ou bordas de película.
- **Acento de cor narrativo**: imagem fria/dessaturada até ao clímax, depois um elemento quente (flor amarela) — Pareidolia.
- **Golden hour**: puxar quentes nos médios/altos, contraluz, flares; ideal para imobiliário exterior e casamento.

## 2.5 Ferramentas DaVinci de look (receitas em `../transicoes-e-efeitos/references/receitas-fusion.md` §6)
- **Lens Reflections** (Color): flares anamórficos que reagem às luzes reais. Melhor do que overlays.
- **Halation manual**: Layer Mixer + Qualifier de luminância nas altas luzes, gain vermelho/laranja, blur ~100.
- **Film Look Creator** ou Dehancer para 16 mm/35 mm (grão grosso, gate weave, halation). Títulos vermelhos bold sobre preto = indie anos 70.
- **Denoise** (Noise Reduction temporal no máximo, spatial ~40) ANTES de acrescentar grão.
- Edits "virais" de carros/ação: Color Boost ~75, Shadows −65, Highlights +75, curva em S + glow, Vector Motion Blur 0.3 no compound final.
- Na página Color, cada ajuste no seu próprio nó, com nome, para dar para mexer depois.

## 3. Formato / enquadramento
- **2.39:1 anamórfico** (barras pretas) em YouTube 16:9 = cinema imediato; alterna 2 ângulos (largo/médio) a cada 3–4 s.
- **4:3 com moldura de película** para nostalgia/memórias; **misturar formatos** (16:9 presente, 4:3 arquivo).
- Reels 9:16: usar barras só como efeito de abertura/transição (abrem para full-frame).
- Composição: simetria, top-shots (comida, cama), contrapicados extremos, espaço negativo.

## 3.5 Linguagem de câmara (para escolher planos na edição)
- Luz do **lado da sombra** (key oposta à câmara) = profundidade; contraluz. Luz dura = tensão e mistério; suave = natural e lisonjeira.
- Ângulos: à altura dos olhos = neutro; picado = fraqueza/inquietação; contrapicado = poder; OTS = o que a personagem vê.
- Shutter como linguagem: lento (1/12–1/20) = onírico; rápido (1/100+) = ação nítida e intensa.
- Carácter da lente: anamórfica (bokeh oval, flares horizontais), vintage tipo Helios (bokeh em espiral), Cooke (quente, suave).
- Mudar o aspeto a meio do plano (16:9 → 2.39) para dramatizar um momento.
- iPhone cinematográfico: Apple Log (app Blackmagic Camera), shutter 180°, ND variável + mist; LUT de conversão primeiro, depois a criativa.

## 4. Movimento e tempo
- Shutter 180° (1/50 a 25 fps, 1/60 a 30 fps) = motion blur natural; ND variável + Promist para altas suaves (aconselhar o utilizador ao filmar).
- Frame rate com intenção: ação a 24/25p sem slow-mo; 60–120 fps só para momentos contemplativos/emocionais (no casamento: brinde, comida a voar, entrada).
- **Speed ramps** em transições (rápido→lento no impacto). **Dynamic Zoom**/punch-in lento (100→108% ao longo do plano) dá vida a planos estáticos.
- Distância/lente combina com a emoção: tele comprimido = distância emocional; grande angular perto = intimidade/energia; fisheye POV para humor (dentro do frigorífico).

## 5. Efeitos "elaborados" que funcionam (sem parecer barato)
- Light leaks/queimas de película entre secções (2–6 frames, modo Screen/Add).
- Blur dissolve ou whip pan com motion blur em vez de transições de pacote.
- Flash branco de 2 frames no drop da música.
- Overlay de grão + poeira muito subtil em todo o vídeo.
- Screen replacement (reflexo nos óculos/ecrã), overlay da própria timeline como transição meta, loop perfeito (último frame = primeiro).
- VFX 3D tracked (texto 3D no chão, objetos) — só quando o conteúdo é sobre criatividade/tecnologia.
- Match cuts metafóricos (carro → touro): mesma forma, posição e direção de movimento.

## 6. Checklist final de look
Pele natural no vectorscope · pretos não esmagados (salvo intenção) · nenhum plano "salta" de cor · grão/halation só se percebem quando se procuram · exporta e vê no telemóvel com brilho alto e baixo.
