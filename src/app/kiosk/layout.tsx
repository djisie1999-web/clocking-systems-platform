import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EvoTime Kiosk | Clocking Systems",
  description: "Employee clock-in / clock-out kiosk",
};

export default function KioskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
