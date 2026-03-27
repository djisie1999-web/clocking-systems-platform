import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Clocking Machines vs Manual Timesheets: The Real Cost Comparison — Clocking Systems",
  description:
    "Manual timesheets cost UK businesses more than they realise. Compare the real cost of paper timesheets vs automated clocking machines — including buddy punching, admin time, and payroll errors.",
  openGraph: {
    title: "Clocking Machines vs Manual Timesheets: Real Cost Comparison",
    description: "How much are manual timesheets actually costing your business? A honest comparison for UK employers.",
    type: "article",
  },
};

export default function TimesheetsArticle() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <span className="text-xs font-semibold bg-amber-500 rounded-full px-3 py-1 mb-4 inline-block">Business</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Clocking Machines vs Manual Timesheets: The Real Cost Comparison
          </h1>
          <div className="text-blue-200 text-sm">
            Published March 2025 · 9 min read · By Clocking Systems
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">
            Most businesses that still use paper timesheets think the system is &ldquo;fine&rdquo; — until they actually calculate what it&apos;s costing them. This article does that calculation for you, with honest numbers drawn from real Clocking Systems customers.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">The hidden costs of manual timesheets</h2>

          <h3 className="text-xl font-semibold text-[#0A1628]">1. Admin time</h3>
          <p>
            For a 25-person business on a fortnightly payroll cycle, processing timesheets manually typically takes 3–5 hours per cycle. That&apos;s an HR or admin person&apos;s time:
          </p>
          <div className="bg-[#F8F9FB] rounded-xl p-5 font-mono text-sm my-4">
            <div>4 hours per cycle × 26 cycles per year = 104 hours</div>
            <div>104 hours × £15/hour (admin cost) = £1,560/year in admin time alone</div>
          </div>

          <h3 className="text-xl font-semibold text-[#0A1628]">2. Buddy punching</h3>
          <p>
            Buddy punching — where one employee clocks in on behalf of another who hasn&apos;t arrived yet — is one of the most expensive and underreported problems in UK workplaces. Research consistently shows it costs employers between 1.5% and 3% of payroll.
          </p>
          <p>
            For a business with 25 employees at an average salary of £28,000:
          </p>
          <div className="bg-[#F8F9FB] rounded-xl p-5 font-mono text-sm my-4">
            <div>Total payroll: 25 × £28,000 = £700,000</div>
            <div>Buddy punching cost at 2%: £14,000/year</div>
          </div>
          <p>
            This figure includes not just the fraudulent clock-ins, but late arrivals, extended breaks, and early departures that go unnoticed without an automatic record.
          </p>

          <h3 className="text-xl font-semibold text-[#0A1628]">3. Payroll errors</h3>
          <p>
            Manual timesheet data entry introduces errors. A study by the American Payroll Association found that manual payroll processes have an error rate of 1–8%. In the UK, payroll errors lead to employee disputes, overpayments, and in extreme cases, tribunal claims.
          </p>
          <p>
            Even a 1% error rate on £700,000 of payroll is £7,000 in potential overpayments or underpayments per year.
          </p>

          <h3 className="text-xl font-semibold text-[#0A1628]">4. Management time</h3>
          <p>
            Managers who rely on manual timesheets spend time chasing employees who forget to submit them, investigating discrepancies, and dealing with disputes. This time is rarely counted, but it&apos;s real. Conservatively, this adds 1–2 hours per manager per month.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">The cost of a clocking machine system</h2>
          <p>
            Let&apos;s compare for the same 25-person business:
          </p>
          <div className="bg-[#F8F9FB] rounded-xl p-5 my-4 text-sm space-y-2">
            <div className="flex justify-between"><span>A124 Face terminal (×1):</span><span className="font-semibold">£295 + VAT, one-off</span></div>
            <div className="flex justify-between"><span>EvoTime Pro — 30 employees:</span><span className="font-semibold">£450/year ex-VAT</span></div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold"><span>Year 1 total:</span><span>£745 + VAT</span></div>
            <div className="flex justify-between font-bold"><span>Year 2+ (software only):</span><span>£450/year + VAT</span></div>
          </div>

          <h2 className="text-2xl font-bold text-[#0A1628]">The comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse my-4">
              <thead>
                <tr className="bg-[#0A1628] text-white">
                  <th className="text-left p-3">Cost type</th>
                  <th className="text-right p-3">Manual timesheets</th>
                  <th className="text-right p-3">Clocking system</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Admin time (Year 1)</td>
                  <td className="text-right p-3">£1,560</td>
                  <td className="text-right p-3">£150 (setup)</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">Buddy punching (est.)</td>
                  <td className="text-right p-3">£14,000</td>
                  <td className="text-right p-3">£0</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">Payroll errors (est.)</td>
                  <td className="text-right p-3">£7,000</td>
                  <td className="text-right p-3">£0</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-3">Hardware + software</td>
                  <td className="text-right p-3">£0</td>
                  <td className="text-right p-3">£745</td>
                </tr>
                <tr className="bg-[#F8F9FB] font-bold">
                  <td className="p-3">Year 1 total cost</td>
                  <td className="text-right p-3 text-red-600">~£22,560</td>
                  <td className="text-right p-3 text-emerald-600">~£895</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400">* Estimates based on typical customer data. Buddy punching and payroll error figures are highly variable.</p>

          <h2 className="text-2xl font-bold text-[#0A1628]">What customers actually say</h2>
          <p>
            Hirex Ltd, a 25-person manufacturing firm, told us: &ldquo;We didn&apos;t realise how much time we were wasting on timesheets until we stopped doing them.&rdquo; Their payroll processing dropped from a full day to 45 minutes.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-[#0A1628] mb-2">Ready to make the switch?</h3>
            <p className="text-sm text-gray-600 mb-4">
              From £275 for the hardware and £150/year for the software — most businesses pay back in under 30 days.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 h-10 px-6 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors">
              See pricing and buy
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
