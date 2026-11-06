"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, User, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { getMotionLevel } from "@/lib/motion/level";

/**
 * Tela "Welcome" do vídeo, mais curta: 1,6 s, 1x por sessão, pula com clique/tecla.
 * É overlay — o conteúdo já está no HTML por baixo (IA/crawler não esperam nada).
 */
export function Intro() {
  const [show, setShow] = useState(false);

  // 1) decide se abre. Só LÊ o storage: em dev o React roda efeitos 2x (StrictMode),
  //    e gravar aqui fazia a 2ª execução achar "já vista" e deixar o overlay preso.
  useEffect(() => {
    if (sessionStorage.getItem("intro-seen")) return;
    if (getMotionLevel() === "off") return;
    setShow(true);
  }, []);

  // 2) enquanto aberta: fecha em 1,6 s ou no primeiro clique/tecla, e só então marca como vista.
  useEffect(() => {
    if (!show) return;
    const close = () => { sessionStorage.setItem("intro-seen", "1"); setShow(false); };
    const id = setTimeout(close, 1600);
    window.addEventListener("keydown", close, { once: true });
    window.addEventListener("pointerdown", close, { once: true });
    return () => {
      clearTimeout(id);
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", close);
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] grid place-items-center bg-navy-deep"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          aria-hidden
        >
          <div className="text-center">
            <motion.div className="mb-5 flex justify-center gap-4 text-cream-dim"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Code2 className="size-5" /><User className="size-5" /><Globe className="size-5" />
            </motion.div>
            <motion.p className="font-display text-2xl font-bold sm:text-4xl"
              initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.15, duration: 0.6 }}>
              {profile.shortName}
            </motion.p>
            <motion.p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-cream-mute"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {profile.role} · {profile.roleSecondary}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
