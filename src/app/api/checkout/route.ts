import { NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schemas ───────────────────────────────────────────────────────

const CheckoutItemSchema = z.object({
  productId: z.string().min(1, "productId is required"),
  productName: z.string().min(1, "productName is required"),
  price: z.number().min(0, "price must be non-negative"),
  quantity: z.number().int().min(1, "quantity must be at least 1"),
});

const AddressSchema = z.object({
  line1: z.string().min(1, "Address line 1 is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
});

const CustomerSchema = z.object({
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid customer email"),
  company: z.string().optional(),
  phone: z.string().optional(),
  address: AddressSchema.optional(),
});

const CheckoutRequestSchema = z.object({
  items: z
    .array(CheckoutItemSchema)
    .min(1, "Cart must contain at least one item"),
  customer: CustomerSchema,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateOrderNumber(): string {
  const prefix = "CS";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

// ─── POST /api/checkout ───────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = CheckoutRequestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { items, customer } = parsed.data;

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const vat = Math.round(subtotal * 0.2);
    const total = subtotal + vat;

    const orderNumber = generateOrderNumber();
    const sessionId = `sess_${Math.random().toString(36).slice(2)}`;

    const orderSummary = {
      sessionId,
      orderNumber,
      status: "confirmed",
      customer,
      items,
      pricing: {
        subtotal,
        vat,
        total,
        currency: "GBP",
      },
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(orderSummary, { status: 201 });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
