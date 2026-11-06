"use client";

import { Check, Copy, Download, Mail } from "lucide-react";
import { useState } from "react";
import { isFilled, profile } from "@/content/profile";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { Txt } from "./Txt";

/**
 * Sem formulário nem mural de comentários (o vídeo tem os dois):
 * recrutador quer UM clique até você. Formulário sem backend vira spam.
 */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true); setTimeout(() => setCopied(false), 1800);
  };
  const links = [
    { label: "LinkedIn", href: profile.links.linkedin, icon: LinkedinIcon, sub: "Conectar" },
    { label: "GitHub", href: profile.links.github, icon: GithubIcon, sub: profile.links.github.replace("https://github.com/", "@") },
    { label: profile.cvPdf ? "Currículo (PDF)" : "Currículo", href: profile.cvPdf || "/cv", icon: Download, sub: profile.cvPdf ? "Baixar" : "Ver / imprimir", download: !!profile.cvPdf },
  ];
  return (
    <section id="contato" aria-labelledby="contato-title" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
      <SectionTitle id="contato-title" eyebrow="Contato" title="Vamos conversar" center />
      <p className="mx-auto mt-3 max-w-xl text-center text-cream-dim">
        Aberto a vagas júnior de desenvolvimento full stack e front-end, e a projetos freelance.
      </p>
      <Reveal delay={150} className="glass mx-auto mt-12 max-w-3xl rounded-3xl p-6 sm:p-10">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Mail className="size-5 text-cream-dim" />
            {isFilled(profile.email)
              ? <a href={`mailto:${profile.email}`} className="font-display text-lg hover:underline sm:text-xl">{profile.email}</a>
              : <Txt>{profile.email}</Txt>}
          </div>
          {isFilled(profile.email) && (
            <button onClick={copy} className="inline-flex items-center gap-2 rounded-lg bg-cream px-4 py-2 text-sm font-medium text-navy hover:bg-cream/90">
              {copied ? <><Check className="size-4" /> Copiado</> : <><Copy className="size-4" /> Copiar email</>}
            </button>
          )}
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {links.map(({ label, href, icon: Icon, sub, download }) => (
            <li key={label}>
              <a href={isFilled(href) ? href : undefined} download={download} target={download || href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer"
                className="glass flex items-center gap-3 rounded-xl p-4 transition aria-disabled:opacity-50"
                aria-disabled={!isFilled(href) || undefined}>
                <Icon className="size-5" />
                <span><span className="block text-sm font-medium">{label}</span><span className="block font-mono text-[11px] text-cream-mute">{isFilled(href) ? sub : "pendente"}</span></span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
