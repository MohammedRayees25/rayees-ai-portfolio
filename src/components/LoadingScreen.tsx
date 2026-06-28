"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let value = 0;
    const interval = setInterval(() => {
      value += Math.random() * 14 + 4;
      if (value >= 100) {
        value = 100;
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 500);
      }
      setProgress(Math.floor(value));
    }, 130);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background noise"
          exit={{ opacity: 0, filter: "blur(12px)" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-xs uppercase tracking-[0.5em] text-muted"
            >
              Initializing
            </motion.div>

            <div className="relative font-display text-6xl font-bold tracking-tighter sm:text-8xl">
              <span className="text-gradient-primary glow-primary">RAYEES</span>
            </div>

            <div className="flex w-64 flex-col gap-3 sm:w-80">
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                <span>Loading systems</span>
                <span className="text-primary">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
