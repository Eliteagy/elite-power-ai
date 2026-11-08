import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { buildSnapshot, createTradingPoller, loadCredentials, parseEnv } from '../server/trading.mjs';
import { loadResidents, startServer } from '../server/index.mjs';

const dir = mkdtempSync(join(tmpdir(), 'af-trading-'));
const envFile = (name, text) => {
  const f = join(dir, name);
  writeFileSync(f, text);
  return f;
};
const GOOD = envFile('good.env', '# demo\nALPACA_API_KEY=PKTESTKEY\nALPACA_SECRET_KEY= s3cr3t-value \nALPACA_PAPER_TRADE=true\n');

test('parseEnv trims values and skips comments', () => {
  assert.deepEqual(parseEnv('# x\nA= 1 \nB="two"\n\nbad line\n'), { A: '1', B: 'two' });
});

test('loadCredentials refuses live keys, missing paper flag and missing file', () => {
  assert.equal(loadCredentials(GOOD).key, 'PKTESTKEY');
  assert.equal(loadCredentials(GOOD).secret, 's3cr3t-value');
  assert.match(loadCredentials(envFile('live.env', 'ALPACA_API_KEY=AKLIVE\nALPACA_SECRET_KEY=x\nALPACA_PAPER_TRADE=true')).error, /paper/);
  assert.match(loadCredentials(envFile('flag.env', 'ALPACA_API_KEY=PKX\nALPACA_SECRET_KEY=x\nALPACA_PAPER_TRADE=false')).error, /recusado/);
  assert.ok(loadCredentials(join(dir, 'nope.env')).error);
});

test('poller only GETs the paper host and never leaks keys', async () => {
  const calls = [];
  const fakeFetch = async (url, opts) => {
    calls.push({ url, method: opts.method });
    const path = new URL(url).pathname;
    const body =
      path === '/v2/account'
        ? { equity: '101000', last_equity: '100000', cash: '50000', buying_power: '200000', currency: 'USD' }
        : path === '/v2/positions'
          ? [{ symbol: 'SPY', qty: '2', avg_entry_price: '500', current_price: '510', unrealized_pl: '20', unrealized_plpc: '0.02' }]
          : path === '/v2/orders'
            ? [{ symbol: 'SPY', side: 'buy', qty: '1', type: 'market', order_class: 'bracket', status: 'accepted', submitted_at: '2026-10-28T02:02:50Z' }]
            : path === '/v2/clock'
              ? { is_open: false, next_open: '2026-10-28T09:30:00-04:00' }
              : { equity: [100000, null, 100500, 101000] };
    return { ok: true, status: 200, json: async () => body };
  };
  const logs = [];
  const poller = createTradingPoller({ file: GOOD, fetchImpl: fakeFetch, log: (m) => logs.push(m) });
  const snap = await poller.poll();
  assert.equal(calls.length, 5);
  for (const c of calls) {
    assert.equal(c.method, 'GET');
    assert.ok(c.url.startsWith('https://paper-api.alpaca.markets/v2/'), c.url);
  }
  assert.equal(snap.ok, true);
  assert.equal(snap.account.dayPL, 1000);
  assert.equal(snap.account.dayPLPct, 1);
  assert.equal(snap.positions[0].unrealizedPLPct, 2);
  assert.equal(snap.orders[0].status, 'accepted');
  assert.deepEqual(snap.history, [100000, 100500, 101000]);
  const text = JSON.stringify(snap) + logs.join('\n');
  assert.ok(!text.includes('PKTESTKEY') && !text.includes('s3cr3t'), 'keys never leave the server module');
});

test('poller reports "sem ligação" without keys and without calling out', async () => {
  let called = false;
  const poller = createTradingPoller({ file: join(dir, 'missing.env'), fetchImpl: async () => ((called = true), null), log: () => {} });
  const snap = await poller.poll();
  assert.equal(snap.ok, false);
  assert.equal(snap.status, 'sem ligação');
  assert.equal(called, false);
});

test('buildSnapshot tolerates empty responses', () => {
  const s = buildSnapshot({});
  assert.equal(s.ok, true);
  assert.deepEqual(s.positions, []);
  assert.equal(s.account.dayPL, null);
});

test('server exposes /trading.json from the poller', async () => {
  const fake = { snapshot: { ok: false, status: 'sem ligação', message: 'teste' }, start() {}, stop() {}, wake() {} };
  const floor = await startServer({ port: 0, log: () => {}, residents: [], trading: fake });
  try {
    const { port } = floor.server.address();
    const res = await fetch(`http://127.0.0.1:${port}/trading.json`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).message, 'teste');
  } finally {
    await floor.close();
  }
});

test('residents accept named characters (the Professor)', () => {
  const f = envFile('res.json', JSON.stringify({ teams: [{ team: 'Trading Formacao', role: 'aluno', skills: [{ name: 'Professor', role: 'professor' }, 'aprender-investimento'] }] }));
  const list = loadResidents(f, () => {});
  assert.equal(list.length, 2);
  assert.equal(list[0].name, 'Professor');
  assert.equal(list[0].role, 'professor');
  assert.equal(list[1].role, 'aluno');
});
