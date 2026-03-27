import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail, Users, Building2, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "About Clocking Systems — UK Time & Attendance Specialists",
  description:
    "Clocking Systems Limited is a Leeds-based UK company specialising in time and attendance hardware and cloud software. Trusted by 50,000+ businesses since the 1990s.",
  openGraph: {
    title: "About Clocking Systems Limited",
    description: "Leeds-based UK time & attendance specialists. Trusted by 50,000+ businesses.",
    type: "website",
  },
};

const timeline = [
  { year: "1990s", event: "Founded in Leeds as a specialist time & attendance hardware supplier for UK businesses." },
  { year: "2000s", event: "Expanded product range to include biometric fingerprint terminals as the technology became affordable for SMEs." },
  { year: "2010s", event: "Launched our own cloud-based software platform — EvoTime — allowing customers to manage attendance from any browser." },
  { year: "2017", event: "EvoTime Pro launched, bringing per-employee pricing and advanced payroll integrations to growing UK businesses." },
  { year: "2020s", event: "50,000+ businesses now trust Clocking Systems for their time and attendance needs across every industry." },
];

const stats = [
  { icon: Users, value: "50,000+", label: "UK businesses served" },
  { icon: Building2, value: "30+", label: "Years in business" },
  { icon: Trophy, value: "4.8/5", label: "Trustpilot rating" },
  { icon: Phone, value: "UK only", label: "Based support team" },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">About Clocking Systems</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            We&apos;re a Leeds-based UK company that has been helping businesses track employee time and attendance for over 30 years.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <s.icon className="w-5 h-5 text-[#2563EB]" />
                </div>
                <div className="text-2xl font-bold text-[#0A1628] mb-1">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#0A1628] mb-4">Who we are</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Clocking Systems Limited is a UK specialist in employee time and attendance systems, headquartered in Leeds, West Yorkshire. We supply hardware terminals, cloud management software, and ongoing UK-based support — all from one place.
                </p>
                <p>
                  We work with businesses of all sizes: from a 10-person manufacturing firm needing a single terminal, to multi-site retail and logistics companies managing hundreds of employees across the country. Whatever your setup, we have a solution that fits.
                </p>
                <p>
                  Our approach is straightforward: sell the right kit, make it easy to set up, and be available when customers need us. We&apos;re not a faceless software company — we&apos;re people who answer the phone, know what we&apos;re talking about, and care whether the system works.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A1628] mb-4">What we sell</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong className="text-[#0A1628]">Hardware terminals:</strong> Six models covering card/fob, fingerprint, facial recognition, palm vein, and outdoor weatherproof options. All carry a 3-year warranty and ship next day.
                </p>
                <p>
                  <strong className="text-[#0A1628]">EvoTime cloud software:</strong> Browser-based time and attendance management. Employees, shifts, leave, classifications, payroll export — everything your HR and payroll team needs, without needing IT support to set it up.
                </p>
                <p>
                  <strong className="text-[#0A1628]">EvoTime Pro subscription:</strong> For businesses that want advanced features and per-employee pricing. From £15/employee/year for teams up to 70, £10/employee/year above that.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0A1628] mb-6">Our history</h2>
              <div className="space-y-4">
                {timeline.map((t) => (
                  <div key={t.year} className="flex gap-5">
                    <div className="flex-shrink-0 w-16 pt-0.5">
                      <span className="font-bold text-sm text-[#2563EB]">{t.year}</span>
                    </div>
                    <div className="flex-1 border-l-2 border-gray-200 pl-5 pb-4">
                      <p className="text-sm text-gray-600">{t.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-[#0A1628] mb-4">Contact us</h3>
              <div className="space-y-3 text-sm">
                <a href="tel:01132587856" className="flex items-center gap-3 text-gray-600 hover:text-[#2563EB] transition-colors">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  0113 258 7856
                </a>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  hello@clockingsystems.co.uk
                </div>
                <div className="flex items-start gap-3 text-gray-600">
                  <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>Leeds, West Yorkshire<br />United Kingdom</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-400">
                Monday–Friday, 9am–5pm
              </div>
            </div>

            <div className="bg-[#0A1628] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2">Ready to buy?</h3>
              <p className="text-sm text-blue-200 mb-4">
                Browse our pricing and order online in minutes.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-lg text-sm font-semibold bg-white text-[#0A1628] hover:bg-blue-50 transition-colors"
              >
                See pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
