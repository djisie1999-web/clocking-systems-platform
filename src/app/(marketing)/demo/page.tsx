"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    image: "/demo/dashboard.png",
    bullets: [
      "Real-time view of who's in, who's out, and who's on leave",
      "Attendance rate and weekly hours at a glance",
      "Late arrivals flagged automatically — no chasing managers",
      "Works on any device — desktop, tablet or phone",
    ],
  },
  {
    id: "employees",
    label: "Employees",
    image: "/demo/employees.png",
    bullets: [
      "Full employee profiles with department, contract and pay details",
      "Manage clocking methods per employee — biometric, card or fob",
      "Set individual or group working patterns and overtime rules",
      "Export payroll data directly to Sage, QuickBooks and more",
    ],
  },
  {
    id: "classifications",
    label: "Classifications",
    image: "/demo/classifications.png",
    bullets: [
      "Define pay categories: normal time, overtime, double time, etc.",
      "Set thresholds that trigger automatically based on hours worked",
      "Apply classifications across all employees or on a per-person basis",
      "Feeds directly into payroll exports — zero manual adjustment",
    ],
  },
  {
    id: "shifts",
    label: "Shifts",
    image: "/demo/shifts.png",
    bullets: [
      "Create fixed, rotating or flexible shift patterns",
      "Assign shifts to individuals, departments or sites",
      "Set early/late tolerances and break rules per shift",
      "Visual rota planner for managers to schedule with confidence",
    ],
  },
  {
    id: "absence",
    label: "Absence",
    image: "/demo/absence.png",
    bullets: [
      "Employees submit leave requests — managers approve with one click",
      "Annual leave entitlement tracked automatically",
      "Bradford Factor scoring for absence management",
      "Absence calendar shows the whole team's availability at once",
    ],
  },
];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            See EvoTime Pro in Action
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            A full walkthrough of the software — no sign-up required. This is exactly what your team will use from day one.
          </p>
        </div>
      </div>

      {/* Tab nav */}
      <div className="border-b border-gray-200 bg-white sticky top-16 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-[#2563EB] text-[#2563EB]"
                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Screenshot */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-[#0F172A]">
              <div className="bg-[#0F172A] h-8 flex items-center px-3 gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <Image
                src={current.image}
                alt={`EvoTime Pro ${current.label} screen`}
                width={800}
                height={500}
                className="w-full"
                priority
              />
            </div>
          </div>

          {/* Bullets */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-[#0A1628] mb-5">{current.label}</h2>
            <ul className="space-y-4 mb-8">
              {current.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                  <span className="text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 h-12 rounded-lg text-sm font-semibold bg-[#059669] text-white hover:bg-emerald-700 transition-colors"
              >
                Ready to buy? →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 h-12 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Got questions? Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Video placeholder */}
      <div className="bg-[#F8F9FB] border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Watch the full walkthrough</h2>
          <p className="text-gray-500 mb-8">A 5-minute video showing everything from setup to payroll export.</p>
          <div className="aspect-video bg-[#0A1628] rounded-2xl flex items-center justify-center shadow-xl">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
              <p className="text-white/60 text-sm">Video coming soon</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#0A1628] mb-3">
            Convinced? Here&apos;s what to do next.
          </h2>
          <p className="text-gray-500 mb-8">
            The website sells. The software onboards. Buy today and you&apos;ll be up and running within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
            >
              Buy Now — see pricing
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Speak to the team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
