import React from "react";
import { Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";

/**
 * Sound design genérico do estilo Neutral Flow. Cada cue é `{ frame, file, gain }` (gain em dB sobre o nível já cozido no
 * ficheiro em public/<sfxDir>/). Modos: "original" (mix pronto), "recreated" (bed + cues), "sfx" (só cues — inserts sobre fala), "mute".
 * NEURAFLOW_CUES = exemplo medido (72 cues do vídeo de referência, grelha 118 BPM = 61,02 f).
 */
export type AudioMode = "original" | "recreated" | "sfx" | "mute";
export type Cue = { frame: number; file: string; gain?: number };
export const db = (x: number) => Math.pow(10, x / 20);

export const NEURAFLOW_CUES: Cue[] = [
  // scene 1 — logo
  { frame: 2, file: "impact_intro.wav", gain: 0 },
  { frame: 2, file: "shimmer_intro.wav", gain: 0 },
  // scene 2 — dashboard reveal
  { frame: 26, file: "whoosh_rise.wav", gain: 0 },
  { frame: 33, file: "sparkle_soft.wav" },
  { frame: 37, file: "pop_ui.wav" },
  { frame: 42, file: "blip_hi.wav" },
  { frame: 43, file: "pop_ui.wav", gain: -3 },
  { frame: 49, file: "pop_ui.wav", gain: -2 },
  { frame: 50, file: "sparkle_soft.wav" },
  { frame: 58, file: "pulse_soft.wav" },
  // scene 3/4 — push-back + floating dashboard
  { frame: 104, file: "whoosh_rise.wav", gain: -2 },
  { frame: 118, file: "sparkle.wav" },
  { frame: 126, file: "sparkle_soft.wav", gain: -3 },
  { frame: 152, file: "blip_hi.wav" },
  { frame: 163, file: "pop_ui.wav", gain: -4 },
  { frame: 172, file: "blip_hi.wav", gain: -6 },
  // scene 5 — New Updates
  { frame: 211, file: "hit_cut.wav" },
  { frame: 211, file: "whoosh_short.wav", gain: -2 },
  { frame: 213, file: "shimmer_intro.wav", gain: -4 },
  { frame: 216, file: "sparkle.wav", gain: -2 },
  { frame: 217, file: "blip_hi.wav", gain: -4 },
  { frame: 219, file: "blip_hi.wav", gain: -5 },
  { frame: 223, file: "blip_hi.wav", gain: -5 },
  { frame: 226, file: "blip_hi.wav", gain: -6 },
  { frame: 228, file: "blip_hi.wav", gain: -6 },
  { frame: 231, file: "blip_hi.wav", gain: -6 },
  { frame: 258, file: "sparkle_soft.wav", gain: -4 },
  { frame: 271, file: "whoosh_short.wav", gain: -4 },
  // scene 6/7 — chat
  { frame: 273, file: "hit_cut.wav", gain: -6 },
  ...Array.from({ length: 17 }, (_, i) => ({ frame: 274 + i, file: "click_type.wav", gain: -4 })),
  { frame: 296, file: "whoosh_short.wav", gain: -6 },
  { frame: 300, file: "sparkle_soft.wav", gain: -2 },
  { frame: 309, file: "pop_ui.wav", gain: -6 },
  { frame: 330, file: "whoosh_short.wav", gain: -8 },
  { frame: 332, file: "pop_ui.wav", gain: -4 },
  { frame: 337, file: "blip_hi.wav", gain: -8 },
  { frame: 347, file: "blip_hi.wav", gain: -9 },
  { frame: 355, file: "blip_hi.wav", gain: -9 },
  { frame: 357, file: "blip_hi.wav", gain: -10 },
  { frame: 363, file: "blip_hi.wav", gain: -10 },
  { frame: 371, file: "blip_hi.wav", gain: -11 },
  // scene 8/9 — cards, ring, star
  { frame: 394, file: "hit_cut.wav", gain: -4 },
  { frame: 395, file: "pop_ui.wav", gain: -2 },
  { frame: 397, file: "pop_ui.wav", gain: -4 },
  { frame: 398, file: "pop_ui.wav", gain: -5 },
  { frame: 404, file: "sparkle_soft.wav", gain: -3 },
  { frame: 427, file: "whoosh_rise.wav", gain: -4 },
  { frame: 455, file: "thump_low.wav" },
  { frame: 462, file: "thump_low.wav", gain: -4 },
  { frame: 466, file: "swell_pad.wav" },
  { frame: 484, file: "riser_star.wav" },
  { frame: 507, file: "hit_cut.wav", gain: -2 },
  { frame: 509, file: "sparkle.wav" },
  { frame: 523, file: "shimmer_intro.wav", gain: -3 },
  { frame: 532, file: "sparkle_soft.wav", gain: -3 },
  { frame: 556, file: "pulse_soft.wav", gain: -8 },
];
/** Compatibilidade com o projeto NeuraFlow. */
export const SFX_CUES = NEURAFLOW_CUES;

/** Fade-out medido do original: plateau até f535, depois gain_dB ≈ −0,011·(f−535)² (−1,1 dB @545 · −9,9 @565 · −27,5 @585 · −39,6 @595), silêncio em 600. */
export const musicVolume = (f: number): number => (f < 535 ? 1 : f >= 600 ? 0 : db(-0.011 * (f - 535) ** 2));
/** Envelope genérico com a mesma forma: plateau até `start`, quadrática em dB até `end`. */
export const fadeOutVolume = (start: number, end: number, k = -0.011) => (f: number): number => (f < start ? 1 : f >= end ? 0 : db(k * (f - start) ** 2));

export const SoundDesign: React.FC<{
  mode: AudioMode;
  cues?: Cue[];
  sfxDir?: string; // pasta em public/ com os wav
  bed?: string; // música em public/ (modo recreated)
  original?: string; // mix completo em public/ (modo original)
  bedGain?: number; // ganho linear do bed (0,9 no NeuraFlow)
  envelope?: (f: number) => number; // envelope do bed; default = fade medido do original
  duckFrom?: number; // a partir deste frame os cues seguem o envelope (NeuraFlow: 520 = 15 f antes do fade em 535)
}> = ({ mode, cues = NEURAFLOW_CUES, sfxDir = "sfx", bed = "audio/bed_stems.wav", original = "audio/original_mix.wav", bedGain = 0.9, envelope = musicVolume, duckFrom = 520 }) => {
  if (mode === "mute") return null;
  if (mode === "original") return <Audio src={staticFile(original)} volume={1} />;
  return (
    <>
      {mode === "recreated" ? <Audio src={staticFile(bed)} volume={(f) => bedGain * envelope(f)} /> : null}
      {cues.map((c, i) => (
        <Sequence key={i} from={c.frame} name={`sfx ${c.file} @${c.frame}`}>
          <Audio src={staticFile(`${sfxDir}/${c.file}`)} volume={db(c.gain ?? 0) * (c.frame > duckFrom ? envelope(c.frame) : 1)} />
        </Sequence>
      ))}
    </>
  );
};
