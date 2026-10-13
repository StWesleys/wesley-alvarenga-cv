import { C } from '../../data/content';
import { EXPS, per } from '../../data/experiences';
import { EMAIL, GH, LI, PHONE, WA } from '../../data/profile';
import { PROJ, PROJECTS } from '../../data/projects';
import { SKILLS, type SkillGroup } from '../../data/skills';
import { T, type CmdKey, type Lang } from '../../data/ui';

export type LineKind = 'head' | 'out' | 'in' | 'err';
export interface Line { text: string; kind: LineKind }

export const CMD_ALIASES: Record<CmdKey | 'help' | 'hire', string[]> = {
  about: ['about', 'sobre'], experience: ['experience', 'experiencia', 'exp'], skills: ['skills', 'stack'],
  education: ['education', 'educacao'], projects: ['projects', 'projetos', 'github'], languages: ['languages', 'idiomas'], contact: ['contact', 'contato'],
  whoami: ['whoami'], json: ['json'], clear: ['clear'], help: ['help'], hire: ['hire', 'sudo hire wesley'],
};

export const QUICK_CMDS: (CmdKey | 'help')[] = ['help', 'whoami', 'experience', 'projects', 'skills', 'contact', 'json', 'clear'];

const HELP_KEYS: CmdKey[] = ['whoami', 'about', 'experience', 'projects', 'skills', 'education', 'languages', 'contact', 'json', 'clear'];

export const cmdName = (lang: Lang, k: string) => T[lang].cmd[k as CmdKey] || k;

export const welcome = (lang: Lang): Line[] =>
  T[lang].welcome.map((text, i) => ({ text, kind: i ? 'out' : 'head' }));

/** Saída de um comando. `openJson` é chamado pelo comando `json`. */
export function out(cmd: string, lang: Lang, openJson: () => void): Line[] {
  const t = T[lang], c = C[lang];
  const L = (text: string, kind: LineKind = 'out'): Line => ({ text, kind });
  const raw = cmd.trim().toLowerCase();
  if (!raw) return [];
  const key = (Object.keys(CMD_ALIASES) as (keyof typeof CMD_ALIASES)[]).find(k => CMD_ALIASES[k].includes(raw));
  switch (key) {
    case 'help':
      return [L(t.helpTitle, 'head'), ...HELP_KEYS.map(k => L(`  ${cmdName(lang, k).padEnd(13)}${t.help[k]}`))];
    case 'whoami': return [L(`Wesley Alvarenga — ${c.title}`, 'in'), L(c.location)];
    case 'about': return [L(c.about)];
    case 'experience':
      return EXPS.flatMap(e => [L(`${per(lang, e.start, e.end)}  ${e.company}`, 'head'), L(`  ${c.exps[e.id].role}`), L(`  ${t.stack}: ${e.techs.join(', ')}`)]);
    case 'projects':
      return [...PROJECTS.flatMap(p => [L(p.name, 'head'), L('  ' + PROJ[lang][p.id].tagline), L('  ' + p.url.replace('https://', ''))]), L(GH, 'in')];
    case 'skills': return Object.entries(SKILLS).map(([k, v]) => L(`${c.groups[k as SkillGroup]}: ${v.join(', ')}`));
    case 'education': return [L(c.edu.course, 'head'), L(`  Estácio · 2019 — 2023 · ${c.edu.place}`)];
    case 'languages': return c.langs.map(l => L(`${l.name} — ${l.level}`));
    case 'contact':
      return [L(`email     ${EMAIL}`), L(`${t.phone.padEnd(10)}${PHONE}`), L('whatsapp  ' + WA), L('github    ' + GH), L('linkedin  ' + LI)];
    case 'json': setTimeout(openJson, 300); return [L(t.opening, 'head')];
    case 'hire': return [L(`${t.hire} ${EMAIL}`, 'head')];
    default: return [L(t.notFound(cmd), 'err')];
  }
}
