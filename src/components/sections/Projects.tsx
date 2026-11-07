import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { projects } from "@/content/profile";
import { cn } from "@/lib/utils";

/** Lista numerada do portfólio antigo, agora com os projetos reais e link para o estudo de caso. */
export const Projects = () => (
  <section id="projetos" aria-labelledby="proj-title" className="scroll-mt-16 px-8 py-16 md:px-16 md:py-20 lg:px-24">
    <div className="w-full max-w-5xl">
      <SectionHeader n="04" label="Projetos" id="proj-title" title="Trabalhos" muted="selecionados." />
      <ol className="space-y-px">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={200 + i * 100}>
            <Link href={`/projetos/${p.slug}`} className="glass group block border border-cream/5 p-8 transition-all duration-300 hover:border-cream/30">
              <article className="flex flex-col gap-6 md:flex-row md:items-start">
                <span className="shrink-0 font-mono text-sm text-cream-mute transition-colors duration-300 group-hover:text-cream">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="flex items-center gap-3 text-lg font-semibold text-cream">
                      {p.logo && <Logo src={p.logo} label={`Logo ${p.name}`} className="size-6 text-cream" />}
                      {p.name}
                    </h3>
                    <span className={cn("shrink-0 px-2 py-1 font-mono text-xs",
                      p.status === "Em desenvolvimento" ? "bg-cream/10 text-cream" : "bg-navy-soft text-cream-dim")}>
                      {p.status}
                    </span>
                  </div>
                  <p className="mb-1 text-sm text-cream">{p.tagline}</p>
                  <p className="mb-4 text-sm leading-relaxed text-cream-dim">{p.problem}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => <span key={t} className="border border-cream/10 bg-navy/80 px-2 py-1 font-mono text-xs text-cream-mute">{t}</span>)}
                  </div>
                </div>
                <span aria-hidden className="shrink-0 text-lg text-cream-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-cream">→</span>
              </article>
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
