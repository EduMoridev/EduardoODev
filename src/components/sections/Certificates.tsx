import { Award, BookOpen, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { certificates } from "@/content/profile";

/** Cards de certificados do portfólio antigo; cursos sem certificado aparecem marcados como tal. */
export const Certificates = () => (
  <section id="certificados" aria-labelledby="cert-title" className="flex min-h-screen scroll-mt-16 items-center px-8 py-24 md:px-16 lg:px-24">
    <div className="w-full max-w-5xl">
      <SectionHeader n="05" label="Certificados" id="cert-title" title="Cursos &" muted="certificações." />
      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map(({ name, issuer, year, url, certificate }, i) => {
          const Wrapper = url ? "a" : "div";
          const Icon = certificate ? Award : BookOpen;
          return (
            <Reveal key={`${name}-${issuer}`} delay={200 + i * 100} className="h-full">
              <Wrapper
                {...(url ? { href: url, target: "_blank", rel: "noreferrer" } : {})}
                className="glass group flex h-full flex-col gap-6 border border-cream/5 p-8 transition-colors duration-300 hover:border-cream/30"
              >
                <div className="flex items-start justify-between">
                  <Icon className="h-5 w-5 text-cream" strokeWidth={1.5} />
                  {url && <ExternalLink className="h-4 w-4 text-cream-mute transition-colors duration-300 group-hover:text-cream" strokeWidth={1.5} />}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-semibold text-cream">{name}</h3>
                  <p className="text-sm text-cream-dim">{issuer}</p>
                </div>
                <span className="mt-auto font-mono text-xs tracking-widest text-cream-mute">
                  {certificate ? (year ?? "Certificado") : "Curso · sem certificado emitido"}
                </span>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);
