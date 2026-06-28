"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accent"
    >
      <Printer className="h-4 w-4" />
      Print / Save PDF
    </button>
  );
}
