"use client";

const ITEMS = [
  "AI ENGINEERING",
  "DATA PLATFORMS",
  "LLM SYSTEMS",
  "PYSPARK",
  "DATABRICKS",
  "GENAI",
  "AGENTIC AI",
  "CLOUD NATIVE",
  "ANALYTICS",
  "AUTOMATION",
];

export default function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-card/30 py-6 select-none">
      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-semibold tracking-tight text-white/70 sm:text-3xl">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
        ))}
      </div>
      <div
        className="flex shrink-0 animate-marquee items-center gap-10 pr-10"
        aria-hidden
      >
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-semibold tracking-tight text-white/70 sm:text-3xl">
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-primary" />
          </div>
        ))}
      </div>
    </div>
  );
}
