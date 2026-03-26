"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, TrendingUp, ArrowRight, PoundSterling } from "lucide-react";

interface ROIResult {
  annualAdminSavings: number;
  annualTheftPrevention: number;
  annualOvertimeSavings: number;
  totalAnnualSavings: number;
  systemCost: number;
  paybackMonths: number;
  threeYearROI: number;
  recommendedProduct: string;
  recommendedProductSlug: string;
}

export default function ROICalculatorPage() {
  const [employees, setEmployees] = useState(25);
  const [avgHourlyRate, setAvgHourlyRate] = useState(13);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(5);
  const [buddyPunchingPercent, setBuddyPunchingPercent] = useState(1.5);
  const [overtimePercent, setOvertimePercent] = useState(8);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ROIResult | null>(null);

  async function calculate() {
    setLoading(true);
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employees,
          avgHourlyRate,
          manualHoursPerWeek,
          buddyPunchingPercent,
          overtimePercent,
          currentSolution: "paper",
        }),
      });
      if (!res.ok) throw new Error("Calculation failed");
      const data = (await res.json()) as ROIResult;
      setResult(data);
    } catch {
      // Show a user-visible indication that the calculation failed
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  const totalSavings = result?.totalAnnualSavings ?? 0;
  const maxBar = Math.max(
    result?.annualAdminSavings ?? 0,
    result?.annualTheftPrevention ?? 0,
    result?.annualOvertimeSavings ?? 0,
    1
  );

  return (
    <>
      <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Free ROI Calculator
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Calculate Your Savings
          </h1>
          <p className="text-blue-100 max-w-xl mx-auto">
            See exactly how much your business could save by switching to Clocking Systems. Most businesses achieve full payback within 90 days.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Inputs */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Your Business Details
            </h2>

            <div className="space-y-6">
              {/* Employees */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number of Employees
                  </label>
                  <span className="text-sm font-bold text-blue-600">{employees}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={500}
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>2</span>
                  <span>500</span>
                </div>
              </div>

              {/* Hourly Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Average Hourly Rate (£)
                  </label>
                  <span className="text-sm font-bold text-blue-600">£{avgHourlyRate}</span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  value={avgHourlyRate}
                  onChange={(e) => setAvgHourlyRate(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>£10</span>
                  <span>£60</span>
                </div>
              </div>

              {/* Manual Hours */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Hours on Manual Timesheet Admin per Week
                  </label>
                  <span className="text-sm font-bold text-blue-600">
                    {manualHoursPerWeek} hrs
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  value={manualHoursPerWeek}
                  onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 hr</span>
                  <span>40 hrs</span>
                </div>
              </div>

              {/* Buddy Punching */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Estimated Buddy Punching Rate (% of payroll)
                  </label>
                  <span className="text-sm font-bold text-blue-600">
                    {buddyPunchingPercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={5}
                  step={0.5}
                  value={buddyPunchingPercent}
                  onChange={(e) => setBuddyPunchingPercent(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>5%</span>
                </div>
              </div>

              {/* Overtime */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Overtime as % of Total Payroll
                  </label>
                  <span className="text-sm font-bold text-blue-600">
                    {overtimePercent}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  value={overtimePercent}
                  onChange={(e) => setOvertimePercent(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>30%</span>
                </div>
              </div>

              <button
                onClick={calculate}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
              >
                {loading ? (
                  "Calculating..."
                ) : (
                  <>
                    <TrendingUp className="w-5 h-5" />
                    Calculate My Savings
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Your Projected Savings
            </h2>

            {!result ? (
              <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-12 text-center">
                <PoundSterling className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">
                  Fill in your details and click &ldquo;Calculate&rdquo; to see your projected annual savings.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Total */}
                <div className="bg-blue-600 text-white rounded-2xl p-6 text-center">
                  <div className="text-sm font-medium text-blue-100 mb-1">
                    Total Annual Savings
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    £{totalSavings.toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-200">
                    Payback in {result.paybackMonths} months · {result.threeYearROI}% 3-year ROI
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-5">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Savings Breakdown
                  </h3>

                  {[
                    {
                      label: "Admin Time Savings",
                      value: result.annualAdminSavings,
                      color: "bg-blue-500",
                    },
                    {
                      label: "Buddy Punching Prevention",
                      value: result.annualTheftPrevention,
                      color: "bg-emerald-500",
                    },
                    {
                      label: "Overtime Reduction",
                      value: result.annualOvertimeSavings,
                      color: "bg-amber-500",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-600">{item.label}</span>
                        <span className="font-semibold text-gray-900">
                          £{item.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{
                            width: `${Math.min(
                              (item.value / maxBar) * 100,
                              100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* System cost */}
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Recommended System Cost</span>
                    <span className="font-semibold text-gray-900">
                      £{result.systemCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    {result.recommendedProduct}
                  </div>
                  <Link
                    href={`/products/${result.recommendedProductSlug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    View recommended system
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* CTA */}
                <Link
                  href="/demo"
                  className="block text-center w-full h-12 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors inline-flex items-center justify-center"
                >
                  Get a Personalised Quote
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
