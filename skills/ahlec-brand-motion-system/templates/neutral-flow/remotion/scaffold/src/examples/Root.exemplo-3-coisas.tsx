// Exemplo de registo (teste «3 coisas antes de publicar», 2026-09-14). Para usar: copiar para src/Root.tsx e trocar os imports para "./examples/TresCoisas" e "./examples/Coisa"
// (ou mover os dois componentes para src/). Textos = placeholders — trocar nas props.
import React from "react";
import { Composition } from "remotion";
import { TresCoisas, TresCoisasProps } from "./TresCoisas";
import { Coisa, CoisaProps } from "./Coisa";

/** 240 frames = 8 s a 30 fps = 4 compassos a 120 BPM (BAR = 60 f). Inserts 16:9 opacos; cortes de entrada/saída no NLE.
 *  Textos das 3 coisas = placeholders — trocar aqui (title / subtitle / bullets / nextTitle). */
const base = { audio: "sfx" as const, badgeNumber: "3", badgeWord: "coisas", cta: "Publicar" };
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="TresCoisas" component={TresCoisas} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{ audio: "sfx", number: "3", word: "coisas", cta: "Publicar" } satisfies TresCoisasProps} />
    <Composition id="Coisa01" component={Coisa} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{ ...base, n: 1, title: "Otimiza o teu perfil", subtitle: "Foto, bio e link claros em 3 segundos", bullets: ["Foto de perfil nítida", "Bio: o que fazes e para quem", "Um link só, o que importa"], next: "card", nextTitle: "Planeia o conteúdo" } satisfies CoisaProps} />
    <Composition id="Coisa02" component={Coisa} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{ ...base, n: 2, title: "Planeia o conteúdo", subtitle: "Ideias prontas antes de precisares delas", bullets: ["Lista de 10 ideias", "Um formato por ideia", "Calendário da semana"], next: "card", nextTitle: "Define o teu público" } satisfies CoisaProps} />
    <Composition id="Coisa03" component={Coisa} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{ ...base, n: 3, title: "Define o teu público", subtitle: "Para quem estás a falar, em concreto", bullets: ["Quem é", "O que quer resolver", "Onde te encontra"], next: "publish", nextTitle: "" } satisfies CoisaProps} />
  </>
);
