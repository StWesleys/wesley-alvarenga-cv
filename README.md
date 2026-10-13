# Wesley Alvarenga · currículo

Site estático em React 18 + TypeScript + Vite, publicado na Cloudflare (Workers com static assets).

## Rodar localmente

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera dist/
npm run preview   # serve dist/ em http://localhost:4173
```

## Editar o conteúdo

Todo o conteúdo fica em `src/data/`:

| Arquivo | O que tem |
|---|---|
| `profile.ts` | nome, e-mail, telefone, links (GitHub, LinkedIn, WhatsApp) |
| `experiences.ts` | empresas, datas, fases (CLT/PJ) e tecnologias |
| `projects.ts` | repositórios e textos de cada projeto por idioma |
| `skills.ts` | tecnologias por grupo e equivalências do filtro (SASS = SCSS) |
| `content.ts` | textos por idioma: cargo, sobre, experiências, grupos, educação, idiomas, disponibilidade |
| `ui.ts` | textos da interface: abas, terminal, botões, filtros |

## Publicar na Cloudflare

A Cloudflare recomenda hoje **Workers** para projetos novos (a documentação de Pages diz: "Start new projects with Workers"). O site é só arquivos estáticos, então o `wrangler.jsonc` aponta a pasta `dist/` como assets e não há script de Worker.

### 1. Subir para o GitHub

```bash
git init
git add .
git commit -m "Currículo em React + Vite"
git branch -M main
git remote add origin https://github.com/StWesleys/wesley-alvarenga-cv.git   # crie o repositório antes
git push -u origin main
```

### 2. Conectar na Cloudflare

1. No painel da Cloudflare, abra **Workers & Pages** → **Create** → **Import a repository**.
2. Autorize o GitHub e escolha o repositório.
3. Confira as configurações de build:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
   - **Root directory:** `/` (raiz)
4. Clique em **Deploy**. O site fica em `https://wesley-alvarenga-cv.<sua-conta>.workers.dev`.

A partir daí, cada `git push` na `main` publica uma nova versão.

> Alternativa sem GitHub: `npx wrangler login` e depois `npm run deploy`.

### 3. Domínio próprio (opcional)

1. Em **Workers & Pages** → seu projeto → **Settings** → **Domains & Routes** → **Add** → **Custom domain**.
2. Informe o domínio (ele precisa estar na sua conta Cloudflare).
3. Troque `https://SEU-DOMINIO` no `index.html` (`og:url`, `og:image`, `twitter:image`) pelo domínio final e faça um novo push.

## Cache

`public/_headers` (suportado pelo Workers static assets) define:

- `/assets/*`: arquivos com hash no nome, cache de 1 ano (`immutable`).
- HTML (`/` e `/index.html`): `max-age=0, must-revalidate`, para cada deploy aparecer na hora.
- `favicon.svg` e `og.png`: 1 dia.
