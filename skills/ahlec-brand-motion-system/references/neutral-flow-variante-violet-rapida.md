# Neutral Flow — Sub-estilo «Violet rápido» (variante do catálogo A)

> [!warning] Sub-estilo, não substituição — e com uma decisão de marca em aberto
> Este vídeo é o NeuraFlow do catálogo A refeito **em roxo/magenta e com entradas mais nervosas**. Entra em conflito com o AMK SaaS em dois pontos: (1) o Neutral Flow em AMK é **azul** (`#3EA1F9` / `#4369F8`) e o roxo só existe como acento; (2) o glow da referência (`#EF3CF9`) é magenta a sério e colide com a regra «um magenta em 1.º plano por peça». Por decisão do Ahlec (2026-09-16: conflito → subsecção clara), fica como **sub-estilo próprio**, com tokens próprios (§4), **sem tocar nos tokens azuis**. **Em aberto (decisão do Ahlec):** o glow passa a violeta `#8B3FFA` (proposta deste doc) ou conta como o magenta único da peça?

**Fonte:** *Neura Flow Saas Explainer video*, Motionide, YouTube `6ueA2BGNS9w`, 21,2 s, 1920×1080, **60 fps**, 1270 frames. O catálogo A foi medido a 30 fps — **tudo aqui está em milissegundos**, e o jerk foi recalculado com a variante decimada para 30 fps para ser comparável (§3).

**Como ler este doc:** cada número tem um grau de confiança. Não há «fator global de velocidade» porque não foi medido — mediu-se mecânica a mecânica, e nem todas se conseguiram comparar.

Ficheiros de análise: `TESTE Remotion SaaS/_ref_e/` (`src.mp4`, `frames_full/`, `sheets/`, `measure_e.json`, `ring_compare.json`, `ring_compare_locked.json` (tentativa falhada, mantida como registo), `palette_e.json`, `jerk_30fps.json`).

---

## 1. Mapa de cenas (segundos) — é a mesma sequência do catálogo A

| # | Variante (s) | Cena | Original cat. A (s) |
|---|---|---|---|
| 1 | 0–1,2 | Wordmark + horizonte sobe (aqui: crescente creme no disco) | 0–0,95 |
| 2 | 1,3–1,8 | Dashboard sobe de baixo | 0,97–1,9 |
| 3 | 1,9–3,3 | Título «Smart Control» + hold | ≈1,9–3,4 |
| 4 | 3,4–6,8 | Push-back com wordmark gigante atrás | 3,5–7,0 |
| — | **6,85** | corte | **7,07** |
| 5 | 6,9–8,9 | Anel orbital «New Updates» + satélites | 7,1–≈9,3 |
| 6 | 9,0–13,0 | Chat: pergunta → «…» → card de resposta | ≈9,7–13,3 |
| 7 | 13,1–16,8 | Trio de cards → anel 3D de cards a rodar | ≈13,1–17,2 |
| 8 | 16,9–17,9 | Máscara-estrela encolhe | ≈17,2–17,9 |
| 9 | 18,0–21,1 | Outro: wordmark + horizonte + raios de cortina | 17,3–20,0 |

**As durações das cenas são praticamente as mesmas.** O «mais rápido» não está no comprimento das cenas — está nas chegadas dentro delas (§2). Diferenças de desenho: serifada em todo o lado (wordmark e títulos; o original é sans), crescente creme no horizonte, raios de cortina roxos no outro.

---

## 2. Velocidade — o que se mediu e com que confiança

### 2.1 Medido nos dois vídeos (comparação válida)

| Mecânica | Variante | Original | Razão |
|---|---|---|---|
| Push-back, troço rápido (largura do card 989 → 837 px) | **167 ms** | ≈270 ms (escala, f116–124 a 30 fps) | **≈1,6× mais rápido** |
| Card de resposta do chat aparece | **≈67 ms** (área 0 → 187 k px² em 4 f; quase sem curva) | subida de 330–470 ms (`CHAT_MOVE`, `SPHERE_RISE`) | passa de «subida» a **pop** |

### 2.2 Medido só na variante (sem comparação direta)

| Mecânica | Medição | Nota |
|---|---|---|
| Dashboard sobe | cauda τ ≈ **120 ms**, com **overshoot ≈13 px e recuo em ≈7 f** | o original assenta monotónico; o seu τ ≈134 ms vem da tabela `DASH_TOP` do kit, medida com **outro método** — a diferença de 10 % não é conclusiva; o overshoot é. Só a cauda (113 px) foi seguida, não o percurso todo |
| Anel «New Updates» | hold 67 ms → **kick de 70 px em 33 ms** → cauda τ ≈ **400 ms** (raio 833 → 440 px em 930 ms; centro estável ±4 px) | não é uma exponencial simples |
| Máscara-estrela encolhe | τ ≈ **250 ms**, exponencial limpa (área 178 k → 9,8 k px²) | |

### 2.3 Não medido
- **Anel do original, pelo mesmo método:** duas tentativas falhadas. (1) ajuste de círculo livre: o centro saltava 280 px entre frames (apanhava medalhões/texto). (2) centro preso + banda radial: o *controlo* na variante perdeu 13 de 14 frames (amostragem de 4 em 4 f com banda de ±45 px — erro de desenho do tracker), logo o resultado no original foi descartado; a parte «limpa» dele eram passos de 2/4/6 px cravados no limiar de aceitação = quantização do histograma, não movimento. **Não se usou a tabela `RING_R` antiga como substituto** (outro método). Não há razão de velocidade para o anel.
- Percurso completo da subida do dashboard; trio de cards (tracker grosseiro, 530 ms aos degraus).

### 2.4 Não afirmado
Um fator global («tudo 1,6× mais rápido»). Foi medido numa mecânica.

---

## 3. Jerk por cena @30 fps (variante decimada, comparável com o catálogo A)

| Cena | médio · máx · n>2,5 |
|---|---|
| Wordmark + horizonte | **0,69** · 3,0 · 1 |
| Dashboard sobe | **0,66** · 2,1 · 0 |
| Título + hold | 0,46 · 2,8 · 1 |
| Push-back | 0,36 · 2,5 · 0 |
| Anel | 0,45 · 10,2 · 4 (máx = corte) |
| Chat | 0,40 · 12,3 · 3 (máx = pop do card) |
| Cards 3D | 0,14 · 1,4 · 0 |
| Máscara-estrela | **0,68** · 4,4 · 3 |
| Outro | 0,08 · 0,5 · 0 |

A 60 fps nativos os mesmos troços dão ≤0,29 — **não usar esses valores**: a 60 fps a energia por frame é ≈metade e o sub-estilo pareceria mais suave que o catálogo A, quando é o contrário. **Aceitação para peças neste sub-estilo:** entradas (wordmark, dashboard, estrela) **≤0,7**; tudo o resto mantém **≤0,47**.

---

## 4. Paleta medida → tokens propostos `[decisão de marca em aberto]`

| Papel | Referência | **AMK «Violet» (proposta)** |
|---|---|---|
| Chão | `#040107` | `#030303` (inalterado) |
| Beam (corpo · pico) | `#580B8B` · `#C262EA` | `#8B3FFA` · `#C9A6FF` |
| Glow de emissor | `#EF3CF9` (magenta) | `#8B3FFA` — **ou** `#D132FB` se for o magenta único da peça ← decisão do Ahlec |
| Dashboard: sidebar · fundo · contorno | `#721899` · `#250738` · `#F894FF` | `#9B33F6` a 0,6 · `#0A0A0F` · `#C9A6FF` |
| Satélites / cards 3D | `#A14BE3` · `#651C93` → `#BB8DE0` | `#9B33F6` → `#C9A6FF` |
| Card de resposta | `#7802B1` | `#9B33F6` → `#050E1D` |
| Crescente do horizonte | creme `#D7C68A` sobre `#22114C` | `#E8ECF0` a 0,8 sobre `#050E1D` (o AMK não tem amarelo) |
| Outro: chão · wordmark | `#19002B` · `#C184CC` | `#050E1D` · `#C9A6FF` → `#E8ECF0` |
| Rims e texto | branco | `#E8ECF0` |

Tipografia: a referência é toda serifada; em AMK mantém-se **Inter**, com Instrument Serif Italic só na palavra de acento (regra existente).

---

## 5. O que entra no kit
- `lib/theme-amk-violet.ts` — tokens da coluna da direita (glow em `#8B3FFA` por defeito, com comentário a apontar para a decisão em aberto).
- `lib/tempoFast.ts` — **só o sustentado:** `PUSH_FAST_MS = 167`, `ANSWER_POP_MS = 67`, `DASH_OVERSHOOT_PX = 13` com recuo em 7 f @60 (≈117 ms). Sem multiplicador global.
- Sem componentes novos. Exemplo Remotion: **depois** da decisão do magenta.
