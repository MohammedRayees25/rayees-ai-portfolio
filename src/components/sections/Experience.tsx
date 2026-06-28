"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 70%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          label="Experience"
          title="A timeline of building."
        />

        <div ref={ref} className="relative mt-8">
          {/* Track */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-2 w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="flex flex-col gap-14">
            {EXPERIENCES.map((exp, i) => (
              <div
                key={exp.company}
                className={`relative flex flex-col gap-4 pl-10 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? "md:self-start md:pr-14 md:text-right"
                    : "md:self-end md:pl-14"
                }`}
              >
                {/* Node */}
                <span
                  className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background ring-2 ring-primary md:left-auto ${
                    i % 2 === 0
                      ? "md:-right-2 md:translate-x-1/2"
                      : "md:-left-2 md:-translate-x-1/2"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4 }}
                  data-cursor="hover"
                  className="group rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/40 hover:border-glow"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                    {exp.period}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-white">
                    {exp.company}
                  </h3>
                  <p className="text-sm text-accent">{exp.role}</p>

                  <ul
                    className={`mt-4 flex flex-wrap gap-2 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted transition-colors group-hover:border-white/20 group-hover:text-white/80"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
