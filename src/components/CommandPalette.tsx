"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  FileText,
  Github,
  Home,
  Layers,
  Linkedin,
  Mail,
  Search,
  User,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { SITE } from "@/lib/data";

type Action = {
  label: string;
  hint: string;
  icon: React.ElementType;
  run: () => void;
};

export default function CommandPalette({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const go = useCallback(
    (hash: string) => {
      setOpen(false);
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: "smooth" });
    },
    [setOpen]
  );

  const actions: Action[] = useMemo(
    () => [
      { label: "Home", hint: "Go to top", icon: Home, run: () => go("#home") },
      { label: "About", hint: "Who am I", icon: User, run: () => go("#about") },
      {
        label: "Experience",
        hint: "Career timeline",
        icon: Briefcase,
        run: () => go("#experience"),
      },
      {
        label: "Skills",
        hint: "Tech stack",
        icon: Layers,
        run: () => go("#skills"),
      },
      {
        label: "View Projects",
        hint: "Featured work",
        icon: Sparkles,
        run: () => go("#work"),
      },
      {
        label: "View Resume",
        hint: "Open printable resume",
        icon: FileText,
        run: () => window.open("/resume", "_blank"),
      },
      {
        label: "Contact Me",
        hint: "Get in touch",
        icon: Mail,
        run: () => go("#contact"),
      },
      {
        label: "Open GitHub",
        hint: SITE.github.replace("https://", ""),
        icon: Github,
        run: () => window.open(SITE.github, "_blank"),
      },
      {
        label: "Open LinkedIn",
        hint: SITE.linkedin.replace("https://www.", ""),
        icon: Linkedin,
        run: () => window.open(SITE.linkedin, "_blank"),
      },
      {
        label: "Email me",
        hint: SITE.email,
        icon: Mail,
        run: () => window.open(`mailto:${SITE.email}`),
      },
    ],
    [go]
  );

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  useEffect(() => {
    setActive(0);
  }, [query, open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      filtered[active]?.run();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-card/95 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search sections, links, actions…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-muted"
              />
              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </span>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-muted">
                  No results found
                </div>
              )}
              {filtered.map((a, i) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.label}
                    onClick={a.run}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                      active === i ? "bg-primary/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                        active === i
                          ? "bg-primary/20 text-primary"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm text-white">
                        {a.label}
                      </span>
                      <span className="block text-xs text-muted">{a.hint}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
