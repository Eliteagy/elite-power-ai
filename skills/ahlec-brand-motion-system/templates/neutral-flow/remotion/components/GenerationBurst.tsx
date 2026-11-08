import React from "react";
import { AbsoluteFill } from "remotion";
import { softExpOut, smooth, progress, hash } from "../lib/motion";

/**
 * Geração — variante a (catálogo B, M11a): glow radial que cresce (rx 300→900 em 30 f) com núcleo, scanlines, linhas de código a escreverem-se e a subir (1 linha/6 f), white-out em 8 f.
 * `start` = 1.º frame; duração típica 58 f; o branco total fica em start+50..58 — a cena seguinte nasce por blur-in a partir daí (o chamador faz isso).
 */
export const GenerationBurst: React.FC<{
  frame: number;
  start: number;
  glow?: string; // exterior
  core?: string; // núcleo (no AMK: o único magenta da peça)
  white?: string;
  lines?: string[];
  lineFrames?: number;
  whiteAt?: number; // offset do white-out (default 48)
  fontFamily?: string;
  textColor?: string;
}> = ({ frame: f, start, glow = "#3d79ba", core = "#c7b0fc", white = "#ffffff", lines = DEFAULT_LINES, lineFrames = 6, whiteAt = 48, fontFamily = "ui-monospace, SFMono-Regular, Menlo, monospace", textColor = "rgba(255,255,255,0.75)" }) => {
  const t = f - start;
  if (t < 0) return null;
  const grow = progress(t, 0, 30, softExpOut(3, 0.06));
  const rx = 300 + 600 * grow, ry = 200 + 380 * grow;
  const wo = progress(t, whiteAt, whiteAt + 8, smooth);
  const nLines = Math.min(lines.length, Math.floor(t / lineFrames) + 1);
  const scroll = (t % lineFrames) / lineFrames;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: 960 - rx, top: 540 - ry, width: 2 * rx, height: 2 * ry, borderRadius: "50%", background: `radial-gradient(ellipse at center, ${core} 0%, ${glow} 38%, transparent 70%)`, opacity: 0.85 * Math.min(1, t / 6), filter: "blur(16px)" }} />
      {/* scanlines só na bbox do glow */}
      <div style={{ position: "absolute", left: 960 - rx, top: 540 - ry, width: 2 * rx, height: 2 * ry, backgroundImage: "repeating-linear-gradient(180deg, rgba(255,255,255,0.10) 0 2px, transparent 2px 6px)", opacity: 0.6 * grow, mixBlendMode: "screen" }} />
      {/* código a subir */}
      <div style={{ position: "absolute", left: 520, top: 300 - scroll * 26, width: 880, fontFamily, fontSize: 20, lineHeight: "26px", color: textColor, opacity: 0.85, filter: "blur(0.6px)" }}>
        {lines.slice(0, nLines).map((l, i) => {
          const isLast = i === nLines - 1;
          const chars = isLast ? Math.floor(((t % lineFrames) / lineFrames) * l.length) : l.length;
          return <div key={i} style={{ whiteSpace: "pre", opacity: 0.35 + 0.65 * (i / Math.max(1, nLines - 1)) }}>{l.slice(0, chars)}</div>;
        })}
      </div>
      <AbsoluteFill style={{ background: white, opacity: wo }} />
    </AbsoluteFill>
  );
};
const DEFAULT_LINES = [
  'import { DashboardLayout } from "@/components/layout/DashboardLayout";',
  'import { MetricCard } from "@/components/dashboard/MetricCard";',
  'import { PerformanceChart } from "@/components/dashboard/PerformanceChart";',
  'import { Target, TrendingUp, Users } from "lucide-react";',
  "",
  "const Index = () => (",
  "  <DashboardLayout>",
  '    <div className="space-y-6">',
  '      <h1 className="text-3xl font-bold">Dashboard</h1>',
  "      <MetricCard value={230} label=\"Turbines\" />",
  "    </div>",
  "  </DashboardLayout>",
  ");",
];

/**
 * Geração — variante b (M11b): linhas de código desfocam → viram barras gradiente (skeleton) → fundem-se num retângulo → a UI nasce por blur-in.
 * `progress` 0..1 vindo do chamador (≈50 f): 0–0,25 barras aparecem, 0,25–0,6 convergem para `rect`, 0,6–1 o retângulo enche e a UI (children) foca.
 */
export const SkeletonBlocks: React.FC<{ progress: number; rect?: { x: number; y: number; w: number; h: number }; colors?: [string, string]; bars?: number; seed?: number; children?: React.ReactNode }> = ({ progress: p, rect = { x: 360, y: 200, w: 1200, h: 680 }, colors = ["#84ccfc", "#b4b4fc"], bars = 7, seed = 3, children }) => {
  const conv = smooth(Math.max(0, Math.min(1, (p - 0.25) / 0.35)));
  const fill = smooth(Math.max(0, Math.min(1, (p - 0.6) / 0.4)));
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: bars }, (_, i) => {
        const bx = 300 + 900 * hash(seed * 11 + i), by = 220 + 620 * hash(seed * 13 + i);
        const bw = 120 + 380 * hash(seed * 17 + i), bh = 8 + 12 * hash(seed * 19 + i);
        const show = p > 0.04 * i;
        const fadeIn = smooth(Math.max(0, Math.min(1, (p - 0.04 * i) / 0.08)));
        const x = bx + (rect.x - bx) * conv, y = by + (rect.y - by) * conv, w = bw + (rect.w - bw) * conv, h = bh + (rect.h - bh) * conv;
        return show ? <div key={i} style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: 8 + 16 * conv, background: `linear-gradient(120deg, ${colors[0]}, ${colors[1]})`, opacity: 0.85 * fadeIn, filter: `blur(${6 * (1 - conv * 0.7)}px)` }} /> : null;
      })}
      <div style={{ position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h, borderRadius: 24, overflow: "hidden", opacity: fill, filter: `blur(${20 * (1 - fill)}px)` }}>{children}</div>
    </AbsoluteFill>
  );
};
