---
name: skill-edicao
description: Põe o departamento de Edição de Vídeo inteiro (as 10 salas e as 86 skills do piso 2 do Agent Floor) a trabalhar num vídeo específico. Analisa o vídeo, decide que salas e skills entram, corre as salas em paralelo com subagentes e junta tudo num render final com QC. Usar quando o utilizador escrever /skill-edicao <vídeo> ou pedir "põe a edição toda a trabalhar neste vídeo".
argument-hint: <caminho do vídeo ou pasta de footage> [objetivo: reels | youtube | anúncio | imobiliário | palestra | shorts]
---

# /skill-edicao — o departamento de Edição inteiro num vídeo

Escreve sempre em português de Portugal. O pedido chega como `/skill-edicao <vídeo> [objetivo]`.

**Regra principal:** as 86 skills são o departamento, não 86 passos. Cada vídeo usa só as que servem. Nunca carregar skills "para constar": cada sala decide o que entra e explica porque é que o resto fica de fora.

## 0. Antes de começar

1. Confirma que o vídeo existe (`ffprobe`: duração, resolução, fps, áudio). Se o caminho faltar ou não existir, pergunta só isso.
2. Lê o índice da memória de edição `C:\Users\Goldrajch\projects\Claude outputs\Edicao Video Claude\memoria\MEMORY.md` e as regras que se aplicam.
3. Escolhe o agente principal pelo tipo de vídeo (routing do CLAUDE.md global):

| Tipo | Agente principal |
|---|---|
| Imobiliário | `editor-imobiliario` (para o Cliente Exemplo, também a skill `edicao-v-exemplo`) |
| KW Palestras / KWexclusive | `editor-kw-palestras` |
| Clips virais de vlog longo | `editor-clips-virais` |
| Animação / motion graphics | `editor-animations` |
| Outro | `editor-video` |

4. Se o objetivo não vier no pedido, deduz pelo vídeo (vertical curto → reels; horizontal longo → YouTube; com produto → anúncio) e diz qual assumiste.

## 1. Análise (sala Áudio e Análise)

Corre primeiro, porque as outras salas dependem disto:
- `transcribe-audio` → transcrição com tempos.
- `analyze-video` ou `watch` → planos, cortes de cena, qualidade de imagem e de som.
- Resultado: `analise.md` na pasta de trabalho, com duração, momentos fortes, problemas (ruído, tremido, luz) e a transcrição.

## 2. Triagem das 10 salas

Com a análise, preenche esta tabela e mostra-a ao utilizador antes de gastar tempo:

| Sala | Skills | Entra quando |
|---|---|---|
| Montagem | edicao-pro, editor-video, video-use, ffmpeg, moviepy, roughcut, cut-planner, cut-the-curve, seam-craft, talking-head-recut, general-video, video-comparer | Sempre (cortes, ritmo, EDL, render, comparação antes/depois) |
| Legendas | embedded-captions, captions-overlay, video-caption-generator, transcribe-audio, hyperframes-cinematic-caption, remotion-captions | Há fala (quase sempre) |
| Remotion | remotion-best-practices, remotion, remotion-official, remotion-motion-graphics, motion-graphics, motion-doctrine, terminal-inserts, cinematic-camera, ahlec-brand-motion-system, ahlec-glass-motion-system | Títulos, grafismos, lower-thirds, intro/outro de marca |
| HyperFrames | hyperframes, hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-keyframes, hyperframes-audio, hyperframes-cli, hyperframes-registry, remotion-to-hyperframes | Grafismos HTML/keyframes quando o Remotion não é a melhor escolha |
| Animação | manim-video, vox-animation, paper-animation, claymation, oversized-cursor, faceless-explainer | Explicar um conceito, dados, vídeo sem cara |
| Shorts | short-form-pipeline, video-clip-pipeline, reels-estilo-gui, yt-shorts, Empresa Exemplo-talking-head, Empresa Exemplo-brutos, improve-retention | Saída vertical curta ou cortes a partir de vídeo longo |
| YouTube | yt-plan, yt-script, yt-viral, yt-package, yt-seo, yt-chapters, yt-retention, yt-audit, yt-competitive-analysis, yt-comment, yt-edit | Destino YouTube: título, thumbnail, capítulos, descrição, retenção |
| Vídeo IA | ai-avatar-video, video-prompter, ltx2, higgsfield, music-to-video, ugc, talking-object, dramatized-vertical-video | Falta B-roll ou plano que não foi filmado (só com o OK do utilizador, pode custar créditos) |
| Ads | ad-director, ad-generator, ad-assets, skeleton-ads, song-style-ad, product-launch-video, product-visuals, studio-shot, changelog-video, pr-to-video | O vídeo é (ou também vai ser) anúncio: variantes de hook, formatos 1:1/4:5/9:16 |
| Áudio e Análise | elevenlabs, acestep, analyze-video, summarize-video, watch, video-downloader, youtube-downloader | Sempre na análise; voz off, música e limpeza de áudio quando for preciso |

Para cada sala: **entra / não entra** e uma frase de porquê, mais as 1–3 skills que vai carregar.

## 3. Salas a trabalhar em paralelo

- Lança **um subagente por sala que entra** (Agent tool, todos na mesma mensagem), no máximo 6 ao mesmo tempo. O subagente da Montagem é o agente principal do passo 0.
- Cada subagente recebe: caminho do vídeo, `analise.md`, objetivo, regras da memória que se aplicam, as skills que lhe foram atribuídas e a pasta onde entregar. Carrega só essas skills (ferramenta Skill).
- Entregas por sala, todas em `<pasta do vídeo>\edicao\<sala>\`:
  - Montagem: EDL / plano de cortes e o primeiro render.
  - Legendas: `.srt` e o estilo.
  - Remotion / HyperFrames / Animação: os clips de grafismo renderizados.
  - Shorts: os cortes verticais.
  - YouTube: título, thumbnail, capítulos, descrição.
  - Ads: variantes de hook e formatos.
  - Vídeo IA: os planos gerados (só depois do OK do utilizador).
  - Áudio: voz/música tratadas.
- As salas não editam os ficheiros umas das outras. Dúvidas sobre o que outra sala faz resolvem-se pela Montagem.

## 4. Montagem final e QC

1. A Montagem junta tudo no render final (legendas, grafismos, áudio) com as regras da memória (cortes, legendas, SFX, exportação).
2. QC: `watch` / `analyze-video` no render, `video-comparer` contra o original. Verifica legendas (erros, zonas seguras), áudio (voz por cima da música), primeiro frame, duração, formato.
3. Se o QC falhar, volta à sala responsável. Máximo 2 voltas; depois mostra o problema ao utilizador.

## 5. Relatório

Entrega ao utilizador, curto:
- Caminho do render final (e dos cortes extra).
- Tabela: sala → o que fez → skills usadas.
- Salas que ficaram de fora e porquê.
- O que falta decidir (ex.: música com licença, gerar planos com IA).

Grava as correções que o utilizador fizer na memória de edição (`memoria\`), como as outras regras.

## Limites

- Nunca carregar as 86 skills de uma vez nem lançar 10 subagentes só para dizerem "não se aplica".
- Gerar vídeo/imagem/voz com custo (Vídeo IA, ElevenLabs) só com o sim do utilizador.
- Não publicar nada: o resultado fica em ficheiros.
