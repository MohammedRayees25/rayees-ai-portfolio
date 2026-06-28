"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SITE, SOCIALS } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-32 sm:py-44"
    >
      <div className="grid-bg absolute inset-0 opacity-20 mask-fade-y" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[160px]" />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-xs uppercase tracking-[0.5em] text-primary"
        >
          Let&apos;s build together
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-5xl font-bold tracking-tight sm:text-7xl"
        >
          {SITE.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-3 text-base uppercase tracking-[0.3em] text-muted"
        >
          {SITE.role}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10"
        >
          <MagneticButton href={`mailto:${SITE.email}`}>
            Hire Me <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>

        <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          {SOCIALS.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * i }}
                whileHover={{ y: -5 }}
                data-cursor="hover"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-background">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-xs uppercase tracking-widest text-muted">
                  {social.label}
                </span>
                <span className="break-all text-sm text-white">
                  {social.value}
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>

      <footer className="relative mx-auto mt-28 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {SITE.name}. Crafted with precision.
        </p>
        <p className="font-mono text-xs text-muted">
          Built with Next.js · Three.js · Framer Motion
        </p>
      </footer>
    </section>
  );
}
