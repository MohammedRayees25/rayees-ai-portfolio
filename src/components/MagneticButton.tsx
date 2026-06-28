"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  external,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: x * 0.32, y: y * 0.32 });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300",
    variant === "primary"
      ? "bg-primary text-background hover:bg-accent"
      : "border border-white/15 text-white hover:border-primary/60",
    className
  );

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span className="absolute inset-0 z-0 translate-y-full bg-accent transition-transform duration-300 group-hover:translate-y-0" />
      )}
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.4 }}
      className="inline-block"
      data-cursor="hover"
    >
      {href ? (
        <a
          href={href}
          onClick={onClick}
          className={styles}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {inner}
        </a>
      ) : (
        <button onClick={onClick} className={styles}>
          {inner}
        </button>
      )}
    </motion.div>
  );
}
