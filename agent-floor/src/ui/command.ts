import { icon } from './icons';
import { makeDraggable, nativeBridge, popOut } from './window';

// Command panel: the Gui types one order, the Diretor IA (server/command.mjs) splits it
// across GPT, Gemini, Claude and the Claude Code agents, and the answer comes back here.
// "3 IAs" mode sends the same order to GPT, Gemini and Claude at once and shows them side by
// side. Folders and files from the PC can be attached (workers only read them). The panel can
// be dragged, or popped out into its own window on the desktop (?panel=comando).
// The floor itself shows the work (Direcao Comando office, floor 9). All model output is
// untrusted text: it is only ever written with textContent.

interface Worker {
  id: string;
  kind: 'gpt' | 'gemini' | 'claude' | 'agent';
  label: string;
  description?: string;
}

interface Step {
  n: number;
  worker: string;
  kind: Worker['kind'];
  label: string;
  task: string;
  status: 'queued' | 'working' | 'done' | 'error' | 'cancelled';
  output: string;
  error: string;
  startedAt?: number;
  endedAt?: number;
}

type Mode = 'diretor' | 'comparar';

interface Run {
  id: string;
  text: string;
  mode?: Mode;
  full?: boolean;
  phase: 'planning' | 'working' | 'synth' | 'done' | 'error' | 'cancelled';
  plan: string;
  open?: string[];
  attachments?: { path: string; kind: 'folder' | 'file' }[];
  steps: Step[];
  final: string;
  error: string;
  startedAt: number;
  endedAt?: number;
  updatedAt: number;
}

const ACTIVE = new Set(['planning', 'working', 'synth']);
const STEP_LABEL: Record<Step['status'], string> = { queued: 'Na fila', working: 'A trabalhar', done: 'Feito', error: 'Falhou', cancelled: 'Cancelado' };
const DIRECTION_FLOOR = 9;
const THREE = ['gpt', 'gemini', 'claude'];

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

function dur(ms: number) {
  const s = Math.max(0, Math.round(ms / 1000));
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
}

const baseName = (p: string) => p.split(/[\\/]/).filter(Boolean).pop() || p;

function iconBtn(name: Parameters<typeof icon>[0], label: string, fn: () => void) {
  const b = el('button', 'icon-btn') as HTMLButtonElement;
  b.type = 'button';
  b.innerHTML = icon(name);
  b.title = label;
  b.setAttribute('aria-label', label);
  b.addEventListener('click', fn);
  return b;
}

export class CommandPanel {
  private root = el('section', 'cmd glass');
  private input = el('textarea', 'cmd-input') as HTMLTextAreaElement;
  private modes = el('div', 'cmd-modes');
  private chips = el('div', 'cmd-chips');
  private agentList = el('div', 'cmd-agents');
  private files = el('div', 'cmd-files');
  private sendBtn = el('button', 'cmd-send') as HTMLButtonElement;
  private status = el('div', 'cmd-status');
  private body = el('div', 'cmd-body');
  private workers: Worker[] = [];
  private picked = new Set<string>();
  private mode: Mode = 'diretor';
  /** "Acesso total" for the next orders: workers may edit files and run commands. Not saved. */
  private full = false;
  private micBtn = el('button', 'cmd-mic') as HTMLButtonElement;
  private recorder: MediaRecorder | null = null;
  private recordStart = 0;
  private recordTimer: number | undefined;
  private paths: string[] = [];
  private run: Run | null = null;
  private runKey = '';
  private open = false;
  private timer: number | undefined;
  private showAgents = false;
  private expanded = new Set<number>();
  /** Runs whose projects were already shown in the Guia (each run opens it once). */
  private shownRuns = new Set<string>();
  private firstLoad = true;
  private resetPosition: () => void = () => {};

  constructor(
    container: HTMLElement,
    private opts: {
      goToFloor(n: number): void;
      onToggle?(open: boolean): void;
      onOpenProjects?(ids: string[]): void;
      /** Running alone in its own window (?panel=comando). */
      popout?: boolean;
    },
  ) {
    this.root.setAttribute('aria-label', 'Comando');
    this.root.hidden = true;
    if (opts.popout) this.root.classList.add('popout');

    const head = el('header', 'cmd-head');
    const title = el('div', 'cmd-title');
    title.innerHTML = `${icon('robot')}<span><b>Comando</b><small>O Diretor IA divide a ordem pela equipa</small></span>`;
    const tools = el('div', 'cmd-tools');
    if (opts.popout) {
      if (nativeBridge()) {
        const pin = iconBtn('pushPin', 'Manter por cima das outras janelas', async () => {
          const on = await nativeBridge()!.setOnTop(!pin.classList.contains('active'));
          pin.classList.toggle('active', on);
        });
        tools.append(pin);
      }
    } else {
      tools.append(
        iconBtn('arrowSquareOut', 'Abrir numa janela própria', () => {
          popOut('comando');
          this.toggle(false);
        }),
        iconBtn('x', 'Fechar (Esc)', () => this.toggle(false)),
      );
    }
    head.append(title, tools);

    this.input.rows = 2;
    this.input.placeholder = 'Ex.: Pede ao GPT e ao Gemini 3 ideias de reels para a Sofia Martins e escolhe a melhor';
    this.input.setAttribute('aria-label', 'Ordem');
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.submit();
      } else if (e.key === 'Escape' && !opts.popout) {
        e.preventDefault();
        this.toggle(false);
      }
    });

    this.sendBtn.type = 'button';
    this.sendBtn.addEventListener('click', () => (this.isRunning() ? this.cancel() : this.submit()));
    this.micBtn.type = 'button';
    this.micBtn.addEventListener('click', () => void this.toggleMic());
    this.renderMic();
    const row = el('div', 'cmd-row');
    row.append(this.input, this.micBtn, this.sendBtn);

    this.status.setAttribute('aria-live', 'polite');
    this.root.append(head, this.modes, row, this.files, this.chips, this.agentList, this.status, this.body);
    container.append(this.root);
    if (!opts.popout) this.resetPosition = makeDraggable(this.root, head, 'agent-floor:cmd-pos');

    if (!opts.popout) {
      addEventListener('keydown', (e) => {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.metaKey || e.ctrlKey || e.altKey) return;
        if (e.key === 'c' || e.key === 'C') {
          e.preventDefault();
          this.toggle();
        }
      });
    }
    this.renderModes();
    this.renderFiles();
    this.renderButton();
    void this.refresh();
    if (opts.popout) this.toggle(true);
  }

  isOpen() {
    return this.open;
  }

  toggle(next = !this.open) {
    if (this.opts.popout) next = true;
    this.open = next;
    this.root.hidden = !next;
    this.opts.onToggle?.(next);
    if (next) {
      void this.refresh();
      requestAnimationFrame(() => this.input.focus());
      // Load the speech model in the background so the first dictation is quick.
      void fetch('/command/warm', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }).catch(() => {});
    }
    this.schedule();
  }

  // ---------------------------------------------------------------- microphone

  private renderMic() {
    const rec = Boolean(this.recorder);
    const busy = this.micBtn.classList.contains('busy');
    this.micBtn.classList.toggle('rec', rec);
    this.micBtn.innerHTML = `${icon(rec ? 'microphoneFill' : 'microphone')}<span class="cmd-mic-time"></span>`;
    const label = rec ? 'Parar e transcrever' : busy ? 'A transcrever…' : 'Falar (o texto aparece na caixa)';
    this.micBtn.title = label;
    this.micBtn.setAttribute('aria-label', label);
    this.micBtn.setAttribute('aria-pressed', String(rec));
  }

  private async toggleMic() {
    if (this.recorder) {
      this.recorder.stop();
      return;
    }
    if (this.micBtn.classList.contains('busy')) return;
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    } catch {
      this.status.textContent = 'Sem acesso ao microfone. Verifica as permissões do Windows.';
      this.status.className = 'cmd-status error';
      return;
    }
    const type = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : '';
    const rec = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    const chunks: Blob[] = [];
    rec.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      window.clearInterval(this.recordTimer);
      this.recorder = null;
      void this.transcribe(new Blob(chunks, { type: rec.mimeType || 'audio/webm' }));
    };
    this.recorder = rec;
    this.recordStart = Date.now();
    rec.start(250);
    this.renderMic();
    this.status.textContent = 'A ouvir… carrega outra vez no microfone para terminar.';
    this.status.className = 'cmd-status';
    const time = () => {
      const t = this.micBtn.querySelector('.cmd-mic-time');
      if (t) t.textContent = dur(Date.now() - this.recordStart);
      // Safety stop after 3 minutes.
      if (Date.now() - this.recordStart > 180_000) this.recorder?.stop();
    };
    time();
    this.recordTimer = window.setInterval(time, 500);
  }

  private async transcribe(blob: Blob) {
    if (blob.size < 2000) {
      this.renderMic();
      this.status.textContent = 'Não apanhei nada. Tenta outra vez.';
      return;
    }
    this.micBtn.classList.add('busy');
    this.renderMic();
    this.status.textContent = 'A transcrever no teu PC…';
    try {
      const buf = new Uint8Array(await blob.arrayBuffer());
      let bin = '';
      for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
      const res = await fetch('/command/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audio: btoa(bin), language: 'pt' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
      const text = String(data.text || '').trim();
      if (!text) throw new Error('Não percebi nada. Tenta outra vez, mais perto do microfone.');
      this.input.value = this.input.value.trim() ? `${this.input.value.trim()} ${text}` : text;
      this.input.focus();
      this.status.textContent = 'Revê o texto e carrega Enter para enviar.';
      this.status.className = 'cmd-status';
    } catch (err) {
      this.status.textContent = (err as Error).message;
      this.status.className = 'cmd-status error';
    } finally {
      this.micBtn.classList.remove('busy');
      this.renderMic();
    }
  }

  /** Open in "3 IAs" mode: GPT, Gemini and Claude answer the same order at once. */
  openThree() {
    this.setMode('comparar');
    this.toggle(true);
  }

  /** Put the panel back in its place at the bottom of the screen. */
  dock() {
    this.resetPosition();
  }

  private isRunning() {
    return Boolean(this.run && ACTIVE.has(this.run.phase));
  }

  // ---------------------------------------------------------------- mode

  private setMode(mode: Mode) {
    this.mode = mode;
    if (mode === 'comparar') {
      this.picked = new Set(THREE.filter((id) => !this.workers.length || this.workers.some((w) => w.id === id)));
      this.showAgents = false;
    } else this.picked.clear();
    this.renderModes();
    this.renderChips();
  }

  private renderModes() {
    const tab = (mode: Mode, label: string, ico: Parameters<typeof icon>[0], hint: string) => {
      const b = el('button', `cmd-mode${this.mode === mode ? ' active' : ''}`) as HTMLButtonElement;
      b.type = 'button';
      b.title = hint;
      b.setAttribute('aria-pressed', String(this.mode === mode));
      b.innerHTML = `${icon(ico)}<span></span>`;
      b.querySelector('span')!.textContent = label;
      b.addEventListener('click', () => this.setMode(mode));
      return b;
    };
    this.modes.replaceChildren(
      tab('diretor', 'Diretor', 'robot', 'O Diretor divide a ordem e escolhe quem trabalha'),
      tab('comparar', '3 IAs ao mesmo tempo', 'columns', 'GPT, Gemini e Claude respondem à mesma ordem, lado a lado'),
    );
  }

  // ---------------------------------------------------------------- attachments

  private renderFiles() {
    const bridge = nativeBridge();
    const add = (kind: 'folder' | 'file') => async () => {
      if (bridge) {
        const chosen = await bridge.pick(kind);
        this.addPaths(chosen);
      } else {
        // In a normal browser there is no native picker: paste the path instead.
        const typed = window.prompt(kind === 'folder' ? 'Caminho da pasta (ex.: C:\\Users\\...\\site)' : 'Caminho do ficheiro');
        if (typed) this.addPaths([typed.trim().replace(/^"|"$/g, '')]);
      }
    };
    const btn = (label: string, ico: Parameters<typeof icon>[0], fn: () => void) => {
      const b = el('button', 'cmd-attach') as HTMLButtonElement;
      b.type = 'button';
      b.innerHTML = `${icon(ico)}<span></span>`;
      b.querySelector('span')!.textContent = label;
      b.addEventListener('click', fn);
      return b;
    };
    const chips = this.paths.map((p) => {
      const c = el('span', 'cmd-file');
      c.title = p;
      c.append(el('span', '', baseName(p)));
      const x = el('button', 'cmd-file-x') as HTMLButtonElement;
      x.type = 'button';
      x.innerHTML = icon('x');
      x.setAttribute('aria-label', `Tirar ${baseName(p)}`);
      x.addEventListener('click', () => {
        this.paths = this.paths.filter((q) => q !== p);
        this.renderFiles();
      });
      c.append(x);
      return c;
    });
    const full = btn(this.full ? 'Acesso total ligado' : 'Acesso total', 'lockOpen', () => {
      this.full = !this.full;
      this.renderFiles();
      this.status.className = this.full ? 'cmd-status warn' : 'cmd-status';
      this.status.textContent = this.full
        ? 'Acesso total: o Claude e o GPT podem criar e editar ficheiros e correr comandos nas pastas do projeto. Nunca apagam em massa, não fazem push nem publicam, não mandam mensagens.'
        : 'Só leitura: os funcionários leem e escrevem texto.';
    });
    full.classList.add('cmd-full');
    full.classList.toggle('on', this.full);
    full.setAttribute('aria-pressed', String(this.full));
    this.files.replaceChildren(btn('Pasta', 'folderSimple', add('folder')), btn('Ficheiro', 'fileText', add('file')), ...chips, full);
  }

  private addPaths(list: string[]) {
    for (const p of list) if (p && !this.paths.includes(p) && this.paths.length < 8) this.paths.push(p);
    this.renderFiles();
  }

  // ---------------------------------------------------------------- server

  private schedule() {
    window.clearTimeout(this.timer);
    if (this.isRunning()) this.timer = window.setTimeout(() => void this.refresh(), 1200);
    else if (this.open) this.timer = window.setTimeout(() => void this.refresh(), 15000);
  }

  private async refresh() {
    try {
      const res = await fetch('/command', { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { run: Run | null; workers: Worker[] };
      this.setWorkers(data.workers || []);
      this.setRun(data.run);
    } catch {
      this.status.textContent = 'Sem ligação ao servidor do Agent Floor.';
      this.status.className = 'cmd-status error';
    }
    this.schedule();
  }

  private async submit() {
    const text = this.input.value.trim();
    if (!text || this.isRunning()) return;
    this.sendBtn.disabled = true;
    try {
      const res = await fetch('/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, workers: [...this.picked], paths: this.paths, mode: this.mode, full: this.full }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
      this.input.value = '';
      this.expanded.clear();
      this.setRun(data.run);
      this.opts.goToFloor(DIRECTION_FLOOR);
    } catch (err) {
      this.status.textContent = (err as Error).message;
      this.status.className = 'cmd-status error';
    } finally {
      this.sendBtn.disabled = false;
      this.schedule();
    }
  }

  private async cancel() {
    try {
      await fetch('/command/cancel', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' });
    } finally {
      void this.refresh();
    }
  }

  // ---------------------------------------------------------------- workers

  private setWorkers(list: Worker[]) {
    const key = list.map((w) => w.id).join(',');
    if (key === this.chips.dataset.key) return;
    this.chips.dataset.key = key;
    this.workers = list;
    for (const id of [...this.picked]) if (!list.some((w) => w.id === id)) this.picked.delete(id);
    this.renderChips();
  }

  private chip(label: string, active: boolean, title: string, fn: () => void, cls = '') {
    const b = el('button', `cmd-chip${active ? ' active' : ''}${cls}`, label) as HTMLButtonElement;
    b.type = 'button';
    b.title = title;
    b.setAttribute('aria-pressed', String(active));
    b.addEventListener('click', fn);
    return b;
  }

  private renderChips() {
    const flip = (id: string) => {
      if (this.picked.has(id)) this.picked.delete(id);
      else this.picked.add(id);
      this.renderChips();
    };
    const models = this.workers.filter((w) => w.kind !== 'agent');
    if (this.mode === 'comparar') {
      // Compare mode: pick which of the models answer (all three by default).
      this.chips.replaceChildren(...models.map((w) => this.chip(w.label, this.picked.has(w.id), w.description || w.label, () => flip(w.id), ` k-${w.kind}`)));
      this.agentList.hidden = true;
      return;
    }
    this.chips.replaceChildren(
      this.chip('Diretor escolhe', this.picked.size === 0, 'O Diretor escolhe quem trabalha', () => {
        this.picked.clear();
        this.renderChips();
      }),
      ...models.map((w) => this.chip(w.label, this.picked.has(w.id), w.description || w.label, () => flip(w.id), ` k-${w.kind}`)),
    );
    const agents = this.workers.filter((w) => w.kind === 'agent');
    const pickedAgents = agents.filter((w) => this.picked.has(w.id)).length;
    if (agents.length) {
      const more = this.chip(`Agentes${pickedAgents ? ` · ${pickedAgents}` : ''} ${this.showAgents ? '▴' : '▾'}`, pickedAgents > 0, 'Escolher agentes do Claude Code', () => {
        this.showAgents = !this.showAgents;
        this.renderChips();
      });
      this.chips.append(more);
    }
    this.agentList.hidden = !this.showAgents;
    this.agentList.replaceChildren(...agents.map((w) => this.chip(w.label, this.picked.has(w.id), w.description || w.label, () => flip(w.id), ' k-agent')));
  }

  // ---------------------------------------------------------------- run

  private renderButton() {
    const running = this.isRunning();
    this.sendBtn.innerHTML = `${icon(running ? 'stop' : 'send')}<span>${running ? 'Parar' : 'Enviar'}</span>`;
    this.sendBtn.classList.toggle('stop', running);
    this.sendBtn.setAttribute('aria-label', running ? 'Parar a ordem' : 'Enviar ordem (Enter)');
  }

  private setRun(run: Run | null) {
    this.run = run;
    // The Diretor named projects: open the Guia on them (once per run, not for an old run on reload).
    if (run?.open?.length && !this.shownRuns.has(run.id)) {
      this.shownRuns.add(run.id);
      if (!this.firstLoad || ACTIVE.has(run.phase)) this.opts.onOpenProjects?.(run.open);
    }
    this.firstLoad = false;
    this.renderButton();
    this.root.classList.toggle('running', this.isRunning());
    const key = run ? `${run.id}:${run.updatedAt}:${run.phase}` : '';
    if (key === this.runKey) return this.renderStatus();
    this.runKey = key;
    this.renderStatus();
    this.renderBody();
  }

  private renderStatus() {
    const r = this.run;
    this.status.className = 'cmd-status';
    if (!r) {
      this.status.textContent = this.full
        ? 'Acesso total ligado: os funcionários podem editar ficheiros e correr comandos.'
        : 'Enter envia, Shift+Enter muda de linha, o microfone dita. Os funcionários só leem.';
      return;
    }
    const doneCount = r.steps.filter((s) => s.status === 'done' || s.status === 'error').length;
    const took = dur((r.endedAt || Date.now()) - r.startedAt);
    const text: Record<Run['phase'], string> = {
      planning: `O Diretor está a dividir a ordem… ${took}`,
      working: `${r.mode === 'comparar' ? 'As IAs estão' : 'A equipa está'} a trabalhar: ${doneCount} de ${r.steps.length} · ${took}`,
      synth: `O Diretor está a ${r.mode === 'comparar' ? 'comparar' : 'juntar'} as respostas… ${took}`,
      done: `Concluído em ${took}`,
      error: `Falhou: ${r.error}`,
      cancelled: 'Ordem cancelada',
    };
    this.status.textContent = text[r.phase];
    if (r.phase === 'error') this.status.className = 'cmd-status error';
  }

  private renderBody() {
    const r = this.run;
    this.body.replaceChildren();
    if (!r) return;
    const order = el('div', 'cmd-order');
    order.append(el('span', 'cmd-k', `${r.mode === 'comparar' ? 'Ordem · 3 IAs' : 'Ordem'}${r.full ? ' · acesso total' : ''}`), el('p', '', r.text));
    if (r.attachments?.length) {
      const att = el('div', 'cmd-files static');
      for (const a of r.attachments) {
        const c = el('span', 'cmd-file');
        c.title = a.path;
        c.innerHTML = icon(a.kind === 'folder' ? 'folderSimple' : 'fileText');
        c.append(el('span', '', baseName(a.path)));
        att.append(c);
      }
      order.append(att);
    }
    this.body.append(order);
    if (r.plan && r.mode !== 'comparar') {
      const plan = el('div', 'cmd-order');
      plan.append(el('span', 'cmd-k', 'Plano'), el('p', '', r.plan));
      this.body.append(plan);
    }
    if (r.steps.length) {
      if (r.mode === 'comparar') {
        // Side by side, answers always visible.
        const cols = el('div', 'cmd-compare');
        for (const s of r.steps) cols.append(this.column(s));
        this.body.append(cols);
      } else {
        const list = el('ol', 'cmd-steps');
        for (const s of r.steps) list.append(this.stepRow(s));
        this.body.append(list);
      }
    }
    if (r.final) {
      const box = el('div', 'cmd-final');
      const head = el('div', 'cmd-final-head');
      head.append(el('span', 'cmd-k', r.mode === 'comparar' ? 'Comparação do Diretor' : 'Resposta do Diretor'));
      const copy = iconBtn('copy', 'Copiar resposta', async () => {
        try {
          await navigator.clipboard.writeText(r.final);
          copy.innerHTML = icon('check');
          setTimeout(() => (copy.innerHTML = icon('copy')), 1500);
        } catch {
          /* clipboard blocked: the text is still selectable */
        }
      });
      head.append(copy);
      box.append(head, el('div', 'cmd-text', r.final));
      this.body.append(box);
    }
  }

  private column(s: Step) {
    const col = el('section', `cmd-col s-${s.status} k-${s.kind}`);
    const time = s.startedAt ? ` · ${dur((s.endedAt || Date.now()) - s.startedAt)}` : '';
    const top = el('div', 'cmd-step-top');
    top.append(el('span', 'cmd-dot'), el('b', '', s.label), el('span', 'cmd-step-state', `${STEP_LABEL[s.status]}${time}`));
    col.append(top, el('div', `cmd-text${s.error ? ' error' : ''}`, s.output || s.error || '…'));
    return col;
  }

  private stepRow(s: Step) {
    const li = el('li', `cmd-step s-${s.status} k-${s.kind}`);
    const top = el('button', 'cmd-step-top') as HTMLButtonElement;
    top.type = 'button';
    const has = Boolean(s.output || s.error);
    top.disabled = !has;
    top.setAttribute('aria-expanded', String(this.expanded.has(s.n)));
    const time = s.startedAt ? ` · ${dur((s.endedAt || Date.now()) - s.startedAt)}` : '';
    top.append(el('span', 'cmd-dot'), el('b', '', s.label), el('span', 'cmd-step-state', `${STEP_LABEL[s.status]}${time}`));
    const task = el('p', 'cmd-task', s.task);
    li.append(top, task);
    if (has && this.expanded.has(s.n)) li.append(el('div', `cmd-text${s.error ? ' error' : ''}`, s.output || s.error));
    top.addEventListener('click', () => {
      if (this.expanded.has(s.n)) this.expanded.delete(s.n);
      else this.expanded.add(s.n);
      this.renderBody();
    });
    return li;
  }
}
