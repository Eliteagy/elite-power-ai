import React from "react";
import { softExpOut, cubicIn, progress, hash } from "../lib/motion";

/**
 * Anel/nuvem de cards (catálogo B, M14): a partir de `start`, N cards rebentam do centro em 14 f para uma elipse (rx 700, ry 350) inclinada `tilt`°, rodam ω °/f
 * com paralaxe (frente 1,0 nítido; trás 0,6, blur 2 px, 60 % opacidade); em `disperseAt` abrem para fora em 10 f (ease-in).
 * `cards`: nós React (cada um com o seu tamanho); posições e profundidade calculadas por ângulo.
 */
export const CardCloud: React.FC<{ frame: number; start: number; cards: React.ReactNode[]; cx?: number; cy?: number; rx?: number; ry?: number; tilt?: number; omega?: number; burstFrames?: number; disperseAt?: number; seed?: number }> = ({ frame: f, start, cards, cx = 960, cy = 540, rx = 700, ry = 350, tilt = 25, omega = 1.2, burstFrames = 14, disperseAt, seed = 5 }) => {
  const t = f - start;
  if (t < 0) return null;
  const burst = progress(t, 0, burstFrames, softExpOut(6, 0.06));
  const disp = disperseAt !== undefined ? progress(f, disperseAt, disperseAt + 10, cubicIn) : 0;
  const n = cards.length;
  const tr = (tilt * Math.PI) / 180;
  const items = cards.map((c, i) => {
    const a0 = (i / n) * Math.PI * 2 + hash(seed + i) * 0.4;
    const a = a0 + (omega * Math.PI / 180) * t;
    const ex = Math.cos(a) * rx, ey = Math.sin(a) * ry;
    const x = ex * Math.cos(tr) - ey * Math.sin(tr) * 0.4, y = ey * Math.cos(tr) * 0.9 + ex * Math.sin(tr) * 0.25;
    const depth = (Math.sin(a) + 1) / 2; // 1 = frente
    const R = 1 + 1.6 * disp;
    return { c, x: x * burst * R, y: y * burst * R, depth, i };
  });
  items.sort((p, q) => p.depth - q.depth);
  return (
    <div style={{ position: "absolute", left: cx, top: cy, width: 0, height: 0, pointerEvents: "none" }}>
      {items.map(({ c, x, y, depth, i }) => (
        <div key={i} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%,-50%) scale(${(0.55 + 0.45 * depth) * (0.4 + 0.6 * burst)})`, opacity: (0.6 + 0.4 * depth) * Math.min(1, burst * 1.3) * (1 - disp), filter: depth < 0.5 ? `blur(${2 * (1 - depth * 2)}px)` : undefined, willChange: "transform" }}>{c}</div>
      ))}
    </div>
  );
};
