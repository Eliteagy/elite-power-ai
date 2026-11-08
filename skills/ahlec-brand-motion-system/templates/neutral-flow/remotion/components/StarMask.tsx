import React from "react";

/** Organic 4-point star (rounded tips, concave sides) as an SVG path in a 0..1 box, centre 0.5. */
export const organicStarPath = (waist = -0.06, tip = 0.5): string => {
  const c = 0.5;
  const w = waist; // half-width at the waist (concavity depth control)
  // points: top, right, bottom, left; concave quadratic curves between them
  return `M ${c} ${c - tip} Q ${c + w} ${c - w} ${c + tip} ${c} Q ${c + w} ${c + w} ${c} ${c + tip} Q ${c - w} ${c + w} ${c - tip} ${c} Q ${c - w} ${c - w} ${c} ${c - tip} Z`;
};

/** Magenta star body rendered as a blurred SVG (used both as a visible shape and as a mask). */
export const StarShape: React.FC<{ size: number; fill: string; blur?: number; rotate?: number; style?: React.CSSProperties; waist?: number }> = ({ size, fill, blur = 0, rotate = 0, style, waist = -0.06 }) => (
  <svg width={size} height={size} viewBox="0 0 1 1" style={{ overflow: "visible", filter: blur ? `blur(${blur}px)` : undefined, transform: `rotate(${rotate}deg)`, ...style }}>
    <path d={organicStarPath(waist)} fill={fill} />
  </svg>
);
