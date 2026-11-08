import React from "react";

/**
 * NeuraFlow 4-point sparkle. Concave sides (quadratic curves toward the centre).
 * `waist` moves the quadratic control point along the diagonal: 0 → sides bulge to 35 % of the tip radius,
 * negative values pull the sides inward (−0.2 ≈ 21 %, the measured NeuraFlow sparkle).
 */
export const starPath = (waist = 0): string => {
  const c = 50;
  const w = 50 * waist; // control-point distance from centre
  return `M ${c} 0 Q ${c + w} ${c - w} 100 ${c} Q ${c + w} ${c + w} ${c} 100 Q ${c - w} ${c + w} 0 ${c} Q ${c - w} ${c - w} ${c} 0 Z`;
};

export const StarIcon: React.FC<{
  size: number;
  fill?: string;
  waist?: number;
  rotate?: number;
  style?: React.CSSProperties;
  gradient?: [string, string]; // top → bottom
  glow?: string; // drop-shadow: só para instâncias paradas (regra: sem drop-shadow em SVG animado — estrela a rodar leva um Glow radial atrás)
  glowRadius?: number;
}> = ({ size, fill = "#ffffff", waist = 0, rotate = 0, style, gradient, glow, glowRadius = 12 }) => {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible", transform: `rotate(${rotate}deg)`, filter: glow ? `drop-shadow(0 0 ${glowRadius}px ${glow})` : undefined, ...style }}>
      {gradient ? (
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={gradient[0]} />
            <stop offset="1" stopColor={gradient[1]} />
          </linearGradient>
        </defs>
      ) : null}
      <path d={starPath(waist)} fill={gradient ? `url(#${id})` : fill} />
    </svg>
  );
};
