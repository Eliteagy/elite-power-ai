import React from "react";
import { expOut, softExpOut, smooth, cubicIn, progress, hash } from "../lib/motion";
import { measureText } from "@remotion/layout-utils";

/**
 * Frase cinética sincronizada com a voz (catálogo B, M1/M2/M4a) — medida no vídeo Lovio.
 *  - cada palavra APARECE INTEIRA em 1 frame em `at` (ou blur-in de 5 f se `blurIn`), e some em `out`;
 *  - a linha recentra-se a cada mudança com expOut(5) em 7 f, SEM soft start (57 % no 1.º frame — é o que se mede; é uma deslocação, não uma entrada);
 *  - `accent` = serif itálica na cor de acento; `typeAt` escreve a palavra à máquina 1 char/`charFrames`, com glitch e cursor fino (some `cursorHold` f depois);
 *  - `exitAt`: a linha encolhe 13 % e sobe 40 px em 14 f (ease-in) até ao corte.
 * Larguras medidas com `measureText` (@remotion/layout-utils); fallback por estimativa (sans 0,56 em, serif itálica 0,44 em) se a medição falhar.
 */
export type KWord = { text: string; at: number; out?: number; accent?: boolean; typeAt?: number; blurIn?: boolean };
export type KineticWordsProps = {
  frame: number;
  words: KWord[];
  x?: number;
  y?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  arriveColor?: string; // cor com que a palavra chega (assenta em `color`/`accentColor` em 6 f); omitir = sem transição
  fontFamily: string;
  serifFamily: string;
  weight?: number;
  charFrames?: number;
  glitch?: boolean;
  cursorHold?: number;
  recenterK?: number;
  recenterFrames?: number;
  exitAt?: number;
  glitchChars?: string;
  style?: React.CSSProperties;
};
const GLITCH = "#&>*)@%=~";

/** Valor por troços: cada evento (frame, valor-alvo) é alcançado com expOut(k) em `n` frames a partir do valor animado anterior. */
const easedSteps = (frame: number, events: Array<[number, number]>, k: number, n: number): number => {
  if (events.length === 0) return 0;
  let v = events[0][1];
  const e = expOut(k);
  for (let i = 1; i < events.length; i++) {
    const [f0, target] = events[i];
    if (frame < f0) break;
    const from = v;
    v = from + (target - from) * e(Math.min(1, (frame - f0) / n));
  }
  return v;
};

export const KineticWords: React.FC<KineticWordsProps> = ({ frame: f, words, x = 960, y = 540, fontSize = 108, color = "#0c0c0c", accentColor = "#3b5bd8", arriveColor, fontFamily, serifFamily, weight = 400, charFrames = 2, glitch = true, cursorHold = 6, recenterK = 5, recenterFrames = 7, exitAt, glitchChars = GLITCH, style }) => {
  const em = fontSize;
  const measure = (w: KWord, text: string): number => {
    if (text.length === 0) return 0;
    try {
      return measureText({ text, fontFamily: w.accent ? serifFamily : fontFamily, fontSize, fontWeight: w.accent ? 400 : weight, validateFontIsLoaded: false }).width;
    } catch { return text.length * (w.accent ? 0.44 : 0.56) * em; }
  };
  const space = Math.max(0.22 * em, measure({ text: "", at: 0 }, "a a") - measure({ text: "", at: 0 }, "aa")) || 0.28 * em;
  // texto visível de uma palavra num frame (typewriter)
  const shown = (w: KWord, fr: number): { text: string; typing: boolean; cursor: boolean } => {
    if (w.typeAt === undefined || fr < w.typeAt) return { text: w.text, typing: false, cursor: false };
    const steps = Math.floor((fr - w.typeAt) / charFrames);
    const n = Math.min(w.text.length, steps);
    const odd = (fr - w.typeAt) % charFrames === charFrames - 1 && n < w.text.length && glitch && charFrames > 1;
    const g = odd ? glitchChars[Math.floor(hash(fr * 7 + n) * glitchChars.length)] : "";
    const doneAt = w.typeAt + w.text.length * charFrames;
    return { text: w.text.slice(0, n) + g, typing: n < w.text.length, cursor: fr >= w.typeAt - 2 && fr < doneAt + cursorHold };
  };
  const visibleAt = (fr: number) => words.filter((w) => fr >= w.at && (w.out === undefined || fr < w.out));
  const widthAt = (w: KWord, fr: number) => measure(w, shown(w, fr).text);
  // eventos de layout: qualquer frame em que a lista visível ou uma largura muda (at/out/typeAt+k·charFrames)
  const evFrames = new Set<number>([0]);
  words.forEach((w) => {
    evFrames.add(w.at);
    if (w.out !== undefined) evFrames.add(w.out);
    if (w.typeAt !== undefined) for (let i = 0; i <= w.text.length; i++) evFrames.add(w.typeAt + i * charFrames);
  });
  const evs = [...evFrames].filter((e) => e <= f).sort((a, b) => a - b);
  // alvo por palavra: x do início da palavra (linha centrada em `x`) em cada evento
  const targetsFor = (w: KWord): Array<[number, number]> =>
    evs.map((e) => {
      const vis = visibleAt(e);
      const total = vis.reduce((acc, v) => acc + widthAt(v, e), 0) + space * Math.max(0, vis.length - 1);
      let left = x - total / 2;
      for (const v of vis) {
        if (v === w) return [e, left] as [number, number];
        left += widthAt(v, e) + space;
      }
      return [e, left] as [number, number]; // ainda não visível: fica onde vai nascer
    });
  const exit = exitAt !== undefined ? progress(f, exitAt, exitAt + 14, cubicIn) : 0;
  const vis = visibleAt(f);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(0px, ${-40 * exit}px) scale(${1 - 0.13 * exit})`, transformOrigin: `${x}px ${y}px`, pointerEvents: "none", ...style }}>
      {vis.map((w, i) => {
        const s = shown(w, f);
        const left = easedSteps(f, targetsFor(w), recenterK, recenterFrames);
        const blur = w.blurIn ? 12 * (1 - progress(f, w.at, w.at + 5, smooth)) : 0;
        const op = w.blurIn ? 0.4 + 0.6 * progress(f, w.at, w.at + 5, smooth) : 1;
        const base = w.accent ? accentColor : color;
        const col = arriveColor ? mix(arriveColor, base, progress(f, w.at, w.at + 6, softExpOut(4, 0.1))) : base;
        return (
          <div key={i} style={{ position: "absolute", left, top: y, transform: "translate(0, -50%)", whiteSpace: "pre", fontFamily: w.accent ? serifFamily : fontFamily, fontStyle: w.accent ? "italic" : "normal", fontWeight: w.accent ? 400 : weight, fontSize, lineHeight: 1, color: col, opacity: op, filter: blur > 0.2 ? `blur(${blur}px)` : undefined, willChange: "transform" }}>
            {s.text}
            {s.cursor ? <span style={{ display: "inline-block", width: Math.max(2, em * 0.03), height: em * 0.95, marginLeft: em * 0.04, verticalAlign: "-0.12em", background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor} 55%, transparent 100%)` }} /> : null}
          </div>
        );
      })}
    </div>
  );
};

const hex = (c: string): [number, number, number] => {
  const m = c.replace("#", "");
  const v = m.length === 3 ? m.split("").map((ch) => parseInt(ch + ch, 16)) : [parseInt(m.slice(0, 2), 16), parseInt(m.slice(2, 4), 16), parseInt(m.slice(4, 6), 16)];
  return [v[0], v[1], v[2]];
};
/** Mistura de duas cores hex (t 0 → a, 1 → b). */
export const mix = (a: string, b: string, t: number): string => {
  const A = hex(a), B = hex(b);
  const r = A.map((v, i) => Math.round(v + (B[i] - v) * Math.max(0, Math.min(1, t))));
  return `rgb(${r[0]},${r[1]},${r[2]})`;
};
