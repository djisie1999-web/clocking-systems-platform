import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Clocking Systems — UK Time & Attendance Systems",
    template: "%s | Clocking Systems",
  },
  description:
    "Time and attendance systems for UK businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier. Next day delivery. 3-year warranty.",
  metadataBase: new URL("https://clockingsystems.co.uk"),
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
