"use client";

import { motion } from "framer-motion";
import { Brain, Cloud, Database, Workflow } from "lucide-react";
import { ABOUT } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const PILLARS = [
  { icon: Database, label: "Data Engineering" },
  { icon: Brain, label: "AI & GenAI" },
  { icon: Cloud, label: "Cloud Native" },
  { icon: Workflow, label: "Automation" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" label="About" title="Who Am I?" />

        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            {ABOUT.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                className="text-lg leading-relaxed text-muted [&_strong]:text-white"
              >
                {i === 0 ? (
                  <>
                    I&apos;m <strong>Mohammed Rayees</strong>, an{" "}
                    <strong className="text-primary">AI Data Engineer</strong>{" "}
                    with over 2 years of experience building scalable data
                    platforms, AI-powered applications, cloud-native
                    architectures, analytics systems, and intelligent automation
                    workflows.
                  </>
                ) : (
                  para
                )}
              </motion.p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PILLARS.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  data-cursor="hover"
                  className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-white">
                    {pillar.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
