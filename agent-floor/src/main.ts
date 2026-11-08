import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './styles.css';
import { connect, isDemoRunning, startDemo } from './core/connection';
import { floorCounts, floorOf, FLOORS, onFloor } from './core/floors';
import { mirrorAgents } from './core/agentMirror';
import { store } from './core/store';
import { fmtMoney, fmtPct, fmtSigned, marketLine, trading, type TradingSnapshot } from './core/trading';
import { Hud } from './ui/hud';
import { CommandPanel } from './ui/command';
import { GuidePanel } from './ui/guide';
import { liquidGlass } from './ui/liquidGlass';
import { icon } from './ui/icons';
import { World } from './world/World';
import type { ThemeName } from './world/palette';

const app = document.getElementById('app')!;
// Running inside the desktop app window (Electron or a Chromium app window).
if (new URLSearchParams(location.search).has('app')) {
  document.documentElement.classList.add('in-app');
  if (/Mac/.test(navigator.platform)) document.documentElement.classList.add('in-app-mac');
}
const stage = document.createElement('div');
stage.className = 'stage';
app.append(stage);

// ---------------------------------------------------------------- theme
const THEME_KEY = 'agent-floor:theme';
function savedTheme(): ThemeName | null {
  try {
    const v = localStorage.getItem(THEME_KEY);
    return v === 'light' || v === 'dark' ? v : null;
  } catch {
    return null;
  }
}
const systemDark = matchMedia('(prefers-color-scheme: dark)');
let theme: ThemeName = savedTheme() || (systemDark.matches ? 'dark' : 'light');

// ---------------------------------------------------------------- floor
const FLOOR_KEY = 'agent-floor:floor';
function savedFloor() {
  try {
    const n = Number(localStorage.getItem(FLOOR_KEY));
    return FLOORS.some((f) => f.n === n) && localStorage.getItem(FLOOR_KEY) !== null ? n : 1;
  } catch {
    return 1;
  }
}
let floor = savedFloor();
/** When the user last picked a floor by hand; auto-follow stays off for a minute after. */
let pickedAt = 0;

// ---------------------------------------------------------------- view
// 'building' = the whole-building overview, 'floor' = one detailed floor (`floor`).
// First open (nothing saved yet) lands on the building.
const VIEW_KEY = 'agent-floor:view';
function savedOverview() {
  try {
    return localStorage.getItem(VIEW_KEY) !== 'floor';
  } catch {
    return true;
  }
}
function saveView(overview: boolean) {
  try {
    localStorage.setItem(VIEW_KEY, overview ? 'building' : 'floor');
    if (!overview) localStorage.setItem(FLOOR_KEY, String(floor));
  } catch {
    /* storage unavailable: the view still applies for this visit */
  }
}
let overview = savedOverview();
// `?floor=N` (the desktop app's --floor=N) opens straight on that floor.
{
  const n = Number(new URLSearchParams(location.search).get('floor') ?? NaN);
  if (FLOORS.some((f) => f.n === n)) {
    floor = n;
    overview = false;
    // Asked for by name: don't auto-follow away from it for a minute.
    pickedAt = Date.now();
    saveView(false);
  }
}
// `?view=building` (the desktop app's --building) opens on the whole-building overview.
if (new URLSearchParams(location.search).get('view') === 'building') {
  overview = true;
  saveView(true);
}

/** A panel popped out into its own window (?panel=comando or ?panel=guia): no 3D, just the panel. */
function bootPanel(panel: string) {
  document.documentElement.classList.add('popout-page');
  document.documentElement.dataset.theme = theme;
  stage.remove();
  if (panel === 'guia') {
    document.title = 'Guia · Agent Floor';
    new GuidePanel(app, { popout: true }).toggle(true);
    return;
  }
  document.title = 'Comando · Agent Floor';
  const guide = new GuidePanel(app);
  new CommandPanel(app, { popout: true, goToFloor: () => {}, onOpenProjects: (ids) => guide.show(ids) });
}

async function boot() {
  const panel = new URLSearchParams(location.search).get('panel');
  if (panel === 'comando' || panel === 'guia') return bootPanel(panel);
  // Canvas textures draw text, so the fonts must be ready first.
  await Promise.race([
    Promise.all([document.fonts.load('600 24px "Geist Variable"'), document.fonts.load('500 20px "Geist Mono Variable"')]),
    new Promise((r) => setTimeout(r, 1500)),
  ]);

  const world = new World(stage, {
    onPickFloor(n) {
      openFloor(n);
    },
    onPick(agentId, teamId) {
      if (agentId) store.select(agentId);
      else if (teamId) {
        store.select(null);
        world.focusTeam(teamId);
      } else store.select(null);
    },
    onHover(id) {
      hud.setHovered(id);
    },
    onMessage(from, to, text) {
      const target = store.state.agents[to];
      hud.say(from, text, target?.name);
    },
  });

  const hud = new Hud(app, {
    select: (id) => {
      // Picking someone from the building: go to their floor first.
      const a = id ? store.state.agents[id] : undefined;
      const team = a ? store.state.teams[a.team] : undefined;
      if (id && overview && team) openFloor(floorOf(team), () => store.select(id));
      else store.select(id);
    },
    focusTeam: (id) => {
      const team = store.state.teams[id];
      if (overview && team) openFloor(floorOf(team), () => world.focusTeam(id));
      else world.focusTeam(id);
    },
    frameAll: () => world.frameAll(),
    toggleTheme: () => applyTheme(theme === 'dark' ? 'light' : 'dark', true),
    startDemo: () => {
      if (!isDemoRunning()) startDemo();
    },
    setFloor: (n) => openFloor(n),
    showBuilding: () => showBuilding(),
  });

  // Command centre: one order, split by the Diretor IA across GPT, Gemini, Claude and the agents.
  const guideBtn = hud.addTool('compass', 'Guia: sites, apps e vídeos (G)', () => guide.toggle());
  const guide = new GuidePanel(app, {
    onToggle: (open) => {
      guideBtn.classList.toggle('active', open);
      guideOpen = open;
      dockSync?.();
    },
  });
  const commandBtn = hud.addTool('robot', 'Comando: dar uma ordem à equipa (C)', () => command.toggle());
  const command = new CommandPanel(app, {
    goToFloor: (n) => {
      if (overview || floor !== n) openFloor(n);
    },
    onOpenProjects: (ids) => guide.show(ids),
    onToggle: (open) => {
      commandBtn.classList.toggle('active', open);
      app.classList.toggle('cmd-open', open);
      dockSync();
    },
  });

  // Bottom tab bar (Apple HIG: tabs navigate, they don't act): Comando, 3 IAs, Guia. Popping a panel
  // out is an action, so it lives in each panel's own title bar (↗), not here. The selected tab
  // shows a filled icon in the accent tint.
  const dock = document.createElement('nav');
  dock.className = 'dock glass';
  dock.setAttribute('aria-label', 'Ferramentas');
  type Ico = Parameters<typeof icon>[0];
  const dockBtn = (ico: Ico, filled: Ico, label: string, hint: string, fn: () => void) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'dock-btn';
    b.title = hint;
    b.innerHTML = `<i class="dock-ico">${icon(ico)}</i><span></span>`;
    b.querySelector('span')!.textContent = label;
    b.addEventListener('click', fn);
    dock.append(b);
    const set = (on: boolean) => {
      if (b.classList.contains('active') === on) return;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
      b.querySelector('.dock-ico')!.innerHTML = icon(on ? filled : ico);
    };
    set(false);
    return set;
  };
  const dCmd = dockBtn('robot', 'robotFill', 'Comando', 'Dar uma ordem ao Diretor IA (C)', () => command.toggle());
  const dThree = dockBtn('columns', 'columnsFill', '3 IAs', 'GPT, Gemini e Claude respondem à mesma ordem, lado a lado', () => command.openThree());
  const dGuide = dockBtn('compass', 'compassFill', 'Guia', 'Sites, apps e vídeos (G)', () => guide.toggle());
  app.append(dock);
  // Liquid Glass on the floating controls (tab bar, toolbar, floor picker, teams); panels with
  // content get the frosted variant with the same rim (CSS .cmd/.guide).
  liquidGlass(document.querySelectorAll<HTMLElement>('.dock, .topbar .brand, .topbar .tools, .teams, .floors'));
  // The Comando (the AI robot) gets the lens too, with more frost so its text stays readable.
  liquidGlass(document.querySelectorAll<HTMLElement>('.cmd'), { edge: 26, strength: 40, blur: 12 });
  function dockSync() {
    const open = command?.isOpen() ?? false;
    const three = open && document.querySelector('.cmd-mode.active')?.textContent?.includes('3 IAs') === true;
    dCmd(open && !three);
    dThree(three);
    dGuide(guideOpen);
  }
  // The mode switch inside the panel changes which tab is selected.
  app.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('.cmd-mode')) dockSync();
  });
  let guideOpen = false;

  /** The user opens a floor (picker, key, or a click on a storey of the building). */
  let opening = 0;
  function openFloor(n: number, then?: () => void) {
    pickedAt = Date.now();
    const token = ++opening;
    const go = () => {
      if (token !== opening) return;
      floor = n;
      saveView(false);
      if (overview) {
        overview = false;
        world.setOverview(false);
        render();
        world.frameAll();
      } else showFloor(n);
      then?.();
    };
    if (overview) world.diveTo(n, go);
    else go();
  }

  /** Back to the whole building; the camera pulls out from the floor being left. */
  function showBuilding() {
    if (overview) return world.frameAll();
    ++opening;
    pickedAt = Date.now();
    overview = true;
    saveView(true);
    store.select(null);
    world.setOverview(true, floor);
    render();
  }

  // Swap the whole floor: everyone on the new floor is seated straight away.
  function showFloor(n: number) {
    if (n === floor && !world.isOverview) return;
    floor = n;
    world.reset();
    render();
    world.frameAll();
  }

  function applyTheme(next: ThemeName, persist = false) {
    theme = next;
    document.documentElement.dataset.theme = next;
    world.setTheme(next);
    hud.setTheme(next === 'dark');
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        /* storage unavailable: theme still applies for this visit */
      }
    }
  }
  applyTheme(theme);
  systemDark.addEventListener('change', (e) => {
    if (!savedTheme()) applyTheme(e.matches ? 'dark' : 'light');
  });

  let lastSelected: string | null = null;
  store.onEffect((e) => world.handleEffect(e));
  function render() {
    renderFloor();
    drawCard(trading.snapshot);
  }
  function renderFloor() {
    const counts = floorCounts(store.state);
    const live = floorCounts(store.state, true);
    if (overview) {
      // The building only shows activity per storey; nobody is drawn in detail.
      world.syncTower(counts, live, floor);
      hud.setMode(store.mode);
      hud.setFloors(null, counts);
      hud.setState(store.state, null);
      return;
    }
    // An empty floor while people work elsewhere: follow them, unless the user just chose this floor.
    // Residents (permanent seated skill agents) do not count as people working.
    // Never fires in the building overview: that view is the user's choice.
    if (!live.get(floor) && live.size && Date.now() - pickedAt > 60_000) {
      const busiest = [...live.entries()].sort((a, b) => b[1] - a[1])[0][0];
      if (busiest !== floor) return showFloor(busiest);
    }
    const view = onFloor(mirrorAgents(store.state), floor);
    if (store.selected && !view.agents[store.selected]) store.select(null);
    world.sync(view);
    if (store.selected !== lastSelected) {
      lastSelected = store.selected;
      world.setSelected(store.selected);
    }
    hud.setMode(store.mode);
    hud.setFloors(floor, counts);
    hud.setState(view, store.selected);
  }
  store.subscribe(render);

  // Trading floor (3): a compact card with the Alpaca PAPER account next to the video wall.
  const TRADING_FLOOR = 3;
  const tcard = document.createElement('div');
  tcard.className = 'trading-card glass';
  tcard.hidden = true;
  tcard.innerHTML = `<div class="tc-title">CONTA DEMO · ALPACA PAPER</div><div class="tc-equity"></div><div class="tc-pl"></div><div class="tc-meta"></div>`;
  app.append(tcard);
  const [tcEquity, tcPl, tcMeta] = ['.tc-equity', '.tc-pl', '.tc-meta'].map((s) => tcard.querySelector<HTMLElement>(s)!);
  function drawCard(s: TradingSnapshot) {
    tcard.hidden = overview || floor !== TRADING_FLOOR;
    if (!s.ok || !s.account) {
      tcEquity.textContent = 'Sem ligação';
      tcPl.textContent = s.message || '';
      tcPl.className = 'tc-pl down';
      tcMeta.textContent = '';
      return;
    }
    const pl = s.account.dayPL ?? 0;
    tcEquity.textContent = fmtMoney(s.account.equity);
    tcPl.textContent = `${fmtSigned(s.account.dayPL)} (${fmtPct(s.account.dayPLPct)}) hoje`;
    tcPl.className = `tc-pl${pl > 0 ? ' up' : pl < 0 ? ' down' : ''}`;
    tcMeta.textContent = `${marketLine(s.market)} · ${s.positions.length} posições · ${s.orders.length} ordens`;
  }
  trading.subscribe(drawCard);
  world.onFrame = () => hud.frame(world.anchors());
  // Refresh relative times on the card.
  setInterval(() => hud.setState(overview ? store.state : onFloor(mirrorAgents(store.state), floor), overview ? null : store.selected), 5000);

  hud.setMode(store.mode);
  if (overview) {
    world.setOverview(true);
    render();
  }
  connect();

  // ?stats shows a small performance readout (for contributors and bug reports).
  if (new URLSearchParams(location.search).has('stats')) {
    const box = document.createElement('pre');
    box.className = 'stats';
    document.body.append(box);
    // Handles for scripted captures (scripts/capture.cjs, scripts/record.cjs).
    Object.assign(window, { __floor: world, __store: store, __hud: hud });
    setInterval(() => {
      const p = world.perf;
      box.textContent = `${p.fps.toFixed(0)} fps  cpu ${p.frameMs.toFixed(1)} ms\n${p.calls} draws  ${(p.triangles / 1000).toFixed(0)}k tris\n${p.agents} agents  sync ${p.syncMs.toFixed(1)} ms (worst ${p.worstSyncMs.toFixed(0)})`;
    }, 500);
  }
}

boot();
