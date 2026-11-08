import React from "react";
import { hash } from "../lib/motion";
import { rectPerimeterPoint } from "../lib/motionC";

/**
 * Grelha de tiles com glints nas arestas (catálogo C, M23). Tiles arredondados de contorno (230×95, gap 20, r14), fade-in 6 f a partir de `start`;
 * a partir de `glintsAt` luzes de ≈1 tile de comprimento correm ao longo das arestas (velocidade 1 tile/8 f), cada uma numa aresta/tile diferente,
 * com fade nas pontas. É textura: jerk ≈0,1.
 */
export const TileGlints: React.FC<{
  frame: number; start: number; glintsAt?: number;
  width?: number; height?: number; tileW?: number; tileH?: number; gap?: number; radius?: number;
  outline?: string; colors?: string[]; glints?: number; speed?: number; seed?: number; offsetX?: number; offsetY?: number; opacity?: number;
}> = ({ frame, start, glintsAt, width = 1920, height = 1080, tileW = 230 * 1.78, tileH = 95 * 1.78, gap = 20 * 1.78, radius = 22, outline = "#1A1F2E", colors = ["#3EA1F9", "#C9A6FF"], glints = 4, speed = 1 / 8, seed = 1, offsetX = 0, offsetY = 0, opacity = 1 }) => {
  const f = frame;
  const a = Math.max(0, Math.min(1, (f - start) / 6)) * opacity;
  if (a <= 0) return null;
  const gAt = glintsAt ?? start + 13;
  const cols = Math.ceil(width / (tileW + gap)) + 1, rows = Math.ceil(height / (tileH + gap)) + 1;
  const tiles: Array<{ x: number; y: number }> = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) tiles.push({ x: offsetX + c * (tileW + gap) - gap, y: offsetY + r * (tileH + gap) - gap });
  const P = 2 * (tileW + tileH);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: a, pointerEvents: "none" }}>
      {tiles.map((t, i) => <div key={i} style={{ position: "absolute", left: t.x, top: t.y, width: tileW, height: tileH, borderRadius: radius, border: `1.5px solid ${outline}`, boxSizing: "border-box" }} />)}
      {f >= gAt && Array.from({ length: glints }, (_, i) => {
        const h0 = hash(seed * 31 + i * 7), h1 = hash(seed * 17 + i * 13), h2 = hash(seed * 5 + i * 3);
        const tile = tiles[Math.floor(h0 * tiles.length)];
        const period = P / (speed * tileW); // frames por volta
        const life = (f - gAt + h1 * period) % (period * 1.5); // cada glint vive 1 volta e descansa meia
        if (life > period) return null;
        const d = h2 * P + life * speed * tileW;
        const p = rectPerimeterPoint(d, tileW, tileH);
        const len = tileW * 0.9, col = colors[i % colors.length];
        const edgeFade = Math.min(1, life / 6, (period - life) / 6);
        return (
          <div key={i} style={{ position: "absolute", left: tile.x + p.x, top: tile.y + p.y, width: len, height: 3, transform: `translate(-50%, -50%) rotate(${p.angle}deg)`, background: `linear-gradient(90deg, transparent 0%, ${col} 50%, transparent 100%)`, filter: "blur(1.2px)", opacity: 0.9 * edgeFade, willChange: "transform" }} />
        );
      })}
    </div>
  );
};
