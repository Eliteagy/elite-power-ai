import React from "react";

/**
 * Arco aurora (catálogo C, M37): um único anel de glow gigante (raio > frame) tangente a uma borda, blur ≈120 px.
 * `edge` top: o centro do anel fica acima do frame e só a curva inferior é visível; bottom: o contrário. Um por cena, nunca dois.
 */
export const AuroraArc: React.FC<{ edge?: "top" | "bottom"; color?: string; peak?: string; opacity?: number; radius?: number; thickness?: number; blur?: number; width?: number; height?: number; offset?: number; style?: React.CSSProperties }> = ({ edge = "top", color = "#4369F8", peak = "#3EA1F9", opacity = 0.6, radius = 1500, thickness = 220, blur = 110, width = 1920, height = 1080, offset = 0, style }) => {
  const cy = edge === "top" ? -radius + 260 + offset : height + radius - 260 - offset;
  const cx = width / 2;
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", ...style }}>
      <div style={{ position: "absolute", left: cx - radius, top: cy - radius, width: 2 * radius, height: 2 * radius, borderRadius: "50%", boxSizing: "border-box", border: `${thickness}px solid ${color}`, filter: `blur(${blur}px)`, opacity }} />
      <div style={{ position: "absolute", left: cx - radius, top: cy - radius, width: 2 * radius, height: 2 * radius, borderRadius: "50%", boxSizing: "border-box", border: `${thickness * 0.35}px solid ${peak}`, filter: `blur(${blur * 0.5}px)`, opacity: opacity * 0.7 }} />
    </div>
  );
};
