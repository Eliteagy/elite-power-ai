import React, { useMemo } from "react";
import { AbsoluteFill } from "remotion";
import { hash } from "../lib/motion";

export type ParticleField = {
  count?: number;
  seed?: number;
  area?: { x0: number; y0: number; x1: number; y1: number };
  minSize?: number;
  maxSize?: number;
  color?: string;
  opacity?: number;
  twinkle?: number; // 0..1 amplitude
  twinklePeriod?: number; // frames
  drift?: { vx: number; vy: number }; // px per frame
  frame?: number;
};

/** Deterministic star/dust particle field (SVG). */
export const Particles: React.FC<ParticleField> = ({
  count = 160,
  seed = 1,
  area = { x0: 0, y0: 0, x1: 1920, y1: 1080 },
  minSize = 1,
  maxSize = 2.6,
  color = "#dbeeff",
  opacity = 0.8,
  twinkle = 0.5,
  twinklePeriod = 70,
  drift = { vx: 0, vy: 0 },
  frame = 0,
}) => {
  const pts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: area.x0 + hash(seed * 1000 + i) * (area.x1 - area.x0),
        y: area.y0 + hash(seed * 1000 + i + 0.5) * (area.y1 - area.y0),
        r: minSize + hash(seed * 1000 + i + 0.25) * (maxSize - minSize),
        ph: hash(seed * 1000 + i + 0.75) * Math.PI * 2,
        a: 0.35 + hash(seed * 1000 + i + 0.125) * 0.65,
      })),
    [count, seed, area, minSize, maxSize],
  );
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity }}>
      <svg width={1920} height={1080} viewBox="0 0 1920 1080">
        {pts.map((p, i) => {
          const tw = 1 - twinkle * 0.5 * (1 + Math.sin((frame / twinklePeriod) * Math.PI * 2 + p.ph));
          const x = ((p.x + drift.vx * frame - area.x0) % (area.x1 - area.x0) + (area.x1 - area.x0)) % (area.x1 - area.x0) + area.x0;
          const y = ((p.y + drift.vy * frame - area.y0) % (area.y1 - area.y0) + (area.y1 - area.y0)) % (area.y1 - area.y0) + area.y0;
          return <circle key={i} cx={x} cy={y} r={p.r} fill={color} opacity={p.a * tw} />;
        })}
      </svg>
    </AbsoluteFill>
  );
};
