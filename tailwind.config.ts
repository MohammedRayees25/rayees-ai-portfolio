import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        card: "#101010",
        foreground: "#FFFFFF",
        primary: "#00FF88",
        secondary: "#00CC66",
        muted: "#888888",
        accent: "#00E5FF",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
      },
      letterSpacing: {
        tightest: "-0.06em",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "grid-pan": "gridPan 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.4)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gridPan: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
