import React from "react";
import { cubicIn } from "../lib/motion";

/**
 * Saída por blur (catálogo C, M24): a partir de `start`, blur 0 → `maxBlur` e opacidade 1 → 0 em `frames` (13 f) com cubic-in
 * (medido: nitidez 730 → 3, lenta no início e rápida no fim). Depois fica um blob de glow (`blob`) que aparece em 4 f e some em `blobFrames`
 * — é o «entre» que gera o elemento seguinte. Filtro `blur()` num div (não drop-shadow/backdrop-filter — regra de flicker).
 */
export const BlurExit: React.FC<{
  frame: number; start: number; frames?: number; maxBlur?: number;
  blob?: { x: number; y: number; r: number; color: string; frames?: number };
  children?: React.ReactNode;
}> = ({ frame, start, frames = 13, maxBlur = 40, blob, children }) => {
  const t = Math.max(0, Math.min(1, (frame - start) / frames));
  const e = cubicIn(t);
  const gone = t >= 1;
  const blobA = blob ? Math.max(0, Math.min(1, (frame - (start + frames - 4)) / 4)) * (1 - Math.max(0, Math.min(1, (frame - (start + frames + 2)) / (blob.frames ?? 8)))) : 0;
  return (
    <>
      {!gone && <div style={{ position: "absolute", inset: 0, filter: e > 0 ? `blur(${maxBlur * e}px)` : undefined, opacity: 1 - e * e, willChange: "filter, opacity" }}>{children}</div>}
      {blob && blobA > 0 && <div style={{ position: "absolute", left: blob.x - blob.r, top: blob.y - blob.r, width: 2 * blob.r, height: 2 * blob.r, borderRadius: "50%", background: `radial-gradient(circle, ${blob.color} 0%, ${blob.color}66 40%, transparent 70%)`, opacity: blobA, filter: "blur(10px)" }} />}
    </>
  );
};
