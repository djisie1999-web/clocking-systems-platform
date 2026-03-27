import type { Metadata } from "next";
import Link from "next/link";
import { Check, X, ArrowRight, Clock, PoundSterling, AlertTriangle, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "EvoTime vs Paper Timesheets — Why Switch",
  description:
    "Manual timesheets cost UK businesses thousands every year in time theft, admin hours and payroll errors. See why switching to EvoTime pays for itself.",
};

const comparisons = [
  { label: "Accuracy", paper: "Prone to errors and rounding", evotime: "Exact to-the-second records" },
  { label: "Buddy punching prevention", paper: "Impossible to prevent", evotime: "Biometric verification eliminates it" },
  { label: "Admin time per week", paper: "3-8 hours", evotime: "Under 30 minutes" },
  { label: "Payroll processing", paper: "Manual data entry", evotime: "One-click export to Sage/QuickBooks" },
  { label: "Overtime tracking", paper: "Manual calculation", evotime: "Automatic with customisable rules" },
  { label: "Absence management", paper: "Paper forms and calendars", evotime: "Digital requests, auto-approval, Bradford Factor" },
  { label: "Compliance / audit trail", paper: "No audit trail", evotime: "Full digital audit trail" },
  { label: "GDPR compliance", paper: "Difficult to manage", evotime: "Built-in data retention policies" },
  { label: "Real-time visibility", paper: false, evotime: true },
  { label: "Remote / multi-site", paper: false, evotime: true },
  { label: "Cost per year (25 employees)", paper: "\u00A32,500+ in lost time", evotime: "\u00A3375 software + \u00A3295 terminal" },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <div className="flex justify-center"><Check className="w-5 h-5 text-emerald-500" /></div>;
  if (value === false) return <div className="flex justify-center"><X className="w-4 h-4 text-red-400" /></div>;
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function EvoTimeVsPaperTimesheets() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/compare" className="hover:text-white">Compare</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EvoTime vs Paper Timesheets</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            EvoTime vs Paper Timesheets
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Manual timesheets cost UK businesses thousands every year. Here&apos;s exactly why &mdash; and how EvoTime pays for itself within weeks.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cost of paper timesheets */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[
            { icon: Clock, color: "bg-red-100 text-red-600", stat: "4.5 hrs/week", label: "Average admin time on manual timesheets" },
            { icon: PoundSterling, color: "bg-amber-100 text-amber-600", stat: "\u00A32,500+", label: "Annual cost of time theft per 25 employees" },
            { icon: AlertTriangle, color: "bg-orange-100 text-orange-600", stat: "1 in 5", label: "Paper timesheets contain errors" },
            { icon: TrendingUp, color: "bg-emerald-100 text-emerald-600", stat: "6-8 weeks", label: "Typical EvoTime payback period" },
          ].map((card) => (
            <div key={card.label} className="bg-white border border-gray-200 rounded-xl p-5 text-center">
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mx-auto mb-3`}>
                <card.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-[#0A1628] mb-1">{card.stat}</div>
              <div className="text-xs text-gray-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-12">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-2/5">Aspect</th>
                <th className="px-5 py-4 text-center bg-red-50">
                  <div className="text-sm font-semibold text-red-700">Paper Timesheets</div>
                </th>
                <th className="px-5 py-4 text-center bg-blue-50">
                  <div className="text-sm font-semibold text-blue-800">EvoTime Pro</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <tr key={row.label} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">{row.label}</td>
                  <td className="px-5 py-3 text-center"><Cell value={row.paper} /></td>
                  <td className="px-5 py-3 text-center bg-blue-50/30"><Cell value={row.evotime} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 mb-12">
          <h2 className="text-xl font-bold text-[#0A1628] mb-3">The Bottom Line</h2>
          <p className="text-gray-700 mb-4">
            Paper timesheets aren&apos;t free &mdash; they cost you in admin hours, payroll errors, time theft, and compliance risk.
            A 25-person business typically spends <strong>&pound;2,500+ per year</strong> on the hidden costs of manual timekeeping.
          </p>
          <p className="text-gray-700">
            EvoTime Pro costs <strong>&pound;375/year</strong> for 25 employees, plus a one-off &pound;295 for a biometric terminal.
            That&apos;s a payback period of <strong>6-8 weeks</strong>. After that, it&apos;s pure savings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/roi-calculator" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
            Calculate your exact savings
          </Link>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors">
            Buy EvoTime Pro <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
