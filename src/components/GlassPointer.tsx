"use client";

import { useEffect } from "react";

/** Um único listener: alimenta --gx/--gy do .glass sob o cursor (brilho que segue o mouse). */
export function GlassPointer() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let el: HTMLElement | null = null, x = 0, y = 0, raf = 0;
    const apply = () => {
      raf = 0;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--gx", `${x - r.left}px`);
      el.style.setProperty("--gy", `${y - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      el = (e.target as Element)?.closest?.(".glass") as HTMLElement | null;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return null;
}
