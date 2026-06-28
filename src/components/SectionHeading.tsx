"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div className="mb-14 flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-primary"
      >
        <span>{index}</span>
        <span className="h-px w-10 bg-primary/50" />
        <span className="text-muted">{label}</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
