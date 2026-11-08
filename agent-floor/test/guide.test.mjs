import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createGuide, loadProjects } from '../server/guide.mjs';
import { createCommandCenter } from '../server/command.mjs';
import { startServer } from '../server/index.mjs';

function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'guide-'));
  mkdirSync(join(dir, 'site-a'));
  const file = join(dir, 'projects.json');
  writeFileSync(file, JSON.stringify({ root: dir, projects: [
    { id: 'site-a', name: 'Site A', type: 'site', url: 'https://a.example', folder: 'site-a', keywords: ['a'] },
    { id: 'bad', name: 'Mau', url: 'javascript:alert(1)', folder: 'nope' },
    { id: 'Bad Id', name: 'x' },
    { id: 'site-a', name: 'duplicado' },
  ] }));
  return file;
}

test('projects are cleaned: bad ids, duplicates, non-http urls and missing folders', () => {
  const list = loadProjects(fixture());
  assert.deepEqual(list.map((p) => p.id), ['site-a', 'bad']);
  assert.equal(list[0].folderName, 'site-a');
  assert.equal(list[1].url, '', 'javascript: urls are dropped');
  assert.equal(list[1].folder, '', 'missing folders are dropped');
});

test('open only launches what projects.json says', () => {
  const launched = [];
  const guide = createGuide({ loader: () => loadProjects(fixture()), launch: (k, v) => launched.push([k, v]) });
  assert.deepEqual(guide.open('site-a', 'url'), { ok: true });
  assert.equal(guide.open('site-a', 'repo').status, 404);
  assert.equal(guide.open('nada', 'url').status, 404);
  assert.equal(guide.open('site-a', 'C:/Windows').status, 400);
  assert.ok(guide.open('site-a', 'folder').ok);
  assert.deepEqual(launched.map((x) => x[0]), ['url', 'folder']);
  assert.equal(launched[0][1], 'https://a.example/');
});

test('director can just open a project in the guide', async () => {
  const center = createCommandCenter({
    emit: () => {},
    log: () => {},
    agentsLoader: () => [],
    projects: () => [{ id: 'site-a', name: 'Site A', type: 'site', keywords: [] }],
    deps: {
      async askClaude(prompt, opts) {
        assert.ok(opts.schema.properties.abrir, 'schema lets the director open projects');
        assert.match(prompt, /site-a: Site A/);
        return { plano: 'Abrir', tarefas: [], abrir: ['site-a', 'inventado'] };
      },
    },
  });
  center.start('abre o site A');
  let run;
  for (let i = 0; i < 50 && (!run || run.phase === 'planning'); i++) {
    await new Promise((r) => setTimeout(r, 5));
    run = center.snapshot().run;
  }
  assert.equal(run.phase, 'done');
  assert.deepEqual(run.open, ['site-a']);
  assert.match(run.final, /Site A/);
});

test('guide routes refuse other origins', async () => {
  const launched = [];
  const guide = createGuide({ loader: () => loadProjects(fixture()), launch: (k, v) => launched.push(v) });
  const floor = await startServer({ port: 0, log: () => {}, trading: false, residents: [], command: false, guide });
  const base = `http://127.0.0.1:${floor.server.address().port}`;
  try {
    assert.equal((await fetch(`${base}/guide`, { headers: { Origin: 'http://localhost:3000' } })).status, 403);
    const evil = await fetch(`${base}/guide/open`, { method: 'POST', headers: { Origin: 'http://localhost:3000', 'Content-Type': 'application/json' }, body: '{"id":"site-a","target":"url"}' });
    assert.equal(evil.status, 403);
    assert.equal(launched.length, 0);
    const ok = await fetch(`${base}/guide/open`, { method: 'POST', headers: { Origin: base, 'Content-Type': 'application/json' }, body: '{"id":"site-a","target":"url"}' });
    assert.equal(ok.status, 200);
    const list = await (await fetch(`${base}/guide`)).json();
    assert.equal(list.projects[0].keywords, undefined);
  } finally {
    await floor.close();
  }
});
