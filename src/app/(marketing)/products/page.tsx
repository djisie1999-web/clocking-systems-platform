import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Package, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Time & Attendance Products",
  description:
    "Browse our full range of UK time and attendance solutions. From traditional clocking machines to EvoTime Pro cloud software. Find the right system for your business.",
  openGraph: {
    title: "Time & Attendance Products | Clocking Systems",
    description: "Hardware terminals, cloud software, and enterprise solutions for every UK business size.",
  },
};

const products = [
  {
    slug: "evotime",
    name: "EvoTime — Hardware + Free Software",
    category: "Hardware + Software",
    categoryColor: "bg-emerald-100 text-emerald-700",
    description: "Biometric clocking terminals with free cloud software included. Buy the hardware, get the software for life.",
    price: "From \u00A3275 + VAT",
    priceDetail: "One-off hardware purchase",
    image: "/images/products/biotime-face.png",
    popular: false,
    features: [
      "Face, fingerprint, card and fob options",
      "Free EvoTime cloud dashboard included",
      "3-year warranty and next day delivery",
    ],
    cta: "View hardware terminals",
    ctaHref: "/hardware",
    ctaColor: "bg-[#059669] text-white hover:bg-emerald-700",
  },
  {
    slug: "evotime-pro",
    name: "EvoTime Pro — Cloud Subscription",
    category: "Premium Software",
    categoryColor: "bg-blue-100 text-blue-700",
    description: "Full time and attendance platform: shifts, rotas, absence management, overtime rules, payroll exports, and more.",
    price: "From \u00A315/employee/year",
    priceDetail: "Annual subscription \u00B7 ex-VAT",
    image: "/demo/dashboard.png",
    popular: true,
    features: [
      "Shifts, rotas, absence & overtime management",
      "Payroll export to Sage, QuickBooks & more",
      "Employee self-service portal & mobile app",
    ],
    cta: "Buy EvoTime Pro",
    ctaHref: "/shop",
    ctaColor: "bg-[#2563EB] text-white hover:bg-blue-700",
  },
  {
    slug: "enterprise",
    name: "Enterprise Workforce Management",
    category: "Enterprise",
    categoryColor: "bg-purple-100 text-purple-700",
    description: "Fully tailored, on-site deployed systems for large organisations. Multi-site, integrations, dedicated support.",
    price: "Bespoke pricing",
    priceDetail: "Request a quote",
    image: "/images/products/totaltime-hero.png",
    popular: false,
    features: [
      "Multi-site and multi-branch support",
      "On-site installation and training",
      "SSO, custom integrations, dedicated account manager",
    ],
    cta: "Get an enterprise quote",
    ctaHref: "/contact",
    ctaColor: "bg-[#7C3AED] text-white hover:bg-purple-700",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Time &amp; Attendance Products
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Hardware terminals, cloud software, and enterprise solutions for every UK business size. All with UK support and next day delivery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <article
              key={product.slug}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col relative ${
                product.popular ? "border-2 border-[#2563EB]" : "border border-gray-200"
              }`}
            >
              {product.popular && (
                <div className="absolute -top-px right-5 bg-[#2563EB] text-white text-[11px] font-semibold px-3 py-1 rounded-b-lg z-10">
                  Most Popular
                </div>
              )}

              <div className="bg-[#F8F9FB] p-6 flex items-center justify-center h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={160}
                  className="h-36 w-auto object-contain"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <span className={`inline-flex items-center text-xs font-semibold rounded-full px-3 py-0.5 mb-3 w-fit ${product.categoryColor}`}>
                  {product.category}
                </span>

                <h2 className="text-lg font-bold text-[#0A1628] mb-2">{product.name}</h2>
                <p className="text-sm text-gray-500 mb-4 flex-1">{product.description}</p>

                <ul className="space-y-2 mb-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t border-gray-100 pt-4">
                  <div className="text-2xl font-bold text-[#0A1628] mb-0.5">{product.price}</div>
                  <div className="text-xs text-gray-400 mb-4">{product.priceDetail}</div>
                  <Link
                    href={product.ctaHref}
                    className={`inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold transition-colors w-full ${product.ctaColor}`}
                  >
                    {product.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Decision helper */}
        <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
              <Package className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Not sure which system you need?</h2>
            <p className="text-gray-500 mb-6">
              If you just need basic clocking with a free dashboard, go with <strong>EvoTime hardware</strong>.
              If you need shifts, rotas, absence management and payroll exports, go with <strong>EvoTime Pro</strong>.
              For 100+ employees across multiple sites, talk to us about <strong>Enterprise</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Star className="w-4 h-4" />
                Compare plans
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] transition-colors"
              >
                Get advice from our team
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
