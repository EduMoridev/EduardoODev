"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { NAV } from "./Navbar";

const sections = ["inicio", ...NAV.map((n) => n.id)];

/** Numeração lateral 00–06 do portfólio antigo, marcando a seção visível. */
export const SideNav = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = sections.indexOf(entry.target.id);
            if (index !== -1) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Seções" className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex">
      {sections.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === i ? "true" : undefined}
          className={cn("font-mono text-xs transition-all duration-300", active === i ? "text-cream" : "text-cream-mute hover:text-cream-dim")}
        >
          {String(i).padStart(2, "0")}
        </a>
      ))}
      <div className="mt-4 flex flex-col items-center gap-2" aria-hidden>
        <div className="text-[10px] tracking-widest text-cream-mute" style={{ writingMode: "vertical-rl" }}>Scroll Down</div>
        <div className="h-8 w-px bg-cream/20" />
      </div>
    </nav>
  );
};
