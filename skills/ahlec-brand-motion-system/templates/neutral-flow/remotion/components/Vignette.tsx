import React from "react";
import { AbsoluteFill } from "remotion";

export const Vignette: React.FC<{ strength?: number; color?: string }> = ({ strength = 0.7, color = "#000" }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 45%, transparent 45%, ${color} 115%)`,
      opacity: strength,
    }}
  />
);
