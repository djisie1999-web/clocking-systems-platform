import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { stripe, getOrCreateSubscription, APP_URL } from "@/lib/stripe";

/**
 * POST /api/billing/portal
 * Creates a Stripe Customer Portal session so the user can manage their
 * subscription, update payment method, or cancel.
 */
export async function POST() {
  try {
    const user = await requireUser();
    const subscription = await getOrCreateSubscription(user.id);

    if (!subscription.stripeCustomerId) {
      return NextResponse.json(
        {
          error:
            "No active subscription found. Please subscribe to a plan first.",
        },
        { status: 400 }
      );
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${APP_URL}/dashboard/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const error = err as Error & { status?: number };
    console.error("[billing/portal]", error);

    if (error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
