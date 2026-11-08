import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Inter 4.1 (static weights) — local files in public/fonts, so rendering never depends on the network.
const weights: Array<[string, string]> = [
  ["400", "Inter-Regular.woff2"],
  ["500", "Inter-Medium.woff2"],
  ["600", "Inter-SemiBold.woff2"],
  ["700", "Inter-Bold.woff2"],
];

export const INTER = "Inter";
/** Serif itálica de acento (catálogo B / Lovio): Instrument Serif (SIL OFL), public/fonts/InstrumentSerif-Italic.ttf. */
export const SERIF = "Instrument Serif";

export const interLoaded: Promise<void[]> = Promise.all([
  ...weights.map(([weight, file]) =>
    loadFont({
      family: INTER,
      url: staticFile(`fonts/${file}`),
      weight,
      format: "woff2",
    }),
  ),
  loadFont({ family: SERIF, url: staticFile("fonts/InstrumentSerif-Italic.ttf"), weight: "400", style: "italic", format: "truetype" }),
  loadFont({ family: SERIF, url: staticFile("fonts/InstrumentSerif-Regular.ttf"), weight: "400", style: "normal", format: "truetype" }),
]);
