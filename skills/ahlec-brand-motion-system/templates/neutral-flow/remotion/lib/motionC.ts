/**
 * Curvas do catálogo C (Neon + Aurora), medidas em `_ref_c` / `_ref_d`.
 *  - riseDrift: chegada expOut com cauda longa + deriva constante depois (M30: tablet sobe τ≈6 f e continua a 2 px/f)
 *  - bellPan: deslocação com perfil de velocidade em sino (M34: 2→72→2 px/f em 30 f) — é smootherstep, não expOut
 *  - overshootWidth: segue um alvo com overshoot de 15 % e assenta em N frames (M22: largura do card 549→477 em 10 f)
 *  - linearCapped: contador linear com cap (M28: 2,7 %/f até 97,2 → 99,9)
 *  - cycle: fase 0..1 periódica (M28: gradiente da barra, período 52 f)
 */
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Posição de `from` para `to`: expOut com constante de tempo `tau` (frames) a partir de `start`, mais `drift` px/f depois de `start`. */
export const riseDrift = (frame: number, start: number, from: number, to: number, tau = 6, drift = 0): number => {
  const t = Math.max(0, frame - start);
  const e = 1 - Math.exp(-t / tau);
  return from + (to - from) * e + drift * t;
};

/** Deslocação 0..distance entre start e start+frames com velocidade em sino (smootherstep: arranque e travagem simétricos, sem salto). */
export const bellPan = (frame: number, start: number, frames: number, distance: number): number => {
  const t = clamp01((frame - start) / frames);
  return distance * t * t * t * (t * (t * 6 - 15) + 10);
};

/** Velocidade instantânea do bellPan (px/f) — para escalar caudas/motion blur. */
export const bellSpeed = (frame: number, start: number, frames: number, distance: number): number =>
  bellPan(frame + 0.5, start, frames, distance) - bellPan(frame - 0.5, start, frames, distance);

/** Vai de `from` a `to` a partir de `start`: sobe rápido (≈6 f) até 1+overshoot e assenta em `settle` frames (M22). */
export const overshootTo = (frame: number, start: number, from: number, to: number, overshoot = 0.15, rise = 6, settle = 10): number => {
  const t = frame - start;
  if (t <= 0) return from;
  const d = to - from;
  if (t <= rise) {
    const u = t / rise; // ease-out até 1+overshoot
    return from + d * (1 + overshoot) * (1 - (1 - u) ** 3);
  }
  const u = clamp01((t - rise) / settle); // volta de 1+overshoot a 1, suave
  return from + d * (1 + overshoot * (1 - (u * u * (3 - 2 * u))));
};

/** Contador linear: `from` + rate·(frame−start), com cap: quando passa `capAt` salta para `cap` (M28: 97,2 → 99,9). */
export const linearCapped = (frame: number, start: number, from: number, rate: number, cap: number, capAt = cap): number => {
  const v = from + rate * Math.max(0, frame - start);
  return v >= capAt ? cap : v;
};

/** Fase 0..1 periódica. */
export const cycle = (frame: number, period: number, phase = 0): number => ((frame / period + phase) % 1 + 1) % 1;

/** Ponto de um caminho fechado (perímetro de um retângulo arredondado aproximado por retângulo) à distância d — para glints (M23). */
export const rectPerimeterPoint = (d: number, w: number, h: number): { x: number; y: number; angle: number } => {
  const P = 2 * (w + h);
  let s = ((d % P) + P) % P;
  if (s < w) return { x: s, y: 0, angle: 0 };
  s -= w;
  if (s < h) return { x: w, y: s, angle: 90 };
  s -= h;
  if (s < w) return { x: w - s, y: h, angle: 180 };
  s -= w;
  return { x: 0, y: h - s, angle: 270 };
};
