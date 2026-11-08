import React from "react";
import { riseDrift } from "../lib/motionC";

/**
 * Sequência de chat (catálogo C, M33): placeholder gradiente pop (1 f, já ao tamanho) → sobe `rise` px em 24 f (expOut τ≈5 f) →
 * vira bolha escura com contorno (3 f) e a pergunta escreve-se POR PALAVRAS (1 palavra/1,5 f) → bolha de resposta com «…» a pulsar 18 f →
 * resposta expande em altura, 1 linha/4 f. Glow da cor do placeholder atrás (regra AMK).
 */
export const ChatSequence: React.FC<{
  frame: number; start: number; x: number; y: number; w?: number;
  question: string; answer: string[]; fontFamily?: string; fontSize?: number;
  gradient?: [string, string]; dark?: string; outline?: string; text?: string; avatarUser?: string; avatarAi?: string;
  rise?: number; riseTau?: number; wordEvery?: number; dotsFrames?: number; lineEvery?: number;
}> = ({ frame, start, x, y, w = 900, question, answer, fontFamily = "Inter", fontSize = 26, gradient = ["#3EA1F9", "#88C8FB"], dark = "#050E1D", outline = "#88C8FB", text = "#E8ECF0", avatarUser = "#88C8FB", avatarAi = "#3EA1F9", rise = 275, riseTau = 5, wordEvery = 1.5, dotsFrames = 18, lineEvery = 4 }) => {
  const f = frame;
  if (f < start) return null;
  const h0 = 110;
  const yy = riseDrift(f, start, y + rise, y, riseTau, 0);
  const morphAt = start + 22, qAt = start + 25, replyAt = start + 28, dotsAt = start + 31, linesAt = dotsAt + dotsFrames + 3;
  const morph = Math.max(0, Math.min(1, (f - morphAt) / 3));
  const words = question.split(" ");
  const nWords = f < qAt ? 0 : Math.min(words.length, Math.floor((f - qAt) / wordEvery) + 1);
  const qText = words.slice(0, nWords).join(" ");
  const nLines = f < linesAt ? 0 : Math.min(answer.length, Math.floor((f - linesAt) / lineEvery) + 1);
  const replyA = Math.max(0, Math.min(1, (f - replyAt) / 4));
  const lineH = fontSize * 1.5;
  const replyH = nLines > 0 ? 50 + nLines * lineH : h0 * 0.7;
  const dotsOn = f >= dotsAt && nLines === 0;
  const dotPulse = (i: number) => 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(((f - dotsAt) / 4 - i * 0.6) * Math.PI));
  const avatar = (c: string, top: number) => <div style={{ position: "absolute", left: -56, top, width: 36, height: 36, borderRadius: 18, border: `2px solid ${c}`, boxSizing: "border-box", opacity: 0.8 }} />;
  return (
    <div style={{ position: "absolute", left: x - w / 2, top: yy - h0 / 2, width: w, fontFamily, fontSize, color: text, willChange: "transform" }}>
      {/* glow */}
      <div style={{ position: "absolute", left: -60, top: -60, width: w + 120, height: h0 + 120, borderRadius: 60, background: `radial-gradient(ellipse at center, ${gradient[0]}55 0%, transparent 70%)`, filter: "blur(20px)" }} />
      {/* pergunta / placeholder */}
      <div style={{ position: "relative", width: w, minHeight: h0, borderRadius: 16, background: `linear-gradient(90deg, ${gradient[0]}, ${gradient[1]})`, boxShadow: `0 0 40px ${gradient[0]}88`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: dark, opacity: morph, border: `1px solid ${outline}66`, borderRadius: 16, boxSizing: "border-box" }} />
        <div style={{ position: "relative", padding: "28px 32px", opacity: morph, minHeight: h0, boxSizing: "border-box" }}>{qText}</div>
      </div>
      {morph > 0 && avatar(avatarUser, (h0 - 36) / 2)}
      {/* resposta */}
      {replyA > 0 && (
        <div style={{ position: "relative", marginTop: 18, width: w, height: replyH, borderRadius: 16, background: dark, border: `1px solid ${outline}55`, boxSizing: "border-box", opacity: replyA, overflow: "hidden" }}>
          {dotsOn && <div style={{ position: "absolute", left: 32, top: replyH / 2 - 5, display: "flex", gap: 8 }}>{[0, 1, 2].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: text, opacity: dotPulse(i) }} />)}</div>}
          <div style={{ position: "absolute", left: 32, top: 24, right: 32 }}>
            {answer.slice(0, nLines).map((l, i) => { const a = Math.max(0, Math.min(1, (f - (linesAt + i * lineEvery)) / 3)); return <div key={i} style={{ height: lineH, opacity: a, transform: `translateY(${6 * (1 - a)}px)`, color: i === 0 ? text : `${text}cc` }}>{l}</div>; })}
          </div>
        </div>
      )}
      {replyA > 0 && avatar(avatarAi, h0 + 18 + (replyH - 36) / 2)}
    </div>
  );
};
