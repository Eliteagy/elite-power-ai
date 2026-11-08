import React from "react";
import { AbsoluteFill } from "remotion";
import { hash } from "../lib/motion";

/**
 * Volumetric light shafts ("god rays") hanging from the top edge, inside the main beam.
 * Deterministic per seed; each shaft sways slowly with `frame`. Cheap: clipped gradients + blur.
 */
export const Rays: React.FC<{
  x?: number;
  frame?: number;
  intensity?: number;
  color?: string; // 6-digit hex
  count?: number;
  seed?: number;
  spread?: number; // bottom offset multiplier (divergence)
  height?: number;
  blur?: number;
  sway?: number;
}> = ({ x = 960, frame = 0, intensity = 1, color = "#3f9be6", count = 4, seed = 1, spread = 1.7, height = 900, blur = 26, sway = 18 }) => {
  const shafts = Array.from({ length: count }, (_, i) => {
    const h = (k: number) => hash(seed * 100 + i * 7 + k);
    return { base: (h(1) - 0.5) * 520, w: 40 + h(2) * 110, op: 0.25 + h(3) * 0.55, ph: h(4) * Math.PI * 2, per: 90 + h(5) * 80 };
  });
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: intensity }}>
      {shafts.map((s, i) => {
        const ox = s.base + sway * Math.sin((frame / s.per) * Math.PI * 2 + s.ph);
        const top = x + ox;
        const bottom = x + ox * spread;
        const wb = s.w * 3.2;
        // bounding box of the shaft (+ blur margin) — blurring only this box instead of the whole frame is ~10× cheaper
        const bx0 = Math.min(top - s.w / 2, bottom - wb / 2) - blur * 2;
        const bx1 = Math.max(top + s.w / 2, bottom + wb / 2) + blur * 2;
        return (
          <div key={i} style={{ position: "absolute", left: bx0, top: -blur * 2, width: bx1 - bx0, height: height + blur * 2, filter: `blur(${blur}px)`, opacity: s.op, overflow: "visible" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `polygon(${top - s.w / 2 - bx0}px 0px, ${top + s.w / 2 - bx0}px 0px, ${bottom + wb / 2 - bx0}px ${height + blur * 2}px, ${bottom - wb / 2 - bx0}px ${height + blur * 2}px)`,
                background: `linear-gradient(to bottom, ${color} 0%, ${color}99 35%, transparent 100%)`,
              }}
            />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
