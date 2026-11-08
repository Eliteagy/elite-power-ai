import React from "react";
import { spline } from "../lib/motion";

/**
 * Cursor como ator (catálogo B, M10): mão (34 px) ou seta (28 px), branco com contorno escuro e sombra; `clickAt` faz um tap (escala 0,85 em 2 f).
 * Trajetória: usar `cursorPath(frame, keys)` — spline por tabela [[frame, x, y], …] — e passar x/y; entra sempre de fora do frame.
 */
export const cursorPath = (frame: number, keys: Array<[number, number, number]>): { x: number; y: number } => ({
  x: spline(frame, keys.map((k) => [k[0], k[1]] as [number, number])),
  y: spline(frame, keys.map((k) => [k[0], k[2]] as [number, number])),
});

export const Cursor: React.FC<{ frame: number; x: number; y: number; kind?: "hand" | "arrow"; clickAt?: number | number[]; size?: number; opacity?: number }> = ({ frame: f, x, y, kind = "hand", clickAt, size, opacity = 1 }) => {
  const clicks = clickAt === undefined ? [] : Array.isArray(clickAt) ? clickAt : [clickAt];
  const tap = clicks.some((c) => f >= c && f < c + 3) ? 0.85 : 1;
  const S = size ?? (kind === "hand" ? 34 : 28);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(${kind === "hand" ? "-40%" : "-8%"}, -8%) scale(${tap})`, transformOrigin: kind === "hand" ? "40% 8%" : "8% 8%", opacity, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.45))", pointerEvents: "none" }}>
      {kind === "hand" ? (
        <svg width={S} height={S} viewBox="0 0 24 24" fill="#fff" stroke="#1b2130" strokeWidth={1.4} strokeLinejoin="round">
          <path d="M9 3.5a1.5 1.5 0 0 1 3 0V11h.5V5.5a1.5 1.5 0 0 1 3 0V11h.5V7.5a1.5 1.5 0 0 1 3 0V15c0 3.5-2.5 6-6 6h-1.2c-2 0-3.3-.9-4.3-2.6L4.2 13.6a1.4 1.4 0 0 1 2.3-1.6L9 15z" />
        </svg>
      ) : (
        <svg width={S} height={S} viewBox="0 0 24 24" fill="#fff" stroke="#1b2130" strokeWidth={1.4} strokeLinejoin="round">
          <path d="M5 3l14 9.5-6.3 1.2 3.6 6.3-2.6 1.5-3.6-6.4L5 19z" />
        </svg>
      )}
    </div>
  );
};
