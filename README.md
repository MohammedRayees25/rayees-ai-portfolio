# Mohammed Rayees — Cinematic AI Data Engineer Portfolio

A premium, cinematic portfolio for an **AI Data Engineer / AI Engineer / LLM Engineer / Data Analytics Engineer**. Dark cyber aesthetic inspired by Apple Keynote, Stripe, Linear, Vercel, Tesla, and Netflix opening sequences.

## ✨ Features

- **Cinematic hero** with a live Three.js neural-network particle field, glowing data nodes and animated grid
- **Blur / character-stagger typography reveals** (AI · DATA · ENGINEER, RAYEES name section)
- **Animated statistics**, magnetic buttons and custom cursor
- **Scroll-driven experience timeline** with an animated progress track
- **Premium skill cards**, featured project showcase and contact section
- **Command palette** (`⌘K` / `Ctrl+K`), loading screen, smooth scrolling (Lenis)
- **SEO** (metadata, Open Graph, sitemap, robots), responsive and performance-optimized

## 🧱 Tech Stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 15 (App Router), TypeScript |
| Styling | TailwindCSS, custom design tokens |
| Animation | Framer Motion, GSAP-ready, Lenis smooth scroll |
| 3D | Three.js + React Three Fiber + Drei |
| Icons | Lucide React |

## 🎨 Design System

| Token | Value |
| --- | --- |
| Background | `#050505` |
| Card | `#101010` |
| Text | `#FFFFFF` |
| Primary | `#00FF88` |
| Secondary | `#00CC66` |
| Muted | `#888888` |
| Accent | `#00E5FF` |

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

### Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run start      # serve production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## 📁 Structure

```
src/
├── app/                # layout, page, globals, robots, sitemap
├── components/
│   ├── sections/       # Hero, NameSection, About, Experience, Skills, Projects, Contact
│   ├── three/          # NeuralScene (R3F)
│   └── ...             # Navbar, CommandPalette, CustomCursor, LoadingScreen, etc.
└── lib/                # data + utils
```

---

Built by **Mohammed Rayees** · [GitHub](https://github.com/MohammedRayees25) · [LinkedIn](https://www.linkedin.com/in/mohammedrayees)
