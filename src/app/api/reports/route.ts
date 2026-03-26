import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

// ─── Mock report data ────────────────────────────────────────────────────────

function generateWeeklyData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, i) => ({
    day,
    present: [42, 44, 43, 41, 38, 12, 5][i],
    late: [3, 2, 4, 3, 2, 1, 0][i],
    absent: [2, 1, 0, 3, 7, 34, 42][i],
  }));
}

function generateDepartmentData() {
  return [
    { department: "Assembly",  employees: 18, avgHours: 42.3, attendance: 94, lateRate: 6  },
    { department: "Packing",   employees: 12, avgHours: 39.1, attendance: 91, lateRate: 9  },
    { department: "Dispatch",  employees:  8, avgHours: 44.8, attendance: 88, lateRate: 12 },
    { department: "Office",    employees:  6, avgHours: 38.5, attendance: 98, lateRate: 2  },
    { department: "Warehouse", employees:  3, avgHours: 41.0, attendance: 85, lateRate: 15 },
  ];
}

// ─── GET /api/reports ────────────────────────────────────────────────────────

export async function GET(_req: NextRequest) {
  try {
    await requireUser();

    const weeklyData = generateWeeklyData();
    const departmentData = generateDepartmentData();

    const summary = {
      totalEmployees: 47,
      avgAttendanceRate: 91,
      avgHoursPerEmployee: 41.2,
      totalOvertimeHours: 84,
      lateClockins: 14,
      absentToday: 9,
      totalClockInsThisWeek: 1284,
      payrollHoursThisWeek: 1940,
    };

    return NextResponse.json({ summary, weeklyData, departmentData });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    const status = e.status ?? 500;
    const message = status < 500 ? (e.message ?? "Error") : "Internal server error";
    return NextResponse.json({ error: message }, { status });
  }
}
