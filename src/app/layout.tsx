import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Clocking Systems \u2014 UK Time & Attendance Systems",
    template: "%s | Clocking Systems",
  },
  description:
    "Time and attendance systems for UK businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier. Next day delivery. 3-year warranty.",
  metadataBase: new URL("https://clockingsystems.co.uk"),
  keywords: [
    "clocking in machines",
    "time and attendance system UK",
    "employee clocking system",
    "biometric clocking system",
    "EvoTime",
    "EvoTime Pro",
    "time and attendance software",
    "clocking in system",
    "fingerprint clocking machine",
    "face recognition clocking",
  ],
  openGraph: {
    title: "Clocking Systems \u2014 UK Time & Attendance Systems",
    description:
      "Time and attendance systems for UK businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier.",
    url: "https://clockingsystems.co.uk",
    siteName: "Clocking Systems",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clocking Systems \u2014 UK Time & Attendance",
    description:
      "Time & attendance systems for UK businesses. Hardware + software from one supplier.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://clockingsystems.co.uk/#organization",
      name: "Clocking Systems Limited",
      url: "https://clockingsystems.co.uk",
      logo: "https://clockingsystems.co.uk/images/logos/cs_logo.svg",
      description:
        "UK time and attendance systems for businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier.",
      telephone: "01132587856",
      email: "hello@clockingsystems.co.uk",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Leeds",
        addressCountry: "GB",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        bestRating: "5",
        ratingCount: "2847",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://clockingsystems.co.uk/#website",
      url: "https://clockingsystems.co.uk",
      name: "Clocking Systems",
      publisher: { "@id": "https://clockingsystems.co.uk/#organization" },
    },
    {
      "@type": "SoftwareApplication",
      name: "EvoTime Pro",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Full time and attendance management platform with shifts, rotas, absence management, overtime rules and payroll exports.",
      offers: {
        "@type": "Offer",
        price: "15.00",
        priceCurrency: "GBP",
        priceValidUntil: "2027-12-31",
        description: "Per employee per year (1-70 employees)",
      },
    },
    {
      "@type": "Product",
      name: "EvoTime A124 Face Recognition Terminal",
      description:
        "Multi-biometric clocking terminal with face recognition, fingerprint and card access. 3-year warranty. Next day UK delivery.",
      brand: { "@type": "Brand", name: "EvoTime" },
      offers: {
        "@type": "Offer",
        price: "295.00",
        priceCurrency: "GBP",
        priceValidUntil: "2027-12-31",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
