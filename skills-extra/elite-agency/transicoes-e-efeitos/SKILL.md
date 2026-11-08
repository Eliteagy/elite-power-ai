---
name: transicoes-e-efeitos
description: Transições e efeitos visuais passo a passo no DaVinci Resolve (Fusion), Premiere e Blender — speed ramps com flow, transições de imobiliário (atravessar TV, armários, porta), máscaras (Magic Mask), flicker, flash, split object, túnel 3D, zoom para dentro de objetos, dolly zoom, flares anamórficos, halation, camera shake, texto atrás do sujeito, VFX 3D com produto. Usa quando pedem "efeitos", "transições", "mais elaborado", "speed ramp", ou um efeito visto numa referência.
---

# Transições e efeitos

As receitas completas, com valores, estão em `references/receitas-fusion.md`. Aqui ficam o critério e o mapa.

## Critério: quando usar um efeito
1. **Motivado pela história ou pelo movimento**: uma transição liga duas ideias ou dois sítios, não é decoração. Atravessar a TV liga duas divisões; o produto-bumerangue liga dois locais.
2. **Um estilo por vídeo**: escolhe 2 ou 3 efeitos de assinatura e repete-os. Consistência não aborrece.
3. **Não em todos os beats**: alterna partes rápidas cheias de efeitos com respiração (planos longos, silêncio).
4. **Som sempre**: cada transição tem o seu SFX ao frame (whoosh, impacto, glitch, riser). Usa a pasta `efeitos-sonoros`.
5. **Filmar a pensar no efeito**: tripé para clean plates e clones; push reto para atravessar objetos; o mesmo caminho repetido para os armários; fontes de luz viradas para a lente para os flares.

## Mapa de receitas (ver `references/receitas-fusion.md`)
| Quero… | Receita |
|---|---|
| Speed ramp suave e com punch | Retime Curve + Shift no handle (curva cúbica); Fusion Time Stretcher com keyframe por beat; flow com zoom, rotação e shake em adjustment clips |
| Imobiliário viral | Atravessar a TV/quadro (Tracker Corner Positioner + Stencil), armários a abrir em sequência (takes alinhados a 50% + Smooth Cut), porta fechada→aberta (Warper) |
| Entrar dentro de algo | zoom-in pela jante/olho/janela (máscara + compound + zoom); túnel 3D (ImagePlane3D + Duplicate3D + Camera3D) |
| Sujeito destacado | Magic Mask: texto atrás do sujeito, fundo a deslizar com o sujeito parado, split, spin 360°, objeto a voar, ghost clone, flash da silhueta |
| Flash / flicker / glitch | flash com adjustment de 8 frames (gain + blur centrado + glow); flicker reveal (cortes frame a frame + clean plate); infinite zoom (clips de 3 frames) |
| Look de câmara | dolly zoom (escala keyframed), camera shake (Y/3, X/2, strength ~0.15), flares Lens Reflections, halation manual, grão e denoise |
| Rebobinar | speed ramp + clip duplicado em Reverse Speed (compound) |
| Produto 3D/VFX no plano real | Blender: modelo + HDRI do local + render com alfa → Fusion: apagar o real com Paint em modo Clone (time offset −10) → Directional Blur |
| Transição gerada por IA | screenshot do último e do primeiro frame → gerador de transições start/end frame → time remap + SFX |

## Programas
- **DaVinci Resolve**: principal. Fusion para tudo o que é composição. Ver `references/receitas-fusion.md` e a skill `edicao-cinematografica` (`references/davinci-workflow.md`).
- **Premiere Pro**: ver `../edicao-cinematografica/references/premiere-workflow.md`.
- **Blender**: 3D, VFX de produto, texto 3D, câmara virtual. Ver `../edicao-cinematografica/references/blender-workflow.md`.

## Princípios de animação (valem para todos)
- Ease sempre. No DaVinci: Spline, selecionar os keyframes e carregar em S (suave) ou F (flat), T para ease bloqueado, Shift ou Ctrl nos handles para os separar. No Premiere: Bezier / Ease In/Out no Graph Editor.
- Motion blur ligado em tudo o que se mexe depressa (Transform > Settings > Motion Blur; Renderer3D; Vector Motion Blur no fim).
- Edges = Mirror/Reflect quando o zoom ou a rotação deixam bordas transparentes.
- Anima grande e encolhe depois, para teres margem para zooms dramáticos.
- Pivot do zoom na direção do plano seguinte, para a transição ser motivada.
