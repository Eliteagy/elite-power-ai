---
name: analise-ativo
description: Analisa uma ação ou ETF (fundamentais, notícias, preço e gráfico, riscos) e produz um resumo de decisão para treino na conta demo. Usar quando pedirem para analisar um ticker, comparar ativos, avaliar uma empresa ou preparar uma tese antes de um trade demo.
---

# Análise de ativo

## Dados

- **Preço e histórico**: MCP `alpaca` (cotação atual, barras diárias, dados da empresa) quando estiver ligado.
- **Fundamentais e notícias**: pesquisa na web (relatórios da empresa, sites financeiros). Cita a fonte e a data de cada número.
- Se um dado não estiver disponível, escreve "sem dados". Nunca estimes preços ou métricas sem o dizer.

## Estrutura da análise

1. **O que é**: negócio ou índice que o ETF segue, em 3 frases.
2. **Números-chave**: preço, variação em 1 mês, 1 ano e 5 anos, capitalização, P/E, dividend yield, margem, dívida. Para ETF: TER, número de posições, top 5 posições, distribuição ou acumulação.
3. **Preço**: tendência (médias de 50 e 200 dias), máximos e mínimos de 52 semanas, volatilidade.
4. **Notícias**: 3 a 5 factos recentes que mexem no preço.
5. **Riscos**: os 3 maiores riscos.
6. **Tese para a demo**: comprar, esperar ou evitar, com o motivo, o preço de entrada, o stop e o alvo. É só para treino.

## Saída

Guarda em `analises/AAAA-MM-DD-TICKER.md` e mostra no chat um resumo de 5 linhas.

Se o utilizador quiser fazer o trade na demo, passa para a skill `diario-trades`. Nunca envies ordens a partir desta skill.

## Limites

Conteúdo educativo, não aconselhamento financeiro.
