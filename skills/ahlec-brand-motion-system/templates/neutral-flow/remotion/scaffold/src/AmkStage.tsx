import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "./components/ShadowGridBackground";
import { Beam } from "./components/Beam";
import { Rays } from "./components/Rays";
import { Glow } from "./components/Glow";
import { Particles } from "./components/Particles";
import { Vignette } from "./components/Vignette";
import { Grain } from "./components/Grain";
import { GlassCard } from "./components/GlassCard";
import { GlassSphere } from "./components/GlassSphere";
import { StarIcon } from "./components/StarIcon";
import { IconFolder } from "./components/Icons";
import { SoundDesign, AudioMode, Cue } from "./audio/SoundDesign";
import { softExpOut, saasOut, smooth, cubicIn, moveInOut, progress, tween } from "./lib/motion";
import { AMK } from "./lib/theme-amk";
import { INTER } from "./lib/fonts";

export type AmkStageProps = { audio: AudioMode; title: string; subtitle: string };

/**
 * Exemplo mínimo do estilo em AMK: 4 compassos a 120 BPM (BAR = 60 f), um evento grande por compasso.
 *   f0   herói (card de vidro) sobe k 6,3 com soft start · f60 deslocação de grupo (in-out) + esfera AI · f120 texto por wipe · f180 hold + creep, saída cubic-in para o corte em f240.
 * Pilha de luz: Shadow Grid (sem vinheta própria) → Beam → névoa → tinta → Rays → partículas do horizonte (nenhum horizonte aqui) → glow do emissor → conteúdo → Vignette → Grain.
 */
const BAR = 60;
const CUES: Cue[] = [
  { frame: 0, file: "pop_ui.wav", gain: -2 },
  { frame: 3, file: "whoosh_rise.wav", gain: -4 },
  { frame: 9, file: "sparkle_soft.wav", gain: -3 },
  { frame: BAR - 3, file: "whoosh_short.wav", gain: -6 },
  { frame: BAR + 6, file: "pop_ui.wav", gain: -5 },
  { frame: 2 * BAR, file: "blip_hi.wav", gain: -6 },
  { frame: 2 * BAR + 9, file: "blip_hi.wav", gain: -8 },
  { frame: 3 * BAR, file: "pulse_soft.wav", gain: -8 },
  { frame: 4 * BAR - 1, file: "hit_cut.wav", gain: -4 },
];

export const AmkStage: React.FC<AmkStageProps> = ({ audio, title, subtitle }) => {
  const f = useCurrentFrame();
  // --- movimento
  const rise = progress(f, 0, 28, softExpOut(6.3, 0.08)); // entrada do herói (k 6,3 + soft start)
  const creep = -0.5 * Math.max(0, f - 28); // creep residual depois do settle (px)
  const move = progress(f, BAR, BAR + 14, moveInOut(0.25)); // deslocação do grupo já visível (in-out, pico ao 4.º f)
  const sphereIn = progress(f, BAR + 4, BAR + 12, softExpOut(4, 0.12));
  const wipe = progress(f, 2 * BAR, 2 * BAR + 14, smooth); // wipe esq→dir do texto secundário
  const exit = progress(f, 4 * BAR - 9, 4 * BAR, cubicIn); // saída para o corte
  const bright = progress(f, 2 * BAR, 3 * BAR, saasOut);
  const cardY = 620 - 200 * rise + creep - 60 * move - 300 * exit;
  const cardScale = 0.93 + 0.07 * rise;
  return (
    <AbsoluteFill style={{ backgroundColor: AMK.floorMid, overflow: "hidden" }}>
      {/* 01–02 chão + textura */}
      <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
      {/* 03 beam · 04 névoa · 05 tinta · 06 rays */}
      <Beam x={960} topWidth={320} bottomWidth={1300} intensity={0.7 + 0.2 * bright} core={AMK.beamCore} hot={AMK.beamHot} edge={AMK.beamEdge} blur={60} bottomFade={0.7} />
      <Glow x={975} y={120} rx={900} ry={620} color={AMK.haze} opacity={0.5} blur={0} />
      <AbsoluteFill style={{ background: AMK.ambient, opacity: 0.8 }} />
      <Rays x={960} frame={f} intensity={0.4} color={AMK.rays} seed={3} />
      {/* 07 partículas: o campo são os estilhaços do Shadow Grid; aqui só uma faixa baixa */}
      <Particles frame={f} count={90} seed={7} area={{ x0: 200, y0: 760, x1: 1720, y1: 1040 }} minSize={1} maxSize={2.4} color={AMK.particle} opacity={0.6} twinkle={0.7} twinklePeriod={45} />
      {/* 09 glow do emissor (segue o herói) */}
      <Glow x={960} y={cardY + 120} rx={820} ry={360} color={AMK.emitterGlow} opacity={0.8 * rise * (1 - 0.45 * exit)} blur={16} />
      {/* 10 conteúdo */}
      <div style={{ position: "absolute", left: 960, top: cardY, transform: `translate(-50%, 0) scale(${cardScale})`, transformOrigin: "50% 0%", opacity: 1 - 0.45 * exit, willChange: "transform" }}>
        <GlassCard width={870} height={400} radius={30} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 48, top: 44, display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: AMK.medallionGradient, boxShadow: `0 0 26px ${AMK.sphereTint}80, inset 0 0 0 1.5px ${AMK.sphereRim}bb`, display: "flex", alignItems: "center", justifyContent: "center", color: AMK.white }}>
              <IconFolder size={40} />
            </div>
            <span style={{ fontFamily: INTER, fontWeight: 700, fontSize: 48, letterSpacing: "-0.01em", lineHeight: 1, backgroundImage: `linear-gradient(90deg, ${AMK.wordmarkGradient[0]} 0%, ${AMK.wordmarkGradient[1]} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{title}</span>
          </div>
          <span style={{ position: "absolute", left: 48, top: 190, fontFamily: INTER, fontWeight: 400, fontSize: 30, lineHeight: 1, color: AMK.textMuted, whiteSpace: "nowrap", clipPath: `inset(-4px ${(1 - wipe) * 100}% -8px 0)` }}>{subtitle}</span>
          {[0, 1, 2].map((i) => {
            const p = progress(f, 2 * BAR + 9 * i, 2 * BAR + 9 * i + 12, smooth);
            return <div key={i} style={{ position: "absolute", left: 48, top: 262 + i * 40, width: 300 + i * 120, height: 10, borderRadius: 5, background: "rgba(232,236,240,0.10)", clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }} />;
          })}
        </GlassCard>
      </div>
      {/* satélite: esfera AI com estrela a rodar (glow por Glow radial, sem drop-shadow) */}
      <div style={{ position: "absolute", left: 1460, top: cardY - 80 + 40 * (1 - sphereIn), transform: `scale(${0.6 + 0.4 * sphereIn})`, opacity: sphereIn * (1 - 0.7 * exit) }}>
        <GlassSphere size={88} glow={30} tint={AMK.sphereTint} rim={AMK.sphereRim} gradient={AMK.sphereGradient}>
          <div style={{ transform: `rotate(${3.3 * Math.max(0, f - BAR)}deg)` }}><StarIcon size={44} fill={AMK.white} waist={0} /></div>
        </GlassSphere>
      </div>
      {/* 11–12 vinheta + grão */}
      <Vignette strength={tween(f, 0, 1, 0.6, 0.6, smooth)} />
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
