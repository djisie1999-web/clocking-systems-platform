import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies — Clocking Systems UK",
  description:
    "See how UK businesses cut payroll admin and gained visibility over their teams using Clocking Systems time and attendance solutions.",
  openGraph: {
    title: "Customer Case Studies — Clocking Systems",
    description: "Real results from real UK businesses.",
    type: "website",
  },
};

const caseStudies = [
  {
    company: "Hirex Ltd",
    industry: "Manufacturing",
    employees: "25 employees",
    image: "/images/case-studies/hirex.png",
    color: "from-emerald-600 to-emerald-700",
    badgeColor: "bg-emerald-100 text-emerald-700",
    headline: "Eliminated manual timesheet calculations entirely",
    challenge:
      "Hirex Ltd, a precision engineering firm based in West Yorkshire, were running a growing team of 25 on manual paper timesheets. Payroll took a full day every fortnight, overtime was often miscalculated, and there was no reliable audit trail when disputes arose.",
    solution:
      "In 2017, Hirex installed EvoTime terminals at both their site entrances. The system was configured to match their shift patterns and overtime thresholds. Within a week, every employee was clocking in and out automatically.",
    results: [
      "Payroll processing time cut from one full day to 45 minutes",
      "Zero timesheet disputes since installation",
      "Overtime accurately captured and reported every period",
      "Full audit trail available for any investigation",
    ],
    quote:
      "We didn't realise how much time we were wasting on timesheets until we stopped doing them. The system just works.",
    quotePerson: "Operations Manager, Hirex Ltd",
  },
  {
    company: "WH Smith",
    industry: "Retail",
    employees: "Multiple sites",
    image: "/images/case-studies/wh-smith.png",
    color: "from-blue-600 to-blue-700",
    badgeColor: "bg-blue-100 text-blue-700",
    headline: "Replaced a legacy system with zero downtime",
    challenge:
      "WH Smith needed to replace an ageing time and attendance system that was becoming unreliable, unsupported, and increasingly difficult to integrate with modern payroll software. Staff were familiar with the existing workflow and any disruption had to be minimised.",
    solution:
      "Clocking Systems managed the migration from the legacy system, running both in parallel during transition. New terminals were installed overnight at each location, with historical data imported and verified before the old system was switched off.",
    results: [
      "Complete migration with zero working-hours downtime",
      "Staff adoption was immediate — no retraining needed",
      "Integration with payroll software completed in the same week",
      "Reporting capability significantly improved over previous system",
    ],
    quote:
      "The migration was seamless. Staff came in on Monday and just used the new terminals without any issues.",
    quotePerson: "HR Manager, WH Smith",
  },
  {
    company: "Industrious People",
    industry: "Recruitment",
    employees: "Temp workforce across sites",
    image: "/images/case-studies/industrious-people.png",
    color: "from-purple-600 to-purple-700",
    badgeColor: "bg-purple-100 text-purple-700",
    headline: "Gained full visibility over a flexible temporary workforce",
    challenge:
      "As a recruitment agency supplying temporary workers to multiple client sites, Industrious People needed real-time visibility of who was on site, when they arrived, and how many hours each worker had accumulated across assignments. Their existing spreadsheet approach was error-prone and always behind.",
    solution:
      "Clocking Systems deployed terminals at each client site and configured the EvoTime software to track workers across locations. A central dashboard gave the agency real-time visibility, and automated reports were sent to clients and internal payroll each week.",
    results: [
      "Real-time visibility of all workers across all sites from one dashboard",
      "Weekly payroll reports generated automatically — no manual collation",
      "Client invoicing accuracy improved to 100%",
      "Onboarding new client sites reduced from weeks to 2 days",
    ],
    quote:
      "We can now tell any client exactly how many hours their team worked this week, right now. That was impossible before.",
    quotePerson: "Director, Industrious People",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Customer Case Studies</h1>
          <p className="text-blue-200 text-lg max-w-2xl">
            Real results from UK businesses that switched to Clocking Systems. No made-up metrics — these are actual outcomes reported by our customers.
          </p>
        </div>
      </div>

      {/* Case studies */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        {caseStudies.map((cs, idx) => (
          <article
            key={cs.company}
            className={`grid lg:grid-cols-2 gap-10 items-start ${idx % 2 === 1 ? "lg:grid-flow-col" : ""}`}
          >
            {/* Image */}
            <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={cs.image}
                  alt={`${cs.company} facility`}
                  width={600}
                  height={300}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold rounded-full px-3 py-1 ${cs.badgeColor}`}>
                  {cs.industry}
                </span>
                <span className="text-xs text-gray-400">{cs.employees}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0A1628] mb-3">{cs.company}</h2>
              <p className="text-xl font-semibold text-gray-700 mb-4">{cs.headline}</p>

              <div className="space-y-4 mb-5 text-sm text-gray-600">
                <div>
                  <span className="font-semibold text-[#0A1628]">The challenge: </span>
                  {cs.challenge}
                </div>
                <div>
                  <span className="font-semibold text-[#0A1628]">The solution: </span>
                  {cs.solution}
                </div>
              </div>

              <div className="bg-[#F8F9FB] rounded-xl p-5 mb-5">
                <div className="font-semibold text-sm text-[#0A1628] mb-3">Results</div>
                <ul className="space-y-2">
                  {cs.results.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <blockquote className="border-l-4 border-[#2563EB] pl-4 text-gray-600 italic text-sm mb-1">
                &ldquo;{cs.quote}&rdquo;
              </blockquote>
              <p className="text-xs text-gray-400 pl-4">{cs.quotePerson}</p>
            </div>
          </article>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#0A1628] py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to write your own case study?
          </h2>
          <p className="text-blue-200 mb-8">
            Join 50,000+ UK businesses using Clocking Systems. Buy today — set up in under 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-white text-[#0A1628] hover:bg-blue-50 shadow transition-colors"
            >
              Buy now — see pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
            >
              See a demo first
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
