---
name: legendas-dinamicas
description: Legendas dinâmicas e tipografia em vídeo — palavra a palavra, palavra-chave colorida, caixa de pincel, estilo reels/YouTube/filme, cores (rosa, verde, amarelo, vermelho), posição e tamanho. Usa quando pedem "legendas", "legendas dinâmicas", "texto no vídeo", "títulos", ou mandam uma imagem de referência de legendas.
---

# Legendas dinâmicas

## Fluxo
1. **Texto**: transcreve (skill `cortes-e-takes`) DEPOIS dos cortes finais, para os tempos baterem com a timeline final. Corrige à mão: nomes, marcas, termos ("leads", "CRM", "Reels"), números em algarismos ("2 milhões").
2. **SRT**: 1 cue = 2–6 palavras (reels 1–3), quebra em unidades de sentido, nunca separar artigo do nome. Cue dura até a próxima começar (sem buracos curtos que piscam).
3. **Estilo**: escolhe com `references/estilos.md` ou copia a referência que o utilizador mandar (tamanho, nº de linhas, posição, cor do destaque, caixa).
4. **Render**: `scripts/legendas_dinamicas.py` → `.mov` com alfa (qtrle) → V2/V3 no DaVinci em 00:00. Usa `--preview t1 t2` primeiro e OLHA para os JPGs antes de renderizar tudo.
   - Exemplo YouTube (estilo aprovado pelo utilizador): `--estilo brush --formato 1920x1080 --tamanho 46 --y 0.912 --cor e82818 --fonte Inter-Black.ttf --partes 600`
   - Exemplo reel rosa: `--estilo destaque --formato 1080x1920 --cor ff4fa3 --y 0.70`
   - Verde: `--cor 3ddc84` · Amarelo: `--cor ffd400`
5. **Alternativa nativa**: DaVinci Linha de Tempo > Ferramentas IA > Criar legendas a partir do áudio + preset de destaque de palavra (mais rápido, menos controlo).
6. Entrega também o `.srt` corrigido (para o YouTube/closed captions).

## Regras que o utilizador já pediu (respeitar por defeito)
- "Mais pequenas, totalmente numa linha só, mais para baixo" → YouTube: 1 linha, base ~46 px em 1080p, linha base a ~91% da altura.
- Palavra-chave destacada a cor (vermelho/rosa/verde) e, de vez em quando, em caixa de pincel colorida com texto branco.
- Reels de casamento: rosa + branco, depois mudou para verde → confirma a cor e mantém-na consistente no vídeo todo.

## Truques de pro (lote 2 de referências)
- **Inter Black** é a fonte mais usada pelos editores virais; tracking ligeiramente negativo (letras quase a tocar) fica mais limpo.
- Animações de base: **Rise** (sobe + fade, ease), **Pop** (opacidade irregular em 6–10 frames), **Stretch** (zoom X 1.2→1 + blur→0), **Light sweep** (brilho que atravessa o texto + borda). Receitas em `../transicoes-e-efeitos/references/receitas-fusion.md` §7.
- **Palavra-chave a amarelo/cor** no Text+: Character Level Styling > Modifiers > Color.
- **Texto atrás do sujeito** (Magic Mask) para o hook e títulos grandes.
- Gradiente subtil no texto + drop shadow com blur = separação do fundo sem contorno feio.
- Legendas automáticas do DaVinci: estiliza pela TRACK (todas de uma vez), estica os cues para não haver buracos, mínimo ~10 caracteres por cue; exporta com **Burn into video**.
- Gráficos e animações desenham-se À VOLTA da zona das legendas; confirma com o overlay da UI do Reels/Shorts.

## Princípios tirados das referências
- **Pequeno e elegante > gigante.** Os melhores reels (tay.ldantas, Holy Smile) usam legendas pequenas brancas, 1–3 palavras, no centro-baixo; só a palavra importante muda (cor, script itálico, tamanho).
- **Contraste de tamanho** dá ritmo: "o passo a PASSO", palavra gigante numa linha + resto pequeno (estilo `empilhado`).
- **Mistura serif + sans** para títulos ("A teoria do PÊNDULO"); serif itálico enorme para a palavra emocional; risco vermelho (strikethrough) para negar algo ("esconder").
- **Texto atrás do sujeito** (máscara/Magic Mask no DaVinci) dá profundidade premium.
- **Título de capítulo fixo** no topo em vídeos longos verticais; legendas serif pequenas no meio.
- **Minimal de filme**: frase inteira, itálico branco pequeno no terço inferior (reels 16:9, documentais).
- **Hook**: título de 1–2 linhas no topo nos primeiros 2 s com 1 palavra colorida ("O Brasil virou um CEMITÉRIO de empresários").
- **Safe area 9:16**: nada nos 15–20% de baixo (UI do Instagram/TikTok) nem nos ~8% de cima; legendas à volta de 65–72% da altura.
- Sombra suave (blur 5 px, 60–70% opacidade) em vez de contorno grosso; animação curta (0,15 s fade + subida 10 px). Nada de bounce exagerado.
- Fontes boas: Inter Black/ExtraBold, Montserrat ExtraBold, Poppins SemiBold (sans); Playfair Display Italic, Instrument Serif, DM Serif (serif); para script: Allura/Great Vibes (só 1 palavra).
