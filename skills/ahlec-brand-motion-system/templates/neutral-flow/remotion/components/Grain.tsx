import React from "react";
import { AbsoluteFill } from "remotion";

/** Film-grain overlay via SVG feTurbulence; seed changes per frame for animated grain. */
export const Grain: React.FC<{ opacity?: number; frame?: number; baseFrequency?: number }> = ({ opacity = 0.03, frame = 0, baseFrequency = 0.9 }) => (
  <AbsoluteFill style={{ pointerEvents: "none", opacity, mixBlendMode: "overlay" }}>
    <svg width={1920} height={1080}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency={baseFrequency} numOctaves={2} seed={frame % 97} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);
