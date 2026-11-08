# Retenção: fazer o espectador ficar

A retenção perde-se quando o cérebro prevê o que vem a seguir. O editor quebra essa previsão com ritmo e com **pattern interrupts**, e mantém a curiosidade com **loops abertos**.

## Cadência de pattern interrupts
| Formato | Mudança visual a cada | Ferramentas (por ordem de subtileza) |
|---|---|---|
| Reel/Short 9:16 | 2–4 s (máx. 4 s, o QC avisa) | punch-in → b-roll → card/número → SFX + flash |
| YouTube 16:9 | 5–8 s (máx. 8 s) | punch-in → b-roll → lower third/capítulo → música muda |
| Anúncio | 0,8–1,5 s | corte no beat, mudança de escala, texto |

"Mudança visual" = corte, punch-in, b-roll, gráfico a entrar, transição. O QC mede a maior distância entre mudanças.

## Ferramentas
1. **Punch-in** (100% ↔ 112–118%) na mudança de ideia. Esconde jump cuts. É automático com `aroll.punch`.
2. **B-roll** a ilustrar literalmente o que é dito (diz "contrato" → aparece o contrato). 1–2,5 s. A voz continua por baixo.
3. **Texto/número** quando há um dado concreto (`numero`), uma lista (`card` "1/4") ou um conceito-chave.
4. **Mudança de escala**: close → largo → detalhe. O cérebro regista "novo".
5. **Som**: whoosh no b-roll, pop no texto, riser antes de uma revelação, **silêncio súbito** antes da frase mais importante (corta a música 0,5 s antes).
6. **Velocidade**: a energia sobe com cortes mais rápidos; a emoção pede planos mais longos. Alterna: nunca o mesmo ritmo mais de ~15 s.

## Loops abertos (retenção narrativa)
- **Promessa no início, entrega no fim**: "o 3.º é o que mais custa" → o 3.º vem em último.
- **Pergunta sem resposta**: "quanto achas que custou?" → a resposta só no fim.
- **Lista numerada visível**: o espectador quer ver o "4/4".
- **Re-hook (YouTube)** a cada 30–60 s: uma frase-ponte que abre o bloco seguinte ("mas isto não funciona se..."), com capítulo ou punch-in.
- Não fechar o loop principal antes dos últimos 15% do vídeo.

## Cortar para reter
- Corta **a meio do pensamento seguinte**, não depois de uma pausa: `max_gap` 0,25–0,3 nos reels e 0,35 no YouTube.
- Tira introduções a frases ("então", "basicamente", "ok", "bem"), repetições e explicações que o visual já mostra.
- O 1.º corte do reel deve acontecer antes dos 3 s.
- Regra dos 80%: se dá para cortar 20% sem perder a mensagem, corta.

## O fim (o que gera replays e ação)
- **Payoff** claro: a resposta ao loop do início.
- **CTA** de 1 ação só (comentar uma palavra, seguir, link). Cápsula `cta` nos últimos 2–3 s.
- **Loop**: se a última frase encaixa na primeira, corta o fim seco (sem fade). O replay conta como retenção > 100%.
- Sem "obrigado por verem" longo: no máximo 1 s, ou corta.

## Duração alvo
| Formato | Alvo |
|---|---|
| Reel/Short educativo | 20–45 s (máx. 60) |
| Reel imobiliário | 15–35 s |
| Anúncio | 15–30 s |
| YouTube | o mínimo que entrega a promessa; cada minuto tem de justificar-se |
