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
import { IconEdit, IconUser, IconCalendar, IconCheck, IconArrowUpRight, IconPlay, IconChat, IconBell } from "../components/Icons";
import { SoundDesign, AudioMode, Cue } from "../audio/SoundDesign";
import { softExpOut, saasOut, smooth, sineOut, backOut, bezier, moveInOut, spline, progress, Curve } from "../lib/motion";
import { RING_R } from "../lib/measured";
import { AMK } from "../lib/theme-amk";
import { INTER } from "../lib/fonts";

/**
 * «3 coisas que precisas fazer antes de começar a publicar nas redes sociais»
 * Insert de 4 compassos a 120 BPM (BAR 60 f, 240 f = 8 s), câmara contínua, sem cortes (o NLE corta em f0 e f239).
 *   compasso 1 (f0)    orbital / palavra-herói: anel fecha k≈4, "3" acende k 2,5, "coisas" k 3, 3 arcos, 3 esferas em órbita
 *   compasso 2 (f60)   push-back do anel (in-out assimétrico, DoF) + trio de cards sobe k 8 (0/2/3 f), medalhões, linhas em wipe
 *   compasso 3 (f120)  mudança de estado: check em cada card (stagger 5 f), linha de luz cresce do centro
 *   compasso 4 (f180)  grupo sobe (in-out) + pill "Publicar" (backOut 2,2 + flash, a única exceção ao "sem bounce") + 3 satélites sociais
 * Pilha de luz AMK: Shadow Grid → Beam → névoa → tinta → Rays → glows de emissor → conteúdo → Vignette → Grain 0,03. Sem horizonte (insert).
 */
export type TresCoisasProps = { audio: AudioMode; number: string; word: string; cta: string };

const BAR = 60;
const RING_Y = 500;
const CAM_ORIGIN_Y = 600;
const CARD_W = 380, CARD_H = 300, CARD_TOP = 430;
const CARD_X = [530, 960, 1390]; // centros
const CARD_DELAY = [2, 0, 3]; // esq / centro / dir (o centro sobe primeiro, como no trio medido)
const PILL_Y = 850;

// raio do anel: tabela medida (fecho k≈4) até f43, depois creep −0,5 px/f até o push-back tomar conta
const RING_TABLE: Array<[number, number]> = [...RING_R.filter((k) => k[0] <= 43), [57, 263], [80, 253], [120, 240]];
// câmara: parada durante o anel; dolly-out em creep a partir do settle do trio, a acelerar para o corte final (NLE)
const CAM: Array<[number, number]> = [[0, 1], [88, 1], [120, 0.988], [150, 0.978], [180, 0.968], [205, 0.958], [225, 0.948], [239, 0.935]];
const PUSH: Curve = bezier(0.7, 0, 0.2, 1); // push-back: in-out assimétrico (57 % do percurso em ~6 f)

const CUES: Cue[] = [
  { frame: 0, file: "hit_cut.wav", gain: -4 }, // corte de entrada (feito no NLE)
  { frame: 0, file: "thump_low.wav", gain: -6 }, // batida do anel no downbeat
  { frame: 1, file: "whoosh_rise.wav", gain: -5 }, // anel a fechar
  { frame: 4, file: "sparkle_soft.wav", gain: -7 }, // arcos
  { frame: 5, file: "pop_ui.wav", gain: -8 }, // esferas em órbita
  { frame: 7, file: "thump_low.wav", gain: -10 }, // eco
  { frame: 7, file: "pop_ui.wav", gain: -9 },
  { frame: 9, file: "shimmer_intro.wav", gain: -8 }, // "3" a acender
  { frame: 14, file: "pop_ui.wav", gain: -10 },
  { frame: BAR - 3, file: "whoosh_rise.wav", gain: -5 }, // push-back (3 f antes do downbeat)
  { frame: BAR, file: "pop_ui.wav", gain: -5 }, // cards
  { frame: BAR + 2, file: "pop_ui.wav", gain: -6 },
  { frame: BAR + 3, file: "pop_ui.wav", gain: -7 },
  { frame: BAR + 4, file: "sparkle_soft.wav", gain: -7 }, // medalhões
  { frame: BAR + 24, file: "blip_hi.wav", gain: -8 }, // linhas em wipe
  { frame: BAR + 33, file: "blip_hi.wav", gain: -9 },
  { frame: BAR + 42, file: "blip_hi.wav", gain: -10 },
  { frame: 2 * BAR, file: "pop_ui.wav", gain: -4 }, // checks
  { frame: 2 * BAR, file: "blip_hi.wav", gain: -8 }, // linha de luz
  { frame: 2 * BAR + 5, file: "pop_ui.wav", gain: -5 },
  { frame: 2 * BAR + 10, file: "pop_ui.wav", gain: -6 },
  { frame: 2 * BAR + 30, file: "pulse_soft.wav", gain: -8 }, // fim do build
  { frame: 3 * BAR - 3, file: "whoosh_short.wav", gain: -6 }, // grupo sobe
  { frame: 3 * BAR, file: "pop_ui.wav", gain: -3 }, // pill
  { frame: 3 * BAR + 6, file: "sparkle.wav", gain: -5 }, // flash da pill
  { frame: 3 * BAR + 6, file: "pop_ui.wav", gain: -7 }, // satélites
  { frame: 3 * BAR + 11, file: "pop_ui.wav", gain: -8 },
  { frame: 3 * BAR + 18, file: "pop_ui.wav", gain: -9 },
];

const gradText = (from: string, to: string): React.CSSProperties => ({
  backgroundImage: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
});

const ORBIT = [
  { a0: 200, Icon: IconEdit, at: 5 },
  { a0: 330, Icon: IconCalendar, at: 7 },
  { a0: 80, Icon: IconUser, at: 14 },
];
const ARCS = [
  { r: 1.5, len: 140, rot: (t: number) => 60 - t * 3 * Math.exp(-t / 30) }, // interior anti-horário a desacelerar
  { r: 2.0, len: 170, rot: (t: number) => -130 + 1.05 * t }, // exteriores horários
  { r: 2.7, len: 100, rot: (t: number) => -95 + 0.8 * t },
];
const SOCIAL = [
  { x: 610, y: 850, size: 96, Icon: IconPlay, at: 3 * BAR + 6, op: 0.7, blur: 0 },
  { x: 1310, y: 850, size: 96, Icon: IconChat, at: 3 * BAR + 11, op: 0.7, blur: 0 },
  { x: 1540, y: 775, size: 72, Icon: IconBell, at: 3 * BAR + 18, op: 0.5, blur: 2 },
];

export const TresCoisas: React.FC<TresCoisasProps> = ({ audio, number, word, cta }) => {
  const f = useCurrentFrame();

  // ---------- luz (envelopes por cena)
  const lightIn = progress(f, 0, 10, sineOut); // fundo acende
  const pb = progress(f, BAR - 3, BAR + 27, PUSH); // push-back do anel (0,5 compasso)
  const heroSettled = progress(f, 36, 50, smooth); // o herói pousou → beam baixa
  const checks = progress(f, 2 * BAR, 2 * BAR + 30, saasOut);
  const bright = progress(f, 3 * BAR, 3 * BAR + 40, saasOut);
  const beamI = lightIn * (1.05 - 0.25 * heroSettled + 0.3 * Math.sin(Math.PI * pb) + 0.12 * checks + 0.15 * bright); // V2: +0,15 base (orbital 38→≈43 lum)
  const vignette = 0.6 + 0.25 * Math.sin(Math.PI * pb);

  // ---------- câmara
  const cam = spline(f, CAM);

  // ---------- compasso 1: anel + "3"
  const ringS = spline(f, RING_TABLE) / 296;
  const ringIn = progress(f, 0, 4, smooth);
  const groupS = ringS * (1 - 0.55 * pb) * (1 - 0.0005 * Math.max(0, f - (BAR + 27)));
  const groupY = RING_Y - 265 * pb - 0.3 * Math.max(0, f - (BAR + 27));
  const groupOp = ringIn * (1 - 0.4 * pb);
  const groupBlur = 2.5 * pb;
  const floatX = 6 * Math.sin(f / 9), floatY = 4 * Math.sin(f / 7 + 1);
  const disc = progress(f, 0, 52, softExpOut(3, 0.06));
  const heroOp = progress(f, 1, 36, softExpOut(2.5, 0.06));
  const wordP = progress(f, 8, 30, softExpOut(3, 0.08));
  const arcsP = progress(f, 4, 16, softExpOut(4, 0.1));

  // ---------- compasso 2: trio
  const rise = CARD_DELAY.map((d) => progress(f, BAR + d, BAR + 28 + d, softExpOut(8, 0.06)));
  const riseC = rise[1];
  const move = progress(f, 3 * BAR - 3, 3 * BAR + 11, moveInOut(0.25)); // grupo já visível sobe (in-out, pico ao 4.º f)
  const trioY = -40 * move - 0.25 * Math.max(0, f - (3 * BAR + 11));

  // ---------- compasso 3: linha de luz
  const lineP = progress(f, 2 * BAR, 2 * BAR + 33, softExpOut(3, 0.08));
  const lineOp = progress(f, 2 * BAR, 2 * BAR + 5, smooth);

  // ---------- compasso 4: pill
  const pillIn = progress(f, 3 * BAR, 3 * BAR + 25, backOut(2.2));
  const pillOp = progress(f, 3 * BAR, 3 * BAR + 7, smooth);
  const flash = 0.35 * Math.exp(-(((f - (3 * BAR + 7)) / 4) ** 2));

  return (
    <AbsoluteFill style={{ backgroundColor: AMK.floorMid, overflow: "hidden" }}>
      {/* 01–02 chão + textura (vinheta própria desligada: a pilha leva <Vignette>) */}
      <ShadowGridBackground canvasWidth={1920} canvasHeight={1080} vignette={false} />
      {/* 03 beam · 04 névoa · 05 tinta · 06 rays */}
      <Beam x={960} topWidth={340} bottomWidth={1350} intensity={beamI} core={AMK.beamCore} hot={AMK.beamHot} edge={AMK.beamEdge} blur={60} bottomFade={0.72} />
      <Glow x={975} y={120} rx={900} ry={620} color={AMK.haze} opacity={0.55 * lightIn} blur={0} />
      <AbsoluteFill style={{ background: AMK.ambient, opacity: 0.8 * lightIn }} />
      <Rays x={960} frame={f} intensity={0.42 * lightIn} color={AMK.rays} seed={3} />

      {/* câmara: tudo o que é conteúdo (e os glows de emissor, que seguem os heróis) */}
      <AbsoluteFill style={{ transform: `translate(960px, ${CAM_ORIGIN_Y}px) scale(${cam}) translate(-960px, -${CAM_ORIGIN_Y}px)`, willChange: "transform" }}>
        {/* 09 glows de emissor */}
        <Glow x={960} y={groupY} rx={720 - 340 * pb} ry={520 - 250 * pb} color={AMK.emitterGlow} opacity={1.0 * lightIn * (1 - 0.5 * pb)} blur={16} />
        <Glow x={960} y={CARD_TOP + CARD_H / 2 + trioY} rx={820} ry={360} color={AMK.emitterGlowDeep} opacity={0.95 * riseC * (1 + 0.2 * checks)} blur={16} />
        <Glow x={960} y={PILL_Y + trioY} rx={420} ry={200} color="rgba(136,200,251,0.6)" opacity={0.7 * pillOp} blur={14} />

        {/* 10 conteúdo — herói 1: anel + "3" (grupo escalado pelo raio medido; push-back por bezier assimétrico + DoF) */}
        <div style={{ position: "absolute", left: 960, top: groupY, width: 0, height: 0, transform: `scale(${groupS})`, opacity: groupOp, filter: groupBlur > 0.05 ? `blur(${groupBlur}px)` : undefined, willChange: "transform" }}>
          <div style={{ position: "absolute", left: floatX, top: floatY, width: 0, height: 0 }}>
            {/* arcos orbitais (SVG sem filtros) */}
            <svg width={1800} height={1800} viewBox="-900 -900 1800 1800" style={{ position: "absolute", left: -900, top: -900, overflow: "visible" }}>
              {ARCS.map((a, i) => (
                <g key={i} transform={`rotate(${a.rot(f)})`}>
                  <circle r={a.r * 296} fill="none" stroke="rgba(62,161,249,0.35)" strokeWidth={11} pathLength={360} strokeDasharray={`${a.len * arcsP} 360`} strokeLinecap="round" />
                  <circle r={a.r * 296} fill="none" stroke={AMK.glassHighlight} strokeWidth={3} pathLength={360} strokeDasharray={`${a.len * arcsP} 360`} strokeLinecap="round" />
                </g>
              ))}
            </svg>
            {/* disco + banda de rim desfocada + rim fino */}
            <div style={{ position: "absolute", left: -296, top: -296, width: 592, height: 592, borderRadius: "50%", background: `radial-gradient(circle at 50% 42%, rgba(67,105,248,0.42) 0%, ${AMK.horizonDiscMid} 55%, rgba(5,14,29,0.9) 100%)`, opacity: disc }} />
            <div style={{ position: "absolute", left: -296, top: -296, width: 592, height: 592, borderRadius: "50%", border: "22px solid rgba(62,161,249,0.38)", boxSizing: "border-box", filter: "blur(9px)" }} />
            <div style={{ position: "absolute", left: -296, top: -296, width: 592, height: 592, borderRadius: "50%", border: "5px solid rgba(136,200,251,0.95)", boxSizing: "border-box", boxShadow: "0 0 30px 10px rgba(62,161,249,0.7), 0 0 90px 30px rgba(67,105,248,0.45), inset 0 0 40px 10px rgba(136,200,251,0.45)" }} />
            {/* palavra-herói "3" (fade lento k 2,5) + "coisas" (k 3, slide-up 18 px) */}
            <div style={{ position: "absolute", left: -400, top: -100 - 100, width: 800, textAlign: "center", fontFamily: INTER, fontWeight: 700, fontSize: 200, lineHeight: 1, letterSpacing: "-0.01em", opacity: heroOp, willChange: "transform", ...gradText(AMK.wordmarkGradient[0], AMK.titleBlue) }}>{number}</div>
            <div style={{ position: "absolute", left: -400, top: 95 - 43 + 18 * (1 - wordP), width: 800, textAlign: "center", fontFamily: INTER, fontWeight: 600, fontSize: 86, lineHeight: 1, opacity: wordP, willChange: "transform", ...gradText(AMK.wordmarkGradient[0], AMK.wordmarkGradient[1]) }}>{word}</div>
            {/* 3 esferas em órbita (satélites): entram por scale, órbita exterior horária a encolher (espiral) */}
            {ORBIT.map((o, i) => {
              const inP = progress(f, o.at, o.at + 10, softExpOut(4, 0.12));
              const op = progress(f, o.at, o.at + 6, smooth);
              const t = Math.max(0, f - o.at);
              const a = ((o.a0 - 1.1 * t) * Math.PI) / 180;
              const r = 444 - 0.5 * t;
              return (
                <div key={i} style={{ position: "absolute", left: r * Math.cos(a) - 55, top: r * Math.sin(a) - 55, transform: `scale(${0.85 + 0.15 * inP})`, opacity: op }}>
                  <GlassSphere size={110} glow={34} tint={AMK.sphereTint} rim={AMK.sphereRim} gradient={AMK.sphereGradient}>
                    <o.Icon size={44} color={AMK.white} />
                  </GlassSphere>
                </div>
              );
            })}
          </div>
        </div>

        {/* herói 2: trio de cards (sobem k 8 com 0/2/3 f; medalhão por scale; linhas em wipe; check no compasso 3) */}
        {CARD_X.map((cx, i) => {
          const p = rise[i];
          const d = CARD_DELAY[i];
          const local = f - BAR - d;
          const medal = progress(local, 2, 16, softExpOut(5, 0.1));
          const textOp = 0.55 * progress(local, 20, 36, (x) => x);
          const checkAt = 2 * BAR + 5 * i;
          const check = progress(f, checkAt, checkAt + 14, softExpOut(5, 0.1));
          const lit = progress(f, checkAt, checkAt + 10, softExpOut(4, 0.1));
          const Icon = [IconEdit, IconCalendar, IconUser][i];
          return (
            <div key={i} style={{ position: "absolute", left: cx, top: CARD_TOP + 260 * (1 - p) + trioY, transform: `translate(-50%, 0) scale(${0.93 + 0.07 * p})`, transformOrigin: "50% 0%", opacity: Math.min(1, 1.4 * p), willChange: "transform" }}>
              <GlassCard width={CARD_W} height={CARD_H} radius={26} top={AMK.glassTop} bottom={AMK.glassBottom} edge={AMK.glassHighlight} edgeOpacity={0.5} style={{ position: "relative", background: `linear-gradient(160deg, ${AMK.glassTop} 0%, ${AMK.glassBottom} 100%)` }}>
                <div style={{ position: "absolute", left: 28, top: 28, width: 72, height: 72, borderRadius: "50%", background: AMK.medallionGradient, boxShadow: `0 0 22px ${AMK.sphereTint}80, inset 0 0 0 1.5px ${AMK.sphereRim}bb`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.6 + 0.4 * medal})`, opacity: medal }}>
                  <Icon size={34} color={AMK.white} />
                </div>
                <span style={{ position: "absolute", right: 28, top: 30, fontFamily: INTER, fontWeight: 600, fontSize: 28, lineHeight: 1, color: AMK.text, opacity: textOp / 0.55 * 0.45 }}>{`0${i + 1}`}</span>
                {/* linhas-esqueleto (o conteúdo chega depois de o card pousar) */}
                {[[220, 14, 128], [300, 8, 166], [240, 8, 190]].map(([w, h, y], j) => {
                  const wp = progress(local, 24 + 9 * j, 36 + 9 * j, smooth);
                  return (
                    <div key={j} style={{ position: "absolute", left: 28, top: y, width: w, height: h, borderRadius: h / 2, background: "rgba(232,236,240,0.10)", clipPath: `inset(0 ${(1 - wp) * 100}% 0 0)` }}>
                      {j === 0 ? <div style={{ position: "absolute", inset: 0, borderRadius: h / 2, background: `linear-gradient(90deg, ${AMK.glassHighlight}, ${AMK.beamCore})`, opacity: 0.55 * lit }} /> : null}
                    </div>
                  );
                })}
                {/* check (mudança de estado): pop scale 0,85→1 + fade, glow da cor do elemento */}
                <div style={{ position: "absolute", right: 28, bottom: 26, width: 44, height: 44, borderRadius: "50%", background: AMK.pillLight, boxShadow: `0 0 ${18 + 10 * lit}px rgba(62,161,249,${0.55 + 0.3 * lit})`, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.85 + 0.15 * check})`, opacity: check }}>
                  <IconCheck size={24} color={AMK.pillLightText} strokeWidth={2.4} />
                </div>
              </GlassCard>
            </div>
          );
        })}

        {/* linha de luz: cresce do centro para fora (k 3, 33 f) */}
        {[-1, 1].map((s) => (
          <div key={s} style={{ position: "absolute", top: 770 + trioY, left: s < 0 ? 960 - 340 * lineP : 960, width: 340 * lineP, height: 2, opacity: lineOp, background: s < 0 ? `linear-gradient(90deg, transparent, rgba(136,200,251,0.75) 40%, ${AMK.white})` : `linear-gradient(270deg, transparent, rgba(136,200,251,0.75) 40%, ${AMK.white})`, boxShadow: "0 0 10px rgba(62,161,249,0.9)" }} />
        ))}

        {/* herói 3: pill de ação clara "Publicar" (translate 40→0 backOut 2,2 + flash) */}
        <div style={{ position: "absolute", left: 960, top: PILL_Y + trioY + 40 * (1 - pillIn), transform: "translate(-50%, -50%)", opacity: pillOp, willChange: "transform" }}>
          <div style={{ width: 300, height: 88, borderRadius: 44, background: AMK.pillLight, boxShadow: `0 0 ${30 + 60 * flash}px rgba(136,200,251,${0.45 + flash}), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(5,14,29,0.25)`, display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 34, lineHeight: 1, color: AMK.pillLightText }}>{cta}</span>
            <IconArrowUpRight size={26} color={AMK.pillLightText} strokeWidth={2.4} />
          </div>
        </div>

        {/* satélites sociais (≤3, 0,5–0,7 de opacidade, o mais distante desfocado 2 px): entram por scale, flutuam e afastam-se devagar */}
        {SOCIAL.map((s, i) => {
          const inP = progress(f, s.at, s.at + 8, softExpOut(4, 0.12));
          const t = Math.max(0, f - s.at);
          const dx = (s.x - 960) / Math.abs(s.x - 960) * 0.25 * t + 6 * Math.sin(f / 9 + i);
          const dy = 4 * Math.sin(f / 7 + i) + trioY;
          return (
            <div key={i} style={{ position: "absolute", left: s.x - s.size / 2 + dx, top: s.y - s.size / 2 + dy, transform: `scale(${0.6 + 0.4 * inP})`, opacity: s.op * inP, filter: s.blur ? `blur(${s.blur}px)` : undefined }}>
              <GlassSphere size={s.size} glow={30} tint={AMK.sphereTint} rim={AMK.sphereRim} gradient={AMK.sphereGradient}>
                <s.Icon size={Math.round(s.size * 0.42)} color={AMK.white} />
              </GlassSphere>
            </div>
          );
        })}
      </AbsoluteFill>

      {/* 11–12 vinheta + grão */}
      <Vignette strength={vignette} />
      <Grain frame={f} opacity={0.03} />
      <SoundDesign mode={audio} cues={CUES} duckFrom={99999} />
    </AbsoluteFill>
  );
};
