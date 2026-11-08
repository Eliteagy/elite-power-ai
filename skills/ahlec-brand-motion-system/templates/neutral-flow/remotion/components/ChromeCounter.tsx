import React from "react";
import { measureText } from "@remotion/layout-utils";
import { linearCapped, cycle } from "../lib/motionC";
import { formatNumber } from "./Counter";

/**
 * Contador «chrome» + barra com gradiente em loop (catálogo C, M28).
 *  - valor LINEAR `rate`/frame de `from` (cap `cap` quando passa `capAt`; medido 2,7 %/f, 97,2 → 99,9);
 *  - escala do texto expOut 0,27 → 1 em `scaleFrames` (36 f, k 3,3 ⇒ τ≈10 f);
 *  - texto com gradiente vertical claro → azul e contorno escuro; barra por baixo que cresca com o texto e cujo gradiente
 *    (claro → azul → lavanda) percorre a barra em loop com `period` (52 f).
 */
export const ChromeCounter: React.FC<{
  frame: number; start: number; x: number; y: number;
  from?: number; rate?: number; cap?: number; capAt?: number; decimals?: number; suffix?: string;
  fontSize?: number; fontFamily?: string; scaleFrames?: number; k?: number;
  top?: string; bottom?: string; stroke?: string; barStops?: string[]; period?: number; barHeight?: number;
}> = ({ frame, start, x, y, from = 0, rate = 2.7, cap = 99.9, capAt = 97.2, decimals = 1, suffix = "%", fontSize = 190, fontFamily = "Inter", scaleFrames = 36, k = 3.3, top = "#E8ECF0", bottom = "#3EA1F9", stroke = "#050E1D", barStops = ["#E8ECF0", "#3EA1F9", "#C9A6FF"], period = 52, barHeight = 12 }) => {
  const f = frame;
  if (f < start) return null;
  const v = linearCapped(f, start, from, rate, cap, capAt);
  const txt = formatNumber(v, decimals) + suffix;
  const t = Math.min(1, (f - start) / scaleFrames);
  const s = 0.27 + 0.73 * (1 - Math.exp(-k * t)) / (1 - Math.exp(-k));
  const w = measureText({ text: txt, fontFamily, fontSize, fontWeight: 800, validateFontIsLoaded: false }).width;
  const ph = cycle(f, period);
  const stops = [...barStops, barStops[0]];
  const grad = `linear-gradient(90deg, ${stops.map((c, i) => `${c} ${(i / (stops.length - 1)) * 100}%`).join(", ")})`;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${s})`, willChange: "transform", fontFamily }}>
      <div style={{ position: "relative", fontSize, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, whiteSpace: "nowrap", textAlign: "center", width: w + 20, marginLeft: -10 }}>
        <span style={{ position: "absolute", left: 10, top: 0, WebkitTextStroke: `${Math.max(2, fontSize * 0.012)}px ${stroke}`, color: "transparent" }}>{txt}</span>
        <span style={{ position: "relative", background: `linear-gradient(180deg, ${top} 0%, ${top} 35%, ${bottom} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{txt}</span>
      </div>
      <div style={{ position: "relative", marginTop: fontSize * 0.08, marginLeft: -w * 0.025, width: w * 1.05, height: barHeight, borderRadius: barHeight / 2, background: grad, backgroundSize: "300% 100%", backgroundPosition: `${-ph * 200}% 0` }} />
    </div>
  );
};
