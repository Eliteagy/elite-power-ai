/**
 * Tempos do sub-estilo «Violet rápido», em MILISSEGUNDOS (a referência é 60 fps; converter com ms/1000*fps).
 * Só o que foi medido e sustentado (neutral-flow-variante-violet-rapida.md §2):
 *   - PUSH_FAST_MS: troço rápido do push-back — medido nos dois vídeos (167 ms vs ≈270 ms no catálogo A, ≈1,6×).
 *   - ANSWER_POP_MS: card de resposta do chat — medido nos dois (67 ms vs subida de 330–470 ms no catálogo A).
 *   - DASH_OVERSHOOT_PX / DASH_RECOIL_MS: overshoot da subida do dashboard — medido só na variante (o catálogo A assenta monotónico).
 * O que NÃO está aqui de propósito: multiplicador global de velocidade (não medido) e tempos do anel
 * (o anel do original não foi medido pelo mesmo método — 2 tentativas falhadas; ver §2.3).
 */
export const PUSH_FAST_MS = 167;
export const ANSWER_POP_MS = 67;
export const DASH_OVERSHOOT_PX = 13;
export const DASH_RECOIL_MS = 117;
export const msToFrames = (ms: number, fps: number): number => Math.max(1, Math.round((ms / 1000) * fps));
/** Aceitação de jerk @30 fps para este sub-estilo: entradas ≤0,7; resto mantém o ≤0,47 do catálogo A. */
export const JERK_ENTRY_MAX = 0.7;
