import React from "react";
import { spline } from "../lib/motion";
import { Star5 } from "./StarRing";

/**
 * Cometa (catálogo C, M27): estrela com cauda proporcional à velocidade que segue `path` (keys [f, x, y] por spline).
 *  - `cometPath` constrói o caminho medido: `laps` voltas em torno de (cx, cy) a `r` com `framesPerLap` (medido 20 f = 18°/f),
 *    seguido de uma saída em curva (medido: desacelera à direita, acelera até 65 px/f para a esquerda, pousa em expOut) até `land` {x, y}.
 *  - A cauda é uma fita de N posições anteriores (largura e opacidade decrescentes); comprimento ∝ velocidade (máx. medido 234 px).
 *  - `landAt`: nos últimos 4 f a estrela some e a cauda achata numa linha horizontal (o próximo elemento nasce dela).
 */
export type PathKey = [number, number, number];
export const cometPath = (start: number, cx: number, cy: number, r: number, laps: number, framesPerLap: number, land: { x: number; y: number }, exitFrames = 34): PathKey[] => {
  const keys: PathKey[] = [];
  const n = laps * framesPerLap;
  for (let i = 0; i <= n; i += 2) {
    const a = Math.PI / 2 + (i / framesPerLap) * 2 * Math.PI; // começa em baixo, sentido horário no ecrã
    keys.push([start + i, cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  // saída (forma medida, normalizada): sobe à direita, cai à esquerda para o pouso
  const e0 = start + n;
  const ex = [0, 0.16, 0.28, 0.36, 0.42, 0.5, 0.62, 0.78, 0.92, 1];
  const px = [cx, cx + r * 0.9, cx + r * 1.1, cx + r * 1.05, cx + r * 0.8, cx + r * 0.1, cx - r * 0.9, land.x + 60, land.x + 12, land.x];
  const py = [cy + r, cy + r * 0.85, cy + r * 0.55, cy + r * 0.75, cy + r * 1.05, cy + r * 1.2, cy + r * 1.1, land.y + 40, land.y + 8, land.y];
  for (let i = 1; i < ex.length; i++) keys.push([e0 + ex[i] * exitFrames, px[i], py[i]]);
  return keys;
};
export const Comet: React.FC<{ frame: number; path: PathKey[]; color?: string; tail?: string; size?: number; tailK?: number; maxTail?: number; landAt?: number }> = ({ frame, path, color = "#88C8FB", tail = "#3EA1F9", size = 34, tailK = 4, maxTail = 240, landAt }) => {
  const f = frame;
  const f0 = path[0][0], f1 = path[path.length - 1][0];
  if (f < f0 || f > f1 + 1) return null;
  const xs = path.map((k) => [k[0], k[1]] as [number, number]), ys = path.map((k) => [k[0], k[2]] as [number, number]);
  const at = (ff: number) => ({ x: spline(ff, xs), y: spline(ff, ys) });
  const p = at(f), pp = at(f - 1);
  const v = Math.hypot(p.x - pp.x, p.y - pp.y);
  const len = Math.min(maxTail, tailK * v + 20);
  const landing = landAt !== undefined ? Math.max(0, Math.min(1, (f - landAt) / 4)) : 0;
  // cauda: fita de segmentos para trás ao longo do caminho
  const segs = 10;
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i <= segs; i++) { const back = (len / (v + 0.01)) * (i / segs); pts.push(at(Math.max(f0, f - Math.min(back, 12)))); }
  const poly = pts.map((q, i) => `${q.x},${q.y}`).join(" ");
  const w = size * 0.55;
  return (
    <svg width="100%" height="100%" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
      <defs><linearGradient id="cometTail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor={tail} stopOpacity={0.9} /><stop offset="1" stopColor={tail} stopOpacity={0} /></linearGradient></defs>
      {pts.length > 2 && <polyline points={poly} fill="none" stroke={tail} strokeWidth={w * (1 - 0.7 * landing)} strokeLinecap="round" strokeLinejoin="round" opacity={0.55} style={{ filter: "blur(2px)" }} />}
      {landing < 1 && <g transform={`translate(${p.x}, ${p.y}) scale(${1 - landing})`}><g transform={`translate(${-size / 2}, ${-size / 2})`}><Star5 size={size} color={color} /></g></g>}
      {landing > 0 && <rect x={p.x - (len * 0.5) * landing} y={p.y - 5} width={len * landing} height={10} rx={5} fill={color} opacity={0.9} />}
    </svg>
  );
};
