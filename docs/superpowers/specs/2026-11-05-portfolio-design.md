# Design — Portfólio About-me (2026-11-05)

## Objetivo
Conseguir entrevistas para vaga de **dev front-end júnior** (principal) e mostrar o trabalho freelance (secundário). *Hipótese assumida: o Eduardo não respondeu a pergunta sobre o objetivo; confirmar.*

## Referência
Vídeo de `portofolio-rho-sand-92.vercel.app` (template Portofolio_V5 do EkiZR + componente Lanyard da React Bits). Mantido: tela de boas-vindas, hero com título em duas linhas (segunda "apagada"), subtítulo digitado, crachá 3D arrastável, About com foto e contadores, abas Projetos/Tech Stack/Certificados, página de detalhe por projeto, fundo com grade.

## Mudanças em relação à referência
- Paleta Navy `#14213D` / Cream `#F4EDE0` (em vez de preto/branco). Os tons intermediários são misturas das duas cores.
- Crachá sem `card.glb` (geometria própria, texturas de canvas a partir do conteúdo), para não ser o componente de prateleira.
- **Adicionado:** seção Experiência, estudos de caso (problema → papel → resultado), `/cv` em HTML, `/llms.txt`, JSON-LD, robots liberando crawlers de IA, sitemap.
- **Removido:** mural de comentários e formulário (risco de spam, nenhum valor para contratação). Contato = email copiável + LinkedIn + GitHub + CV.
- Intro de 1,6 s, só uma vez por sessão, pula com clique; 3D só em desktop sem reduced-motion.

## Arquitetura
Next.js 16, tudo estático (SSG). Conteúdo em `src/content/profile.ts`, que é a fonte única. Consumidores: componentes, `/cv`, `/llms.txt` e `personJsonLd()`.

## Critérios de sucesso
- Todo o conteúdo aparece no HTML sem JS (verificável com curl).
- Lighthouse mobile 95+ (pendente: prompt 7).
- Zero `[PREENCHER]` antes de publicar (`npm run check`).
