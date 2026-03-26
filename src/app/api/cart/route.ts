import { NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  productId: string;
  quantity: number;
  addedAt: string;
}

interface Cart {
  items: CartItem[];
  updatedAt: string;
}

// ─── Validation Schemas ───────────────────────────────────────────────────────

const AddToCartSchema = z.object({
  productId: z.string().min(1, "productId is required"),
  quantity: z
    .number({ invalid_type_error: "quantity must be a number" })
    .int("quantity must be a whole number")
    .min(1, "quantity must be at least 1")
    .default(1),
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCart(cookieStore: Awaited<ReturnType<typeof cookies>>): Cart {
  const raw = cookieStore.get("cs_cart")?.value;
  if (!raw) return { items: [], updatedAt: new Date().toISOString() };
  try {
    return JSON.parse(raw) as Cart;
  } catch {
    return { items: [], updatedAt: new Date().toISOString() };
  }
}

// ─── GET /api/cart ────────────────────────────────────────────────────────────

export async function GET() {
  const cookieStore = await cookies();
  const cart = getCart(cookieStore);
  return NextResponse.json(cart);
}

// ─── POST /api/cart ───────────────────────────────────────────────────────────

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const cart = getCart(cookieStore);

  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = AddToCartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { productId, quantity } = parsed.data;

    const existingIndex = cart.items.findIndex(
      (i) => i.productId === productId
    );

    if (existingIndex >= 0) {
      cart.items[existingIndex].quantity += quantity;
    } else {
      cart.items.push({
        productId,
        quantity,
        addedAt: new Date().toISOString(),
      });
    }

    cart.updatedAt = new Date().toISOString();

    const response = NextResponse.json(cart);
    response.cookies.set("cs_cart", JSON.stringify(cart), {
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[cart/post]", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}

// ─── DELETE /api/cart ─────────────────────────────────────────────────────────

export async function DELETE(request: Request) {
  const cookieStore = await cookies();
  const cart = getCart(cookieStore);

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  if (productId) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
  } else {
    cart.items = [];
  }

  cart.updatedAt = new Date().toISOString();

  const response = NextResponse.json(cart);
  response.cookies.set("cs_cart", JSON.stringify(cart), {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
