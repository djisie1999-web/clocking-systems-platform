"use client";
import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, Info } from "lucide-react";

const bradfordScoreThresholds = [
  { max: 50, level: "Low", color: "bg-emerald-100 text-emerald-700 border-emerald-200", desc: "Normal absence level. No action needed." },
  { max: 200, level: "Moderate", color: "bg-amber-100 text-amber-700 border-amber-200", desc: "Worth monitoring. Consider a return-to-work interview." },
  { max: 500, level: "High", color: "bg-orange-100 text-orange-700 border-orange-200", desc: "Formal review recommended. Identify patterns." },
  { max: Infinity, level: "Critical", color: "bg-red-100 text-red-700 border-red-200", desc: "Urgent action required. Formal absence management process." },
];

function getThreshold(score: number) {
  return bradfordScoreThresholds.find((t) => score <= t.max)!;
}

export default function BradfordFactorCalculatorPage() {
  const [spells, setSpells] = useState(3);
  const [totalDays, setTotalDays] = useState(6);

  const bradfordScore = spells * spells * totalDays;
  const threshold = getThreshold(bradfordScore);

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-300 mb-4">
            <Link href="/blog" className="hover:text-white">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Bradford Factor Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Calculator className="w-4 h-4" />
            Free Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Bradford Factor Calculator
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Calculate your employees&apos; Bradford Factor score instantly. Understand absence patterns and take the right management action.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Calculator */}
          <div>
            <h2 className="text-xl font-bold text-[#0A1628] mb-6">Calculate Bradford Factor</h2>

            <div className="space-y-6 mb-8">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number of absence spells (S)
                  </label>
                  <span className="text-sm font-bold text-[#2563EB]">{spells}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={spells}
                  onChange={(e) => setSpells(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Total days absent (D)
                  </label>
                  <span className="text-sm font-bold text-[#2563EB]">{totalDays}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={totalDays}
                  onChange={(e) => setTotalDays(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1</span>
                  <span>100</span>
                </div>
              </div>
            </div>

            {/* Formula */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6">
              <div className="text-sm font-medium text-gray-500 mb-2">Bradford Factor Formula</div>
              <div className="text-lg font-mono text-[#0A1628]">
                B = S&sup2; &times; D = {spells}&sup2; &times; {totalDays} = <strong className="text-[#2563EB]">{bradfordScore}</strong>
              </div>
            </div>

            {/* Result */}
            <div className={`rounded-xl border-2 p-5 ${threshold.color}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">{bradfordScore}</span>
                <span className="text-sm font-semibold">&mdash; {threshold.level}</span>
              </div>
              <p className="text-sm">{threshold.desc}</p>
            </div>
          </div>

          {/* Explanation */}
          <div>
            <h2 className="text-xl font-bold text-[#0A1628] mb-6">What is the Bradford Factor?</h2>

            <div className="prose prose-sm text-gray-700 space-y-4">
              <p>
                The <strong>Bradford Factor</strong> (also known as the Bradford Formula) is a method used by HR departments across the UK to measure
                the impact of employee absence on the business.
              </p>

              <p>
                The key insight is that <strong>frequent short absences are more disruptive than fewer long absences</strong>.
                An employee who takes 10 individual sick days causes more operational disruption than one who is off for 10 consecutive days.
              </p>

              <h3 className="text-lg font-bold text-[#0A1628] mt-6">The Formula</h3>
              <p>
                <strong>B = S&sup2; &times; D</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>B</strong> = Bradford Factor score</li>
                <li><strong>S</strong> = Number of separate absence spells in a rolling 52-week period</li>
                <li><strong>D</strong> = Total number of days absent in the same period</li>
              </ul>

              <h3 className="text-lg font-bold text-[#0A1628] mt-6">Typical Score Thresholds</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>0&ndash;50:</strong> No concern</li>
                <li><strong>51&ndash;200:</strong> Monitor &mdash; consider return-to-work interviews</li>
                <li><strong>201&ndash;500:</strong> Review &mdash; formal absence management review</li>
                <li><strong>501+:</strong> Urgent &mdash; disciplinary or occupational health referral</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6 flex gap-2">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                <span className="text-sm text-blue-800">
                  <strong>EvoTime Pro calculates Bradford Factor scores automatically</strong> for every employee, flagging high scores so managers can act before absence becomes a problem.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-[#0A1628] mb-6">Bradford Factor Examples</h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { name: "Employee A", spells: 1, days: 10, note: "One long absence (e.g. surgery)" },
              { name: "Employee B", spells: 5, days: 5, note: "Five single-day absences" },
              { name: "Employee C", spells: 10, days: 10, note: "Ten single-day absences" },
            ].map((ex) => {
              const score = ex.spells * ex.spells * ex.days;
              const th = getThreshold(score);
              return (
                <div key={ex.name} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="font-semibold text-[#0A1628] mb-1">{ex.name}</div>
                  <div className="text-sm text-gray-500 mb-3">{ex.note}</div>
                  <div className="text-xs text-gray-400 mb-1">
                    {ex.spells} spells, {ex.days} days total
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    {ex.spells}&sup2; &times; {ex.days} = <strong className="text-[#0A1628]">{score}</strong>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${th.color}`}>
                    {th.level}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Notice how Employee C scores 1,000 (ten single days) while Employee A scores just 10 (one ten-day absence) &mdash; even though they were both absent for the same total number of days. This highlights the Bradford Factor&apos;s emphasis on frequency over duration.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-[#0A1628] text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">Automate Bradford Factor scoring</h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            EvoTime Pro calculates Bradford Factor scores automatically for every employee. Get alerts, reports, and the tools to manage absence proactively.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-white/30 text-white hover:bg-white/10 transition-colors"
            >
              See a demo
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
            >
              Buy EvoTime Pro
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
