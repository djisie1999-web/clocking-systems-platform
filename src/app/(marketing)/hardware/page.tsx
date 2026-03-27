import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, Truck, ShieldCheck, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Clocking In Machines & Hardware Terminals — Clocking Systems",
  description:
    "Browse our full range of UK time and attendance hardware terminals. Facial recognition, fingerprint, card and fob clocking. From £275 ex-VAT. Next day delivery.",
  openGraph: {
    title: "Clocking In Machines — Clocking Systems UK",
    description: "UK time & attendance hardware terminals from £275 ex-VAT. Next day delivery. 3-year warranty.",
    type: "website",
  },
};

const HARDWARE = [
  {
    id: "a124_face",
    name: "A124 — Face, Fingerprint & Card",
    description: "Multi-biometric terminal supporting face recognition, fingerprint scanning, and card/fob access.",
    priceExVat: 295,
    image: "/images/products/biotime-face.png",
    popular: true,
    features: [
      "Face recognition — identifies in under 1 second",
      "Fingerprint scanner — 1:N matching up to 3,000 templates",
      "RFID card & fob — 125kHz proximity",
      "4.3\" colour touchscreen",
      "WiFi and Ethernet connectivity",
      "Works with EvoTime cloud software",
    ],
    badge: "Most Popular",
    badgeColor: "bg-[#2563EB] text-white",
  },
  {
    id: "a124_fp",
    name: "A124 — Fingerprint & Card",
    description: "Fingerprint and card access terminal with intuitive touchscreen interface.",
    priceExVat: 275,
    image: "/images/products/biotime-fp.png",
    popular: false,
    features: [
      "Fingerprint scanner — high-accuracy optical sensor",
      "RFID card & fob support",
      "4.3\" colour touchscreen",
      "WiFi and Ethernet connectivity",
      "Compact wall-mount design",
      "Works with EvoTime cloud software",
    ],
  },
  {
    id: "a124_fob",
    name: "A124 — Cards/Fobs Only",
    description: "Card and fob-based clocking terminal, ideal for environments where biometrics are not required.",
    priceExVat: 275,
    image: "/images/products/biotime-multi.webp",
    popular: false,
    features: [
      "125kHz RFID proximity cards and fobs",
      "No biometric data stored — GDPR simple",
      "4.3\" colour touchscreen",
      "WiFi and Ethernet connectivity",
      "Fastest clock-in experience",
      "Works with EvoTime cloud software",
    ],
  },
  {
    id: "a103_palm",
    name: "A103 — With Palm Vein",
    description: "Premium terminal with palm vein recognition for the highest level of biometric accuracy.",
    priceExVat: 375,
    image: "/images/products/biotime-fr.png",
    popular: false,
    features: [
      "Palm vein recognition — contactless, hygienic",
      "Face and fingerprint recognition also supported",
      "5\" colour touchscreen",
      "Built-in camera for face ID",
      "Suitable for high-security environments",
      "Works with EvoTime cloud software",
    ],
  },
  {
    id: "a103_no_palm",
    name: "A103 — Without Palm",
    description: "High-performance terminal with face and fingerprint recognition, without palm scanner.",
    priceExVat: 345,
    image: "/images/products/biotime-fp2.png",
    popular: false,
    features: [
      "Face recognition and fingerprint",
      "5\" colour touchscreen",
      "Built-in camera for face ID",
      "Faster identification than A124",
      "Suitable for 50+ employee sites",
      "Works with EvoTime cloud software",
    ],
  },
  {
    id: "outdoor_ip65",
    name: "Outdoor IP65 — Weatherproof",
    description: "Fully weatherproof IP65-rated terminal for outdoor and harsh environment installations.",
    priceExVat: 395,
    image: "/images/products/evotime-tile.png",
    popular: false,
    features: [
      "IP65 weatherproof rated — rain, dust, humidity",
      "Fingerprint, RFID card and fob clocking",
      "Operating temperature: -10°C to +60°C",
      "Anti-vandal reinforced housing",
      "Ideal for construction, logistics, warehouses",
      "Works with EvoTime cloud software",
    ],
    badge: "Outdoor",
    badgeColor: "bg-amber-500 text-white",
  },
];

function formatGBP(n: number) {
  return `£${n.toLocaleString("en-GB")}`;
}

export default function HardwarePage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Clocking In Machines & Terminals
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Six models to suit every workplace — from card-only to full multi-biometric. All include a 3-year warranty and next day delivery.
          </p>
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-blue-200">
            <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Next day delivery</span>
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> 3-year warranty</span>
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> UK support: 0113 258 7856</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {HARDWARE.map((hw) => (
            <article
              key={hw.id}
              className={`bg-white border-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col relative ${
                hw.popular ? "border-[#2563EB]" : "border-gray-200"
              }`}
            >
              {hw.badge && (
                <div className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${hw.badgeColor}`}>
                  {hw.badge}
                </div>
              )}
              <div className="bg-[#F8F9FB] p-8 flex items-center justify-center h-52">
                <Image
                  src={hw.image}
                  alt={hw.name}
                  width={200}
                  height={180}
                  className="h-40 w-auto object-contain"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-lg font-bold text-[#0A1628] mb-2">{hw.name}</h2>
                <p className="text-sm text-gray-500 mb-4">{hw.description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {hw.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-[#0A1628]">{formatGBP(hw.priceExVat)}</span>
                    <span className="text-sm text-gray-400">+ VAT per unit</span>
                  </div>
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] transition-colors w-full"
                  >
                    Buy now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#F8F9FB] border border-gray-200 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Not sure which terminal to choose?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-6">
            Our team will recommend the right model for your workplace and team size. Call us — we know time and attendance, not a script.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01132587856"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] transition-colors"
            >
              <Phone className="w-4 h-4" />
              0113 258 7856
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Send us a message
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
