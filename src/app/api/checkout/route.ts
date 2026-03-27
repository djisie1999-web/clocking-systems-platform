import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

// ─── Stripe Client ──────────────────────────────────────────────────────────

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY ?? "",
  { apiVersion: "2025-04-30.basil" as Stripe.LatestApiVersion, typescript: true }
);

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://cs-site-production.up.railway.app";

// ─── Validation ─────────────────────────────────────────────────────────────

const CheckoutItemSchema = z.object({
  productId: z.string().min(1),
  productName: z.string().min(1),
  price: z.number().min(0), // in pence ex-VAT
  quantity: z.number().int().min(1),
  type: z.enum(["software", "hardware"]).default("hardware"),
});

const CheckoutRequestSchema = z.object({
  items: z.array(CheckoutItemSchema).min(1),
  customerEmail: z.string().email().optional(),
});

// ─── POST /api/checkout ─────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = CheckoutRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten().fieldErrors },
        { status: 422 }
      );
    }

    const { items, customerEmail } = parsed.data;

    // Separate software (subscription) and hardware (one-off) items
    const hasSoftware = items.some((i) => i.type === "software");
    const hasHardware = items.some((i) => i.type === "hardware");

    // Build Stripe line items — all prices include 20% VAT applied by Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "gbp",
          unit_amount: item.price, // pence ex-VAT — Stripe will add tax
          product_data: {
            name: item.productName,
          },
          ...(item.type === "software"
            ? { recurring: { interval: "year" as const } }
            : {}),
        },
        quantity: item.quantity,
      })
    );

    // Determine checkout mode
    // If mixed: use subscription mode (Stripe handles one-off items in subscription sessions)
    const mode: Stripe.Checkout.SessionCreateParams.Mode = hasSoftware
      ? "subscription"
      : "payment";

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode,
      line_items: lineItems,
      success_url: `${APP_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/shop`,
      automatic_tax: { enabled: false },
      // Apply 20% VAT manually via tax rate
      ...(mode === "payment"
        ? {}
        : {}),
      metadata: {
        source: "clocking-systems-website",
        hasHardware: hasHardware ? "true" : "false",
        hasSoftware: hasSoftware ? "true" : "false",
      },
    };

    if (customerEmail) {
      sessionParams.customer_email = customerEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    return NextResponse.json(
      { url: session.url, sessionId: session.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("[checkout]", error);
    const message =
      error instanceof Error ? error.message : "Checkout creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
