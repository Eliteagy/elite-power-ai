// Speech-to-text for the Comando microphone. Audio never leaves the PC: a warm faster-whisper
// worker (server/transcribe.py, Whisper large-v3-turbo on the GPU) is started on first use and
// kept alive. Each request writes the audio to a temp file, asks the worker, deletes the file.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PYTHON = process.env.AGENT_FLOOR_PYTHON || 'python';
const MAX_AUDIO = 12 * 1024 * 1024;

export function createTranscriber({ log = console.log, python = PYTHON } = {}) {
  let child = null;
  let ready = null;
  let model = '';
  let seq = 0;
  let buffer = '';
  const pending = new Map();

  function start() {
    if (ready) return ready;
    ready = new Promise((resolveReady, rejectReady) => {
      // -E: ignore PYTHON* env vars; -P: don't put the script's folder first on sys.path.
      // (Not -I: faster-whisper's PyAV lives in the user site-packages, which -I would hide.)
      child = spawn(python, ['-E', '-P', resolve(here, 'transcribe.py')], { windowsHide: true, stdio: ['pipe', 'pipe', 'pipe'] });
      const fail = (err) => {
        for (const p of pending.values()) p.reject(err);
        pending.clear();
        child = null;
        ready = null;
        rejectReady(err);
      };
      child.on('error', (err) => fail(new Error(err.code === 'ENOENT' ? 'Python não encontrado' : err.message)));
      child.on('exit', (code) => fail(new Error(`Transcritor parou (código ${code})`)));
      child.stderr.on('data', () => {});
      child.stdout.on('data', (d) => {
        buffer += d;
        let nl;
        while ((nl = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line) continue;
          let msg;
          try {
            msg = JSON.parse(line);
          } catch {
            continue;
          }
          if (msg.ready) {
            model = msg.model;
            log(`Agent Floor: transcritor pronto (${model})`);
            resolveReady();
            continue;
          }
          const p = pending.get(msg.id);
          if (!p) continue;
          pending.delete(msg.id);
          if (msg.error) p.reject(new Error(msg.error));
          else p.resolve(String(msg.text || ''));
        }
      });
    });
    return ready;
  }

  /** Transcribe base64 audio (webm/ogg/wav from MediaRecorder). Resolves with the text. */
  async function transcribe(base64, { language = 'pt' } = {}) {
    const audio = Buffer.from(String(base64 || ''), 'base64');
    if (!audio.length) throw Object.assign(new Error('Áudio vazio'), { status: 400 });
    if (audio.length > MAX_AUDIO) throw Object.assign(new Error('Áudio grande demais (máx. 12 MB)'), { status: 413 });
    await start();
    const dir = mkdtempSync(join(tmpdir(), 'agent-floor-mic-'));
    const file = join(dir, 'fala.webm');
    writeFileSync(file, audio);
    const id = String(++seq);
    try {
      return await new Promise((resolveText, rejectText) => {
        const timer = setTimeout(() => {
          pending.delete(id);
          rejectText(new Error('A transcrição demorou demasiado'));
        }, 120_000);
        pending.set(id, {
          resolve: (t) => (clearTimeout(timer), resolveText(t)),
          reject: (e) => (clearTimeout(timer), rejectText(e)),
        });
        child.stdin.write(JSON.stringify({ id, path: file, language: /^[a-z]{2}$/.test(language) ? language : 'pt' }) + '\n');
      });
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }

  function close() {
    child?.kill();
  }

  return { transcribe, close, warm: () => start().catch(() => {}), get model() {
    return model;
  } };
}
