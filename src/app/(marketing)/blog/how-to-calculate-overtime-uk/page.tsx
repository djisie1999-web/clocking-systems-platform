import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Calculate Overtime Pay in the UK (2025 Guide) — Clocking Systems",
  description:
    "A complete guide to calculating overtime pay in the UK. Understand legal requirements, different overtime types, and how automated time & attendance systems eliminate calculation errors.",
  openGraph: {
    title: "How to Calculate Overtime Pay in the UK (2025 Guide)",
    description: "Legal requirements, calculation methods, and how to automate overtime tracking for UK businesses.",
    type: "article",
  },
};

export default function OvertimeArticle() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <span className="text-xs font-semibold bg-blue-600 rounded-full px-3 py-1 mb-4 inline-block">Compliance</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            How to Calculate Overtime Pay in the UK (2025 Guide)
          </h1>
          <div className="text-blue-200 text-sm">
            Published March 2025 · 8 min read · By Clocking Systems
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-[#0A1628] mt-0">The basics of overtime in the UK</h2>
          <p>
            UK employment law does not require employers to pay a premium rate for overtime — but any hours worked must still be paid at least at the National Minimum Wage (NMW). What you pay above that is governed by the employment contract.
          </p>
          <p>
            That said, most employers who pay overtime use one of three standard models: time and a half (1.5×), double time (2×), or flat rate (the same hourly rate for overtime hours). Some businesses use a tiered approach — time and a half up to a threshold, then double time above it.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Step-by-step: calculating overtime pay</h2>
          <p><strong>1. Define the contracted hours</strong></p>
          <p>
            Before you can calculate overtime, you need to know what the employee&apos;s contracted hours are. Most full-time UK employees work 37.5 or 40 hours per week. Any hours above this threshold are overtime, assuming the contract defines it that way.
          </p>
          <p><strong>2. Identify the overtime hours</strong></p>
          <p>
            Subtract contracted hours from total hours worked. For example, if an employee worked 45 hours and their contract is 37.5 hours, they have 7.5 overtime hours.
          </p>
          <p><strong>3. Apply the overtime rate</strong></p>
          <p>
            If the employee earns £14/hour and is entitled to time and a half for overtime:
          </p>
          <div className="bg-[#F8F9FB] rounded-xl p-5 font-mono text-sm my-4">
            <div>Normal pay: 37.5 hours × £14 = £525.00</div>
            <div>Overtime pay: 7.5 hours × £21 (£14 × 1.5) = £157.50</div>
            <div className="font-bold mt-2">Total: £682.50</div>
          </div>

          <h2 className="text-2xl font-bold text-[#0A1628]">Working Time Regulations and overtime limits</h2>
          <p>
            Under the Working Time Regulations 1998, most workers cannot be made to work more than 48 hours per week on average (calculated over a 17-week reference period). Employees can voluntarily opt out of this limit by signing a written opt-out agreement.
          </p>
          <p>
            Young workers (under 18) have stricter rules: they cannot work more than 8 hours per day or 40 hours per week, with no opt-out available.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Common mistakes UK businesses make with overtime</h2>
          <ul className="space-y-2">
            <li><strong>Not tracking overtime accurately.</strong> Without a reliable clocking system, overtime is often based on estimates or self-reported timesheets. This leads to both underpayment (employee disputes) and overpayment (cost leakage).</li>
            <li><strong>Applying the wrong overtime threshold.</strong> Part-time employees have different contracted hours — their overtime threshold is different from full-time colleagues.</li>
            <li><strong>Missing the NMW check.</strong> Even if overtime is unpaid per the contract, the average hourly rate including overtime hours must still meet NMW. Failing this is a legal risk.</li>
            <li><strong>No audit trail.</strong> HMRC can investigate payroll calculations. Without a reliable record of hours worked, disputes are difficult to resolve in your favour.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0A1628]">How automated clocking eliminates overtime errors</h2>
          <p>
            A time and attendance system removes the guesswork. When an employee clocks in and out on a terminal or via the software, every minute is recorded. The system then applies your defined overtime thresholds and rates automatically.
          </p>
          <p>
            EvoTime Pro allows you to configure pay classifications — normal time, overtime at 1.5×, double time — and set the thresholds that trigger them. At payroll time, you export a report showing exactly what each employee is owed. No manual calculation. No disputes.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-[#0A1628] mb-2">Automate overtime tracking with EvoTime Pro</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure overtime rules once. EvoTime Pro applies them automatically to every clocking record — and exports directly to Sage, QuickBooks, and more.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-10 px-6 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors"
            >
              See pricing — from £15/employee/year
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
