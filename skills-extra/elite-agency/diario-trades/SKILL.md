---
name: diario-trades
description: Faz e regista trades na conta demo Alpaca paper em modo autónomo (dentro das regras de risco do trader-demo), mantém o diário em diario/trades.md e diario/trades.csv e faz a revisão semanal em R-múltiplos. Usar quando pedirem para comprar ou vender na demo, ver posições, registar um trade ou rever o desempenho.
---

# Diário de trades demo

As regras de risco são as do agente `trader-demo` e só essas: 5% do equity por posição, 1% de risco por trade, stop obrigatório, máximo 3 trades novos por dia e 10 posições. Na conta **paper** decide-se e executa-se sem pedir confirmação.

## Segurança

1. Confirma que a conta é paper (número de conta começa por `PA`). Se houver dúvida, para e regista o motivo no diário.
2. Antes de cada ordem, faz as contas com o script do `position-sizer` e confirma que cumprem as regras. Se não cumprirem, não envias.
3. Entradas sempre com ordem **bracket**, `time_in_force` **gtc** (nunca `day`: o stop expira no fecho).

## Abrir um trade

1. Lê a tese em `analises/` (do `analista`).
2. Envia a ordem bracket pelo MCP `alpaca`.
3. Regista nos dois ficheiros:
   - `diario/trades.md`: data, ativo, lado, quantidade, entrada, stop, objetivo, risco em $ (1R), tese.
   - `diario/trades.csv` (cria com o cabeçalho se não existir):
     `data_entrada,ticker,lado,qtd,entrada,stop,objetivo,risco_usd,setup,data_saida,saida,resultado_usd,r_multiplo,regras_cumpridas,licao`

## Fechar um trade

Quando o stop ou o objetivo executa, ou a tese cai:
1. Atualiza a linha nos dois ficheiros: data e preço de saída, resultado em $, **R-múltiplo** = resultado ÷ risco inicial, se as regras foram todas cumpridas (sim ou não) e uma lição concreta (o que fazer diferente, não "ter paciência").

## Ver estado

Saldo, posições abertas com ganho ou perda e R atual, ordens pendentes e se cada posição tem stop gtc ativo, numa tabela.

## Revisão semanal (sexta)

Calcula a partir de `diario/trades.csv` (com Python, não de cabeça):
- Número de trades, taxa de acerto, R médio dos ganhos e das perdas, **expectancy** em R, profit factor, maior drawdown.
- Resultado da conta vs. SPY na mesma semana.
- Regras quebradas (devem ser zero).
- Melhor e pior trade, e porquê; 3 lições e 1 regra para a semana seguinte.

As skills `weekly-performance-digest` e `trade-performance-coach` servem de referência para as métricas.

Guarda em `diario/revisao-AAAA-MM-DD.md`.
