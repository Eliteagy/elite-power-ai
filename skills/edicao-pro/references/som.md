# Som: 50% do cinematográfico

O motor já faz a cadeia de voz (high-pass 75 Hz, −1,5 dB a 200 Hz, +2 dB a 3,5 kHz, compressão 3:1), o ducking da música (sidechain), micro-fades de 8–12 ms em cada corte (sem cliques) e o loudness em 2 passos (−14 LUFS, true peak ≤ −1 dBTP). O editor decide **o quê, onde e quanto**.

## Camadas (de baixo para cima)
1. **Cama/ambiente** (−30 a −24 dB): `06_ambientes_camas/` (room tone, vento, cidade). Tira a sensação de "vácuo digital" entre frases.
2. **Música** (com voz: −20 a −26 dB + ducking; sem voz: −6 a −10 dB).
3. **Voz** (referência, ~−16 LUFS antes da mistura).
4. **SFX** (por cima, ao frame).

## Mapa de SFX (`../efeitos-sonoros`, usar pelo nome)
| Momento | SFX | dB |
|---|---|---|
| Hook / título grande | `impacto_seco_curto`, `pop_grave_titulo` | −9 / −12 |
| Card / texto a entrar | `pop_suave`, `pop_bolha` | −16 |
| Número / dado | `pop_grave_titulo`, `ding_notificacao` | −14 |
| B-roll a entrar / corte com movimento | `whoosh_rapido_01/02`, `swipe_ui_lateral` | −14 a −12 |
| Transição grande / mudança de local | `whoosh_longo_cinematico`, `whip_pan` | −12 |
| Antes de uma revelação (acaba no corte) | `riser_curto_antes_do_corte`, `reverse_prato_swell` | −14 |
| Drop / hero / clímax | `impacto_cinematico_01`, `boom_sub_grave`, `braam_trailer` (raro) | −10 |
| Depois de um riser | `sub_drop` | −10 |
| Flash / glitch | `zap_flash`, `glitch_01` | −16 |
| Momento cómico / "para tudo" | `tape_stop`, `rewind_rebobinar` | −14 |
| Foto/freeze | `obturador_camara` | −14 |
| UI / ecrã / digitar | `click_ui`, `teclado_digitacao` | −18 |
| Tensão de fundo | `drone_tensao_grave_20s` | −28 |
| Emoção de fundo | `pad_emocional_do_maior_20s` | −24 |

## Timing ao frame
- **Whoosh**: começa 0,1–0,2 s antes do corte (`"t": "c:3-0.15"`), com o pico no corte.
- **Riser**: acaba exatamente no corte: `t = corte − duração do riser` (o curto tem ~1 s).
- **Pop/impacto**: no frame em que o gráfico aparece (o mesmo `t` do gráfico).
- **Silêncio antes do impacto**: baixa a música 0,3–0,5 s antes da frase mais importante. O impacto parece o dobro.

## Música
- Escolhe pela **energia do formato**: talking head educativo = lo-fi/ambient calmo; imobiliário luxo = piano/cinematic lento (80–100 BPM); ads = energia alta com drop.
- `inicio`: começa a música num sítio com energia (salta a intro longa) ou alinha o drop com o hero/revelação.
- Corta a música no fim **num beat** (o fim do vídeo num downbeat) ou com `fade_out` de 1–1,5 s.
- Sem música do cliente: pasta de músicas do utilizador, `acestep` (gerar), ou bibliotecas grátis (YouTube Audio Library, Pixabay). Nunca música com copyright em trabalhos de clientes.

## Menos é mais
- Não metas SFX em todos os cortes; guarda-os para gráficos e para movimento.
- No máximo 1 SFX "grande" (braam/boom) a cada 15–20 s.
- Se a voz perde inteligibilidade em algum momento, os SFX e a música estão altos demais: baixa 3 dB.
