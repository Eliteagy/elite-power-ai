import React from "react";
import { spline } from "../lib/motion";

/**
 * Orbes gradiente + eclipse (catálogo C, M19 + M20). Medido em `_ref_c` (crop 1080×608, 30 fps) e escalado ao canvas.
 *  - Dois orbes (rim claro desfocado + corpo saturado) derivam num chão claro; o orbe B é o simétrico do A em relação ao centro
 *    (medido: mag ≈ (W−bx, H−by)). Trocam de lado a meio (encolhem ao cruzar) e sobem/descem em ondas suaves.
 *  - A interseção é PRETA (vesica) e cresce; a partir de `fillAt` os dois escalam em torno do centro com e^(k·t) (k 0,107/f)
 *    até o preto encher o frame (≈12 f). `children` nasce DENTRO da vesica (clip circle ∩ circle) — é o elemento seguinte.
 * `frame` local: 0 = início da cena; a colisão dá-se em f96 (=f126 do original − 30), o enchimento em f120 (=f150), o preto cobre tudo em f132.
 * Para uma cena mais curta usar `speed` > 1 (comprime a tabela no tempo).
 */
type Pt = [number, number];
// [f, x, y, r] no espaço de referência 1080×608 (orbe A = azul). Tabela = trajetória medida (centroides + raio por área), suavizada.
const A: Array<[number, number, number, number]> = [
  [0, 154, 135, 171], [6, 150, 148, 176], [12, 122, 252, 205], [18, 138, 425, 188], [24, 154, 468, 173], [30, 166, 491, 164], [36, 189, 520, 151],
  [42, 263, 556, 122], [48, 493, 573, 85], [54, 766, 533, 130], [60, 866, 428, 163], [66, 874, 303, 151], [72, 857, 217, 146], [78, 831, 155, 145],
  [84, 793, 114, 138], [90, 688, 79, 130], [96, 420, 121, 153], [102, 339, 235, 170], [108, 316, 291, 173], [114, 304, 331, 184], [120, 275, 390, 213],
];
export const OrbEclipse: React.FC<{
  frame: number;
  width?: number; height?: number;
  ground?: string; colorA?: string; colorB?: string; rim?: string; black?: string;
  fillAt?: number; // frame local em que começa o enchimento (default 120)
  fillK?: number; // e^(k·t): 0,107/f = medido (×3,6 em 12 f); 0,15 se a cena tiver de fechar em 10 f sem cantos claros
  speed?: number; // 1 = tempo do original
  children?: React.ReactNode; // nasce dentro da vesica
  childAt?: number; // frame local a partir do qual o filho é visível (default 112 = linha em f142 do original)
}> = ({ frame, width = 1920, height = 1080, ground = "#E8ECF0", colorA = "#3EA1F9", colorB = "#C9A6FF", rim = "#FFFFFF", black = "#030303", fillAt = 120, fillK = 0.107, speed = 1, children, childAt = 112 }) => {
  const f = frame * speed;
  const sx = width / 1080, sy = height / 608, sr = Math.min(sx, sy) * 1.6; // área medida exclui o rim: raio ×1,6 para os orbes se tocarem em f96 como no original
  const keys = (i: 1 | 2 | 3) => A.map((k) => [k[0], k[i]] as Pt);
  const ax = spline(Math.min(f, 120), keys(1)) * sx, ay = spline(Math.min(f, 120), keys(2)) * sy, ar = spline(Math.min(f, 120), keys(3)) * sr;
  const cx = width / 2, cy = height / 2;
  const grow = f > fillAt ? Math.exp(fillK * (f - fillAt)) : 1; // enchimento
  const A_ = { x: cx + (ax - cx) * grow, y: cy + (ay - cy) * grow, r: ar * grow };
  const B_ = { x: cx - (ax - cx) * grow, y: cy - (ay - cy) * grow, r: ar * grow };
  const orb = (o: { x: number; y: number; r: number }, color: string, key: string) => (
    <div key={key} style={{ position: "absolute", left: o.x - o.r, top: o.y - o.r, width: 2 * o.r, height: 2 * o.r, borderRadius: "50%", background: `radial-gradient(circle at 50% 50%, ${color} 0%, ${color} 45%, ${color}cc 70%, ${rim} 96%, ${rim}00 100%)`, boxShadow: `0 0 ${Math.max(8, o.r * 0.08)}px ${rim}`, willChange: "transform" }} />
  );
  const clipA = `circle(${A_.r}px at ${A_.x}px ${A_.y}px)`, clipB = `circle(${B_.r}px at ${B_.x}px ${B_.y}px)`;
  const dist = Math.hypot(A_.x - B_.x, A_.y - B_.y);
  const intersect = dist < A_.r + B_.r;
  return (
    <div style={{ position: "absolute", inset: 0, background: ground, overflow: "hidden" }}>
      {orb(A_, colorA, "a")}
      {orb(B_, colorB, "b")}
      {intersect && (
        <div style={{ position: "absolute", inset: 0, clipPath: clipA }}>
          <div style={{ position: "absolute", inset: 0, clipPath: clipB, background: black }}>{f >= childAt ? children : null}</div>
        </div>
      )}
    </div>
  );
};
