import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { Glow } from "../components/Glow";
import { DeviceMock } from "../components/DeviceMock";
import { AuroraArc } from "../components/AuroraArc";
import { CardFan } from "../components/CardFan";
import { ChatSequence } from "../components/ChatSequence";
import { SpinStar, StarSentence } from "../components/SpinStar";
import { StarIcon } from "../components/StarIcon";
import { Wordmark } from "../components/Wordmark";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { riseDrift, bellPan } from "../lib/motionC";
import { progress, softExpOut } from "../lib/motion";
import { AMK } from "../lib/theme-amk";
import { INTER } from "../lib/fonts";

/**
 * Exemplo verificado do catálogo C — sub-estilo C2 «Aurora product» em paleta AMK (Cinematic Tech), 330 f = 11 s a 30 fps, sem voz (M38: cortes nos tempos fortes).
 *   f0–60    arco aurora (M37) + título; TABLET SOBE de baixo (M30: expOut τ 6 f + deriva 2 px/f) com o ecrã em cascata; blur leve e corte
 *   f60–130  pill por blur-in → LEQUE DE 3 CARDS (M31) + bolha; zoom lento
 *   f130–210 SEQUÊNCIA DE CHAT (M33): placeholder → sobe → pergunta por palavras → «…» → resposta
 *   f210–250 dois tablets com etiqueta-pill; PAN EM SINO (M34) de 800 px em 30 f
 *   f250–300 ESTRELA GIRA e encolhe (M36); «O futuro do teu negócio ★ já está aqui» cresce à volta dela
 *   f300–329 logo assenta 14 % + botão (M37)
 */
export type AuroraProductProps = { audio: AudioMode; title: string; question: string; answer: string[] };
const CUES: Cue[] = [
  { frame: 0, file: "swell_pad.wav", gain: -10 },
  { frame: 4, file: "whoosh_rise.wav", gain: -8 }, // tablet sobe
  ...[13, 18, 22, 26].map((fr) => ({ frame: fr, file: "click_type.wav", gain: -20 })),
  { frame: 60, file: "hit_cut.wav", gain: -8 },
  ...[64, 68, 72].map((fr) => ({ frame: fr, file: "pop_ui.wav", gain: -10 })), // cards
  { frame: 75, file: "sparkle_soft.wav", gain: -12 },
  { frame: 130, file: "hit_cut.wav", gain: -8 },
  { frame: 130, file: "pop_ui.wav", gain: -6 }, // placeholder
  { frame: 155, file: "blip_hi.wav", gain: -12 }, // pergunta aparece (1 hit médio-agudo)
  { frame: 157, file: "sparkle_soft.wav", gain: -14 }, // 1 swell por linha, não por carácter
  { frame: 161, file: "blip_hi.wav", gain: -18 }, // «…»
  { frame: 210, file: "hit_cut.wav", gain: -8 },
  { frame: 216, file: "whoosh_rise.wav", gain: -8 }, // riser 6 f antes do pan (o pan em si é mudo)
  { frame: 250, file: "hit_cut.wav", gain: -8 },
  { frame: 250, file: "riser_star.wav", gain: -10 },
  ...[274, 283, 288, 293].map((fr) => ({ frame: fr, file: "blip_hi.wav", gain: -18 })),
  { frame: 310, file: "shimmer_intro.wav", gain: -10 },
];
const TabletScreen: React.FC<{ frame: number; start: number; question: string; answer: string[] }> = ({ frame, start, question, answer }) => {
  const t = frame - start;
  const row = (at: number, children: React.ReactNode, key: string) => { const a = Math.max(0, Math.min(1, (t - at) / 3)); return <div key={key} style={{ opacity: a, transform: `translateY(${8 * (1 - a)}px)`, marginBottom: 18 }}>{children}</div>; };
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #0A0A0F 0%, ${AMK.floorBottom} 100%)`, padding: 60, fontFamily: INTER, color: AMK.text }}>
      {row(9, <div style={{ height: 70, borderRadius: 35, border: `1px solid ${AMK.beamHot}66`, display: "flex", alignItems: "center", padding: "0 28px", justifyContent: "space-between", fontSize: 24, color: AMK.textMuted }}><span>Pesquisar nos documentos…</span><span style={{ background: AMK.beamCore, color: AMK.floorBottom, borderRadius: 20, padding: "6px 18px", fontWeight: 600 }}>Perguntar</span></div>, "s")}
      {row(14, <div style={{ fontSize: 24, padding: "14px 20px", borderRadius: 14, border: `1px solid ${AMK.beamHot}44`, width: "70%" }}>{question}</div>, "q")}
      {answer.map((l, i) => row(17 + i * 2, <div style={{ fontSize: 22, color: i === 0 ? AMK.text : AMK.textMuted }}>{l}</div>, "a" + i))}
    </AbsoluteFill>
  );
};
const Label: React.FC<{ x: number; y: number; text: string; a: number }> = ({ x, y, text, a }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", padding: "8px 18px", borderRadius: 20, background: AMK.floorBottom, border: `1px solid ${AMK.beamHot}88`, color: AMK.text, fontSize: 22, fontFamily: INTER, opacity: a }}>{text}</div>
);
export const AuroraProduct: React.FC<AuroraProductProps> = ({ audio, title, question, answer }) => {
  const f = useCurrentFrame();
  const scene = f < 60 ? 0 : f < 130 ? 1 : f < 210 ? 2 : f < 250 ? 3 : f < 310 ? 4 : 5;
  const devY = riseDrift(f, 4, 1500, 760, 6, -2); // topo do tablet: sobe expOut e continua a subir 2 px/f
  const introBlur = progress(f, 52, 60, (x) => x * x); // blur leve antes do corte (nitidez 439 → 318)
  const pillIn = progress(f, 60, 63, (x) => x); // blur-in 3 f
  const zoom = 1 + 0.002 * Math.max(0, f - 70);
  const pan = bellPan(f, 222, 30, -800);
  const logoS = 1.14 - 0.14 * (1 - Math.exp(-3.5 * Math.min(1, (f - 310) / 12)));
  const btnA = progress(f, 317, 322, (x) => x);
  return (
    <AbsoluteFill style={{ backgroundColor: AMK.floorMid, overflow: "hidden", fontFamily: INTER }}>
      <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
      {scene === 0 && (
        <AbsoluteFill style={{ filter: introBlur > 0 ? `blur(${6 * introBlur}px)` : undefined }}>
          <AuroraArc edge="top" color="#4369F8" peak={AMK.beamCore} opacity={0.65} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 150, textAlign: "center", color: AMK.text }}>
            <div style={{ fontSize: 28, color: AMK.beamHot, fontWeight: 500, marginBottom: 10 }}>AMK · Assistente</div>
            <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: "-0.02em", background: `linear-gradient(180deg, ${AMK.beamHot} 0%, ${AMK.text} 100%)`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{title}</div>
          </div>
          <DeviceMock kind="tablet" x={960} y={devY} scale={1.05} rotateX={24} rotateY={0} screen={{ w: 1600, h: 1100 }} glow="rgba(67,105,248,0.6)">
            <TabletScreen frame={f} start={0} question={question} answer={answer} />
          </DeviceMock>
          {f >= 13 && <div style={{ position: "absolute", left: 1420, top: 560, transform: `scale(${softExpOut(5, 0.1)(Math.min(1, (f - 13) / 8))})` }}><StarIcon size={140} gradient={[AMK.beamHot, AMK.beamCore]} waist={-0.2} /></div>}
          {f >= 24 && <div style={{ position: "absolute", left: 300, top: 640, transform: `scale(${softExpOut(5, 0.1)(Math.min(1, (f - 24) / 8))}) rotate(20deg)` }}><StarIcon size={200} gradient={[AMK.beamHot, AMK.beamCore]} waist={-0.2} /></div>}
        </AbsoluteFill>
      )}
      {scene === 1 && (
        <AbsoluteFill style={{ transform: `scale(${zoom})`, filter: pillIn < 1 ? `blur(${18 * (1 - pillIn)}px)` : undefined, opacity: 0.6 + 0.4 * pillIn }}>
          <Glow x={960} y={330} rx={700} ry={260} color="rgba(67,105,248,0.55)" opacity={0.9} blur={20} />
          <div style={{ position: "absolute", left: 360, top: 270, width: 1200, height: 96, borderRadius: 48, background: AMK.floorBottom, border: `1px solid ${AMK.beamHot}55`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 36px", boxSizing: "border-box", color: AMK.textMuted, fontSize: 30 }}>
            <span>Pesquisar nos documentos…</span><span style={{ background: AMK.beamCore, color: AMK.floorBottom, borderRadius: 26, padding: "10px 26px", fontWeight: 600 }}>Perguntar</span>
          </div>
          <CardFan frame={f} start={64} x={960} y={600} rise={420} cards={[
            { w: 760, h: 150, bg: AMK.text, title: "Assistente AMK", color: AMK.floorBottom, dy: -150 },
            { w: 820, h: 150, bg: AMK.beamCore, title: "Suporte ao cliente", color: AMK.floorBottom, dy: -70 },
            { w: 880, h: 260, bg: AMK.floorBottom, title: "Assistente AMK", color: AMK.text, dy: 60, children: <div style={{ padding: "0 22px", fontSize: 22, color: AMK.textMuted, lineHeight: 1.6 }}>{answer.map((l, i) => <div key={i}>{l}</div>)}</div> },
          ]} bubble={{ x: 1500, y: 520, r: 70, color: AMK.beamCore }} />
          {f >= 76 && <div style={{ position: "absolute", left: 250, top: 700, transform: `scale(${softExpOut(5, 0.1)(Math.min(1, (f - 76) / 8))}) rotate(-15deg)` }}><StarIcon size={220} gradient={[AMK.beamHot, AMK.beamCore]} waist={-0.2} /></div>}
        </AbsoluteFill>
      )}
      {scene === 2 && (
        <AbsoluteFill>
          <ChatSequence frame={f} start={130} x={960} y={470} w={960} question={question} answer={answer} gradient={[AMK.beamCore, AMK.beamHot]} dark={AMK.floorBottom} outline={AMK.beamHot} text={AMK.text} fontSize={28} />
        </AbsoluteFill>
      )}
      {scene === 3 && (
        <AbsoluteFill>
          <Glow x={960} y={900} rx={1100} ry={400} color="rgba(67,105,248,0.5)" opacity={0.8} blur={20} />
          <div style={{ position: "absolute", inset: 0, transform: `translate(${pan}px, 0)`, willChange: "transform" }}>
            {[0, 1].map((i) => (
              <React.Fragment key={i}>
                <Label x={960 + i * 800} y={250} text={i === 0 ? "Estilo inline" : "Estilo mensagem"} a={1} />
                <DeviceMock kind="tablet" x={960 + i * 800} y={600} scale={0.85} rotateY={-14} rotateX={4} screen={{ w: 1600, h: 1100 }} glow="rgba(67,105,248,0.5)">
                  <TabletScreen frame={f} start={180} question={question} answer={answer} />
                </DeviceMock>
              </React.Fragment>
            ))}
          </div>
        </AbsoluteFill>
      )}
      {scene === 4 && (
        <AbsoluteFill>
          <SpinStar frame={f} start={250} x={960} y={540} size0={720} size1={72} shrinkFrames={24} omega={11} gradient={[AMK.beamHot, AMK.beamCore]} glow={AMK.beamCore} />
          <StarSentence frame={f} x={960} y={540} starSize={72} fontSize={44} color={AMK.text} groups={[
            { text: "O futuro", at: 274, side: "left" }, { text: "do teu", at: 283, side: "left" }, { text: "negócio", at: 288, side: "left" }, { text: "já está aqui", at: 293, side: "right" },
          ]} />
        </AbsoluteFill>
      )}
      {scene === 5 && (
        <AbsoluteFill>
          <AuroraArc edge="bottom" color="#4369F8" peak={AMK.beamCore} opacity={0.65} />
          <div style={{ position: "absolute", left: 960, top: 500, transform: `translate(-50%, -50%) scale(${logoS})` }}><Wordmark fontSize={110} text="MagiKraft" /></div>
          <div style={{ position: "absolute", left: 960, top: 620, transform: "translate(-50%, -50%)", opacity: btnA, padding: "12px 28px", borderRadius: 24, background: AMK.beamCore, color: AMK.floorBottom, fontSize: 26, fontWeight: 600 }}>Começar</div>
        </AbsoluteFill>
      )}
      <Vignette strength={0.5} />
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
