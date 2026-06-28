"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Navbar({
  onOpenPalette,
}: {
  onOpenPalette: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 py-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500",
          scrolled
            ? "glass border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]"
            : "border border-transparent"
        )}
      >
        <a href="#home" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 ring-1 ring-primary/40">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            RAYEES<span className="text-primary">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-xs font-medium uppercase tracking-widest text-muted transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-muted transition-colors hover:border-primary/50 hover:text-white sm:flex"
          >
            <Command className="h-3 w-3" />
            <span className="font-mono">⌘K</span>
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 left-4 right-4 rounded-2xl border border-white/10 p-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-sm uppercase tracking-widest text-muted transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
