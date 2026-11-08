import React from "react";
import { measureText } from "@remotion/layout-utils";
import { overshootTo } from "../lib/motionC";

/**
 * Badge néon (catálogo C, M21 + M22). Card gradiente r16 com rótulo em 2 linhas (1.ª bold maior).
 *  - nascimento (`birth`): 15 f antes de `start` uma linha vertical 2×40 engrossa (f−7..0) até 60×40 → card (cantos + gradiente em 3 f).
 *  - `start`: card a 85 % cresce 15 % em 7 f (expOut); letras 1/frame com fade + subida 8 px em 3 f; linha 2 depois da 1.
 *  - ponto no canto sup.-dir. desde start+1 (5 f); vira ✓ 3 f antes do fim do texto (desenha-se em 4 f).
 *  - halo (cor `glow`) só DEPOIS do texto completo: +6 f, rampa de 10 f.
 *  - `swap` {lines, at}: letras antigas apagam 1/f da esquerda; as novas escrevem 1/f da esquerda a partir de at+(oldLen−4);
 *    a largura do card segue o texto com overshoot 15 % e assenta em 10 f; o ✓ volta a ponto (10 f) e o ponto desliza à frente da escrita; gradiente → cor lisa `solid`.
 */
export type BadgeLines = [string, string];
const letterState = (i: number, appearAt: number, frame: number, eraseAt?: number) => {
  // 0..1 visível (fade 3 f), y offset
  const t = (frame - (appearAt + i)) / 3;
  let a = t < 0 ? 0 : t > 1 ? 1 : t;
  if (eraseAt !== undefined) { const e = (frame - (eraseAt + i)) / 2; if (e > 0) a = Math.max(0, a * (1 - Math.min(1, e))); }
  return { a, dy: 8 * (1 - a) };
};
const Line: React.FC<{ text: string; appearAt: number; frame: number; eraseAt?: number; style: React.CSSProperties }> = ({ text, appearAt, frame, eraseAt, style }) => (
  <div style={{ ...style, whiteSpace: "pre", display: "flex" }}>
    {text.split("").map((ch, i) => { const s = letterState(i, appearAt, frame, eraseAt); return <span key={i} style={{ opacity: s.a, transform: `translateY(${s.dy}px)`, display: "inline-block", willChange: "opacity, transform" }}>{ch}</span>; })}
  </div>
);
export const NeonBadge: React.FC<{
  frame: number; start: number; x: number; y: number;
  lines: BadgeLines;
  birth?: boolean;
  swap?: { lines: BadgeLines; at: number };
  gradient?: [string, string]; solid?: string; glow?: string; text?: string; dot?: string;
  fontFamily?: string; size?: number; // tamanho da 1.ª linha (px); a 2.ª = 0,6×
  scale?: number; style?: React.CSSProperties;
}> = ({ frame, start, x, y, lines, birth = true, swap, gradient = ["#9B33F6", "#4369F8"], solid = "#3EA1F9", glow = "#88C8FB", text = "#E8ECF0", dot = "#050E1D", fontFamily = "Inter", size = 52, scale = 1, style }) => {
  const f = frame;
  const pad = 22, size2 = size * 0.6;
  const w1 = (t: string) => measureText({ text: t, fontFamily, fontSize: size, fontWeight: 800, validateFontIsLoaded: false }).width;
  const w2 = (t: string) => measureText({ text: t, fontFamily, fontSize: size2, fontWeight: 600, validateFontIsLoaded: false }).width;
  const l1Start = start + 1, l1End = l1Start + lines[0].length, l2Start = l1End, l2End = l2Start + lines[1].length;
  const textDone = l2End;
  // swap
  const swapOn = swap && f >= swap.at;
  const oldLen = lines[0].length + lines[1].length;
  const newStart = swap ? swap.at + Math.max(0, oldLen - 4) : Infinity;
  const n1Start = newStart, n1End = swap ? n1Start + swap.lines[0].length : Infinity, n2Start = n1End, n2End = swap ? n2Start + swap.lines[1].length : Infinity;
  // largura alvo: texto visível mais largo
  const visW = (t: string, appearAt: number, wf: (s: string) => number) => wf(t.slice(0, Math.max(0, Math.min(t.length, f - appearAt + 1))));
  const oldW = swapOn ? Math.max(w1(lines[0].slice(Math.min(lines[0].length, Math.max(0, f - swap!.at)))), w2(lines[1].slice(Math.min(lines[1].length, Math.max(0, f - swap!.at - lines[0].length))))) : Math.max(visW(lines[0], l1Start, w1), visW(lines[1], l2Start, w2));
  const newW = swap && f >= n1Start ? Math.max(visW(swap.lines[0], n1Start, w1), visW(swap.lines[1], n2Start, w2)) : 0;
  const fullW = Math.max(w1(lines[0]), w2(lines[1]));
  const targetW = Math.max(oldW, newW, 60) + 2 * pad;
  const fullNewW = swap ? Math.max(w1(swap.lines[0]), w2(swap.lines[1])) + 2 * pad : 0;
  // overshoot da largura na troca (M22): a largura segue o texto novo com 15 % de excesso e assenta
  const cardW = swap && f >= n1Start ? Math.max(targetW, overshootTo(f, n1Start, Math.min(targetW, fullW * 0.6 + 2 * pad), fullNewW, 0.15, swap.lines[0].length + swap.lines[1].length, 10)) : Math.min(targetW, fullW + 2 * pad);
  const cardH = size * 1.15 + size2 * 1.2 + 2 * pad * 0.8;
  // nascimento
  const b = f - start; // <0 durante o nascimento
  let w = cardW, h = cardH, r = 16, gradOn = 1, grow = 1;
  if (birth && b < 0) {
    if (b < -8) { w = 2; h = 40; r = 1; gradOn = 0; }
    else { const u = (b + 8) / 8; w = 2 + 58 * u * u; h = 40 + (cardH * 0.85 - 40) * u * u; r = 1 + 15 * u; gradOn = Math.max(0, (b + 3) / 3); }
  } else { const u = Math.min(1, Math.max(0, b) / 7); grow = 0.85 + 0.15 * (1 - Math.exp(-4 * u)) / (1 - Math.exp(-4)); }
  // glow depois do texto completo
  const glowA = Math.max(0, Math.min(1, (f - (textDone + 6)) / 10)) * (swapOn ? Math.max(0, 1 - (f - swap!.at) / 8) : 1);
  const glowNew = swap && f >= n2End ? Math.max(0, Math.min(1, (f - (n2End + 6)) / 10)) : 0;
  // check
  const checkP = swapOn ? Math.max(0, 1 - (f - swap!.at) / 10) : Math.max(0, Math.min(1, (f - (textDone - 3)) / 4));
  const dotA = Math.max(0, Math.min(1, (f - (start + 1)) / 5));
  // ponto desliza à frente da escrita nova; some 1 f depois do fim
  const cursorX = swap && f >= n1Start ? Math.min(cardW - pad, pad + newW + 10) : cardW - pad;
  const dotVisible = !(swap && f > n2End + 1);
  const solidMix = swap ? Math.max(0, Math.min(1, (f - swap.at) / 12)) : 0;
  const bg = gradOn <= 0 ? solid : `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${scale * grow})`, willChange: "transform", ...style }}>
      {/* halo */}
      {(glowA > 0 || glowNew > 0) && <div style={{ position: "absolute", left: -6, top: -6, width: w + 12, height: h + 12, borderRadius: r + 6, background: glow, filter: "blur(14px)", opacity: 0.8 * Math.max(glowA, glowNew) }} />}
      <div style={{ position: "relative", width: w, height: h, borderRadius: r, background: bg, overflow: "hidden", boxShadow: glowA + glowNew > 0 ? `0 0 ${18 * Math.max(glowA, glowNew)}px ${glow}` : undefined }}>
        {solidMix > 0 && <div style={{ position: "absolute", inset: 0, background: solid, opacity: solidMix }} />}
        {b >= 0 && (
          <div style={{ position: "absolute", left: pad, top: pad * 0.7, color: text, fontFamily }}>
            <div style={{ position: "relative", height: size * 1.15 }}>
              <Line text={lines[0]} appearAt={l1Start} frame={f} eraseAt={swap ? swap.at : undefined} style={{ position: "absolute", fontSize: size, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }} />
              {swap && <Line text={swap.lines[0]} appearAt={n1Start} frame={f} style={{ position: "absolute", fontSize: size, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1 }} />}
            </div>
            <div style={{ position: "relative", height: size2 * 1.2 }}>
              <Line text={lines[1]} appearAt={l2Start} frame={f} eraseAt={swap ? swap.at + lines[0].length : undefined} style={{ position: "absolute", fontSize: size2, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.1 }} />
              {swap && <Line text={swap.lines[1]} appearAt={n2Start} frame={f} style={{ position: "absolute", fontSize: size2, fontWeight: 600, letterSpacing: "0.02em", lineHeight: 1.1 }} />}
            </div>
          </div>
        )}
      </div>
      {/* ponto / check no canto */}
      {b >= 0 && dotVisible && (
        <div style={{ position: "absolute", left: cursorX - 14, top: -14, width: 28, height: 28, borderRadius: 14, background: dot, transform: `scale(${dotA})`, border: `2px solid ${glow}`, boxSizing: "border-box", willChange: "transform" }}>
          <svg width={24} height={24} viewBox="0 0 24 24" style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M6 12.5 L10.5 17 L18 8" fill="none" stroke={text} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={20} strokeDashoffset={20 * (1 - checkP)} />
          </svg>
        </div>
      )}
    </div>
  );
};
