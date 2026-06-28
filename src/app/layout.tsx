import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import LoadingScreen from "@/components/LoadingScreen";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://rayees-ai-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mohammed Rayees — AI Data Engineer",
    template: "%s — Mohammed Rayees",
  },
  description:
    "Mohammed Rayees is an AI Data Engineer building intelligent data platforms, AI systems, LLM applications, and next-generation automation experiences.",
  keywords: [
    "AI Data Engineer",
    "AI Engineer",
    "LLM Engineer",
    "Data Analytics Engineer",
    "Mohammed Rayees",
    "Databricks",
    "PySpark",
    "GenAI",
    "Machine Learning",
    "Data Engineering",
  ],
  authors: [{ name: "Mohammed Rayees" }],
  creator: "Mohammed Rayees",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mohammed Rayees — AI Data Engineer",
    description:
      "Building intelligent data platforms, AI systems, LLM applications, and next-generation automation experiences.",
    siteName: "Mohammed Rayees",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Rayees — AI Data Engineer",
    description:
      "Building intelligent data platforms, AI systems, LLM applications, and next-generation automation experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}
