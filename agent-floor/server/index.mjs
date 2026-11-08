// Agent Floor server. Zero dependencies.
//
//   POST /events        one event or an array of events (see docs/protocol.md)
//   GET  /stream        Server-Sent Events: a `snapshot`, then `event` + `effects`
//   GET  /state         current world as JSON
//   POST /reset         clear the floor
//   GET  /trading.json  read-only Alpaca PAPER snapshot (also pushed as SSE `trading`)
//   GET/POST /command   command centre: one order, split by the Diretor IA (see command.mjs)
//   GET  /*             the built web app (dist/)
import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createTradingPoller } from './trading.mjs';
import { createCommandCenter } from './command.mjs';
import { createGuide } from './guide.mjs';
import { createTranscriber } from './transcribe.mjs';
import { applyEvent, createState, normalizeEvent, seedResidents, slug, sweep, PROTOCOL_VERSION } from '../shared/protocol.js';

const here = dirname(fileURLToPath(import.meta.url));
const MAX_BODY = 256 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

/**
 * Read the resident roster (server/residents.json, or AGENT_FLOOR_RESIDENTS).
 * Format: { teams: [{ team, role?, skills: [<skill>, ...] }] } - one office per
 * team, one seated character per skill. A skill can also be an object
 * { name, role?, activity? } for a named character (e.g. the Trading "Professor").
 * A missing or broken file means no residents.
 */
export function loadResidents(file = process.env.AGENT_FLOOR_RESIDENTS || resolve(here, 'residents.json'), log = console.log) {
  let config;
  try {
    config = JSON.parse(readFileSync(file, 'utf8'));
  } catch (err) {
    if (err.code !== 'ENOENT') log(`Agent Floor: ignoring residents file (${err.message})`);
    return [];
  }
  const list = [];
  for (const t of Array.isArray(config?.teams) ? config.teams : []) {
    if (!t?.team || !Array.isArray(t.skills)) continue;
    for (const skill of t.skills) {
      if (skill && typeof skill === 'object') {
        if (!skill.name) continue;
        const role = skill.role || t.role;
        list.push({ id: `resident:${slug(t.team)}:${slug(skill.name)}`, name: String(skill.name), role, team: t.team, activity: skill.activity || `Role: ${role}` });
        continue;
      }
      const name = String(skill).replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      list.push({ id: `resident:${slug(t.team)}:${slug(skill)}`, name, role: t.role, team: t.team, activity: `Skill: ${skill}` });
    }
  }
  return list;
}

export function startServer({
  port = Number(process.env.AGENT_FLOOR_PORT) || 4317,
  host = process.env.AGENT_FLOOR_HOST || '127.0.0.1',
  staticDir = resolve(here, '../dist'),
  log = console.log,
  residents = loadResidents(undefined, log),
  trading = true,
  command = true,
  guide = true,
} = {}) {
  const state = createState();
  seedResidents(state, residents);
  const clients = new Set();

  function broadcast(name, data) {
    const frame = `event: ${name}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of clients) res.write(frame);
  }

  function ingest(raw) {
    const ev = normalizeEvent(raw);
    if (!ev) return false;
    const { effects } = applyEvent(state, ev);
    broadcast('event', { event: ev, effects });
    return true;
  }

  // Alpaca PAPER account for the Trading floor: polled only while someone watches.
  const poller =
    trading === false
      ? null
      : typeof trading === 'object'
        ? trading
        : createTradingPoller({ log, onUpdate: (snap) => broadcast('trading', snap), active: () => clients.size > 0 });
  poller?.start();

  // Command centre: on by default; tests pass their own (or false).
  const projectGuide = guide === false ? null : typeof guide === 'object' ? guide : createGuide();
  const transcriber = command === false ? null : createTranscriber({ log });
  const center = command === false ? null : typeof command === 'object' ? command : createCommandCenter({ emit: ingest, log, projects: () => projectGuide?.projects() || [] });

  const sweeper = setInterval(() => {
    const removed = sweep(state);
    if (removed.length) broadcast('removed', { agents: removed });
  }, 2000);
  const heartbeat = setInterval(() => {
    for (const res of clients) res.write(': ping\n\n');
  }, 20000);

  async function readBody(req, max = MAX_BODY) {
    let size = 0;
    const chunks = [];
    for await (const chunk of req) {
      size += chunk.length;
      if (size > max) throw Object.assign(new Error('Body too large'), { status: 413 });
      chunks.push(chunk);
    }
    const text = Buffer.concat(chunks).toString('utf8');
    return text ? JSON.parse(text) : null;
  }

  function cors(req, res) {
    // Local tool: allow any localhost origin plus the hosted demo to talk to it.
    const origin = req.headers.origin;
    if (origin && /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Vary', 'Origin');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }
  }

  function json(res, status, body) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  }

  async function serveStatic(req, res) {
    const url = new URL(req.url, 'http://x');
    let path = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
    let file = join(staticDir, path);
    if (!file.startsWith(staticDir)) return json(res, 403, { error: 'Forbidden' });
    try {
      const s = await stat(file);
      if (s.isDirectory()) file = join(file, 'index.html');
    } catch {
      file = join(staticDir, 'index.html');
    }
    try {
      const body = await readFile(file);
      const cache = file.includes('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache';
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream', 'Cache-Control': cache });
      res.end(body);
    } catch {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Agent Floor server is running, but the web app is not built.\nRun `npm run build`, or use `npm run dev` while developing.\n');
    }
  }

  const loopback = host === '127.0.0.1' || host === 'localhost' || host === '::1';

  const server = createServer(async (req, res) => {
    // DNS-rebinding guard: when bound to loopback, only answer loopback hostnames.
    if (loopback && !/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/.test(req.headers.host || '')) {
      return json(res, 403, { error: 'Forbidden host' });
    }
    cors(req, res);
    if (req.method === 'OPTIONS') return res.writeHead(204).end();
    const { pathname } = new URL(req.url, 'http://x');
    // Requiring JSON forces a CORS preflight, so random web pages cannot post
    // "simple" form requests to your floor. curl and the hooks send this header.
    if (req.method === 'POST' && !String(req.headers['content-type'] || '').includes('application/json')) {
      return json(res, 415, { error: 'Send Content-Type: application/json' });
    }

    try {
      if (pathname === '/events' && req.method === 'POST') {
        const body = await readBody(req);
        const list = Array.isArray(body) ? body : [body];
        let accepted = 0;
        for (const raw of list.slice(0, 200)) if (ingest(raw)) accepted++;
        return json(res, accepted ? 202 : 400, { accepted, rejected: list.length - accepted });
      }
      if (pathname === '/stream' && req.method === 'GET') {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
          'X-Accel-Buffering': 'no',
        });
        res.write(`retry: 1500\nevent: snapshot\ndata: ${JSON.stringify({ version: PROTOCOL_VERSION, state })}\n\n`);
        if (poller) res.write(`event: trading\ndata: ${JSON.stringify(poller.snapshot)}\n\n`);
        clients.add(res);
        req.on('close', () => clients.delete(res));
        poller?.wake();
        return;
      }
      if (pathname === '/state' && req.method === 'GET') return json(res, 200, state);
      if (pathname === '/trading.json' && req.method === 'GET') {
        if (!poller) return json(res, 404, { error: 'Trading disabled' });
        res.setHeader('Cache-Control', 'no-store');
        return json(res, 200, poller.snapshot);
      }
      // Command centre and Guia: only this page (same origin) or non-browser clients. Other local
      // pages may not start runs, read their output or open things, even though CORS lets them read the floor.
      if (/^\/(command|guide)(\/|$)/.test(pathname)) {
        const origin = req.headers.origin;
        if (origin && origin !== `http://${req.headers.host}`) return json(res, 403, { error: 'Forbidden origin' });
        res.setHeader('Cache-Control', 'no-store');
      }
      if (pathname === '/guide' || pathname === '/guide/open') {
        if (!projectGuide) return json(res, 404, { error: 'Guide disabled' });
        if (pathname === '/guide' && req.method === 'GET') return json(res, 200, { projects: projectGuide.list() });
        if (pathname === '/guide/open' && req.method === 'POST') {
          const body = await readBody(req);
          const out = projectGuide.open(String(body?.id || ''), String(body?.target || ''));
          return out.error ? json(res, out.status || 400, { error: out.error }) : json(res, 200, out);
        }
        return json(res, 404, { error: 'Not found' });
      }
      if (pathname === '/command' || pathname.startsWith('/command/')) {
        if (!center) return json(res, 404, { error: 'Command centre disabled' });
        if (pathname === '/command' && req.method === 'GET') return json(res, 200, center.snapshot());
        if (pathname === '/command' && req.method === 'POST') {
          const body = await readBody(req);
          const out = center.start(body?.text, body?.workers, { paths: body?.paths, mode: body?.mode, full: body?.full === true });
          return out.error ? json(res, out.status || 400, { error: out.error }) : json(res, 202, out);
        }
        if (pathname === '/command/cancel' && req.method === 'POST') return json(res, 200, { cancelled: center.cancel() });
        // Microphone: audio (base64, up to ~12 MB) transcribed locally by Whisper.
        if (pathname === '/command/transcribe' && req.method === 'POST') {
          if (!transcriber) return json(res, 404, { error: 'Transcrição desligada' });
          const body = await readBody(req, 17 * 1024 * 1024);
          try {
            return json(res, 200, { text: await transcriber.transcribe(body?.audio, { language: body?.language }) });
          } catch (err) {
            return json(res, err.status || 500, { error: err.message });
          }
        }
        if (pathname === '/command/warm' && req.method === 'POST') {
          transcriber?.warm();
          return json(res, 202, { ok: true });
        }
        return json(res, 404, { error: 'Not found' });
      }
      if (pathname === '/health') return json(res, 200, { ok: true, version: PROTOCOL_VERSION, agents: Object.keys(state.agents).length });
      if (pathname === '/reset' && req.method === 'POST') {
        ingest({ type: 'reset' });
        return json(res, 200, { ok: true });
      }
      if (req.method === 'GET') return serveStatic(req, res);
      return json(res, 404, { error: 'Not found' });
    } catch (err) {
      return json(res, err.status || 400, { error: err.message || 'Bad request' });
    }
  });

  return new Promise((resolvePromise, reject) => {
    server.once('error', reject);
    server.listen(port, host, () => {
      log(`Agent Floor is live at http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`);
      resolvePromise({
        server,
        state,
        ingest,
        close() {
          clearInterval(sweeper);
          clearInterval(heartbeat);
          poller?.stop?.();
          transcriber?.close();
          for (const res of clients) res.end();
          return new Promise((r) => server.close(r));
        },
      });
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  startServer().catch((err) => {
    console.error(err.code === 'EADDRINUSE' ? 'Port is already in use. Set AGENT_FLOOR_PORT to pick another.' : err);
    process.exit(1);
  });
}
