import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import { profile } from "@/content/profile";

/** Categorias do portfólio antigo, agora com o logo de cada tecnologia e o hover da versão do vídeo. */
export const Skills = () => (
  <section id="stack" aria-labelledby="stack-title" className="flex min-h-screen scroll-mt-16 items-center px-8 py-24 md:px-16 lg:px-24">
    <div className="w-full max-w-6xl">
      <SectionHeader n="03" label="Stack" id="stack-title" title="Stack &" muted="ferramentas." />
      <div className="grid gap-px md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(profile.skills).map(([category, items], i) => (
          <Reveal key={category} delay={200 + i * 100} className="h-full">
            <div className="glass h-full border border-cream/5 p-6 md:p-8">
              <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-cream">{category}</h3>
              <ul className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-3">
                {items.map((item) => (
                  <li
                    key={item}
                    className="group flex flex-col items-center gap-2 rounded-xl border border-cream/5 bg-navy-soft/50 px-1 py-4 text-center transition duration-300 ease-out hover:border-cream/20 hover:bg-navy-line/60 hover:shadow-lg hover:shadow-navy-deep/60 motion-safe:hover:scale-105"
                  >
                    <span className="relative grid h-10 w-10 place-items-center">
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2 rounded-full bg-cream/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
                      />
                      <TechIcon name={item} className="relative h-8 w-8 text-cream-dim transition-colors duration-300 group-hover:text-cream" />
                    </span>
                    <span className="text-[0.7rem] font-medium leading-tight text-cream-dim transition-colors duration-300 group-hover:text-cream">
                      {item}
                    </span>
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
