import type { Metadata } from "next";
import Link from "next/link";
import { ABOUT, EXPERIENCES, SITE, SKILLS, STATS } from "@/lib/data";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Mohammed Rayees — AI Data Engineer.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 print:bg-white print:py-0">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="no-print text-sm text-muted transition-colors hover:text-white"
          >
            ← Back to portfolio
          </Link>
          <PrintButton />
        </div>

        <article className="rounded-2xl border border-white/10 bg-card p-8 print:rounded-none print:border-0 print:bg-white print:p-0 print:text-black sm:p-12">
          {/* Header */}
          <header className="border-b border-white/10 pb-6 print:border-gray-300">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white print:text-black">
              {SITE.name}
            </h1>
            <p className="mt-1 text-lg text-primary print:text-black">
              {SITE.role}
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted print:text-gray-700">
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.github}>{SITE.github.replace("https://", "")}</a>
              <a href={SITE.linkedin}>
                {SITE.linkedin.replace("https://www.", "")}
              </a>
            </div>
          </header>

          {/* Summary */}
          <Section title="Summary">
            <div className="space-y-2 text-sm leading-relaxed text-muted print:text-gray-800">
              {ABOUT.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Section>

          {/* Highlights */}
          <Section title="Highlights">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-primary print:text-black">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted print:text-gray-700">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="font-semibold text-white print:text-black">
                      {exp.company}
                      <span className="font-normal text-accent print:text-gray-700">
                        {" "}
                        — {exp.role}
                      </span>
                    </h3>
                    <span className="font-mono text-xs text-muted print:text-gray-600">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="mt-2 grid list-disc grid-cols-1 gap-x-6 gap-y-1 pl-5 text-sm text-muted marker:text-primary print:text-gray-800 sm:grid-cols-2">
                    {exp.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="space-y-3">
              {SKILLS.map((group) => (
                <div key={group.category} className="text-sm">
                  <span className="font-semibold text-white print:text-black">
                    {group.category}:{" "}
                  </span>
                  <span className="text-muted print:text-gray-800">
                    {group.skills.join(" · ")}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        </article>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-primary print:text-black">
        {title}
      </h2>
      {children}
    </section>
  );
}
