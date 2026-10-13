import { C } from '../data/content';
import { EXPS, per } from '../data/experiences';
import { EMAIL, GH, LI, NAME, PHONE } from '../data/profile';
import { PROJ, PROJECTS } from '../data/projects';
import { SKILLS } from '../data/skills';
import type { Lang } from '../data/ui';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export function buildData(lang: Lang): Json {
  const c = C[lang];
  const skills = Object.fromEntries(Object.entries(SKILLS).map(([k, v]) => [c.groups[k as keyof typeof SKILLS], v]));
  if (lang === 'pt') return {
    nome: NAME, cargo: c.title, sobre: c.about,
    contato: { email: EMAIL, telefone: PHONE, local: c.location, github: GH, linkedin: LI },
    disponibilidade: c.open.items,
    projetos: PROJECTS.map(p => ({ nome: p.name, descricao: PROJ.pt[p.id].tagline, link: p.url, tecnologias: p.techs })),
    experiencias: EXPS.map(e => ({
      empresa: e.company, cargo: c.exps[e.id].role, periodo: per(lang, e.start, e.end),
      ...(e.phases.length ? { fases: e.phases.map(([l, s, f]) => ({ vinculo: l, periodo: per(lang, s, f) })) } : {}),
      local: c.exps[e.id].place, resumo: c.exps[e.id].summary, atividades: c.exps[e.id].bullets, tecnologias: e.techs,
    })),
    qualificacoes: skills,
    educacao: [{ curso: c.edu.course, instituicao: 'Estácio', periodo: '2019 — 2023', local: c.edu.place }],
    idiomas: c.langs.map(l => ({ nome: l.name, nivel: l.level })),
  };
  return {
    name: NAME, title: c.title, about: c.about,
    contact: { email: EMAIL, phone: PHONE, location: c.location, github: GH, linkedin: LI },
    availability: c.open.items,
    projects: PROJECTS.map(p => ({ name: p.name, description: PROJ[lang][p.id].tagline, url: p.url, stack: p.techs })),
    experience: EXPS.map(e => ({
      company: e.company, role: c.exps[e.id].role, period: per(lang, e.start, e.end),
      ...(e.phases.length ? { contracts: e.phases.map(([l, s, f]) => ({ type: l, period: per(lang, s, f) })) } : {}),
      location: c.exps[e.id].place, summary: c.exps[e.id].summary, highlights: c.exps[e.id].bullets, stack: e.techs,
    })),
    skills,
    education: [{ degree: c.edu.course, institution: 'Estácio', period: '2019 — 2023', location: c.edu.place }],
    languages: c.langs.map(l => ({ name: l.name, level: l.level })),
  };
}

export type TokenKind = 'key' | 'str' | 'num' | 'punct';
export interface Token { t: string; k: TokenKind }
export interface JsonLine { n: number; toks: Token[] }

/** Quebra o JSON formatado (2 espaços) em linhas de tokens coloridos. */
function jsonLines(obj: Json): JsonLine[] {
  const out: Token[][] = [];
  const walk = (v: Json, ind: number, key: string | null, last: boolean) => {
    const toks: Token[] = [{ t: '  '.repeat(ind), k: 'punct' }];
    if (key != null) toks.push({ t: JSON.stringify(key), k: 'key' }, { t: ': ', k: 'punct' });
    const comma = last ? '' : ',';
    if (v && typeof v === 'object') {
      const arr = Array.isArray(v);
      const entries: [string | null, Json][] = arr ? v.map(x => [null, x]) : Object.entries(v);
      if (!entries.length) { toks.push({ t: (arr ? '[]' : '{}') + comma, k: 'punct' }); out.push(toks); return; }
      toks.push({ t: arr ? '[' : '{', k: 'punct' }); out.push(toks);
      entries.forEach(([k, x], i) => walk(x, ind + 1, k, i === entries.length - 1));
      out.push([{ t: '  '.repeat(ind) + (arr ? ']' : '}') + comma, k: 'punct' }]);
    } else {
      toks.push({ t: JSON.stringify(v), k: typeof v === 'string' ? 'str' : 'num' }, { t: comma, k: 'punct' });
      out.push(toks);
    }
  };
  walk(obj, 0, null, true);
  return out.map((toks, i) => ({ n: i + 1, toks }));
}

const cache: Partial<Record<Lang, JsonLine[]>> = {};
export const getJsonLines = (lang: Lang) => (cache[lang] ||= jsonLines(buildData(lang)));
export const getJsonText = (lang: Lang) => JSON.stringify(buildData(lang), null, 2);
