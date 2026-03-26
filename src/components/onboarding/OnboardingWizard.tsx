"use client";

import { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  X,
  ArrowRight,
  Settings,
  Users,
  Monitor,
  BarChart2,
  Sparkles,
  Shield,
  Bell,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "cs_onboarding_v1";

const STEPS = [
  { id: "welcome", label: "Welcome" },
  { id: "settings", label: "Settings" },
  { id: "team", label: "Team" },
  { id: "feature", label: "Key Feature" },
  { id: "done", label: "Done" },
] as const;

// ─── Individual step panels ───────────────────────────────────────────────────

function WelcomeStep({ firstName }: { firstName: string }) {
  return (
    <div>
      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
        <Sparkles className="w-7 h-7 text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Welcome, {firstName}! 👋
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        You're now on the <strong>CS Platform</strong> — the UK's leading time
        &amp; attendance system. This quick setup takes under 3 minutes.
      </p>

      <div className="space-y-2.5">
        {[
          {
            icon: Settings,
            color: "bg-blue-50 text-blue-600",
            label: "Configure your account settings",
          },
          {
            icon: Users,
            color: "bg-emerald-50 text-emerald-600",
            label: "Invite your team members",
          },
          {
            icon: Monitor,
            color: "bg-purple-50 text-purple-600",
            label: "Add your clocking terminals",
          },
          {
            icon: BarChart2,
            color: "bg-amber-50 text-amber-600",
            label: "Track attendance in real time",
          },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}
            >
              <item.icon className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-700">{item.label}</span>
            <CheckCircle className="w-4 h-4 text-gray-200 ml-auto shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsStep() {
  return (
    <div>
      <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-5">
        <Settings className="w-7 h-7 text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Configure Your Settings
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Complete your profile and set your preferences to get the most out of CS
        Platform.
      </p>

      <div className="space-y-3 mb-5">
        {[
          {
            icon: Shield,
            color: "bg-blue-50 text-blue-600",
            title: "Update your profile",
            desc: "Set your display name and email address",
          },
          {
            icon: Bell,
            color: "bg-amber-50 text-amber-600",
            title: "Configure notifications",
            desc: "Get alerts for late clock-ins and device issues",
          },
          {
            icon: Clock,
            color: "bg-purple-50 text-purple-600",
            title: "Set your timezone & date format",
            desc: "Defaults to Europe/London (DD/MM/YYYY)",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}
            >
              <item.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/settings"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
      >
        Open Settings
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}

function TeamStep() {
  return (
    <div>
      <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mb-5">
        <Users className="w-7 h-7 text-emerald-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Invite Your Team</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Add managers and administrators so your team can access the platform and
        monitor attendance.
      </p>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5">
        <p className="text-sm font-semibold text-emerald-800 mb-1.5">
          Two roles available:
        </p>
        <div className="space-y-1.5">
          <div className="flex items-start gap-2 text-sm text-emerald-700">
            <Shield className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>
              <strong>Administrator</strong> — full access to all features,
              users, and settings
            </span>
          </div>
          <div className="flex items-start gap-2 text-sm text-emerald-700">
            <Users className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
            <span>
              <strong>Standard User</strong> — can view attendance, reports, and
              their own profile
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/team"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow transition-colors"
        >
          <Users className="w-4 h-4" />
          Manage Team
        </Link>
        <span className="text-xs text-gray-400">
          You can always do this later
        </span>
      </div>
    </div>
  );
}

function FeatureStep() {
  return (
    <div>
      <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-5">
        <Monitor className="w-7 h-7 text-purple-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Try the Key Feature
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">
        Connect your first clocking terminal to start tracking employee
        attendance in real time.
      </p>

      <div className="grid gap-3 mb-5">
        <Link
          href="/dashboard/devices"
          className="flex items-center gap-3 p-4 rounded-xl border-2 border-purple-200 bg-purple-50 hover:border-purple-400 hover:bg-purple-100 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shrink-0">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              Add a Clocking Terminal
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Connect your first biometric or RFID device
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
        </Link>

        <Link
          href="/dashboard/employees"
          className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 bg-gray-50 hover:border-blue-200 hover:bg-blue-50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              View Employee Attendance
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              See who's in, late, or absent right now
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
        </Link>

        <Link
          href="/dashboard/reports"
          className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-100 bg-gray-50 hover:border-emerald-200 hover:bg-emerald-50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0">
            <BarChart2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">
              Explore Reports
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Weekly charts, department breakdowns, CSV exports
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-400 transition-colors" />
        </Link>
      </div>
    </div>
  );
}

function DoneStep() {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="w-8 h-8 text-emerald-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        You&apos;re All Set! 🎉
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        CS Platform is ready. Here are some things to explore next.
      </p>

      <div className="grid grid-cols-2 gap-3 text-left mb-2">
        {[
          {
            icon: Monitor,
            color: "bg-purple-50 text-purple-600",
            label: "Add devices",
            href: "/dashboard/devices",
          },
          {
            icon: Users,
            color: "bg-blue-50 text-blue-600",
            label: "Manage employees",
            href: "/dashboard/employees",
          },
          {
            icon: BarChart2,
            color: "bg-emerald-50 text-emerald-600",
            label: "View reports",
            href: "/dashboard/reports",
          },
          {
            icon: CreditCard,
            color: "bg-amber-50 text-amber-600",
            label: "Billing & plan",
            href: "/dashboard/billing",
          },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}
            >
              <item.icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-gray-700">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Need help? Visit the{" "}
        <Link href="/help" className="text-blue-500 hover:underline">
          Help Centre
        </Link>{" "}
        at any time.
      </p>
    </div>
  );
}

// ─── Main Wizard ──────────────────────────────────────────────────────────────

interface OnboardingWizardProps {
  userName: string;
}

export function OnboardingWizard({ userName }: OnboardingWizardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(0);

  // Read localStorage after hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setIsVisible(true);
      }
    } catch {
      // localStorage not available (SSR edge case)
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true }));
    } catch {}
    setIsVisible(false);
  }

  function complete() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: true }));
    } catch {}
    setIsVisible(false);
  }

  function next() {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  }

  function back() {
    if (step > 0) setStep((s) => s - 1);
  }

  if (!isVisible) return null;

  const firstName = userName.split(" ")[0];
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* ── Coloured header ───────────────────────────── */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm">CS Platform Setup</span>
            </div>
            <button
              onClick={dismiss}
              aria-label="Close setup wizard"
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Step progress bar */}
          <div className="flex gap-1.5 mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all duration-300",
                  i < step
                    ? "bg-white"
                    : i === step
                    ? "bg-white/80"
                    : "bg-white/25"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-blue-100">
            Step {step + 1} of {STEPS.length} — {STEPS[step].label}
          </p>
        </div>

        {/* ── Step content ──────────────────────────────── */}
        <div className="px-6 pt-6 pb-2 min-h-[280px]">
          {step === 0 && <WelcomeStep firstName={firstName} />}
          {step === 1 && <SettingsStep />}
          {step === 2 && <TeamStep />}
          {step === 3 && <FeatureStep />}
          {step === 4 && <DoneStep />}
        </div>

        {/* ── Navigation footer ─────────────────────────── */}
        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={step === 0 ? dismiss : back}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            {step === 0 ? "Skip setup" : "← Back"}
          </button>

          {isLast ? (
            <button
              onClick={complete}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={next}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding Banner ────────────────────────────────────────────────────────
// A compact "restart setup" banner shown at the top of the dashboard
// for users who dismissed (but didn't complete) the wizard.

export function OnboardingBanner() {
  const [show, setShow] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Still first time — wizard handles it
        return;
      }
      const parsed = JSON.parse(stored) as {
        dismissed?: boolean;
        completed?: boolean;
      };
      if (parsed.dismissed && !parsed.completed) {
        setShow(true);
      }
    } catch {}
  }, []);

  function openWizard() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setWizardOpen(true);
    setShow(false);
  }

  function dismissBanner() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ dismissed: true, bannerDismissed: true })
      );
    } catch {}
    setShow(false);
  }

  if (!show && !wizardOpen) return null;

  return (
    <>
      {show && (
        <div className="mx-6 mt-6 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-900">
              Finish setting up CS Platform
            </p>
            <p className="text-xs text-blue-700 mt-0.5">
              Complete the setup wizard to get the most out of your trial.
            </p>
          </div>
          <button
            onClick={openWizard}
            className="shrink-0 text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Resume Setup
          </button>
          <button
            onClick={dismissBanner}
            className="shrink-0 w-6 h-6 rounded-full text-blue-400 hover:text-blue-700 hover:bg-blue-100 flex items-center justify-center transition-colors"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {wizardOpen && (
        <OnboardingWizardStandalone onClose={() => setWizardOpen(false)} />
      )}
    </>
  );
}

// Standalone version (triggered from banner) — same wizard but closes back to dashboard
function OnboardingWizardStandalone({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ dismissed: true }));
    } catch {}
    onClose();
  }

  function complete() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: true }));
    } catch {}
    onClose();
  }

  const firstName = "there";
  const isLast = step === STEPS.length - 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-sm">CS Platform Setup</span>
            </div>
            <button
              onClick={dismiss}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex gap-1.5 mb-2">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className={cn(
                  "flex-1 h-1 rounded-full transition-all",
                  i < step ? "bg-white" : i === step ? "bg-white/80" : "bg-white/25"
                )}
              />
            ))}
          </div>
          <p className="text-xs text-blue-100">
            Step {step + 1} of {STEPS.length} — {STEPS[step].label}
          </p>
        </div>

        <div className="px-6 pt-6 pb-2 min-h-[280px]">
          {step === 0 && <WelcomeStep firstName={firstName} />}
          {step === 1 && <SettingsStep />}
          {step === 2 && <TeamStep />}
          {step === 3 && <FeatureStep />}
          {step === 4 && <DoneStep />}
        </div>

        <div className="px-6 pb-6 flex items-center justify-between">
          <button
            onClick={step === 0 ? dismiss : () => setStep((s) => s - 1)}
            className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
          >
            {step === 0 ? "Skip setup" : "← Back"}
          </button>
          {isLast ? (
            <button
              onClick={complete}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Go to Dashboard
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
