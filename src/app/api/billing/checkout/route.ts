import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import {
  stripe,
  getOrCreateSubscription,
  getPriceIdForUserCount,
  APP_URL,
} from "@/lib/stripe";
import { SubscriptionStatus } from "@prisma/client";

// ─── Validation Schema ────────────────────────────────────────────────────────

const BillingCheckoutSchema = z.object({
  userCount: z
    .number({ invalid_type_error: "userCount must be a number" })
    .int("userCount must be a whole number")
    .min(1, "At least 1 user is required")
    .max(9999, "Maximum 9999 users"),
});

/**
 * POST /api/billing/checkout
 * Creates a Stripe Checkout Session for EvoTime Pro.
 *
 * Body: { userCount: number }
 */
export async function POST(request: Request) {
  try {
    const user = await requireUser();

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = BillingCheckoutSchema.safeParse({
      userCount: typeof body?.userCount === "number"
        ? body.userCount
        : Number(body?.userCount) || 1,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { userCount } = parsed.data;

    const subscription = await getOrCreateSubscription(user.id);
    const priceId = getPriceIdForUserCount(userCount);

    if (!priceId) {
      return NextResponse.json(
        { error: "Stripe price ID is not configured. Check your .env.local." },
        { status: 500 }
      );
    }

    // Resolve or create Stripe customer
    let customerId = subscription.stripeCustomerId ?? undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
    }

    // Determine remaining trial days to carry forward
    let trialEnd: number | undefined;
    if (
      subscription.status === SubscriptionStatus.TRIALING &&
      subscription.trialEndsAt &&
      subscription.trialEndsAt.getTime() > Date.now()
    ) {
      trialEnd = Math.floor(subscription.trialEndsAt.getTime() / 1000);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: userCount,
        },
      ],
      subscription_data: {
        ...(trialEnd ? { trial_end: trialEnd } : {}),
        metadata: {
          userId: user.id,
          userCount: String(userCount),
        },
      },
      metadata: {
        userId: user.id,
        userCount: String(userCount),
      },
      success_url: `${APP_URL}/dashboard/billing?success=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/dashboard/billing?canceled=1`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err as Error & { status?: number };
    console.error("[billing/checkout]", error);

    if (error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
