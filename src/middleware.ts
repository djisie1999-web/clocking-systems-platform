import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { COOKIE_ACCESS } from "@/lib/auth";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "csp-dev-secret-key-please-change-in-production"
);

// ─── Route Patterns ──────────────────────────────────────────

/** Routes that require a valid session */
const PROTECTED = [
  "/dashboard",
  "/settings",
  "/admin",
  "/profile",
  "/team",
  "/notifications",
  "/help",
];

/** Auth pages — redirect to dashboard when already logged in */
const AUTH_PAGES = ["/sign-in", "/sign-up"];

/** Public API routes — no token required */
const PUBLIC_API = [
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/logout",
  "/api/health",
  "/api/webhooks/stripe",
];

// ─── Helpers ─────────────────────────────────────────────────

function matchesAny(pathname: string, patterns: string[]): boolean {
  return patterns.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

// ─── Middleware ───────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Public API routes — always allow
  if (matchesAny(pathname, PUBLIC_API)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get(COOKIE_ACCESS)?.value;
  const payload = accessToken ? await verifyToken(accessToken) : null;

  // Auth pages — redirect to dashboard when already authenticated
  if (matchesAny(pathname, AUTH_PAGES)) {
    if (payload) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Root — redirect based on auth state
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(payload ? "/dashboard" : "/sign-in", request.url)
    );
  }

  // Protected pages — require valid token
  if (matchesAny(pathname, PROTECTED)) {
    if (!payload) {
      const url = new URL("/sign-in", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Protected API routes — return 401 JSON
  if (pathname.startsWith("/api/")) {
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
