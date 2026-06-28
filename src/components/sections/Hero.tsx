"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles } from "lucide-react";
import { SITE, STATS } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

const NeuralScene = dynamic(() => import("@/components/three/NeuralScene"), {
  ssr: false,
});

const lineVariants = {
  hidden: { opacity: 0, y: 80, filter: "blur(20px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      delay: 0.3 + i * 0.18,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 noise"
    >
      {/* 3D background */}
      <div className="absolute inset-0 -z-10">
        <NeuralScene />
      </div>
      <div className="grid-bg absolute inset-0 -z-10 opacity-30 animate-grid-pan" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_25%,#050505_85%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-wide text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Available for AI &amp; Data Engineering roles</span>
        </motion.div>

        <h1 className="flex flex-col font-display font-bold leading-[0.85] tracking-tightest">
          <motion.span
            custom={0}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-[clamp(4rem,18vw,12rem)] text-primary glow-primary"
          >
            AI
          </motion.span>
          <motion.span
            custom={1}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-[clamp(4rem,18vw,12rem)] text-white"
          >
            DATA
          </motion.span>
          <motion.span
            custom={2}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-[clamp(4rem,18vw,12rem)] text-white"
          >
            ENGINEER
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-8 max-w-2xl text-balance text-base text-muted sm:text-lg"
        >
          {SITE.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#work">Explore Work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Let&apos;s Talk
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{ opacity }}
        className="relative z-10 mt-16 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-4"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="group relative flex flex-col items-center gap-1 bg-card/40 px-4 py-6 transition-colors hover:bg-primary/5"
          >
            <span className="font-display text-3xl font-bold text-gradient-primary sm:text-4xl">
              {stat.value}
            </span>
            <span className="text-center text-[11px] uppercase tracking-widest text-muted">
              {stat.label}
            </span>
            {i < STATS.length - 1 && (
              <span className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-white/5 md:block" />
            )}
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
