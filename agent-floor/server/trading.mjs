// Read-only poller for the Alpaca PAPER account, shown on the Trading floor.
//
// Safety rules (do not relax):
//   - Only the paper host is ever called; it is hard-coded below.
//   - GET requests only. Nothing here can place, change or cancel an order.
//   - The key file must hold a paper key (starts with "PK") and ALPACA_PAPER_TRADE=true.
//   - Keys never leave this module: not in the snapshot, not in logs, not in errors.
import { readFileSync } from 'node:fs';

const PAPER_HOST = 'https://paper-api.alpaca.markets';
const DEFAULT_ENV = 'C:\\Users\\Goldrajch\\Documents\\apps e wb sites ai\\Elite Agency\\Investimentos\\alpaca.env';
const PATHS = {
  account: '/v2/account',
  positions: '/v2/positions',
  orders: '/v2/orders?status=all&limit=10',
  clock: '/v2/clock',
  history: '/v2/account/portfolio/history?period=1D&timeframe=5Min',
};

/** Parse KEY=value lines. Values are trimmed; quotes and comments are ignored. */
export function parseEnv(text) {
  const out = {};
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq < 1) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1).trim();
    out[key] = value;
  }
  return out;
}

/** Load and validate the paper credentials. Returns { key, secret } or { error }. */
export function loadCredentials(file) {
  let env;
  try {
    env = parseEnv(readFileSync(file, 'utf8'));
  } catch (err) {
    return { error: err.code === 'ENOENT' ? 'Ficheiro de chaves não encontrado' : 'Não foi possível ler o ficheiro de chaves' };
  }
  const key = env.ALPACA_API_KEY || '';
  const secret = env.ALPACA_SECRET_KEY || '';
  if (!key || !secret) return { error: 'Chaves em falta no ficheiro' };
  if (!key.startsWith('PK')) return { error: 'A chave não é de conta paper (PK…): recusado' };
  if (String(env.ALPACA_PAPER_TRADE || '').toLowerCase() !== 'true') return { error: 'ALPACA_PAPER_TRADE não está a true: recusado' };
  return { key, secret };
}

const num = (v) => {
  const n = typeof v === 'number' ? v : parseFloat(v);
  return Number.isFinite(n) ? n : null;
};

/** Turn raw Alpaca responses into the small, key-free object the browser sees. */
export function buildSnapshot({ account, positions, orders, clock, history }, now = Date.now()) {
  const equity = num(account?.equity);
  const lastEquity = num(account?.last_equity);
  const dayPL = equity !== null && lastEquity !== null ? equity - lastEquity : null;
  const points = Array.isArray(history?.equity) ? history.equity.map(num).filter((v) => v !== null && v > 0) : [];
  return {
    ok: true,
    status: 'ligado',
    updatedAt: now,
    account: {
      equity,
      cash: num(account?.cash),
      buyingPower: num(account?.buying_power),
      lastEquity,
      dayPL,
      dayPLPct: dayPL !== null && lastEquity ? (dayPL / lastEquity) * 100 : null,
      currency: typeof account?.currency === 'string' ? account.currency.slice(0, 8) : 'USD',
    },
    market: {
      isOpen: Boolean(clock?.is_open),
      nextOpen: typeof clock?.next_open === 'string' ? clock.next_open : null,
      nextClose: typeof clock?.next_close === 'string' ? clock.next_close : null,
    },
    positions: (Array.isArray(positions) ? positions : []).slice(0, 20).map((p) => ({
      symbol: String(p.symbol || '').slice(0, 16),
      qty: num(p.qty),
      avgEntry: num(p.avg_entry_price),
      price: num(p.current_price),
      unrealizedPL: num(p.unrealized_pl),
      unrealizedPLPct: num(p.unrealized_plpc) !== null ? num(p.unrealized_plpc) * 100 : null,
      marketValue: num(p.market_value),
    })),
    orders: (Array.isArray(orders) ? orders : []).slice(0, 10).map((o) => ({
      symbol: String(o.symbol || '').slice(0, 16),
      side: String(o.side || '').slice(0, 8),
      qty: num(o.qty),
      type: String(o.type || '').slice(0, 16),
      orderClass: String(o.order_class || '').slice(0, 16),
      status: String(o.status || '').slice(0, 24),
      filledAvgPrice: num(o.filled_avg_price),
      time: o.filled_at || o.submitted_at || o.created_at || null,
    })),
    history: points.slice(-120),
  };
}

export function offlineSnapshot(message, now = Date.now()) {
  return { ok: false, status: 'sem ligação', message, updatedAt: now, account: null, market: null, positions: [], orders: [], history: [] };
}

/**
 * Poll the paper account every `intervalMs` while `active()` says someone is watching.
 * `onUpdate(snapshot)` fires after every poll.
 */
export function createTradingPoller({
  file = process.env.AGENT_FLOOR_ALPACA_ENV || DEFAULT_ENV,
  intervalMs = 15000,
  fetchImpl = globalThis.fetch,
  log = console.log,
  onUpdate = () => {},
  active = () => true,
} = {}) {
  let snapshot = offlineSnapshot('A ligar…', 0);
  let timer = null;
  let busy = false;
  let lastError = '';

  async function get(path, creds) {
    // Hard-coded paper host + GET only. The path table above is the whole surface.
    const res = await fetchImpl(PAPER_HOST + path, {
      method: 'GET',
      headers: { 'APCA-API-KEY-ID': creds.key, 'APCA-API-SECRET-KEY': creds.secret, Accept: 'application/json' },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Alpaca respondeu ${res.status}`);
    return res.json();
  }

  async function poll() {
    if (busy) return snapshot;
    busy = true;
    try {
      const creds = loadCredentials(file);
      if (creds.error) {
        snapshot = offlineSnapshot(creds.error);
      } else {
        const [account, positions, orders, clock, history] = await Promise.all([
          get(PATHS.account, creds),
          get(PATHS.positions, creds),
          get(PATHS.orders, creds),
          get(PATHS.clock, creds),
          get(PATHS.history, creds).catch(() => null),
        ]);
        snapshot = buildSnapshot({ account, positions, orders, clock, history });
      }
    } catch (err) {
      // Only our own messages or network error names: never the request or its headers.
      const msg = /^Alpaca respondeu \d+$/.test(err?.message) ? err.message : err?.name === 'TimeoutError' ? 'Tempo esgotado' : 'Erro de rede';
      snapshot = offlineSnapshot(msg);
    } finally {
      busy = false;
    }
    if (!snapshot.ok && snapshot.message !== lastError) log(`Agent Floor trading: ${snapshot.message}`);
    lastError = snapshot.ok ? '' : snapshot.message;
    onUpdate(snapshot);
    return snapshot;
  }

  function tick() {
    if (active()) poll();
  }

  return {
    get snapshot() {
      return snapshot;
    },
    poll,
    /** Poll now (if someone is watching) and keep polling. */
    start() {
      if (timer) return;
      tick();
      timer = setInterval(tick, intervalMs);
      timer.unref?.();
    },
    /** Someone just connected: refresh soon if the data is stale. */
    wake() {
      if (Date.now() - snapshot.updatedAt > intervalMs / 2) poll();
    },
    stop() {
      clearInterval(timer);
      timer = null;
    },
  };
}
