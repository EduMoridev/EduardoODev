import { HeroBadge } from "@/components/HeroBadge";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/content/profile";

/** Hero do portfólio antigo ("Building digital experiences.") + crachá 3D à direita. */
export const Hero = () => {
  const strip = ["Next.js", "React", "TypeScript", "Java", "Spring Boot"];
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative flex min-h-screen items-center px-8 md:px-16 lg:px-24">
      <div className="grid w-full items-center gap-10 pt-16 lg:grid-cols-1">
        <div className="relative z-10 max-w-xl">
          <Reveal>
            <p className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-cream">
              {profile.role} · {profile.roleSecondary}
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 id="hero-title" className="mb-6 text-5xl font-bold leading-tight text-cream md:text-7xl">
              Building
              <br />
              <span className="text-cream-dim">digital</span>
              <br />
              experiences.
              <span className="sr-only"> — {profile.name}, {profile.roleFull}</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mb-10 max-w-md text-base leading-relaxed text-cream-dim">{profile.headline}</p>
          </Reveal>
          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#projetos" className="bg-cream px-6 py-3 text-sm tracking-wider text-navy transition-colors duration-200 hover:bg-cream/90">
                Ver projetos
              </a>
              <a href={profile.cvPdf} download className="border border-cream/20 px-6 py-3 text-sm tracking-wider text-cream transition-colors duration-200 hover:border-cream/60">
                Baixar CV
              </a>
              <a href="#sobre" className="group flex items-center gap-2 text-sm tracking-wider text-cream-mute transition-colors duration-200 hover:text-cream">
                Sobre mim <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
        {/* mobile/tablet: crachá estático abaixo do texto */}
        <div className="h-[500px] sm:h-[540px] lg:hidden">
          <HeroBadge staticOnly />
        </div>
      </div>

      {/* desktop: o crachá ocupa toda a área livre à direita e o cordão desce do topo da tela */}
      <div className="absolute inset-y-0 right-16 left-[max(40rem,46%)] hidden lg:block">
        <HeroBadge />
      </div>

      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24">
        <Reveal delay={400}>
          <div className="flex items-center gap-4 rounded-sm bg-navy/80 py-1 pr-2 backdrop-blur-sm">
            <div className="h-px w-8 bg-cream" />
            <span className="font-mono text-xs tracking-widest text-cream-mute">{strip.join(" · ").toUpperCase()}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
