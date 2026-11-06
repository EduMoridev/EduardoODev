# About-me — portfólio de Eduardo Silva Morishita

Portfólio de desenvolvedor front-end. Next.js 16 (App Router, 100% estático), React 19, TypeScript, Tailwind CSS v4, Framer Motion e um crachá 3D interativo com física (React Three Fiber + Rapier).

## Rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run check    # lista o que falta preencher
npm run build
```

## Editar conteúdo

Tudo fica em **`src/content/profile.ts`**. Campos `[PREENCHER: ...]` aparecem tracejados no site até serem preenchidos.

Arquivos que você precisa colocar em `public/`:
- `me.webp` / `me-bust.webp` — foto sem fundo (já gerada) e recorte cabeça+ombros para o crachá
- `kronos.svg` — logo da Kronos vetorizada (`fill="currentColor"`, tingível via CSS)
- `cv.pdf` — currículo em PDF
- screenshots dos projetos (ex.: `public/projetos/kronos.png`, depois preencha `image` no projeto)

## Feito para recrutador (e para a IA do recrutador)

| Recurso | Por quê |
|---|---|
| HTML estático com todo o conteúdo | Triagens por IA e ATS leem texto do servidor, não JS |
| `/cv` | Currículo em HTML semântico, uma coluna, imprime limpo em PDF |
| `/llms.txt` | Currículo em Markdown gerado do `profile.ts`, para LLMs |
| JSON-LD `Person` | Nome, cargo, skills e links como dados estruturados |
| `robots.txt` liberando GPTBot/ClaudeBot/PerplexityBot | O portfólio quer ser lido |
| Estudos de caso (problema → papel → resultado) | É o que tech lead avalia |
| Seção de Experiência | Ausente no vídeo de referência; é a primeira coisa que recrutador procura |
| Sem mural de comentários / formulário | Evita spam e conteúdo impróprio na frente do recrutador |

## Efeitos visuais

| Efeito | Arquivo | Notas |
|---|---|---|
| Feixe de luz que se curva até o cursor | `components/background/LightRibbons.tsx` | canvas 2D, 30 Béziers, `lighter` |
| Fumaça cream no cursor | `components/background/CursorSmoke.tsx` | pool de 60 partículas, sprite pré-renderizado |
| Vidro com brilho que segue o mouse | `.glass` em `globals.css` + `GlassPointer.tsx` | `backdrop-filter` + `--gx/--gy` |
| Surgimento lento no scroll (1,1 s, cascata) | `Reveal.tsx` + `.reveal` em `globals.css` | sem JS = tudo visível |

**Níveis de movimento** (`src/lib/motion/level.ts`), decididos antes da 1ª pintura em `<html data-motion>`:
`full` (tudo) · `lite` (toque, ≤4 núcleos, ≤4 GB ou economia de dados: sem canvas, crachá estático, glow em CSS) · `off` (reduced-motion: nada anima).
Se o frame médio passar de 20 ms por 2 s, a fumaça cai pela metade e depois desliga; a luz vira o glow estático.

Testar na URL: `?motion=full`, `?motion=lite`, `?motion=off`. `&degrade=0` desliga a degradação automática e registra o custo por frame em `window.__fxCost` (só para teste).

Medido (build de produção, máquina de 2 núcleos com render por software): efeitos custam ~0,7 ms/frame (p95 2 ms). Contraste: os 72 textos sobre o fundo passam WCAG AA com luz + fumaça ativas (pior caso 4,62:1 em texto pequeno; 4,21:1 no título grande, mínimo 3:1).

## Deploy (Vercel)

Defina `NEXT_PUBLIC_SITE_URL` com a URL final (ex.: `https://seunome.dev`). JSON-LD, sitemap e llms.txt usam essa variável.

## Créditos

Física do crachá baseada no post da Vercel “Building an interactive 3D event badge with React Three Fiber”. Cartão e texturas próprios (sem `card.glb`).
