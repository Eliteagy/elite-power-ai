import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { OrbEclipse } from "../components/OrbEclipse";
import { NeonBadge } from "../components/NeonBadge";
import { TileGlints } from "../components/TileGlints";
import { BlurExit } from "../components/BlurExit";
import { LockSeal } from "../components/LockSeal";
import { StarRing } from "../components/StarRing";
import { Comet, cometPath } from "../components/Comet";
import { ChromeCounter } from "../components/ChromeCounter";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { AMK } from "../lib/theme-amk";
import { INTER } from "../lib/fonts";

/**
 * Exemplo verificado do catálogo C — sub-estilo C1 «Neon roll-call» em paleta AMK (Dark Neon), 300 f = 10 s a 30 fps.
 * Roll-call de 4 claims encadeados sem cortes (M29):
 *   f0–68    orbes (M19, speed 2 → a cena de 4 s do original em 2,2 s) e ECLIPSE (M20): o preto engole o frame; o badge nasce dentro da vesica
 *   f68–126  badge «IVA · EM DIA» (M21) → troca por letras para «FATURAS · AUTOMÁTICAS» (M22) com tiles + glints atrás (M23)
 *   f150     blur-out (M24) → blob → cadeado tranca + contornos-eco (M25)
 *   f200     anel de estrelas + «Dados · na UE» (M26) → cometa apaga e pousa (M27) → contador 99,9 % (M28)
 * Estrelas em #88C8FB (a exceção amarela só se o símbolo for literalmente a UE); único magenta: nenhum — a barra fecha em lavanda.
 */
export type NeonRollCallProps = { audio: AudioMode };
const CUES: Cue[] = [
  { frame: 0, file: "swell_pad.wav", gain: -12 },
  { frame: 48, file: "whoosh_rise.wav", gain: -8 }, // orbes chocam
  { frame: 62, file: "thump_low.wav", gain: -6 }, // o preto enche
  { frame: 72, file: "pulse_soft.wav", gain: -8 }, // stab tonal do badge (o typewriter é mudo no original)
  { frame: 86, file: "pop_ui.wav", gain: -10 }, // check
  { frame: 92, file: "shimmer_intro.wav", gain: -12 }, // halo
  { frame: 104, file: "whoosh_short.wav", gain: -12 }, // troca de rótulo
  { frame: 108, file: "pulse_soft.wav", gain: -10 }, // troca de rótulo: 1 stab, sem clicks
  { frame: 118, file: "sparkle_soft.wav", gain: -12 }, // glints
  { frame: 150, file: "whoosh_rise.wav", gain: -10 }, // blur-out
  { frame: 166, file: "pop_ui.wav", gain: -8 }, // cadeado
  { frame: 178, file: "hit_cut.wav", gain: -8 }, // tranca
  { frame: 178, file: "sparkle.wav", gain: -8 }, // anéis
  { frame: 200, file: "thump_low.wav", gain: -6 }, // estrelas chegam: 2 thumps sub, não 12 blips
  { frame: 209, file: "thump_low.wav", gain: -8 },
  { frame: 206, file: "sparkle_soft.wav", gain: -16 },
  ...[214, 220].map((fr) => ({ frame: fr, file: "blip_hi.wav", gain: -18 })), // letras assentam: 2 ticks
  { frame: 228, file: "whoosh_rise.wav", gain: -10 }, // cometa arranca
  { frame: 246, file: "whoosh_short.wav", gain: -8 }, // velocidade máxima
  { frame: 256, file: "riser_star.wav", gain: -8 }, // pousa → contador
  { frame: 259, file: "shimmer_intro.wav", gain: -14 }, // tom contínuo do contador
  { frame: 294, file: "sparkle.wav", gain: -8 }, // cap 99,9 %
];
const DARK = AMK.floorMid;
export const NeonRollCall: React.FC<NeonRollCallProps> = ({ audio }) => {
  const f = useCurrentFrame();
  const eclipseDone = f >= 68;
  const cometKeys = cometPath(228, 960, 540, 210, 1, 20, { x: 960, y: 560 }, 32);
  return (
    <AbsoluteFill style={{ backgroundColor: DARK, overflow: "hidden", fontFamily: INTER }}>
      {/* chão escuro (por baixo da cena clara até ao eclipse) */}
      <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
      {/* ===== f66–150: badge + tiles ===== */}
      {eclipseDone && f < 170 && (
        <BlurExit frame={f} start={150} frames={13} maxBlur={40} blob={{ x: 960, y: 540, r: 220, color: AMK.beamHot, frames: 10 }}>
          <TileGlints frame={f} start={116} glintsAt={128} outline="#1A1F2E" colors={[AMK.beamCore, AMK.accentLavender]} glints={5} seed={2} offsetX={-80} offsetY={-40} opacity={0.9} />
          <NeonBadge frame={f} start={70} x={960} y={540} lines={["IVA", "EM DIA"]} birth={false} swap={{ lines: ["FATURAS", "AUTOMÁTICAS"], at: 104 }} gradient={[AMK.accentEdge, "#4369F8"]} solid={AMK.beamCore} glow={AMK.beamHot} text={AMK.text} dot={AMK.floorBottom} size={92} scale={1.6} />
        </BlurExit>
      )}
      {/* ===== f0–66: orbes + eclipse; o badge nasce dentro da vesica (linha → retângulo → card) ===== */}
      {!eclipseDone && (
        <OrbEclipse frame={f} speed={2} ground="#E8ECF0" colorA={AMK.beamCore} colorB={AMK.accentLavender} rim="#FFFFFF" black={DARK} fillAt={120} fillK={0.15} childAt={112}>
          <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
          <NeonBadge frame={f * 2 - 70} start={70} x={960} y={540} lines={["IVA", "EM DIA"]} birth gradient={[AMK.accentEdge, "#4369F8"]} solid={AMK.beamCore} glow={AMK.beamHot} text={AMK.text} dot={AMK.floorBottom} size={92} scale={1.6} />
        </OrbEclipse>
      )}
      {/* ===== f166–212: cadeado tranca + anéis; sai por blur enquanto as estrelas chegam ===== */}
      {f >= 166 && f < 214 && (
        <BlurExit frame={f} start={200} frames={8} maxBlur={30}>
          <LockSeal frame={f} start={166} lockAt={171} x={960} y={540} size={280} glow={AMK.beamHot} iconDark={DARK} iconLight={AMK.text} ringColor={AMK.text} />
        </BlurExit>
      )}
      {/* ===== f200–262: anel de estrelas + texto; cometa apaga e pousa ===== */}
      {f >= 200 && f < 266 && <StarRing frame={f} start={200} x={960} y={540} radius={210} count={12} starSize={52} color={AMK.beamHot} text={["Dados", "na UE"]} textAt={214} fontSize={54} eraseAt={236} eatAt={230} eatEvery={1.7} />}
      {f >= 228 && f < 264 && <Comet frame={f} path={cometKeys} color={AMK.beamHot} tail={AMK.beamCore} size={52} landAt={258} />}
      {/* ===== f262–299: contador chrome ===== */}
      <ChromeCounter frame={f} start={258} x={960} y={540} rate={2.7} cap={99.9} capAt={97.2} fontSize={200} top={AMK.text} bottom={AMK.beamCore} stroke={AMK.floorBottom} barStops={[AMK.text, AMK.beamCore, AMK.accentLavender]} period={52} />
      {eclipseDone && <Vignette strength={0.5} />}
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
