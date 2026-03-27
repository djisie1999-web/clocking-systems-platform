import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare EvoTime vs Competitors",
  description:
    "Side-by-side comparison of EvoTime, EvoTime Pro and competitor time & attendance systems. See features, pricing and which system is right for your UK business.",
  openGraph: {
    title: "Compare EvoTime vs Competitors | Clocking Systems",
    description: "Side-by-side comparison of UK time & attendance solutions.",
  },
};

const softwareFeatures = [
  { label: "Cloud dashboard", free: true, pro: true, enterprise: true },
  { label: "Real-time attendance view", free: true, pro: true, enterprise: true },
  { label: "Basic reports", free: true, pro: true, enterprise: true },
  { label: "Employee count", free: "Up to 100", pro: "Up to 300", enterprise: "Unlimited" },
  { label: "Sites / locations", free: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Shift patterns & rotas", free: false, pro: true, enterprise: true },
  { label: "Absence & leave management", free: false, pro: true, enterprise: true },
  { label: "Overtime calculations", free: false, pro: true, enterprise: true },
  { label: "Bradford Factor scoring", free: false, pro: true, enterprise: true },
  { label: "Payroll export (Sage, QuickBooks)", free: false, pro: true, enterprise: true },
  { label: "Employee self-service portal", free: false, pro: true, enterprise: true },
  { label: "Mobile app", free: false, pro: true, enterprise: true },
  { label: "Compliance exports", free: false, pro: true, enterprise: true },
  { label: "Advanced analytics", free: false, pro: true, enterprise: true },
  { label: "SSO (SAML / Azure AD)", free: false, pro: false, enterprise: true },
  { label: "Custom integrations", free: false, pro: false, enterprise: true },
  { label: "Dedicated account manager", free: false, pro: false, enterprise: true },
  { label: "On-site installation", free: false, pro: false, enterprise: true },
  { label: "Support", free: "Email", pro: "Phone + Email", enterprise: "24/7 Priority" },
  { label: "Price", free: "Free with hardware", pro: "From \u00A315/user/year", enterprise: "Bespoke quote" },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <Check className="w-5 h-5 text-emerald-500" />
      </div>
    );
  if (value === false)
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-gray-300" />
      </div>
    );
  return <span className="text-sm text-gray-700">{value}</span>;
}

const comparisonPages = [
  { href: "/compare/evotime-vs-brighthr", label: "EvoTime vs BrightHR", desc: "Compare features, pricing and UK support" },
  { href: "/compare/evotime-vs-deputy", label: "EvoTime vs Deputy", desc: "See how EvoTime stacks up against Deputy" },
  { href: "/compare/evotime-vs-timemoto", label: "EvoTime vs TimeMoto", desc: "Hardware + software comparison" },
  { href: "/compare/evotime-vs-paper-timesheets", label: "EvoTime vs Paper Timesheets", desc: "Why manual timesheets cost you money" },
];

export default function ComparePage() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Compare Plans</h1>
          <p className="text-blue-200 max-w-2xl">
            Side-by-side comparison of EvoTime Free, EvoTime Pro, and Enterprise plans. Find the right fit for your business.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Software Comparison */}
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6">
          Software Plans
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-16">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/3">
                  Feature
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-[#0A1628]">
                    EvoTime Free
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">Included with hardware</div>
                  <div className="text-lg font-bold text-[#0A1628]">Free</div>
                </th>
                <th className="px-5 py-4 text-center bg-blue-50 relative">
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
                    <span className="bg-[#2563EB] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-blue-800">
                    EvoTime Pro
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Full T&amp;A platform</div>
                  <div className="text-lg font-bold text-blue-900">From &pound;15/user/yr</div>
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-[#0A1628]">
                    Enterprise
                  </div>
                  <div className="text-xs text-purple-600 font-medium">Custom deployment</div>
                  <div className="text-lg font-bold text-[#0A1628]">Bespoke</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {softwareFeatures.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">
                    {row.label}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.free} />
                  </td>
                  <td className="px-5 py-3 text-center bg-blue-50/30">
                    <Cell value={row.pro} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.enterprise} />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="px-5 py-4"></td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/hardware"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    View Hardware
                  </Link>
                </td>
                <td className="px-5 py-4 text-center bg-blue-50/30">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
                  >
                    Buy EvoTime Pro
                  </Link>
                </td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Contact Sales
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Competitor Comparisons */}
        <h2 className="text-2xl font-bold text-[#0A1628] mb-6">
          How does EvoTime compare to competitors?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {comparisonPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group"
            >
              <h3 className="text-lg font-semibold text-[#0A1628] mb-1 group-hover:text-[#2563EB] transition-colors">
                {page.label}
              </h3>
              <p className="text-sm text-gray-500 mb-3">{page.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#2563EB]">
                Read comparison <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Not sure which to choose?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] shadow transition-colors"
          >
            Talk to a Product Specialist
          </Link>
        </div>
      </div>
    </>
  );
}
