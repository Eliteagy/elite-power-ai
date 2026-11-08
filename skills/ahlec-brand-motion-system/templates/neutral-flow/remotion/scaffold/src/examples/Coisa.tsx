import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ShadowGridBackground } from "../components/ShadowGridBackground";
import { Beam } from "../components/Beam";
import { Rays } from "../components/Rays";
import { Glow } from "../components/Glow";
import { Vignette } from "../components/Vignette";
import { Grain } from "../components/Grain";
import { GlassCard } from "../components/GlassCard";
import { GlassSphere } from "../components/GlassSphere";
import { StarIcon } from "../components/StarIcon";
import { IconEdit, IconUser, IconCalendar, IconCheck, IconArrowUpRight } from "../components/Icons";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { softExpOut, saasOut, smooth, sineOut, backOut, moveInOut, spline, progress } from "../lib/motion";
import { AMK } from "../lib/theme-amk";
import { INTER } from "../lib/fonts";

/**
 * «Coisa N» — uma animação de 8 s por item (01 / 02 / 03), mesmo sistema do hook «3 coisas».
 * 4 compassos a 120 BPM (BAR 60 f), câmara contínua, sem cortes (NLE corta em f0 e f239):
 *   compasso 1 (f0)    reveal de painel: card-herói sobe k 6,3 (entra 15 % maior), cascata do título (medalhão → H1 → sub → divisória)
 *   compasso 2 (f60)   resposta em streaming: 3 linhas em wipe (12 f, 9 f entre linhas) + esfera-satélite com estrela a rodar
 *   compasso 3 (f120)  mudança de estado: checks acendem em stagger 4 f, barra de progresso enche 1−e^(−2,5t) em 60 f
 *   compasso 4 (f180)  grupo desloca-se (in-out) e entra o «próximo»: card seguinte a espreitar (01/02) ou pill «Publicar» (03)
 * Pilha AMK: Shadow Grid → Beam → névoa → tinta → Rays → glows de emissor → conteúdo → Vignette → Grain 0,03. Sem horizonte.
 * O badge «3 coisas» (o anel do hook, recuado) fica no topo como satélite, para ligar as 4 peças.
 */
export type CoisaProps = {
  audio: AudioMode;
  n: 1 | 2 | 3;
  title: string;
  subtitle: string;
  bullets: [string, string, string];
  badgeNumber: string;
  badgeWord: string;
  next: "card" | "publish";
  nextTitle: string; // etiqueta do card seguinte (só next = "card")
  cta: string; // texto da pill (só next = "publish")
};

const BAR = 60;
const CARD_W = 1080, CARD_H = 500, CARD_TOP = 310; // herói centrado em x 960
const NEXT_X = 1660, NEXT_TOP = 560; // card seguinte (periférico, à direita)
const PILL_Y = 900;
const CAM: Array<[number, number]> = [[0, 1], [28, 1], [60, 0.992], [120, 0.98], [180, 0.97], [210, 0.96], [239, 0.946]]; // dolly-out em creep a partir do settle, a acelerar para o corte
const ICONS = [IconEdit, IconCalendar, IconUser];

const gradText = (from: string, to: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

const cues = (next: "card" | "publish"): Cue[] => [
  { frame: 0, file: "hit_cut.wav", gain: -4 }, // corte de entrada (NLE)
  { frame: 0, file: "whoosh_rise.wav", gain: -5 }, // card sobe
  { frame: 9, file: "sparkle_soft.wav", gain: -6 }, // vidro
  { frame: 18, file: "pop_ui.wav", gain: -7 }, // medalhão
  { frame: 21, file: "blip_hi.wav", gain: -8 }, // título
  { frame: 24, file: "blip_hi.wav", gain: -9 }, // subtítulo
  { frame: BAR, file: "blip_hi.wav", gain: -7 }, // linhas em wipe
  { frame: BAR + 4, file: "pop_ui.wav", gain: -6 }, // esfera
  { frame: BAR + 4, file: "sparkle_soft.wav", gain: -8 },
  { frame: BAR + 9, file: "blip_hi.wav", gain: -8 },
  { frame: BAR + 18, file: "blip_hi.wav", gain: -9 },
  { frame: 2 * BAR, file: "pop_ui.wav", gain: -4 }, // checks
  { frame: 2 * BAR + 4, file: "pop_ui.wav", gain: -5 },
  { frame: 2 * BAR + 8, file: "pop_ui.wav", gain: -6 },
  { frame: 2 * BAR + 30, file: "pulse_soft.wav", gain: -8 }, // fim do build
  { frame: 3 * BAR - 3, file: "whoosh_short.wav", gain: -6 }, // grupo desloca-se
  ...(next === "publish"
    ? [{ frame: 3 * BAR, file: "pop_ui.wav", gain: -3 }, { frame: 3 * BAR + 6, file: "sparkle.wav", gain: -5 }]
    : [{ frame: 3 * BAR, file: "pop_ui.wav", gain: -6 }, { frame: 3 * BAR + 2, file: "sparkle_soft.wav", gain: -8 }]),
];

export const Coisa: React.FC<CoisaProps> = ({ audio, n, title, subtitle, bullets, badgeNumber, badgeWord, next, nextTitle, cta }) => {
  const f = useCurrentFrame();
  const Icon = ICONS[n - 1];
  const NextIcon = ICONS[n % 3];

  // ---------- luz
  const lightIn = progress(f, 0, 10, sineOut);
  const landed = progress(f, 22, 36, smooth); // herói pousou → beam baixa
  const checks = progress(f, 2 * BAR, 2 * BAR + 30, saasOut);
  const bright = progress(f, 3 * BAR, 3 * BAR + 40, saasOut);
  const beamI = lightIn * (1.05 - 0.25 * landed + 0.12 * checks + 0.15 * bright);

  // ---------- câmara
  const cam = spline(f, CAM);

  // ---------- compasso 1: card-herói + cascata
  const rise = progress(f, 0, 28, softExpOut(6.3, 0.1)); // soft start 2,8 f (arranque a k 6,3 é o frame mais violento da peça)
  const cardY = CARD_TOP + 300 * (1 - rise);
  const cardS = 1.15 - 0.15 * rise; // entra maior e encolhe com a mesma curva
  const medal = progress(f, 18, 31, softExpOut(5, 0.1)); // cascata começa ainda no settle (o card já fez 98 % do percurso em f18)
  const h1Op = progress(f, 21, 28, smooth), h1Y = 29 * (1 - progress(f, 21, 38, softExpOut(4, 0.1)));
  const subOp = progress(f, 23, 34, smooth), subWipe = 0.6 + 0.4 * progress(f, 26, 52, softExpOut(3, 0.08)), subY = 18 * (1 - progress(f, 28, 38, softExpOut(4, 0.1)));
  const divider = progress(f, 28, 58, softExpOut(3, 0.08));
  const markOp = 0.1 * progress(f, 22, 48, softExpOut(2.5, 0.06));

  // ---------- compasso 2: linhas + esfera
  const sphereIn = progress(f, BAR + 4, BAR + 12, softExpOut(4, 0.12));
  const sphereDrift = progress(f, BAR + 14, BAR + 34, smooth);

  // ---------- compasso 3: estado
  const fill = 1 - Math.exp(-2.5 * Math.min(1, Math.max(0, f - 2 * BAR) / 60));

  // ---------- compasso 4: deslocação + próximo
  const move = progress(f, 3 * BAR - 3, 3 * BAR + 11, moveInOut(0.25));
  const groupX = next === "card" ? -70 * move : 0;
  const groupY = next === "publish" ? -44 * move : 0;
  const creep = -0.25 * Math.max(0, f - (3 * BAR + 11));
  const nextRise = progress(f, 3 * BAR, 3 * BAR + 28, softExpOut(8, 0.06));
  const pillIn = progress(f, 3 * BAR, 3 * BAR + 25, backOut(2.2));
  const pillOp = progress(f, 3 * BAR, 3 * BAR + 7, smooth);
  const flash = 0.35 * Math.exp(-(((f - (3 * BAR + 7)) / 4) ** 2));

  // badge «3 coisas» (satélite no topo, recuado)
  const badgeOp = 0.55 * lightIn;
  const badgeY = 150 - 0.15 * f;

  return (
    <AbsoluteFill style={{ backgroundColor: AMK.floorMid, overflow: "hidden" }}>
      <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
      <Beam x={960} topWidth={340} bottomWidth={1350} intensity={beamI} core={AMK.beamCore} hot={AMK.beamHot} edge={AMK.beamEdge} blur={60} bottomFade={0.72} />
      <Glow x={975} y={120} rx={900} ry={620} color={AMK.haze} opacity={0.55 * lightIn} blur={0} />
      <AbsoluteFill style={{ background: AMK.ambient, opacity: 0.8 * lightIn }} />
      <Rays x={960} frame={f} intensity={0.42 * lightIn} color={AMK.rays} seed={3 + n} />

      <AbsoluteFill style={{ transform: `translate(960px, 600px) scale(${cam}) translate(-960px, -600px)`, willChange: "transform" }}>
        {/* 09 glows de emissor */}
        <Glow x={960 + groupX} y={cardY + CARD_H / 2 + groupY} rx={840} ry={400} color={AMK.emitterGlow} opacity={1.0 * lightIn * rise * (1 + 0.15 * checks)} blur={16} />
        {next === "card" ? <Glow x={NEXT_X} y={NEXT_TOP + 150} rx={320} ry={240} color={AMK.emitterGlowDeep} opacity={0.5 * nextRise} blur={14} /> : null}
        {next === "publish" ? <Glow x={960} y={PILL_Y + groupY} rx={420} ry={200} color="rgba(136,200,251,0.6)" opacity={0.7 * pillOp} blur={14} /> : null}

        {/* satélite: badge «3 coisas» (anel do hook, recuado) */}
        <div style={{ position: "absolute", left: 960, top: badgeY, width: 0, height: 0, transform: "scale(0.36)", opacity: badgeOp, filter: "blur(1.5px)", willChange: "transform" }}>
          <div style={{ position: "absolute", left: 6 * Math.sin(f / 9), top: 4 * Math.sin(f / 7 + 1), width: 0, height: 0 }}>
            <div style={{ position: "absolute", left: -296, top: -296, width: 592, height: 592, borderRadius: "50%", background: `radial-gradient(circle at 50% 42%, rgba(67,105,248,0.42) 0%, ${AMK.horizonDiscMid} 55%, rgba(5,14,29,0.9) 100%)` }} />
            <div style={{ position: "absolute", left: -296, top: -296, width: 592, height: 592, borderRadius: "50%", border: "5px solid rgba(136,200,251,0.95)", boxSizing: "border-box", boxShadow: "0 0 30px 10px rgba(62,161,249,0.7), 0 0 90px 30px rgba(67,105,248,0.45), inset 0 0 40px 10px rgba(136,200,251,0.45)" }} />
            <div style={{ position: "absolute", left: -400, top: -200, width: 800, textAlign: "center", fontFamily: INTER, fontWeight: 700, fontSize: 200, lineHeight: 1, letterSpacing: "-0.01em", ...gradText(AMK.wordmarkGradient[0], AMK.titleBlue) }}>{badgeNumber}</div>
            <div style={{ position: "absolute", left: -400, top: 52, width: 800, textAlign: "center", fontFamily: INTER, fontWeight: 600, fontSize: 86, lineHeight: 1, ...gradText(AMK.wordmarkGradient[0], AMK.wordmarkGradient[1]) }}>{badgeWord}</div>
          </div>
        </div>

        {/* herói: card-painel */}
        <div style={{ position: "absolute", left: 960 + groupX, top: cardY + groupY + creep, transform: `translate(-50%, 0) scale(${cardS})`, transformOrigin: "50% 0%", opacity: Math.min(1, 1.4 * rise), willChange: "transform" }}>
          <GlassCard width={CARD_W} height={CARD_H} radius={30} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.35} style={{ position: "relative" }}>
            {/* banda de luz radial no topo (luz de cima) */}
            <Glow x={300} y={40} rx={520} ry={150} color="rgba(136,200,251,0.22)" opacity={1} blur={0} />
            {/* número gigante em marca de água (canto inferior direito) */}
            <div style={{ position: "absolute", right: 40, bottom: -22, fontFamily: INTER, fontWeight: 700, fontSize: 260, lineHeight: 1, letterSpacing: "-0.02em", opacity: markOp, ...gradText(AMK.wordmarkGradient[0], AMK.titleBlue) }}>{`0${n}`}</div>
            {/* medalhão (entra por scale) */}
            <div style={{ position: "absolute", left: 52, top: 52, width: 110, height: 110, borderRadius: "50%", background: AMK.medallionGradient, boxShadow: `0 0 26px ${AMK.sphereTint}80, inset 0 0 0 1.5px ${AMK.sphereRim}bb`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + 0.4 * medal})`, opacity: medal }}>
              <Icon size={52} color={AMK.white} />
            </div>
            {/* H1 (slide-up 29 px k4) · sub (wipe k3 + slide 18) */}
            <div style={{ position: "absolute", left: 196, top: 50 + h1Y, fontFamily: INTER, fontWeight: 700, fontSize: 64, lineHeight: 1, letterSpacing: "-0.01em", whiteSpace: "nowrap", opacity: h1Op, willChange: "transform", ...gradText(AMK.wordmarkGradient[0], AMK.wordmarkGradient[1]) }}>{title}</div>
            <div style={{ position: "absolute", left: 196, top: 132 + subY, fontFamily: INTER, fontWeight: 400, fontSize: 30, lineHeight: 1, whiteSpace: "nowrap", color: AMK.textMuted, opacity: subOp, clipPath: `inset(-4px ${(1 - subWipe) * 100}% -8px 0)` }}>{subtitle}</div>
            {/* divisória (cresce da esquerda) */}
            <div style={{ position: "absolute", left: 52, top: 206, width: (CARD_W - 104) * divider, height: 1, background: "rgba(232,236,240,0.12)" }} />
            {/* 3 linhas (wipe 12 f, 9 f entre linhas) com check-círculo que acende no compasso 3 */}
            {bullets.map((b, j) => {
              const wp = progress(f, BAR + 9 * j, BAR + 12 + 9 * j, smooth);
              const done = progress(f, 2 * BAR + 4 * j, 2 * BAR + 14 + 4 * j, softExpOut(5, 0.1));
              return (
                <div key={j} style={{ position: "absolute", left: 52, top: 236 + 64 * j, display: "flex", alignItems: "center", gap: 20, clipPath: `inset(-6px ${(1 - wp) * 100}% -6px -6px)` }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", boxSizing: "border-box", border: "1.5px solid rgba(232,236,240,0.35)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: -1.5, borderRadius: "50%", background: AMK.pillLight, boxShadow: `0 0 ${12 + 8 * done}px rgba(62,161,249,${0.5 * done})`, opacity: done, transform: `scale(${0.85 + 0.15 * done})` }} />
                    <div style={{ position: "relative", opacity: done }}><IconCheck size={18} color={AMK.pillLightText} strokeWidth={2.6} /></div>
                  </div>
                  <span style={{ fontFamily: INTER, fontWeight: 500, fontSize: 32, lineHeight: 1, whiteSpace: "nowrap", color: AMK.text, opacity: 0.85 }}>{b}</span>
                </div>
              );
            })}
            {/* etiqueta N / 3 + barra de progresso (enche 1−e^(−2,5t)) */}
            <span style={{ position: "absolute", left: 52, top: 450, fontFamily: INTER, fontWeight: 500, fontSize: 20, lineHeight: 1, color: AMK.textDim, letterSpacing: "0.04em", opacity: divider }}>{`0${n} / 03`}</span>
            <div style={{ position: "absolute", left: 172, right: 52, top: 457, height: 6, borderRadius: 3, background: "rgba(232,236,240,0.10)", opacity: divider }}>
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${100 * fill}%`, borderRadius: 3, background: `linear-gradient(90deg, ${AMK.beamCore}, ${AMK.glassHighlight})`, boxShadow: `0 0 10px rgba(62,161,249,${0.7 * fill})` }} />
            </div>
          </GlassCard>
        </div>

        {/* satélite: esfera com estrela a rodar (entra por scale, deriva, desenhada por cima do card) */}
        <div style={{ position: "absolute", left: 1460 + groupX - 35 * sphereDrift, top: 262 + groupY + creep - 30 * sphereDrift, transform: `scale(${0.6 + 0.4 * sphereIn})`, opacity: sphereIn }}>
          <GlassSphere size={88} glow={30} tint={AMK.sphereTint} rim={AMK.sphereRim} gradient={AMK.sphereGradient}>
            <div style={{ transform: `rotate(${3.3 * Math.max(0, f - BAR)}deg)` }}><StarIcon size={44} fill={AMK.white} waist={0} /></div>
          </GlassSphere>
        </div>

        {/* compasso 4 — próximo: card seguinte a espreitar (periférico: 0,55, blur 2, rotateY −8°) */}
        {next === "card" ? (
          <div style={{ position: "absolute", left: NEXT_X, top: NEXT_TOP + 200 * (1 - nextRise), transform: `translate(-50%, 0) perspective(1200px) rotateY(-8deg) scale(${0.93 + 0.07 * nextRise})`, transformOrigin: "50% 0%", opacity: 0.55 * Math.min(1, 1.4 * nextRise), filter: "blur(2px)", willChange: "transform" }}>
            <GlassCard width={380} height={300} radius={26} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.5} style={{ position: "relative", background: `linear-gradient(160deg, ${AMK.glassTop} 0%, ${AMK.glassBottom} 100%)` }}>
              <div style={{ position: "absolute", left: 28, top: 28, width: 72, height: 72, borderRadius: "50%", background: AMK.medallionGradient, boxShadow: `0 0 22px ${AMK.sphereTint}80, inset 0 0 0 1.5px ${AMK.sphereRim}bb`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <NextIcon size={34} color={AMK.white} />
              </div>
              <span style={{ position: "absolute", right: 28, top: 30, fontFamily: INTER, fontWeight: 600, fontSize: 28, lineHeight: 1, color: AMK.text, opacity: 0.45 }}>{`0${n + 1}`}</span>
              <span style={{ position: "absolute", left: 28, top: 128, fontFamily: INTER, fontWeight: 600, fontSize: 26, lineHeight: 1.2, color: AMK.text, opacity: 0.8, width: 324 }}>{nextTitle}</span>
              {[[300, 8, 210], [240, 8, 234]].map(([w, h, y], j) => <div key={j} style={{ position: "absolute", left: 28, top: y, width: w, height: h, borderRadius: h / 2, background: "rgba(232,236,240,0.10)" }} />)}
            </GlassCard>
          </div>
        ) : null}

        {/* compasso 4 — próximo: pill «Publicar» (backOut 2,2 + flash) */}
        {next === "publish" ? (
          <div style={{ position: "absolute", left: 960, top: PILL_Y + groupY + 40 * (1 - pillIn), transform: "translate(-50%, -50%)", opacity: pillOp, willChange: "transform" }}>
            <div style={{ width: 300, height: 88, borderRadius: 44, background: AMK.pillLight, boxShadow: `0 0 ${30 + 60 * flash}px rgba(136,200,251,${0.45 + flash}), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(5,14,29,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
              <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 34, lineHeight: 1, color: AMK.pillLightText }}>{cta}</span>
              <IconArrowUpRight size={26} color={AMK.pillLightText} strokeWidth={2.4} />
            </div>
          </div>
        ) : null}
      </AbsoluteFill>

      <Vignette strength={0.6} />
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={cues(next)} duckFrom={99999} />
    </AbsoluteFill>
  );
};
