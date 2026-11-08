// Shadow Grid — fundo de marca, reproduzido em código a partir de
// "1 Shadow Grid / HD / Black / Black BG 1 (HD).mp4" (medido, não copiado do ficheiro).
//
// Medições-fonte (frame @3s, 1080x1920):
//   - malha de pontos: período ~17px horizontal x ~10px vertical, branco a ~3-5% opacidade
//   - 57 triângulos por frame, tamanho (sqrt-area) 1.7-28px, brilho 26-131/255
//   - vinheta radial pesada, mais escura nos cantos
//   - deriva lenta para cima, profundidade por tamanho (maior = mais próximo = mais rápido)
//
// Uso: <ShadowGridBackground /> como camada de fundo, absoluta, atrás de todo o resto.
// Contrato de movimento (ver SKILL.md): a deriva usa easing linear (é ambiente, não uma
// entrada) — só os elementos de primeiro plano (badges, cards, texto) usam a curva SaaS.

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export type Shard = {
  x: number; y: number; size: number; rot: number;
  op: number; depth: number; speed: number; ang: number;
};

export const SHADOW_GRID_SHARDS: Shard[] = [
  {x:703,y:139,size:11.6,rot:192.9,op:0.33,depth:0.46,speed:13.4,ang:264.6},
  {x:40,y:833,size:6.4,rot:25.1,op:0.32,depth:0.36,speed:11.8,ang:253.6},
  {x:134,y:429,size:14.6,rot:225.9,op:0.44,depth:0.51,speed:14.2,ang:287.9},
  {x:1054,y:89,size:20.1,rot:309,op:0.44,depth:0.62,speed:15.9,ang:261.6},
  {x:333,y:1567,size:7.5,rot:65.1,op:0.29,depth:0.38,speed:12.1,ang:273.3},
  {x:592,y:121,size:22.6,rot:21.5,op:0.46,depth:0.67,speed:16.7,ang:258.2},
  {x:339,y:1124,size:24.4,rot:163.1,op:0.49,depth:0.7,speed:17.2,ang:262},
  {x:264,y:1103,size:29.5,rot:189.1,op:0.6,depth:0.8,speed:18.8,ang:285},
  {x:1059,y:227,size:26.5,rot:150.5,op:0.48,depth:0.74,speed:17.8,ang:280.3},
  {x:42,y:1283,size:7.7,rot:275.2,op:0.33,depth:0.38,speed:12.1,ang:272.9},
  {x:751,y:1141,size:33.5,rot:208.8,op:0.55,depth:0.88,speed:20.1,ang:268.2},
  {x:512,y:1275,size:31.7,rot:21.8,op:0.68,depth:0.84,speed:19.4,ang:278.1},
  {x:888,y:546,size:22.9,rot:138.9,op:0.57,depth:0.67,speed:16.7,ang:276.7},
  {x:181,y:225,size:6.1,rot:21.2,op:0.31,depth:0.35,speed:11.6,ang:280.7},
  {x:422,y:1673,size:7.3,rot:29,op:0.3,depth:0.37,speed:11.9,ang:268},
  {x:885,y:1659,size:19,rot:100.2,op:0.51,depth:0.6,speed:15.6,ang:266.6},
  {x:1034,y:290,size:12.6,rot:63.4,op:0.43,depth:0.48,speed:13.7,ang:259.3},
  {x:636,y:504,size:9.3,rot:1.5,op:0.34,depth:0.41,speed:12.6,ang:266.8},
  {x:1029,y:1326,size:12.9,rot:185.6,op:0.39,depth:0.48,speed:13.7,ang:274.7},
  {x:971,y:1498,size:24.2,rot:314.8,op:0.42,depth:0.7,speed:17.2,ang:281.9},
  {x:112,y:1218,size:13.6,rot:22.4,op:0.38,depth:0.5,speed:14,ang:252.7},
  {x:367,y:101,size:8.8,rot:0.1,op:0.3,depth:0.4,speed:12.4,ang:256.1},
  {x:28,y:1679,size:6.9,rot:221.1,op:0.31,depth:0.37,speed:11.9,ang:255.9},
  {x:393,y:236,size:9.8,rot:305.6,op:0.33,depth:0.42,speed:12.7,ang:289.7},
  {x:93,y:196,size:16,rot:123.3,op:0.41,depth:0.54,speed:14.6,ang:260.6},
  {x:25,y:1826,size:31.2,rot:190.2,op:0.5,depth:0.83,speed:19.3,ang:255.9},
  {x:570,y:1879,size:18.8,rot:310.8,op:0.37,depth:0.59,speed:15.4,ang:277.8},
  {x:180,y:1482,size:10,rot:191.7,op:0.34,depth:0.43,speed:12.9,ang:281.2},
  {x:876,y:1891,size:11.8,rot:306.9,op:0.34,depth:0.46,speed:13.4,ang:282.2},
  {x:245,y:994,size:30.7,rot:128,op:0.62,depth:0.82,speed:19.1,ang:251.2},
  {x:280,y:1330,size:6.1,rot:344.3,op:0.29,depth:0.35,speed:11.6,ang:267.9},
  {x:1031,y:700,size:36.6,rot:79.4,op:0.75,depth:0.93,speed:20.9,ang:259.1},
  {x:674,y:1729,size:8.5,rot:302.6,op:0.31,depth:0.4,speed:12.4,ang:269.2},
  {x:92,y:1268,size:23.2,rot:327.5,op:0.55,depth:0.68,speed:16.9,ang:281.3},
  {x:193,y:1515,size:27.5,rot:119.7,op:0.53,depth:0.76,speed:18.2,ang:282},
  {x:433,y:1818,size:38.5,rot:260.9,op:0.62,depth:0.97,speed:21.5,ang:256.8},
  {x:977,y:1548,size:7.3,rot:52.6,op:0.29,depth:0.37,speed:11.9,ang:283.1},
  {x:378,y:1053,size:38.9,rot:47.2,op:0.7,depth:0.98,speed:21.7,ang:250.6},
  {x:569,y:1793,size:38.4,rot:156.2,op:0.69,depth:0.97,speed:21.5,ang:284.9},
  {x:272,y:562,size:31,rot:86.6,op:0.51,depth:0.83,speed:19.3,ang:273.5},
  {x:142,y:1747,size:9.9,rot:127.4,op:0.34,depth:0.42,speed:12.7,ang:268.3},
  {x:454,y:1762,size:20.4,rot:180.6,op:0.53,depth:0.63,speed:16.1,ang:271.3},
  {x:475,y:352,size:18.1,rot:1.4,op:0.36,depth:0.58,speed:15.3,ang:282},
  {x:783,y:1068,size:8,rot:117.4,op:0.33,depth:0.39,speed:12.2,ang:270.7},
  {x:115,y:1076,size:19.3,rot:89.5,op:0.49,depth:0.6,speed:15.6,ang:261.1},
  {x:607,y:1459,size:28.5,rot:328.5,op:0.55,depth:0.78,speed:18.5,ang:267.7},
  {x:553,y:1330,size:21.5,rot:162.8,op:0.47,depth:0.65,speed:16.4,ang:271.3},
  {x:755,y:1683,size:16.4,rot:339.2,op:0.49,depth:0.55,speed:14.8,ang:260.4},
  {x:907,y:263,size:19.4,rot:43.8,op:0.53,depth:0.61,speed:15.8,ang:267.7},
  {x:79,y:1285,size:6.5,rot:282.2,op:0.29,depth:0.36,speed:11.8,ang:285.9},
  {x:713,y:275,size:7.7,rot:317.8,op:0.35,depth:0.38,speed:12.1,ang:288.7},
  {x:430,y:936,size:9,rot:356.4,op:0.39,depth:0.41,speed:12.6,ang:283.3},
  {x:557,y:651,size:7.8,rot:70.5,op:0.32,depth:0.38,speed:12.1,ang:262.7},
  {x:598,y:846,size:26.2,rot:6.5,op:0.43,depth:0.74,speed:17.8,ang:263.3},
  {x:69,y:1891,size:22,rot:283.8,op:0.48,depth:0.66,speed:16.6,ang:288.9},
  {x:43,y:1496,size:6.9,rot:97.4,op:0.3,depth:0.37,speed:11.9,ang:255.2},
  {x:884,y:497,size:14.6,rot:53.8,op:0.45,depth:0.51,speed:14.2,ang:286.8},
];

const wrap = (v: number, max: number) => ((v % max) + max) % max;

/**
 * Camada de fundo animada. Auto-contida (§8 do design system: sem estado partilhado
 * com o resto da composição). O canvasWidth/Height por defeito são 1080x1920 —
 * passa 1920x1080 para a variante horizontal (a malha e os shards reescalam por %).
 */
export const ShadowGridBackground: React.FC<{
  canvasWidth?: number;
  canvasHeight?: number;
  vignette?: boolean; // false quando a pilha de luz do Neutral Flow leva a sua própria <Vignette> (senão fica vinheta dupla)
  shardGlow?: boolean; // drop-shadow por estilhaço (57 filtros/frame); desligar se um render longo abrandar ou piscar
}> = ({ canvasWidth = 1080, canvasHeight = 1920, vignette = true, shardGlow = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps; // segundos

  return (
    <AbsoluteFill style={{ background: "#030303", overflow: "hidden" }}>
      {/* malha de pontos — período medido 17x10px, fixo em px */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.05) 0.6px, transparent 0.6px)",
          backgroundSize: "17px 10px", // período absoluto medido — igual em qualquer canvas (como no template HTML 16:9)
        }}
      />

      {/* shards à deriva — velocidade linear (é ambiente, não uma entrada com curva SaaS).
          Posições base amostradas a 1080x1920 — escalar proporcionalmente ao canvas atual
          antes de aplicar a deriva, para cobrir bem qualquer formato (ex: 1920x1080). */}
      {SHADOW_GRID_SHARDS.map((s, i) => {
        const baseX = (s.x / 1080) * canvasWidth;
        const baseY = (s.y / 1920) * canvasHeight;
        const rad = (s.ang * Math.PI) / 180;
        const dx = Math.cos(rad) * s.speed * t;
        const dy = Math.sin(rad) * s.speed * t;
        const x = wrap(baseX + dx, canvasWidth);
        const y = wrap(baseY + dy, canvasHeight);
        const size = s.size;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 0,
              height: 0,
              borderLeft: `${size * 0.58}px solid transparent`,
              borderRight: `${size * 0.58}px solid transparent`,
              borderBottom: `${size}px solid rgba(232,236,240,${s.op})`,
              transform: `translate(-50%,-50%) rotate(${s.rot}deg)`,
              filter: shardGlow ? `drop-shadow(0 0 ${size * 0.15}px rgba(255,255,255,${s.op * 0.4}))` : undefined,
            }}
          />
        );
      })}

      {/* vinheta — radial, mais escura nos cantos (opcional) */}
      {vignette ? <AbsoluteFill
        style={{
          background:
            "radial-gradient(120% 85% at 50% 45%, transparent 40%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
        }}
      /> : null}
    </AbsoluteFill>
  );
};
