import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { Plan, SubscriptionStatus } from "@prisma/client";

/**
 * POST /api/webhooks/stripe
 * Handles all Stripe webhook events. Must be a PUBLIC route (no auth cookie).
 *
 * Key events handled:
 *  - checkout.session.completed       → store stripeCustomerId + subscriptionId
 *  - customer.subscription.created    → sync subscription record
 *  - customer.subscription.updated    → sync status changes, renewals, cancellations
 *  - customer.subscription.deleted    → mark as CANCELED
 *  - invoice.payment_failed           → mark as PAST_DUE
 *  - invoice.payment_succeeded        → ensure status is ACTIVE
 *
 * NOTE: Stripe API 2026-03-25.dahlia moved current_period_start/end from the
 * top-level Subscription to SubscriptionItem, and invoice.subscription is now
 * nested under invoice.parent.subscription_details.subscription.
 */
export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[webhook/stripe] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const error = err as Error;
    console.error(
      "[webhook/stripe] Signature verification failed:",
      error.message
    );
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${error.message}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      // ── Checkout completed ─────────────────────────────────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode !== "subscription") break;

        const userId = session.metadata?.userId;
        const userCount = Number(session.metadata?.userCount ?? 1);
        const stripeCustomerId =
          typeof session.customer === "string"
            ? session.customer
            : (session.customer as Stripe.Customer | null)?.id ?? null;
        const stripeSubscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : (session.subscription as Stripe.Subscription | null)?.id ?? null;

        if (!userId || !stripeSubscriptionId) {
          console.error(
            "[webhook/stripe] Missing userId or subscriptionId in session metadata"
          );
          break;
        }

        // Fetch the full subscription from Stripe
        const stripeSub = await stripe.subscriptions.retrieve(
          stripeSubscriptionId
        );
        const item = stripeSub.items.data[0];

        await upsertSubscription(userId, {
          stripeCustomerId,
          stripeSubscriptionId,
          stripePriceId: item?.price.id ?? null,
          userCount,
          status: mapStripeStatus(stripeSub.status),
          trialEndsAt: stripeSub.trial_end
            ? new Date(stripeSub.trial_end * 1000)
            : null,
          // current_period_* moved to SubscriptionItem in 2026-03-25.dahlia
          currentPeriodStart: item?.current_period_start
            ? new Date(item.current_period_start * 1000)
            : null,
          currentPeriodEnd: item?.current_period_end
            ? new Date(item.current_period_end * 1000)
            : null,
          cancelAtPeriodEnd: stripeSub.cancel_at_period_end,
        });

        break;
      }

      // ── Subscription created / updated ─────────────────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId;
        const item = sub.items.data[0];

        if (!userId) {
          await syncByCustomer(sub);
          break;
        }

        await upsertSubscription(userId, {
          stripeCustomerId:
            typeof sub.customer === "string"
              ? sub.customer
              : (sub.customer as Stripe.Customer).id,
          stripeSubscriptionId: sub.id,
          stripePriceId: item?.price.id ?? null,
          userCount: item?.quantity ?? 1,
          status: mapStripeStatus(sub.status),
          trialEndsAt: sub.trial_end
            ? new Date(sub.trial_end * 1000)
            : null,
          currentPeriodStart: item?.current_period_start
            ? new Date(item.current_period_start * 1000)
            : null,
          currentPeriodEnd: item?.current_period_end
            ? new Date(item.current_period_end * 1000)
            : null,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        });

        break;
      }

      // ── Subscription deleted ───────────────────────────────────────────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        await db.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: SubscriptionStatus.CANCELED },
        });

        break;
      }

      // ── Invoice payment failed ─────────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        // In Stripe API 2026-03-25.dahlia, subscription is at
        // invoice.parent.subscription_details.subscription
        const subscriptionRef =
          invoice.parent?.subscription_details?.subscription;
        const stripeSubscriptionId =
          typeof subscriptionRef === "string"
            ? subscriptionRef
            : (subscriptionRef as Stripe.Subscription | null | undefined)?.id ??
              null;

        if (stripeSubscriptionId) {
          await db.subscription.updateMany({
            where: { stripeSubscriptionId },
            data: { status: SubscriptionStatus.PAST_DUE },
          });
        }

        break;
      }

      // ── Invoice payment succeeded ──────────────────────────────────────────
      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionRef =
          invoice.parent?.subscription_details?.subscription;
        const stripeSubscriptionId =
          typeof subscriptionRef === "string"
            ? subscriptionRef
            : (subscriptionRef as Stripe.Subscription | null | undefined)?.id ??
              null;

        if (stripeSubscriptionId) {
          await db.subscription.updateMany({
            where: {
              stripeSubscriptionId,
              status: { not: SubscriptionStatus.TRIALING },
            },
            data: { status: SubscriptionStatus.ACTIVE },
          });
        }

        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error(`[webhook/stripe] Error processing ${event.type}:`, err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface SubscriptionData {
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  userCount: number;
  status: SubscriptionStatus;
  trialEndsAt: Date | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
}

async function upsertSubscription(userId: string, data: SubscriptionData) {
  const plan = derivePlan(data.status);

  await db.subscription.upsert({
    where: { userId },
    create: { userId, plan, ...data },
    update: { plan, ...data },
  });
}

/** When userId isn't in metadata, look up our record via stripeCustomerId. */
async function syncByCustomer(sub: Stripe.Subscription) {
  const stripeCustomerId =
    typeof sub.customer === "string"
      ? sub.customer
      : (sub.customer as Stripe.Customer).id;

  const existing = await db.subscription.findUnique({
    where: { stripeCustomerId },
  });

  if (!existing) return;

  const status = mapStripeStatus(sub.status);
  const item = sub.items.data[0];

  await db.subscription.update({
    where: { stripeCustomerId },
    data: {
      plan: derivePlan(status),
      status,
      stripeSubscriptionId: sub.id,
      stripePriceId: item?.price.id ?? null,
      userCount: item?.quantity ?? existing.userCount,
      trialEndsAt: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
      currentPeriodStart: item?.current_period_start
        ? new Date(item.current_period_start * 1000)
        : null,
      currentPeriodEnd: item?.current_period_end
        ? new Date(item.current_period_end * 1000)
        : null,
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status
): SubscriptionStatus {
  switch (stripeStatus) {
    case "trialing":
      return SubscriptionStatus.TRIALING;
    case "active":
      return SubscriptionStatus.ACTIVE;
    case "past_due":
    case "unpaid":
      return SubscriptionStatus.PAST_DUE;
    case "canceled":
    case "incomplete_expired":
      return SubscriptionStatus.CANCELED;
    default:
      return SubscriptionStatus.INACTIVE;
  }
}

function derivePlan(status: SubscriptionStatus): Plan {
  if (
    status === SubscriptionStatus.ACTIVE ||
    status === SubscriptionStatus.TRIALING ||
    status === SubscriptionStatus.PAST_DUE
  ) {
    return Plan.EVOTIMEPRO;
  }
  return Plan.FREE;
}
