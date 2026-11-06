import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { Nav } from "@/components/Nav";
import { Showcase } from "@/components/Showcase";
import { CursorSmoke } from "@/components/background/CursorSmoke";
import { LightRibbons } from "@/components/background/LightRibbons";
import { GlassPointer } from "@/components/GlassPointer";

export default function Home() {
  return (
    <>
      <Intro />
      {/* camada de fundo (z-0): feixes de luz + fumaça — nunca capturam eventos */}
      <LightRibbons />
      <CursorSmoke />
      <GlassPointer />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Showcase />
        <Contact />
      </main>
      <div className="relative z-10"><Footer /></div>
    </>
  );
}
