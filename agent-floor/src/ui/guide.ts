import { icon } from './icons';
import { makeDraggable, popOut } from './window';

// Guia: one window with every site, app and video the agency is working on (server/projects.json).
// Opens with the compass button or G, and by itself when an order to the Diretor IA is about a
// project. Buttons ask the floor server to open the site in Brave or the folder in Explorer.

interface Project {
  id: string;
  name: string;
  type: 'site' | 'app' | 'video' | 'departamento';
  client: string;
  status: string;
  url: string;
  local: string;
  repo: string;
  notes: string;
  folder: string;
  folderName: string;
}

const TABS: { id: 'all' | Project['type']; label: string }[] = [
  { id: 'all', label: 'Tudo' },
  { id: 'site', label: 'Sites' },
  { id: 'app', label: 'Apps' },
  { id: 'video', label: 'Vídeos' },
  { id: 'departamento', label: 'Departamentos' },
];
const TYPE_LABEL: Record<Project['type'], string> = { site: 'Site', app: 'App', video: 'Vídeo', departamento: 'Departamento' };

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export class GuidePanel {
  private root = el('section', 'guide glass');
  private search = el('input', 'guide-search') as HTMLInputElement;
  private tabs = el('div', 'guide-tabs');
  private grid = el('div', 'guide-grid');
  private note = el('div', 'guide-note');
  private projects: Project[] = [];
  private tab: (typeof TABS)[number]['id'] = 'all';
  private focus: string[] = [];
  private open = false;

  constructor(container: HTMLElement, private opts: { onToggle?(open: boolean): void; popout?: boolean } = {}) {
    this.root.setAttribute('aria-label', 'Guia de projetos');
    this.root.hidden = true;
    if (opts.popout) this.root.classList.add('popout');

    const head = el('header', 'guide-head');
    const title = el('div', 'cmd-title');
    title.innerHTML = `${icon('compass')}<span><b>Guia</b><small>Sites, apps e vídeos em que estamos a trabalhar</small></span>`;
    const close = el('button', 'icon-btn') as HTMLButtonElement;
    close.type = 'button';
    close.innerHTML = icon('x');
    close.title = 'Fechar (Esc)';
    close.setAttribute('aria-label', 'Fechar (Esc)');
    close.addEventListener('click', () => this.toggle(false));
    const out = el('button', 'icon-btn') as HTMLButtonElement;
    out.type = 'button';
    out.innerHTML = icon('arrowSquareOut');
    out.title = 'Abrir numa janela própria';
    out.setAttribute('aria-label', 'Abrir numa janela própria');
    out.addEventListener('click', () => {
      popOut('guia');
      this.toggle(false);
    });
    const tools = el('div', 'cmd-tools');
    if (!opts.popout) tools.append(out, close);
    head.append(title, tools);

    this.search.type = 'search';
    this.search.placeholder = 'Procurar projeto, cliente…';
    this.search.setAttribute('aria-label', 'Procurar projeto');
    this.search.addEventListener('input', () => {
      this.focus = [];
      this.render();
    });
    this.search.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.toggle(false);
    });

    const bar = el('div', 'guide-bar');
    bar.append(this.search, this.tabs);
    this.note.setAttribute('aria-live', 'polite');
    this.root.append(head, bar, this.note, this.grid);
    container.append(this.root);
    if (!opts.popout) makeDraggable(this.root, head, 'agent-floor:guide-pos');

    addEventListener('keydown', (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.metaKey || e.ctrlKey || e.altKey) return;
      if (opts.popout) return;
      if (e.key === 'g' || e.key === 'G') {
        e.preventDefault();
        this.toggle();
      } else if (e.key === 'Escape' && this.open) this.toggle(false);
    });
  }

  toggle(next = !this.open) {
    if (this.opts.popout) next = true;
    this.open = next;
    this.root.hidden = !next;
    this.opts.onToggle?.(next);
    if (next) {
      void this.load();
      if (!this.focus.length) requestAnimationFrame(() => this.search.focus());
    }
  }

  /** Open the window on these projects (from an order to the Diretor IA). */
  show(ids: string[]) {
    this.focus = ids;
    this.search.value = '';
    this.tab = 'all';
    this.toggle(true);
  }

  private async load() {
    try {
      const res = await fetch('/guide', { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      this.projects = ((await res.json()) as { projects: Project[] }).projects || [];
      this.note.textContent = '';
    } catch {
      this.note.textContent = 'Sem ligação ao servidor do Agent Floor.';
    }
    this.render();
  }

  private async launch(p: Project, target: 'url' | 'local' | 'repo' | 'folder', btn: HTMLButtonElement) {
    btn.disabled = true;
    try {
      const res = await fetch('/guide/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: p.id, target }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);
      this.note.textContent = `A abrir ${p.name}…`;
    } catch (err) {
      this.note.textContent = (err as Error).message;
    } finally {
      setTimeout(() => (btn.disabled = false), 800);
    }
  }

  private render() {
    const q = norm(this.search.value.trim());
    const matches = (p: Project) => !q || norm(`${p.name} ${p.client} ${p.status} ${p.notes} ${p.folderName}`).includes(q);
    const inTab = (p: Project) => this.tab === 'all' || p.type === this.tab;

    this.tabs.replaceChildren(
      ...TABS.map((t) => {
        const n = this.projects.filter((p) => (t.id === 'all' || p.type === t.id) && matches(p)).length;
        const b = el('button', `cmd-chip${this.tab === t.id ? ' active' : ''}`, `${t.label} ${n}`) as HTMLButtonElement;
        b.type = 'button';
        b.setAttribute('aria-pressed', String(this.tab === t.id));
        b.addEventListener('click', () => {
          this.tab = t.id;
          this.render();
        });
        return b;
      }),
    );

    let list = this.projects.filter((p) => inTab(p) && matches(p));
    // Projects the Diretor asked for come first and are highlighted.
    if (this.focus.length) list = [...list].sort((a, b) => Number(this.focus.includes(b.id)) - Number(this.focus.includes(a.id)));
    this.grid.replaceChildren(...list.map((p) => this.card(p)));
    if (!list.length && this.projects.length) this.grid.append(el('p', 'guide-empty', 'Nenhum projeto encontrado.'));
    if (this.focus.length) this.grid.querySelector('.guide-card.focus')?.scrollIntoView({ block: 'nearest' });
  }

  private card(p: Project) {
    const card = el('article', `guide-card t-${p.type}${this.focus.includes(p.id) ? ' focus' : ''}`);
    const top = el('div', 'guide-card-top');
    top.append(el('span', 'guide-type', TYPE_LABEL[p.type]), el('span', 'guide-status', p.status));
    card.append(top, el('h3', '', p.name));
    if (p.client) card.append(el('p', 'guide-client', p.client));
    if (p.notes) card.append(el('p', 'guide-notes', p.notes));
    const actions = el('div', 'guide-actions');
    const add = (label: string, target: 'url' | 'local' | 'repo' | 'folder', primary = false) => {
      const b = el('button', `guide-btn${primary ? ' primary' : ''}`, label) as HTMLButtonElement;
      b.type = 'button';
      b.addEventListener('click', () => void this.launch(p, target, b));
      actions.append(b);
    };
    if (p.url) add('Abrir site', 'url', true);
    if (p.local) add(p.url ? 'Local' : 'Abrir local', 'local', !p.url);
    if (p.folder) add('Pasta', 'folder', !p.url && !p.local);
    if (p.repo) add('GitHub', 'repo');
    card.append(actions);
    return card;
  }
}
