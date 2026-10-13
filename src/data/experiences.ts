import type { Lang } from './ui';

export type Phase = [label: string, start: string, end: string | null];

export interface Experience {
  id: 'tab' | 'bear' | 'prodemge';
  company: string;
  start: string;
  end: string | null;
  phases: Phase[];
  techs: string[];
}

export const EXPS: Experience[] = [
  { id: 'tab', company: 'TabControl', start: '2022', end: null, phases: [['CLT', '2022', '2025'], ['PJ', '2025', null]], techs: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'SCSS', 'APIs REST'] },
  { id: 'bear', company: 'Bear System', start: '2024', end: '2025', phases: [], techs: ['React', 'NodeJS', 'NextJS', 'Firebase'] },
  { id: 'prodemge', company: 'PRODEMGE', start: '2020', end: '2022', phases: [], techs: ['Design Thinking', 'Lean Inception', 'PM Canvas', 'Data Studio', 'Blockchain', 'Data Science'] },
];

export const NOW: Record<Lang, string> = { pt: 'atual', en: 'Present', ja: '現在' };

export const per = (lang: Lang, s: string, e: string | null) => `${s} — ${e ?? NOW[lang]}`;
