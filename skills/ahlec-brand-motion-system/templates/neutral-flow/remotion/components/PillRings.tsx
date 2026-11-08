import React from "react";

/**
 * Moldura → pill com anéis (catálogo B, M13). `p` 0..1 vindo do chamador (≈28 f, curva a acelerar):
 *  0–0,4: o frame inteiro ganha margem e cantos (1920×1080 r0 → 1000×520 r260); 0,4–1: encolhe até `final` (250×120) e some;
 *  anéis (2–3 outlines 2 px, lavanda→ciano) aparecem a partir de p 0,3, deslocados +80/+160 px e rodados ±6°, e convergem para a pill.
 * O conteúdo (children) continua a viver DENTRO da moldura (overflow hidden, escalado).
 */
export const PillRings: React.FC<{ p: number; final?: { w: number; h: number }; rings?: number; ringColors?: string[]; bg?: string; children?: React.ReactNode }> = ({ p, final = { w: 250, h: 120 }, rings = 3, ringColors = ["#e4e4fc", "#cce4fc", "#b4e4fc"], bg = "#f3f3f3", children }) => {
  const a = Math.max(0, Math.min(1, p / 0.4)), b = Math.max(0, Math.min(1, (p - 0.4) / 0.6));
  const w = a < 1 ? 1920 + (1000 - 1920) * a : 1000 + (final.w - 1000) * b;
  const h = a < 1 ? 1080 + (520 - 1080) * a : 520 + (final.h - 520) * b;
  const r = a < 1 ? 260 * a : Math.min(w, h) / 2;
  const scale = w / 1920;
  const ringP = Math.max(0, Math.min(1, (p - 0.3) / 0.6));
  return (
    <div style={{ position: "absolute", inset: 0, background: bg, pointerEvents: "none" }}>
      {Array.from({ length: rings }, (_, i) => {
        const off = (80 + 80 * i) * (1 - ringP);
        const rot = (i % 2 ? 6 : -6) * (1 - ringP);
        return <div key={i} style={{ position: "absolute", left: 960 - w / 2 - off, top: 540 - h / 2 - off * 0.6, width: w + 2 * off, height: h + 1.2 * off, borderRadius: Math.min(w + 2 * off, h + 1.2 * off) / 2, border: `2px solid ${ringColors[i % ringColors.length]}`, transform: `rotate(${rot}deg)`, opacity: 0.9 * Math.min(1, ringP / 0.15) }} />; // anéis aparecem em ≈4 f, não de repente
      })}
      <div style={{ position: "absolute", left: 960 - w / 2, top: 540 - h / 2, width: w, height: h, borderRadius: r, overflow: "hidden", boxShadow: p > 0.05 ? "0 20px 60px rgba(20,40,120,0.25)" : undefined }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${(w - 1920 * scale) / 2}px, ${(h - 1080 * scale) / 2}px) scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
      </div>
    </div>
  );
};
