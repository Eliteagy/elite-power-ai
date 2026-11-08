// Shared bits for the floating panels (Comando, Guia): dragging by the header, popping a panel
// out into its own desktop window, and the native bridge the Electron app exposes.

export interface NativeBridge {
  pick(kind: 'folder' | 'file'): Promise<string[]>;
  setOnTop(on: boolean): Promise<boolean>;
}

/** The Electron preload bridge (desktop/preload.cjs), or null in a normal browser. */
export function nativeBridge(): NativeBridge | null {
  return ((window as unknown as { agentFloor?: NativeBridge }).agentFloor as NativeBridge) || null;
}

/** Open a panel in its own window (the desktop app turns this into a small native window). */
export function popOut(panel: 'comando' | 'guia') {
  const w = panel === 'guia' ? 960 : 620;
  const h = panel === 'guia' ? 720 : 780;
  window.open(`/?app=1&panel=${panel}`, `agent-floor-${panel}`, `popup,width=${w},height=${h}`);
}

/**
 * Drag `panel` by `handle`. The position is kept (per key) in localStorage; double-clicking the
 * handle, or the returned function, puts the panel back where its CSS places it.
 */
export function makeDraggable(panel: HTMLElement, handle: HTMLElement, key: string) {
  handle.classList.add('drag-handle');
  handle.title = 'Arrastar para mover · duplo clique para voltar ao lugar';

  const place = (x: number, y: number) => {
    const r = panel.getBoundingClientRect();
    const maxX = Math.max(8, innerWidth - r.width - 8);
    const maxY = Math.max(8, innerHeight - 48);
    const left = Math.min(Math.max(8, x), maxX);
    const top = Math.min(Math.max(8, y), maxY);
    panel.classList.add('moved');
    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    return { left, top };
  };
  const reset = () => {
    panel.classList.remove('moved');
    panel.style.left = '';
    panel.style.top = '';
    try {
      localStorage.removeItem(key);
    } catch {
      /* storage unavailable */
    }
  };

  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null') as { left: number; top: number } | null;
    if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
      // Wait until the panel has a size before clamping it into the window.
      requestAnimationFrame(() => place(saved.left, saved.top));
    }
  } catch {
    /* no saved position */
  }

  handle.addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || (e.target as HTMLElement).closest('button, input, textarea, select, a')) return;
    const r = panel.getBoundingClientRect();
    const dx = e.clientX - r.left;
    const dy = e.clientY - r.top;
    handle.setPointerCapture(e.pointerId);
    panel.classList.add('dragging');
    let last = { left: r.left, top: r.top };
    const move = (ev: PointerEvent) => (last = place(ev.clientX - dx, ev.clientY - dy));
    const up = () => {
      panel.classList.remove('dragging');
      handle.removeEventListener('pointermove', move);
      handle.removeEventListener('pointerup', up);
      handle.removeEventListener('pointercancel', up);
      try {
        localStorage.setItem(key, JSON.stringify(last));
      } catch {
        /* storage unavailable: position lasts for this visit */
      }
    };
    handle.addEventListener('pointermove', move);
    handle.addEventListener('pointerup', up);
    handle.addEventListener('pointercancel', up);
  });
  handle.addEventListener('dblclick', (e) => {
    if ((e.target as HTMLElement).closest('button')) return;
    reset();
  });
  addEventListener('resize', () => {
    if (panel.classList.contains('moved')) place(panel.offsetLeft, panel.offsetTop);
  });
  return reset;
}
