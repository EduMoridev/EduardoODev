import { Briefcase, FolderGit2, GraduationCap } from "lucide-react";
import { certificates, experience, profile, projects } from "@/content/profile";
import { Photo } from "./Photo";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Txt } from "./Txt";

export function About() {
  // números REAIS, derivados do conteúdo — nunca hardcoded
  const stats = [
    { icon: FolderGit2, value: projects.length, label: "Projetos", href: "#projetos" },
    { icon: Briefcase, value: experience.length, label: "Experiências", href: "#experiencia" },
    { icon: GraduationCap, value: certificates.length, label: "Cursos & certificados", href: "#projetos" },
  ];
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionTitle id="sobre-title" eyebrow="Sobre mim" title={profile.name} />
          <Reveal delay={150} className="mt-6 space-y-4 text-cream-dim leading-relaxed">
            {profile.bio.map((b) => <Txt key={b} as="p">{b}</Txt>)}
          </Reveal>
          <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div><dt className="font-mono text-xs uppercase tracking-widest text-cream-mute">Formação</dt>
              <dd className="mt-1">{profile.education[0].course} · <Txt>{profile.education[0].institution}</Txt></dd></div>
            <div className="sm:col-span-2"><dt className="font-mono text-xs uppercase tracking-widest text-cream-mute">Competências</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">{profile.softSkills.map((s) => <span key={s} className="rounded-md border border-navy-line px-2 py-0.5 text-xs text-cream-dim">{s}</span>)}</dd></div>
            <div><dt className="font-mono text-xs uppercase tracking-widest text-cream-mute">Idiomas</dt>
              <dd className="mt-1">{profile.languages.map((l, i) => <span key={l}>{i > 0 && " · "}<Txt>{l}</Txt></span>)}</dd></div>
          </dl>
        </div>
        <Reveal delay={250}><Photo /></Reveal>
      </div>
      <ul className="mt-16 grid gap-4 sm:grid-cols-3">
        {stats.map(({ icon: Icon, value, label, href }, i) => (
          <Reveal as="li" key={label} delay={i * 140}>
            <a href={href} className="glass group flex items-center justify-between rounded-2xl p-5 transition">
              <div><Icon className="size-5 text-cream-dim" /><p className="mt-3 font-mono text-xs uppercase tracking-widest text-cream-mute">{label}</p></div>
              <span className="font-display text-4xl font-bold">{value}</span>
            </a>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
