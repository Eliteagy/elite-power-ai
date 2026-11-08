# Design de legendas e gráficos: Apple HIG aplicado a vídeo

Fonte: Apple Human Interface Guidelines (developer.apple.com/design: Typography, Color, Motion, Layout, Accessibility, Branding). Adaptado ao ecrã de vídeo das redes. Já está implementado em `graficos.py`; isto é o critério para decidir e rever.

## Tipografia
- **Inter** (`assets/fonts`, licença OFL) é o substituto livre da SF Pro, com métricas e carácter muito próximos. A SF Pro não pode ser redistribuída fora das plataformas Apple.
- **Nunca pesos leves** (Thin/Light/ExtraLight); em vídeo, que se vê em movimento e num ecrã pequeno, ainda menos. Usa Semibold (corpo, cards), Bold (legendas, nomes), ExtraBold/Black (títulos, hook, números).
- **Hierarquia por peso e tamanho, não por mais fontes.** Uma família só. Se houver fonte de marca, fica só para títulos e a Inter para legendas.
- **Tamanhos mínimos** (equivalentes ao 17 pt do iOS num telemóvel): legendas ≥ 3,6% da altura em 9:16 (≥ 69 px em 1920) e ≥ 3,4% × 1,25 em 16:9. Títulos ≥ 4,6%.
- Tracking ligeiramente negativo em títulos grandes (−2%), como faz a SF Display. Sem maiúsculas espaçadas em blocos longos; maiúsculas só no estilo `impacto` (1–3 palavras).

## Cor
- **Uma cor de destaque** por vídeo (default: amarelo de sistema `#FFD60A`; alternativas: laranja, verde, azul, vermelho, dourado da marca). Usa-a com intenção: só na palavra-chave do título, na legenda de destaque e na barra do lower third. Usar a cor em tudo dilui o impacto.
- **A mesma cor significa sempre o mesmo**: destaque = importante. Não a uses também para decoração.
- **Contraste ≥ 4,5:1** (texto pequeno) e ≥ 3:1 (títulos grandes/bold). O render mede o fundo real e escolhe texto claro ou escuro e um acento com contraste suficiente. Fundo misto (parede + camisa) → texto branco com sombra suave.
- **Material escuro** (`#1C1C1E`, 82% opaco) por trás dos cards. É o equivalente aos materiais do sistema. Cantos contínuos (raio 32% da altura); a CTA é uma cápsula (raio 50%), como os botões primários do iOS.

## Layout
- **O conteúdo manda**: os gráficos nunca tapam o rosto nem a ação. O `pos: auto` mede o rosto e escolhe acima ou abaixo.
- **Safe areas das redes** (9:16): nada importante nos 13% de cima (nome/perfil) nem nos 20% de baixo (descrição/botões). Do lado direito (botões de like) evita texto crítico além dos 88% da largura. Os cards têm no máximo 86% da largura.
- **Alinhamento consistente**: títulos e legendas centrados no eixo vertical; lower thirds alinhados à esquerda, na margem de 8%.
- **Agrupamento**: o título e o subtítulo de um gráfico entram juntos (desfasados 60–70 ms, nunca em tempos soltos).
- **Divulgação progressiva**: uma ideia por ecrã. Listas entram item a item, quando são ditas.

## Motion
- **Com propósito**: o movimento acompanha a fala ou a ação. Nada se mexe sem motivo; nada de loops infinitos nem de pulsar.
- **Breve e preciso**: entradas de 120–250 ms; saídas mais curtas (140 ms).
- **Ease sempre** (ease-out à entrada, ease-in à saída); nunca linear.
- **Realista**: o texto sobe 0,35 em altura de linha com fade, o card faz pop 92→100%, o lower third desliza 40 px na direção da leitura e a barra cresce de baixo para cima.
- **Consistente**: o mesmo tipo de gráfico anima sempre da mesma forma no vídeo inteiro.

## Marca
- A marca dá prioridade ao conteúdo. **Nada de logo no início** nem a ocupar espaço o vídeo todo. Logo só no end card ou como assinatura discreta.
- A voz da marca está nas palavras (o tom dos títulos e da CTA), não na decoração.

## Revisão visual (em cada preview)
- [ ] Algum texto tapa olhos/boca/rosto?
- [ ] O texto lê-se no frame mais claro e no mais escuro da sua duração?
- [ ] O destaque aparece no máximo 1× por frase?
- [ ] Tudo fica dentro das safe areas?
- [ ] O mesmo tipo de gráfico tem sempre a mesma posição e animação?
