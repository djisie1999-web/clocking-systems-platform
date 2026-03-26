// Build v2 — 2026-03-26T22:00 — force clean static output
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Clocking Systems Platform",
    template: "%s | Clocking Systems Platform",
  },
  description: "Internal management platform for Clocking Systems Limited.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
