import type { Lang } from './ui';

export interface Project {
  id: 'resume' | 'chat';
  name: string;
  url: string;
  techs: string[];
}

export interface ProjectText {
  tagline: string;
  summary: string;
  parts: [path: string, desc: string][];
}

export const PROJECTS: Project[] = [
  { id: 'resume', name: 'resume-ai', url: 'https://github.com/StWesleys/resume-ai', techs: ['NextJS', 'NestJS', 'Prisma', 'Supabase', 'TypeScript', 'Tailwind', 'IA / LLM'] },
  { id: 'chat', name: 'chatbot-project', url: 'https://github.com/StWesleys/chatbot-project', techs: ['Angular', 'NestJS', 'TypeScript', 'RxJS', 'Tailwind', 'OpenRouter', 'IA / LLM'] },
];

export const PROJ: Record<Lang, Record<Project['id'], ProjectText>> = {
  pt: {
    resume: { tagline: 'Gerador de currículos inteligente com IA', summary: 'Aplicação fullstack que ajuda profissionais a criarem currículos otimizados com Inteligência Artificial. Permite gerenciar dados profissionais e usa IA para sugerir melhorias no resumo e nas experiências.', parts: [['/web', 'Frontend em Next.js 15 (App Router), Tailwind CSS e TypeScript'], ['/api', 'API em NestJS com a lógica de negócio e integração com LLMs'], ['db', 'PostgreSQL via Supabase, com Prisma como ORM']] },
    chat: { tagline: 'Chatbot fullstack com integração a IA', summary: 'Chatbot desenvolvido com Angular 19, NestJS e TailwindCSS, com foco em boas práticas de mercado, arquitetura em camadas e integração com APIs de IA via OpenRouter.', parts: [['/web', 'Angular 19 com RxJS, HttpClient e TailwindCSS; layout de chat com estado de "digitando..." e auto-scroll'], ['/api', 'NestJS em camadas (Controller → Service), DTOs, validação com class-validator e tratamento de erros'], ['POST /chat', 'Integração com a API do OpenRouter, com configuração por variáveis de ambiente']] },
  },
  en: {
    resume: { tagline: 'AI-powered résumé generator', summary: 'Fullstack application that helps professionals create optimized résumés with Artificial Intelligence. It manages professional data and uses AI to suggest improvements to the summary and experience.', parts: [['/web', 'Next.js 15 frontend (App Router), Tailwind CSS and TypeScript'], ['/api', 'NestJS API with business logic and LLM integration'], ['db', 'PostgreSQL on Supabase, with Prisma as ORM']] },
    chat: { tagline: 'Fullstack chatbot with AI integration', summary: 'Chatbot built with Angular 19, NestJS and TailwindCSS, focused on industry best practices, layered architecture and integration with AI APIs through OpenRouter.', parts: [['/web', 'Angular 19 with RxJS, HttpClient and TailwindCSS; chat layout with "typing..." state and auto-scroll'], ['/api', 'Layered NestJS (Controller → Service), DTOs, class-validator validation and error handling'], ['POST /chat', 'OpenRouter API integration, configured through environment variables']] },
  },
  ja: {
    resume: { tagline: 'AIを活用した履歴書ジェネレーター', summary: 'AIを使って最適化された履歴書を作成できるフルスタックアプリケーション。職務データを管理し、AIが職務要約や経歴の改善案を提案します。', parts: [['/web', 'Next.js 15（App Router）、Tailwind CSS、TypeScriptによるフロントエンド'], ['/api', 'ビジネスロジックとLLM連携を担うNestJS API'], ['db', 'SupabaseのPostgreSQLとORMのPrisma']] },
    chat: { tagline: 'AI連携のフルスタックチャットボット', summary: 'Angular 19、NestJS、TailwindCSSで開発したチャットボット。実務のベストプラクティス、レイヤードアーキテクチャ、OpenRouter経由のAI API連携に重点を置いています。', parts: [['/web', 'RxJS、HttpClient、TailwindCSSを使ったAngular 19。「入力中...」表示と自動スクロールのチャットUI'], ['/api', 'レイヤード構成のNestJS（Controller → Service）、DTO、class-validatorによる検証、エラーハンドリング'], ['POST /chat', '環境変数で設定するOpenRouter APIとの連携']] },
  },
};
