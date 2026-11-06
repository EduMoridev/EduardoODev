# Prompts para continuar no Claude Code

Rode na ordem e em sessões separadas: cada prompt é uma tarefa fechada. O `CLAUDE.md` já passa as regras (não inventar dados, paleta, commits só em seu nome).

Antes do primeiro: `npm install` e `npm run dev` para ver o site.

---

## 1. Preencher o conteúdo comigo (o mais importante)

```
Leia CLAUDE.md e src/content/profile.ts. Rode `npm run check` para listar os [PREENCHER].
Me entreviste para preencher TODOS eles, UMA pergunta por vez, começando por:
email, LinkedIn, localização/modelo de trabalho, instituição e período do curso, nível de inglês.
Depois, para cada projeto e experiência, pergunte: qual problema resolve, o que EU fiz
(não o time), uma decisão técnica difícil e um resultado com número.
Se minha resposta for vaga ("fiz o front"), me pressione por algo concreto e mensurável.
Não invente nada. Ao final reescreva headline e bio com base no que eu disse e me mostre para aprovar.
Confirme comigo a lista de skills (algumas foram deduzidas, não ditas). Rode `npm run build`.
```

## 2. Projetos: decidir o que entra

```
Olhe os projetos em src/content/profile.ts. Me ajude a decidir quais 3–4 mostrar para uma vaga
de front-end júnior: seja crítico, diga quais enfraquecem o portfólio (ex.: projeto sem
front-end, sem demo, ou repositório privado sem prova). Pergunte se tenho outros projetos no
GitHub EduMoridev que valham mais. Para cada um que ficar, me peça screenshots e salve em
public/projetos/<slug>.png e preencha `image`.
```

## 3. Imagem de compartilhamento (OG) automática

```
Crie src/app/opengraph-image.tsx com next/og (1200x630), usando a paleta navy #14213D /
cream #F4EDE0, nome, cargo e headline vindos de src/content/profile.ts. Faça o mesmo para
cada /projetos/[slug]. Verifique com `npm run build` e me mostre como testar no
opengraph.xyz depois do deploy.
```

## 4. Foto no crachá 3D

```
Em src/components/Lanyard.tsx a textura do cartão usa monograma. Se public/me.jpg existir,
carregue a imagem (Image + onload) e desenhe com drawImage recortada em círculo no lugar do
monograma, com fallback pro monograma. Mantenha a espera de document.fonts.ready.
Teste no desktop arrastando o crachá.
```

## 5. Logos na aba Tech Stack

```
Na aba "Tech Stack" de src/components/Showcase.tsx, adicione os logos das tecnologias usando
o pacote `simple-icons` (SVG inline, só os ícones usados, para não pesar o bundle). Os logos
devem ficar monocromáticos em cream e ganhar a cor da marca só no hover. O nome continua
como texto, porque o ATS lê texto e não imagem.
```

## 6. Versão em inglês

```
Adicione i18n PT-BR/EN sem biblioteca pesada: rotas /en espelhando a home, /en/cv e
/en/projetos/[slug], conteúdo traduzido em src/content/profile.en.ts com o mesmo tipo,
seletor de idioma na Nav, hreflang no metadata e /llms.txt citando as duas versões.
Me pergunte antes de traduzir títulos de cargo (alguns ficam melhor em inglês nos dois).
```

## 7. Auditoria de qualidade (o que o tech lead vai olhar)

```
Faça uma auditoria crítica do portfólio como um tech lead revisando um candidato júnior:
1) Lighthouse (performance, acessibilidade, SEO, boas práticas) — mire 95+ em tudo no mobile;
2) acessibilidade: navegação por teclado, foco visível, contraste da paleta (cream-mute sobre navy),
   abas ARIA, reduced-motion;
3) bundle: confirme que three.js só carrega no desktop;
4) qualidade do código: componentes, tipos, nomes.
Liste problemas por severidade, corrija os críticos e me pergunte sobre o resto.
```

## 8. Teste de leitura por IA/ATS

```
Simule uma triagem automatizada: faça build, sirva o site, e extraia o texto de /, /cv e
/llms.txt SEM executar JavaScript (curl). Responda como um recrutador-IA faria para uma vaga
"Desenvolvedor Front-end Júnior — React/Next.js/TypeScript": nota de 0–10, keywords
encontradas e faltando, e o que eu deveria mudar no conteúdo. Valide também o JSON-LD
(schema.org Person).
```

## 9. Deploy

```
Prepare o deploy na Vercel: configure NEXT_PUBLIC_SITE_URL, confira robots/sitemap com a
URL final, adicione @vercel/analytics para eu ver as visitas, e me passe o checklist para
conectar domínio próprio. Não faça commit sem eu pedir; commits só no meu nome, sem co-autor.
```

## 10. Teste de fumaça

```
Adicione Playwright com um teste que: abre /, confere h1, links de contato, as 3 abas,
navega para um /projetos/[slug] e para /cv, e garante zero erros no console.
Adicione script `npm test` e um workflow do GitHub Actions rodando build + test em PR.
```
