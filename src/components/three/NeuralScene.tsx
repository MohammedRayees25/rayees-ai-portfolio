"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
  color: string;
  pulse: number;
};

const PRIMARY = "0, 255, 136";
const ACCENT = "0, 229, 255";

export default function NeuralScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let frame = 0;
    let running = true;

    const mouse = { x: -9999, y: -9999, active: false };
    const LINK_DIST = 150;
    const MOUSE_DIST = 220;

    const buildNodes = () => {
      // density scales with viewport, capped for performance
      const area = width * height;
      const count = Math.max(
        34,
        Math.min(120, Math.floor(area / 16000))
      );
      nodes = Array.from({ length: count }, () => {
        const hub = Math.random() > 0.82;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: hub ? Math.random() * 1.8 + 2 : Math.random() * 1.4 + 0.6,
          hub,
          color: Math.random() > 0.5 ? PRIMARY : ACCENT,
          pulse: Math.random() * Math.PI * 2,
        };
      });
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.8);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        // gentle mouse attraction
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST && dist > 0.01) {
            const force = (1 - dist / MOUSE_DIST) * 0.4;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }
      }

      // connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color}, ${alpha * 0.55})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // link to mouse
        if (mouse.active) {
          const dx = a.x - mouse.x;
          const dy = a.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha * 0.5})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // nodes
      const t = frame * 0.02;
      for (const n of nodes) {
        const glow = n.hub ? 0.6 + Math.sin(t + n.pulse) * 0.4 : 0.8;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color}, ${glow})`;
        ctx.shadowBlur = n.hub ? 16 : 6;
        ctx.shadowColor = `rgba(${n.color}, ${glow})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      frame++;
      if (running) animationId = requestAnimationFrame(draw);
    };

    let animationId = 0;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // pause when offscreen to save resources
    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting;
        if (running) {
          animationId = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(animationId);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);

    if (reduceMotion) {
      draw(); // single static frame
      running = false;
      cancelAnimationFrame(animationId);
    } else {
      animationId = requestAnimationFrame(draw);
    }

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    />
  );
}
