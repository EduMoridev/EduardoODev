import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { experience } from "@/content/profile";

/** Experiência no formato de linhas do portfólio antigo (mesma "casca" da lista de projetos). */
export const Experience = () => (
  <section id="experiencia" aria-labelledby="exp-title" className="flex min-h-screen scroll-mt-16 items-center px-8 py-24 md:px-16 lg:px-24">
    <div className="w-full max-w-5xl">
      <SectionHeader n="02" label="Experiência" id="exp-title" title="Onde eu" muted="já trabalhei." />
      <ol className="space-y-px">
        {experience.map((e, i) => (
          <Reveal as="li" key={e.company + e.title} delay={200 + i * 120}>
            <article className="glass border border-cream/5 p-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <span className="w-28 shrink-0 font-mono text-xs uppercase tracking-widest text-cream-mute">{e.period}</span>
                <div className="flex-1">
                  <h3 className="mb-1 flex items-center gap-3 text-lg font-semibold text-cream">
                    {e.logo && <Logo src={e.logo} label={`Logo ${e.company}`} className="size-6 text-cream" />}
                    {e.title}
                  </h3>
                  <p className="mb-4 text-sm text-cream-dim">{e.company}{e.location ? ` · ${e.location}` : ""}</p>
                  <ul className="mb-4 space-y-2 text-sm leading-relaxed text-cream-dim">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cream/70" />{b}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {e.stack.map((t) => <span key={t} className="border border-cream/10 bg-navy/80 px-2 py-1 font-mono text-xs text-cream-mute">{t}</span>)}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);
