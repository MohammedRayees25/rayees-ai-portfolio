"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { gsap } from "gsap";

const NAME = "RAYEES";
const EASE = [0.16, 1, 0.3, 1] as const;

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Small floating dust particles drawn on a canvas. */
function DustField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);
    const count = Math.min(60, Math.floor(w / 22));
    const dust = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3,
      vy: -(Math.random() * 0.4 + 0.1),
      vx: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.5 + 0.1,
    }));

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of dust) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -5) {
          p.y = h + 5;
          p.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "rgba(255,255,255,0.8)";
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 44, filter: "blur(26px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    textShadow: [
      "0 0 0px rgba(255,255,255,0)",
      "0 0 34px rgba(255,255,255,0.85)",
      "0 0 18px rgba(255,255,255,0.45)",
    ],
    transition: { duration: 0.95, ease: EASE },
  },
};

export default function LoadingScreen() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    if (!isHome) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let alreadyPlayed = false;
    try {
      alreadyPlayed = sessionStorage.getItem("introPlayed") === "true";
    } catch {
      alreadyPlayed = false;
    }

    // Skip instantly (before paint) on repeat loads / reduced motion.
    if (alreadyPlayed || prefersReduced) {
      setDone(true);
      return;
    }

    try {
      sessionStorage.setItem("introPlayed", "true");
    } catch {
      /* ignore */
    }

    // Lock scrolling while the intro is on screen.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Phase 3 (1800–2500ms): GSAP white glow + slight zoom in.
    const tl = gsap.timeline();
    if (wrapRef.current) {
      tl.to(
        wrapRef.current,
        {
          scale: 1.045,
          filter: "drop-shadow(0 0 60px rgba(255,255,255,0.85))",
          duration: 0.7,
          ease: "power2.out",
        },
        1.8
      );
    }

    // Phase 4: trigger exit at 2500ms (exit animation runs 500ms).
    const exitTimer = window.setTimeout(() => setVisible(false), 2500);

    return () => {
      window.clearTimeout(exitTimer);
      tl.kill();
      document.body.style.overflow = prevOverflow;
    };
  }, [isHome]);

  const finish = () => {
    setDone(true);
    document.body.style.overflow = "";
  };

  if (!isHome || done) return null;

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          key="intro"
          className="film-grain noise fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black"
          exit={{
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.05,
            transition: { duration: 0.5, ease: EASE },
          }}
        >
          <DustField />

          {/* Soft white core glow (intensifies in phase 3) */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[120px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0.9] }}
            transition={{ duration: 2.5, ease: EASE, times: [0, 0.7, 1] }}
          />

          {/* Phase 3 outer wrapper (GSAP target: scale + glow) */}
          <div ref={wrapRef} className="relative">
            {/* Phase 1: whole word blur / scale / opacity reveal */}
            <motion.div
              initial={{ scale: 1.2, opacity: 0, filter: "blur(24px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* Phase 2: per-character stagger reveal */}
              <motion.h1
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex font-display font-bold leading-none text-white"
                style={{
                  letterSpacing: "-0.08em",
                  fontSize: "clamp(4.5rem, 20vw, 12rem)",
                }}
                aria-label={NAME}
              >
                {NAME.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </motion.div>
          </div>

          {/* Bottom hint line */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.6em] text-white/40"
          >
            AI Data Engineer
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
