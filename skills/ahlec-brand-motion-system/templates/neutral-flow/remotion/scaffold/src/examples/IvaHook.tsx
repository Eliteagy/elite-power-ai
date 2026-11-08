import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Beam } from "../components/Beam";
import { Glow } from "../components/Glow";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { KineticWords } from "../components/KineticWords";
import { LetterAssembly } from "../components/LetterAssembly";
import { Counter } from "../components/Counter";
import { ChromaticRays } from "../components/ChromaticRays";
import { DeviceMock } from "../components/DeviceMock";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { softExpOut, smooth, cubicIn, moveInOut, spline, progress, bezier } from "../lib/motion";
import { AMK } from "../lib/theme-amk";
import { INTER, SERIF } from "../lib/fonts";

/**
 * «Já te aconteceu chegar à altura de pagar o IVA, olhar para a conta e pensar: como é que eu vou pagar isto agora?»
 * 4 compassos a 120 BPM (BAR 60 f, 240 f), catálogo B em paleta AMK:
 *   f0–58   cena de frase (M1): 3 segmentos de ≤3 palavras, pops ao ritmo da voz, chão claro AMK + raios cromáticos
 *   f60     downbeat: «IVA» monta-se por letras dispersas (M6b), hero word; hold com creep; f92–103 encolhe e PUSH com a moldura (M15)
 *   f100    escuro: telemóvel (M9) com a app do banco; «IVA a pagar» conta 0 → 4 380 € (M12, k 2,5); zoom-out k4; f118 o telemóvel desloca-se para dar lugar
 *   f126    o pensamento em blur-in (M4a) ao lado: «como é que» → «eu vou pagar» → «isto agora?» com «agora?» à máquina com glitch (M2)
 *   f150    o valor fica MAGENTA (o único magenta da peça = a tensão)
 *   f180–239 hold com creep e dolly-out a acelerar para o corte (NLE)
 */
export type IvaHookProps = { audio: AudioMode; amount: number; balance: string };
const BAR = 60;
const LIGHT = "#E8ECF0", INK = "#050E1D";
const CAM: Array<[number, number]> = [[100, 1.1], [140, 1.0], [180, 0.99], [210, 0.975], [239, 0.955]];
const CUES: Cue[] = [
  { frame: 0, file: "hit_cut.wav", gain: -4 },
  ...[0, 5, 10, 24, 29, 33, 44, 48, 52].map((f) => ({ frame: f, file: "blip_hi.wav", gain: -18 })),
  { frame: BAR - 3, file: "whoosh_rise.wav", gain: -7 },
  ...[0, 1, 2].map((i) => ({ frame: BAR + i, file: "blip_hi.wav", gain: -16 - 2 * i })),
  { frame: BAR + 2, file: "shimmer_intro.wav", gain: -9 },
  { frame: 96, file: "whoosh_short.wav", gain: -6 }, // push
  { frame: 100, file: "pop_ui.wav", gain: -5 }, // telemóvel
  { frame: 108, file: "pulse_soft.wav", gain: -9 }, // contador arranca
  { frame: 118, file: "whoosh_short.wav", gain: -9 }, // desloca-se
  ...[126, 132, 137, 150, 156, 162, 178].map((f) => ({ frame: f, file: "blip_hi.wav", gain: -18 })),
  { frame: 150, file: "sparkle.wav", gain: -6 }, // magenta
  ...Array.from({ length: 6 }, (_, i) => ({ frame: 184 + 2 * i, file: "click_type.wav", gain: -20 })),
  { frame: 3 * BAR + 24, file: "pulse_soft.wav", gain: -10 },
];

export const IvaHook: React.FC<IvaHookProps> = ({ audio, amount, balance }) => {
  const f = useCurrentFrame();
  const push = progress(f, 96, 103, bezier(0.6, 0, 0.3, 1)); // M15
  const ivaOut = progress(f, 92, 100, cubicIn); // hero word encolhe e sobe antes do push
  const cam = spline(f, CAM);
  const shift = 200 * progress(f, 118, 130, moveInOut(0.25));
  const magenta = progress(f, 150, 158, softExpOut(4, 0.1));
  const amountColor = magenta > 0 ? `rgb(${Math.round(232 + (209 - 232) * magenta)},${Math.round(236 + (50 - 236) * magenta)},${Math.round(240 + (251 - 240) * magenta)})` : AMK.text;
  const dark = f >= 96;
  return (
    <AbsoluteFill style={{ backgroundColor: LIGHT, overflow: "hidden" }}>
      {/* ===== escuro (por baixo da moldura clara até ao push) ===== */}
      {dark ? (
        <AbsoluteFill style={{ backgroundColor: AMK.floorMid }}>
          <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
          <Glow x={1100} y={940} rx={1100} ry={520} color="rgba(67,105,248,0.55)" opacity={0.9} blur={16} />
          <Beam x={1100} topWidth={320} bottomWidth={1200} intensity={0.35} core={AMK.beamCore} hot={AMK.beamHot} edge={AMK.beamEdge} blur={60} bottomFade={0.7} />
          {/* câmara: zoom-out k4 depois do corte + dolly-out em creep a acelerar */}
          <AbsoluteFill style={{ transform: `translate(1100px, 560px) scale(${cam}) translate(-1100px, -560px)`, willChange: "transform" }}>
            <div style={{ position: "absolute", inset: 0, transform: `translate(${shift}px, 0)`, willChange: "transform" }}>
              {/* glow de emissor magenta atrás do telemóvel quando o valor "acende" */}
              <Glow x={1100} y={640} rx={520} ry={420} color="rgba(209,50,251,0.45)" opacity={0.6 * magenta} blur={16} />
              <DeviceMock kind="phone" x={1100} y={600} scale={0.95} rotateY={-8} rotateX={3} screen={{ w: 1080, h: 2340 }} glow={magenta > 0.5 ? "rgba(209,50,251,0.35)" : "rgba(67,105,248,0.6)"}>
                <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A0A0F 0%, ${AMK.floorBottom} 100%)`, fontFamily: INTER }}>
                  <Glow x={540} y={200} rx={700} ry={400} color={AMK.haze} opacity={0.45} />
                  <div style={{ position: "absolute", left: 70, top: 120, fontSize: 40, fontWeight: 500, color: AMK.textDim, letterSpacing: "0.06em" }}>CONTA À ORDEM</div>
                  <div style={{ position: "absolute", left: 70, top: 190, fontSize: 96, fontWeight: 700, color: AMK.text, letterSpacing: "-0.01em" }}>{balance}</div>
                  <div style={{ position: "absolute", left: 70, top: 320, fontSize: 40, fontWeight: 400, color: AMK.textMuted }}>saldo disponível</div>
                  <GlassCard width={940} height={520} radius={44} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.45} glow={magenta > 0.2 ? `rgba(209,50,251,${0.35 * magenta})` : undefined} style={{ left: 70, top: 460 }}>
                    <div style={{ position: "absolute", left: 60, top: 56, fontSize: 40, fontWeight: 500, color: AMK.textDim, letterSpacing: "0.06em" }}>IVA A PAGAR</div>
                    <div style={{ position: "absolute", left: 60, top: 140, fontSize: 150, fontWeight: 700, lineHeight: 1, color: amountColor, textShadow: magenta > 0 ? `0 0 ${40 * magenta}px rgba(209,50,251,${0.8 * magenta})` : undefined }}>
                      <Counter frame={f} start={108} frames={42} from={0} to={amount} suffix=" €" />
                    </div>
                    <div style={{ position: "absolute", left: 60, top: 330, fontSize: 38, fontWeight: 400, color: AMK.textMuted }}>vence em 3 dias</div>
                    <div style={{ position: "absolute", left: 60, right: 60, top: 420, height: 10, borderRadius: 5, background: "rgba(232,236,240,0.10)" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${100 * progress(f, 108, 150, softExpOut(2.5, 0.06))}%`, borderRadius: 5, background: magenta > 0 ? `linear-gradient(90deg, ${AMK.beamCore}, ${AMK.accent})` : `linear-gradient(90deg, ${AMK.beamCore}, ${AMK.glassHighlight})` }} />
                    </div>
                  </GlassCard>
                  {[0, 1, 2].map((i) => <div key={i} style={{ position: "absolute", left: 70, top: 1060 + i * 150, width: 940, height: 120, borderRadius: 30, background: "rgba(232,236,240,0.05)", boxShadow: "inset 0 1px 0 rgba(232,236,240,0.08)" }}><div style={{ position: "absolute", left: 40, top: 44, width: 300 + 80 * i, height: 16, borderRadius: 8, background: "rgba(232,236,240,0.10)" }} /></div>)}
                </AbsoluteFill>
              </DeviceMock>
            </div>
            {/* o pensamento (M1 + M4a + M2), à esquerda */}
            <KineticWords frame={f} x={470} y={540} fontSize={84} color={AMK.text} accentColor={AMK.titleBlue} fontFamily={INTER} serifFamily={SERIF} recenterK={5} recenterFrames={7}
              words={[
                { text: "como", at: 126, out: 150, blurIn: true }, { text: "é", at: 132, out: 150, blurIn: true }, { text: "que", at: 137, out: 150, blurIn: true },
                { text: "eu", at: 150, out: 176, blurIn: true }, { text: "vou", at: 156, out: 176, blurIn: true }, { text: "pagar", at: 162, out: 176, blurIn: true },
                { text: "isto", at: 178, blurIn: true }, { text: "agora?", at: 184, accent: true, typeAt: 184 },
              ]} />
          </AbsoluteFill>
          <Vignette strength={0.55} />
        </AbsoluteFill>
      ) : null}
      {/* ===== claro: frase + IVA; sai em push com a moldura ===== */}
      {f < 104 ? (
        <AbsoluteFill style={{ backgroundColor: LIGHT, transform: `translate(${1920 * push}px, 0) perspective(2400px) rotateY(${8 * push}deg) scale(${1 - 0.06 * push})`, transformOrigin: "100% 50%", boxShadow: push > 0 ? "-40px 0 80px rgba(5,14,29,0.35)" : undefined, willChange: "transform" }}>
          <ChromaticRays frame={f} colors={[AMK.auroraBlue, "#4369F8", AMK.auroraLavender, AMK.glassHighlight]} opacity={0.18} />
          <KineticWords frame={f} x={960} y={540} fontSize={108} color={INK} accentColor={AMK.titleBlue} fontFamily={INTER} serifFamily={SERIF}
            words={[
              { text: "Já", at: 0, out: 24 }, { text: "te", at: 5, out: 24 }, { text: "aconteceu", at: 10, out: 24 },
              { text: "chegar", at: 24, out: 44 }, { text: "à", at: 29, out: 44 }, { text: "altura", at: 33, out: 44 },
              { text: "de", at: 44, out: 58 }, { text: "pagar", at: 48, out: 58 }, { text: "o", at: 52, out: 58 },
            ]} />
          {/* hero word IVA: letras dispersas (M6b) no downbeat; hold com creep; encolhe e sobe antes do push */}
          <div style={{ position: "absolute", inset: 0, transform: `translate(0px, ${-60 * ivaOut - 0.15 * Math.max(0, f - 72)}px) scale(${(1 - 0.13 * ivaOut) * (1 + 0.0006 * Math.max(0, f - 72))})`, transformOrigin: "960px 540px", opacity: 1 - 0.3 * ivaOut }}>
            <LetterAssembly frame={f} text="IVA" start={BAR} mode="radial" x={960} y={540} fontSize={260} fontFamily={INTER} weight={700} color={INK} arriveColor={AMK.titleBlue} seed={9} />
          </div>
        </AbsoluteFill>
      ) : null}
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
