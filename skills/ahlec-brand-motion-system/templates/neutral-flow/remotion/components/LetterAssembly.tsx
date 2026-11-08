import React from "react";
import { softExpOut, smooth, progress, hash } from "../lib/motion";
import { mix } from "./KineticWords";
import { measureText } from "@remotion/layout-utils";

/**
 * Montagem de letras do wordmark (catálogo B, M6).
 *  mode "fromRight": as letras chegam da ÚLTIMA para a PRIMEIRA, 1 por `perLetter` frames, cada uma desliza da direita (+140 px + 40·i) e o tracking fecha em 6 f;
 *  mode "radial": cada letra parte de uma direção diferente (seed) a 80–140 px do lugar, grande (1,3×) e desfocada (8 px), converge em 9 f com stagger 1–2 f.
 *  As letras chegam em `arriveColor` e assentam em `color` em 6 f. Larguras medidas com `measureText` (fallback `charWidth` em).
 */
export const LetterAssembly: React.FC<{
  frame: number;
  text: string;
  start: number;
  mode?: "fromRight" | "radial";
  x?: number;
  y?: number;
  fontSize?: number;
  fontFamily: string;
  weight?: number;
  color?: string;
  arriveColor?: string;
  charWidth?: number; // em
  perLetter?: number;
  seed?: number;
  style?: React.CSSProperties;
}> = ({ frame: f, text, start, mode = "fromRight", x = 960, y = 540, fontSize = 96, fontFamily, weight = 500, color = "#0c0c0c", arriveColor = "#1c71dd", charWidth = 0.56, perLetter = 1, seed = 1, style }) => {
  const em = fontSize;
  const chars = text.split("");
  const widths = chars.map((c) => {
    try { return measureText({ text: c === " " ? "a a" : c, fontFamily, fontSize, fontWeight: weight, validateFontIsLoaded: false }).width - (c === " " ? measureText({ text: "aa", fontFamily, fontSize, fontWeight: weight, validateFontIsLoaded: false }).width : 0); }
    catch { return (c === " " ? 0.28 : charWidth) * em; }
  });
  const total = widths.reduce((a, b) => a + b, 0);
  let left = x - total / 2;
  const slots = widths.map((w) => { const l = left; left += w; return l; });
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, pointerEvents: "none", ...style }}>
      {chars.map((c, i) => {
        const n = chars.length;
        if (mode === "fromRight") {
          const at = start + (n - 1 - i) * perLetter;
          const p = progress(f, at, at + 6, softExpOut(4, 0.1));
          if (f < at) return null;
          const dx = (140 + 40 * (n - 1 - i)) * (1 - p);
          const col = mix(arriveColor, color, progress(f, at, at + 6, smooth));
          return <div key={i} style={{ position: "absolute", left: slots[i] + dx, top: y, transform: "translate(0,-50%)", fontFamily, fontWeight: weight, fontSize, lineHeight: 1, color: col, willChange: "transform" }}>{c}</div>;
        }
        const at = start + Math.floor(hash(seed * 31 + i) * 2.99) + i * 0.6;
        if (f < at) return null;
        const p = progress(f, at, at + 9, softExpOut(4, 0.1));
        const ang = hash(seed * 17 + i) * Math.PI * 2;
        const r = 80 + 60 * hash(seed * 7 + i);
        const dx = Math.cos(ang) * r * (1 - p), dy = Math.sin(ang) * r * (1 - p);
        const col = mix(arriveColor, color, progress(f, at, at + 8, smooth));
        const blur = 8 * (1 - p);
        return <div key={i} style={{ position: "absolute", left: slots[i] + dx, top: y + dy, transform: `translate(0,-50%) scale(${1.3 - 0.3 * p})`, transformOrigin: "50% 50%", fontFamily, fontWeight: weight, fontSize, lineHeight: 1, color: col, filter: blur > 0.3 ? `blur(${blur}px)` : undefined, willChange: "transform" }}>{c}</div>;
      })}
    </div>
  );
};
