import type { Agent, WorldState } from '../../shared/protocol';

// The agent floors (A1-A8) seat one permanent character per real Claude Code agent, with the
// agent's name as its role. When a live session runs that agent as a subagent (the Claude
// adapter reports `subagent_type` as the role), its character on the agent floor mirrors the
// live status, so the floor shows which agents are working right now.

const isAgentOffice = (team: string) => /^agentes-/.test(team);
const bare = (role: string) => role.toLowerCase().split(':').pop() || role.toLowerCase();
const ACTIVE = new Set(['thinking', 'working', 'waiting', 'error']);

export function mirrorAgents(state: WorldState): WorldState {
  const live = new Map<string, Agent>();
  for (const a of Object.values(state.agents)) {
    if (a.resident || !ACTIVE.has(a.status)) continue;
    const key = bare(a.role);
    const prev = live.get(key);
    if (!prev || a.lastSeen > prev.lastSeen) live.set(key, a);
  }
  if (!live.size) return state;
  let agents: WorldState['agents'] | null = null;
  for (const [id, r] of Object.entries(state.agents)) {
    if (!r.resident || !isAgentOffice(r.team)) continue;
    const src = live.get(bare(r.role));
    if (!src) continue;
    agents ??= { ...state.agents };
    agents[id] = { ...r, status: src.status, tool: src.tool, activity: src.activity || r.activity, lastSeen: src.lastSeen };
  }
  return agents ? { ...state, agents } : state;
}
