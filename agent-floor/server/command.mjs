// Command centre: one order goes in, the "Diretor IA" (Claude) splits it into tasks for
// GPT, Gemini, Claude and the Claude Code agents, runs them in parallel, and writes one answer.
// Every step is mirrored on the floor (Direcao Comando office, floor 9) as normal events.
//
//   GET  /command          current run + the workers the director can use
//   POST /command          { text, workers?: string[] }  start a run (one at a time)
//   POST /command/cancel   stop the current run
//
// Safety rules (do not relax):
//   - Only same-origin browser requests (or non-browser clients) may use these routes,
//     so another local web page cannot start runs or read their output.
//   - Workers are read-only: Claude gets Read/Grep/Glob/WebSearch/WebFetch/Skill only
//     (Bash, Edit, Write denied), Codex runs with the read-only sandbox.
//   - Prompts go through stdin, never through a shell command line.
//   - The OmniRoute key is read here and never leaves this module.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { basename, dirname, isAbsolute, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const TEAM = 'Direcao Comando';
// Residents seated in server/residents.json (team "Direcao Comando").
export const IDS = {
  ceo: 'resident:direcao-comando:diretor-ia',
  gpt: 'resident:direcao-comando:gpt',
  gemini: 'resident:direcao-comando:gemini',
  claude: 'resident:direcao-comando:claude',
};
const IDLE = { ceo: 'À espera de uma ordem', gpt: 'GPT via Codex (ChatGPT Plus)', gemini: 'Gemini 2.5 Flash via OmniRoute', claude: 'Claude (só leitura)' };

const MAX_TASKS = 6;
const MAX_PARALLEL = 4;
const WORKER_TIMEOUT = 10 * 60_000;
const MAX_OUTPUT = 20_000;
const READ_ONLY_TOOLS = 'Read,Grep,Glob,WebSearch,WebFetch,Skill';
const DENIED_TOOLS = 'Bash,Edit,Write,NotebookEdit';
const CLEAN_SETTINGS = JSON.stringify({ disableAllHooks: true });

// "Acesso total" (asked per order, from the panel): the workers may also edit files and run
// commands. Still refused: wiping or force-pushing, publishing, shutting the PC down, reading
// secrets. Project hooks stay on in this mode (e.g. the Investimentos paper-trading guard), so
// only user-level settings and plugins are skipped. MCP tools (mail, WhatsApp...) stay off:
// nothing is sent to other people from here.
const FULL_TOOLS = 'Read,Grep,Glob,WebSearch,WebFetch,Skill,Edit,Write,NotebookEdit,Bash,Agent,TodoWrite';
const SECRETS = ['Read(**/.env*)', 'Read(**/*.key)', 'Read(**/*.pem)', 'Read(**/.ssh/**)'];
const DANGEROUS = [
  'Bash(rm -rf:*)', 'Bash(rm -r:*)', 'Bash(rm -fr:*)', 'Bash(rmdir /s:*)', 'Bash(rd /s:*)', 'Bash(del /s:*)', 'Bash(del /q:*)',
  'Bash(Remove-Item:*)', 'Bash(format:*)', 'Bash(diskpart:*)', 'Bash(shutdown:*)', 'Bash(Restart-Computer:*)', 'Bash(Stop-Computer:*)',
  'Bash(git push:*)', 'Bash(git reset --hard:*)', 'Bash(git clean:*)', 'Bash(git checkout -- :*)', 'Bash(npm publish:*)',
  'Bash(vercel --prod:*)', 'Bash(vercel deploy --prod:*)', 'Bash(reg delete:*)', 'Bash(curl:*)', 'Bash(Invoke-WebRequest:*)',
];

/** Quality bar for GPT and Gemini (Claude agents bring their own instructions). */
export const WORKER_SYSTEM = `És um especialista sénior a trabalhar para a Elite Agency, agência de presença digital e conteúdo para o imobiliário em Portugal (dono: Gui).
- Escreve sempre em português de Portugal, nunca do Brasil (ex.: "equipa", "telemóvel", "contacto", "estás").
- Sê concreto e específico para Portugal: números, exemplos, nomes de ferramentas e passos acionáveis. Nada de generalidades nem enchimento.
- Cumpre à letra o formato e os limites pedidos (número de frases, palavras, itens).
- Quando não tiveres a certeza de um facto ou número, diz isso numa frase curta em vez de inventar.
- Usa títulos curtos, listas ou tabelas só quando tornam a resposta mais clara.`;

// ---------------------------------------------------------------- workers

/** First line of `description:` (plain or block `|`) and `name:` from an agent .md. */
export function parseAgent(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return null;
  const lines = m[1].split(/\r?\n/);
  let name = '';
  let description = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const nm = /^name:\s*(.+)$/.exec(line);
    if (nm) name = nm[1].trim().replace(/^['"]|['"]$/g, '');
    const dm = /^description:\s*(.*)$/.exec(line);
    if (dm) {
      const v = dm[1].trim();
      if (v && !/^[|>][-+]?$/.test(v)) description = v.replace(/^['"]|['"]$/g, '');
      else description = (lines.slice(i + 1).find((l) => l.trim()) || '').trim();
    }
  }
  if (!/^[a-z0-9][a-z0-9-]{0,63}$/i.test(name)) return null;
  return { name, description: description.slice(0, 220) };
}

/** Global agents (~/.claude/agents) plus each department's .claude/agents under the agency folder. */
export function discoverAgents({ agency = resolve(here, '../../..'), home = homedir() } = {}) {
  const dirs = [[join(home, '.claude', 'agents'), existsSync(agency) ? agency : home]];
  const scan = (base, depth) => {
    let entries = [];
    try {
      entries = readdirSync(base, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (!e.isDirectory() || e.name.startsWith('.') || e.name === 'node_modules') continue;
      const dir = join(base, e.name);
      const agents = join(dir, '.claude', 'agents');
      if (existsSync(agents)) dirs.push([agents, dir]);
      if (depth > 0) scan(dir, depth - 1);
    }
  };
  scan(agency, 1); // Vendas lives in CRM\dashboard, one level down.
  const seen = new Map();
  for (const [dir, cwd] of dirs) {
    let files = [];
    try {
      files = readdirSync(dir).filter((f) => f.endsWith('.md'));
    } catch {
      continue;
    }
    for (const f of files) {
      let parsed = null;
      try {
        parsed = parseAgent(readFileSync(join(dir, f), 'utf8'));
      } catch {
        /* unreadable agent file: skip */
      }
      if (parsed && !seen.has(parsed.name)) seen.set(parsed.name, { id: `agent:${parsed.name}`, kind: 'agent', label: parsed.name, description: parsed.description, agent: parsed.name, cwd });
    }
  }
  return [...seen.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export function baseWorkers() {
  return [
    { id: 'gpt', kind: 'gpt', label: 'GPT', description: 'GPT (OpenAI) via Codex: bom para segunda opinião, código, raciocínio e escrita. Só leitura.' },
    { id: 'gemini', kind: 'gemini', label: 'Gemini', description: 'Gemini 2.5 Flash (Google): rápido, bom para resumos, ideias e comparações. Sem acesso a ficheiros. Limite 20 pedidos/dia.' },
    { id: 'claude', kind: 'claude', label: 'Claude', description: 'Claude generalista com skills, pode ler ficheiros e pesquisar na web. Só leitura.' },
  ];
}

// ---------------------------------------------------------------- processes

function cleanEnv() {
  const env = { ...process.env, AGENT_FLOOR_AUTOLAUNCH: '0', AGENT_FLOOR_URL: 'http://127.0.0.1:9' };
  // A parent Claude Code session's API settings would bill the API instead of the subscription.
  for (const k of ['ANTHROPIC_API_KEY', 'ANTHROPIC_AUTH_TOKEN', 'ANTHROPIC_BASE_URL', 'ANTHROPIC_MODEL', 'CLAUDECODE', 'CLAUDE_CODE_ENTRYPOINT']) delete env[k];
  return env;
}

function killTree(child) {
  if (!child || child.exitCode !== null) return;
  if (process.platform === 'win32') spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore', windowsHide: true });
  else child.kill('SIGTERM');
}

/** Run a program, feed `input` on stdin, resolve with stdout. Rejects on non-zero exit, timeout or abort. */
export function runProcess(cmd, args, { input = '', cwd, shell = false, timeout = WORKER_TIMEOUT, signal } = {}) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { cwd, shell, env: cleanEnv(), windowsHide: true });
    let out = '';
    let err = '';
    let done = false;
    const finish = (fn, value) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      fn(value);
    };
    const onAbort = () => {
      killTree(child);
      finish(reject, new Error('Cancelado'));
    };
    const timer = setTimeout(() => {
      killTree(child);
      finish(reject, new Error('Demorou demasiado (limite 10 min)'));
    }, timeout);
    if (signal?.aborted) return onAbort();
    signal?.addEventListener('abort', onAbort);
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err = (err + d).slice(-4000)));
    child.on('error', (e) => finish(reject, new Error(e.code === 'ENOENT' ? `${cmd} não encontrado` : e.message)));
    child.on('close', (code) => {
      if (code === 0) finish(resolvePromise, out);
      else finish(reject, new Error(lastLine(err) || `${cmd} saiu com código ${code}`));
    });
    child.stdin.on('error', () => {});
    child.stdin.end(input);
  });
}

function lastLine(text) {
  const lines = String(text).split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const error = [...lines].reverse().find((l) => /error|erro|not logged|unauthorized/i.test(l));
  return (error || lines.at(-1) || '').slice(0, 300);
}

const CLAUDE = process.env.AGENT_FLOOR_CLAUDE || 'claude';

/** claude -p. `tools: false` = no tools at all (director); otherwise read-only tools. */
export async function askClaude(prompt, { agent, cwd, schema, tools = true, full = false, addDirs = [], signal, run = runProcess } = {}) {
  const args = ['-p', '--output-format', 'json', '--no-session-persistence', '--strict-mcp-config'];
  if (full && tools) args.push('--setting-sources', 'project,local');
  else args.push('--settings', CLEAN_SETTINGS);
  // Secrets stay out of reach even inside folders the Gui attaches.
  if (tools && full) args.push('--permission-mode', 'acceptEdits', '--allowedTools', FULL_TOOLS, '--disallowedTools', ...SECRETS, ...DANGEROUS);
  else if (tools) args.push('--allowedTools', READ_ONLY_TOOLS, '--disallowedTools', DENIED_TOOLS, ...SECRETS);
  else args.push('--tools', '', '--disable-slash-commands');
  if (agent) args.push('--agent', agent);
  for (const d of addDirs) args.push('--add-dir', d);
  if (schema) args.push('--json-schema', JSON.stringify(schema));
  const raw = await run(CLAUDE, args, { input: prompt, cwd: cwd || homedir(), signal });
  let j;
  try {
    j = JSON.parse(raw);
  } catch {
    throw new Error('Resposta do Claude ilegível');
  }
  if (j.is_error) throw new Error(String(j.result || j.api_error_status || 'Erro do Claude').slice(0, 300));
  return schema ? j.structured_output : String(j.result ?? '');
}

export async function askGpt(prompt, { signal, dirs = [], full = false, run = runProcess } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'agent-floor-gpt-'));
  const outFile = join(dir, 'last.txt');
  try {
    // codex is an npm .cmd shim on Windows, which needs a shell. Arguments are fixed;
    // the prompt only travels on stdin ("-").
    const q = (s) => (process.platform === 'win32' ? `"${s}"` : `'${s}'`);
    const input = `${WORKER_SYSTEM}

---

${prompt}`;
    // Attached folders: Codex starts in the first one (read-only sandbox). Paths were checked to
    // exist and contain no quotes before they got here, so quoting them for cmd is safe.
    const cd = dirs.find((d) => !/["%^&|<>]/.test(d));
    // Full access: Codex may write inside the attached/project folder (its workspace), or the
    // user folder when none was given. Read-only otherwise.
    const work = cd || (full ? homedir() : '');
    const sandbox = full ? 'workspace-write' : 'read-only';
    const args = ['exec', '--skip-git-repo-check', '-s', sandbox, '-c', 'model_reasoning_effort="high"', ...(work ? ['-C', q(work)] : []), '-o', q(outFile), '-'];
    await run('codex', args, { input, cwd: dir, shell: true, signal });
    const text = existsSync(outFile) ? readFileSync(outFile, 'utf8').trim() : '';
    if (!text) throw new Error('O GPT não respondeu');
    return text;
  } catch (err) {
    if (/not logged|unauthorized|401/i.test(err.message)) throw new Error('Codex sem login: corre `codex login` no terminal');
    throw err;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Free tier via OmniRoute: Pro models have no quota (always "cooling down"), so take the newest
// Flash and fall back to older ones when a model is rate-limited.
export const GEMINI_MODELS = ['gemini/gemini-3.6-flash', 'gemini/gemini-3.5-flash', 'gemini/gemini-2.5-flash'];

async function geminiOnce(model, prompt, key, signal, fetchImpl) {
  let res;
  try {
    res = await fetchImpl('http://127.0.0.1:20128/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        reasoning_effort: 'high',
        messages: [
          { role: 'system', content: WORKER_SYSTEM },
          { role: 'user', content: prompt },
        ],
      }),
      signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(240_000)]) : AbortSignal.timeout(240_000),
    });
  } catch (err) {
    if (signal?.aborted) throw new Error('Cancelado');
    throw new Error(err.name === 'TimeoutError' ? 'Gemini demorou demasiado' : 'OmniRoute desligado (porta 20128)');
  }
  const j = await res.json().catch(() => null);
  if (!res.ok || j?.error) {
    const e = new Error(String(j?.error?.message || j?.error || `OmniRoute respondeu ${res.status}`).slice(0, 300));
    // Any upstream hiccup (empty answer, 5xx, quota, cooldown) moves on to the next model; only a
    // bad OmniRoute key stops the chain, because every model would fail the same way.
    e.retry = !(res.status === 401 || res.status === 403);
    throw e;
  }
  // Newer Gemini models may answer with an array of parts instead of a string.
  const content = j?.choices?.[0]?.message?.content;
  const text = Array.isArray(content)
    ? content.map((p) => (typeof p === 'string' ? p : p?.type && p.type !== 'text' ? '' : p?.text || '')).join('').trim()
    : String(content ?? '').trim();
  if (!text) throw Object.assign(new Error('O Gemini não respondeu'), { retry: true });
  // An outdated Antigravity client gets a notice as the "answer": treat it as a failure.
  if (/version of Antigravity is no longer supported/i.test(text)) throw Object.assign(new Error('Antigravity desatualizado no OmniRoute'), { retry: true });
  return text;
}

// Gemini Pro through the Gui's Google AI Pro account (OmniRoute OAuth: Antigravity or Gemini CLI).
// Those connections expose their own model ids; when one is there, Pro is tried first.
const SUBSCRIPTION = /^(antigravity|ag|gemini-cli|gc)\//i;
export function pickGeminiModels(ids) {
  const sub = ids.filter((id) => SUBSCRIPTION.test(id) && /gemini/i.test(id) && !/image|tts|embed|live|audio|customtools|lite|agent/i.test(id));
  const newest = (list) => [...list].sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  // Pro first (high thinking before low), then the newest Flash on "high", all from the subscription.
  const pro = newest(sub.filter((id) => /pro/i.test(id))).sort((a, b) => Number(/high/i.test(b)) - Number(/high/i.test(a)));
  const flash = newest(sub.filter((id) => /flash-high$/i.test(id)));
  return [...new Set([...pro.slice(0, 2), ...flash.slice(0, 2), ...GEMINI_MODELS])];
}

let modelCache = { at: 0, list: GEMINI_MODELS };
async function geminiModels(key, fetchImpl) {
  if (Date.now() - modelCache.at < 10 * 60_000) return modelCache.list;
  try {
    const res = await fetchImpl('http://127.0.0.1:20128/v1/models', { headers: { Authorization: `Bearer ${key}` }, signal: AbortSignal.timeout(8000) });
    const j = await res.json();
    modelCache = { at: Date.now(), list: pickGeminiModels((j?.data || []).map((m) => String(m.id))) };
  } catch {
    modelCache = { at: Date.now() - 9 * 60_000, list: GEMINI_MODELS }; // retry in a minute
  }
  return modelCache.list;
}

export async function askGemini(prompt, { signal, fetchImpl = fetch, models } = {}) {
  let key;
  try {
    key = readFileSync(join(homedir(), '.claude-omniroute', 'omniroute.key'), 'utf8').trim();
  } catch {
    throw new Error('Chave do OmniRoute não encontrada');
  }
  models ??= await geminiModels(key, fetchImpl);
  let last;
  for (const model of models) {
    try {
      return await geminiOnce(model, prompt, key, signal, fetchImpl);
    } catch (err) {
      last = err;
      if (!err.retry) throw err;
    }
  }
  throw last;
}

// ---------------------------------------------------------------- prompts

export function planSchema(ids, projectIds = []) {
  const task = {
    worker: { type: 'string', enum: ids },
    tarefa: { type: 'string', description: 'Instrução completa e autónoma para esse funcionário.' },
  };
  const props = {
    plano: { type: 'string', description: 'Uma frase: como vais dividir o trabalho.' },
    tarefas: {
      type: 'array',
      minItems: projectIds.length ? 0 : 1,
      maxItems: MAX_TASKS,
      items: { type: 'object', properties: task, required: ['worker', 'tarefa'] },
    },
  };
  if (projectIds.length) {
    task.projeto = { type: 'string', enum: projectIds, description: 'Projeto em que esta tarefa trabalha (dá acesso à pasta).' };
    props.abrir = { type: 'array', maxItems: 4, items: { type: 'string', enum: projectIds }, description: 'Projetos a mostrar ao Gui na janela Guia.' };
  }
  return { type: 'object', properties: props, required: ['plano', 'tarefas'] };
}

export function planPrompt(text, workers, projects = [], full = false) {
  const list = workers.map((w) => `- ${w.id}: ${w.description || w.label}`).join('\n');
  const projs = projects.map((p) => `- ${p.id}: ${p.name} (${p.type}${p.client ? `, ${p.client}` : ''}${p.status ? `, ${p.status}` : ''})${p.keywords?.length ? ` [${p.keywords.join(', ')}]` : ''}`).join('\n');
  return `És o Diretor IA da Elite Agency (agência do Gui, Portugal). Recebes uma ordem e distribuis o trabalho pelos funcionários abaixo.

Funcionários disponíveis:
${list}
${projs ? `
Projetos da agência (sites, apps, vídeos):
${projs}
` : ''}
Regras:
- Usa entre 1 e ${MAX_TASKS} tarefas. Usa só os funcionários que trazem valor real; uma ordem simples pode ter uma só tarefa.
- Os funcionários trabalham em paralelo e não veem o trabalho uns dos outros nem esta conversa: cada tarefa tem de ser completa e autónoma, com todo o contexto necessário.
- Escreve cada tarefa como um briefing de agência: objetivo, contexto (público, mercado português, Elite Agency quando for relevante), formato exato da resposta e o que conta como uma resposta excelente. Mantém os limites que o Gui pediu (número de frases, palavras, itens).
- Quando a ordem pedir várias opiniões ou comparação, dá a mesma pergunta a modelos diferentes (gpt, gemini, claude).
- Prefere um agente especializado (agent:...) quando a ordem for do domínio dele.
${full ? '- ACESSO TOTAL ligado: os funcionários Claude e GPT podem criar e editar ficheiros e correr comandos nas pastas do projeto. Quando a ordem pedir para fazer, dá tarefas de execução concretas (que ficheiro, que mudança). Nunca mandam mensagens a terceiros nem publicam.' : '- Os funcionários só leem e escrevem texto: não enviam mensagens, não alteram ficheiros nem bases de dados.'}
- Escreve em português de Portugal.${projs ? `
- Quando a ordem falar de um projeto, põe o id em "abrir" (o Gui vê-o na janela Guia) e em "projeto" de cada tarefa sobre ele.
- Se a ordem for só para abrir, mostrar ou ver um projeto, devolve "tarefas" vazio e o projeto em "abrir".` : ''}

Ordem do Gui:
"""
${text}
"""`;
}

export function synthPrompt(text, steps) {
  const parts = steps
    .map((s, i) => `### ${i + 1}. ${s.label}\nTarefa: ${s.task}\n${s.status === 'done' ? `Resposta:\n${s.output.slice(0, 12_000)}` : `Falhou: ${s.error}`}`)
    .join('\n\n');
  return `És o Diretor IA da Elite Agency. Distribuíste a ordem do Gui pela equipa e estas são as respostas. Escreve a resposta final para o Gui, em português de Portugal: direta, sem enchimento, com o melhor de cada contributo. Corrige erros de facto e expressões do português do Brasil. Respeita os limites e o formato que o Gui pediu. Quando os funcionários discordarem, diz onde e qual é a tua recomendação. Se algum falhou, diz numa linha no fim.

Ordem do Gui:
"""
${text}
"""

Respostas da equipa:

${parts}`;
}

// ---------------------------------------------------------------- attachments

const TEXT_EXT = /\.(md|txt|csv|json|html?|css|js|mjs|cjs|ts|tsx|jsx|py|ps1|sh|ya?ml|toml|xml|srt|vtt|sql|ini|log)$/i;
const SECRET = /(^|[\\/])(\.env[^\\/]*|\.ssh|\.aws|\.gnupg|[^\\/]+\.(key|pem|pfx|p12))$/i;

/**
 * Folders and files the Gui attached to an order. Each must be an absolute path that exists;
 * secrets (.env, keys, .ssh) are refused. Workers only ever read them.
 */
export function checkPaths(paths) {
  const list = [];
  let textBudget = 120_000;
  for (const raw of (Array.isArray(paths) ? paths : []).slice(0, 8)) {
    const p = String(raw || '').trim();
    if (!p) continue;
    if (!isAbsolute(p) || /["\0\r\n]/.test(p)) return { error: `Caminho inválido: ${p.slice(0, 120)}` };
    const abs = resolve(p);
    if (SECRET.test(abs)) return { error: `Por segurança não anexo segredos: ${basename(abs)}` };
    let st;
    try {
      st = statSync(abs);
    } catch {
      return { error: `Não existe: ${abs.slice(0, 160)}` };
    }
    if (st.isDirectory()) list.push({ path: abs, kind: 'folder', dir: abs });
    else if (st.isFile()) {
      let text = '';
      if (TEXT_EXT.test(abs) && st.size <= Math.min(60_000, textBudget)) {
        try {
          text = readFileSync(abs, 'utf8');
          textBudget -= text.length;
        } catch {
          /* unreadable: still attached by path */
        }
      }
      list.push({ path: abs, kind: 'file', dir: dirname(abs), text });
    }
  }
  return { list };
}

/** Add the attached files to a task: their paths, or (for Gemini) the text of the small ones. */
export function withFiles(task, files = [], inline = false) {
  if (!files.length) return task;
  if (!inline) return `${task}\n\nFicheiros anexados pelo Gui (podes lê-los):\n${files.map((f) => `- ${f.path}`).join('\n')}`;
  const parts = files.map((f) => (f.text ? `### ${basename(f.path)}\n${f.text}` : `### ${basename(f.path)}\n(sem texto: ficheiro binário ou grande demais)`));
  return `${task}\n\nFicheiros anexados pelo Gui:\n\n${parts.join('\n\n')}`;
}

// ---------------------------------------------------------------- the centre

/**
 * `emit(event)` posts a floor event (the server's ingest). `deps` lets tests swap the model calls.
 */
export function createCommandCenter({ emit = () => {}, log = console.log, deps = {}, agentsLoader = discoverAgents, projects = () => [] } = {}) {
  const ask = { claude: deps.askClaude || askClaude, gpt: deps.askGpt || askGpt, gemini: deps.askGemini || askGemini };
  let run = null;
  let controller = null;
  let agentsCache = null;
  let agentsAt = 0;

  function workers() {
    if (!agentsCache || Date.now() - agentsAt > 60_000) {
      agentsCache = agentsLoader();
      agentsAt = Date.now();
    }
    return [...baseWorkers(), ...agentsCache];
  }

  const floor = (ev) => {
    try {
      emit({ team: TEAM, source: 'comando', ...ev });
    } catch (err) {
      log(`Agent Floor command: floor event failed (${err.message})`);
    }
  };
  const deskOf = (step) => (step.kind === 'agent' ? `cmd:${run.id}:${step.n}` : IDS[step.kind]);
  const touch = () => (run.updatedAt = Date.now());

  function snapshot() {
    return { run, workers: workers().map(({ id, kind, label, description }) => ({ id, kind, label, description })) };
  }

  async function execute(step, signal) {
    const desk = deskOf(step);
    step.status = 'working';
    step.startedAt = Date.now();
    touch();
    if (step.kind === 'agent') floor({ type: 'join', agent: desk, name: step.label, role: step.agent, parent: IDS.ceo, status: 'working', activity: step.task, text: step.task });
    else {
      floor({ type: 'message', agent: IDS.ceo, to: desk, text: step.task });
      floor({ type: 'status', agent: desk, status: 'working', activity: step.task });
    }
    try {
      let out;
      const dirs = [...new Set([step.folder, ...run.dirs].filter(Boolean))];
      if (step.kind === 'gpt') out = await ask.gpt(withFiles(step.task, run.files, false), { signal, dirs, full: run.full });
      // Gemini has no file access: small text files are pasted into its prompt instead.
      else if (step.kind === 'gemini') out = await ask.gemini(withFiles(step.task, run.files, true), { signal });
      else out = await ask.claude(withFiles(step.task, run.files, false), { agent: step.agent, cwd: step.agent ? step.cwd : dirs[0] || step.cwd, addDirs: dirs, full: run.full, signal });
      step.output = String(out || '').slice(0, MAX_OUTPUT);
      step.status = 'done';
      floor({ type: 'message', agent: desk, to: IDS.ceo, text: `Feito: ${step.output.slice(0, 160)}` });
      floor({ type: 'status', agent: desk, status: step.kind === 'agent' ? 'done' : 'idle', activity: step.kind === 'agent' ? 'Entregue ao Diretor' : IDLE[step.kind] });
    } catch (err) {
      step.status = signal.aborted ? 'cancelled' : 'error';
      step.error = err.message;
      floor({ type: 'status', agent: desk, status: step.kind === 'agent' ? 'done' : 'idle', activity: step.kind === 'agent' ? `Falhou: ${err.message}` : IDLE[step.kind] });
    }
    step.endedAt = Date.now();
    touch();
  }

  async function main(text, allowed, signal, mode) {
    const all = workers();
    const pool = allowed.length ? all.filter((w) => allowed.includes(w.id)) : all;
    floor({ type: 'task', agent: IDS.ceo, task: text.slice(0, 120) });
    const projs = projects();
    const byId = new Map(pool.map((w) => [w.id, w]));
    const projById = new Map(projs.map((p) => [p.id, p]));
    const attached = run.attachments.length ? `\n\nO Gui anexou (os funcionários Claude e GPT podem ler; o Gemini recebe o texto dos ficheiros pequenos):\n${run.attachments.map((a) => `- ${a.path}${a.kind === 'file' ? ' (ficheiro)' : ' (pasta)'}`).join('\n')}` : '';

    let tasks;
    if (mode === 'comparar') {
      // The same order to each chosen model at once, then the Diretor compares.
      const models = pool.filter((w) => w.kind !== 'agent');
      if (!models.length) throw new Error('Escolhe pelo menos uma IA para comparar');
      tasks = models.map((w) => ({ worker: w.id, tarefa: text + attached }));
      run.plan = `A mesma ordem para ${models.map((w) => w.label).join(', ')} ao mesmo tempo; no fim comparo as respostas.`;
    } else {
      floor({ type: 'status', agent: IDS.ceo, status: 'thinking', activity: 'A dividir a ordem pela equipa' });
      const plan = await ask.claude(planPrompt(text + attached, pool, projs, run.full), { schema: planSchema(pool.map((w) => w.id), projs.map((p) => p.id)), tools: false, signal });
      tasks = (Array.isArray(plan?.tarefas) ? plan.tarefas : []).filter((t) => byId.has(t.worker) && String(t.tarefa || '').trim()).slice(0, MAX_TASKS);
      run.open = [...new Set((Array.isArray(plan?.abrir) ? plan.abrir : []).filter((id) => projById.has(id)))].slice(0, 4);
      run.plan = String(plan?.plano || '').slice(0, 400);
    }
    if (!tasks.length) {
      if (!run.open.length) throw new Error('O Diretor não conseguiu dividir a ordem');
      run.final = `Abri no Guia: ${run.open.map((id) => projById.get(id).name).join(', ')}.`;
      return;
    }
    run.steps = tasks.map((t, n) => {
      const w = byId.get(t.worker);
      const proj = projById.get(t.projeto);
      return { n, worker: w.id, kind: w.kind, label: w.label, agent: w.agent, cwd: w.cwd, folder: proj?.folder || '', project: proj?.id || '', task: String(t.tarefa).slice(0, 4000), status: 'queued', output: '', error: '' };
    });
    run.phase = 'working';
    touch();
    floor({ type: 'status', agent: IDS.ceo, status: 'waiting', activity: `À espera de ${run.steps.length} ${run.steps.length === 1 ? 'resposta' : 'respostas'}` });

    // Same desk (gpt, gemini, claude) never runs two tasks at once: its steps queue up.
    const lanes = new Map();
    for (const s of run.steps) {
      const key = s.kind === 'agent' ? `agent:${s.n}` : s.kind;
      if (!lanes.has(key)) lanes.set(key, []);
      lanes.get(key).push(s);
    }
    const queue = [...lanes.values()];
    const workerLoop = async () => {
      for (let lane = queue.shift(); lane; lane = queue.shift()) {
        for (const s of lane) {
          if (signal.aborted) {
            s.status = 'cancelled';
            continue;
          }
          await execute(s, signal);
        }
      }
    };
    await Promise.all(Array.from({ length: Math.min(MAX_PARALLEL, queue.length) }, workerLoop));
    if (signal.aborted) throw new Error('Cancelado');

    const ok = run.steps.filter((s) => s.status === 'done');
    if (!ok.length) throw new Error('Nenhum funcionário conseguiu responder');
    run.phase = 'synth';
    touch();
    floor({ type: 'status', agent: IDS.ceo, status: 'thinking', activity: 'A juntar as respostas' });
    run.final =
      ok.length === 1 && run.steps.length === 1
        ? ok[0].output
        : String(await ask.claude(synthPrompt(text, run.steps), { tools: false, signal })).slice(0, MAX_OUTPUT);
  }

  function start(text, allowed = [], { paths = [], mode = 'diretor', full = false } = {}) {
    if (run && !['done', 'error', 'cancelled'].includes(run.phase)) return { error: 'Já há uma ordem a correr', status: 409 };
    const clean = String(text || '').trim().slice(0, 8000);
    if (!clean) return { error: 'Escreve uma ordem', status: 400 };
    const ids = new Set(workers().map((w) => w.id));
    const pick = (Array.isArray(allowed) ? allowed : []).map(String).filter((id) => ids.has(id)).slice(0, 40);
    const attachments = checkPaths(paths);
    if (attachments.error) return { error: attachments.error, status: 400 };
    const modo = mode === 'comparar' ? 'comparar' : 'diretor';
    run = {
      id: Date.now().toString(36),
      text: clean,
      workers: pick,
      mode: modo,
      full: full === true,
      attachments: attachments.list.map(({ path, kind }) => ({ path, kind })),
      phase: 'planning',
      plan: '',
      open: [],
      steps: [],
      final: '',
      error: '',
      startedAt: Date.now(),
      updatedAt: Date.now(),
    };
    // Kept off the snapshot: folders the workers may read, and small text files for Gemini.
    Object.defineProperties(run, {
      dirs: { value: attachments.list.map((a) => a.dir), enumerable: false },
      files: { value: attachments.list.filter((a) => a.kind === 'file'), enumerable: false },
    });
    controller = new AbortController();
    const { signal } = controller;
    const current = run;
    main(clean, pick, signal, modo)
      .then(() => {
        if (run !== current) return;
        run.phase = 'done';
        floor({ type: 'message', agent: IDS.ceo, to: IDS.claude, text: 'Ordem concluída' });
      })
      .catch((err) => {
        if (run !== current) return;
        run.phase = signal.aborted ? 'cancelled' : 'error';
        run.error = signal.aborted ? 'Cancelado' : err.message;
        log(`Agent Floor command: ${run.error}`);
      })
      .finally(() => {
        if (run !== current) return;
        run.endedAt = Date.now();
        touch();
        floor({ type: 'status', agent: IDS.ceo, status: 'idle', activity: run.phase === 'done' ? 'Ordem entregue' : IDLE.ceo });
      });
    return { run };
  }

  function cancel() {
    if (!run || ['done', 'error', 'cancelled'].includes(run.phase)) return false;
    controller?.abort();
    return true;
  }

  return { start, cancel, snapshot, workers };
}
