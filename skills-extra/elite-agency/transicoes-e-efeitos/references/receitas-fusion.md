# Receitas passo a passo (DaVinci Resolve 19–21, Fusion)

Atalhos de base: `Shift+Espaço` / `Ctrl+Espaço` = procurar ferramenta (Select Tool). `F2` = mudar o nome a um nó. **Merge**: verde = Foreground (frente), amarelo = Background (trás), azul = máscara. Tudo tem de ligar ao **MediaOut**. New Fusion Clip: botão direito no trecho do Edit. Adjustment Clip: Effects > Toolbox > Adjustment Clip.

## 1. Speed ramps com flow
**Base (página Edit)**
1. `Ctrl+R` > Retime Controls > Add Speed Point.
2. Arrasta o segmento para acelerar (1200–3000%).
3. Keyframe Editor > Retime Curve: seleciona os pontos > Ease In/Out.
4. **Shift+arrastar o handle** para o separar, o que dá uma curva cúbica mais suave do que a curva em S.
5. O clip seguinte começa com velocidade parecida (por exemplo 3000% → 2300%) para o movimento continuar.

**Time Stretcher (Fusion, estilo "car edit")**
1. Põe um keyframe em Source Time no primeiro frame e ajusta-o no último.
2. No Spline, mete um keyframe por beat marker (marca os beats com M).
3. A curva tem de ficar mais inclinada (mais rápida) **exatamente no beat**.
4. Bumerangue: um keyframe a meio que sobe e volta a descer.

**Flow extra (adjustment clips por cima)**
1. *Ease digital no ramp* quando o clip é curto:
   - ramp in: Transform Size 1 → 2, com uma curva lenta que dispara no fim (Spline: Ctrl+A, S);
   - ramp out: Size 0.6 → 1, com a curva acentuada no início;
   - Edges = Mirror;
   - Motion Blur (modo Zoom) num adjustment curto por cima da junção.
2. *Zooms nos beats* onde não há ramp:
   - marcadores nos beats; zoom in num beat (pivot no sujeito) e zoom out no seguinte;
   - rotação de 2–3°;
   - Spline: Ctrl+A, F, depois T com ease bloqueado e mais forte.
3. *Orbit*:
   - rotação a crescer a cada beat (−3°, −6°, −7.5°, −3°, 0), parada entre beats;
   - Size 1.3 para esconder o espelhamento.
4. *Wobble*:
   - nó Camera Shake: Rotation = Y/3 e X = Y/2 (por expressão), velocidade muito baixa, strength ~0.15;
   - Edges = Mirror.
5. Pivot do zoom na direção do plano seguinte (por exemplo para cima e à esquerda, para o drone).
6. Orbit sem filmagem suficiente: Size 1 → 1.5 com o pivot no lado oposto ao movimento da câmara (dá um parallax falso).

**Rebobinar**
1. Faz o ramp, estabiliza (Similarity) e corta onde volta a ~100%.
2. Duplica o clip > New Compound Clip > Change Clip Speed > **Reverse Speed**.
3. Mete um flash ou um zoom na junção e o SFX `rewind_rebobinar`.

## 2. Transições de imobiliário (as mais virais)
**A. Atravessar a TV/quadro.** Filmar: um push reto para um retângulo na parede.
1. Speed ramp no clip.
2. Fusion: nó **Tracker**, Operation = Corner Positioner, com os 4 cantos no ecrã. Faz track para a frente e para trás.
3. Liga um nó Background ao input verde e muda Operation para **Stencil**: fica um buraco na TV.
4. Para animar o ecrã:
   - copia o tracker com Operation = "Foreground Only" e usa-o como máscara do MediaIn copiado;
   - Transform no ecrã: Center desce até sair do quadro, entre 2 marcadores (S no Spline);
   - usa o tracker também como máscara do Merge, assim o ecrã "desce por trás da parede";
   - keyframe Blend do Merge 1 → 0.
5. Segundo Transform: Size 1 → ~7 até ao fim, com ease in cubic (é o mergulho).
6. Em V1, debaixo: a divisão seguinte, alinhada ao marcador, com um speed ramp parecido e ease.

**B. Armários a abrir e fechar.** Filmar: vários takes a andar exatamente na mesma linha reta, com armários diferentes abertos.
1. Mete o take 2 por cima com 50% de opacidade e desliza-o até as linhas coincidirem (bancada, torneira).
2. `Alt+↓` para descer o clip sem o mexer na horizontal e volta a 100%.
3. Repete com os outros takes e acaba no take limpo.
4. O último troço vai em Reverse com speed ramp.
5. Em cada corte, transição **Smooth Cut** (Speed Warp) com ~6 frames. Na versão gratuita usa um Cross Dissolve curto.

**C. Porta fechada → aberta.** Filmar: dois pushes iguais.
1. Speed ramp de ~1600% com ease; alinha a 50% de opacidade e corta.
2. Adjustment clip de 24 frames centrado no corte > Fusion **Warper**:
   - Points, limites nas bordas, encolher o ecrã;
   - Edge = Reflect;
   - Warp Strength 0 → 1 (frame 12) → 0 (frame 23);
   - Spline: S, e Ctrl nos handles para fazer um pico.

## 3. Máscaras (Magic Mask, Resolve Studio; na versão grátis usa Polygon)
Base: duplica o clip. No clip de cima: Fusion > MediaIn > **Magic Mask**, conta-gotas no sujeito, modo Better, Track nos dois sentidos.
- **Texto atrás do sujeito**: mete os títulos numa faixa entre o fundo e o sujeito recortado. Muito usado em reels de clientes.
- **Fundo a deslizar com o sujeito parado**:
  - fundo: Transform X 0 → −6 (Edge Reflect), Motion Blur, Lens Distortion 0 → 1 → 0;
  - sujeito: Directional Blur 0 → pico → 0;
  - ease em tudo.
- **Split**: cópias do sujeito saem para cada lado (Directional Blur 0.8) e o fundo passa com a transição Stretch Blur.
- **Spin 360°**: 3 clones com Transform X (Edge Wrap Around), Directional Blur 0.8 e Lens Distortion 0.5; posições −500 e 1600.
- **Objeto a voar para dentro**:
  - Position Y 2400 → 0 em 9 frames (rápido → lento) com Directional Blur a 90°;
  - 2 clones desfasados 4 frames, como rasto;
  - transição Camera Shake (refração 0).
- **Ghost clone**: MediaIn copiado > Magic Mask > Directional Blur ±0.2 > Glow (brightness 4) > Merge em modo **Screen**; Blend com o modificador Shake.
- **Flash da silhueta**: Magic Mask > Brightness/Contrast com gain 13 > Glow; cortes de 2 em 2 frames; transição Crash Zoom.
- **Flicker reveal** (Polygon também serve):
  1. Brightness no máximo com a máscara no input azul.
  2. ~10 cortes frame a frame; apaga um frame sim, um frame não.
  3. Por baixo, o **clean plate**: a pessoa desaparece.
- **Split object** (transição):
  1. Freeze frame de 15 frames no início do clip 2 > New Fusion Clip.
  2. Polygon no objeto; o objeto entra da direita.
  3. O fundo entra de baixo 1 frame depois.
  4. Motion blur só no fundo: parte a cadeia com um nó Background de alpha 0.

## 4. Entrar dentro de algo
- **Zoom pela jante/olho/janela**:
  1. Na página Color, máscara do objeto + Alpha Output, com track.
  2. Copia o clip e inverte a máscara; fazes dois compound clips.
  3. O "resto" cai (Center Y desce).
  4. O clip seguinte vai por baixo; faz um compound do conjunto e zoom até o objeto encher o ecrã.
- **Túnel 3D (olho)**:
  1. Freeze frame depois de piscar os olhos.
  2. Ellipse invertida na pupila > ImagePlane3D > Duplicate3D (10 cópias, Z offset −1) > Merge3D + Camera3D > Renderer3D.
  3. Camera3D: keyframe em Z para atravessar as cópias.
  4. Motion blur 5.
  5. O plano seguinte vai por baixo, com um fade curto.

## 5. Flashes, zooms e infinitos
- **Flash de transição**:
  1. Adjustment de 8 frames > Color Corrector com gain 1 → 1.6 → 1.
  2. Directional Blur Centered no máximo, Glow e grão 0.2.
  3. Opacidade 0 → 100 → 0.
  4. Copia-o para todas as junções.
- **Infinite zoom**:
  1. Clips de 3 frames cada.
  2. Adjustment com Zoom Blur e grão.
  3. Flash de cor por clip (gain 2, lift −0.14 → normal em 3 frames).
  4. Dynamic Zoom em todos.
- **Onda de energia**: Depth Map com Isolation (target depth 1 → 0), Prism Blur 0.7, Glow, Solid em modo Difference e texto em modo Exclusion com Flicker Addition.
- **Chromatic shake**: efeito Binoculars (aberração) + shake.

## 6. Câmara e lente
- **Dolly zoom (vertigo)**: precisa de um plano com dolly.
  1. Guias à volta do sujeito no frame em que ele está maior.
  2. Keyframes de Zoom (e Position) para ele manter o tamanho; o fundo estica.
- **Camera shake de impacto**:
  1. Adjustment > Camera Shake 0 → pico → 0 em poucos frames, Edges Mirror.
  2. Directional Blur e Glow com keyframes iguais.
  3. Copia-o para cada impacto.
- **Flares anamórficos**: na página Color, **Lens Reflections**:
  - preset Streaks, Anamorphism no máximo;
  - elemento 1 teal (Optical Path ~−0.23), elemento 2 pequeno (teal/magenta), elemento 3 com stretch total;
  - sobe tudo e depois puxa para trás. Reage às luzes reais do plano.
- **Halation manual**:
  1. Layer Mixer (Alt+L).
  2. Qualifier em **luminância** nas altas luzes, gain para vermelho/laranja.
  3. Blur ~100 e blur extra no canal vermelho.
  4. Ou usa o Film Look Creator.
- **Denoise**: Fusion Noise Reduction (Temporal no máximo, Spatial ~40) ou Color > Motion Effects. Faz sempre ANTES de pôr grão.
- **Motion tracking**:
  - Planar Tracker (Hybrid, Translation), Set Reference > Track to End;
  - Stabilize ou Corner Pin para colar texto/ecrã;
  - Studio: AI Smart Reframe (Auto) para manter o sujeito no centro em 9:16.

## 7. Texto animado (Text+)
- **Rise**: gradiente subtil + Position Y de baixo + Opacity 0 → 100, ease; drop shadow com blur.
- **Pop**: só keyframes de opacidade irregulares em 6–10 frames.
- **Stretch**: zoom X 1.2 → 1 em 7 frames + Gaussian Blur forte → 0; Glow 22.
- **Light sweep**:
  1. Gradiente diagonal brilhante + Glow.
  2. Soft Glow com máscara retangular rodada, a atravessar o texto (ease out cubic).
  3. Edge Detect com a mesma máscara, em Merge: brilho a correr a borda.
- **Palavra de outra cor**: Fusion > Text+ > botão direito > Character Level Styling > Modifiers > Color (por exemplo amarelo na palavra-chave).
- Tracking ligeiramente negativo (letras quase a tocar); fonte única por vídeo (Inter Black / Helvetica Neue Bold / SF Pro).
- **Cartão com cantos arredondados**: Rectangle mask > Corner Radius. Foto a entrar: Transform Center com keyframes, frame 0 fora → frame 30 no sítio, spline F.

## 8. VFX de produto (estilo KitKat no Rock in Rio)
1. Ideia: o produto liga dois sítios (é atirado como bumerangue e volta noutro local).
2. Filmar em tripé, com vários takes consistentes, e captar um **HDRI do local** (Insta360, várias exposições).
3. Montar a estrutura (ordem e durações) antes do 3D.
4. Blender: modelo 3D posicionado sobre o produto real, animação orgânica (pede feedback a alguém), render **com alfa** (PNG/EXR).
5. Fusion:
   - apagar o produto real com **Paint > Clone**, time offset −10 (clona o mesmo sítio 10 frames antes; só funciona em tripé);
   - Merge do render 3D;
   - Directional Blur a imitar o motion blur;
   - light leak para disfarçar.
6. Movimentos de câmara + sound design.

## 9. Performance
Playback > Proxy (Quarter) + Render Cache Smart (as barras vermelhas ficam verdes). Faz compound clips dos troços pesados. Optimized Media para H.265/10-bit.
