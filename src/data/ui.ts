export type Lang = 'pt' | 'en' | 'ja';

export type CmdKey = 'whoami' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'languages' | 'contact' | 'json' | 'clear';

export interface UiText {
  tabs: string[];
  visual: string;
  hello: string;
  roles: string[];
  copied: string;
  placeholder: string;
  welcome: string[];
  h_exp: string;
  h_proj: string;
  toTop: string;
  allRepos: string;
  viewCode: string;
  h_skills: string;
  h_edu: string;
  h_lang: string;
  skillHint: string;
  filterIdle: string;
  filterOn: (s: string, n: number, t: number) => string;
  show: (n: number) => string;
  hide: string;
  copy: string;
  copiedJson: string;
  notFound: (c: string) => string;
  opening: string;
  helpTitle: string;
  cmd: Partial<Record<CmdKey, string>>;
  help: Record<CmdKey, string>;
  phone: string;
  stack: string;
  hire: string;
}

export const LANGS: [Lang, string, string][] = [['pt', 'PT', 'Português'], ['en', 'EN', 'English'], ['ja', 'JP', '日本語']];

export const T: Record<Lang, UiText> = {
  pt: {
    tabs: ['sobre.tsx', 'terminal.sh', 'experiencia.ts', 'projetos.ts', 'stack.json', 'educacao.md'],
    visual: 'Visual', hello: '// olá, mundo — eu sou',
    roles: ['Desenvolvedor Front-end', 'Fullstack com Angular, Next.js e NestJS', 'Frontend Pleno', 'TypeScript & JavaScript'],
    copied: '✓ email copiado', placeholder: 'digite help',
    welcome: ['Bem-vindo! Este currículo também responde a comandos.', "Digite 'help' ou clique em um comando abaixo."],
    h_exp: 'Experiências', h_proj: 'Projetos', toTop: 'Voltar ao topo', allRepos: 'ver todos no GitHub ↗', viewCode: 'ver código', h_skills: 'Qualificações', h_edu: 'Educação', h_lang: 'Idiomas',
    skillHint: 'clique numa tecnologia para filtrar as experiências', filterIdle: 'clique numa tecnologia para filtrar',
    filterOn: (s, n, t) => `filtro: ${s} · ${n} de ${t} — clique de novo para limpar`,
    show: n => `[+] ver atividades (${n})`, hide: '[−] ocultar atividades',
    copy: 'copiar', copiedJson: '✓ copiado',
    notFound: c => `comando não encontrado: ${c}. tente 'help'`, opening: 'abrindo wesley-alvarenga.json…',
    helpTitle: 'comandos disponíveis:',
    cmd: { about: 'sobre', projects: 'projetos', experience: 'experiencia', skills: 'skills', education: 'educacao', languages: 'idiomas', contact: 'contato' },
    help: { whoami: 'quem sou eu', about: 'resumo profissional', experience: 'onde trabalhei', projects: 'projetos no GitHub', skills: 'tecnologias e metodologias', education: 'formação acadêmica', languages: 'línguas', contact: 'email e telefone', json: 'ver currículo em JSON', clear: 'limpar terminal' },
    phone: 'telefone', stack: 'stack', hire: '✓ excelente escolha.',
  },
  en: {
    tabs: ['about.tsx', 'terminal.sh', 'experience.ts', 'projects.ts', 'stack.json', 'education.md'],
    visual: 'Visual', hello: '// hello, world — I am',
    roles: ['Front-end Developer', 'Fullstack with Angular, Next.js & NestJS', 'Mid-level Frontend', 'TypeScript & JavaScript'],
    copied: '✓ email copied', placeholder: 'type help',
    welcome: ['Welcome! This résumé also responds to commands.', "Type 'help' or click a command below."],
    h_exp: 'Experience', h_proj: 'Projects', toTop: 'Back to top', allRepos: 'see all on GitHub ↗', viewCode: 'view code', h_skills: 'Skills', h_edu: 'Education', h_lang: 'Languages',
    skillHint: 'click a technology to filter experience', filterIdle: 'click a technology to filter',
    filterOn: (s, n, t) => `filter: ${s} · ${n} of ${t} — click again to clear`,
    show: n => `[+] show highlights (${n})`, hide: '[−] hide highlights',
    copy: 'copy', copiedJson: '✓ copied',
    notFound: c => `command not found: ${c}. try 'help'`, opening: 'opening wesley-alvarenga.json…',
    helpTitle: 'available commands:',
    cmd: { about: 'about', projects: 'projects', experience: 'experience', skills: 'skills', education: 'education', languages: 'languages', contact: 'contact' },
    help: { whoami: 'who I am', about: 'professional summary', experience: 'where I worked', projects: 'GitHub projects', skills: 'technologies and methods', education: 'academic background', languages: 'spoken languages', contact: 'email and phone', json: 'view résumé as JSON', clear: 'clear terminal' },
    phone: 'phone', stack: 'stack', hire: '✓ great choice.',
  },
  ja: {
    tabs: ['about.tsx', 'terminal.sh', 'experience.ts', 'projects.ts', 'stack.json', 'education.md'],
    visual: 'ビジュアル', hello: '// こんにちは、世界 — 私は',
    roles: ['フロントエンド開発者', 'Angular・Next.js・NestJSでフルスタック', 'ミドルレベルフロントエンド', 'TypeScript & JavaScript'],
    copied: '✓ メールをコピーしました', placeholder: 'help と入力',
    welcome: ['ようこそ！この履歴書はコマンドにも応答します。', "'help' と入力するか、下のコマンドをクリックしてください。"],
    h_exp: '職務経歴', h_proj: 'プロジェクト', toTop: 'トップへ戻る', allRepos: 'GitHubですべて見る ↗', viewCode: 'コードを見る', h_skills: 'スキル', h_edu: '学歴', h_lang: '語学',
    skillHint: '技術をクリックすると職歴を絞り込めます', filterIdle: '技術をクリックして絞り込み',
    filterOn: (s, n, t) => `フィルター: ${s} · ${t}件中${n}件 — もう一度クリックで解除`,
    show: n => `[+] 業務内容を表示 (${n})`, hide: '[−] 業務内容を隠す',
    copy: 'コピー', copiedJson: '✓ コピー済み',
    notFound: c => `コマンドが見つかりません: ${c}。'help' を試してください`, opening: 'wesley-alvarenga.json を開いています…',
    helpTitle: '使用可能なコマンド:',
    cmd: { about: 'about', projects: 'projects', experience: 'experience', skills: 'skills', education: 'education', languages: 'languages', contact: 'contact' },
    help: { whoami: '自己紹介', about: '職務要約', experience: '職務経歴', projects: 'GitHubのプロジェクト', skills: '技術と手法', education: '学歴', languages: '語学', contact: 'メールと電話', json: 'JSONで表示', clear: 'ターミナルをクリア' },
    phone: '電話', stack: '技術', hire: '✓ 素晴らしい選択です。',
  },
};
