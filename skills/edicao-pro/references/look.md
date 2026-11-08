# Look cinematográfico

"Cinematográfico" não é um filtro. É **controlo**: contraste com intenção, uma paleta reduzida, pele natural, textura subtil e movimento motivado. O motor aplica isto pela `grade` e pelo `zoom`.

## Looks (LUTs originais em `scripts/luts.py`)
| Look | Para quê | Intensidade |
|---|---|---|
| `neutro_cine` | base para tudo: S suave, pretos ligeiramente levantados, highlights enrolados | 0,7–0,9 |
| `filme` | print film: contraste, sombras ciano-verde, highlights quentes, verdes dessaturados | 0,5–0,7 |
| `teal_orange` | lifestyle/ads: sombras teal, pele laranja protegida | 0,4–0,6 |
| `dourado` | golden hour, luxo, casamento | 0,6–0,8 |
| `imob_luminoso` | interiores: médios abertos, brancos limpos, céu e verdes vivos, sem dominante | 0,7–0,9 |
| `frio_tech` | corporativo/tech/SaaS | 0,6–0,8 |
| `noir` | P&B contrastado (flashbacks, momentos dramáticos) | 1,0 |

Para criar um look novo: acrescenta um ramo em `look()` de `luts.py` e o nome a `LOOKS`. Usa as funções `_s_curve`, `_split_tone`, `_sat` e `_hue_mask`.

## Textura (efeito subtil, nunca visível como "filtro")
| Parâmetro | Talking head | Imobiliário | Ad lifestyle |
|---|---|---|---|
| `grao` | 0,08–0,12 | 0–0,05 | 0,08 |
| `vinheta` | 0,25–0,35 | 0,1–0,15 | 0,2 |
| `halation` | 0,12–0,2 (com luzes práticas) | 0 | 0,1 |
| `nitidez` | 0,2–0,3 | 0,2 | 0,25 |
| `barras` | não (9:16) / 2,39 em trailers 16:9 | não | opcional |

## Câmara virtual (zoom)
- **Tudo se move**: um plano estático de 3 s parece morto. `push` 0,02–0,03 no A-roll e `[1.0, 1.08]` no b-roll.
- **O movimento tem direção**: push in = intimidade/foco; pull out = revelação/contexto.
- **Impacto**: zoom 1,22→1 com ease-out em 0,22 s (`entrada: impacto`) no hook ou num momento forte. Uma ou duas vezes por vídeo.
- **Shake** (`shake`) só em impactos (drop, revelação) e curto (0,3 s, amp 0,01).
- O zoom é subpixel (`perspective`): sem tremer, mesmo lento.
- Qualidade: zoom ≤ resolução da fonte / saída (4K→1080 aguenta 2×; 1080→1080 aguenta ~1,1).

## Cor no set (dizer ao cliente para as próximas gravações)
- Luz principal do lado oposto à câmara (lado da sombra) e candeeiro prático quente no fundo.
- Fundo com profundidade (não parede lisa colada), abertura grande para desfocar o fundo.
- 4K 25/30 fps; slow-mo a 60 fps; perfil plano (log) só se houver tempo para grade, senão o perfil standard do iPhone fica melhor com `neutro_cine`.
- Não misturar temperaturas de luz (janela azul + lâmpada laranja na mesma cara).

## Erros a evitar
- Intensidade 1,0 em `filme` ou `teal_orange` (pele laranja/verde, aspeto Instagram 2015).
- Vinheta forte em 9:16 (os cantos têm UI das redes; não acrescenta nada).
- Grão em imobiliário (parece sujo/barato, o comprador quer limpo).
- Misturar looks no mesmo vídeo (exceção: `noir` para um flashback, com intenção).
