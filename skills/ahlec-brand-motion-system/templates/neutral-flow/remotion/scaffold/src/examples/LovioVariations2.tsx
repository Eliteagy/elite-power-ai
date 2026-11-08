import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Glow } from "../components/Glow";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { LetterAssembly } from "../components/LetterAssembly";
import { ChromaticRays } from "../components/ChromaticRays";
import { PillRings } from "../components/PillRings";
import { DeviceMock } from "../components/DeviceMock";
import { CardCloud } from "../components/CardCloud";
import { SkeletonBlocks } from "../components/GenerationBurst";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { softExpOut, smooth, spline, progress } from "../lib/motion";
import { AMK } from "../lib/theme-amk";
import { INTER, SERIF } from "../lib/fonts";

/**
 * Exemplo 2 do catálogo B em AMK — 4 compassos (240 f):
 *   c1–c2 (f0–119)  anel/nuvem de 12 cards a rebentar de um card central (M14) sobre chão claro; dispersa em f100
 *   c2 (f100)        código → blocos gradiente → UI por blur-in (M11b) — a UI é um card AMK
 *   c3 (f120)        CORTE no downbeat (hit 1 f antes) para a cena escura do dispositivo; hold 8 f; f128–156 a moldura encolhe para uma pill com anéis (M13) e some
 *   c4 (f158)        wordmark chega da direita, letra a letra (M6a) + tagline serif
 */
export type LovioVariations2Props = { audio: AudioMode };
const BAR = 60;
const LIGHT = "#E8ECF0", INK = "#050E1D";
const CUES: Cue[] = [
  { frame: 0, file: "hit_cut.wav", gain: -4 }, { frame: 2, file: "whoosh_rise.wav", gain: -5 }, { frame: 8, file: "sparkle_soft.wav", gain: -7 },
  { frame: 98, file: "whoosh_short.wav", gain: -6 }, { frame: 100, file: "blip_hi.wav", gain: -10 }, { frame: 116, file: "sparkle.wav", gain: -7 },
  { frame: 2 * BAR - 1, file: "hit_cut.wav", gain: -4 }, { frame: 2 * BAR + 8, file: "whoosh_rise.wav", gain: -6 }, { frame: 2 * BAR + 30, file: "pulse_soft.wav", gain: -9 },
  ...Array.from({ length: 5 }, (_, i) => ({ frame: 158 + i, file: "blip_hi.wav", gain: -18 - i })),
  { frame: 176, file: "shimmer_intro.wav", gain: -9 },
];
const MiniCard: React.FC<{ w: number; h: number; hue: number; label: string }> = ({ w, h, hue, label }) => (
  <GlassCard width={w} height={h} radius={18} top={`hsla(${hue}, 70%, 55%, 0.55)`} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.5} style={{ position: "relative" }}>
    <span style={{ position: "absolute", left: 18, top: 16, fontFamily: INTER, fontWeight: 600, fontSize: 20, color: AMK.text }}>{label}</span>
    {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 18, top: 56 + 18 * i, width: w * (0.5 + 0.15 * i), height: 8, borderRadius: 4, background: "rgba(232,236,240,0.14)" }} />)}
  </GlassCard>
);

export const LovioVariations2: React.FC<LovioVariations2Props> = ({ audio }) => {
  const f = useCurrentFrame();
  const cards = Array.from({ length: 12 }, (_, i) => <MiniCard key={i} w={240 + 60 * (i % 3)} h={160 + 40 * (i % 2)} hue={200 + 20 * (i % 5)} label={["Dashboard", "Landing", "Loja", "Blog", "Painel", "App"][i % 6]} />);
  const gen = progress(f, 100, 120, softExpOut(3, 0.06)); // M11b (encurtado: o corte para o escuro é em f120)
  const pill = spline(f, [[128, 0], [134, 0.12], [140, 0.4], [148, 0.75], [156, 1]]); // M13 (a acelerar), depois de 8 f de hold no escuro
  const centerCardIn = progress(f, 0, 14, softExpOut(6.3, 0.08));
  return (
    <AbsoluteFill style={{ backgroundColor: LIGHT, overflow: "hidden" }}>
      {f < 120 ? (
        <AbsoluteFill style={{ backgroundColor: LIGHT }}>
          <ChromaticRays frame={f} colors={[AMK.auroraBlue, "#4369F8", AMK.auroraLavender, AMK.glassHighlight]} opacity={0.2} />
          {/* card central de onde os outros rebentam */}
          <div style={{ position: "absolute", left: 960, top: 540, transform: `translate(-50%,-50%) scale(${0.85 + 0.15 * centerCardIn})`, opacity: centerCardIn * (1 - progress(f, 100, 108, smooth)) }}>
            <MiniCard w={420} h={280} hue={210} label="O teu site" />
          </div>
          <CardCloud frame={f} start={12} cards={cards} rx={700} ry={330} tilt={25} omega={1.2} disperseAt={100} />
          {/* M11b: blocos → UI */}
          {f >= 100 ? (
            <SkeletonBlocks progress={gen} rect={{ x: 460, y: 240, w: 1000, h: 600 }} colors={[AMK.glassHighlight, AMK.auroraLavender]}>
              <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A0A0F, ${AMK.floorBottom})` }}>
                <div style={{ position: "absolute", left: 60, top: 60, fontFamily: INTER, fontWeight: 700, fontSize: 72, color: AMK.text }}>Painel</div>
                <div style={{ position: "absolute", left: 60, top: 150, fontFamily: SERIF, fontStyle: "italic", fontSize: 64, color: AMK.titleBlue }}>gerado</div>
                {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 60 + i * 300, top: 300, width: 260, height: 220, borderRadius: 20, background: AMK.glassGradient, boxShadow: `inset 0 1px 0 ${AMK.glassHighlight}55` }} />)}
              </AbsoluteFill>
            </SkeletonBlocks>
          ) : null}
        </AbsoluteFill>
      ) : null}
      {/* c3: cena escura dentro da moldura que vira pill (M13) */}
      {f >= 120 && f < 158 ? (
        <PillRings p={pill} bg={LIGHT} ringColors={[AMK.auroraLavender, AMK.glassHighlight, "#4369F8"]}>
          <AbsoluteFill style={{ backgroundColor: AMK.floorMid }}>
            <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
            <Glow x={960} y={900} rx={1100} ry={520} color="rgba(67,105,248,0.55)" opacity={0.9} blur={16} />
            <DeviceMock kind="tablet" x={960} y={560} scale={0.7} rotateY={-6} rotateX={4}>
              <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A0A0F, ${AMK.floorBottom})` }}>
                <div style={{ position: "absolute", left: 100, top: 120, fontFamily: INTER, fontWeight: 700, fontSize: 110, color: AMK.text }}>Painel</div>
                <div style={{ position: "absolute", left: 100, top: 250, fontFamily: SERIF, fontStyle: "italic", fontSize: 96, color: AMK.titleBlue }}>gerado</div>
              </AbsoluteFill>
            </DeviceMock>
            <Vignette strength={0.5} />
          </AbsoluteFill>
        </PillRings>
      ) : null}
      {/* c4: wordmark da direita + tagline */}
      {f >= 158 ? (
        <AbsoluteFill style={{ backgroundColor: LIGHT }}>
          <ChromaticRays frame={f} colors={[AMK.auroraBlue, "#4369F8", AMK.auroraLavender, AMK.glassHighlight]} opacity={0.18} />
          <LetterAssembly frame={f} text="ahlec" start={158} mode="fromRight" x={960} y={500} fontSize={150} fontFamily={INTER} weight={500} color={INK} arriveColor={AMK.titleBlue} charWidth={0.58} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 620, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 72, color: AMK.titleBlue, opacity: progress(f, 174, 184, smooth), clipPath: `inset(-8px ${(1 - progress(f, 174, 202, softExpOut(3, 0.08))) * 100}% -12px 0)` }}>vídeo que vende</div>
        </AbsoluteFill>
      ) : null}
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
