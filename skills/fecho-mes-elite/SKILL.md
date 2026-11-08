---
name: fecho-mes-elite
description: Faz o fecho do mês da Elite Agency com as fontes reais (CRM em Postgres, recebimentos, subscrições, gastos de anúncios) e grava o relatório mensal com receita faturada e recebida, despesas, margem, MRR, margem por cliente, CAC e preço por hora real, em Markdown e XLSX. Usar quando pedirem "como fechou o mês", "fecho de outubro", "relatório mensal", MRR, margem ou se um cliente ou pacote compensa.
---

# Fecho do mês — Elite Agency

Nunca inventes números. Célula sem dados = "sem dados" e onde estaria.

## Fontes (todas só de leitura)

| Dado | Onde |
|---|---|
| Clientes, valores, estados, data de fecho | CRM em Postgres, tabela `cliente`: `nome`, `empresa`, `status`, `valor_cents`, `metodo_pagamento`, `fechado_em`. A `DATABASE_URL` está em `Elite Agency\CRM\dashboard\.env.local` (nunca a mostrar). Antes de correr Node: `unset ANTHROPIC_API_KEY ANTHROPIC_AUTH_TOKEN ANTHROPIC_BASE_URL ANTHROPIC_MODEL`. Só `SELECT`. |
| Faturado e recebido | `C:\Users\Goldrajch\Desktop\The elite Agency\Faturas\recebimentos.md` (e o software de faturação, quando estiver ligado) |
| Despesas fixas | `Financas\despesas\subscricoes.md` e as despesas pontuais em `despesas\` |
| Gasto em anúncios | `Elite Agency\Ads\relatorios\` |
| Horas por cliente | o Gui (perguntar se não houver registo) |
| Preços | `Financas\precos\tabela-precos.md` |

## Cálculos

- **Receita faturada** e **receita recebida** do mês, sempre separadas.
- **MRR**: soma dos contratos mensais ativos no último dia do mês. Só clientes que pagaram; um lead `qualificado` nunca conta.
- **Despesas**: fixas, pontuais e anúncios.
- **Margem** = recebido − despesas, e a margem em %.
- **Margem por cliente** = valor do pacote − custo direto (horas × custo por hora + custos de produção).
- **Preço por hora real** = valor do pacote ÷ horas gastas nesse cliente.
- **CAC** = (anúncios + ferramentas de prospeção do mês) ÷ clientes novos do mês. Diz o que ficou de fora (o tempo de vendas, se não houver horas).
- **Em atraso**: total e lista por cliente (de `recebimentos.md`).

## Saída

1. `Financas\relatorios\AAAA-MM.md`:
   - 3 conclusões no topo, em frases curtas;
   - tabela de números, com a fonte de cada linha;
   - clientes: valor, horas, €/hora e margem;
   - recomendações: subir preço, cortar custo, cobrar atrasos, largar cliente;
   - "Dados em falta" no fim.
2. `Financas\relatorios\AAAA-MM.xlsx`, com a skill `anthropic-skills:xlsx` (folhas Resumo, Clientes, Despesas e Atrasos).
3. Gráficos só quando pedidos, com a skill `dataviz`.
