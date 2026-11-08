---
name: cortes-e-takes
description: Cortes de fala e montagem a partir do áudio — transcrever em português, escolher a última repetição de cada frase, remover respiros/pausas/"hum", apertar voz off e gerar timeline FCPXML para o DaVinci. Usa quando o vídeo tem fala, takes repetidos, voz off ou quando pedem "corta as respirações/pausas".
---

# Cortes, takes e voz apertada

## Ferramentas (pasta `scripts/`)
| Script | Faz |
|---|---|
| `transcrever.py` | Whisper turbo (sherpa-onnx) + Silero VAD, PT. Imprime `início-fim \| texto` por frase. `--intervalos 10-20 35-40` transcreve só esses trechos. |
| `escolher_takes.py` | Lê a transcrição, agrupa frases repetidas (similaridade) e fica com a **última repetição completa**; descarta falsos arranques, "novamente", "vamos repetir", palavrões. Gera `segmentos.json`. |
| `remover_respiros.py` | Remove respiros e pausas dentro de cada segmento (RMS), crossfades de 8 ms, high-pass 80 Hz + compressão + loudnorm −16 LUFS. Gera WAV + JSON dos pedaços mantidos (para cortar o vídeo igual). |
| `gerar_fcpxml.py` | Plano JSON → FCPXML 1.9 (tempos racionais exatos) para Arquivo > Importar > Linha de Tempo. |

Instalação na cloud: `pip install sherpa-onnx numpy --break-system-packages`; modelos (GitHub releases do k2-fsa/sherpa-onnx): `sherpa-onnx-whisper-turbo` (int8) e `silero_vad.onnx` — ver `transcrever.py --help`.

## Fluxo para talking-head com repetições (ex.: vídeo YouTube de qualificação)
1. Extrai áudio 16 kHz mono e transcreve tudo → lê a transcrição inteira tu próprio (não confies só no script).
2. O utilizador repete a mesma frase 3–4 vezes: **fica a ÚLTIMA versão completa e limpa**. Se a última tem um erro no fim ("...já me f*di", "novamente"), usa a penúltima completa, ou junta a primeira metade de uma com o fim de outra se o enquadramento for igual.
3. Monta a lista de segmentos pela ordem do guião (não pela ordem de gravação).
4. Dentro de cada segmento remove pausas > 0,35 s (deixa ~0,08–0,10 s de ar) e respiros.
5. Faz um preview rápido (ffmpeg concat) e OUVE as junções; corrige cortes a meio de palavra (alarga 30–60 ms).
6. Corrige a transcrição para as legendas (nomes próprios, termos: "leads", "CRM", "Reels", marcas).

## Fluxo para voz off (casamento, imobiliário)
1. Aperta a voz off primeiro (`remover_respiros.py`): sem respiros, sem pausas longas, ritmo constante. Mantém pausas intencionais curtas (0,2–0,4 s) entre ideias.
2. Transcreve a voz apertada → cada frase recebe um plano que a ilustra (literal ou metáfora). Plano muda na frase ou na batida, nunca a meio de uma palavra-chave.
3. Planos com a pessoa a falar para a câmara NÃO entram quando o vídeo é só voz off (salvo pedido).
4. Áudio original dos clips: baixa para −20/−25 dB como ambiente por baixo da voz (ou mantém se pedirem "áudio original").

## Montagem de b-roll (imobiliário/BTS)
- Duração alvo respeitada (ex.: máx. 45 s). 1,5–3 s por plano; detalhes 1 s.
- Ordem lógica: chegada/fachada → pessoas (consultor + cliente) → entrada/escadas a subir → divisões → vista/remate → fecho com as pessoas.
- Mostra pessoas: os planos com gente dão escala e emoção — prioriza-os.
- Corta no movimento (a meio de um passo, de uma porta a abrir) para os cortes ficarem invisíveis.
- Clips longos (minutos): faz contact sheet a 1 frame/2 s para escolher os melhores 2–4 s de cada.

## Armadilhas aprendidas
- Clips de iPhone a 24 fps vs 29,97 na timeline: o FCPXML precisa de `format` por asset com `frameDuration` próprio (`100/2400s` para 24p, `1001/30000s` para 29,97).
- Ficheiros grandes (> 30 MB) não passam de uma vez pela ponte ao PC: divide em partes ou entrega via DaVinci render local.
- Nunca reconstruir ficheiros a partir de output de ferramenta truncado.
