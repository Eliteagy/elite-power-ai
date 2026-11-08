import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Beam } from "../components/Beam";
import { Glow } from "../components/Glow";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { KineticWords } from "../components/KineticWords";
import { Typewriter } from "../components/Typewriter";
import { LetterAssembly } from "../components/LetterAssembly";
import { Cursor, cursorPath } from "../components/Cursor";
import { Counter } from "../components/Counter";
import { ChromaticRays } from "../components/ChromaticRays";
import { GenerationBurst } from "../components/GenerationBurst";
import { DeviceMock } from "../components/DeviceMock";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { softExpOut, smooth, cubicIn, moveInOut, progress, bezier } from "../lib/motion";
import { AMK } from "../lib/theme-amk";
import { INTER, SERIF } from "../lib/fonts";

/**
 * Exemplo do catálogo B (variações Lovio) em paleta AMK — 4 compassos a 120 BPM (BAR 60 f, 30 fps):
 *   c1 (f0)   frase cinética sincronizada com a voz sobre chão claro AMK (M1) + typewriter com glitch na palavra-acento (M2) + saída a encolher; push com a moldura (M15) em f57–63
 *   c2 (f60)  produto no monitor (M9): UI de vidro com contador (M12), zoom-out k4; o dispositivo desloca-se para dar lugar ao texto (in-out); cursor entra e clica «Partilhar» (M10)
 *   c3 (f120) geração variante a (M11a): glow azul com núcleo magenta (o único magenta da peça) + código + white-out
 *   c4 (f180) do branco: letras «MagiKraft» chegam dispersas (M6b) + cursor-bloco substitui «cria» por «@/apps» (M3)
 * Flip de luminância (M17): claro (c1) → escuro (c2–c3) → claro (c4).
 */
export type LovioVariationsProps = { audio: AudioMode };
const BAR = 60;
const LIGHT = "#E8ECF0", INK = "#050E1D";
const CUES: Cue[] = [
  { frame: 0, file: "hit_cut.wav", gain: -4 },
  ...[0, 8, 16, 22].map((f) => ({ frame: f, file: "blip_hi.wav", gain: -18 })), // 1 por palavra
  ...Array.from({ length: 7 }, (_, i) => ({ frame: 28 + 2 * i, file: "click_type.wav", gain: -20 })),
  { frame: BAR - 3, file: "whoosh_short.wav", gain: -6 }, // push
  { frame: BAR, file: "pop_ui.wav", gain: -5 },
  { frame: BAR + 20, file: "whoosh_short.wav", gain: -8 }, // dispositivo desloca-se
  { frame: BAR + 24, file: "blip_hi.wav", gain: -16 }, { frame: BAR + 30, file: "blip_hi.wav", gain: -16 },
  { frame: BAR + 52, file: "pop_ui.wav", gain: -6 }, // clique
  { frame: 2 * BAR + 28, file: "riser_star.wav", gain: -8 }, // 20 f antes do white-out
  { frame: 2 * BAR + 48, file: "impact_intro.wav", gain: -6 },
  ...Array.from({ length: 9 }, (_, i) => ({ frame: 3 * BAR + i, file: "blip_hi.wav", gain: -20 - i })), // letras em cascata
  ...Array.from({ length: 6 }, (_, i) => ({ frame: 3 * BAR + 22 + 2 * i, file: "click_type.wav", gain: -20 })),
];

export const LovioVariations: React.FC<LovioVariationsProps> = ({ audio }) => {
  const f = useCurrentFrame();
  // c1 → c2: push com a moldura (M15): a cena clara desliza para a direita com rotateY 8° em 7 f enquanto a escura entra pela esquerda
  const push = progress(f, BAR - 3, BAR + 4, bezier(0.6, 0, 0.3, 1));
  // c2: monitor
  const camZoom = 1.1 - 0.1 * progress(f, BAR, BAR + 40, softExpOut(4, 0.08)); // zoom-out k4 (10 % em 40 f, medido)
  const shift = 300 * progress(f, BAR + 20, BAR + 32, moveInOut(0.25)); // dá lugar ao texto (12 f in-out, medido)
  const cur = cursorPath(f, [[BAR + 36, 1980, 1150], [BAR + 44, 1520, 900], [BAR + 52, 1408, 826], [BAR + 70, 1400, 830]]);
  const clickFlash = f >= BAR + 52 && f < BAR + 54;
  // c2 → c3: a cena do dispositivo desfoca e apaga em 4 f quando a geração começa
  const dim = progress(f, 2 * BAR, 2 * BAR + 4, smooth);
  const wo = progress(f, 2 * BAR + 48, 2 * BAR + 56, smooth); // white-out (GenerationBurst já pinta o branco; isto só liga a c4 por baixo)
  const sceneLight2 = f >= 2 * BAR + 50;
  return (
    <AbsoluteFill style={{ backgroundColor: LIGHT, overflow: "hidden" }}>
      {/* ===== c2–c3: mundo escuro (por baixo da moldura clara) ===== */}
      {f >= BAR - 3 && !sceneLight2 ? (
        <AbsoluteFill style={{ backgroundColor: AMK.floorMid, filter: dim > 0 ? `blur(${12 * dim}px)` : undefined, opacity: 1 - 0.85 * dim }}>
          <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
          {/* luz vinda de baixo/trás do dispositivo (o navy-glow da Lovio em tokens AMK) */}
          <Glow x={960} y={900} rx={1100} ry={520} color="rgba(67,105,248,0.55)" opacity={0.9} blur={16} />
          <Beam x={960} topWidth={340} bottomWidth={1300} intensity={0.35} core={AMK.beamCore} hot={AMK.beamHot} edge={AMK.beamEdge} blur={60} bottomFade={0.7} />
          <div style={{ position: "absolute", inset: 0, transform: `translate(${shift}px, 0)`, willChange: "transform" }}>
            <DeviceMock kind="monitor" x={960} y={560} scale={camZoom * 0.62} rotateY={4 - 2 * progress(f, BAR, BAR + 40, softExpOut(4, 0.08))} rotateX={2} glow="rgba(67,105,248,0.6)">
              <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A0A0F, ${AMK.floorBottom})` }}>
                <Glow x={960} y={120} rx={900} ry={500} color={AMK.haze} opacity={0.5} />
                <div style={{ position: "absolute", left: 120, top: 110, fontFamily: INTER, fontWeight: 700, fontSize: 96, color: AMK.text, letterSpacing: "-0.01em" }}>Produção</div>
                <div style={{ position: "absolute", left: 120, top: 220, fontFamily: SERIF, fontStyle: "italic", fontSize: 96, color: AMK.titleBlue }}>em tempo real</div>
                <GlassCard width={520} height={300} radius={28} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.4} style={{ left: 120, top: 420 }}>
                  <span style={{ position: "absolute", left: 40, top: 36, fontFamily: INTER, fontWeight: 500, fontSize: 24, color: AMK.textDim }}>VÍDEOS ENTREGUES</span>
                  <Counter frame={f} start={BAR + 6} frames={36} from={206} to={230} suffix="+" style={{ position: "absolute", left: 40, top: 90, fontFamily: INTER, fontWeight: 700, fontSize: 120, color: AMK.text, lineHeight: 1 }} />
                  {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} style={{ position: "absolute", left: 40 + i * 72, bottom: 36, width: 40, height: 30 + 18 * i * progress(f, BAR + 10 + 2 * i, BAR + 24 + 2 * i, softExpOut(4, 0.1)), borderRadius: 6, background: `linear-gradient(180deg, ${AMK.beamCore}, ${AMK.glassHighlight})` }} />)}
                </GlassCard>
                {/* pill «Partilhar» que o cursor clica (M10b): acende 1 f */}
                <div style={{ position: "absolute", left: 1300, top: 860, width: 300, height: 88, borderRadius: 44, background: clickFlash ? AMK.white : AMK.pillLight, boxShadow: `0 0 ${clickFlash ? 60 : 30}px rgba(136,200,251,0.6)`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontWeight: 600, fontSize: 34, color: AMK.pillLightText }}>Partilhar ↗</div>
              </AbsoluteFill>
            </DeviceMock>
          </div>
          {/* texto ao lado do dispositivo (M1 no escuro) */}
          <KineticWords frame={f} x={360} y={540} fontSize={80} color={AMK.text} accentColor={AMK.titleBlue} arriveColor={AMK.glassHighlight} fontFamily={INTER} serifFamily={SERIF} words={[{ text: "vês", at: BAR + 24 }, { text: "a funcionar", at: BAR + 30, accent: true, blurIn: true }]} />
          <Cursor frame={f} x={cur.x} y={cur.y} kind="hand" clickAt={BAR + 52} opacity={f >= BAR + 36 ? 1 : 0} />
          <Vignette strength={0.55} />
        </AbsoluteFill>
      ) : null}
      {/* ===== c3: geração (M11a) ===== */}
      <GenerationBurst frame={f} start={2 * BAR} glow={AMK.beamCore} core={AMK.accent} white={LIGHT} whiteAt={48} />
      {/* ===== c4: mundo claro de novo (letras dispersas + substituição por cursor-bloco) ===== */}
      {sceneLight2 ? (
        <AbsoluteFill style={{ backgroundColor: LIGHT }}>
          <ChromaticRays frame={f} colors={[AMK.auroraBlue, "#4369F8", AMK.auroraLavender, AMK.glassHighlight]} opacity={0.22} />
          <LetterAssembly frame={f} text="MagiKraft" start={3 * BAR} mode="radial" x={960} y={470} fontSize={140} fontFamily={INTER} weight={700} color={INK} arriveColor={AMK.titleBlue} charWidth={0.6} seed={4} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 590, textAlign: "center", fontFamily: SERIF, fontStyle: "italic", fontSize: 88, color: AMK.titleBlue, opacity: progress(f, 3 * BAR + 12, 3 * BAR + 18, smooth) }}>
            <Typewriter frame={f} mode="replace" from="cria vídeos" text="@/apps/video" start={3 * BAR + 22} charFrames={2} cursor="block" cursorColor={INK} style={{ fontFamily: "ui-monospace, Menlo, monospace", fontStyle: "normal", fontSize: 72, color: INK }} fromStyle={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 88, color: AMK.titleBlue }} />
          </div>
          <div style={{ position: "absolute", inset: 0, background: LIGHT, opacity: 1 - wo }} />
        </AbsoluteFill>
      ) : null}
      {/* ===== c1: mundo claro — frase cinética; sai em push com a moldura ===== */}
      {f < BAR + 6 ? (
        <AbsoluteFill style={{ backgroundColor: LIGHT, transform: `translate(${1920 * push}px, 0) perspective(2400px) rotateY(${8 * push}deg) scale(${1 - 0.06 * push})`, transformOrigin: "100% 50%", boxShadow: push > 0 ? "-40px 0 80px rgba(5,14,29,0.35)" : undefined, willChange: "transform" }}>
          <ChromaticRays frame={f} colors={[AMK.auroraBlue, "#4369F8", AMK.auroraLavender, AMK.glassHighlight]} opacity={0.18} />
          <KineticWords frame={f} x={960} y={540} fontSize={108} color={INK} accentColor={AMK.titleBlue} fontFamily={INTER} serifFamily={SERIF} exitAt={46}
            words={[{ text: "Não", at: 0, out: 30 }, { text: "começas", at: 8, out: 34 }, { text: "com", at: 16 }, { text: "um", at: 22 }, { text: "produto", at: 28, accent: true, typeAt: 28 }]} />
        </AbsoluteFill>
      ) : null}
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
