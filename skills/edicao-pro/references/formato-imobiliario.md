# Imobiliário cinematográfico

Tours de casas, empreendimentos, BTS do consultor. Normalmente sem fala (música + texto), ou com voz off / consultor a falar.

## Defaults
| Parâmetro | Valor |
|---|---|
| formato | 9:16 1080×1920 (reel) ou 16:9 (YouTube/site) |
| duração | 15–35 s (reel), 45–90 s (tour completo) |
| timeline | `clips` + `"som_clips": false` + `cortar_no_beat` |
| plano | 1,2–2,5 s (beat a beat ou 2 beats). Hero shots (vista, sala, piscina) 3–4 s |
| movimento | todo o clip tem zoom: `[1.0, 1.08]` (push in) ou `[1.12, 1.0]` (pull out/reveal) |
| grade | `imob_luminoso` 0,8 (interiores brancos, luz natural) ou `dourado` 0,7 (golden hour, exteriores) + nitidez 0,2 |
| música | −6 a −8 dB sem ducking. Com voz off: −20 e ducking |

## Sequência que vende (ordem de planos)
1. **Hook** (0–2 s): o plano mais forte. Vista, piscina, sala com luz ou fachada em reveal (pull out). Título com preço, localização ou pergunta ("Consegues adivinhar o preço?").
2. **Chegada**: fachada/entrada/porta a abrir (movimento para dentro).
3. **Fluxo da visita**: entrada → sala → cozinha → quartos → casas de banho → exterior/vista. Os cortes seguem a direção do movimento (se a câmara vai para a direita, o plano seguinte continua para a direita).
4. **Detalhes**: 2–3 inserts de 0,8–1,2 s (torneira, material, luz, puxador). Mudam a escala e mostram qualidade.
5. **Hero/clímax**: o melhor espaço, com slow-mo (`vel` 0,5 se foi filmado a 60 fps) ou um plano mais longo, no drop da música.
6. **Fecho**: fachada ao entardecer ou a vista + CTA (cápsula "Marca visita" / "Comenta CASA") + dados (tipologia, área, preço) num `card`.

## Técnicas
- **Cortar no beat**: `cortar_no_beat` com o `_beats.json` da música. Usa `downbeat: true` para um ritmo calmo/luxo (planos de ~2,4 s a 100 BPM).
- **Speed ramp/timelapse**: planos parados longos (tripé, obra) com `vel` 8–14 = timelapse com vida.
- **Reveal**: `zoom: [1.18, 1.0]` (abre) num espaço amplo. **Push**: `[1.0, 1.1]` para direcionar o olhar.
- **Transições**: corte seco no beat em 90% dos casos. Whoosh nos movimentos rápidos (whip pan). Flash no máximo 1×, no drop. Riser 1 s antes do hero.
- **Texto**: pouco e grande. Localização, tipologia, 1 diferencial ("Vista rio", "T3 · 142 m²"). Nunca listas longas.
- **Pessoas**: o consultor a abrir a porta ou a apresentar o espaço humaniza. Planos de 1–2 s.

## Filtrar o footage
- Descarta planos tremidos, com reflexos do operador, exposição queimada ou com pessoas a atravessar sem intenção.
- Planos longos de gimbal: escolhe os 2–3 s de movimento mais limpo (vê o contact sheet; se for preciso, mais frames com `contact_sheet` e um `n` maior).
- Vertical nativo (2160×3840) dá margem para zooms até 1,2 sem perder qualidade.

## SFX típicos
`whoosh_medio_01` em movimentos, `riser_curto_antes_do_corte` antes do hero, `impacto_cinematico_01` no drop/hero, `obturador_camara` num freeze de foto, `06_ambientes_camas/vento_distante_loop_20s` a −30 dB nos exteriores.
