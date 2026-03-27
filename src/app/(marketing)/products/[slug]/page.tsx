import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

const productData: Record<string, {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  priceDetail: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaColor: string;
  metaTitle: string;
  metaDescription: string;
}> = {
  evotime: {
    name: "EvoTime",
    subtitle: "Hardware Terminals + Free Cloud Software",
    description:
      "EvoTime is a range of biometric and card-based clocking terminals that connect to our free cloud dashboard. Buy the terminal hardware once, get the software for life. Ideal for businesses with 5\u2013100 employees who need reliable attendance tracking without a monthly subscription.",
    image: "/images/products/biotime-face.png",
    price: "From \u00A3275 + VAT",
    priceDetail: "One-off purchase per terminal. Free cloud software included.",
    features: [
      "Facial recognition, fingerprint, or card/fob clocking",
      "Free EvoTime cloud dashboard \u2014 see who\u2019s in, track hours, export data",
      "WiFi and Ethernet connectivity",
      "3-year hardware warranty",
      "Next day UK delivery",
      "DIY installation with online guides",
      "Employee count bands (10, 20, 30\u2026300) determine the software licence tier, NOT the hardware price",
      "Works offline \u2014 syncs when connection is restored",
    ],
    ctaLabel: "View hardware terminals",
    ctaHref: "/hardware",
    ctaColor: "bg-[#059669] text-white hover:bg-emerald-700",
    metaTitle: "EvoTime \u2014 Hardware Terminals + Free Software",
    metaDescription:
      "EvoTime biometric clocking terminals from \u00A3275 ex-VAT. Face, fingerprint, card and fob options. Free cloud software included. 3-year warranty. Next day UK delivery.",
  },
  "evotime-pro": {
    name: "EvoTime Pro",
    subtitle: "Premium Cloud Time & Attendance Platform",
    description:
      "EvoTime Pro is a full time and attendance management platform. Manage shifts, rotas, absence, overtime, employee self-service, and payroll exports \u2014 all from one cloud dashboard. Works with EvoTime hardware terminals OR standalone (browser-based clocking).",
    image: "/demo/dashboard.png",
    price: "From \u00A315/employee/year",
    priceDetail: "\u00A315/user/year (1\u201370 employees), \u00A310/user/year (71+). Annual billing. Ex-VAT.",
    features: [
      "Full shift planning and rota management",
      "Absence management with Bradford Factor scoring",
      "Customisable overtime rules and calculations",
      "One-click payroll export to Sage, QuickBooks and more",
      "Employee self-service portal \u2014 leave requests, viewing schedules",
      "Mobile app for managers and employees",
      "Compliance-ready reports and audit trails",
      "Real-time dashboard \u2014 who\u2019s in, who\u2019s late, who\u2019s on leave",
      "Works with EvoTime hardware OR standalone browser clocking",
      "No free trial \u2014 buy today, get onboarded within 2 hours",
    ],
    ctaLabel: "Buy EvoTime Pro",
    ctaHref: "/shop",
    ctaColor: "bg-[#2563EB] text-white hover:bg-blue-700",
    metaTitle: "EvoTime Pro \u2014 Cloud Time & Attendance Software",
    metaDescription:
      "EvoTime Pro: shifts, rotas, absence management, overtime rules and payroll exports from \u00A315/user/year. Full cloud T&A platform for UK businesses. Buy now.",
  },
  enterprise: {
    name: "Enterprise Workforce Management",
    subtitle: "Custom Deployment for Large Organisations",
    description:
      "For businesses with 100\u20135,000+ employees, our enterprise solution is fully tailored to your requirements. Multi-site deployments, custom integrations, dedicated account management, and 24/7 priority support.",
    image: "/images/products/totaltime-hero.png",
    price: "Bespoke pricing",
    priceDetail: "Contact us for a custom quote based on your requirements.",
    features: [
      "Multi-site and multi-branch support",
      "On-site installation, configuration and staff training",
      "SSO (SAML / Azure AD) integration",
      "Custom integrations with your existing HR and payroll systems",
      "Dedicated account manager",
      "24/7 priority support with SLA",
      "Full audit logs and compliance reporting",
      "Visitor management and contractor modules",
      "Mobile GPS clocking for field workers",
    ],
    ctaLabel: "Request a quote",
    ctaHref: "/contact",
    ctaColor: "bg-[#7C3AED] text-white hover:bg-purple-700",
    metaTitle: "Enterprise Workforce Management \u2014 Clocking Systems",
    metaDescription:
      "Enterprise time and attendance for 100\u20135,000+ employees. Multi-site, custom integrations, dedicated support. Contact us for a bespoke quote.",
  },
};

export function generateStaticParams() {
  return Object.keys(productData).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Need to handle async params properly for Next 15
  return params.then(({ slug }) => {
    const product = productData[slug];
    if (!product) return { title: "Product Not Found" };
    return {
      title: product.metaTitle,
      description: product.metaDescription,
      openGraph: {
        title: product.metaTitle,
        description: product.metaDescription,
      },
    };
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productData[slug];
  if (!product) notFound();

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-white">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-blue-200 text-lg">{product.subtitle}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <div className="bg-[#F8F9FB] rounded-2xl p-8 flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={300}
              className="max-h-72 w-auto object-contain"
            />
          </div>

          {/* Details */}
          <div>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            <div className="mb-6">
              <div className="text-3xl font-bold text-[#0A1628] mb-1">{product.price}</div>
              <div className="text-sm text-gray-400">{product.priceDetail}</div>
            </div>

            <Link
              href={product.ctaHref}
              className={`inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold shadow transition-colors ${product.ctaColor}`}
            >
              {product.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl p-4">
                <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-600" />
                </div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-links */}
        <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">Compare all products</h2>
          <p className="text-gray-500 mb-6">See how our plans compare side by side.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Compare plans
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
            >
              See EvoTime Pro demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
