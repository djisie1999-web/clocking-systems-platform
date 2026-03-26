import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

// ─── Static mock device data ────────────────────────────────────────────────
// In production these would be fetched from a devices table.

const DEVICES = [
  {
    id: "dev_001",
    name: "Main Entrance",
    model: "TimeClock Elite F500",
    location: "Reception",
    ipAddress: "192.168.1.101",
    macAddress: "AA:BB:CC:DD:EE:01",
    firmwareVersion: "3.2.1",
    status: "online" as const,
    lastSeen: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    totalClockIns: 1842,
    enrolledEmployees: 47,
    uptime: "99.9%",
  },
  {
    id: "dev_002",
    name: "Warehouse Door",
    model: "TimeClock Pro X200",
    location: "Warehouse",
    ipAddress: "192.168.1.102",
    macAddress: "AA:BB:CC:DD:EE:02",
    firmwareVersion: "2.8.4",
    status: "online" as const,
    lastSeen: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    totalClockIns: 3201,
    enrolledEmployees: 32,
    uptime: "98.7%",
  },
  {
    id: "dev_003",
    name: "Office Floor",
    model: "TimeClock Lite M100",
    location: "Office",
    ipAddress: "192.168.1.103",
    macAddress: "AA:BB:CC:DD:EE:03",
    firmwareVersion: "1.5.0",
    status: "offline" as const,
    lastSeen: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    totalClockIns: 654,
    enrolledEmployees: 15,
    uptime: "91.2%",
  },
];

// ─── GET /api/devices ────────────────────────────────────────────────────────

export async function GET(_req: NextRequest) {
  try {
    await requireUser();
    return NextResponse.json({ devices: DEVICES, total: DEVICES.length });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    const status = e.status ?? 500;
    const message = status < 500 ? (e.message ?? "Error") : "Internal server error";
    return NextResponse.json({ error: message }, { status });
  }
}
