"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { profile } from "@/content/profile";

const items = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
];

export function Nav() {
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    items.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-navy-line/60 bg-navy/75 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="font-mono text-sm text-cream-dim hover:text-cream">
          {profile.handle.includes("[") ? profile.shortName.toLowerCase().replace(" ", ".") : profile.handle}
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {items.map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={active === it.id ? "true" : undefined}
                className={`relative text-sm transition-colors ${active === it.id ? "text-cream" : "text-cream-mute hover:text-cream-dim"}`}
              >
                {it.label}
                {active === it.id && <span className="absolute -bottom-1.5 left-0 h-px w-full bg-cream" />}
              </a>
            </li>
          ))}
        </ul>
        <a href="/cv" className="inline-flex items-center gap-2 rounded-full border border-navy-line px-4 py-1.5 text-sm hover:border-cream/60">
          <FileText className="size-4" /> CV
        </a>
      </nav>
    </header>
  );
}
