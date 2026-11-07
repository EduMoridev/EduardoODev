import { CursorSmoke } from "@/components/background/CursorSmoke";
import { LightRibbons } from "@/components/background/LightRibbons";
import { GlassPointer } from "@/components/GlassPointer";
import { Intro } from "@/components/Intro";
import { Navbar } from "@/components/Navbar";
import { SideNav } from "@/components/SideNav";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";

/** Estrutura do portfólio antigo (Navbar + SideNav + seções numeradas) com as camadas de efeito por trás. */
export default function Home() {
  return (
    <div className="relative min-h-screen bg-navy">
      <div className="dot-grid pointer-events-none fixed inset-0" />
      <Intro />
      <LightRibbons />
      <CursorSmoke />
      <GlassPointer />
      <Navbar />
      <SideNav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>
    </div>
  );
}
