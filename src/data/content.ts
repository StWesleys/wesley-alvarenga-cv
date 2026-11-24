import type { Experience } from './experiences';
import type { SkillGroup } from './skills';
import type { Lang } from './ui';

export interface ExpText {
  role: string;
  place: string;
  summary: string;
  bullets: string[];
}

export interface Content {
  title: string;
  baseLabel: string;
  open: { label: string; items: string[] };
  about: string;
  location: string;
  exps: Record<Experience['id'], ExpText>;
  groups: Record<SkillGroup, string>;
  edu: { course: string; place: string };
  langs: { name: string; level: string }[];
}

export const C: Record<Lang, Content> = {
  pt: {
    title: 'Desenvolvedor Front-end com atuação Fullstack',
    baseLabel: 'moro em', open: { label: 'disponível para', items: ['Remoto', 'Híbrido', 'Presencial', 'CLT', 'PJ', 'Vagas internacionais'] },
    about: 'Desenvolvedor Frontend Pleno com experiência em programação de aplicações web, especializado em arquitetura MVC e desenvolvimento orientado a objetos. Buscando contribuir para projetos desafiadores que utilizem tecnologias modernas e metodologias ágeis.',
    location: 'Minas Gerais, Brasil',
    exps: {
      tab: { role: 'Desenvolvedor Frontend', place: 'Minas Gerais, Brasil',
        summary: 'Responsável por todo o frontend da TabControl, plataforma omnichannel, desde 2022. A plataforma conta com URA, chatbot com IA e supervisão em tempo real, atendendo operações em escala nos setores público e privado.',
        bullets: ['Desenvolvimento de novas funcionalidades do zero utilizando Angular, TypeScript, HTML e SCSS', 'Reestruturação completa do layout da aplicação, melhorando a usabilidade e experiência do usuário', 'Integração com APIs REST desenvolvidas em Python para consumo e manipulação de dados', 'Criação de componentes reutilizáveis e organização da arquitetura frontend', 'Atuação com autonomia na resolução de problemas e evolução contínua do sistema', 'Participação em melhorias de performance e manutenção da aplicação', 'Uso de ferramentas de IA no fluxo de desenvolvimento para acelerar entregas'] },
      bear: { role: 'Desenvolvedor Fullstack · Voluntário', place: 'Brasil',
        summary: 'Atuação voluntária como desenvolvedor fullstack na Bear System, onde iniciei o desenvolvimento do layout do frontend do aplicativo LikeDelivery, usando React, Node.js, Next.js e Firebase.', bullets: [] },
      prodemge: { role: 'Estagiário · Analista de Planejamento', place: 'Belo Horizonte, MG',
        summary: 'Estágio na Companhia de Tecnologia da Informação do Estado de Minas Gerais, no setor de Inovações Tecnológicas, participando de iniciativas e projetos como Blockchain, Transformação Digital e Data Science.',
        bullets: ['Preparo, execução e registro de agendas de ideação para levantar soluções para problemas e necessidades dos clientes, com dinâmicas criativas focadas em Design Thinking', 'Apoio em agendas de definição de produto com a metodologia Lean Inception, priorizando soluções e sistemas em MVP', 'Facilitação de ideações e uso do PM Canvas no planejamento de projetos', 'Compartilhamento de conhecimentos sobre Design Thinking com outros setores', 'Manutenção da documentação, artefatos e fluxos dos processos da área (PowerPoint, Word, Excel e Data Studio)', 'Gestão da sala de inovação virtual: atualização das salas, acompanhamento dos eventos e gestão dos recursos'] },
    },
    groups: { lang: 'Linguagens', front: 'Frontend', back: 'Backend', ai: 'Inteligência Artificial', tools: 'Ferramentas', style: 'Estilização', agile: 'Metodologias Ágeis' },
    edu: { course: 'Bacharel em Sistemas da Informação', place: 'Belo Horizonte, MG' },
    langs: [{ name: 'Português', level: 'Nativo' }, { name: 'Inglês', level: 'Avançado' }, { name: 'Japonês', level: 'JLPT N5' }],
  },
  en: {
    title: 'Front-end Developer with Fullstack experience',
    baseLabel: 'based in', open: { label: 'open to', items: ['Remote', 'Hybrid', 'On-site', 'Full-time (CLT)', 'Contractor (PJ)', 'International roles'] },
    about: 'Mid-level Frontend Developer with experience building web applications, specialized in MVC architecture and object-oriented development. Looking to contribute to challenging projects that use modern technologies and agile methodologies.',
    location: 'Minas Gerais, Brazil',
    exps: {
      tab: { role: 'Frontend Developer', place: 'Minas Gerais, Brazil',
        summary: 'Responsible for the entire frontend of TabControl, an omnichannel platform, since 2022. The platform includes IVR, an AI chatbot and real-time supervision, serving large-scale operations in the public and private sectors.',
        bullets: ['Built new features from scratch using Angular, TypeScript, HTML and SCSS', 'Fully restructured the application layout, improving usability and user experience', 'Integrated with REST APIs built in Python to consume and handle data', 'Created reusable components and organized the frontend architecture', 'Solved problems autonomously and drove continuous improvement of the system', 'Contributed to performance improvements and application maintenance', 'Use AI tools in the development workflow to speed up delivery'] },
      bear: { role: 'Fullstack Developer · Volunteer', place: 'Brazil',
        summary: 'Volunteer fullstack developer at Bear System, where I started building the frontend layout of the LikeDelivery app using React, Node.js, Next.js and Firebase.', bullets: [] },
      prodemge: { role: 'Planning Analyst Intern', place: 'Belo Horizonte, MG',
        summary: 'Internship at the Minas Gerais State IT Company, in the Technology Innovation department, taking part in initiatives and projects such as Blockchain, Digital Transformation and Data Science.',
        bullets: ['Prepared, ran and documented ideation sessions to generate solutions for client problems and needs, using creative Design Thinking dynamics', 'Supported product definition sessions using the Lean Inception methodology, prioritizing solutions and systems as MVPs', 'Facilitated ideations and used the PM Canvas for project planning', 'Shared Design Thinking knowledge with other departments', 'Maintained process documentation, artifacts and flows (PowerPoint, Word, Excel and Data Studio)', 'Managed the virtual innovation room: room updates, event follow-up and resource management'] },
    },
    groups: { lang: 'Languages', front: 'Frontend', back: 'Backend', ai: 'Artificial Intelligence', tools: 'Tools', style: 'Styling', agile: 'Agile Methodologies' },
    edu: { course: 'Bachelor of Information Systems', place: 'Belo Horizonte, MG' },
    langs: [{ name: 'Portuguese', level: 'Native' }, { name: 'English', level: 'Advanced' }, { name: 'Japanese', level: 'JLPT N5' }],
  },
};
