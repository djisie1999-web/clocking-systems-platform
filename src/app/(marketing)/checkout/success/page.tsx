"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Package,
  Mail,
  Settings,
  ArrowRight,
  Download,
  LayoutDashboard,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface OnboardingStep {
  id: string;
  step: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  resources: { label: string; href: string }[];
}

const timeline = [
  {
    icon: CheckCircle,
    title: "Order Confirmed",
    description: "Your order has been received and is being processed.",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    icon: Package,
    title: "Dispatched",
    description: "Hardware will be dispatched within 1 business day via tracked courier.",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    icon: Mail,
    title: "Account Created",
    description: "Your ClockSuite account details will be emailed within 30 minutes.",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    icon: Settings,
    title: "Onboarding Call",
    description: "Our team will contact you within 24 hours to arrange your setup call.",
    color: "text-amber-600",
    bg: "bg-amber-100",
  },
];

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "CS-000000-000";
  const email = searchParams.get("email") ?? "";

  const [steps, setSteps] = useState<OnboardingStep[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/onboarding?planType=software")
      .then((r) => r.json())
      .then((data) => {
        if (data.steps) setSteps(data.steps as OnboardingStep[]);
      })
      .catch(() => {});
  }, []);

  function toggleStep(id: string) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const progress = steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Success header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Order Confirmed!
        </h1>
        <p className="text-gray-500 text-lg mb-1">
          Order number: <strong className="text-gray-900">{orderNumber}</strong>
        </p>
        {email && (
          <p className="text-sm text-gray-400">
            Confirmation sent to <strong>{email}</strong>
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* What happens next */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            What happens next
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div
                  className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}
                >
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Get Started Now
          </h2>
          <div className="space-y-3">
            {[
              { label: "Quick Start Guide (PDF)", icon: Download, href: "/docs/quick-start.pdf" },
              { label: "Employee Enrollment Template", icon: Download, href: "/docs/enroll-template.csv" },
              { label: "IT Network Requirements", icon: Download, href: "/docs/network-requirements.pdf" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm hover:border-blue-300 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors flex-1">
                  {item.label}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
              </a>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              <LayoutDashboard className="w-5 h-5" />
              Access Your Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Onboarding checklist */}
      {steps.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-gray-900">
                Onboarding Checklist
              </h2>
              <span className="text-sm text-gray-500">
                {completedSteps.size}/{steps.length} complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="divide-y divide-gray-100">
            {steps.map((step) => {
              const done = completedSteps.has(step.id);
              return (
                <div
                  key={step.id}
                  className={`px-6 py-4 transition-colors ${done ? "bg-emerald-50/40" : "bg-white"}`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => toggleStep(step.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        done
                          ? "bg-emerald-500 border-emerald-500"
                          : "border-gray-300 hover:border-blue-400"
                      }`}
                    >
                      {done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <h3
                          className={`text-sm font-semibold ${
                            done ? "text-emerald-700 line-through" : "text-gray-900"
                          }`}
                        >
                          Step {step.step}: {step.title}
                        </h3>
                        <span className="text-xs text-gray-400 shrink-0">
                          ~{step.estimatedMinutes} min
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                      {step.resources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {step.resources.map((r) => (
                            <a
                              key={r.href}
                              href={r.href}
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              {r.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {progress === 100 && (
            <div className="px-6 py-5 bg-emerald-50 border-t border-emerald-100 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-semibold text-emerald-700">
                Onboarding complete! You&apos;re all set.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12 text-center text-gray-500">Loading order details...</div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
