import type { Team, WorldState } from '../../shared/protocol';

// Two buildings, one storey per department. The Elite Agency tower holds
// floors 0-9; the Elite Real Estate building next door holds the real estate
// floors (n 20+, shown as R0, R1...). A team lands on the first floor whose
// pattern matches its id or name (real estate is checked first); anything
// unmatched goes to the agency ground floor.

export type BuildingId = 'agency' | 'realestate' | 'hospital';

export interface Floor {
  n: number;
  label: string;
  match?: RegExp;
  building: BuildingId;
  /** Storey index inside its building (0 = street level). */
  level: number;
  /** Short name on the plaque and the picker: "3", "R1". */
  tag: string;
}

const agency = (n: number, label: string, match?: RegExp): Floor => ({ n, label, match, building: 'agency', level: n, tag: String(n) });
// Agent floors A1-A8 stack on top of the Corporate tower (levels 10-17): one character per real
// Claude Code agent, offices named "Agentes <dept>" (server/residents.json, scripts/agent-residents.mjs).
const agentFloor = (i: number, label: string, dept: string): Floor => ({ n: 40 + i, label, match: new RegExp(`^agentes[- ]${dept}`, 'i'), building: 'agency', level: 9 + i, tag: `A${i}` });
export const isAgentFloor = (f: Floor) => f.n >= 41 && f.n <= 48;
const realEstate = (level: number, label: string, match: RegExp): Floor => ({ n: 20 + level, label, match, building: 'realestate', level, tag: `R${level}` });

export const FLOORS: Floor[] = [
  agency(0, 'Geral'),
  agency(1, 'Vendas', /vendas|crm|prospe/i),
  agency(2, 'Edição de Vídeo', /edi[cç](?:[aã]o|[oõ]es)|video|v[ií]deo|edit|remotion|reels/i),
  agency(3, 'Trading', /trading|invest/i),
  agency(4, 'Meta e Google Ads', /\bads\b|\bmeta\b|google|an[uú]ncios|tr[aá]fego|paid/i),
  agency(5, 'Programação', /\bprog|\bdev\b(?!-mods)|\bapp\b|site|\bweb\b|\bapi\b|frontend|backend|iakopa|apollo|agent-floor|dashboard|acad[ae]my|luxury/i),
  agency(6, 'Finanças', /finan[cç]|fiscal|tesour|fatura/i),
  agency(7, 'Redes Sociais', /redes|social/i),
  agency(8, 'Mods', /\bmods?\b|plugin|dev-mods/i),
  agency(9, 'Direção', /\bceo\b|dire[cç][aã]o|board/i),
  agentFloor(1, 'Agentes Vendas', 'vendas'),
  agentFloor(2, 'Agentes Edição', 'edi[cç][aã]o'),
  agentFloor(3, 'Agentes Redes Sociais', 'redes'),
  agentFloor(4, 'Agentes Ads', 'ads'),
  agentFloor(5, 'Agentes Finanças', 'finan[cç]as'),
  agentFloor(6, 'Agentes Trading', 'trading'),
  agentFloor(7, 'Agentes Programação', 'programa[cç][aã]o'),
  agentFloor(8, 'Agentes Direção', 'dire[cç][aã]o'),
  realEstate(0, 'Receção Imobiliária', /^imob|real.?estate|elite.?imo/i),
  realEstate(1, 'Consultores', /^imob.*consult|consultor/i),
  realEstate(2, 'Conteúdo Imobiliário', /^imob.*(conte|video|v[ií]deo|guio|social|linkedin)|exemplo/i),
  realEstate(3, 'Academia Imobiliária', /^imob.*acad|imo.*acad[ae]my|acad.*imo/i),
  // Hospital DIOGO, across the clients' street: level 1 sits above its clinic block.
  { n: 30, label: 'Relações', match: /rela[cç][oõ]es/i, building: 'hospital', level: 1, tag: 'H1' },
];

/** Matching order: the specific real estate floors, then its lobby, then the agency. */
const MATCH_ORDER: Floor[] = [
  ...FLOORS.filter(isAgentFloor),
  ...FLOORS.filter((f) => f.building === 'hospital'),
  ...FLOORS.filter((f) => f.building === 'realestate' && f.level > 0).reverse(),
  ...FLOORS.filter((f) => f.building === 'realestate' && f.level === 0),
  ...FLOORS.filter((f) => f.building === 'agency' && !isAgentFloor(f)),
];

export const floorsIn = (b: BuildingId) => FLOORS.filter((f) => f.building === b);
export const floorByN = (n: number) => FLOORS.find((f) => f.n === n);

export function floorOf(team: Pick<Team, 'id' | 'name'>) {
  for (const f of MATCH_ORDER) if (f.match && (f.match.test(team.id) || f.match.test(team.name))) return f.n;
  return 0;
}

/** Agents per floor, for the floor picker. `liveOnly` skips permanent residents. */
export function floorCounts(state: WorldState, liveOnly = false) {
  const counts = new Map<number, number>();
  for (const a of Object.values(state.agents)) {
    if (liveOnly && a.resident) continue;
    const team = state.teams[a.team];
    const n = team ? floorOf(team) : 0;
    counts.set(n, (counts.get(n) || 0) + 1);
  }
  return counts;
}

/** The slice of the world that lives on one floor. */
export function onFloor(state: WorldState, n: number): WorldState {
  const teams: WorldState['teams'] = {};
  for (const [id, t] of Object.entries(state.teams)) if (floorOf(t) === n) teams[id] = t;
  const agents: WorldState['agents'] = {};
  for (const [id, a] of Object.entries(state.agents)) if (teams[a.team]) agents[id] = a;
  return { ...state, teams, agents };
}
