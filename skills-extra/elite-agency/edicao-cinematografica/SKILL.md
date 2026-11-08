---
name: edicao-cinematografica
description: Ponto de partida para QUALQUER edição de vídeo (reel, YouTube, casamento, imobiliário, anúncio, curta) em DaVinci Resolve, Premiere Pro ou Blender. Usa quando o pedido é "edita este vídeo", "faz um reel", "monta com voz off", "deixa cinematográfico", "mete efeitos", ou para analisar vídeos de referência. Define o pipeline completo e encaminha para as outras skills do plugin.
---

# Edição cinematográfica — pipeline mestre

Este plugin junta o que aprendi a editar vídeos reais (casamento com voz off, reel imobiliário BTS, vídeo de qualificação para YouTube) e a análise de 62 vídeos de referência (`references/referencias-analisadas.md`). Segue esta ordem; cada passo tem uma skill própria com detalhe.

## 0. Antes de tocar na timeline
1. **Qual é o formato?** Reel 9:16 (máx. 45–90 s), YouTube 16:9, anúncio 15–30 s, curta. Pergunta a duração máxima se não for dita.
2. **Qual é a história em 1 frase e o que o público deve SENTIR?** (o som, a cor e o ritmo decidem-se a partir disto).
3. **Inventário dos clips**: transcreve tudo o que tem voz (`cortes-e-takes/scripts/transcrever.py`) e faz contact sheets dos planos (ffmpeg `tile`) para saber o que existe. Marca: A-roll (fala para a câmara), B-roll, planos com pessoas, planos "assinatura" (escadas, fachada, vista, detalhe).
4. **Exclui o que o cliente disse para excluir** (ex.: clips onde ele fala para a câmara quando o vídeo é só voz off; pessoa a arranjar o cabelo, etc.).

## 0.5 Áudio primeiro (o maior atalho)
Antes de tocar nos clips, monta a **espinha sonora**: voz off/hook + música + 2–3 SFX-chave. Vê-se logo onde a VO é longa demais, qual é o ritmo e em que beats caem as ações. Depois é só "meter os planos". Escolher a música é o 1.º passo; ela dita o ritmo.

## 1. Estrutura (antes de ritmo)
- Constrói primeiro **3 pontos-chave**: o hook/primeira transição, o clímax e o final. Edita à volta deles.
- Hook nos primeiros 1–2 s: plano mais forte + texto grande com 1 palavra-chave colorida.
- Com voz off: **a voz manda**. Corta a voz primeiro (bem apertada), depois encaixa os planos frase a frase: cada frase → plano que a ilustra (metáfora visual quando possível).
- Final: plano que fecha (ou loop perfeito: último frame = primeiro) + end card/CTA limpo.
- Arco de história com fala (mesmo num reel de 60 s): hook → contexto/família → conflito → viragem → prova (números concretos) → recompensa/lição/CTA.
- **Assembly edit**: põe os clips bons por ordem (início, meio, fim) sem polir, com a VO e a música temporária, e vê tudo do início ao fim. Só depois afinas. Nunca passes horas a polir os primeiros 30 s.
- **Sê implacável**: um plano bonito que não serve a história sai.

## 2. Cortes → skill `cortes-e-takes`
Takes repetidos: fica **sempre a última repetição completa**. Remove respiros, pausas > 0,35 s, "hum", palavrões, falsos arranques.

## 3. Ritmo
- Reels: 1–1,5 s por plano no b-roll rápido; 2–4 s quando há emoção. YouTube talking-head: alterna 2 ângulos ou punch-in (100% ↔ 115–120%) a cada 3–6 s.
- Acelera no build-up, segura (ou slow-motion) no clímax, respira no fim.
- Corta no movimento e na batida; **fluxo visual**: se algo se move para a direita, o plano seguinte continua para a direita.
- Repetição com variação conta histórias sem palavras (mesmo plano-tipo, emoção diferente).
- **Pacing = pulso**: não fiques no mesmo ritmo muito tempo. Alterna: planos curtos e handheld com beat forte (energia) ↔ planos longos e estáveis com música suave ou silêncio (emoção). Marca os momentos grandes e os calmos e flui entre eles.
- **Beat accents**: em vez de cortar sempre no beat, põe uma AÇÃO no beat (pousar algo, entrar no quadro, levantar a sobrancelha).
- **Contraste e surpresa** 1 ou 2 vezes por vídeo: freeze frame com texto nos primeiros 3 s, corte seco para silêncio, smash cut.
- Os 10 cortes: cut, jump cut, match cut (gráfico/movimento/áudio), J-cut, L-cut, fade, dissolve, cutting on action, cross-cutting, smash cut. Escolhe com intenção.
- Escala extrema (close ↔ largo) prende a atenção sem o espectador perceber porquê.
- Match cuts: mesma forma/posição/movimento entre dois planos diferentes.

## 4. Legendas e texto → skill `legendas-dinamicas`
## 5. Look/cor/formato → skill `look-cinematografico`
## 6. Som → skill `sound-design`
## 7. Layouts, b-roll, motion graphics, VFX para reels → skill `reels-e-motion`
## 7.5 Transições e efeitos (speed ramps, máscaras, imobiliário, 3D) → skill `transicoes-e-efeitos`

## 8. Organização da timeline (padrão de pós-produção profissional)
- V1 A-roll/plano principal · V2 b-roll/cutaways · V3 títulos, legendas (.mov com alfa) e overlays · V4 ajustes/adjustment clips.
- A1 voz/diálogo · A2 voz off · A3 música · A4 SFX · A5 ambiente. Uma cor de clip por função (vermelho = por corrigir/offline).
- Marcadores para momentos-chave (hook, clímax, drop da música).

## 8.5 Passe de afinação (o que separa o 1.º corte do final)
Depois do primeiro corte completo, faz sempre esta revisão:
1. Tira as **micro-pausas** entre frases e reações. Um anúncio de 49 s ficou em 37 s com os mesmos planos.
2. Vê se algum corte está fora do beat e corrige-o ao frame.
3. Os planos demasiado rápidos seguram-se mais um pouco, para a ação se ler.
4. Põe crossfade de 5–10 ms em cada junção de áudio, para não haver cliques.
5. Confirma que o movimento continua entre cortes (a direção e o sítio para onde o olho vai).
6. Os gráficos e textos nunca tapam a zona das legendas nem a UI das redes.
7. Loudness final: diálogo −16 LUFS, a mistura toda −14 para as redes.

## 9. Entrega
- Reel: 1080×1920, 30 fps (ou o fps da fonte), H.264/H.265 ~16–20 Mbps, áudio AAC 320k, loudness −14 LUFS (redes) / −16 LUFS (voz). YouTube 16:9: 1920×1080 ou 4K.
- Antes de entregar: vê contact sheet do resultado, confirma a duração, ouve as junções de áudio, confirma legendas sem gralhas e sem sair do ecrã (safe area: nada importante nos 15% de baixo no Reels/TikTok).
- Exporta para a pasta que o utilizador pediu (por defeito `Vídeos`).

## Ferramentas
- **DaVinci Resolve** (preferido; UI em português): ver `references/davinci-workflow.md`.
- **Premiere Pro**: ver `references/premiere-workflow.md`.
- **Blender** (3D, VFX de produto, texto 3D, câmaras virtuais): ver `references/blender-workflow.md`.
- **Efeitos sonoros**: pasta `efeitos-sonoros` na EDICOES (52 SFX originais), ou gera mais com `sound-design/scripts/gerar_sfx.py`.
- **Contexto que preciso de pedir**: guião ou hook, referências de estilo (2–3 vídeos/screenshots), LUTs, fontes e música da marca. Com isto, a 1.ª versão fica cerca de 80% certa.
- **Sem DaVinci aberto**: monta tudo com ffmpeg na cloud e entrega o MP4 final, ou gera `.fcpxml` (`cortes-e-takes/scripts/gerar_fcpxml.py`) para importar depois.
- **Analisar referências** (YouTube/Instagram no Chrome do utilizador): `references/analisar-referencias.md` + `scripts/contact_sheet.js`.

## Regras de ouro tiradas das referências
1. Cenário com vida (luz prática quente, profundidade, gente/plantas desfocadas atrás) > parede lisa.
2. Menos é mais na cor: subtrai e controla em vez de adicionar.
3. O som faz 50% do "cinematográfico": camadas de ambiente, foley, SFX nas transições, música por último.
4. Legendas pequenas e elegantes vencem legendas gigantes — destaque só numa palavra.
5. Cada elemento gráfico entra quando é dito (sincronizado com a voz).
6. Um conceito visual forte + repetição + 1 virada = memorável em 60 s.
7. Filma ou pede cobertura **3+1** por cena (wide, medium, close + 1 plano criativo como POV ou zenital). Assim as sequências fluem.
8. Luz do lado da sombra (a luz principal do lado oposto à câmara) e candeeiros práticos em vez de luz de teto. A cor nasce no set e o grading amplifica.
9. **Front-load**: o melhor material vai logo no início. A intro recompensa o clique na hora.
