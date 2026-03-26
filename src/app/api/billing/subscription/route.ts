import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getOrCreateSubscription } from "@/lib/stripe";

/**
 * GET /api/billing/subscription
 * Returns the current user's subscription details.
 */
export async function GET() {
  try {
    const user = await requireUser();
    const subscription = await getOrCreateSubscription(user.id);

    return NextResponse.json({ subscription });
  } catch (err) {
    const error = err as Error & { status?: number };
    console.error("[billing/subscription]", error);

    if (error.status === 401) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
