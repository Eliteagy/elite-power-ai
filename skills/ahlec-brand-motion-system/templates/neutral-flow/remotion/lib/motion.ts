/**
 * Motion helpers shared by every scene.
 *
 * The reference video's motion is dominated by exponential-decay easing
 * (fast start, long settle) — the "SaaS" curve measured in the vault:
 *   progress = 1 - e^(-k·x)
 * k≈6.3 for motion-graphics moves (half-life 0.267 s @ 30 fps),
 * k≈3.2 for UI-speed moves (half-life 0.086 s).
 * Each scene passes the k measured for that specific element.
 */
import { interpolate } from "remotion";

export type Curve = (x: number) => number;

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Exponential decay, normalised so that x=1 → exactly 1. */
export const expOut = (k: number): Curve => {
  const norm = 1 - Math.exp(-k);
  return (x) => (1 - Math.exp(-k * clamp01(x))) / norm;
};

export const linear: Curve = (x) => clamp01(x);
export const quadOut: Curve = (x) => 1 - (1 - clamp01(x)) ** 2;
export const cubicOut: Curve = (x) => 1 - (1 - clamp01(x)) ** 3;
export const quartOut: Curve = (x) => 1 - (1 - clamp01(x)) ** 4;
export const quintOut: Curve = (x) => 1 - (1 - clamp01(x)) ** 5;
export const sineOut: Curve = (x) => Math.sin((clamp01(x) * Math.PI) / 2);
export const sineInOut: Curve = (x) => -(Math.cos(Math.PI * clamp01(x)) - 1) / 2;
export const quadInOut: Curve = (x) => {
  const t = clamp01(x);
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
};
export const cubicInOut: Curve = (x) => {
  const t = clamp01(x);
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
};
export const quartInOut: Curve = (x) => {
  const t = clamp01(x);
  return t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
};
export const quadIn: Curve = (x) => clamp01(x) ** 2;
export const cubicIn: Curve = (x) => clamp01(x) ** 3;
/** Back-out with configurable overshoot (s=1.70158 ≈ 10 % overshoot). */
export const backOut = (s = 1.70158): Curve => (x) => {
  const t = clamp01(x) - 1;
  return 1 + (s + 1) * t ** 3 + s * t ** 2;
};

/**
 * Monotone cubic spline (Fritsch–Carlson) through measured keyframes.
 * C¹-continuous: no velocity jumps at the keyframes (unlike piecewise-linear `keyframes`),
 * and no overshoot on monotone data. Use this for every camera / tracked-position curve.
 */
export const spline = (frame: number, keys: Array<[number, number]>): number => {
  const n = keys.length;
  if (n === 0) return 0;
  if (n === 1 || frame <= keys[0][0]) return keys[0][1];
  if (frame >= keys[n - 1][0]) return keys[n - 1][1];
  const xs = keys.map((k) => k[0]);
  const ys = keys.map((k) => k[1]);
  const d: number[] = [];
  for (let i = 0; i < n - 1; i++) d[i] = (ys[i + 1] - ys[i]) / (xs[i + 1] - xs[i]);
  const m: number[] = new Array(n).fill(0);
  m[0] = d[0];
  m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const a = m[i] / d[i];
      const b = m[i + 1] / d[i];
      const s = a * a + b * b;
      if (s > 9) {
        const t = 3 / Math.sqrt(s);
        m[i] = t * a * d[i];
        m[i + 1] = t * b * d[i];
      }
    }
  }
  let i = 0;
  while (i < n - 2 && frame > xs[i + 1]) i++;
  const h = xs[i + 1] - xs[i];
  const t = (frame - xs[i]) / h;
  const t2 = t * t, t3 = t2 * t;
  const h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + t, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
  return h00 * ys[i] + h10 * h * m[i] + h01 * ys[i + 1] + h11 * h * m[i + 1];
};

/** CSS-style cubic-bezier easing (x1,y1,x2,y2). */
export const bezier = (x1: number, y1: number, x2: number, y2: number): Curve => {
  const A = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
  const B = (a1: number, a2: number) => 3 * a2 - 6 * a1;
  const Cc = (a1: number) => 3 * a1;
  const calc = (t: number, a1: number, a2: number) => ((A(a1, a2) * t + B(a1, a2)) * t + Cc(a1)) * t;
  const slope = (t: number, a1: number, a2: number) => 3 * A(a1, a2) * t * t + 2 * B(a1, a2) * t + Cc(a1);
  return (x) => {
    const xx = clamp01(x);
    if (xx === 0 || xx === 1) return xx;
    let t = xx;
    for (let k = 0; k < 8; k++) {
      const s = slope(t, x1, x2);
      if (Math.abs(s) < 1e-6) break;
      t -= (calc(t, x1, x2) - xx) / s;
    }
    return calc(t, y1, y2);
  };
};

/**
 * Exponential-decay ease with a short C¹ soft start (`softness` = fraction of the duration,
 * e.g. 2 frames / 28). Keeps the measured "instant" SaaS feel but removes the velocity
 * discontinuity at frame 0 that reads as a jolt.
 */
export const softExpOut = (k: number, softness = 0.08): Curve => {
  const e = expOut(k);
  return (x) => {
    const xx = clamp01(x);
    const s = softness <= 0 ? 1 : (() => { const u = Math.min(1, xx / softness); return u * u * (3 - 2 * u); })();
    return e(xx) * s + (1 - s) * 0;
  };
};

/** Smoothstep (3x²−2x³): gentle in-out with zero velocity at both ends. */
export const smooth: Curve = (x) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
/** Smootherstep (6x⁵−15x⁴+10x³): zero velocity AND acceleration at the ends — best for camera settles. */
export const smoother: Curve = (x) => { const t = clamp01(x); return t * t * t * (t * (t * 6 - 15) + 10); };


/**
 * Tween a value between two frames with a curve.
 * Outside [start,end] it clamps to from/to.
 */
export const tween = (
  frame: number,
  start: number,
  end: number,
  from: number,
  to: number,
  curve: Curve = softExpOut(6.3, 0.08), // soft start por defeito (regra Neutral Flow: nunca expOut cru numa entrada)
): number => {
  if (end <= start) return frame >= end ? to : from;
  const x = interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return from + (to - from) * curve(x);
};

/** Progress 0..1 between two frames with a curve (shorthand for tween(...,0,1)). */
export const progress = (
  frame: number,
  start: number,
  end: number,
  curve: Curve = softExpOut(6.3, 0.08), // soft start por defeito (regra Neutral Flow: nunca expOut cru numa entrada)
): number => tween(frame, start, end, 0, 1, curve);

/**
 * Piecewise keyframe interpolation: keys = [[frame, value], ...] sorted by frame.
 * A single curve is applied to every segment (or pass an array, one per segment).
 */
/** ⚠️ Piecewise (linear por defeito) — NÃO usar para câmara/posições contínuas: usar spline(). Só para valores discretos. */
export const keyframes = (
  frame: number,
  keys: Array<[number, number]>,
  curve: Curve | Curve[] = linear,
): number => {
  if (keys.length === 0) return 0;
  if (frame <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [f0, v0] = keys[i - 1];
    const [f1, v1] = keys[i];
    if (frame <= f1) {
      const c = Array.isArray(curve) ? curve[Math.min(i - 1, curve.length - 1)] : curve;
      return tween(frame, f0, f1, v0, v1, c);
    }
  }
  return keys[keys.length - 1][1];
};

/** Deterministic pseudo-random in [0,1) from a seed (for particles etc.). */
export const hash = (seed: number): number => {
  let x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Soft sinusoidal oscillation for breathing/drift. */
export const osc = (frame: number, periodFrames: number, phase = 0): number =>
  Math.sin(((frame / periodFrames) * 2 + phase) * Math.PI);

/* ------------------------------------------------------------------ V2 additions: smooth interpolation */

/** Curva-assinatura do estilo (entradas de motion graphics, k 6,3 + soft start) e variante UI 3× mais rápida. */
export const saasOut: Curve = softExpOut(6.3, 0.08);
export const uiOut: Curve = softExpOut(3.2, 0.08);

/**
 * In-out paramétrico para DESLOCAR um grupo já visível (não para entradas): velocidade ∝ t^a·(1−t)^b com o pico
 * em `peakFrac` da duração e cauda longa — o perfil medido em CHAT_MOVE_1 (pico ao 4.º de 14 frames ≈ 0,25).
 * Usar quando a distância/duração não é a das tabelas medidas (CHAT_MOVE_1/2, SPHERE_RISE em measured.ts).
 */
export const moveInOut = (peakFrac = 0.25, sharpness = 3): Curve => {
  const a = Math.max(0.05, sharpness * peakFrac);
  const b = Math.max(0.05, sharpness * (1 - peakFrac));
  const N = 96;
  const cum: number[] = [0];
  for (let i = 1; i <= N; i++) {
    const t = (i - 0.5) / N;
    cum.push(cum[i - 1] + Math.pow(t, a) * Math.pow(1 - t, b));
  }
  const keys = cum.map((v, i) => [i / N, v / cum[N]] as [number, number]);
  return (x) => spline(x, keys);
};
