"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import CommandPalette from "@/components/CommandPalette";
import Marquee from "@/components/Marquee";
import Hero from "@/components/sections/Hero";
import NameSection from "@/components/sections/NameSection";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <SmoothScroll>
      <CustomCursor />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} />

      <main className="relative">
        <Hero />
        <NameSection />
        <About />
        <Marquee />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
