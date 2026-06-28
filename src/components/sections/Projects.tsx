"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Projects() {
  return (
    <section id="work" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          label="Featured Work"
          title="Selected projects & systems."
        />

        <div className="flex flex-col gap-6">
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="hover"
              className="group relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-card p-7 transition-all duration-500 hover:border-primary/40 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-9"
            >
              {/* glow on hover */}
              <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,136,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 font-display text-6xl font-bold text-white/5 transition-colors duration-500 group-hover:text-primary/30 lg:text-8xl">
                {project.highlight}
              </div>

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] uppercase tracking-widest text-accent">
                    {project.tag}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-white transition-colors group-hover:text-primary lg:text-3xl">
                  {project.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.features.map((f) => (
                    <span
                      key={f}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[11px] text-white/70"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div className="mt-1 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-primary/70"
                    >
                      #{t.replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex items-center gap-3 lg:flex-col lg:items-end">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    aria-label={`${project.title} repository`}
                  >
                    <Github className="h-5 w-5" />
                  </a>
                )}
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white transition-all duration-500 group-hover:bg-primary group-hover:text-background">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
