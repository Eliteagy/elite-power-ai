import React from "react";
import { AbsoluteFill } from "remotion";

/** Subtle square grid overlay (thin lines). pitch in px, offset shifts the lattice. */
export const Grid: React.FC<{
  pitch?: number;
  color?: string;
  thickness?: number;
  opacity?: number;
  offsetX?: number;
  offsetY?: number;
  fade?: string; // optional CSS mask-image
}> = ({ pitch = 96, color = "rgba(140,180,240,0.12)", thickness = 1, opacity = 1, offsetX = 0, offsetY = 0, fade }) => {
  const bg = `linear-gradient(to right, ${color} ${thickness}px, transparent ${thickness}px), linear-gradient(to bottom, ${color} ${thickness}px, transparent ${thickness}px)`;
  return (
    <AbsoluteFill
      style={{
        backgroundImage: bg,
        backgroundSize: `${pitch}px ${pitch}px`,
        backgroundPosition: `${offsetX}px ${offsetY}px`,
        opacity,
        WebkitMaskImage: fade,
        maskImage: fade,
        pointerEvents: "none",
      }}
    />
  );
};
