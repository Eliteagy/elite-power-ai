---
name: imobiliario-investimento
description: Calcula a rentabilidade de um imóvel para investimento em Portugal (yield bruta e líquida, cap rate, cash flow, cash-on-cash, prestação do crédito, IMT, IS, IMI, IRS sobre rendas) e compara com outras alternativas. Usar quando pedirem para avaliar um imóvel como investimento, preparar números para um cliente investidor ou comparar imóvel com ETF ou depósito.
---

# Imobiliário como investimento

## Dados de entrada

Pede o que faltar e marca como "assumido" o que for estimado:
- preço de compra, renda mensal, zona
- custos: condomínio, IMI, seguros, manutenção (defeito: 5% da renda), vacância (defeito: 1 mês por ano), gestão
- financiamento: entrada, taxa de juro, prazo
- custos de compra: IMT, Imposto do Selo (0,8%), escritura e registo, obras

Taxas de IMT, IRS sobre rendas e Euribor mudam. Pesquisa os valores atuais na web e cita a fonte com data.

## Cálculos

- **Yield bruta** = renda anual / preço
- **Yield líquida** = (renda anual - custos anuais) / (preço + custos de compra)
- **Cap rate** = NOI / preço
- **Prestação mensal**: fórmula de amortização francesa
- **Cash flow mensal** = renda - custos mensais - prestação
- **Cash-on-cash** = cash flow anual / (entrada + custos de compra + obras)
- **Após impostos**: IRS sobre rendas à taxa atual

Mostra cada fórmula com os números aplicados, para a equipa de vendas aprender a fazer as contas.

## Saída

1. Tabela com todos os indicadores.
2. Cenários: base, pessimista (renda -10%, vacância 2 meses, juro +1 ponto) e otimista.
3. Comparação com um ETF global (retorno histórico com fonte) e com um depósito a prazo.
4. Um parágrafo pronto para explicar o resultado a um cliente.

Guarda em `notas/imovel-<zona>-AAAA-MM-DD.md` se o utilizador quiser.

## Limites

Simulação educativa, não aconselhamento financeiro nem fiscal. Para decisões reais, recomenda falar com um contabilista.
