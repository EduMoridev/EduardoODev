import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/content/profile";

/** About do portfólio antigo: texto à esquerda, lista rótulo/valor à direita (+ foto). */
export const About = () => {
  const edu = profile.education[0];
  const facts = [
    { label: "Cargo", value: profile.roleFull },
    { label: "Graduação", value: `${edu.course} — ${edu.institution} (${edu.period})` },
    { label: "Disponibilidade", value: `${profile.availability.label} · ${profile.availability.detail}` },
    { label: "Localização", value: profile.location },
    { label: "Idiomas", value: profile.languages.join(" · ") },
  ];
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="scroll-mt-16 px-8 py-16 md:px-16 md:py-20 lg:px-24">
      <div className="w-full max-w-5xl">
        <SectionHeader n="01" label="Sobre" id="sobre-title" title="Código limpo," muted="soluções reais." />
        <div className="grid items-start gap-16 md:grid-cols-2">
          <Reveal delay={150}>
            <div className="space-y-4 leading-relaxed text-cream-dim">
              {profile.bio.map((b) => <p key={b}>{b}</p>)}
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal delay={200}><div className="mb-10"><Photo /></div></Reveal>
            {facts.map(({ label, value }, i) => (
              <Reveal key={label} delay={250 + i * 80}>
                <div className="border-b border-cream/5 pb-6">
                  <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-cream-mute">{label}</span>
                  <span className="text-sm text-cream">{value}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
