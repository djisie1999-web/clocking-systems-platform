import Stripe from "stripe";
import { db } from "./db";
import { Plan, SubscriptionStatus } from "@prisma/client";

// ─── Stripe Client ────────────────────────────────────────────────────────────

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-03-25.dahlia" as Stripe.LatestApiVersion,
  typescript: true,
});

// ─── Constants ────────────────────────────────────────────────────────────────

export const TRIAL_DAYS = 14;

/** Per-user annual price for 1–70 users (£15/user/year) */
export const PRICE_EVOTIMEPRO_STANDARD =
  process.env.STRIPE_PRICE_EVOTIMEPRO_STANDARD ?? "";

/** Per-user annual price for 71+ users  (£10/user/year) */
export const PRICE_EVOTIMEPRO_VOLUME =
  process.env.STRIPE_PRICE_EVOTIMEPRO_VOLUME ?? "";

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// ─── Plan helpers ─────────────────────────────────────────────────────────────

/** Returns the correct Stripe price ID based on user count. */
export function getPriceIdForUserCount(userCount: number): string {
  return userCount >= 71 ? PRICE_EVOTIMEPRO_VOLUME : PRICE_EVOTIMEPRO_STANDARD;
}

/** Returns the per-user annual rate (in pence) for a given user count. */
export function getUnitPrice(userCount: number): number {
  return userCount >= 71 ? 1000 : 1500; // £10 or £15 in pence
}

/** Returns the total annual amount (in pence) for a given user count. */
export function getAnnualTotal(userCount: number): number {
  return getUnitPrice(userCount) * userCount;
}

// ─── Subscription Helpers ─────────────────────────────────────────────────────

/**
 * Retrieves the subscription for a user, creating a default TRIALING record
 * if one does not yet exist. Safe to call from any server context.
 */
export async function getOrCreateSubscription(userId: string) {
  const existing = await db.subscription.findUnique({
    where: { userId },
  });

  if (existing) return existing;

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

  return db.subscription.create({
    data: {
      userId,
      plan: Plan.EVOTIMEPRO,
      status: SubscriptionStatus.TRIALING,
      trialEndsAt,
    },
  });
}

/**
 * Returns the number of days remaining in the trial (0 if expired or not on trial).
 */
export function getTrialDaysRemaining(
  trialEndsAt: Date | null,
  status: SubscriptionStatus
): number {
  if (status !== SubscriptionStatus.TRIALING || !trialEndsAt) return 0;
  const now = Date.now();
  const end = trialEndsAt.getTime();
  if (end <= now) return 0;
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}

/**
 * Returns whether the trial has expired (status = TRIALING and trialEndsAt is in the past).
 */
export function isTrialExpired(
  trialEndsAt: Date | null,
  status: SubscriptionStatus
): boolean {
  if (status !== SubscriptionStatus.TRIALING || !trialEndsAt) return false;
  return trialEndsAt.getTime() <= Date.now();
}

// ─── Plan display helpers ─────────────────────────────────────────────────────

export const PLAN_LABELS: Record<Plan, string> = {
  FREE: "EvoTime Free",
  EVOTIMEPRO: "EvoTime Pro",
  ENTERPRISE: "Enterprise",
};

export const STATUS_LABELS: Record<SubscriptionStatus, string> = {
  TRIALING: "Free Trial",
  ACTIVE: "Active",
  PAST_DUE: "Payment Due",
  CANCELED: "Canceled",
  INACTIVE: "Inactive",
};

export const STATUS_COLORS: Record<SubscriptionStatus, string> = {
  TRIALING: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-emerald-100 text-emerald-700",
  PAST_DUE: "bg-amber-100 text-amber-700",
  CANCELED: "bg-red-100 text-red-700",
  INACTIVE: "bg-gray-100 text-gray-600",
};
