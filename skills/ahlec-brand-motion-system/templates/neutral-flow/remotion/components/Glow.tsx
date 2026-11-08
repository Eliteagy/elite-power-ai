import React from "react";

/** Soft radial glow blob centred at (x,y). */
export const Glow: React.FC<{ x: number; y: number; rx: number; ry?: number; color: string; opacity?: number; blur?: number; style?: React.CSSProperties }> = ({ x, y, rx, ry, color, opacity = 0.8, blur = 0, style }) => {
  const RY = ry ?? rx;
  return (
    <div
      style={{
        position: "absolute",
        left: x - rx,
        top: y - RY,
        width: rx * 2,
        height: RY * 2,
        borderRadius: "50%",
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        pointerEvents: "none",
        ...style,
      }}
    />
  );
};
