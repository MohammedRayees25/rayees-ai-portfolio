"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const NAME = "RAYEES";

const charVariants = {
  hidden: { opacity: 0, y: 120, filter: "blur(24px)", scale: 1.2 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 1.1,
      delay: i * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export default function NameSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-120, 120]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.2, 1, 1, 0.2]
  );

  return (
    <section
      ref={ref}
      className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-4 py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[160px]" />

      <motion.div style={{ x }} className="flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.6em] text-primary"
        >
          The Engineer
        </motion.p>

        <motion.h2
          style={{ opacity }}
          className="flex font-display text-[clamp(4.5rem,22vw,17rem)] font-bold leading-none tracking-tightest"
        >
          {NAME.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={charVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              className="text-gradient inline-block hover:text-primary"
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-1 sm:flex-row sm:gap-4"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-white sm:text-base">
            AI Data Engineer
          </span>
          <span className="hidden h-1 w-1 rounded-full bg-primary sm:block" />
          <span className="text-sm uppercase tracking-[0.3em] text-muted sm:text-base">
            Data Analytics Engineer
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
