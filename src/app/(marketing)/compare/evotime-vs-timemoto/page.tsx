import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "EvoTime vs TimeMoto — Comparison",
  description:
    "Compare EvoTime and TimeMoto clocking systems. Hardware terminals, cloud software, pricing and UK support compared side by side.",
};

const features = [
  { label: "Face recognition terminals", evotime: true, competitor: true },
  { label: "Fingerprint terminals", evotime: true, competitor: true },
  { label: "Card/fob terminals", evotime: true, competitor: true },
  { label: "Palm vein recognition", evotime: true, competitor: false },
  { label: "Outdoor IP65 weatherproof terminal", evotime: true, competitor: false },
  { label: "Full cloud T&A software included", evotime: true, competitor: "Extra cost" },
  { label: "Shift planning & rotas", evotime: true, competitor: "Extra cost" },
  { label: "Absence management", evotime: true, competitor: "Extra cost" },
  { label: "Overtime calculations", evotime: true, competitor: "Basic" },
  { label: "Bradford Factor scoring", evotime: true, competitor: false },
  { label: "Payroll export (Sage, QuickBooks)", evotime: true, competitor: "Limited" },
  { label: "Employee self-service portal", evotime: true, competitor: false },
  { label: "Mobile app", evotime: true, competitor: "Extra cost" },
  { label: "UK phone support", evotime: true, competitor: "Limited" },
  { label: "3-year warranty", evotime: true, competitor: "2 years" },
  { label: "Next day UK delivery", evotime: true, competitor: "3-5 days" },
  { label: "Hardware price", evotime: "From \u00A3275", competitor: "From \u00A3200" },
  { label: "Software price", evotime: "From \u00A315/user/yr", competitor: "From \u00A32.75/user/mo" },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <div className="flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>;
  if (value === false) return <div className="flex justify-center"><X className="w-4 h-4 text-gray-300" /></div>;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function EvoTimeVsTimeMoto() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EvoTime vs TimeMoto</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">EvoTime vs TimeMoto</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            TimeMoto sells hardware terminals with basic software. EvoTime gives you premium hardware AND a full cloud T&amp;A platform &mdash; shifts, rotas, absence, payroll exports and more.
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
                  <div className="text-sm font-semibold text-gray-700">TimeMoto</div>
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
            TimeMoto offers budget-friendly hardware but their cloud software is limited and charges extra for features that
            EvoTime Pro includes as standard (shifts, absence management, mobile app). Over 3 years, <strong>EvoTime Pro typically costs
            less when you factor in the full feature set</strong>.
          </p>
          <p className="text-gray-700">
            EvoTime also offers a longer 3-year warranty (vs TimeMoto&apos;s 2), next-day UK delivery, and dedicated UK phone support.
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
