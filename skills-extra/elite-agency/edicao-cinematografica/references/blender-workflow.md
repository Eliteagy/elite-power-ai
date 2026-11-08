# Blender — 3D e VFX para vídeos

Usa o Blender para: produto 3D dentro de um plano real, texto ou logótipos 3D, objetos com tracking (capacete, ícones), cenários abstratos, câmaras virtuais e mockups de ecrãs. O resultado vai sempre como **render com alfa** para o DaVinci ou o Premiere.

## Pipeline padrão "objeto 3D num plano real"
1. **Filmar a pensar no 3D**:
   - tripé (mais fácil) ou câmara com pontos de tracking visíveis;
   - marcar a posição e o tamanho do objeto real;
   - captar um **HDRI** do local (Insta360 ou várias exposições do mesmo ponto) para a luz e os reflexos baterem certo.
2. **Montar a estrutura no editor** primeiro (ordem e durações) e exportar só o trecho que vai levar 3D (frames PNG ou ProRes).
3. **Blender: tracking da câmara** (se a câmara se mexe):
   - Movie Clip Editor: Set Scene Frames, Detect Features ou marcadores à mão (Ctrl+clique);
   - Track Forward/Backward (Ctrl+T);
   - Solve Camera Motion (erro abaixo de 0.3 px);
   - Setup Tracking Scene, com floor e origem.
4. **Modelo**: importar (glTF/FBX/OBJ) ou modelar (Add > Mesh; Tab para Edit Mode; E extrude, S scale, Ctrl+B bevel). Materiais com Principled BSDF e texturas.
5. **Luz**: World > Environment Texture com o HDRI do local; uma Area Light extra para recortar. Shadow catcher: plano no chão com Object > Visibility > **Shadow Catcher** (Cycles), para o objeto projetar sombra no plano real.
6. **Animação**:
   - keyframes (I) em Location/Rotation/Scale;
   - Graph Editor: interpolação Bezier, handles para ease; F-Curve modifiers (Noise para tremer);
   - caminhos impossíveis (bumerangue) precisam de exageros e de feedback para parecerem orgânicos.
7. **Câmara e motion blur**: Render Properties > Motion Blur (shutter 0.5 = 180°). Profundidade de campo na câmara se o plano real tiver DOF.
8. **Render**:
   - Cycles para realismo, EEVEE para rapidez/estilizado;
   - Film > **Transparent** ligado;
   - Output PNG RGBA ou OpenEXR (sequência), fps igual ao do vídeo;
   - resolução igual ao plano.
9. **Composição no DaVinci (Fusion)**:
   - MediaIn (plano) + Loader (sequência 3D) > Merge;
   - apagar o objeto real: Paint em modo Clone com time offset (tripé) ou máscara + clean plate;
   - Directional Blur e grão iguais ao plano; light leak ou flare na transição;
   - grading final por cima de tudo (o 3D tem de levar a mesma LUT).

## Receitas rápidas
- **Texto 3D no chão** ("RENDER", "ILUMINAÇÃO"):
  - Add > Text; Tab para escrever;
  - Object Data > Geometry > Extrude 0.05–0.1 e Bevel;
  - deitado no plano do chão resolvido pelo tracking; material emissivo ou metálico; shadow catcher.
- **Ícones 3D** (logótipos de apps): SVG importado (File > Import > SVG) > Extrude > Bevel; rotação lenta em loop (Graph Editor > Cycles modifier).
- **Mockup de ecrã/TV**: plano com Image Texture (o vídeo como Movie) e emissão; ou faz no Fusion com Corner Pin.
- **Cenário abstrato/fundo de título**: plano com Displace + Noise Texture animada, volumetria (Volume Scatter) com luz forte para os raios.
- **Câmara virtual em produto (spec ad)**: turntable com Empty no centro como pai da câmara (rotação 360° em X frames), HDRI de estúdio e fundo infinito.

## Integração com IA (referência)
Blocking e câmara no Blender > frames de referência > geradores de vídeo IA (start/end frame, model sheets da personagem para a cara ser consistente) > montagem no editor. Pedir no prompt: anamorphic lens, film grain, color grade, contra o look liso.

## Notas práticas
- Unidades em metros e a escala real do objeto; câmara com sensor e focal iguais aos da câmara real (ver metadados).
- GPU: Preferences > System > CUDA/OptiX; denoise OptiX/OIDN; amostras 128–512.
- Ficheiros: guarda o `.blend` junto do projeto, com "Pack Resources" se fores enviar.
- Gravar um vídeo-teste curto antes do render longo.
