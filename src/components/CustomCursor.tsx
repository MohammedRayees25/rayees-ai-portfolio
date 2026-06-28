"use client";

import { useEffect, useRef, useState } from "react";

type Trail = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.setAttribute("data-custom-cursor", "true");

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") ?? null;
    let w = window.innerWidth;
    let h = window.innerHeight;
    if (canvas) {
      canvas.width = w;
      canvas.height = h;
    }

    const pos = { x: w / 2, y: h / 2 };
    const ring = { x: pos.x, y: pos.y };
    const trails: Trail[] = [];
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
      // emit trail particles
      for (let i = 0; i < 2; i++) {
        trails.push({
          x: pos.x,
          y: pos.y,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 + 0.3,
          life: 1,
          color: Math.random() > 0.5 ? "0,255,136" : "0,229,255",
        });
      }
      if (trails.length > 90) trails.splice(0, trails.length - 90);

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

      if (ctx) {
        ctx.clearRect(0, 0, w, h);
        for (let i = trails.length - 1; i >= 0; i--) {
          const t = trails[i];
          t.x += t.vx;
          t.y += t.vy;
          t.life -= 0.04;
          if (t.life <= 0) {
            trails.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(t.x, t.y, t.life * 2.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${t.color},${t.life * 0.5})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `rgba(${t.color},${t.life})`;
          ctx.fill();
        }
      }
      frame = requestAnimationFrame(render);
    };

    const leave = () => setHidden(true);
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      if (canvas) {
        canvas.width = w;
        canvas.height = h;
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("resize", resize);
    document.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
      document.documentElement.removeAttribute("data-custom-cursor");
    };
  }, []);

  return (
    <div
      className="custom-cursor pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="fixed inset-0 h-full w-full" />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 12px #00ff88, 0 0 24px #00ff88" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border transition-[width,height,border-color,background-color] duration-200"
        style={{
          borderColor: hovering ? "#00e5ff" : "rgba(0,255,136,0.5)",
          backgroundColor: hovering ? "rgba(0,229,255,0.08)" : "transparent",
          boxShadow: hovering
            ? "0 0 24px rgba(0,229,255,0.4)"
            : "0 0 16px rgba(0,255,136,0.2)",
          transform: "translate3d(-100px,-100px,0)",
          scale: hovering ? "1.6" : "1",
        }}
      />
    </div>
  );
}
