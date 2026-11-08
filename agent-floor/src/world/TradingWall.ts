import { MeshBasicMaterial } from 'three';
import { fmtMoney, fmtNum, fmtPct, fmtSigned, marketLine, orderStatusPt, sidePt, trading, type TradingSnapshot } from '../core/trading';
import { fit, makeCanvas, MONO_FONT, UI_FONT } from './text';

// The video wall on the Trading floor: the Alpaca PAPER account, live.
// One canvas texture shared by every mesh that shows it; redrawn when data arrives.

const W = 1600;
const H = 800;
const GOLD = '#d4af37';
const UP = '#22c55e';
const DOWN = '#ef4444';
const MUTED = '#8a94a6';
const INK = '#f4f6f8';

/** Wall size in metres (keeps the canvas aspect). */
export const WALL_W = 4.4;
export const WALL_H = WALL_W * (H / W);

let wall: TradingWall | null = null;

/** The shared wall; created on first use and kept for the life of the page. */
export function tradingWall() {
  return (wall ??= new TradingWall());
}

class TradingWall {
  readonly material: MeshBasicMaterial;
  private ctx: CanvasRenderingContext2D;
  private texture;

  constructor() {
    const { ctx, texture } = makeCanvas(W, H);
    this.ctx = ctx;
    this.texture = texture;
    this.material = new MeshBasicMaterial({ map: texture, toneMapped: false });
    this.draw(trading.snapshot);
    trading.subscribe((s) => this.draw(s));
    // Relative bits (market countdown) stay fresh even when the data does not change.
    setInterval(() => this.draw(trading.snapshot), 60_000);
  }

  private draw(s: TradingSnapshot) {
    const c = this.ctx;
    c.save();
    c.fillStyle = '#0e1015';
    c.fillRect(0, 0, W, H);
    c.strokeStyle = GOLD;
    c.lineWidth = 8;
    c.strokeRect(14, 14, W - 28, H - 28);
    c.textBaseline = 'alphabetic';

    // Header: title + market status.
    c.fillStyle = GOLD;
    c.font = `800 50px ${UI_FONT}`;
    c.fillText('CONTA DEMO · ALPACA PAPER', 52, 92);
    const market = s.ok ? marketLine(s.market) : 'SEM LIGAÇÃO';
    const open = Boolean(s.ok && s.market?.isOpen);
    c.font = `600 32px ${UI_FONT}`;
    const mw = c.measureText(market).width;
    const px = W - 52 - mw - 64;
    c.fillStyle = open ? 'rgba(34,197,94,0.16)' : 'rgba(138,148,166,0.16)';
    c.beginPath();
    c.roundRect(px, 46, mw + 64, 60, 30);
    c.fill();
    c.fillStyle = open ? UP : s.ok ? MUTED : DOWN;
    c.beginPath();
    c.arc(px + 30, 76, 10, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = INK;
    c.fillText(market, px + 50, 87);
    c.fillStyle = 'rgba(212,175,55,0.35)';
    c.fillRect(52, 124, W - 104, 3);

    if (!s.ok || !s.account) {
      c.textAlign = 'center';
      c.fillStyle = DOWN;
      c.font = `800 110px ${UI_FONT}`;
      c.fillText('SEM LIGAÇÃO', W / 2, 420);
      c.fillStyle = MUTED;
      c.font = `500 40px ${UI_FONT}`;
      c.fillText(fit(c, s.message || 'Sem dados da Alpaca', W - 200), W / 2, 500);
      c.textAlign = 'left';
      this.footer(s);
      c.restore();
      this.texture.needsUpdate = true;
      return;
    }

    // Left: equity, day P&L, cash, sparkline.
    const a = s.account;
    c.fillStyle = MUTED;
    c.font = `600 32px ${UI_FONT}`;
    c.fillText('PATRIMÓNIO', 52, 190);
    c.fillStyle = INK;
    c.font = `800 112px ${UI_FONT}`;
    // Shrink to fit instead of cutting digits off.
    const eqW = c.measureText(fmtMoney(a.equity)).width;
    if (eqW > 740) c.font = `800 ${Math.floor((112 * 740) / eqW)}px ${UI_FONT}`;
    c.fillText(fit(c, fmtMoney(a.equity), 740), 48, 296);
    const pl = a.dayPL ?? 0;
    c.fillStyle = pl > 0 ? UP : pl < 0 ? DOWN : MUTED;
    c.font = `700 46px ${UI_FONT}`;
    c.fillText(`${pl >= 0 ? '▲' : '▼'} ${fmtSigned(a.dayPL)}  (${fmtPct(a.dayPLPct)}) hoje`, 52, 370);
    c.fillStyle = MUTED;
    c.font = `500 32px ${UI_FONT}`;
    c.fillText(`Liquidez ${fmtMoney(a.cash)}   ·   Poder de compra ${fmtMoney(a.buyingPower)}`, 52, 425);
    this.sparkline(s.history, 52, 470, 700, 260, pl);

    // Right: positions, then last orders.
    const x0 = 820;
    const x1 = W - 52;
    c.fillStyle = GOLD;
    c.font = `700 34px ${UI_FONT}`;
    c.fillText('POSIÇÕES', x0, 190);
    c.font = `600 24px ${UI_FONT}`;
    c.fillStyle = MUTED;
    const pcols = [x0, x0 + 170, x0 + 290, x0 + 460, x1];
    c.fillText('SÍMBOLO', pcols[0], 230);
    c.fillText('QTD', pcols[1], 230);
    c.fillText('P. MÉDIO', pcols[2], 230);
    c.fillText('ATUAL', pcols[3], 230);
    c.textAlign = 'right';
    c.fillText('P&L', pcols[4], 230);
    c.textAlign = 'left';
    const pos = s.positions.slice(0, 5);
    if (!pos.length) {
      c.fillStyle = MUTED;
      c.font = `500 32px ${UI_FONT}`;
      c.fillText('Sem posições abertas', x0, 282);
    }
    pos.forEach((p, i) => {
      const y = 280 + i * 44;
      c.font = `700 30px ${MONO_FONT}`;
      c.fillStyle = INK;
      c.fillText(p.symbol, pcols[0], y);
      c.font = `500 28px ${MONO_FONT}`;
      c.fillText(fmtNum(p.qty), pcols[1], y);
      c.fillText(fmtNum(p.avgEntry), pcols[2], y);
      c.fillText(fmtNum(p.price), pcols[3], y);
      c.textAlign = 'right';
      const v = p.unrealizedPLPct ?? 0;
      c.fillStyle = v > 0 ? UP : v < 0 ? DOWN : MUTED;
      c.fillText(fmtPct(p.unrealizedPLPct), pcols[4], y);
      c.textAlign = 'left';
    });

    const oy = 280 + Math.max(1, pos.length) * 44 + 40;
    c.fillStyle = GOLD;
    c.font = `700 34px ${UI_FONT}`;
    c.fillText('ÚLTIMAS ORDENS', x0, oy);
    const orders = s.orders.slice(0, Math.max(1, Math.floor((H - 70 - oy) / 42)));
    if (!orders.length) {
      c.fillStyle = MUTED;
      c.font = `500 32px ${UI_FONT}`;
      c.fillText('Sem ordens', x0, oy + 52);
    }
    orders.forEach((o, i) => {
      const y = oy + 50 + i * 42;
      const t = o.time ? new Date(o.time) : null;
      c.font = `500 26px ${MONO_FONT}`;
      c.fillStyle = MUTED;
      c.fillText(t ? t.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }) : '--:--', x0, y);
      c.font = `700 26px ${UI_FONT}`;
      c.fillStyle = o.side === 'buy' ? UP : o.side === 'sell' ? DOWN : INK;
      c.fillText(sidePt(o.side), x0 + 100, y);
      c.fillStyle = INK;
      c.font = `600 28px ${MONO_FONT}`;
      c.fillText(`${fmtNum(o.qty)} ${o.symbol}`, x0 + 230, y);
      c.font = `500 24px ${UI_FONT}`;
      c.fillStyle = MUTED;
      c.fillText(o.type, x0 + 400, y);
      c.textAlign = 'right';
      c.fillStyle = o.status === 'filled' ? UP : o.status === 'rejected' || o.status === 'canceled' ? DOWN : INK;
      const st = o.filledAvgPrice != null ? `${orderStatusPt(o.status)} @ ${fmtNum(o.filledAvgPrice)}` : orderStatusPt(o.status);
      c.fillText(fit(c, st, 260), x1, y);
      c.textAlign = 'left';
    });

    this.footer(s);
    c.restore();
    this.texture.needsUpdate = true;
  }

  private sparkline(points: number[], x: number, y: number, w: number, h: number, pl: number) {
    const c = this.ctx;
    c.fillStyle = 'rgba(255,255,255,0.03)';
    c.beginPath();
    c.roundRect(x, y, w, h, 18);
    c.fill();
    c.fillStyle = MUTED;
    c.font = `600 22px ${UI_FONT}`;
    c.fillText('HOJE · 5 MIN', x + 20, y + 36);
    if (points.length < 2) {
      c.font = `500 28px ${UI_FONT}`;
      c.fillText('Sem histórico ainda', x + 20, y + h / 2 + 20);
      return;
    }
    let lo = Math.min(...points);
    let hi = Math.max(...points);
    // Flat lines sit in the middle instead of hugging an edge.
    if (hi - lo < 1e-6) {
      lo -= 1;
      hi += 1;
    }
    const px = (i: number) => x + 20 + (i / (points.length - 1)) * (w - 40);
    const py = (v: number) => y + h - 24 - ((v - lo) / (hi - lo)) * (h - 80);
    const color = pl > 0 ? UP : pl < 0 ? DOWN : GOLD;
    const g = c.createLinearGradient(0, y + 50, 0, y + h);
    g.addColorStop(0, pl > 0 ? 'rgba(34,197,94,0.28)' : pl < 0 ? 'rgba(239,68,68,0.28)' : 'rgba(212,175,55,0.25)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    c.beginPath();
    points.forEach((v, i) => (i ? c.lineTo(px(i), py(v)) : c.moveTo(px(i), py(v))));
    c.lineTo(px(points.length - 1), y + h - 12);
    c.lineTo(px(0), y + h - 12);
    c.closePath();
    c.fillStyle = g;
    c.fill();
    c.beginPath();
    points.forEach((v, i) => (i ? c.lineTo(px(i), py(v)) : c.moveTo(px(i), py(v))));
    c.strokeStyle = color;
    c.lineWidth = 5;
    c.lineJoin = 'round';
    c.stroke();
  }

  private footer(s: TradingSnapshot) {
    const c = this.ctx;
    c.font = `500 22px ${UI_FONT}`;
    c.fillStyle = MUTED;
    c.textAlign = 'right';
    const when = s.updatedAt ? new Date(s.updatedAt).toLocaleTimeString('pt-PT') : '—';
    c.fillText(`Atualizado ${when} · só leitura · dinheiro fictício`, W - 52, H - 36);
    c.textAlign = 'left';
  }
}
