import React from "react";
import { Composition } from "remotion";
import { AmkStage, AmkStageProps } from "./AmkStage";

/** 240 frames = 8 s a 30 fps = 4 compassos a 120 BPM (BAR = 60 f). Mudar fps/duração conforme o vídeo alvo. */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AmkStage" component={AmkStage} durationInFrames={240} fps={30} width={1920} height={1080} defaultProps={{ audio: "sfx", title: "Organiza os teus ficheiros", subtitle: "automaticamente, em tempo real" } satisfies AmkStageProps} />
  </>
);
