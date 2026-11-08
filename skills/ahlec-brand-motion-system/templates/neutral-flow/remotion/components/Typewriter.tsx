import React from "react";
import { hash } from "../lib/motion";

/**
 * Typewriter (catálogo B, M2/M3).
 *  mode "type": escreve `text` 1 char/`charFrames` a partir de `start`, com glitch (carácter aleatório no frame antes de cada letra) e cursor.
 *  mode "replace": um cursor-BLOCO come `from` da esquerda e escreve `text` no seu lugar, 1 troca/`charFrames` (M3: "generates" → "@/components").
 *  cursor: "thin" (barra 3 px com gradiente, não pisca), "block" (retângulo 0,2 × 0,75 em com gradiente), "none"; some `cursorHold` f depois do fim.
 */
export const Typewriter: React.FC<{
  frame: number;
  text: string;
  start: number;
  from?: string;
  mode?: "type" | "replace";
  charFrames?: number;
  glitch?: boolean;
  cursor?: "thin" | "block" | "none";
  cursorHold?: number;
  cursorColor?: string;
  fromStyle?: React.CSSProperties; // estilo do texto ainda por comer (modo replace)
  style?: React.CSSProperties;
}> = ({ frame: f, text, start, from = "", mode = "type", charFrames = 2, glitch = true, cursor = "thin", cursorHold = 6, cursorColor = "#3b5bd8", fromStyle, style }) => {
  const GL = "#&>*)@%=~";
  const steps = Math.max(0, Math.floor((f - start) / charFrames));
  const n = Math.min(text.length, f < start ? 0 : steps);
  const done = start + text.length * charFrames;
  const odd = f >= start && n < text.length && glitch && charFrames > 1 && (f - start) % charFrames === charFrames - 1;
  const g = odd ? GL[Math.floor(hash(f * 13 + n) * GL.length)] : "";
  const showCursor = cursor !== "none" && f >= start - 2 && f < done + cursorHold;
  const em = typeof style?.fontSize === "number" ? style.fontSize : 100;
  const cur = showCursor ? (
    <span style={{ display: "inline-block", verticalAlign: "-0.12em", marginLeft: em * 0.04, marginRight: em * 0.04, width: cursor === "block" ? em * 0.2 : Math.max(2, em * 0.03), height: cursor === "block" ? em * 0.75 : em * 0.95, background: `linear-gradient(180deg, ${cursorColor} 0%, ${cursorColor} 55%, transparent 100%)` }} />
  ) : null;
  if (mode === "replace") {
    const rest = from.slice(Math.min(from.length, n + (n > 0 ? 1 : 0)));
    return (
      <span style={{ whiteSpace: "pre", ...style }}>
        {text.slice(0, n)}
        {cur}
        <span style={fromStyle}>{rest}</span>
      </span>
    );
  }
  return (
    <span style={{ whiteSpace: "pre", ...style }}>
      {text.slice(0, n)}{g}
      {cur}
    </span>
  );
};
