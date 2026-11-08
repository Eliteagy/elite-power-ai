/**
 * Tokens AMK do sub-estilo «Violet rápido» (variante do catálogo A; ver neutral-flow-variante-violet-rapida.md §4).
 * NÃO substitui theme-amk.ts (azul) — é um sub-estilo; nunca misturar os dois temas na mesma peça.
 * DECISÃO EM ABERTO (Ahlec): `emitterGlow` fica violeta (#8B3FFA, default) ou passa a #D132FB e conta como o magenta único da peça?
 */
export const AMK_VIOLET = {
  floorMid: "#030303", floorBottom: "#050E1D",
  beamCore: "#8B3FFA", beamHot: "#C9A6FF", beamEdge: "#050E1D",
  emitterGlow: "#8B3FFA", // ver decisão em aberto acima
  dashSidebar: "rgba(155,51,246,0.6)", dashGround: "#0A0A0F", dashEdge: "#C9A6FF",
  satellite: ["#9B33F6", "#C9A6FF"] as [string, string],
  answerCard: ["#9B33F6", "#050E1D"] as [string, string],
  horizonCrescent: "rgba(232,236,240,0.8)", horizonDisc: "#050E1D", // a referência usa creme #D7C68A — o AMK não tem amarelo
  outroWordmark: ["#C9A6FF", "#E8ECF0"] as [string, string],
  text: "#E8ECF0", rim: "#E8ECF0",
} as const;
