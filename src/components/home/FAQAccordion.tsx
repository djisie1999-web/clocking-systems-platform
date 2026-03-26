"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How long does it take to set up a time and attendance system?",
    answer:
      "Most installations are completed in under 2 hours. RFID terminals take around 15 minutes to mount and connect; biometric terminals add an additional 30–60 minutes for employee enrollment. Our cloud software is ready to use the same day your account is created, and our onboarding guide walks you through every step.",
  },
  {
    question: "Will it work if my internet connection goes down?",
    answer:
      "Yes. All ClockSuite-compatible terminals operate offline and store clock-in events locally. When your internet connection is restored, they automatically sync all stored events to the cloud dashboard. You won't lose any data.",
  },
  {
    question: "Can employees clock in from their mobile phone?",
    answer:
      "Yes, with ClockSuite Professional and Enterprise. Employees can clock in and out via the mobile app, with optional GPS verification to confirm they're at the correct location. This is ideal for remote workers, field teams, and multi-site businesses.",
  },
  {
    question: "Does the system integrate with our payroll software?",
    answer:
      "ClockSuite Professional and Enterprise integrate directly with Xero, Sage, QuickBooks, and BrightPay. ClockSuite Basic exports payroll-ready CSV files compatible with all major UK payroll software. Setup takes under 5 minutes.",
  },
  {
    question: "Is biometric data stored securely and GDPR compliant?",
    answer:
      "Absolutely. We store mathematical fingerprint templates — not images — encrypted at rest using AES-256. All data is held on UK servers in ISO 27001-certified data centres. Our Data Processing Agreement (DPA) supports your GDPR obligations, and employees can request deletion of their biometric data at any time.",
  },
];

export function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden bg-white"
        >
          <button
            className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{faq.question}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-400 shrink-0 ml-4 transition-transform duration-200",
                open === i && "rotate-180"
              )}
            />
          </button>
          {open === i && (
            <div className="px-6 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
              <div className="pt-3">{faq.answer}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
