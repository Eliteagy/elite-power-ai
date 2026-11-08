// Guia: the agency's projects (sites, apps, videos) from server/projects.json, and a safe way to
// open one of them: its site in Brave or its folder in Explorer.
//
//   GET  /guide         the project list
//   POST /guide/open    { id, target: 'url' | 'local' | 'repo' | 'folder' }
//
// Safety: only URLs and folders written in projects.json can be opened (never anything from the
// request), URLs must be http(s), and programs are started without a shell.
import { spawn } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const BRAVE = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
export const TYPES = ['site', 'app', 'video', 'departamento'];
const TARGETS = ['url', 'local', 'repo', 'folder'];

const str = (v, max = 300) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const httpUrl = (v) => {
  const s = str(v, 500);
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : '';
  } catch {
    return '';
  }
};

/** Read and clean projects.json. Bad entries are skipped; a missing file means no projects. */
export function loadProjects(file = process.env.AGENT_FLOOR_PROJECTS || resolve(here, 'projects.json')) {
  let config;
  try {
    config = JSON.parse(readFileSync(file, 'utf8'));
  } catch {
    return [];
  }
  const root = str(config?.root, 400);
  const seen = new Set();
  const out = [];
  for (const p of Array.isArray(config?.projects) ? config.projects : []) {
    const id = str(p?.id, 48);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || seen.has(id) || !str(p.name)) continue;
    seen.add(id);
    const rel = str(p.folder, 400);
    const folder = rel ? (isAbsolute(rel) ? rel : root ? join(root, rel) : '') : '';
    let hasFolder = false;
    try {
      hasFolder = Boolean(folder) && statSync(folder).isDirectory();
    } catch {
      /* missing folder */
    }
    out.push({
      id,
      name: str(p.name, 60),
      type: TYPES.includes(p.type) ? p.type : 'app',
      client: str(p.client, 60),
      status: str(p.status, 40),
      url: httpUrl(p.url),
      local: httpUrl(p.local),
      repo: httpUrl(p.repo),
      notes: str(p.notes, 300),
      keywords: (Array.isArray(p.keywords) ? p.keywords : []).map((k) => str(k, 40)).filter(Boolean).slice(0, 12),
      folder: hasFolder ? folder : '',
      folderName: hasFolder ? basename(folder) : '',
    });
  }
  return out;
}

function defaultLauncher(kind, value) {
  if (kind === 'folder') {
    spawn('explorer.exe', [value], { detached: true, stdio: 'ignore', windowsHide: false }).unref();
    return;
  }
  const exe = existsSync(BRAVE) ? BRAVE : null;
  if (exe) spawn(exe, [value], { detached: true, stdio: 'ignore' }).unref();
  // No Brave: let Windows pick the default browser (no shell involved).
  else spawn('rundll32.exe', ['url.dll,FileProtocolHandler', value], { detached: true, stdio: 'ignore' }).unref();
}

export function createGuide({ loader = loadProjects, launch = defaultLauncher } = {}) {
  let cache = null;
  let at = 0;
  const projects = () => {
    if (!cache || Date.now() - at > 60_000) {
      cache = loader();
      at = Date.now();
    }
    return cache;
  };

  function list() {
    return projects().map(({ keywords, ...p }) => p);
  }

  function open(id, target) {
    const p = projects().find((x) => x.id === id);
    if (!p) return { error: 'Projeto desconhecido', status: 404 };
    if (!TARGETS.includes(target)) return { error: 'Destino inválido', status: 400 };
    const value = p[target];
    if (!value) return { error: 'Este projeto não tem isso', status: 404 };
    try {
      launch(target === 'folder' ? 'folder' : 'url', value);
    } catch (err) {
      return { error: `Não abriu: ${err.message}`, status: 500 };
    }
    return { ok: true };
  }

  return { list, open, projects };
}
