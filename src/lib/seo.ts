import { certificates, experience, isFilled, profile, projects } from "@/content/profile";

/**
 * URL pública do site. Ordem: variável manual → domínio de produção que a Vercel injeta
 * sozinha no build → domínio atual. Antes caía em localhost e o canonical/OG/sitemap
 * publicados apontavam para localhost:3000.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://eduardo-morishita-dev.vercel.app");

const clean = <T,>(arr: (T | false | undefined)[]) => arr.filter(Boolean) as T[];
const filled = (v?: string) => (isFilled(v) ? v : undefined);

/** Schema.org Person — é o que buscadores e IAs de triagem leem como "dados estruturados". */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: [profile.role, profile.roleSecondary],
    description: profile.headline,
    url: SITE_URL,
    email: filled(profile.email) && `mailto:${profile.email}`,
    image: `${SITE_URL}${profile.photo}`,
    address: filled(profile.location),
    sameAs: clean([profile.links.github, filled(profile.links.linkedin)]),
    knowsAbout: Object.values(profile.skills).flat(),
    alumniOf: profile.education
      .filter((e) => isFilled(e.institution))
      .map((e) => ({ "@type": "CollegeOrUniversity", name: e.institution })),
    worksFor: experience
      .filter((e) => e.company === "Kronos")
      .map((e) => ({ "@type": "Organization", name: e.company })),
  };
}

/**
 * Currículo em texto puro (Markdown). Usado em /llms.txt.
 * Linhas com placeholder são omitidas para não poluir a leitura das IAs.
 */
export function resumeMarkdown() {
  const line = (s: string) => (isFilled(s) ? s : null);
  const out: (string | null)[] = [
    `# ${profile.name} — ${profile.roleFull}`,
    "",
    `> ${profile.headline}`,
    "",
    ...profile.bio.map(line),
    "",
    "## Contato",
    line(`- Email: ${profile.email}`),
    `- GitHub: ${profile.links.github}`,
    line(`- LinkedIn: ${profile.links.linkedin}`),
    line(`- Localização: ${profile.location}`),
    `- Status: ${profile.availability.label}`,
    profile.cvPdf ? `- CV (PDF): ${SITE_URL}${profile.cvPdf}` : null,
    `- CV (HTML, ATS-friendly): ${SITE_URL}/cv`,
    "",
    "## Habilidades",
    ...Object.entries(profile.skills).map(([k, v]) => `- ${k}: ${v.join(", ")}`),
    "",
    "## Experiência",
    ...experience.flatMap((e) => [
      `### ${e.title} — ${e.company}${isFilled(e.period) ? ` (${e.period})` : ""}`,
      ...e.bullets.map((b) => line(`- ${b}`)),
      `- Stack: ${e.stack.filter(isFilled).join(", ")}`,
      "",
    ]),
    "## Projetos",
    ...projects.flatMap((p) => [
      `### ${p.name} — ${p.tagline}`,
      line(`- Problema: ${p.problem}`),
      line(`- Papel: ${p.role}`),
      ...p.highlights.map((h) => line(`- ${h}`)),
      line(`- Resultado: ${p.outcome}`),
      `- Stack: ${p.stack.filter(isFilled).join(", ")}`,
      p.repo ? `- Código: ${p.repo}` : p.privateRepo ? "- Código: repositório privado (demonstração sob pedido)" : null,
      p.live && isFilled(p.live) ? `- Online: ${p.live}` : null,
      `- Detalhes: ${SITE_URL}/projetos/${p.slug}`,
      "",
    ]),
    "## Formação",
    ...profile.education.map((e) =>
      [e.course, filled(e.institution), filled(e.period)].filter(Boolean).join(" — "),
    ).map((s) => `- ${s}`),
    certificates.length ? "\n## Cursos e certificados" : null,
    ...certificates.map((c) => `- ${c.name} — ${c.issuer}${c.year ? ` (${c.year})` : ""}${c.certificate ? "" : " — curso, sem certificado emitido"}`),
    "",
    "## Competências comportamentais",
    `- ${profile.softSkills.join(", ")}`,
    "",
    "## Idiomas",
    ...profile.languages.map((l) => line(`- ${l}`)),
  ];
  return out.filter((l) => l !== null).join("\n").replace(/\n{3,}/g, "\n\n");
}
