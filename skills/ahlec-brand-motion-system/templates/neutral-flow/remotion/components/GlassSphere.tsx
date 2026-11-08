import React from "react";

/** Light translucent glass sphere (measured: centre #376bb4–#a5c3ec, rim #73a1e9–#dff1ff) with optional child icon. */
export const GlassSphere: React.FC<{
  size: number;
  style?: React.CSSProperties;
  glow?: number;
  tint?: string;
  rim?: string;
  gradient?: string; // override do radial (AMK: theme-amk.ts sphereGradient)
  children?: React.ReactNode;
}> = ({ size, style, glow = 24, tint = "#5aa0ff", rim = "rgba(225,242,255,0.95)", gradient, children }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      position: "relative",
      background: gradient ?? `radial-gradient(circle at 38% 30%, rgba(255,255,255,0.75) 0%, rgba(210,232,255,0.55) 16%, rgba(120,175,240,0.55) 45%, rgba(60,115,205,0.6) 78%, rgba(40,85,170,0.7) 100%)`,
      boxShadow: `inset 0 0 ${size * 0.14}px rgba(255,255,255,0.45), inset 0 -${size * 0.08}px ${size * 0.18}px rgba(20,50,120,0.35), 0 0 ${glow}px ${tint}99, 0 0 ${glow * 2.4}px ${tint}44`,
      border: `2px solid ${rim}`,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
  >
    {children}
  </div>
);
