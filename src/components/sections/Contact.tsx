"use client";

import { Check, Copy, Download, FileText } from "lucide-react";
import { useState } from "react";
import { LinkedinIcon } from "@/components/BrandIcons";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/content/profile";

/**
 * Contato do portfólio antigo. O formulário de lá não enviava nada (sem back-end):
 * no lugar dele, as ações que um recrutador usa de fato.
 */
export const Contact = () => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github },
    { label: "LinkedIn", value: profile.links.linkedin.replace("https://www.", "").replace(/\/$/, ""), href: profile.links.linkedin },
  ];
  const action = "glass flex items-center gap-4 border border-cream/5 p-6 text-sm text-cream transition-colors duration-200 hover:border-cream/30";
  return (
    <section id="contato" aria-labelledby="contato-title" className="scroll-mt-16 px-8 py-16 md:px-16 md:py-20 lg:px-24">
      <div className="w-full max-w-5xl">
        <SectionHeader n="06" label="Contato" id="contato-title" title="Vamos" muted="conversar." />
        <div className="grid items-start gap-16 md:grid-cols-2">
          <Reveal delay={150}>
            <div>
              <p className="mb-10 max-w-sm text-sm leading-relaxed text-cream-dim">
                Aberto a vagas júnior de desenvolvimento full stack e front-end, a projetos freelance ou a uma conversa sobre tecnologia.
              </p>
              <div className="space-y-6">
                {links.map(({ label, value, href }) => (
                  <div key={label}>
                    <span className="mb-1 block font-mono text-xs uppercase tracking-widest text-cream-mute">{label}</span>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className="text-sm text-cream transition-colors duration-200 hover:text-cream-dim hover:underline">
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div className="space-y-px">
              <button type="button" onClick={copy} className={`${action} w-full text-left`}>
                {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                <span><span className="block font-medium">{copied ? "Email copiado" : "Copiar email"}</span><span className="font-mono text-xs text-cream-mute">{profile.email}</span></span>
              </button>
              <a href={profile.cvPdf} download className={action}>
                <Download className="size-5" />
                <span><span className="block font-medium">Baixar currículo</span><span className="font-mono text-xs text-cream-mute">PDF · 2 páginas</span></span>
              </a>
              <a href="/cv" className={action}>
                <FileText className="size-5" />
                <span><span className="block font-medium">Currículo em texto</span><span className="font-mono text-xs text-cream-mute">versão para ATS e impressão</span></span>
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={action}>
                <LinkedinIcon className="size-5" />
                <span><span className="block font-medium">Conectar no LinkedIn</span><span className="font-mono text-xs text-cream-mute">perfil profissional</span></span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-cream/5 pt-8 md:flex-row">
          <span className="font-mono text-xs text-cream-mute">© {new Date().getFullYear()} {profile.name}</span>
          <span className="font-mono text-xs text-cream-mute">
            Feito com Next.js · TypeScript · Tailwind ·{" "}
            <a href={profile.links.source} className="underline-offset-4 hover:text-cream hover:underline">código-fonte</a>
            {" · "}<a href="/llms.txt" className="underline-offset-4 hover:text-cream hover:underline">llms.txt</a>
          </span>
        </div>
      </div>
    </section>
  );
};
