import type { Metadata } from "next";
import Link from "next/link";
import { certificates, experience, isFilled, profile, projects } from "@/content/profile";

export const metadata: Metadata = {
  title: "Currículo",
  description: `Currículo de ${profile.name} — ${profile.roleFull}. Versão em texto, legível por ATS e IA.`,
};

/**
 * Currículo em HTML semântico, uma coluna, sem animação nem 3D.
 * É a versão que ATS/IA lê melhor — e imprime limpo (Ctrl+P → PDF).
 */
export default function CvPage() {
  const f = (s: string) => (isFilled(s) ? s : null);
  return (
    <main className="mx-auto max-w-3xl px-6 py-14 leading-relaxed print:max-w-none print:px-0 print:py-0 print:text-[9.5pt] print:leading-snug print:text-black print:bg-white [&_section]:print:mt-3 [&_article]:print:mt-1.5 [&_h2]:print:text-[8pt]">
      <nav className="mb-10 flex justify-between text-sm text-cream-dim print:hidden">
        <Link href="/" className="hover:text-cream">← Voltar ao portfólio</Link>
        <span>Ctrl/Cmd + P para salvar em PDF</span>
      </nav>

      <header className="border-b border-navy-line pb-6 print:border-black/20">
        <h1 className="font-display text-3xl font-semibold">{profile.name}</h1>
        <p className="mt-1 text-lg">{profile.roleFull}</p>
        <p className="mt-3 text-sm text-cream-dim print:text-black/70">
          {[f(profile.location), f(profile.email), profile.links.github, f(profile.links.linkedin)]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </header>

      <section aria-labelledby="resumo" className="mt-8">
        <h2 id="resumo" className="font-mono text-xs uppercase tracking-widest text-cream-mute">Resumo</h2>
        <p className="mt-2 print:hidden">{profile.headline}</p>
        {profile.bio.filter(isFilled).map((b) => <p key={b} className="mt-2">{b}</p>)}
      </section>

      <section aria-labelledby="skills" className="mt-8">
        <h2 id="skills" className="font-mono text-xs uppercase tracking-widest text-cream-mute">Habilidades</h2>
        <ul className="mt-2 space-y-1">
          {Object.entries(profile.skills).map(([cat, list]) => (
            <li key={cat}><strong>{cat}:</strong> {list.join(", ")}</li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="exp" className="mt-8">
        <h2 id="exp" className="font-mono text-xs uppercase tracking-widest text-cream-mute">Experiência</h2>
        {experience.map((e) => (
          <article key={e.company + e.title} className="mt-4">
            <h3 className="font-semibold">{e.title} — {e.company}</h3>
            <p className="text-sm text-cream-dim print:text-black/70">{e.period}</p>
            <ul className="mt-1 list-disc pl-5">
              {e.bullets.filter(isFilled).map((b) => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <section aria-labelledby="proj" className="mt-8">
        <h2 id="proj" className="font-mono text-xs uppercase tracking-widest text-cream-mute">Projetos</h2>
        {projects.map((p) => (
          <article key={p.slug} className="mt-4">
            <h3 className="font-semibold">{p.name} — {p.tagline}</h3>
            <p>{[p.role, p.outcome].filter(isFilled).join(" ")}</p>
            <p className="text-sm text-cream-dim print:text-black/70">Stack: {p.stack.join(", ")}</p>
          </article>
        ))}
      </section>

      <section aria-labelledby="edu" className="mt-8">
        <h2 id="edu" className="font-mono text-xs uppercase tracking-widest text-cream-mute">Formação</h2>
        {profile.education.map((e) => (
          <p key={e.course} className="mt-2"><strong>{e.course}</strong> — {e.institution} ({e.period})</p>
        ))}
        {certificates.length > 0 && (
          <ul className="mt-2 list-disc pl-5">
            {certificates.map((c) => <li key={c.name}>{c.name} — {c.issuer}{c.year ? ` (${c.year})` : ""}{c.certificate ? "" : " — curso, sem certificado emitido"}</li>)}
          </ul>
        )}
        <p className="mt-2">Idiomas: {profile.languages.join(" · ")}</p>
        <p className="mt-2">Competências: {profile.softSkills.join(" · ")}</p>
      </section>
    </main>
  );
}
