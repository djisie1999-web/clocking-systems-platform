import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "EvoTime vs BrightHR — Comparison",
  description:
    "Compare EvoTime Pro and BrightHR for UK time and attendance. See features, pricing and why 50,000+ businesses choose EvoTime.",
};

const features = [
  { label: "Biometric hardware terminals", evotime: true, competitor: false },
  { label: "Face recognition clocking", evotime: true, competitor: false },
  { label: "Cloud dashboard", evotime: true, competitor: true },
  { label: "Mobile app", evotime: true, competitor: true },
  { label: "Shift planning & rotas", evotime: true, competitor: true },
  { label: "Absence management", evotime: true, competitor: true },
  { label: "Bradford Factor scoring", evotime: true, competitor: true },
  { label: "Overtime calculations", evotime: true, competitor: true },
  { label: "Payroll export (Sage, QuickBooks)", evotime: true, competitor: "Limited" },
  { label: "Employee self-service", evotime: true, competitor: true },
  { label: "Hardware + software from one supplier", evotime: true, competitor: false },
  { label: "3-year hardware warranty", evotime: true, competitor: false },
  { label: "UK phone support", evotime: true, competitor: true },
  { label: "No per-month subscription lock-in", evotime: true, competitor: false },
  { label: "Annual pricing (lower total cost)", evotime: "From \u00A315/user/yr", competitor: "From \u00A34.50/user/mo" },
  { label: "One-off hardware purchase", evotime: "From \u00A3275", competitor: "N/A" },
];

type CellValue = string | boolean;

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true)
    return <div className="flex justify-center"><Check className={`w-5 h-5 ${highlight ? "text-emerald-500" : "text-emerald-500"}`} /></div>;
  if (value === false)
    return <div className="flex justify-center"><X className="w-4 h-4 text-gray-300" /></div>;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function EvoTimeVsBrightHR() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EvoTime vs BrightHR</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">EvoTime vs BrightHR</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            BrightHR is a popular HR platform, but it lacks dedicated hardware terminals. EvoTime gives you biometric clocking AND cloud software &mdash; from a single UK supplier.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Feature comparison table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-12">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-2/5">Feature</th>
                <th className="px-5 py-4 text-center bg-blue-50">
                  <div className="text-sm font-semibold text-blue-800">EvoTime Pro</div>
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-700">BrightHR</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">{row.label}</td>
                  <td className="px-5 py-3 text-center bg-blue-50/30"><Cell value={row.evotime} highlight /></td>
                  <td className="px-5 py-3 text-center"><Cell value={row.competitor} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verdict */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">Our Verdict</h2>
          <p className="text-gray-700 mb-4">
            BrightHR is a solid HR tool but relies entirely on software-based clocking (phones, browsers). If you need
            physical biometric terminals to prevent buddy punching and ensure accurate attendance, <strong>EvoTime is the better choice</strong>.
            With annual pricing from just &pound;15/user/year (vs BrightHR&apos;s monthly billing), EvoTime Pro is also significantly cheaper over a 3-year period.
          </p>
          <p className="text-gray-700">
            Plus, EvoTime gives you hardware + software from one supplier with a 3-year warranty and UK phone support. No third-party integrators needed.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
          >
            Buy EvoTime Pro
            <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Or <Link href="/demo" className="text-[#2563EB] font-semibold hover:underline">see a demo</Link> first.
          </p>
        </div>
      </div>
    </>
  );
}
