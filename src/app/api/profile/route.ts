import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireUser, hashPassword, verifyPassword } from "@/lib/auth";

// ─── Shared Helpers ───────────────────────────────────────────────────────────

const PROFILE_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.UserSelect;

function errorResponse(err: unknown) {
  const e = err as { status?: number; message?: string };
  const status = e.status ?? 500;
  const message =
    status < 500 ? (e.message ?? "An error occurred") : "Internal server error";
  return NextResponse.json({ error: message }, { status });
}

// ─── GET /api/profile ─────────────────────────────────────────────────────────
//
// Returns the currently authenticated user's full profile.
// Requires: any authenticated user.

export async function GET() {
  try {
    const session = await requireUser();

    const user = await db.user.findUnique({
      where: { id: session.id },
      select: PROFILE_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (err) {
    return errorResponse(err);
  }
}

// ─── PATCH /api/profile ───────────────────────────────────────────────────────
//
// Updates the currently authenticated user's own profile.
// Requires: any authenticated user.
//
// Body (all fields optional):
//   name            – display name
//   email           – new email address
//   currentPassword – required when setting a new password
//   newPassword     – min 8 chars; only accepted alongside currentPassword

const UpdateProfileSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name cannot be empty")
      .max(100, "Name is too long")
      .optional(),
    email: z.string().email("Invalid email address").optional(),
    currentPassword: z.string().optional(),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "Password is too long")
      .optional(),
  })
  .refine((d) => !(d.newPassword && !d.currentPassword), {
    message: "currentPassword is required when setting a new password",
    path: ["currentPassword"],
  });

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireUser();

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, currentPassword, newPassword } = parsed.data;

    // Fetch current record — needed for password verification and email check
    const current = await db.user.findUnique({ where: { id: session.id } });
    if (!current) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Guard email uniqueness when the caller is changing it
    if (email && email.toLowerCase() !== current.email) {
      const taken = await db.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (taken) {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 409 }
        );
      }
    }

    // Build update payload — only include explicitly provided fields
    const updateData: Prisma.UserUpdateInput = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email.toLowerCase();

    // Password change: verify the current password first
    if (newPassword) {
      const passwordOk = await verifyPassword(
        currentPassword!,
        current.passwordHash
      );
      if (!passwordOk) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 }
        );
      }
      updateData.passwordHash = await hashPassword(newPassword);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    const updated = await db.user.update({
      where: { id: session.id },
      data: updateData,
      select: PROFILE_SELECT,
    });

    return NextResponse.json({ data: updated });
  } catch (err) {
    return errorResponse(err);
  }
}
