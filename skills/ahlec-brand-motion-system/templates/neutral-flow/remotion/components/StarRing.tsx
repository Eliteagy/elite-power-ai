import React from "react";
import { hash } from "../lib/motion";

/**
 * Anel de estrelas que chega de fora + texto que cai letra a letra (catálogo C, M26).
 *  - `count` estrelas de 5 pontas num círculo `radius`; cada uma chega da SUA direção (radial, de `radius`+700 px) com expOut em 8 f,
 *    escalonadas `stagger` (1,2 f) a partir de `start` (12 estrelas em 14 f).
 *  - `text` (linhas) a partir de `textAt`: 1 letra/frame, cada letra cai 10–20 px em 3 f (offset alternado).
 *  - `eraseAt`: letras somem 1/f em ordem de leitura (o cometa passa); `eatAt`: estrelas somem em ordem angular, 1 por `eatEvery` frames.
 */
const star5 = (r: number) => { const pts: string[] = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5; const rr = i % 2 ? r * 0.45 : r; pts.push(`${50 + rr * Math.cos(a)},${50 + rr * Math.sin(a)}`); } return pts.join(" "); };
export const Star5: React.FC<{ size: number; color: string; style?: React.CSSProperties }> = ({ size, color, style }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible", ...style }}><polygon points={star5(48)} fill={color} /></svg>
);
export const StarRing: React.FC<{
  frame: number; start: number; x: number; y: number; radius?: number; count?: number; starSize?: number; color?: string; stagger?: number; travel?: number;
  text?: string[]; textAt?: number; textColor?: string; fontFamily?: string; fontSize?: number;
  eraseAt?: number; eatAt?: number; eatEvery?: number; seed?: number;
}> = ({ frame, start, x, y, radius = 210, count = 12, starSize = 34, color = "#88C8FB", stagger = 1.2, travel = 8, text = [], textAt, textColor = "#E8ECF0", fontFamily = "Inter", fontSize = 50, eraseAt, eatAt, eatEvery = 1.7, seed = 3 }) => {
  const f = frame;
  const stars = Array.from({ length: count }, (_, i) => {
    const order = (i * 7) % count; // ordem de chegada pseudo-aleatória mas estável
    const a0 = -Math.PI / 2 + (i / count) * 2 * Math.PI;
    const t = (f - (start + order * stagger)) / travel;
    if (t < 0) return null;
    const e = 1 - Math.exp(-4.5 * Math.min(1, t)); // expOut
    const dist = radius + 700 * (1 - e);
    const wob = (hash(seed + i) - 0.5) * 0.5 * (1 - e); // pequena curva na chegada
    const px = x + dist * Math.cos(a0 + wob), py = y + dist * Math.sin(a0 + wob);
    let vis = 1;
    if (eatAt !== undefined) { const k = (i - 3 + count) % count; const g = f - (eatAt + k * eatEvery); if (g >= 0) vis = Math.max(0, 1 - g / 2); }
    if (vis <= 0) return null;
    return <div key={i} style={{ position: "absolute", left: px, top: py, transform: `translate(-50%, -50%) rotate(${(1 - e) * 120}deg) scale(${0.6 + 0.4 * e})`, opacity: vis, willChange: "transform" }}><Star5 size={starSize} color={color} /></div>;
  });
  let li = 0;
  const lines = textAt !== undefined ? text.map((line, r) => (
    <div key={r} style={{ display: "flex", justifyContent: "center", whiteSpace: "pre" }}>
      {line.split("").map((ch, i) => {
        const k = li++;
        const t = (f - (textAt + k)) / 3; let a = t < 0 ? 0 : t > 1 ? 1 : t;
        if (eraseAt !== undefined) { const e = (f - (eraseAt + k)) / 1.5; if (e > 0) a = Math.max(0, a - e); }
        const drop = (k % 2 ? 20 : 10) * (1 - a);
        return <span key={i} style={{ display: "inline-block", opacity: a, transform: `translateY(${-drop}px)`, willChange: "transform, opacity" }}>{ch}</span>;
      })}
    </div>
  )) : null;
  return (
    <>
      {stars}
      {lines && <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", color: textColor, fontFamily, fontSize, fontWeight: 600, lineHeight: 1.1, textAlign: "center" }}>{lines}</div>}
    </>
  );
};
