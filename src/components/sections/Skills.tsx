import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/content/profile";

/** Grade de categorias com bolinhas do portfólio antigo. */
export const Skills = () => (
  <section id="stack" aria-labelledby="stack-title" className="flex min-h-screen scroll-mt-16 items-center px-8 py-24 md:px-16 lg:px-24">
    <div className="w-full max-w-5xl">
      <SectionHeader n="03" label="Stack" id="stack-title" title="Stack &" muted="ferramentas." />
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(profile.skills).map(([category, items], i) => (
          <Reveal key={category} delay={200 + i * 100} className="h-full">
            <div className="glass h-full border border-cream/5 p-8">
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cream">{category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-cream-dim">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-cream" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
