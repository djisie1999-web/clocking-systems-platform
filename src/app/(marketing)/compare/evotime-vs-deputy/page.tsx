import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "EvoTime vs Deputy — Comparison",
  description:
    "Compare EvoTime Pro and Deputy for UK time and attendance. Side-by-side features, pricing, and hardware options.",
};

const features = [
  { label: "Biometric hardware terminals", evotime: true, competitor: false },
  { label: "Face recognition clocking", evotime: true, competitor: false },
  { label: "Fingerprint clocking", evotime: true, competitor: false },
  { label: "Cloud dashboard", evotime: true, competitor: true },
  { label: "Mobile app clocking", evotime: true, competitor: true },
  { label: "Shift scheduling", evotime: true, competitor: true },
  { label: "Absence management", evotime: true, competitor: true },
  { label: "Overtime rules", evotime: true, competitor: true },
  { label: "Payroll export (Sage, QuickBooks)", evotime: true, competitor: "Limited" },
  { label: "Employee self-service", evotime: true, competitor: true },
  { label: "Hardware included in solution", evotime: true, competitor: false },
  { label: "UK-based company", evotime: true, competitor: false },
  { label: "UK phone support", evotime: true, competitor: "Chat only" },
  { label: "3-year hardware warranty", evotime: true, competitor: false },
  { label: "Annual billing (lower total cost)", evotime: "From \u00A315/user/yr", competitor: "From $4.50/user/mo" },
  { label: "No per-month lock-in", evotime: true, competitor: false },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <div className="flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>;
  if (value === false) return <div className="flex justify-center"><X className="w-4 h-4 text-gray-300" /></div>;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function EvoTimeVsDeputy() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EvoTime vs Deputy</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">EvoTime vs Deputy</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Deputy is a popular workforce management tool from Australia. EvoTime is a UK-built solution with dedicated hardware terminals and local support.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-12">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-2/5">Feature</th>
                <th className="px-5 py-4 text-center bg-blue-50">
                  <div className="text-sm font-semibold text-blue-800">EvoTime Pro</div>
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-700">Deputy</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, i) => (
                <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">{row.label}</td>
                  <td className="px-5 py-3 text-center bg-blue-50/30"><Cell value={row.evotime} /></td>
                  <td className="px-5 py-3 text-center"><Cell value={row.competitor} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">Our Verdict</h2>
          <p className="text-gray-700 mb-4">
            Deputy is a strong scheduling tool but it&apos;s software-only &mdash; no hardware terminals, no biometric clocking. If you need
            to prevent buddy punching and want a complete hardware + software solution from a UK company, <strong>EvoTime is the better fit</strong>.
          </p>
          <p className="text-gray-700">
            Deputy also bills monthly in USD, making costs unpredictable for UK businesses. EvoTime Pro&apos;s annual billing in GBP gives you full cost certainty.
          </p>
        </div>

        <div className="text-center">
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors">
            Buy EvoTime Pro <ArrowRight className="w-4 h-4" />
          </Link>
          <p className="text-sm text-gray-500 mt-3">
            Or <Link href="/demo" className="text-[#2563EB] font-semibold hover:underline">see a demo</Link> first.
          </p>
        </div>
      </div>
    </>
  );
}
