"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let frame = 0;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x - 3}px, ${
          pos.y - 3
        }px, 0)`;
      }
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        'a, button, [data-cursor="hover"], input, textarea'
      );
      setHovering(!!interactive);
    };

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${
          ring.y - 18
        }px, 0)`;
      }
      frame = requestAnimationFrame(render);
    };

    const leave = () => setHidden(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="custom-cursor pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
      aria-hidden
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 12px #00ff88" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          borderColor: hovering ? "#00e5ff" : "rgba(0,255,136,0.5)",
          backgroundColor: hovering ? "rgba(0,229,255,0.08)" : "transparent",
          transform: "translate3d(-100px,-100px,0)",
          scale: hovering ? "1.6" : "1",
        }}
      />
    </div>
  );
}
