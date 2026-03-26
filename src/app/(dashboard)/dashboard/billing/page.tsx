"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CreditCard,
  CheckCircle,
  Zap,
  AlertTriangle,
  ArrowRight,
  Users,
  RefreshCw,
  Star,
  Building2,
  Shield,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Plan, SubscriptionStatus } from "@prisma/client";
import {
  PLAN_LABELS,
  STATUS_LABELS,
  STATUS_COLORS,
  getTrialDaysRemaining,
  isTrialExpired,
  getUnitPrice,
  getAnnualTotal,
} from "@/lib/stripe";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SubscriptionRecord {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  userCount: number;
  trialEndsAt: string | null; // ISO string from JSON
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

// ─── Helper: format date ──────────────────────────────────────────────────────

function fmt(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function fmtGBP(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

// ─── Billing Page ─────────────────────────────────────────────────────────────

export default function BillingPage() {
  const [sub, setSub] = useState<SubscriptionRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [userCount, setUserCount] = useState(5);
  const [showUserPicker, setShowUserPicker] = useState(false);

  // ── Fetch subscription ──────────────────────────────────────────────────────

  const fetchSub = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/billing/subscription");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load subscription");
      setSub(data.subscription as SubscriptionRecord);
      setUserCount(data.subscription?.userCount ?? 5);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSub();

    // Show success/cancel toast from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "1") {
      window.history.replaceState({}, "", "/dashboard/billing");
    }
    if (params.get("canceled") === "1") {
      window.history.replaceState({}, "", "/dashboard/billing");
    }
  }, [fetchSub]);

  // ── Checkout ────────────────────────────────────────────────────────────────

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userCount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCheckoutLoading(false);
    }
  }

  // ── Portal ──────────────────────────────────────────────────────────────────

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Portal failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setPortalLoading(false);
    }
  }

  // ── Derived state ───────────────────────────────────────────────────────────

  const trialEndsAtDate = sub?.trialEndsAt ? new Date(sub.trialEndsAt) : null;
  const trialDays = sub
    ? getTrialDaysRemaining(trialEndsAtDate, sub.status)
    : 0;
  const trialExpired = sub
    ? isTrialExpired(trialEndsAtDate, sub.status)
    : false;

  const isPro =
    sub?.status === SubscriptionStatus.ACTIVE ||
    sub?.status === SubscriptionStatus.TRIALING;
  const isActive = sub?.status === SubscriptionStatus.ACTIVE;
  const hasStripeSubscription = Boolean(sub?.stripeSubscriptionId);

  const estimatedAnnual = getAnnualTotal(userCount);
  const estimatedPerUser = getUnitPrice(userCount);

  // ── Loading ─────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="h-4 bg-gray-200 rounded w-64" />
          <div className="h-40 bg-gray-200 rounded-xl" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Plans</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your subscription, plan, and payment details.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-400 hover:text-red-600 text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* ── Current Plan Card ─────────────────────────────────────────────── */}
      {sub && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  Current Plan
                </h2>
                <p className="text-xs text-gray-500">
                  {PLAN_LABELS[sub.plan]}
                </p>
              </div>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[sub.status]}`}
            >
              {STATUS_LABELS[sub.status]}
            </span>
          </div>

          <div className="px-6 py-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Trial countdown */}
            {sub.status === SubscriptionStatus.TRIALING && !trialExpired && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Trial ends</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-blue-600">
                    {trialDays}
                  </span>
                  <span className="text-sm text-gray-600">
                    day{trialDays !== 1 ? "s" : ""} remaining
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Expires {fmt(sub.trialEndsAt)}
                </p>
              </div>
            )}

            {/* Trial expired */}
            {trialExpired && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Trial status</p>
                <div className="flex items-center gap-1.5 text-amber-600">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Expired</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Ended {fmt(sub.trialEndsAt)}
                </p>
              </div>
            )}

            {/* Active subscription */}
            {isActive && sub.currentPeriodEnd && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Next renewal</p>
                <p className="text-sm font-semibold text-gray-900">
                  {fmt(sub.currentPeriodEnd)}
                </p>
                {sub.cancelAtPeriodEnd && (
                  <p className="text-xs text-amber-600 mt-0.5">
                    Cancels at period end
                  </p>
                )}
              </div>
            )}

            {/* User count */}
            {isPro && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Licensed users</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-gray-900">
                    {sub.userCount}
                  </span>
                  <span className="text-sm text-gray-500">
                    user{sub.userCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {fmtGBP(getUnitPrice(sub.userCount))}/user/year
                </p>
              </div>
            )}

            {/* Annual cost */}
            {isActive && (
              <div>
                <p className="text-xs text-gray-500 mb-1">Annual total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {fmtGBP(getAnnualTotal(sub.userCount))}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">per year</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
            {/* Manage subscription via portal */}
            {hasStripeSubscription && (
              <button
                onClick={handlePortal}
                disabled={portalLoading}
                className="inline-flex items-center gap-1.5 text-sm font-medium bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                {portalLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                Manage subscription
              </button>
            )}

            {/* Upgrade CTA when trialing / expired */}
            {(sub.status === SubscriptionStatus.TRIALING ||
              sub.status === SubscriptionStatus.CANCELED ||
              sub.status === SubscriptionStatus.INACTIVE) && (
              <button
                onClick={() => setShowUserPicker((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Zap className="w-4 h-4" />
                Upgrade to EvoTime Pro
                {showUserPicker ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </button>
            )}
          </div>

          {/* Inline upgrade form */}
          {showUserPicker && (
            <div className="px-6 py-5 border-t border-dashed border-gray-200 bg-blue-50">
              <p className="text-sm font-semibold text-gray-700 mb-3">
                How many users do you need?
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="userCount"
                    className="text-sm text-gray-600 shrink-0"
                  >
                    Users:
                  </label>
                  <input
                    id="userCount"
                    type="number"
                    min={1}
                    max={9999}
                    value={userCount}
                    onChange={(e) =>
                      setUserCount(Math.max(1, Number(e.target.value) || 1))
                    }
                    className="w-24 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>
                    {fmtGBP(estimatedPerUser)}/user/year ={" "}
                    <strong className="text-gray-900">
                      {fmtGBP(estimatedAnnual)}/year
                    </strong>
                  </span>
                  {userCount >= 71 && (
                    <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                      Volume discount
                    </span>
                  )}
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                >
                  {checkoutLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  Proceed to checkout
                </button>
              </div>

              {sub.status === SubscriptionStatus.TRIALING && !trialExpired && (
                <p className="text-xs text-blue-600 mt-2">
                  Your remaining {trialDays} trial day{trialDays !== 1 ? "s" : ""}{" "}
                  will be carried over — you won&apos;t be charged until your
                  trial ends.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Plans Comparison ──────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">All Plans</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Choose the plan that fits your business.
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {/* ── EvoTime (Hardware + Free Cloud) ──────────────────────────────── */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  EvoTime
                </h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                  Hardware + Free Cloud
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Physical terminal purchase with free basic cloud software
                included. Perfect for businesses wanting reliable on-site
                clocking.
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                {[
                  "EvoTime terminal hardware",
                  "Free basic cloud software",
                  "Up to 3 devices",
                  "Standard support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-gray-900">From £275</p>
              <p className="text-xs text-gray-400">one-off terminal</p>
              <p className="text-xs text-emerald-600 font-medium mt-0.5">
                + free cloud
              </p>
              <Link
                href="/products"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline"
              >
                Shop terminals
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* ── EvoTime Pro ──────────────────────────────────────────────────── */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4 bg-blue-50/40 border-l-2 border-blue-500">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  EvoTime Pro
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                  Cloud SaaS
                </span>
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
                  Most popular
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Full-featured cloud platform for growing teams. Scales with
                your workforce.
              </p>
              <ul className="space-y-1 text-xs text-gray-600 mb-3">
                {[
                  "Everything in EvoTime Free",
                  "Advanced reporting & analytics",
                  "Unlimited devices",
                  "Role-based access control",
                  "Priority support",
                  "14-day free trial included",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {/* Volume tiers */}
              <div className="flex flex-wrap gap-3 text-xs">
                <div className="bg-white border border-gray-200 rounded-lg px-3 py-2">
                  <p className="font-semibold text-gray-900">1–70 users</p>
                  <p className="text-gray-500">£15 / user / year</p>
                </div>
                <div className="bg-white border border-emerald-200 rounded-lg px-3 py-2">
                  <p className="font-semibold text-gray-900">71+ users</p>
                  <p className="text-emerald-600 font-medium">
                    £10 / user / year
                  </p>
                  <p className="text-xs text-emerald-500">Volume discount</p>
                </div>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-gray-900">£15</p>
              <p className="text-xs text-gray-400">/ user / year</p>
              <p className="text-xs text-gray-400 mt-0.5">
                billed annually
              </p>
              {sub?.status !== SubscriptionStatus.ACTIVE && (
                <button
                  onClick={() => {
                    setShowUserPicker(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get started
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
              {sub?.status === SubscriptionStatus.ACTIVE &&
                sub.plan === Plan.EVOTIMEPRO && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    <CheckCircle className="w-3 h-3" />
                    Current plan
                  </span>
                )}
            </div>
          </div>

          {/* ── Enterprise ───────────────────────────────────────────────────── */}
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                  Enterprise
                </h3>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                  Custom quote
                </span>
              </div>
              <p className="text-xs text-gray-500 mb-3">
                Tailored solutions for large organisations. Custom integrations,
                dedicated support, and flexible contracts.
              </p>
              <ul className="space-y-1 text-xs text-gray-600">
                {[
                  "Everything in EvoTime Pro",
                  "Custom integrations (HR, payroll)",
                  "Dedicated account manager",
                  "SLA-backed support",
                  "On-premise deployment option",
                  "Custom contracts & invoicing",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Star className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-lg font-bold text-gray-900">Custom</p>
              <p className="text-xs text-gray-400">tailored pricing</p>
              <a
                href="mailto:sales@clockingsystems.co.uk"
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-purple-600 hover:underline"
              >
                Contact sales
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FAQ / Info ────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Billing FAQ
        </h2>
        <div className="space-y-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-800 mb-1">
              How does the free trial work?
            </p>
            <p>
              All new accounts include a 14-day free trial of EvoTime Pro. No
              credit card is required to start. You can upgrade at any time and
              your remaining trial days carry over to your paid subscription.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-1">
              How is per-user pricing calculated?
            </p>
            <p>
              You choose the number of licensed users at checkout. For 1–70
              users, the rate is £15/user/year. For 71 or more users, a volume
              discount applies at £10/user/year. You can adjust your seat count
              any time through the Stripe billing portal.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-1">
              Can I cancel at any time?
            </p>
            <p>
              Yes. Cancel through the{" "}
              <button
                onClick={handlePortal}
                disabled={!hasStripeSubscription || portalLoading}
                className="text-blue-600 hover:underline disabled:opacity-40"
              >
                billing portal
              </button>{" "}
              and your subscription will remain active until the end of your
              current billing period.
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-1">
              What payment methods are accepted?
            </p>
            <p>
              All major credit and debit cards are accepted via Stripe. Bank
              transfers and invoicing are available on Enterprise plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
