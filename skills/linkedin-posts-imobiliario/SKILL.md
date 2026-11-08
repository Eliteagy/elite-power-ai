---
name: linkedin-posts-imobiliario
description: Escreve posts de LinkedIn para consultores e agências imobiliárias em Portugal (texto com gancho, carrossel PDF, legenda de vídeo nativo, sondagem), com plano semanal e comentários para o cliente fazer. Só rascunhos; nunca publica. Usar quando pedirem "posts de LinkedIn", "um carrossel para o LinkedIn", "o que publico no LinkedIn esta semana" ou adaptar um Reel ou guião ao LinkedIn.
---

# Posts LinkedIn — imobiliário

## Recolha

1. `Elite Agency\Redes Sociais\clientes\<cliente>\perfil.md` (persona, zonas, preço médio) e o calendário do mês.
2. Guiões e vídeos da semana (`Clientes\<cliente>\`) para reaproveitar o tema.
3. Dados do imóvel ou de vendas: só os que o cliente deu. Sem dados, `[A CONFIRMAR]`.

## Ritmo

2 a 3 posts por semana (ter, qua ou qui de manhã, 8h–10h). Alternar formatos. Na semana de angariação, falar para proprietários; na de venda, para compradores e investidores.

## Formatos

1. **Texto com gancho (900–1.300 caracteres):**
   - Linha 1 (gancho, até ~150 caracteres, antes do "ver mais"): número, contraste ou frase de bastidor. Ex.: "Um T3 em Lisboa esteve 8 meses à venda. Vendemos em 21 dias. Mudámos 3 coisas."
   - Corpo: frases curtas, uma ideia por linha, espaço entre blocos.
   - Fecho: uma pergunta para comentários ou CTA suave ("Se tem um imóvel nesta zona, escreva-me").
   - Links nunca no corpo; se for preciso, no 1.º comentário.
   - 3 hashtags no máximo (ex.: #imobiliario #lisboa #investimentoimobiliario).
2. **Carrossel PDF (6–10 slides, 1080×1350):** slide 1 = gancho grande; 1 ideia por slide; último = CTA + nome + contacto. Gerar com `anthropic-skills:pptx` ou `anthropic-skills:pdf`; marca do cliente.
3. **Vídeo nativo:** a partir do Reel, com legenda de 3–5 linhas e legendas queimadas (muitos veem sem som).
4. **Sondagem:** pergunta do mercado ("O que pesa mais na compra: localização ou preço?") + post de seguimento com o resultado.

## Temas que funcionam no imobiliário

Bastidores de uma venda, erro comum dos proprietários, dados da zona (só com fonte: INE, Idealista, Confidencial Imobiliário), checklist para vender, história de um cliente (com autorização), opinião sobre o mercado, apresentação de parceiros.

## Comentários (para o cliente fazer)

Por semana, 5 a 10 rascunhos de comentários com valor (acrescentar um dado ou uma experiência, nunca "ótimo post") em perfis de investidores, promotores e media do setor.

## Regras

- Respeitar a persona e o tom do `perfil.md`.
- Sem promessas de rentabilidade, sem discriminação, sem números inventados.
- Nunca usar "marketing" no pitch; falar de presença digital e de vender imóveis.

## Saída

Um ficheiro por post em `Elite Agency\Redes Sociais\clientes\<cliente>\AAAA-MM-DD-linkedin-tema.md`: texto final, contagem de caracteres, formato, hashtags, 1.º comentário, e atualização da linha no calendário (estado "rascunho").
