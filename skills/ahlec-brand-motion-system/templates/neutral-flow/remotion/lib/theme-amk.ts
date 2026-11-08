/**
 * Tokens AMK SaaS para a pilha de luz e os materiais do Neutral Flow (SKILL.md §1 «papéis de luz e material → tokens AMK»).
 * Escritos para o humor Dark Neon; #050E1D / #0A0A0F são chão partilhado. Cinematic Tech: beamCore → #4369F8, acento #98CEFC≈#88C8FB.
 * Dark Dashboard: luz ≤0,6 de intensidade, sem Aurora.
 */
export const AMK = {
  floorTop: "#0A0A0F", floorMid: "#030303", floorBottom: "#050E1D",
  beamCore: "#3EA1F9", beamHot: "#88C8FB", beamEdge: "#050E1D",
  rays: "#3EA1F9",
  haze: "rgba(62,161,249,0.5)", ambient: "rgba(67,105,248,0.12)",
  horizonRim: "#C9A6FF", horizonRimNoAurora: "#88C8FB", horizonGlow: "#3E7BFA", horizonViolet: "#8B3FFA",
  horizonDisc: "#1e3275", horizonDiscMid: "#14234f", horizonDiscDeep: "#0a1633", horizonDiscEdge: "#050E1D", // #050E1D levantado com #4369F8 a 40 %
  particle: "#88C8FB",
  emitterGlow: "rgba(62,161,249,0.7)", emitterGlowDeep: "rgba(67,105,248,0.6)",
  glassTop: "rgba(67,105,248,0.5)", glassBottom: "rgba(5,14,29,0.9)", glassHighlight: "#88C8FB", glassStroke: "rgba(232,236,240,0.14)",
  glassGradient: "linear-gradient(180deg, rgba(67,105,248,0.5) 0%, rgba(5,14,29,0.9) 100%)",
  sphereTint: "#2F9FFC", sphereRim: "#88C8FB",
  sphereGradient: "radial-gradient(circle at 38% 30%, rgba(255,255,255,0.75) 0%, rgba(136,200,251,0.6) 16%, rgba(47,159,252,0.55) 45%, rgba(67,105,248,0.6) 78%, rgba(5,14,29,0.85) 100%)",
  medallionGradient: "radial-gradient(circle at 42% 32%, rgba(136,200,251,0.9), rgba(47,159,252,0.85) 55%, rgba(67,105,248,0.85) 100%)",
  pillGradient: "linear-gradient(90deg, #050E1D 0%, rgba(232,236,240,0.35) 30%, #3EA1F9 54%, #4369F8 70%, #050E1D 100%)",
  pillLight: "#88C8FB", pillLightText: "#050E1D",
  text: "#E8ECF0", textMuted: "rgba(232,236,240,0.6)", textDim: "rgba(232,236,240,0.45)",
  wordmarkGradient: ["#E8ECF0", "#88C8FB"] as [string, string], titleBlue: "#3EA1F9",
  backdropWordmark: "linear-gradient(90deg, #4369F8 0%, #3EA1F9 50%, #4369F8 100%)",
  accentEdge: "#9B33F6", accent: "#D132FB", accentLight: "#E389FB", accentLavender: "#C9A6FF", accentPeak: "#FF3EA6", // 1 elemento magenta por peça
  white: "#E8ECF0",
  auroraPink: "#FF3EA6", auroraViolet: "#8B3FFA", auroraBlue: "#3E7BFA", auroraCoral: "#FF7A5C", auroraLavender: "#C9A6FF",
} as const;
