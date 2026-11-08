import React from "react";
import { measureText } from "@remotion/layout-utils";
import { StarIcon } from "./StarIcon";

/**
 * Estrela que gira e vira palavra (catálogo C, M36).
 *  - SpinStar: estrela de 4 pontas roda em Y a `omega` °/f (medido ≈11°/f, a primeira meia volta ≈15°/f) e encolhe de `size0` a `size1`
 *    em `shrinkFrames` (24 f, expOut). Sem drop-shadow (regra: glow radial atrás, não filtro no SVG animado).
 *  - StarSentence: grupos de palavras crescem à volta da estrela (esquerda: alinhados à direita; direita: à esquerda), cada grupo entra por
 *    fade 3 f em `at`; a linha mantém-se centrada na estrela, que nunca pára de girar.
 */
export const spinAngle = (frame: number, start: number, omega = 11, boost = 1.35, boostFrames = 12): number => {
  const t = Math.max(0, frame - start);
  const fast = Math.min(t, boostFrames) * omega * boost;
  const slow = Math.max(0, t - boostFrames) * omega;
  return fast + slow;
};
export const SpinStar: React.FC<{ frame: number; start: number; x: number; y: number; size0?: number; size1?: number; shrinkFrames?: number; omega?: number; gradient?: [string, string]; glow?: string; waist?: number }> = ({ frame, start, x, y, size0 = 756, size1 = 119, shrinkFrames = 24, omega = 11, gradient = ["#88C8FB", "#3EA1F9"], glow = "#3EA1F9", waist = -0.2 }) => {
  const f = frame;
  if (f < start) return null;
  const t = Math.min(1, (f - start) / shrinkFrames);
  const s = size0 + (size1 - size0) * (1 - Math.exp(-4.2 * t)) / (1 - Math.exp(-4.2)); // expOut de size0 → size1
  const ang = spinAngle(f, start, omega);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 0, height: 0, perspective: 1200 }}>
      <div style={{ position: "absolute", left: -s * 0.9, top: -s * 0.9, width: s * 1.8, height: s * 1.8, borderRadius: "50%", background: `radial-gradient(circle, ${glow}66 0%, transparent 65%)`, filter: "blur(8px)" }} />
      <div style={{ position: "absolute", left: -s / 2, top: -s / 2, width: s, height: s, transform: `rotateY(${ang}deg)`, transformStyle: "preserve-3d", willChange: "transform" }}>
        <StarIcon size={s} gradient={gradient} waist={waist} />
        {/* verso: mesma estrela mais escura, para a rotação ler como 3D */}
        <div style={{ position: "absolute", inset: 0, transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}><StarIcon size={s} gradient={[gradient[1], "#050E1D"]} waist={waist} /></div>
      </div>
    </div>
  );
};
export type SentenceGroup = { text: string; at: number; side: "left" | "right" };
export const StarSentence: React.FC<{ frame: number; x: number; y: number; starSize: number; groups: SentenceGroup[]; fontFamily?: string; fontSize?: number; color?: string; gap?: number; exitAt?: number }> = ({ frame, x, y, starSize, groups, fontFamily = "Inter", fontSize = 40, color = "#E8ECF0", gap = 18, exitAt }) => {
  const f = frame;
  const wOf = (t: string) => measureText({ text: t, fontFamily, fontSize, fontWeight: 500, validateFontIsLoaded: false }).width;
  const exit = exitAt !== undefined ? Math.max(0, Math.min(1, (f - exitAt) / 3)) : 0;
  const vis = (g: SentenceGroup) => Math.max(0, Math.min(1, (f - g.at) / 3)) * (1 - exit);
  const left = groups.filter((g) => g.side === "left" && f >= g.at), right = groups.filter((g) => g.side === "right" && f >= g.at);
  const half = starSize / 2 + gap;
  let lx = x - half; const leftEls: React.ReactNode[] = [];
  [...left].reverse().forEach((g, i) => { const w = wOf(g.text + " "); lx -= w; leftEls.push(<div key={"l" + i} style={{ position: "absolute", left: lx, top: y, transform: "translateY(-50%)", opacity: vis(g), whiteSpace: "pre" }}>{g.text + " "}</div>); });
  let rx = x + half; const rightEls: React.ReactNode[] = [];
  right.forEach((g, i) => { const w = wOf(" " + g.text); rightEls.push(<div key={"r" + i} style={{ position: "absolute", left: rx, top: y, transform: "translateY(-50%)", opacity: vis(g), whiteSpace: "pre" }}>{" " + g.text}</div>); rx += w; });
  return <div style={{ position: "absolute", inset: 0, fontFamily, fontSize, fontWeight: 500, color, pointerEvents: "none" }}>{leftEls}{rightEls}</div>;
};
