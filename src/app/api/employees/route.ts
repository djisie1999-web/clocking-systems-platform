import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";

// ─── Static mock employee data ───────────────────────────────────────────────

const EMPLOYEES = [
  { id: "emp_001", name: "Tom Walsh",     department: "Assembly",  position: "Team Leader",    status: "present" as const, clockedInAt: "06:02", clockedOutAt: null,  hoursThisWeek: 32, phone: "07700 111001" },
  { id: "emp_002", name: "Sarah Green",   department: "Packing",   position: "Operative",      status: "present" as const, clockedInAt: "06:05", clockedOutAt: null,  hoursThisWeek: 30, phone: "07700 111002" },
  { id: "emp_003", name: "Mike Peters",   department: "Assembly",  position: "Operative",      status: "late"    as const, clockedInAt: "06:18", clockedOutAt: null,  hoursThisWeek: 28, phone: "07700 111003" },
  { id: "emp_004", name: "Janet Brown",   department: "Office",    position: "Administrator",  status: "present" as const, clockedInAt: "09:01", clockedOutAt: null,  hoursThisWeek: 35, phone: "07700 111004" },
  { id: "emp_005", name: "Dave King",     department: "Dispatch",  position: "Driver",         status: "present" as const, clockedInAt: "07:00", clockedOutAt: null,  hoursThisWeek: 40, phone: "07700 111005" },
  { id: "emp_006", name: "Lucy Evans",    department: "Packing",   position: "Supervisor",     status: "absent"  as const, clockedInAt: null,    clockedOutAt: null,  hoursThisWeek: 24, phone: "07700 111006" },
  { id: "emp_007", name: "Paul Morris",   department: "Assembly",  position: "Operative",      status: "present" as const, clockedInAt: "06:00", clockedOutAt: null,  hoursThisWeek: 38, phone: "07700 111007" },
  { id: "emp_008", name: "Anna Collins",  department: "Office",    position: "HR Manager",     status: "present" as const, clockedInAt: "09:00", clockedOutAt: null,  hoursThisWeek: 37, phone: "07700 111008" },
  { id: "emp_009", name: "James Ford",    department: "Dispatch",  position: "Driver",         status: "absent"  as const, clockedInAt: null,    clockedOutAt: null,  hoursThisWeek: 16, phone: "07700 111009" },
  { id: "emp_010", name: "Chloe Adams",   department: "Assembly",  position: "Operative",      status: "present" as const, clockedInAt: "06:01", clockedOutAt: null,  hoursThisWeek: 39, phone: "07700 111010" },
  { id: "emp_011", name: "Ryan Scott",    department: "Warehouse", position: "Picker",         status: "late"    as const, clockedInAt: "07:22", clockedOutAt: null,  hoursThisWeek: 31, phone: "07700 111011" },
  { id: "emp_012", name: "Megan Price",   department: "Office",    position: "Accountant",     status: "present" as const, clockedInAt: "08:58", clockedOutAt: null,  hoursThisWeek: 36, phone: "07700 111012" },
];

// ─── GET /api/employees ──────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  try {
    await requireUser();

    const { searchParams } = req.nextUrl;
    const search = searchParams.get("search")?.toLowerCase().trim() ?? "";
    const dept   = searchParams.get("department") ?? "";
    const status = searchParams.get("status") ?? "";

    let employees = EMPLOYEES;

    if (search) {
      employees = employees.filter(
        (e) =>
          e.name.toLowerCase().includes(search) ||
          e.department.toLowerCase().includes(search) ||
          e.position.toLowerCase().includes(search)
      );
    }

    if (dept) {
      employees = employees.filter((e) => e.department === dept);
    }

    if (status === "present" || status === "absent" || status === "late") {
      employees = employees.filter((e) => e.status === status);
    }

    const departments = [...new Set(EMPLOYEES.map((e) => e.department))].sort();

    return NextResponse.json({
      employees,
      total: employees.length,
      departments,
      summary: {
        total: EMPLOYEES.length,
        present: EMPLOYEES.filter((e) => e.status === "present").length,
        late: EMPLOYEES.filter((e) => e.status === "late").length,
        absent: EMPLOYEES.filter((e) => e.status === "absent").length,
      },
    });
  } catch (err) {
    const e = err as { status?: number; message?: string };
    const status = e.status ?? 500;
    const message = status < 500 ? (e.message ?? "Error") : "Internal server error";
    return NextResponse.json({ error: message }, { status });
  }
}
