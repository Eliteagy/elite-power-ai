import React from "react";

/**
 * Ícone com glow que tranca + contornos-eco (catálogo C, M25).
 *  - LockIcon: cadeado em SVG 100×100; `closed` 0..1 baixa o arco (medido: 7 f).
 *  - EchoRings: N contornos com a forma do ícone (o mesmo path escalado), offsets 20/40/60 px, traço 2 px; aparecem DE UMA VEZ em `start`
 *    e assentam em 6 f (escala 0,95 → 1, opacidade 0 → 1 em 2 f).
 *  - LockSeal: silhueta sobre glow radial; a partir de `lockAt` fecha em 7 f e encolhe 40 %; no frame do fecho (lockAt+7) os anéis pop e o
 *    ícone passa a claro (`iconLight`). Glow da cor do elemento (regra AMK), não branco genérico.
 */
export const lockPath = (closed: number): { body: string; shackle: string } => {
  const dy = 14 * (1 - closed); // arco sobe 14 px quando aberto
  const open = 1 - closed;
  return {
    body: "M 22 48 H 78 A 6 6 0 0 1 84 54 V 90 A 6 6 0 0 1 78 96 H 22 A 6 6 0 0 1 16 90 V 54 A 6 6 0 0 1 22 48 Z",
    shackle: `M 32 48 V ${30 - dy} A 18 18 0 0 1 68 ${30 - dy} V ${48 - dy - 10 * open}`,
  };
};
export const LockIcon: React.FC<{ size: number; closed: number; color: string; style?: React.CSSProperties }> = ({ size, closed, color, style }) => {
  const p = lockPath(closed);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ overflow: "visible", ...style }}>
      <path d={p.shackle} fill="none" stroke={color} strokeWidth={9} strokeLinecap="round" />
      <path d={p.body} fill={color} />
      {closed > 0.9 && <circle cx={50} cy={70} r={5} fill="#030303" opacity={0.6} />}
    </svg>
  );
};
export const EchoRings: React.FC<{ frame: number; start: number; x: number; y: number; size: number; rings?: number; step?: number; color?: string; strokeWidth?: number; path?: string }> = ({ frame, start, x, y, size, rings = 3, step = 20, color = "#E8ECF0", strokeWidth = 3, path }) => {
  const t = frame - start;
  if (t < 0) return null;
  const settle = Math.min(1, t / 6); // 0,95 → 1
  const s = 0.95 + 0.05 * (1 - (1 - settle) ** 2);
  const a = Math.min(1, t / 2);
  const d = path ?? lockPath(1).body;
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${s})`, opacity: a * 0.85, willChange: "transform" }}>
      {Array.from({ length: rings }, (_, i) => {
        const sz = size + 2 * step * (i + 1);
        return (
          <svg key={i} width={sz} height={sz} viewBox="0 0 100 100" style={{ position: "absolute", left: -sz / 2, top: -sz / 2, overflow: "visible" }}>
            <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth * (100 / sz)} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <path d={lockPath(1).shackle} fill="none" stroke={color} strokeWidth={strokeWidth * (100 / sz)} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
        );
      })}
    </div>
  );
};
export const LockSeal: React.FC<{
  frame: number; start: number; lockAt: number; x: number; y: number; size?: number;
  glow?: string; iconDark?: string; iconLight?: string; ringColor?: string; rings?: number;
}> = ({ frame, start, lockAt, x, y, size = 260, glow = "#88C8FB", iconDark = "#030303", iconLight = "#E8ECF0", ringColor = "#E8ECF0", rings = 3 }) => {
  const f = frame;
  if (f < start) return null;
  const inA = Math.min(1, (f - start) / 6);
  const closed = Math.max(0, Math.min(1, (f - lockAt) / 7));
  const shrink = 1 - 0.4 * (1 - (1 - closed) ** 2);
  const sealed = f >= lockAt + 7;
  const glowR = size * 1.15;
  return (
    <>
      <div style={{ position: "absolute", left: x - glowR, top: y - glowR, width: 2 * glowR, height: 2 * glowR, borderRadius: "50%", background: `radial-gradient(circle, ${glow} 0%, ${glow}aa 30%, ${glow}33 55%, transparent 72%)`, opacity: (sealed ? 0.55 : 0.9) * inA, filter: "blur(6px)" }} />
      {sealed && <EchoRings frame={f} start={lockAt + 7} x={x} y={y} size={size * shrink * 0.9} rings={rings} step={size * 0.09} color={ringColor} />}
      <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${shrink * inA})`, willChange: "transform" }}>
        <LockIcon size={size} closed={closed} color={sealed ? iconLight : iconDark} style={{ position: "absolute", left: -size / 2, top: -size / 2, transition: undefined }} />
      </div>
    </>
  );
};
