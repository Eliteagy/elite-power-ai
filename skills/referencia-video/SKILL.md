---
name: referencia-video
description: Transforma um vídeo de referência (reel, short, TikTok, YouTube, anúncio) num guião adaptado ao cliente e numa receita de edição. Analisa plano a plano com o rea-video (MCP referencias-video), transcreve a fala, revê os planos à vista e entrega a ficha da referência, o guião segundo a segundo em PT-PT e a receita de edição (ritmo, legendas, SFX, luz, música) pronta para o edicao-pro ou os editor-*. Usar quando o Gui mandar um link e pedir "faz um guião como este", "edita como este vídeo", "analisa esta referência", "o que faz este reel funcionar", ou /referencia, /guiao-ref, /editar-como.
---

# Referência de vídeo → guião + edição

Uma referência boa poupa semanas de tentativa e erro. Esta skill desmonta a referência (estrutura, ritmo, embalagem e som), tira dela o que se pode copiar e entrega duas coisas: um **guião** para o cliente e uma **receita de edição**.

## Ferramentas

- **MCP `referencias-video`** (preferido): `analisar`, `estado`, `listar`, `ficha`, `transcricao`, `frames`, `resumo`. Se as ferramentas `mcp__referencias-video__*` estiverem deferred, carrega-as com ToolSearch (`select:` com as 7).
- **Plano B, sem o MCP:** CLI `rea-video` (wrapper UTF-8 em `~/.local/bin`) e `transcrever.py` em `Apollo OB Memoria\20 - Resources\MCP e Extensões\referencias-video\`.
- **Biblioteca:** `Elite Agency\Obecidian\Vídeos Baixados - Redes Sociais\Analises\<nome>\`. Cada pasta tem `video.mp4`, `meta.json`, `transcricao.txt`, `report.html`, `shots/`, `stems/` (voz e música separadas) e `packaging/overlays.ass`.

## Fluxo

### 1. Analisar
1. Se o vídeo já estiver na biblioteca (`listar`), usa-o. Senão, chama `analisar(link)`.
2. Chama `estado(nome)` a cada 1-2 minutos até `pronto`. Um reel de 1 minuto demora 2-4 minutos; um vlog de 17 minutos, 15-25. Enquanto esperas, adianta a parte do cliente (passo 3).
3. Quando estiver pronto, lê `ficha(nome)` e `transcricao(nome)`. Se faltar a transcrição, chama `transcricao(nome, transcrever_agora=True)`.

### 2. Rever à vista (obrigatório)
O rea-video, sem modelo de visão, **chama IA a imagens reais** em vídeos descarregados, porque a recompressão apaga o ruído do sensor. Aconteceu nos 2 primeiros testes: 94% e 12% de "IA" em vídeos 100% filmados.
- Chama `frames(nome)` (vídeo inteiro, cerca de 48 frames) e lê as imagens com Read. Para ver um troço em detalhe: `frames(nome, ini, fim, 0.5)`.
- Confirma o tipo de cada bloco: filmado (pessoa a falar, b-roll, drone), clips de terceiros (famosos, TV), captura de ecrã, cartão gráfico ou IA. Só é IA se houver um defeito visível: mãos ou texto deformados, morphing, física errada, marca de água de gerador.
- Se a correção for grande, regista-a no relatório: `rea-video review <pasta>`, preenche `review_answers.json` e corre `rea-video apply-review <pasta> --by claude --lang en`. A fusão não deixa uma só revisão inverter tudo; diz isso na entrega.

### 3. Ficha da referência
Escreve-a em `Analises\<nome>\ficha.md` com:
- **Hook (0-3 s):** fala exata, imagem e texto no ecrã. Classifica o tipo de hook pela `00-Mega-Biblioteca-Hooks-Virais.md`.
- **Estrutura:** HOOK → RETENÇÃO → PAYOFF → CTA, com os tempos de cada parte. Diz qual das 5 estruturas usa (PAS, Antes-Depois, Lista, Storytelling, Tutorial) e qual dos 7 ângulos (`10-Framework-7-Angulos.md`).
- **Público e consciência:** em que nível de Schwartz está o público e que tipo de lead abre o vídeo (`12-Estagios-Consciencia-...md`).
- **Ritmo:** cortes por minuto, duração média dos planos, palavras por minuto, % de insertos, cortes na pausa ou na batida.
- **Imagem:** formato, enquadramentos, câmara (na mão, tripé, drone), luz, grade, número de locais.
- **Embalagem:** legendas (estilo, posição, destaque de palavras), textos grandes, stickers, ecrã dividido, QR e overlays de patrocínio.
- **Som:** voz real ou TTS, música (BPM, se é de biblioteca), quantidade de SFX e em que entram.
- **O que copiar / o que não copiar:** clips de terceiros com direitos de autor, marcas e famosos.

### 4. Guião para o cliente
1. Lê o perfil do cliente: kickoff e persona na pasta do cliente, ou memória como `cliente-exemplo-cliente`. Se não houver cliente, pergunta para quem é, numa só pergunta.
2. Imobiliário: segue a skill `guioes-imobiliario` (funil, angariação, PT-PT, tabela segundo a segundo). Outros temas: `01-Roteiros-Virais.md` e os exemplos de tom em `Conteudo\`.
3. **Copia a estrutura, não o conteúdo.** Mantém a mecânica do hook, a ordem dos blocos, o tempo de cada parte, a densidade de palavras e o padrão de CTA. Troca o tema, os exemplos e os nomes pelos do cliente.
4. **Formato:** tabela `Tempo | Imagem/plano | Fala | Texto no ecrã | SFX/música`, seguida de:
   - plano de gravação (local, enquadramentos, luz, roupa);
   - 3 hooks alternativos;
   - legenda do post;
   - CTA.
5. Grava em `Analises\<nome>\guioes\<cliente>-<data>.md` e, se houver pasta do cliente, também lá.

### 5. Receita de edição
Grava `Analises\<nome>\receita.json`. Os campos mapeiam diretamente para a EDL do `edicao-pro`:
```jsonc
{
  "referencia": "<nome>", "formato": {"w":1080,"h":1920,"fps":30},
  "ritmo": {"cortes_por_min": 19.5, "plano_medio_s": 1.3, "max_gap": 0.25, "punch": {"cada": 3, "niveis": [1.0, 1.15]}},
  "estrutura": [{"bloco":"hook","ini":0,"fim":3,"tecnica":"ecrã dividido + famoso + texto fixo topo"}],
  "legendas": {"estilo":"palavra a palavra","fonte":"serifa","cor":"branco","destaque":"palavra-chave grande itálico","posicao":"centro"},
  "graficos": ["caixa branca com hook no topo 0-9 s"],
  "broll": {"percentagem": 30, "tipo": ["clips de terceiros","drone"], "ecra_dividido": true},
  "sfx": {"quantidade_por_min": 50, "onde": "em cada texto que aparece", "tipo": ["pop","whoosh"]},
  "musica": {"bpm": 132, "tipo": "biblioteca, por baixo da voz", "ducking": true},
  "grade": "quente, saturado", "luz": "suave frontal + práticos quentes no fundo",
  "notas": "o que não copiar"
}
```
Depois passa a edição a quem a faz:
- **talking head / reels / anúncios:** `edicao-pro`. Converte a receita em `aroll.max_gap`, `punch`, `legendas`, `sfx`, `musica` e `grade` da EDL.
- **imobiliário:** agente `editor-imobiliario`;
- **estilo do Gui/Carlos Dias:** `reels-estilo-gui`;
- **cortar clips de um vídeo longo:** `editor-clips-virais`;
- **motion graphics, cartões ou listas animadas:** `hyperframes` ou `editor-animations`;
- **recriar a referência quase tal e qual:** `reverse-any-video` (HyperFrames).

### 6. Entrega
Responde com o Formato de saída da agência: Resumo, Entregável (ficha curta, guião e caminho da receita), O que falta ou a confirmar, Próximo passo. Antes de ir para o cliente, passa pelo `gestor-qualidade`.

## Regras
- Nunca apresentes "é IA" sem ter visto os frames.
- Nunca copies a fala palavra por palavra nem uses clips de terceiros no vídeo do cliente sem avisar dos direitos de autor.
- Geração paga (capsule-cinema, Kling, Veo, MiniMax) só com um sim explícito do Gui.
- Tudo em português de Portugal. A transcrição fica na língua original; o guião sai em PT-PT, convertendo o brasileiro.
- A biblioteca é reutilizável: antes de analisar, procura uma referência parecida que já lá esteja e compara.
