# YouTube longo (16:9)

Vídeos de 5–20 min: aulas, talking head com b-roll, entrevistas, vlogs.

## Defaults
| Parâmetro | Valor |
|---|---|
| formato | 1920×1080 (ou 3840×2160 se a fonte for 4K e o cliente pedir), 30 fps |
| `aroll.max_gap` / `pad` | 0,35 / [0,06, 0,12] (respira mais que o reel) |
| `punch` | `{"cada": 5, "niveis": [1.0, 1.18]}` + `push` 0,02 |
| legendas | `minimal` (o YouTube tem CC; legendas queimadas só pequenas) ou nenhuma |
| grade | `neutro_cine` 0,8 + grão 0,08 + vinheta 0,2 (ou `filme` em vlogs) |
| música | −24 a −28 dB com ducking. Muda de faixa ou de energia por capítulo |
| loudness | −14 LUFS (o YouTube normaliza para −14) |

## Estrutura
| Bloco | Duração | Edição |
|---|---|---|
| **Cold open / hook** | 0–15 s | a melhor frase/resultado do vídeo, reordenada; título `titulo` ou `hook` |
| **Promessa + credibilidade** | 15–40 s | o que vão ganhar e porque ouvir esta pessoa; lower third com nome/cargo |
| **Capítulos** | 1–4 min cada | `capitulo` (número + título) no início de cada um; re-hook na frase de transição |
| **Payoff** | — | resposta à promessa do início |
| **CTA** | últimos 10–20 s | próximo vídeo / subscrever / link; end screen limpa (sem gráficos nos últimos 20 s se o cliente usar end screens do YouTube) |

## Regras específicas
- **Cold open**: nunca "Olá, bem-vindos ao canal". Começa pelo hook e depois, se for preciso, a apresentação em 1 frase.
- **Re-hooks** a cada 30–60 s (ver `retencao.md`): punch-in + frase-ponte ("e é aqui que a maioria erra").
- **B-roll**: cada nome próprio, objeto ou sítio referido é candidato (screen recording, foto, stock). 2–4 s cada.
- **Lower thirds**: nome na 1.ª aparição; dados e fontes como `card`.
- **Capítulos**: os tempos `c:N`/`w:IDX` do `plano.txt` servem para escrever a descrição com timestamps (00:00 Intro, ...).
- **Para vídeos > 10 min**: renderiza por partes? Não é preciso, a cache por clip dá conta. Mas faz `--preview` primeiro e revê por capítulo.
- Jump cuts sem punch são aceitáveis no YouTube se o ritmo pedir. Não exageres no zoom (máx. 1,18).

## Pacote YouTube (depois do render)
Com o `plano.txt`: capítulos com timestamps, título (as skills `yt-package`/`yt-seo` ajudam) e um frame para a thumbnail (a skill `generate-youtube-thumbnail`).
