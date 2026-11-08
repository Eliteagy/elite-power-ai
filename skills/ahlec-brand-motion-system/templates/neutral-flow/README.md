# Kit — SaaS Animation Style Neutral Flow

Código e ferramentas do projeto `TESTE Remotion SaaS/neuraflow-remake-v3/` (a recriação frame-a-frame que define este estilo), generalizados para uso em projetos novos. TypeScript/React (Remotion 4.0.523) e Python 3 (pillow, numpy, scipy). Este `kit/` e `MagiKraft Skills/ahlec-brand-motion-system/templates/neutral-flow/` são cópias idênticas — se um mudar, mudar o outro.

## Projeto novo em 5 comandos → `remotion/scaffold/README.md`

## remotion/

| Ficheiro | O que é |
|---|---|
| `lib/motion.ts` | **A biblioteca de curvas** — `expOut(k)`, `softExpOut(k, softness)`, `saasOut` (= softExpOut 6,3), `uiOut` (3,2), `spline()` (Fritsch–Carlson, C¹), `moveInOut(peakFrac)` (deslocação de grupo, pico ao 4.º frame), `bezier()`, `smooth`/`smoother`, `cubicIn`, `backOut`, `progress()`/`tween()` (default = softExpOut 6,3 com soft start), `keyframes()` (só valores discretos), `hash()`, `osc()`. |
| `lib/measured.ts` | Tabelas medidas (câmara do dashboard, horizonte, anel, outro), `easeFromSamples()` e os eases amostrados `CHAT_MOVE_1/2`, `SPHERE_RISE`. Modelo de como se guardam medições suavizadas (Savitzky-Golay) para alimentar `spline()`. |
| `lib/theme.ts` | Paleta Neutral Flow (documental — 17 dos 42 tokens usados nas cenas; as receitas por cena são a fonte). |
| `lib/theme-amk.ts` | **Tokens AMK SaaS** para a pilha de luz e materiais (`AMK.beamCore`, `glassGradient`, `sphereGradient`, `pillGradient`, …). |
| `lib/fonts.ts` | `loadFont` da Inter local 400/500/600/700. **Copiar `public-fonts/*.woff2` para `public/fonts/` do projeto** (o scaffold já os traz). |
| `components/Beam.tsx` | Feixe volumétrico (3 camadas, blur fora do clip); props `core`, `hot`, `edge`. |
| `components/Rays.tsx` | God rays — 4 feixes a oscilar; blur só na bounding box. |
| `components/Horizon.tsx` | Horizonte-planeta: rim + bloom + disco (`disc`, `discMid/Deep/Edge`) + banda violeta. |
| `components/Glow.tsx` | Bloom radial (rx/ry = meios-eixos; blur opcional ≤16 px). |
| `components/Particles.tsx` | Campo de partículas determinístico (SVG), twinkle e deriva. |
| `components/Grain.tsx` | Grão por `feTurbulence`, seed por frame, default 0,03. |
| `components/Vignette.tsx`, `Grid.tsx` | Vinheta radial; grelha fina com fade radial. |
| `components/GlassCard.tsx`, `GlassSphere.tsx` | Materiais de vidro **sem `backdrop-filter`** (gradientes + inset shadows); `GlassSphere` aceita `gradient`. |
| `components/StarIcon.tsx`, `StarMask.tsx` | Estrela de 4 pontas paramétrica (`waist`) e versão orgânica para máscaras/janelas. `glow` (drop-shadow) só em instâncias paradas. |
| `components/Wordmark.tsx` | Lockup "✦ texto" (`text`, `direction` 90/180, tracking 0,065). |
| `components/Icons.tsx` | 25 ícones de linha (viewBox 24, stroke 1,8). |
| `audio/SoundDesign.tsx` | **Genérico**: `SoundDesign({ mode: original|recreated|sfx|mute, cues, sfxDir, bed, original, bedGain, envelope, duckFrom })`; `NEURAFLOW_CUES` (72 cues medidos) como exemplo; `musicVolume` (fade medido) e `fadeOutVolume(start, end)`. |
| `remotion.config.ts` | jpeg + overwrite + concurrency 1 + **`swangle`** (GL por software, frames determinísticos). |
| `scaffold/` | `package.json` (versões pinadas, scripts com Brave), `tsconfig.json`, `src/{index,Root,AmkStage}.tsx` (insert de 4 compassos a 120 BPM com a pilha de luz AMK), `public/{fonts,sfx}`. |

Render (Mac — browser Chromium do sistema, **Brave**; o chrome-headless-shell do Remotion não corre):

```bash
npx remotion render <CompId> out/video.mp4 --browser-executable="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" --concurrency=1 --timeout=120000
```

## tools/ (Python — `python3 -m venv .venv && pip install pillow numpy scipy`)

Pastas de frames aceitam `element-NNN.jpeg` (base 0, saída de `remotion render --sequence`) ou `NNNN.png/jpg` (base 1, extração ffmpeg) — auto-detetado.

| Script | Uso |
|---|---|
| `measure.py` | `color \| bbox \| track \| fit \| diff \| hist` — cor média, bounding box por limiar, tracking por frame, ajuste de easing (RMSE de 18 modelos) e de decaimento exponencial (k, meia-vida). Caixas na ordem **x0,y0,x1,y1** sem espaços. Pasta dos frames: env `NF_FRAMES_FULL` (NNNN.png). |
| `sheet.py` | contact sheets (range, colunas, tamanho, crop em coords full-res, step, `--src full\|half`). Env `NF_FRAMES_FULL` / `NF_FRAMES_HALF`. |
| `colors.py` | amostrar cores em lista de pontos (stdin `x y` por linha). |
| `compare.py` | `compare.py --ref REF_DIR RENDER_DIR OUT.png f1 f2 …` — folha lado-a-lado REF vs render. |
| `smoothness.py` | `smoothness.py REF=dir V=dir … [--range A B]` — energia de movimento por frame e o seu salto (**jerk**); assinala jerk >2,5 nos renders. |
| `flicker_lum.py` | `flicker_lum.py REF=dir V=dir [--n 601] [--cuts 212,274,395] [--scenes 0-28:logo,…]` — **flicker** (`|frame − média(vizinhos)|`) + luminância média por cena. |
| `light_cmp2.py` | `light_cmp2.py REF=dir V=dir [--frames 20,60,…]` — **grelha de luminância 3×6** + perfis por coluna/linha + contagem de células >10 lum (calibração da luz). |
| `star_track.py`, `medal_track.py` | exemplos de tracking (centróide/raio/ângulo de uma forma; velocidade angular de marcadores num anel) — caminhos do projeto NeuraFlow, adaptar. |

## sfx/

`sfx_synth.py SPEC.json OUT_DIR` gera os 14 `.wav` a partir de `audio-sfx-plan.json` (tipos: whoosh, riser, impact, sparkle, blip, click, shimmer, tone, pad_swell). Os `.wav` já gerados estão aqui e no scaffold (`public/sfx/`).

## Catálogo B — variações «Lovio» (2026-09-15)

Componentes novos em `remotion/components/` (medidos no vídeo Lovio da Zelios, ver `neutral-flow-variacoes-lovio.md`): `KineticWords` (frase sincronizada com a voz: pop + recentrar expOut(5)/7 f + typewriter com glitch + blur-in), `Typewriter` (type / replace com cursor-bloco), `LetterAssembly` (letras da direita 1/f ou dispersas), `Cursor` + `cursorPath` (mão/seta, clique), `Counter` + `countValue` (1−e^(−2,5t)), `ChromaticRays` (bandas verticais, o beam do mundo claro), `GenerationBurst` (glow + código + white-out) e `SkeletonBlocks` (código → blocos → UI), `PillRings` (moldura → pill com anéis), `DeviceMock` (monitor/tablet/telemóvel em perspetiva CSS), `CardCloud` (anel de N cards). Fonte de acento: `public-fonts/InstrumentSerif-Italic.ttf` (SIL OFL) registada em `lib/fonts.ts` como `SERIF`. `KineticWords`/`LetterAssembly` medem texto com `@remotion/layout-utils` (`measureText`) — dependência no scaffold. Exemplos verificados: `scaffold/src/examples/LovioVariations.tsx` e `LovioVariations2.tsx`.

## Catálogo C — «Neon roll-call» + «Aurora product» (2026-09-16)

Dois sub-estilos medidos frame a frame (short *SaaS Explainer* da Vane Motion; ad *Doks.AI* da Zelios), ver `neutral-flow-variacoes-c-neon-aurora.md`. **Nunca misturar os dois na mesma peça, nunca as cores originais** — só a paleta AMK (§9-C1 / §9-C2 do doc).

Componentes novos em `remotion/components/`:
- **C1** `OrbEclipse` (orbes gradiente que derivam/trocam de lado; interseção preta cresce e engole o frame; o filho nasce dentro da vesica), `NeonBadge` (card gradiente com typewriter 1 letra/f, ponto → ✓, halo depois do texto; `swap` = troca de rótulo por letras com overshoot de largura), `TileGlints` (grelha de contornos + luzes nas arestas), `BlurExit` (saída por blur 13 f cubic-in + blob de glow), `LockSeal` / `LockIcon` / `EchoRings` (ícone que tranca em 7 f, encolhe 40 %, 3 contornos-eco), `StarRing` / `Star5` (12 estrelas chegam de fora 1/1,2 f + texto que cai letra a letra; `eraseAt`/`eatAt` para o cometa), `Comet` + `cometPath` (órbita 18°/f, cauda ∝ velocidade, pousa como barra), `ChromeCounter` (linear 2,7 %/f com cap, escala expOut 36 f, gradiente + stroke, barra com gradiente em loop 52 f).
- **C2** `CardFan` (cards sobem escalonados 4 f em leque + bolha), `ChatSequence` (placeholder → sobe 275 px → pergunta por palavras → «…» → resposta por linhas), `SpinStar` / `StarSentence` / `spinAngle` (estrela roda em Y 11°/f e encolhe até glifo; frase cresce à volta dela), `AuroraArc` (um anel de glow gigante tangente a uma borda). `DeviceMock` + `riseDrift` fazem o dispositivo a subir (M30).
- `lib/motionC.ts`: `riseDrift` (expOut τ + deriva), `bellPan`/`bellSpeed` (pan em sino, smootherstep), `overshootTo` (15 % e assenta), `linearCapped`, `cycle`, `rectPerimeterPoint`.

Exemplos verificados: `scaffold/src/examples/NeonRollCall.tsx` (C1, 300 f: orbes → eclipse → badge → troca → tiles → blur → cadeado + anéis → estrelas → cometa → 99,9 %) e `AuroraProduct.tsx` (C2, 330 f: aurora + tablet sobe → pill + leque → chat → pan em sino entre tablets → estrela que vira palavra → logo). Render de verificação a escala 0,5 (`--scale=0.5 --sequence`) chega para métricas e stills; render final só a pedido.
