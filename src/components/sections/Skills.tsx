"use client";

import { motion } from "framer-motion";
import { SKILLS } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 sm:py-36">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[150px]" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          label="Skills"
          title="The full engineering stack."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILLS.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 transition-all duration-300 hover:border-primary/40"
            >
              <div
                className={cn(
                  "absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  group.accent === "primary" ? "bg-primary/20" : "bg-accent/20"
                )}
              />
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-white">
                  {group.category}
                </h3>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full",
                    group.accent === "primary" ? "bg-primary" : "bg-accent"
                  )}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs text-muted transition-colors group-hover:text-white/85"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
