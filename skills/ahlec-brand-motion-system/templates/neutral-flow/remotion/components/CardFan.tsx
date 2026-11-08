import React from "react";
import { softExpOut } from "../lib/motion";

/**
 * Leque de cards que sobem de baixo (catálogo C, M31). Cards escalonados `stagger` (4 f), cada um sobe `rise` px em `frames` (5 f, expOut com
 * soft start), sobrepostos com rotação ≤3° e offset lateral; o card mais recente fica à frente. Opcional: bolha que cresce (`bubble`) 11 f depois.
 */
export type FanCard = { w: number; h: number; bg: string; color?: string; title: string; icon?: React.ReactNode; rotate?: number; dx?: number; dy?: number; children?: React.ReactNode };
export const CardFan: React.FC<{ frame: number; start: number; x: number; y: number; cards: FanCard[]; stagger?: number; frames?: number; rise?: number; fontFamily?: string; bubble?: { x: number; y: number; r: number; color: string } }> = ({ frame, start, x, y, cards, stagger = 4, frames = 5, rise = 420, fontFamily = "Inter", bubble }) => {
  const f = frame;
  const ease = softExpOut(4.5, 0.15);
  const bubbleP = bubble ? ease(Math.max(0, Math.min(1, (f - (start + 11)) / 8))) : 0;
  return (
    <>
      {bubble && bubbleP > 0 && <div style={{ position: "absolute", left: bubble.x - bubble.r, top: bubble.y - bubble.r, width: 2 * bubble.r, height: 2 * bubble.r, borderRadius: "50%", background: bubble.color, opacity: 0.55 * bubbleP, transform: `scale(${bubbleP})`, boxShadow: `0 0 30px ${bubble.color}` }} />}
      {cards.map((c, i) => {
        const t = (f - (start + i * stagger)) / frames;
        if (t < 0) return null;
        const e = ease(Math.min(1, t));
        const dy = rise * (1 - e) + (c.dy ?? i * 34);
        const rot = (c.rotate ?? (i % 2 ? 2 : -2)) * (1 - 0.3 * e);
        return (
          <div key={i} style={{ position: "absolute", left: x + (c.dx ?? (i - 1) * 24) - c.w / 2, top: y + dy - c.h / 2, width: c.w, height: c.h, borderRadius: 18, background: c.bg, color: c.color ?? "#050E1D", transform: `rotate(${rot}deg)`, boxShadow: "0 20px 50px rgba(0,0,0,0.35)", fontFamily, overflow: "hidden", willChange: "transform", zIndex: i }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", fontSize: 26, fontWeight: 600 }}>{c.icon}{c.title}</div>
            {c.children}
          </div>
        );
      })}
    </>
  );
};
