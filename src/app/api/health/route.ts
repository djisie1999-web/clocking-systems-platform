import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// ─── GET /api/health ──────────────────────────────────────────────────────────
//
// Public liveness + readiness probe.
// No authentication required — listed in middleware PUBLIC_API list.
//
// Returns:
//   200  { status: "ok",    database: { status: "connected",    latencyMs: N } }
//   503  { status: "error", database: { status: "disconnected"               } }

export async function GET() {
  const started = Date.now();

  try {
    // Lightweight round-trip to verify the DB is reachable
    await db.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - started;

    return NextResponse.json(
      {
        status: "ok",
        timestamp: new Date().toISOString(),
        database: {
          status: "connected",
          latencyMs,
        },
        version: process.env.npm_package_version ?? "1.0.0",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: {
          status: "disconnected",
        },
      },
      { status: 503 }
    );
  }
}
