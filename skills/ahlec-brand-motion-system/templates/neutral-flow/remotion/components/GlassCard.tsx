import React from "react";

/**
 * Translucent blue glass card with a bright 1px top highlight, used for every
 * floating panel in the video (dashboard, side cards, chat bubbles, carousel).
 */
export const GlassCard: React.FC<{
  width: number;
  height: number;
  radius?: number;
  top?: string;
  bottom?: string;
  edge?: string;
  edgeOpacity?: number;
  glow?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  overflow?: "hidden" | "visible";
}> = ({ width, height, radius = 24, top = "rgba(52,96,178,0.75)", bottom = "rgba(14,24,62,0.85)", edge = "#bfe4ff", edgeOpacity = 0.9, glow, style, children, overflow = "hidden" }) => (
  <div
    style={{
      position: "absolute",
      width,
      height,
      borderRadius: radius,
      background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)`,
      boxShadow: `inset 0 1px 0 rgba(255,255,255,${0.35 * edgeOpacity}), inset 0 0 0 1px rgba(160,200,255,0.16)${glow ? `, 0 0 60px ${glow}` : ""}`,
      overflow,
      ...style,
    }}
  >
    {/* crisp top edge highlight */}
    <div style={{ position: "absolute", left: radius * 0.6, right: radius * 0.6, top: 0, height: 1.5, background: `linear-gradient(90deg, transparent, ${edge}, transparent)`, opacity: edgeOpacity }} />
    {children}
  </div>
);
