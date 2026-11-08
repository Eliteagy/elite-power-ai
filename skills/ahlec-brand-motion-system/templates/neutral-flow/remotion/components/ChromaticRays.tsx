import React from "react";
import { AbsoluteFill } from "remotion";
import { hash } from "../lib/motion";

/** Raios cromáticos (catálogo B, cena 9): 12–16 bandas verticais 40–120 px, azul/lilás, blur 40, opacidade 0,35, a oscilar ±sway px — o "beam" do mundo claro. Blur numa faixa horizontal só (bbox). */
export const ChromaticRays: React.FC<{ frame?: number; count?: number; colors?: string[]; opacity?: number; blur?: number; sway?: number; seed?: number; top?: number; height?: number }> = ({ frame = 0, count = 14, colors = ["#698ee1", "#86a2e9", "#b4b4fc", "#7fd6f5"], opacity = 0.35, blur = 40, sway = 14, seed = 2, top = 0, height = 1080 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <div style={{ position: "absolute", left: -80, right: -80, top, height, filter: `blur(${blur}px)`, opacity }}>
      {Array.from({ length: count }, (_, i) => {
        const w = 40 + 80 * hash(seed * 100 + i);
        const x0 = (i + 0.5) * (2080 / count) + 60 * (hash(seed * 200 + i) - 0.5);
        const ph = hash(seed * 300 + i) * Math.PI * 2;
        const x = x0 + sway * Math.sin(frame / 40 + ph);
        return <div key={i} style={{ position: "absolute", left: x - w / 2, top: 0, width: w, height: "100%", background: colors[i % colors.length], opacity: 0.6 + 0.4 * hash(seed * 400 + i) }} />;
      })}
    </div>
  </AbsoluteFill>
);
