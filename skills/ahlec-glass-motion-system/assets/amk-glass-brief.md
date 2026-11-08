# AMK Glass — briefing de marca

Sistema visual e de motion claro/translúcido da marca pessoal do Ahlec (AHLEC MagiKraft), inspirado no Liquid Glass da Apple. Sistema irmão: **AMK SaaS** (escuro, upload separado) — mesma marca, mesma tipografia, escolher um por peça, nunca misturar. Não usar em trabalho de cliente.

## Cor — fundo sempre um gradiente mesh vívido

Nunca branco ou cinzento liso. Chão é sempre 3–4 blobs radiais grandes e desfocados (blur ≥120px, opacidade 65–90%), sobrepostos até misturar nas bordas, bleed total:

- **Aurora Pink** `#FF3EA6` — dominante, maior área
- **Aurora Violet** `#8B3FFA` — ponte central
- **Aurora Blue** `#3E7BFA` — contrapeso frio, canto oposto ao pink
- **Aurora Coral** `#FF7A5C` — acento quente, área pequena
- **Aurora Lavender** `#C9A6FF` — highlight onde os blobs se sobrepõem

## Superfícies de vidro

Todo o conteúdo vive dentro de um painel de vidro fosco — nunca texto solto sobre o mesh:

- `background: rgba(255,255,255,0.14)`, `backdrop-filter: blur(28px) saturate(180%)`
- borda 1px mais clara no topo/esquerda, mais escura em baixo/direita (luz vinda de cima)
- sombra externa suave `0 8px 32px rgba(0,0,0,0.18)`
- pílula (`radius:100px`) para controlos/nav, `radius:28–32px` para cards

Texto: branco `#FFFFFF` primário, `rgba(255,255,255,0.72)` secundário, sempre com `text-shadow: 0 1px 12px rgba(0,0,0,0.22)` para legibilidade em qualquer zona do mesh.

## Tipografia — igual ao AMK SaaS

Uma família só: **Inter**, como default de repouso. Display/heading em Black/Bold, corpo em Regular/Medium. Mesma fonte que liga os dois sistemas como a mesma marca. Se for pedida explicitamente outra fonte para uma peça, seguir o pedido — o default não é uma imposição contra um pedido direto.

## Mecânica de movimento

Mesma curva-assinatura do AMK SaaS — `1 − e⁻⁶·³ˣ` para entradas de primeiro plano. Diferença: os painéis de vidro animam o `blur` como propriedade (de 0px a ~28px) junto com opacidade/posição — o material "condensa-se". O mesh de fundo deriva devagar e linear (nunca com a curva), igual à regra do Shadow Grid no AMK SaaS.

## Aplicações

Mesmos formatos e zonas seguras do AMK SaaS: 1080×1920 (9:16), 1080×1080 (1:1), 1920×1080 (16:9).
