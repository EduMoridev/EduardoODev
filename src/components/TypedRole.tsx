"use client";

import { useEffect, useState } from "react";

/** Subtítulo digitado do vídeo ("Junior Programmer" → "Fresh Graduate"...). */
export function TypedRole({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(words[0]); return; }
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const empty = deleting && text === "";
    const delay = done ? 1600 : empty ? 300 : deleting ? 35 : 70;
    const id = setTimeout(() => {
      if (done) setDeleting(true);
      else if (empty) { setDeleting(false); setI((n) => n + 1); }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(id);
  }, [text, deleting, i, words]);

  return (
    <span className="font-mono text-cream-dim">
      {/* leitores de tela e crawlers recebem a lista completa */}
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden>{text}<span className="ml-0.5 inline-block w-2 animate-pulse">_</span></span>
    </span>
  );
}
