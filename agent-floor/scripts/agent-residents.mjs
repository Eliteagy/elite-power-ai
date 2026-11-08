#!/usr/bin/env node
// Regenerates the "Agentes ..." offices in server/residents.json: one character per real
// Claude Code agent (not per skill), seated on the agent floors A1-A8 at the top of the
// World Elite Corporate tower. Each character's activity lists the skills its .md names.
// Re-run after adding or editing an agent, then restart the app:  node scripts/agent-residents.mjs
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const residentsFile = resolve(here, '../server/residents.json');
const agency = resolve(here, '../../..'); // ...\Elite Agency
const globalAgents = join(homedir(), '.claude', 'agents');
const proj = (dir) => join(agency, dir, '.claude', 'agents');

// [team, [agent, folder][]] in seating order. Team names must match the A-floor regex in src/core/floors.ts.
const DEPTS = [
  ['Agentes Vendas', ['prospeccao', 'follow-up', 'fecho', 'copy-vendas', 'pipeline', 'propostas', 'retencao', 'email-frio'].map((a) => [a, proj('CRM/dashboard')])],
  ['Agentes Edicao', ['editor-imobiliario', 'editor-kw-palestras', 'editor-clips-virais', 'editor-video', 'editor-animations', 'editor-blender', 'editor-adobe', 'analista-referencias'].map((a) => [a, globalAgents])],
  ['Agentes Redes Sociais', [...['estrategista-social', 'gestor-linkedin', 'gestor-tiktok', 'gestor-facebook-instagram'].map((a) => [a, proj('Redes Sociais')]), ['estrategia-youtube', globalAgents]]],
  ['Agentes Ads', ['gestor-meta-ads', 'gestor-google-ads', 'criativos-ads', 'analista-ads'].map((a) => [a, proj('Ads')])],
  ['Agentes Financas', ['analista-financeiro', 'fiscal', 'precos-propostas', 'tesoureiro'].map((a) => [a, proj('Financas')])],
  ['Agentes Trading', ['analista', 'professor', 'trader-demo', 'consultor-imobiliario'].map((a) => [a, proj('Investimentos')])],
  ['Agentes Programacao', ['frontend', 'backend', 'qualidade-seguranca', 'deploy'].map((a) => [a, proj('Programacao')])],
  ['Agentes Direcao', [...['ceo', 'cacador-skills', 'market-researcher'].map((a) => [a, globalAgents]), ['gestor-qualidade', globalAgents, proj('Direcao')]]],
];

const roster = JSON.parse(readFileSync(residentsFile, 'utf8'));
// Every skill name the building already knows, plus the installed skill folders.
const known = new Set(roster.teams.filter((t) => !/^Agentes /.test(t.team)).flatMap((t) => t.skills.filter((s) => typeof s === 'string')));
const skillsDir = join(homedir(), '.claude', 'skills');
if (existsSync(skillsDir)) for (const d of readdirSync(skillsDir)) known.add(d);

const pretty = (s) => s.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const agentNames = new Set(DEPTS.flatMap(([, list]) => list.map(([n]) => n)));
// Skill rooms already tied to an agent by role (e.g. "Vendas Fecho" -> fecho).
const roomSkills = (name) => roster.teams.filter((t) => !/^Agentes /.test(t.team) && t.role === name).flatMap((t) => t.skills.filter((s) => typeof s === 'string'));

function skillsOf(text, name) {
  const found = roomSkills(name).filter((s) => !agentNames.has(s));
  for (const m of text.matchAll(/`([a-z0-9][a-z0-9:_-]*)`/gi)) if (known.has(m[1]) && !agentNames.has(m[1]) && !found.includes(m[1])) found.push(m[1]);
  return found;
}

const missing = [];
const agentTeams = DEPTS.map(([team, list]) => ({
  team,
  role: 'agente',
  skills: list.map(([name, ...dirs]) => {
    const file = dirs.map((d) => join(d, `${name}.md`)).find(existsSync);
    if (!file) missing.push(`${team}: ${name}`);
    const skills = file ? skillsOf(readFileSync(file, 'utf8'), name) : roomSkills(name);
    const activity = skills.length ? `Agente · skills: ${skills.join(', ')}` : file ? 'Agente' : 'Agente (ainda por criar)';
    return { name: pretty(name), role: name, activity: activity.length > 200 ? activity.slice(0, 199) + '…' : activity };
  }),
}));

roster.teams = [...roster.teams.filter((t) => !/^Agentes /.test(t.team)), ...agentTeams];
writeFileSync(residentsFile, JSON.stringify(roster, null, 2) + '\n');
console.log(agentTeams.map((t) => `${t.team}: ${t.skills.length}`).join('\n'));
if (missing.length) console.log(`\nSem ficheiro .md (boneco fica sem skills):\n  ${missing.join('\n  ')}`);
