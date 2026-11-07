/**
 * FONTE ÚNICA DE VERDADE do portfólio.
 * Site, página /cv, /llms.txt e JSON-LD leem daqui — edite só este arquivo.
 *
 * Origem de cada dado (nada inventado):
 *  CV   = Curriculo_Eduardo_Silva_Morishita_PT.pdf
 *  GH   = README do perfil github.com/EduMoridev
 *  GIT  = histórico de commits dos repositórios em C:/Dev
 *  REPO = README / package.json / código do projeto
 *  CHAT = informado pelo Eduardo na conversa
 *
 * "[PREENCHER: ...]" = ainda não informado. `npm run check` lista o que falta.
 */

export type Link = { label: string; href: string };

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  /** Problema que o projeto resolve (recrutador lê isso primeiro). */
  problem: string;
  /** O que VOCÊ fez — papel, não o time. */
  role: string;
  highlights: string[];
  /** Resultado / estado atual. */
  outcome: string;
  stack: string[];
  repo?: string;
  live?: string;
  /** Repositório privado: mostre isso em vez de esconder o projeto. */
  privateRepo?: boolean;
  image?: string;
  logo?: string;
  featured?: boolean;
  /** selo da linha do projeto, como no portfólio antigo */
  status: "No ar" | "Publicado" | "Em desenvolvimento" | "Concluído";
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  location?: string;
  bullets: string[];
  stack: string[];
  /** Logo em /public (SVG monocromático com fill="currentColor"). */
  logo?: string;
};

export type Credential = {
  name: string;
  issuer: string;
  year?: string;
  /** false = curso concluído sem certificado emitido (ex.: plano pago da Rocketseat). */
  certificate: boolean;
  url?: string;
  image?: string;
};

export const profile = {
  name: "Eduardo Silva Morishita",
  shortName: "Eduardo Morishita",
  handle: "eduardo.morishita",
  // Sempre: Software Engineer + Full Stack (pedido do Eduardo). Em inglês de propósito:
  // "Engenheiro de Software" em português é título regulado pelo CONFEA/CREA (exige diploma + registro).
  role: "Software Engineer",
  roleSecondary: "Full Stack Developer",
  /** Título completo: metadata, CV, JSON-LD, llms.txt. */
  roleFull: "Software Engineer · Desenvolvedor Full Stack",
  rotatingRoles: [
    "Desenvolvedor Full Stack",
    "Co-founder @ Kronos",
    "React · Next.js · TypeScript · Java",
  ],
  /** Frase de 1 linha usada no hero, OG e por IAs de triagem. */
  headline:
    "Software Engineer e desenvolvedor full stack, cofundador da Kronos. Interfaces em React, Next.js e TypeScript; back-end com Java e Spring Boot.", // CHAT + CV + GH
  /** Bio em 1ª pessoa — escrita a partir do CV; revise o tom. */
  bio: [
    "Sou Software Engineer e desenvolvedor full stack, cofundador da Kronos — uma plataforma de agendamentos e reuniões em que construo as interfaces do produto em React, Next.js e TypeScript, do fluxo de agendamento ao layout responsivo. No back-end, trabalho com Java, Spring Boot e APIs REST. Também converso com usuários para transformar o que eles precisam em requisitos.", // CV + GIT
    "Fora da Kronos, desenvolvo sites como freelancer e projetos próprios, como o ESM Tweaks, um otimizador de Windows para jogos. Antes do código, liderei por cinco anos uma equipe de robótica competitiva, onde aprendi a planejar, priorizar e resolver problemas sob pressão.", // CV + REPO
    "Estudo Engenharia de Software na UNICID e procuro uma vaga júnior como desenvolvedor full stack ou front-end.", // CV + GH
  ],
  location: "São Paulo, SP", // CV (endereço completo fica de fora de propósito)
  availability: {
    open: true,
    label: "Disponível para vagas júnior",
    detail: "Full Stack · Front-end · CLT ou PJ", // GH
  },
  email: "edu.mori@hotmail.com", // CV + GH
  links: {
    github: "https://github.com/EduMoridev",
    /** repositório deste portfólio (link "código-fonte" do rodapé) */
    source: "https://github.com/EduMoridev/EduardoODev",
    // GH usa este slug; o CV mostra linkedin.com/in/eduardo-silva-morishita — confirme qual abre o seu perfil
    linkedin: "https://www.linkedin.com/in/eduardo-silva-morishita-268a89316/",
  },
  photo: "/me.webp",
  photoBust: "/me-bust.webp",
  // public/cv.pdf é GERADO a partir da página /cv (Ctrl+P → PDF), sem endereço e telefone.
  // Nunca publique o PDF original do currículo: ele tem endereço residencial e celular.
  // Mudou o conteúdo? Regere: abra /cv, Ctrl+P, "Salvar como PDF", substitua public/cv.pdf.
  cvPdf: "/cv.pdf",

  education: [
    {
      institution: "Universidade Cidade de São Paulo (UNICID)",
      course: "Bacharelado em Engenharia de Software",
      period: "2026 – 2030 (previsão) · 2º semestre",
    },
  ], // CV

  /** Agrupado por categoria: IAs de triagem e ATS fazem match por palavra-chave. */
  skills: {
    "Front-end": ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS", "shadcn/ui", "HeroUI", "React Hook Form", "Motion", "GSAP"],
    "Back-end": ["Java", "Spring Boot", "Node.js", "APIs REST", "SQL", "Maven"],
    Linguagens: ["TypeScript", "JavaScript", "Java", "Python", "C", "C#", "C++", "PowerShell"],
    "IDEs e IA": ["VS Code", "IntelliJ IDEA", "Cursor", "Antigravity", "Claude Code"],
    Ferramentas: ["Git", "GitHub", "Docker", "Vercel", "Apidog", "Figma", "Arduino"],
    "Gestão e métodos": ["Metodologias ágeis", "Trello", "Miro", "Notion"],
  } as Record<string, string[]>, // CV + GH + GIT + CHAT (lista dada pelo Eduardo: Miro, Cursor, Antigravity, Trello, ágil, Docker, Apidog, Maven) + pastas locais (IntelliJ, VS Code)

  softSkills: [
    "Liderança de equipe",
    "Planejamento e priorização",
    "Resolução de problemas sob pressão",
    "Comunicação e apresentação",
    "Escuta ativa e visão de produto",
    "Aprendizado rápido e autonomia",
  ], // CV

  languages: ["Português (nativo)", "Inglês (intermediário — B2)", "Espanhol (básico)", "Francês (iniciante)"], // CV
};

export const experience: Experience[] = [
  {
    company: "Kronos",
    title: "Cofundador & Desenvolvedor Front-end",
    period: "2024 – atual",
    location: "São Paulo, SP",
    bullets: [
      "Cofundei a startup nascida do projeto, hoje em desenvolvimento ativo.",
      "Desenvolvo interfaces web responsivas em React e TypeScript, com componentes reutilizáveis e arquitetura modular.",
      "Construí o fluxo de agendamento: calendário, seleção de horários, pré-visualização de eventos e formulários com React Hook Form.",
      "Integro o front-end ao back-end por APIs REST, com versionamento em Git e GitHub.",
      "Converto conversas com usuários em requisitos e defino prioridades do roadmap com tempo e recursos limitados.",
      "Apresento o projeto para banca avaliadora, mentores e potenciais clientes.",
    ], // CV + GIT
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Hook Form"],
    logo: "/kronos.svg",
  },
  {
    company: "Freelance",
    title: "Desenvolvedor Full Stack",
    period: "2026 – atual",
    bullets: [
      "Desenvolvimento de sites institucionais e de produto, da entrevista de requisitos com o cliente ao deploy na Vercel.",
      "Site da UsantoosFps: 15 rotas em Next.js, conteúdo centralizado e verificações automáticas de dados e contraste no build.",
    ], // GH + GIT + REPO
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    company: "Robótica Educacional e Competitiva",
    title: "Líder de Equipe e Desenvolvedor",
    period: "2015 – 2020",
    location: "São Paulo, SP",
    bullets: [
      "Liderei a equipe nas competições: distribuí tarefas, coordenei os integrantes e acompanhei prazos.",
      "Planejei cronograma, peças e preparação técnica de cada competição.",
      "Projetei e construí robôs de batalha com LEGO Maker e protótipos com Arduino, integrando sensores, atuadores e sistemas de controle.",
      "Diagnostiquei e corrigi falhas durante as competições, adaptando a estratégia em tempo real.",
    ], // CV
    stack: ["Arduino", "LEGO Maker"],
  },
];

export const projects: Project[] = [
  {
    slug: "kronos",
    status: "Em desenvolvimento",
    name: "Kronos",
    tagline: "Plataforma de agendamentos e reuniões",
    problem:
      "Marcar uma reunião costuma exigir uma troca de mensagens só para achar um horário. Na Kronos, cada usuário tem uma página pública com seus tipos de evento; o cliente escolhe um horário livre no fuso dele, recebe a confirmação por e-mail e entra na videochamada pela própria plataforma.", // REPO
    role: "Cofundador e desenvolvedor front-end, responsável pelas interfaces do produto e pela integração com o back-end via APIs REST.", // CV + GIT
    highlights: [
      "Fluxo de agendamento público: calendário, seleção de horários e pré-visualização do evento.",
      "Formulários de criação e edição de eventos com React Hook Form.",
      "Layout responsivo do painel, com sidebar e menu mobile.",
      "Página do evento de lançamento com animações em GSAP e carrossel com Embla.",
    ], // GIT (commits) + REPO
    outcome: "Em desenvolvimento ativo. Apresentado a banca avaliadora, mentores e potenciais clientes.", // CV
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "React Hook Form", "GSAP"],
    // repo é do sócio (herosnuciatelli/cronus-web); visibilidade não confirmada — sem link até confirmar
    logo: "/kronos.svg",
    featured: true,
  },
  {
    slug: "esm-tweaks",
    status: "Publicado",
    name: "ESM Tweaks",
    tagline: "Otimizador de Windows para jogos, reversível e honesto",
    problem:
      "Otimizadores de PC para jogos costumam aplicar ajustes sem explicar, sem como desfazer e às vezes desligando proteções do sistema. O ESM Tweaks primeiro diagnostica o que realmente limita o FPS e só depois aplica ajustes com efeito comprovado — cada um pode ser desfeito com um clique.", // REPO
    role: "Autor único: produto, interface e código.", // REPO + CHAT
    highlights: [
      "Diagnóstico somente leitura: RAM em canal único, driver antigo, jogo em HD, notebook na bateria, processos pesados em repouso.",
      "Toda alteração guarda o valor original em um backup e cria ponto de restauração do Windows antes de aplicar.",
      "Relatório PDF personalizado para o PC com o que o app não pode fazer sozinho (overlays, XMP, configurações do jogo).",
      "Recusa de propósito ajustes que deixam o PC vulnerável, como desligar o Windows Defender ou mitigações de CPU.",
      "Distribuição em um comando: irm https://esm-tweaks.vercel.app | iex.",
    ], // REPO
    outcome: "Publicado e gratuito pelo comando oficial; suporte especial a FiveM, VALORANT e War Thunder.", // REPO
    stack: ["PowerShell", "WPF", "Windows", "Vercel"],
    logo: "/logos/esm-tweaks.svg", // REPO: assets/logo-mark.svg
    live: "https://esm-tweaks.vercel.app",
    privateRepo: true,
    featured: true,
  },
  {
    slug: "usantoosfps",
    status: "No ar",
    name: "UsantoosFps",
    tagline: "Site institucional para serviço de otimização de PC para jogos",
    problem:
      "O cliente presta otimização remota de PC para jogos e precisava de um site que explicasse o serviço, mostrasse resultados e levasse o visitante a contratar um plano.", // REPO
    role: "Desenvolvi o front-end do site, a partir de uma entrevista de requisitos com o dono do negócio. O projeto também foi entregue como trabalho em grupo na faculdade.", // GIT (25/25 commits) + REPO
    highlights: [
      "15 rotas em Next.js (App Router): serviços, planos, resultados, depoimentos, blog, FAQ, contato e página de LGPD.",
      "Todo o conteúdo centralizado em um único arquivo, para o cliente atualizar sem mexer em componentes.",
      "Verificações no build: scripts que validam os dados de serviços e PCs e auditam o contraste das cores antes de publicar.",
      "Efeitos visuais (vidro, surgimento no scroll e fumaça no cursor) com orçamento de desempenho para PCs fracos.",
    ], // REPO + GIT
    outcome: "Publicado na Vercel e entregue ao cliente.", // verificado: site no ar em 06/11/2026
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI", "Motion"],
    live: "https://usantoss-fps.vercel.app", // GH homepage
    featured: true,
  },
  {
    slug: "calculadora-penal",
    status: "No ar",
    name: "Calculadora Penal Fronteira",
    tagline: "Calculadora de penas para servidor de roleplay (GTA RP)",
    problem:
      "Em servidores de roleplay, a polícia precisa somar pena, multa e fiança de vários crimes do código penal do servidor na hora da prisão — feito à mão, é lento e dá erro.", // REPO
    role: "Autor único: interface e lógica de cálculo.", // GIT
    highlights: [
      "Crimes organizados por categoria; seleciona vários e a pena e a multa somam automaticamente.",
      "Regras do código penal aplicadas no cálculo, como desconto para réu primário e valor da fiança.",
      "Formulários de boletim, oficiais e advogado que geram o relatório da ocorrência.",
    ], // REPO
    outcome: "Publicado na Vercel.", // verificado: site no ar em 05/11/2026
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/EduMoridev/CalculadoraPenalFronteira",
    logo: "/logos/fronteira.svg", // REPO: FronteiraLogo.tsx
    live: "https://calculadora-penal-fronteira.vercel.app",
  },
  {
    slug: "usantoosfps-scripts",
    status: "Publicado",
    name: "UsantoosFps Scripts",
    tagline: "Scripts de otimização do Windows, abertos para auditoria",
    problem:
      "Scripts .bat rodam como administrador e o Windows avisa ao baixá-los; o cliente precisava distribuí-los de graça sem pedir confiança cega.", // REPO
    role: "Organizei e publiquei o repositório do cliente: scripts, documentação e verificação.", // GH
    highlights: [
      "14 scripts de manutenção (limpeza, plano de energia, DISM/SFC, TRIM, diagnóstico, backup e ponto de restauração).",
      "Hash SHA-256 de cada arquivo publicado e script PowerShell que gera e confere os hashes.",
      "Política de segurança (SECURITY.md), templates de issue e .gitattributes que garante finais de linha CRLF nos .bat.",
    ], // REPO
    outcome: "Repositório público, usado como fonte auditável dos downloads gratuitos do site.", // REPO README
    stack: ["Batch", "PowerShell", "GitHub"],
    repo: "https://github.com/EduMoridev/UsantossFps-scripts",
  },
  {
    slug: "criptografia-sequencias",
    status: "Concluído",
    name: "Criptografia com Sequências",
    tagline: "Cifra de César em duas camadas, em C (faculdade)",
    problem:
      "Atividade avaliativa de Algoritmos e Pensamento Computacional: criptografar palavras combinando Cifra de César com sequências numéricas.", // REPO
    role: "Trabalho em grupo de 5 integrantes; publiquei o código e a documentação.", // REPO + GH
    highlights: [
      "Segunda camada de deslocamento por PA, PG, Fibonacci ou números primos, escolhida pelo usuário.",
      "Validação de entrada e mod 26 corrigido para números negativos (o % do C pode devolver negativo).",
      "Log de cada execução em arquivo, com data, entrada, saída e termos da sequência.",
      "O grupo encontrou e documentou uma inconsistência entre o exemplo do enunciado e a fórmula do próprio enunciado.",
    ], // REPO
    outcome: "Entregue e documentado, com exemplo de execução passo a passo.", // REPO
    stack: ["C"],
    repo: "https://github.com/EduMoridev/caesar-sequence-cipher",
  },
  {
    slug: "ordenacao-arquivos",
    status: "Concluído",
    name: "Ordenação + Arquivos em C",
    tagline: "Algoritmos de ordenação com leitura e gravação de arquivos (faculdade)",
    problem:
      "Atividade avaliativa: gerar dados desordenados em arquivo, ordenar com o algoritmo escolhido e salvar o resultado sem alterar o original.", // REPO
    role: "Publiquei o código e a documentação técnica.", // GH
    highlights: [
      "Bubble, Insertion, Selection, Merge e Quick Sort no mesmo programa, escolhidos pelo menu.",
      "Arquivo original preservado; resultado em arquivo separado, regravado a cada ordenação.",
      "Código em C89 que compila sem nenhum aviso com -Wall -Wextra -pedantic, no Linux e no Windows.",
    ], // REPO documentacao.txt
    outcome: "Entregue com documentação de cada função e dos arquivos gerados.", // REPO
    stack: ["C"],
    repo: "https://github.com/EduMoridev/OrdenacaoDeArquivos-C",
  },
];

export const certificates: Credential[] = [
  { name: "Agile Explorer", issuer: "IBM", year: "2025", certificate: true, url: "https://www.credly.com/badges/bb6c90fa-b226-4c8a-91ac-4ce9608488e7/linked_in_profile" }, // PORTFÓLIO ANTIGO
  { name: "Lógica de Programação", issuer: "Fundação Bradesco — Escola Virtual", year: "2026", certificate: true, url: "https://lms.ev.org.br/mpls/Web/Lms/Student/PrintCertificateContent.aspx?uid=14149917&p=1SaU3syvf27MofustyHwZnOrNqfnRqa4" }, // PORTFÓLIO ANTIGO
  { name: "Linguagem de Programação Python – Básico", issuer: "Fundação Bradesco — Escola Virtual", year: "2026", certificate: true }, // CV
  { name: "IA na Prática: Como Dados Bem Estruturados Fazem a Diferença", issuer: "Fundação Bradesco — Escola Virtual", year: "2026", certificate: true }, // CV
  { name: "Java com Spring Boot", issuer: "Rocketseat", certificate: false }, // CHAT
  { name: "Replit: do zero ao deploy", issuer: "Rocketseat", certificate: false }, // CHAT
  { name: "Dev Global Starter Pack", issuer: "Rocketseat", certificate: false }, // CHAT
  { name: "Masterclass IA", issuer: "Rocketseat", certificate: false }, // CHAT
];

export const PLACEHOLDER = "[PREENCHER";
export const isFilled = (v?: string) => !!v && !v.includes(PLACEHOLDER);
