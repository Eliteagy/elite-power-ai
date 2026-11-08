// The Alpaca PAPER account snapshot pushed by the floor server (SSE `trading`).
// Read-only: the browser never sees keys and never talks to Alpaca itself.

export interface TradingPosition {
  symbol: string;
  qty: number | null;
  avgEntry: number | null;
  price: number | null;
  unrealizedPL: number | null;
  unrealizedPLPct: number | null;
  marketValue: number | null;
}

export interface TradingOrder {
  symbol: string;
  side: string;
  qty: number | null;
  type: string;
  orderClass: string;
  status: string;
  filledAvgPrice: number | null;
  time: string | null;
}

export interface TradingSnapshot {
  ok: boolean;
  status: string;
  message?: string;
  updatedAt: number;
  account: {
    equity: number | null;
    cash: number | null;
    buyingPower: number | null;
    lastEquity: number | null;
    dayPL: number | null;
    dayPLPct: number | null;
    currency: string;
  } | null;
  market: { isOpen: boolean; nextOpen: string | null; nextClose: string | null } | null;
  positions: TradingPosition[];
  orders: TradingOrder[];
  history: number[];
}

const OFFLINE: TradingSnapshot = {
  ok: false,
  status: 'sem ligação',
  message: 'A aguardar o servidor',
  updatedAt: 0,
  account: null,
  market: null,
  positions: [],
  orders: [],
  history: [],
};

type Listener = (s: TradingSnapshot) => void;

class TradingStore {
  snapshot: TradingSnapshot = OFFLINE;
  private listeners = new Set<Listener>();

  set(s: TradingSnapshot) {
    if (!s || typeof s !== 'object') return;
    this.snapshot = { ...OFFLINE, ...s, positions: s.positions || [], orders: s.orders || [], history: s.history || [] };
    for (const l of this.listeners) l(this.snapshot);
  }

  subscribe(l: Listener) {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }
}

export const trading = new TradingStore();

// ---------------------------------------------------------------- formatting (pt-PT)

const money = new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 2 });
const plain = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 2 });

export const fmtMoney = (v: number | null | undefined) => (v == null ? '—' : money.format(v));
export const fmtNum = (v: number | null | undefined) => (v == null ? '—' : plain.format(v));
export const fmtSigned = (v: number | null | undefined) => (v == null ? '—' : `${v >= 0 ? '+' : '−'}${money.format(Math.abs(v))}`);
export const fmtPct = (v: number | null | undefined) => (v == null ? '—' : `${v >= 0 ? '+' : '−'}${plain.format(Math.abs(v))}%`);

const STATUS_PT: Record<string, string> = {
  new: 'nova',
  accepted: 'aceite',
  pending_new: 'pendente',
  held: 'em espera',
  filled: 'executada',
  partially_filled: 'parcial',
  canceled: 'cancelada',
  expired: 'expirada',
  rejected: 'rejeitada',
  replaced: 'substituída',
  done_for_day: 'fechada (dia)',
};
export const orderStatusPt = (s: string) => STATUS_PT[s] || s.replace(/_/g, ' ');
export const sidePt = (s: string) => (s === 'buy' ? 'COMPRA' : s === 'sell' ? 'VENDA' : s.toUpperCase());

/** "Mercado aberto" / "Fechado · abre qua 13:30" in the viewer's local time. */
export function marketLine(m: TradingSnapshot['market']) {
  if (!m) return 'Mercado: —';
  if (m.isOpen) return 'Mercado aberto';
  if (!m.nextOpen) return 'Mercado fechado';
  const d = new Date(m.nextOpen);
  const when = d.toLocaleString('pt-PT', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  return `Mercado fechado · abre ${when}`;
}
