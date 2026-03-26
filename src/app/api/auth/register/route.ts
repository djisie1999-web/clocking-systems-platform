import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import {
  hashPassword,
  generateTokenPair,
  setAuthCookies,
} from "@/lib/auth";
import { Plan, SubscriptionStatus } from "@prisma/client";
import { TRIAL_DAYS } from "@/lib/stripe";

// ─── Validation Schema ────────────────────────────────────────────────────────

const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or fewer"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be 128 characters or fewer"),
});

// ─── POST /api/auth/register ──────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = RegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, password } = parsed.data;
    const normalisedEmail = email.toLowerCase().trim();

    const existing = await db.user.findUnique({
      where: { email: normalisedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DAYS);

    const user = await db.user.create({
      data: {
        email: normalisedEmail,
        passwordHash,
        name: name.trim(),
        role: "USER",
        subscription: {
          create: {
            plan: Plan.EVOTIMEPRO,
            status: SubscriptionStatus.TRIALING,
            trialEndsAt,
          },
        },
      },
    });

    const { accessToken, refreshToken } = await generateTokenPair({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[auth/register]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
