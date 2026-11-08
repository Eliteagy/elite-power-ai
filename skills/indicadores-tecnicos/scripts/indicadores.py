"""Indicadores técnicos diários por script, para nenhum agente fazer contas de cabeça.

Uso: python indicadores.py SPY NVDA [--dias 400]
Saída: JSON com a data dos dados, a fonte e os indicadores de cada ticker.
"""
import argparse
import json
import sys
from datetime import datetime, timezone

import pandas as pd
import yfinance as yf


def rsi(close: pd.Series, n: int = 14) -> pd.Series:
    delta = close.diff()
    ganho = delta.clip(lower=0).ewm(alpha=1 / n, adjust=False).mean()
    perda = (-delta.clip(upper=0)).ewm(alpha=1 / n, adjust=False).mean()
    return 100 - 100 / (1 + ganho / perda)


def atr(df: pd.DataFrame, n: int = 14) -> pd.Series:
    prev = df["Close"].shift()
    tr = pd.concat(
        [df["High"] - df["Low"], (df["High"] - prev).abs(), (df["Low"] - prev).abs()], axis=1
    ).max(axis=1)
    return tr.ewm(alpha=1 / n, adjust=False).mean()


def r2(x):
    return None if x is None or pd.isna(x) else round(float(x), 2)


def analisar(ticker: str, dias: int) -> dict:
    df = yf.download(ticker, period=f"{dias}d", interval="1d", auto_adjust=True, progress=False)
    if df is None or df.empty:
        return {"ticker": ticker, "erro": "sem dados"}
    if isinstance(df.columns, pd.MultiIndex):
        df.columns = df.columns.get_level_values(0)
    c = df["Close"]
    ultimo = df.index[-1]
    sma = {n: c.rolling(n).mean().iloc[-1] if len(c) >= n else None for n in (20, 50, 200)}
    a = atr(df).iloc[-1]
    vol20 = df["Volume"].rolling(20).mean().iloc[-1]
    janela = c.iloc[-252:]
    preco = c.iloc[-1]
    return {
        "ticker": ticker,
        "data_dados": ultimo.strftime("%Y-%m-%d"),
        "preco_fecho": r2(preco),
        "sma20": r2(sma[20]),
        "sma50": r2(sma[50]),
        "sma200": r2(sma[200]),
        "acima_sma200": None if sma[200] is None else bool(preco > sma[200]),
        "tendencia": None
        if sma[50] is None or sma[200] is None
        else ("alta" if preco > sma[50] > sma[200] else "baixa" if preco < sma[50] < sma[200] else "mista"),
        "rsi14": r2(rsi(c).iloc[-1]),
        "atr14": r2(a),
        "atr14_pct": r2(a / preco * 100),
        "stop_2atr": r2(preco - 2 * a),
        "volume_relativo": r2(df["Volume"].iloc[-1] / vol20) if vol20 else None,
        "max_52s": r2(janela.max()),
        "min_52s": r2(janela.min()),
        "dist_max_52s_pct": r2((preco / janela.max() - 1) * 100),
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("tickers", nargs="+")
    p.add_argument("--dias", type=int, default=400)
    args = p.parse_args()
    sys.stdout.reconfigure(encoding="utf-8")
    out = {
        "fonte": "Yahoo Finance via yfinance (diário, ajustado a dividendos e splits)",
        "gerado_em": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ"),
        "dados": [analisar(t.upper(), args.dias) for t in args.tickers],
    }
    json.dump(out, sys.stdout, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
