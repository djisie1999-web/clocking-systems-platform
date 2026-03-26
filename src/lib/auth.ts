import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { db } from "./db";

// ─── Constants ──────────────────────────────────────────────

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "csp-dev-secret-key-please-change-in-production"
);

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = "7d";
const SALT_ROUNDS = 12;

export const COOKIE_ACCESS = "csp_access_token";
export const COOKIE_REFRESH = "csp_refresh_token";

// ─── Types ───────────────────────────────────────────────────

export interface JWTPayload {
  sub: string;      // user id
  email: string;
  name: string;
  role: string;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
}

// ─── Password Helpers ────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── Token Creation ──────────────────────────────────────────

export async function createAccessToken(payload: JWTPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

export async function createRefreshToken(userId: string): Promise<string> {
  return new SignJWT({ sub: userId, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(JWT_SECRET);
}

// ─── Token Verification ──────────────────────────────────────

export async function verifyAccessToken(
  token: string
): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<{ sub: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload.type !== "refresh") return null;
    return { sub: payload.sub as string };
  } catch {
    return null;
  }
}

// ─── Cookie Management ───────────────────────────────────────

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string
): Promise<void> {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set(COOKIE_ACCESS, accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set(COOKIE_REFRESH, refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_ACCESS);
  cookieStore.delete(COOKIE_REFRESH);
}

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_ACCESS)?.value;
}

export async function getRefreshToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_REFRESH)?.value;
}

// ─── Token Pair Generation ───────────────────────────────────

export async function generateTokenPair(user: {
  id: string;
  email: string;
  name: string;
  role: string;
}): Promise<{ accessToken: string; refreshToken: string }> {
  const accessToken = await createAccessToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const refreshToken = await createRefreshToken(user.id);

  // Persist refresh token and update last login
  await db.user.update({
    where: { id: user.id },
    data: {
      refreshToken,
      lastLoginAt: new Date(),
    },
  });

  return { accessToken, refreshToken };
}

// ─── Session Helpers ─────────────────────────────────────────

/**
 * Returns the current authenticated user from the access token cookie,
 * or null if unauthenticated / token is invalid.
 * Safe to call from server components and API routes.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const payload = await verifyAccessToken(token);
  if (!payload) return null;

  const user = await db.user.findUnique({
    where: { id: payload.sub },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
    },
  });

  if (!user || !user.isActive) return null;
  return user;
}

/**
 * requireUser() — middleware helper for API routes and server actions.
 * Throws a 401 error object when the request has no valid session.
 *
 * Usage in an API route:
 *   const user = await requireUser();
 *
 * Usage in a server component (redirect):
 *   const user = await requireUser({ redirect: true });
 */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    const err = new Error("Unauthorized") as Error & { status: number };
    err.status = 401;
    throw err;
  }
  return user;
}

/**
 * requireRole() — like requireUser() but also validates the user's role.
 */
export async function requireRole(
  allowedRoles: string[]
): Promise<SessionUser> {
  const user = await requireUser();
  if (!allowedRoles.includes(user.role)) {
    const err = new Error("Forbidden") as Error & { status: number };
    err.status = 403;
    throw err;
  }
  return user;
}
