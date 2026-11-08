---
name: ahlec-glass-motion-system
description: Design system "AMK Glass" — sistema visual e motion claro/translúcido da marca pessoal do Ahlec (AHLEC MagiKraft), inspirado no Liquid Glass da Apple. Fundo sempre um gradiente mesh vívido (paleta Aurora Mesh a full-strength), superfícies de vidro fosco (blur + saturação + borda de luz), mesma tipografia Inter do sistema irmão AMK SaaS. Usar para conteúdo mais leve/produto/Apple-style da marca pessoal do Ahlec — não para clientes (KW, imobiliário, etc.) e não para conteúdo denso/data-driven (aí usar ahlec-brand-motion-system).
---

# Sistema de Marca — AMK Glass

Sistema irmão de [[ahlec-brand-motion-system]] (**AMK SaaS**) — mesma marca, mesma tipografia, paleta de cor com a mesma origem (Aurora Mesh), mas linguagem visual oposta: onde AMK SaaS é vazio escuro e preciso, AMK Glass é claro, vívido e translúcido. **Escolher um sistema por peça, nunca misturar os dois na mesma peça.**

## 0. Quando usar este sistema em vez do AMK SaaS

| Sinal | Sistema |
|---|---|
| Conteúdo denso, dados, contadores, antes/depois, prova social | AMK SaaS |
| Motion graphics cósmico, reveal de posicionamento | AMK SaaS |
| Produto/feature mostrado de forma leve, Apple-style, "showcase" | **AMK Glass** |
| Peça onde o vazio do chão preto pesa demasiado e o conteúdo é pouco (ex. um único CTA, um único destaque) | **AMK Glass** |

Mesma regra do AMK SaaS sobre Claude Design/Adobe Express: **não executa animação** — a importação achata tudo a um frame estático. Este sistema separa-se também em camada Visual (thumbnail/post/story parados) e Motion (Remotion/HyperFrames), como o irmão.

## 1. Fundo — gradiente mesh, sempre vívido

Nunca branco liso, nunca cinzento neutro. O chão é **sempre** um gradiente mesh de blobs desfocados, a full-strength (ao contrário do Aurora Mesh do AMK SaaS, que é subtil e opcional — aqui é o protagonista).

**Paleta do mesh** — mesma origem que o Aurora Mesh do AMK SaaS (Liquid Glass da Apple), mas aplicada a 100%, não como bloom discreto:

| Tom | Hex | Papel no mesh |
|---|---|---|
| Aurora Pink | `#FF3EA6` | dominante, cobre a maior área |
| Aurora Violet | `#8B3FFA` | ponte central, mistura com o pink e o blue |
| Aurora Blue | `#3E7BFA` | contrapeso frio, geralmente num canto oposto ao pink |
| Aurora Coral | `#FF7A5C` | acento quente, área pequena, dá vida sem dominar |
| Aurora Lavender | `#C9A6FF` | highlight claro, onde os blobs se sobrepõem |

**Construção do mesh (reproduzido em código, nunca uma imagem estática de banco):** 3–4 blobs radiais grandes (raio 40–65% da largura do canvas), `blur` ≥120px, opacidade 65–90%, sobrepostos o suficiente para misturar nas bordas — é a mistura que cria os tons intermédios, não uma 6ª cor definida à parte. Cobertura de bleed total (os blobs saem da margem do canvas, não há "fundo" visível por trás). Grão subtil (`opacity:0.03` de ruído) por cima, para não vazar em faixas (banding) nos gradientes.

**Deriva (motion):** os blobs derivam devagar (período 20–30s por ciclo, **linear**, nunca com a curva `saasOut`) — é ambiente, tal como a deriva do Shadow Grid no AMK SaaS. O primeiro plano (texto, painéis de vidro) é que usa a curva de entrada.

Ficheiro de referência com um dataset já pronto (não recriar do zero): `templates/glass-mesh-static.html`.

## 2. Superfícies de vidro — a peça central do sistema

Todo o conteúdo em primeiro plano (texto, controlos, cards) vive dentro de um **painel de vidro fosco** sobre o mesh — nunca texto solto direto sobre o gradiente (falha em contraste e não lê como "glass").

**Receita do vidro:**
- `background: rgba(255,255,255,0.14)`
- `backdrop-filter: blur(28px) saturate(180%)`
- borda 1px `rgba(255,255,255,0.4)` no topo/esquerda (luz), `rgba(255,255,255,0.12)` em baixo/direita (sombra) — a borda **não é uniforme**, simula luz a vir de cima
- sombra externa suave: `0 8px 32px rgba(0,0,0,0.18)`
- cantos: pílula (`border-radius:100px`) para controlos/navegação (ver referência — segmented control "Years/Months/All"), `border-radius:28-32px` para cards/painéis maiores

**Texto sobre vidro:** branco `#FFFFFF` primário, `rgba(255,255,255,0.72)` secundário, sempre com `text-shadow: 0 1px 12px rgba(0,0,0,0.22)` — o mesh por trás varia de luminosidade, a sombra é o que mantém a legibilidade em qualquer zona do gradiente. Nunca escurecer o texto para contrastar com uma zona clara do mesh — resolve-se sempre pelo vidro + sombra, não pela cor do texto.

## 3. Tipografia — herdada do AMK SaaS, sem alterações

Mesma família, mesma lógica — é o que liga os dois sistemas como a mesma marca. **Default de repouso, não decreto:** se for pedida explicitamente outra fonte para uma peça, o pedido tem prioridade — o sistema não deve resistir nem "corrigir" de volta para Inter.

| Papel | Fonte | Uso |
|---|---|---|
| Display / heading | **Inter**, peso Black/Bold | títulos, headlines |
| Corpo / label | **Inter**, peso Regular/Medium | texto de apoio, descrições |
| Dados / etiqueta técnica | **ui-monospace** | raramente usado aqui — este sistema é mais leve, menos data-driven que o AMK SaaS |

## 4. Componentes visuais

**Segmented control / pill nav:** vidro fosco em pílula, opção ativa com um preenchimento mais opaco (`rgba(255,255,255,0.28)`) e leve elevação (`box-shadow` mais forte), transição entre opções desliza o preenchimento, não faz fade.

**Card de vidro:** painel `border-radius:28-32px`, título Inter Black + descrição Inter Regular, ícone opcional com o mesmo tratamento de vidro por trás (nunca ícone flat sobre o mesh direto).

**Badge:** mesma pílula do AMK SaaS mas em vidro claro em vez de escuro — fundo `rgba(255,255,255,0.14)`, sem glow colorido (o glow aqui é o próprio brilho do vidro, não uma cor de acento).

### Zonas seguras

Mesmas do AMK SaaS — mesma marca, mesma grelha de aplicação:

| Formato | Canvas | Zona segura |
|---|---|---|
| 9:16 (Reels, Stories, Shorts) | 1080×1920 | conteúdo essencial entre y=240 e y=1680 |
| 16:9 (YouTube, apresentações) | 1920×1080 | margem de 60px em todos os lados |
| 1:1 (posts de feed) | 1080×1080 | margem de 60px |

## 5. Mecânica de movimento

Herda a curva-assinatura da marca — `saasOut` para entradas de primeiro plano, exatamente como no AMK SaaS (é isto que faz os dois sistemas se sentirem da mesma marca apesar do visual oposto):

```ts
export const saasOut = (x: number) => 1 - Math.exp(-6.3 * x);
```

**O que muda em relação ao AMK SaaS:** os painéis de vidro entram com `blur` como uma das propriedades animadas (de ~0px, "sem vidro ainda visível", até ao valor final ~28px) em paralelo com opacidade e translateY — é o próprio material a "condensar-se", não só a aparecer. O mesh de fundo deriva linear (§1), nunca com `saasOut` — a regra de "fundo ambiente vs. primeiro plano com curva" é idêntica à do irmão.

## 6. Checklist antes de dar por feito

**Sempre:**
- [ ] Fundo é sempre um gradiente mesh vívido, nunca branco/cinzento liso?
- [ ] Todo o texto/conteúdo vive dentro de um painel de vidro, nunca solto sobre o mesh?
- [ ] Texto branco + text-shadow, nunca escurecido para "resolver" contraste?
- [ ] Mesma tipografia Inter do AMK SaaS, sem trocar de fonte?
- [ ] Não misturado com o AMK SaaS na mesma peça (chão preto + chão mesh não coexistem)?

**Se for peça estática (Claude Design/Express):**
- [ ] `data-canvas-width/height` + `hz:slide-selector` corretos, sem CSS animation/JS?
- [ ] Conteúdo essencial dentro da zona segura do formato (§4)?

**Se for vídeo (Remotion/HyperFrames):**
- [ ] Curva `saasOut` no primeiro plano, mesh com deriva linear no fundo?
- [ ] Blur é uma das propriedades animadas na entrada dos painéis de vidro?
