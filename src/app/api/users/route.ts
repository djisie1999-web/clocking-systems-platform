import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireRole, hashPassword } from "@/lib/auth";

// ─── Shared Helpers ───────────────────────────────────────────────────────────

/** Fields returned to callers — passwordHash and refreshToken are intentionally omitted. */
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

/** Normalise a DB row into a public-safe response object. */
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

/** Consistent error response builder. */
function errorResponse(err: unknown) {
  const e = err as { status?: number; message?: string };
  const status = e.status ?? 500;
  const message =
    status < 500 ? (e.message ?? "An error occurred") : "Internal server error";
  return NextResponse.json({ error: message }, { status });
}

// ─── GET /api/users ───────────────────────────────────────────────────────────
//
// Returns a paginated, filterable list of all users.
// Requires: ADMIN role.
//
// Query params:
//   page      – page number, default 1
//   limit     – results per page, default 20, max 100
//   search    – case-insensitive substring match on name or email
//   role      – filter by ADMIN | USER
//   isActive  – filter by true | false

export async function GET(req: NextRequest) {
  try {
    await requireRole(["ADMIN"]);

    const { searchParams } = req.nextUrl;

    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const limit = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("limit") ?? "20", 10))
    );
    const search = searchParams.get("search")?.trim() ?? "";
    const roleParam = searchParams.get("role");
    const isActiveParam = searchParams.get("isActive");

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (roleParam === "ADMIN" || roleParam === "USER") {
      where.role = roleParam;
    }

    if (isActiveParam === "true" || isActiveParam === "false") {
      where.isActive = isActiveParam === "true";
    }

    const [total, users] = await Promise.all([
      db.user.count({ where }),
      db.user.findMany({
        where,
        select: USER_SELECT,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return NextResponse.json({
      data: users.map(toUserResponse),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return errorResponse(err);
  }
}

// ─── POST /api/users ──────────────────────────────────────────────────────────
//
// Creates a new user account.
// Requires: ADMIN role.
//
// Body:
//   name      – string (required)
//   email     – valid email (required)
//   password  – min 8 chars (required)
//   role      – "ADMIN" | "USER", default "USER"
//   isActive  – boolean, default true

const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password is too long"),
  role: z.enum(["ADMIN", "USER"]).default("USER"),
  isActive: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    await requireRole(["ADMIN"]);

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = CreateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const { name, email, password, role, isActive } = parsed.data;
    const normalisedEmail = email.toLowerCase();

    const existing = await db.user.findUnique({
      where: { email: normalisedEmail },
    });
    if (existing) {
      return NextResponse.json(
        { error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await db.user.create({
      data: { name, email: normalisedEmail, passwordHash, role, isActive },
      select: USER_SELECT,
    });

    return NextResponse.json({ data: toUserResponse(user) }, { status: 201 });
  } catch (err) {
    return errorResponse(err);
  }
}
