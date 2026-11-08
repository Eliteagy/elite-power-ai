import React from "react";
import { StarIcon } from "./StarIcon";
import { INTER } from "../lib/fonts";

/** "✦ NeuraFlow" lockup. fontSize drives everything (icon ≈ 1.05× cap height, gap ≈ 0.5em). */
export const Wordmark: React.FC<{
  fontSize: number;
  text?: string; // default do estilo neutro
  direction?: 90 | 180; // 90 = gradiente horizontal (receita canónica), 180 = vertical (look-dev)
  weight?: number;
  gradient?: [string, string];
  iconGradient?: [string, string];
  gap?: number;
  letterSpacing?: number;
  style?: React.CSSProperties;
}> = ({ fontSize, weight = 500, gradient = ["#f2f8ff", "#b3d0fa"], iconGradient = ["#ffffff", "#bcdcff"], gap, letterSpacing = 0.065, text = "NeuraFlow", direction = 90, style }) => {
  const iconSize = fontSize * 0.98;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: gap ?? fontSize * 0.42, ...style }}>
      <StarIcon size={iconSize} gradient={iconGradient} />
      <span
        style={{
          fontFamily: INTER,
          fontWeight: weight,
          fontSize,
          lineHeight: 1,
          letterSpacing: `${letterSpacing}em`,
          background: `linear-gradient(${direction}deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          whiteSpace: "nowrap",
        }}
      >{text}</span>
    </div>
  );
};
