import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Planet-horizon: thin bright rim with a strong bloom ABOVE it (atmosphere) and a dark
 * disc below (measured: luminance ramps ~150 px above the rim, drops to dark within 40 px below).
 * cx/cy/r in px — cy is the circle centre (usually far below the frame).
 */
export const Horizon: React.FC<{
  cx?: number;
  cy?: number;
  r?: number;
  rim?: string;
  glow?: string;
  violet?: string;
  disc?: string;
  discMid?: string; // 3 stops interiores do disco (defaults navy do Neutral Flow)
  discDeep?: string;
  discEdge?: string;
  intensity?: number;
  rimWidth?: number;
  glowRadius?: number;
  innerGlow?: number; // 0..1 strength of light bleeding below the rim
}> = ({ cx = 960, cy = 1900, r = 1150, rim = "#c8e6ff", glow = "#3d8cf0", violet = "#6a4fd8", disc = "#0b1d4d", discMid = "#091a45", discDeep = "#050f2c", discEdge = "#03081c", intensity = 1, rimWidth = 4, glowRadius = 170, innerGlow = 0.35 }) => {
  const R = r + glowRadius;
  const pct = (v: number) => `${(v / R) * 100}%`;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", opacity: intensity }}>
      {/* atmosphere bloom above the rim */}
      <div
        style={{
          position: "absolute",
          left: cx - R,
          top: cy - R,
          width: R * 2,
          height: R * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, transparent ${pct(r - 10)}, ${glow}dd ${pct(r + 4)}, ${glow}99 ${pct(r + glowRadius * 0.3)}, ${violet}55 ${pct(r + glowRadius * 0.6)}, transparent 100%)`,
          filter: "blur(22px)",
        }}
      />
      {/* disc */}
      <div
        style={{
          position: "absolute",
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 30%, ${disc} 0%, ${discMid} 40%, ${discDeep} 75%, ${discEdge} 100%)`,
          boxShadow: `inset 0 ${rimWidth * 2}px ${glowRadius * 0.5}px rgba(90,150,255,${0.55 * innerGlow}), inset 0 0 ${glowRadius * 0.9}px rgba(60,120,255,${0.35 * innerGlow})`,
        }}
      />
      {/* rim: crisp line + bloom */}
      <div
        style={{
          position: "absolute",
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
          borderRadius: "50%",
          boxSizing: "border-box",
          border: `${rimWidth}px solid ${rim}`,
          boxShadow: `0 0 ${rimWidth * 5}px ${rimWidth * 1.5}px ${rim}bb, 0 0 ${rimWidth * 18}px ${rimWidth * 4}px ${glow}99`,
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};
