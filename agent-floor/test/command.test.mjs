import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCommandCenter, parseAgent, planSchema, IDS } from '../server/command.mjs';
import { startServer } from '../server/index.mjs';

const agents = () => [{ id: 'agent:editor-video', kind: 'agent', label: 'editor-video', description: 'Edita vídeo', agent: 'editor-video', cwd: '.' }];

function fakeCenter(overrides = {}) {
  const events = [];
  const calls = [];
  const deps = {
    async askClaude(prompt, opts) {
      calls.push({ who: 'claude', prompt, opts });
      if (opts.schema) {
        return {
          plano: 'GPT e Gemini dão ideias, o editor revê',
          tarefas: [
            { worker: 'gpt', tarefa: 'Ideias A' },
            { worker: 'gemini', tarefa: 'Ideias B' },
            { worker: 'agent:editor-video', tarefa: 'Rever' },
            { worker: 'inventado', tarefa: 'ignorar' },
          ],
        };
      }
      if (opts.agent) return 'nota do editor';
      return 'RESPOSTA FINAL';
    },
    async askGpt() {
      calls.push({ who: 'gpt' });
      return 'ideias do gpt';
    },
    async askGemini() {
      calls.push({ who: 'gemini' });
      throw new Error('limite diário');
    },
    ...overrides,
  };
  const center = createCommandCenter({ emit: (e) => events.push(e), log: () => {}, deps, agentsLoader: agents });
  return { center, events, calls };
}

async function settle(center) {
  for (let i = 0; i < 100; i++) {
    const { run } = center.snapshot();
    if (run && !['planning', 'working', 'synth'].includes(run.phase)) return run;
    await new Promise((r) => setTimeout(r, 5));
  }
  throw new Error('run did not finish');
}

test('parseAgent reads name and the first description line', () => {
  assert.deepEqual(parseAgent('---\nname: ceo\ndescription: |\n  CEO da agência.\n  Mais.\ntools: Read\n---\nbody'), { name: 'ceo', description: 'CEO da agência.' });
  assert.deepEqual(parseAgent('---\nname: x-1\ndescription: "Faz X"\n---'), { name: 'x-1', description: 'Faz X' });
  assert.equal(parseAgent('---\nname: ../evil\n---'), null, 'names that are not plain slugs are refused');
  assert.equal(parseAgent('no front matter'), null);
});

test('plan schema only allows known workers', () => {
  assert.deepEqual(planSchema(['gpt', 'gemini']).properties.tarefas.items.properties.worker.enum, ['gpt', 'gemini']);
});

test('a run plans, runs workers, survives one failure and synthesises', async () => {
  const { center, events, calls } = fakeCenter();
  const out = center.start('  Dá-me ideias de reels  ');
  assert.ok(out.run);
  assert.equal(center.start('outra').status, 409, 'one run at a time');
  const run = await settle(center);
  assert.equal(run.phase, 'done');
  assert.equal(run.text, 'Dá-me ideias de reels');
  assert.equal(run.steps.length, 3, 'unknown workers from the plan are dropped');
  assert.deepEqual(run.steps.map((s) => s.status), ['done', 'error', 'done']);
  assert.equal(run.steps[1].error, 'limite diário');
  assert.equal(run.final, 'RESPOSTA FINAL');
  const synth = calls.filter((c) => c.who === 'claude' && !c.opts.schema && !c.opts.agent);
  assert.equal(synth.length, 1);
  assert.equal(synth[0].opts.tools, false, 'the director runs without tools');
  assert.match(synth[0].prompt, /Falhou: limite diário/);
  const editor = calls.find((c) => c.opts?.agent === 'editor-video');
  assert.ok(editor, 'agent steps run claude with --agent');
  // Floor: the director gets the task, GPT gets a paper plane, the agent joins under the director.
  assert.ok(events.some((e) => e.type === 'task' && e.agent === IDS.ceo));
  assert.ok(events.some((e) => e.type === 'message' && e.agent === IDS.ceo && e.to === IDS.gpt));
  assert.ok(events.some((e) => e.type === 'join' && e.parent === IDS.ceo && e.role === 'editor-video'));
  assert.ok(events.every((e) => e.team === 'Direcao Comando'));
  assert.equal(events.at(-1).agent, IDS.ceo);
  assert.equal(events.at(-1).status, 'idle');
});

test('picked workers restrict the plan', async () => {
  const { center, calls } = fakeCenter();
  center.start('só o gpt', ['gpt', 'nope']);
  const run = await settle(center);
  assert.deepEqual(run.workers, ['gpt']);
  const plan = calls.find((c) => c.opts?.schema);
  assert.deepEqual(plan.opts.schema.properties.tarefas.items.properties.worker.enum, ['gpt']);
});

test('a single task answer skips the synthesis call', async () => {
  const { center, calls } = fakeCenter({
    async askClaude(prompt, opts) {
      calls.push({ who: 'claude', opts });
      return opts.schema ? { plano: 'p', tarefas: [{ worker: 'claude', tarefa: 't' }] } : 'só uma';
    },
  });
  center.start('simples');
  const run = await settle(center);
  assert.equal(run.final, 'só uma');
  assert.equal(calls.length, 2);
});

test('cancel stops a run', async () => {
  const { center } = fakeCenter({
    askGpt: (_p, { signal }) => new Promise((_r, reject) => signal.addEventListener('abort', () => reject(new Error('Cancelado')))),
  });
  center.start('longa', ['gpt']);
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(center.cancel(), true);
  const run = await settle(center);
  assert.equal(run.phase, 'cancelled');
});

test('empty orders are refused', () => {
  const { center } = fakeCenter();
  assert.equal(center.start('   ').status, 400);
});

test('command routes refuse other origins', async () => {
  const { center } = fakeCenter();
  const floor = await startServer({ port: 0, log: () => {}, trading: false, residents: [], command: center });
  const { port } = floor.server.address();
  const base = `http://127.0.0.1:${port}`;
  try {
    const evil = await fetch(`${base}/command`, { headers: { Origin: 'http://localhost:3000' } });
    assert.equal(evil.status, 403);
    const evilPost = await fetch(`${base}/command`, { method: 'POST', headers: { Origin: 'http://localhost:3000', 'Content-Type': 'application/json' }, body: '{"text":"x"}' });
    assert.equal(evilPost.status, 403);
    const same = await fetch(`${base}/command`, { headers: { Origin: base } });
    assert.equal(same.status, 200);
    assert.ok((await same.json()).workers.some((w) => w.id === 'gpt'));
    const start = await fetch(`${base}/command`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: 'olá' }) });
    assert.equal(start.status, 202);
    await settle(center);
  } finally {
    await floor.close();
  }
});

test('gemini: array content is joined and rate-limited models fall back', async () => {
  const { askGemini } = await import('../server/command.mjs');
  const seen = [];
  const fetchImpl = async (_url, init) => {
    const { model, messages } = JSON.parse(init.body);
    seen.push(model);
    assert.equal(messages[0].role, 'system');
    if (model === 'a') return new Response(JSON.stringify({ error: { message: 'All credentials are cooling down' } }), { status: 429 });
    return new Response(JSON.stringify({ choices: [{ message: { content: [{ type: 'text', text: 'Olá ' }, { type: 'thinking', text: 'x' }, { type: 'text', text: 'Gui' }] } }] }), { status: 200 });
  };
  assert.equal(await askGemini('p', { fetchImpl, models: ['a', 'b'] }), 'Olá Gui');
  assert.deepEqual(seen, ['a', 'b']);
});

test('gemini Pro from the Google subscription is preferred when connected', async () => {
  const { pickGeminiModels, GEMINI_MODELS } = await import('../server/command.mjs');
  assert.deepEqual(pickGeminiModels(['gemini/gemini-3.1-pro-preview', 'openrouter/google/gemini-2.5-pro']), GEMINI_MODELS, 'free-tier Pro is never picked');
  const picked = pickGeminiModels(['antigravity/gemini-3-pro-low', 'antigravity/gemini-3.1-pro-high', 'antigravity/gemini-3.1-pro-image', 'antigravity/claude-x']);
  assert.equal(picked[0], 'antigravity/gemini-3.1-pro-high');
  assert.ok(!picked.includes('antigravity/gemini-3.1-pro-image'));
  assert.equal(picked.at(-1), GEMINI_MODELS.at(-1), 'flash stays as fallback');
  const flashOnly = pickGeminiModels(['antigravity/gemini-3-flash', 'antigravity/gemini-3.8-flash-high', 'antigravity/gemini-3.8-flash-low', 'antigravity/gemini-3.10-flash-high', 'antigravity/gemini-3.1-flash-lite']);
  assert.deepEqual(flashOnly.slice(0, 2), ['antigravity/gemini-3.10-flash-high', 'antigravity/gemini-3.8-flash-high']);
});

test('compare mode skips the plan and sends the same order to each model', async () => {
  const { center, calls } = fakeCenter({
    async askGemini(p) {
      calls.push({ who: 'gemini', p });
      return 'g';
    },
  });
  center.start('Qual o melhor CRM?', ['gpt', 'gemini', 'claude'], { mode: 'comparar' });
  const run = await settle(center);
  assert.equal(run.mode, 'comparar');
  assert.deepEqual(run.steps.map((s) => s.worker), ['gpt', 'gemini', 'claude']);
  assert.ok(run.steps.every((s) => s.task === 'Qual o melhor CRM?'));
  assert.ok(!calls.some((c) => c.opts?.schema), 'no planning call');
  assert.equal(run.final, 'RESPOSTA FINAL');
});

test('attachments: folders and files are checked, secrets refused, Gemini gets file text', async () => {
  const { checkPaths, withFiles } = await import('../server/command.mjs');
  const { mkdtempSync, writeFileSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const dir = mkdtempSync(join(tmpdir(), 'att-'));
  const note = join(dir, 'nota.md');
  writeFileSync(note, '# Nota\nconteúdo');
  writeFileSync(join(dir, '.env'), 'SECRET=1');
  const ok = checkPaths([dir, note]);
  assert.deepEqual(ok.list.map((a) => a.kind), ['folder', 'file']);
  assert.equal(ok.list[1].dir, dir);
  assert.match(checkPaths([join(dir, '.env')]).error, /segredos/);
  assert.match(checkPaths(['relativo/pasta']).error, /inválido/);
  assert.match(checkPaths([join(dir, 'nao-existe')]).error, /Não existe/);
  assert.match(withFiles('t', ok.list.filter((a) => a.kind === 'file'), true), /conteúdo/);
  assert.match(withFiles('t', ok.list.filter((a) => a.kind === 'file'), false), /nota\.md/);

  const seen = [];
  const { center } = fakeCenter({
    async askClaude(prompt, opts) {
      if (opts.schema) return { plano: 'p', tarefas: [{ worker: 'claude', tarefa: 'lê' }] };
      seen.push(opts);
      return 'li';
    },
  });
  center.start('lê a pasta', [], { paths: [dir] });
  const run = await settle(center);
  assert.deepEqual(run.attachments, [{ path: dir, kind: 'folder' }]);
  assert.deepEqual(seen[0].addDirs, [dir], 'claude gets the attached folder');
  assert.equal(JSON.stringify(run).includes('"dirs"'), false, 'internal fields stay off the snapshot');
  assert.equal(center.start('x', [], { paths: [join(dir, '.env')] }).status, 400);
});

test('full access is only granted when asked: edits and commands, never wipes, pushes or secrets', async () => {
  const { askClaude, askGpt, planPrompt } = await import('../server/command.mjs');
  const calls = [];
  const run = async (cmd, args) => {
    calls.push(args);
    return JSON.stringify({ result: 'ok' });
  };
  await askClaude('p', { run });
  await askClaude('p', { run, full: true });
  const [ro, full] = calls;
  assert.ok(ro.includes('Read,Grep,Glob,WebSearch,WebFetch,Skill') && !ro.includes('acceptEdits'), 'read-only by default');
  assert.ok(ro.includes('--settings'), 'read-only runs without user hooks');
  assert.ok(full.includes('acceptEdits') && full.some((a) => /Bash/.test(a) && /Edit/.test(a)));
  for (const deny of ['Bash(rm -rf:*)', 'Bash(git push:*)', 'Read(**/.env*)', 'Bash(Remove-Item:*)']) assert.ok(full.includes(deny), deny);
  assert.ok(full.includes('project,local'), 'project hooks (safety guards) stay on');
  const gpt = [];
  await askGpt('p', { full: true, run: async (_c, args) => (gpt.push(args), '') }).catch(() => {});
  assert.ok(gpt[0].includes('workspace-write'));
  assert.match(planPrompt('x', [], [], true), /ACESSO TOTAL/);
  assert.match(planPrompt('x', [], [], false), /só leem/);
});
