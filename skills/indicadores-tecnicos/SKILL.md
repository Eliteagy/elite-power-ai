---
name: indicadores-tecnicos
description: Calcula por script os indicadores técnicos diários de ações e ETF dos EUA (preço, SMA20/50/200, tendência, RSI14, ATR14, stop a 2×ATR, volume relativo, máximos e mínimos de 52 semanas), com a data e a fonte dos dados. Usar antes de qualquer análise ou trade na sala Investimentos, para o regime de mercado (SPY) e sempre que for preciso um número técnico. Nunca calcular estes valores de cabeça.
---

# Indicadores técnicos (por script)

## Correr

```bash
python "<pasta desta skill>/scripts/indicadores.py" SPY NVDA MSFT
```

A pasta desta skill é `~/.claude/skills/indicadores-tecnicos/`. Dependências: `pandas`, `yfinance` (já instaladas).

## Ler o resultado

| Campo | Para que serve |
|---|---|
| `data_dados` | Dia do último fecho. Se não for o último dia útil, diz-o na análise. |
| `acima_sma200`, `tendencia` | Regime. SPY abaixo da SMA200 = mercado em risco (no máximo 1 trade e só muito forte). Num ticker, só comprar com `tendencia` "alta" ou "mista" com motivo claro. |
| `rsi14` | Acima de 70 = esticado (esperar recuo); abaixo de 30 = fraco, não é sinal de compra sozinho. |
| `atr14`, `atr14_pct` | Volatilidade diária. Base do stop. |
| `stop_2atr` | Stop sugerido = fecho − 2×ATR. Passa este valor ao `position-sizer`. |
| `volume_relativo` | Acima de 1,5 = interesse invulgar no dia. |
| `dist_max_52s_pct` | Perto de 0 = junto aos máximos (força); muito negativo = tendência fraca. |

## Quantidade (position-sizer)

```bash
python ~/.claude/skills/position-sizer/scripts/position_sizer.py --account-size <equity> --entry <preço> --atr <atr14> --atr-multiplier 2 --risk-pct 1 --max-position-pct 5 --output-dir diario/sizing/<TICKER>
```

## Regras

- Com o mercado aberto, a última barra é do dia em curso (volume parcial): o `volume_relativo` desse dia ainda não conta.

- Copia o JSON (ou os campos usados) para a análise, com a `fonte` e a `data_dados`.
- Na secção "Contas" da análise, mostra como cada número entra no plano: stop, risco por ação, quantidade, objetivo a 2R.
- Se o script devolver `erro`, não inventes valores: diz que faltam dados.
