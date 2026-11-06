# CLAUDE.md — regras do projeto About-me

Portfólio pessoal de Eduardo Silva Morishita (Next.js 16 · React 19 · TypeScript · Tailwind v4 · React Three Fiber).

## Regras inegociáveis
1. **Nunca invente informação pessoal.** Projetos, datas, números, empresas, links: se não estiver em `src/content/profile.ts` ou não tiver sido dito pelo Eduardo, PERGUNTE. Placeholders usam o formato `[PREENCHER: ...]`.
2. **Fonte única de conteúdo:** `src/content/profile.ts`. Componentes, `/cv`, `/llms.txt` e JSON-LD leem dali. Não hardcode texto de conteúdo em componente.
3. **Commits só em nome do Eduardo (EduMoridev).** Não adicione linhas `Co-Authored-By` nem atribuição a IA em commits ou PRs.
4. **Paleta fechada** (fundo `navy` = oklch(13% 0.028 261.692); superfícies e crachá = #14213D; texto = cream #F4EDE0): use apenas os tokens de `src/app/globals.css` (`navy`, `navy-deep`, `navy-soft`, `navy-line`, `cream`, `cream-dim`, `cream-mute`). Nada de cores soltas.
5. **Legível por máquina:** todo conteúdo precisa existir no HTML gerado no servidor (abas usam `hidden`, não render condicional). IAs de triagem e ATS não executam JS de forma confiável.
6. **3D é enfeite, não conteúdo:** o crachá (`Lanyard.tsx`) só carrega em desktop sem `prefers-reduced-motion`; nada importante pode depender dele.

7. **Efeitos de fundo não podem custar legibilidade:** ao mexer em intensidade de `LightRibbons`/`CursorSmoke`, meça o contraste de cada texto sobre o fundo com os efeitos ativos (≥ 4,5:1; 3:1 para texto ≥ 24 px). Texto pequeno que fica sobre a área do feixe vai num pill com fundo (`bg-navy/80`).
8. **Conteúdo nunca depende de animação:** `.reveal` só esconde quando `<html data-motion>` é `full`/`lite`. Não use bibliotecas de reveal que escondem por padrão.

## Comandos
- `npm run dev` — desenvolvimento (http://localhost:3000)
- `npm run build` — build de produção (precisa passar antes de qualquer commit)
- `npm run check` — lista placeholders `[PREENCHER]` pendentes

## Mapa
- `src/content/profile.ts` — todo o conteúdo
- `src/lib/seo.ts` — JSON-LD (schema.org Person) e currículo em Markdown
- `src/app/page.tsx` — home (Intro, Nav, Hero, About, Experience, Showcase, Contact, Footer)
- `src/app/cv/page.tsx` — currículo HTML semântico, ATS-friendly e imprimível
- `src/app/projetos/[slug]/page.tsx` — estudo de caso por projeto (SSG)
- `src/app/llms.txt/route.ts`, `robots.ts`, `sitemap.ts` — camada para buscadores/IA
- `src/components/Lanyard.tsx` — crachá 3D (rapier + meshline), texturas desenhadas em canvas
