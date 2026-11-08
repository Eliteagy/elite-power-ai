import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * Vertical volumetric light beam from the top edge: a cone that widens downward,
 * bright core, soft edges. Each layer = blurred wrapper around a clipped shape
 * (blur must be OUTSIDE the clip, otherwise the clip re-hardens the edges).
 */
const Layer: React.FC<{ x: number; top: number; bottom: number; height: number; gradient: string; opacity: number; blur: number }> = ({ x, top, bottom, height, gradient, opacity, blur }) => (
  <div style={{ position: "absolute", inset: 0, filter: `blur(${blur}px)`, opacity }}>
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: `polygon(${x - top / 2}px -${blur * 2}px, ${x + top / 2}px -${blur * 2}px, ${x + bottom / 2}px ${height}px, ${x - bottom / 2}px ${height}px)`,
        background: gradient,
      }}
    />
  </div>
);

export const Beam: React.FC<{
  x?: number;
  topWidth?: number;
  bottomWidth?: number;
  height?: number;
  core?: string;
  hot?: string; // cor do topo do núcleo (default #cfeaff; AMK: #88C8FB)
  edge?: string;
  intensity?: number;
  blur?: number;
  bottomFade?: number; // fraction of height where the beam has fully faded
}> = ({ x = 960, topWidth = 180, bottomWidth = 1300, height = 1080, core = "#4fb4ff", hot = "#cfeaff", edge = "#1550a8", intensity = 1, blur = 45, bottomFade = 0.9 }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <Layer x={x} top={topWidth * 1.6} bottom={bottomWidth} height={height} gradient={`linear-gradient(to bottom, ${edge} 0%, ${edge}cc ${bottomFade * 45}%, transparent ${bottomFade * 100}%)`} opacity={0.5 * intensity} blur={blur * 1.8} />
    <Layer x={x} top={topWidth} bottom={bottomWidth * 0.55} height={height} gradient={`linear-gradient(to bottom, ${core} 0%, ${core}cc ${bottomFade * 40}%, transparent ${bottomFade * 95}%)`} opacity={0.55 * intensity} blur={blur} />
    <Layer x={x} top={topWidth * 0.4} bottom={bottomWidth * 0.2} height={height} gradient={`linear-gradient(to bottom, ${hot} 0%, ${core} 25%, ${core}88 55%, transparent ${bottomFade * 85}%)`} opacity={0.55 * intensity} blur={blur * 0.7} />
  </AbsoluteFill>
);
