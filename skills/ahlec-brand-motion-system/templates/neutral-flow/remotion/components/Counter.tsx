import React from "react";

/** Contador (catálogo B, M12): número conta com 1−e^(−k·t) (k 2,5) de `from` a `to` em `frames` a partir de `start`; começa antes de o card pousar. */
export const countValue = (frame: number, start: number, frames: number, from: number, to: number, k = 2.5): number => {
  const t = Math.max(0, Math.min(1, (frame - start) / frames));
  const e = (1 - Math.exp(-k * t)) / (1 - Math.exp(-k));
  return from + (to - from) * e;
};
/** Formata com separador de milhares (PT: espaço fino) e decimais com vírgula. */
export const formatNumber = (v: number, decimals = 0, thousands = " ", decimal = ","): string => {
  const [int, frac] = Math.abs(v).toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
  return (v < 0 ? "-" : "") + grouped + (frac ? decimal + frac : "");
};
export const Counter: React.FC<{ frame: number; start: number; frames?: number; from: number; to: number; k?: number; prefix?: string; suffix?: string; decimals?: number; thousands?: string; decimal?: string; style?: React.CSSProperties }> = ({ frame, start, frames = 36, from, to, k = 2.5, prefix = "", suffix = "", decimals = 0, thousands = " ", decimal = ",", style }) => (
  <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>{prefix}{formatNumber(countValue(frame, start, frames, from, to, k), decimals, thousands, decimal)}{suffix}</span>
);
