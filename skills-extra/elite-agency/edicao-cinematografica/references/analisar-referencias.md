# Como analisar vídeos de referência (YouTube / Instagram) no Chrome

O WebFetch não lê Instagram (robots.txt) nem vê vídeo. Método fiável no Chrome do utilizador:

1. Abre um separador novo e navega para o link; espera ~4 s.
2. Injeta `../scripts/contact_sheet.js` com o javascript_tool (define `window.sheet`).
3. YouTube: `document.querySelector('.html5-video-player').classList.contains('ad-showing') ? 'AD' : await sheet()`
   - Se devolver `AD`: tira screenshot e faz um clique REAL no botão "Ignorar" (fica ~ (805, 435–465) com a janela normal). Cliques por JS no botão de saltar são ignorados.
   - Instagram: `await sheet(null, 8)`.
4. Uma screenshot (escala 0,85) mostra a grelha: 12 frames espalhados pelo vídeo + 12 frames seguidos (1 s) para ver o ritmo de corte.
5. Tutoriais: lê a transcrição — expandir descrição (`#expand`), clicar "Mostrar transcrição", juntar `ytd-transcript-segment-renderer, transcript-segment-view-model` numa string `window.tx`. O output do JS é cortado a ~880 caracteres → lê em fatias ou filtra frases por palavras-chave (`tx.split(/(?<=[.!?])\s+/).filter(...)`).
6. Regista: formato/aspeto, legendas (tamanho, posição, cor, nº de palavras), ritmo (s por plano), cor/look, layout, motion graphics, som (se houver transcrição), e a LIÇÃO aplicável.
7. Fecha os separadores criados no fim.

Problemas conhecidos: se as screenshots dão timeout, a janela do Chrome está minimizada — pede ao utilizador para a trazer para a frente.
