export type SkillGroup = 'lang' | 'front' | 'back' | 'ai' | 'tools' | 'style' | 'agile';

export const SKILLS: Record<SkillGroup, string[]> = {
  lang: ['TypeScript', 'JavaScript'],
  front: ['Angular', 'React', 'NextJS', 'RxJS'],
  back: ['NestJS', 'NodeJS', 'Prisma', 'Supabase'],
  ai: ['Claude', 'ChatGPT', 'GitHub Copilot', 'Gemini', 'Windsurf', 'OpenRouter', 'IA / LLM'],
  tools: ['Git', 'Vercel'],
  style: ['Bootstrap', 'Materialize', 'CSS3', 'SASS', 'Tailwind'],
  agile: ['SCRUM', 'XP', 'Kanban', 'Lean Inception'],
};

// Nomes equivalentes para o filtro
export const ALIAS: Record<string, string[]> = { SASS: ['SCSS'], SCSS: ['SASS'] };

/** O chip `name` acende quando o filtro `skill` está ativo? */
export const isOn = (skill: string | null, name: string) =>
  !!skill && (name === skill || (ALIAS[skill] || []).includes(name));

/** A lista de tecnologias contém o filtro `skill` (ou um equivalente)? */
export const matches = (skill: string, techs: string[]) => {
  const names = [skill, ...(ALIAS[skill] || [])];
  return techs.some(t => names.includes(t));
};
