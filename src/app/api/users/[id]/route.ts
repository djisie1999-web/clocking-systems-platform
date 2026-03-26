import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireUser, requireRole, hashPassword } from "@/lib/auth";

// ─── Shared Helpers ───────────────────────────────────────────────────────────

const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  role: true,
  isActive: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true,
} as const satisfies Prisma.UserSelect;

function toUserResponse(user: {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

function errorResponse(err: unknown) {
  const e = err as { status?: number; message?: string };
  const status = e.status ?? 500;
  const message =
    status < 500 ? (e.message ?? "An error occurred") : "Internal server error";
  return NextResponse.json({ error: message }, { status });
}

// ─── GET /api/users/[id] ──────────────────────────────────────────────────────
//
// Returns a single user by ID.
// Requires: authenticated user.
// Access: admins can fetch any user; regular users can only fetch themselves.

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireUser();
    const { id } = await params;

    if (session.role !== "ADMIN" && session.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const user = await db.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: toUserResponse(user) });
  } catch (err) {
    return errorResponse(err);
  }
}

// ─── PATCH /api/users/[id] ────────────────────────────────────────────────────
//
// Partially updates a user.
// Requires: authenticated user.
// Access:
//   - Regular users can update their own name, email, and password.
//   - Admins can additionally update role and isActive for any user.
//
// Body (all fields optional):
//   name        – string
//   email       – valid email
//   password    – min 8 chars (new password)
//   role        – "ADMIN" | "USER"  (admin only)
//   isActive    – boolean           (admin only)

const UpdateUserBaseSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(100).optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128)
    .optional(),
});

const UpdateUserAdminSchema = UpdateUserBaseSchema.extend({
  role: z.enum(["ADMIN", "USER"]).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireUser();
    const { id } = await params;

    if (session.role !== "ADMIN" && session.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const isAdmin = session.role === "ADMIN";
    const schema = isAdmin ? UpdateUserAdminSchema : UpdateUserBaseSchema;

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Guard email uniqueness when the caller is changing it
    if (
      parsed.data.email &&
      parsed.data.email.toLowerCase() !== existing.email
    ) {
      const taken = await db.user.findUnique({
        where: { email: parsed.data.email.toLowerCase() },
      });
      if (taken) {
        return NextResponse.json(
          { error: "Email is already in use" },
          { status: 409 }
        );
      }
    }

    // Build the update payload — only include explicitly provided fields
    const updateData: Prisma.UserUpdateInput = {};

    if (parsed.data.name !== undefined) {
      updateData.name = parsed.data.name;
    }
    if (parsed.data.email !== undefined) {
      updateData.email = parsed.data.email.toLowerCase();
    }
    if (parsed.data.password !== undefined) {
      updateData.passwordHash = await hashPassword(parsed.data.password);
    }

    if (isAdmin) {
      const adminData = parsed.data as z.infer<typeof UpdateUserAdminSchema>;
      if (adminData.role !== undefined) updateData.role = adminData.role;
      if (adminData.isActive !== undefined) updateData.isActive = adminData.isActive;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const updated = await db.user.update({
      where: { id },
      data: updateData,
      select: USER_SELECT,
    });

    return NextResponse.json({ data: toUserResponse(updated) });
  } catch (err) {
    return errorResponse(err);
  }
}

// ─── DELETE /api/users/[id] ───────────────────────────────────────────────────
//
// Permanently deletes a user.
// Requires: ADMIN role.
// Guard: admins cannot delete their own account.

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireRole(["ADMIN"]);
    const { id } = await params;

    if (session.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 }
      );
    }

    const existing = await db.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await db.user.delete({ where: { id } });

    return new NextResponse(null, { status: 204 });
  } catch (err) {
    return errorResponse(err);
  }
}
