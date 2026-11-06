"use client";

import { useEffect, useRef, useState } from "react";
import { getMotionLevel } from "@/lib/motion/level";
import { useLoop } from "@/lib/motion/useLoop";

/**
 * Fumaça cream que segue o cursor (mesma técnica do UsantoosFps, na paleta daqui).
 * Pool fixo de 60 partículas, zero alocação por frame, sprite pré-renderizado,
 * só com mouse (pointer: fine) e data-motion="full". Atmosfera, não neblina.
 */
const MAX = 60;
const ALPHA_MAX = 0.07; // validado contra o contraste do texto mais fraco (ver README)

type P = { x: number; y: number; vx: number; vy: number; r: number; age: number; life: number; a: number; seed: number; alive: boolean };

function makeSprite() {
  const s = document.createElement("canvas");
  s.width = s.height = 128;
  const g = s.getContext("2d")!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(244,237,224,1)");
  grd.addColorStop(0.45, "rgba(244,237,224,0.35)");
  grd.addColorStop(1, "rgba(244,237,224,0)");
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  return s;
}

export function CursorSmoke() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [on, setOn] = useState(false);
  const st = useRef({
    w: 0, h: 0, dpr: 1, max: MAX, next: 0,
    px: 0, py: 0, lx: 0, ly: 0, moved: false, has: false,
    pool: Array.from({ length: MAX }, (): P => ({ x: 0, y: 0, vx: 0, vy: 0, r: 0, age: 0, life: 1, a: 0, seed: 0, alive: false })),
    sprite: null as HTMLCanvasElement | null,
  });

  useEffect(() => {
    setOn(getMotionLevel() === "full" && window.matchMedia("(pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!on) return;
    const c = ref.current!, s = st.current;
    s.sprite = makeSprite();
    let t: ReturnType<typeof setTimeout>;
    const size = () => {
      s.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      s.w = window.innerWidth; s.h = window.innerHeight;
      c.width = s.w * s.dpr; c.height = s.h * s.dpr;
    };
    const onResize = () => { clearTimeout(t); t = setTimeout(size, 150); };
    // o handler só anota a posição; quem desenha é o frame
    const onMove = (e: PointerEvent) => { s.px = e.clientX; s.py = e.clientY; s.moved = true; };
    size();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("pointermove", onMove); };
  }, [on]);

  const emit = (s: typeof st.current, x: number, y: number, vx: number, vy: number) => {
    const p = s.pool[s.next]; s.next = (s.next + 1) % s.max; // recicla a mais antiga
    p.x = x; p.y = y; p.vx = vx * 0.25; p.vy = vy * 0.25 - 12;
    p.r = 20 + Math.random() * 20; p.age = 0; p.life = 1.2 + Math.random() * 0.6;
    p.a = ALPHA_MAX * (0.7 + Math.random() * 0.3); p.seed = Math.random() * 6.28; p.alive = true;
  };

  useLoop(on, (dt, time) => {
    const c = ref.current, sprite = st.current.sprite; if (!c || !sprite) return;
    const s = st.current, g = c.getContext("2d")!;

    if (s.moved) {
      const vx = s.has ? (s.px - s.lx) / Math.max(dt, 0.001) : 0;
      const vy = s.has ? (s.py - s.ly) / Math.max(dt, 0.001) : 0;
      const n = Math.hypot(vx, vy) > 600 ? 2 : 1;
      for (let i = 0; i < n; i++) emit(s, s.px, s.py, Math.max(-400, Math.min(400, vx)), Math.max(-400, Math.min(400, vy)));
      s.lx = s.px; s.ly = s.py; s.has = true; s.moved = false;
    }

    g.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
    g.clearRect(0, 0, s.w, s.h);
    g.globalCompositeOperation = "lighter";
    const grow = Math.pow(1.015, dt * 60); // ~1,5% por frame a 60 fps
    for (let i = 0; i < s.max; i++) {
      const p = s.pool[i]; if (!p.alive) continue;
      p.age += dt; if (p.age >= p.life) { p.alive = false; continue; }
      p.vx *= 0.96; p.vy *= 0.96;
      p.x += (p.vx + Math.sin(time * 1.6 + p.seed) * 14) * dt;
      p.y += (p.vy - 10) * dt; // sobe devagar
      p.r *= grow;
      const k = p.age / p.life;
      g.globalAlpha = p.a * (k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85);
      g.drawImage(sprite, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
    }
    g.globalAlpha = 1;
    g.globalCompositeOperation = "source-over";
  }, () => {
    // degradação: corta o pool pela metade antes de desistir
    const s = st.current;
    if (s.max === MAX) { s.max = MAX / 2; s.next = 0; console.debug("[motion] fumaça reduzida"); return true; }
    setOn(false);
  });

  if (!on) return null;
  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />;
}
