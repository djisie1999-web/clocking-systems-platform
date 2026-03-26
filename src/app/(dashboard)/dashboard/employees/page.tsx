"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Users,
  Search,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  Monitor,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipIcon } from "@/components/ui/tooltip";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  status: "present" | "absent" | "late";
  clockedInAt: string | null;
  clockedOutAt: string | null;
  hoursThisWeek: number;
  phone: string;
}

interface EmployeeSummary {
  total: number;
  present: number;
  late: number;
  absent: number;
}

function RowSkeleton() {
  return (
    <tr className="border-b border-gray-100">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3.5 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-20" /></td>
      <td className="px-4 py-3"><Skeleton className="h-6 w-16 rounded-full" /></td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-12" /></td>
      <td className="px-4 py-3"><Skeleton className="h-3.5 w-10" /></td>
    </tr>
  );
}

const statusConfig = {
  present: {
    label: "Present",
    variant: "success" as const,
    icon: CheckCircle,
    iconColor: "text-emerald-500",
  },
  late: {
    label: "Late",
    variant: "warning" as const,
    icon: AlertCircle,
    iconColor: "text-amber-500",
  },
  absent: {
    label: "Absent",
    variant: "destructive" as const,
    icon: XCircle,
    iconColor: "text-red-500",
  },
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [summary, setSummary] = useState<EmployeeSummary | null>(null);
  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (deptFilter) params.set("department", deptFilter);
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/employees?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load employees");
      const data = (await res.json()) as {
        employees: Employee[];
        summary: EmployeeSummary;
        departments: string[];
      };
      setEmployees(data.employees ?? []);
      setSummary(data.summary ?? null);
      setDepartments(data.departments ?? []);
      setError(null);
    } catch {
      setError("Could not load employees. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, deptFilter, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(fetchEmployees, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchEmployees, search]);

  const attendancePct =
    summary && summary.total > 0
      ? Math.round(((summary.present + summary.late) / summary.total) * 100)
      : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Real-time attendance and clocking status
          </p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors self-start sm:self-auto">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Summary cards */}
      {summary && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total",
              value: summary.total,
              color: "bg-gray-50 text-gray-900",
              icon: Users,
              iconColor: "text-gray-500",
            },
            {
              label: "Present",
              value: summary.present,
              color: "bg-emerald-50 text-emerald-700",
              icon: CheckCircle,
              iconColor: "text-emerald-500",
            },
            {
              label: "Late",
              value: summary.late,
              color: "bg-amber-50 text-amber-700",
              icon: AlertCircle,
              iconColor: "text-amber-500",
            },
            {
              label: "Absent",
              value: summary.absent,
              color: "bg-red-50 text-red-700",
              icon: XCircle,
              iconColor: "text-red-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-xl p-4 flex items-center gap-3`}
            >
              <stat.icon className={`w-6 h-6 ${stat.iconColor} shrink-0`} />
              <div>
                <div className="text-2xl font-bold leading-none">
                  {stat.value}
                </div>
                <div className="text-xs opacity-75 mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Attendance progress bar */}
      {summary && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">
              Today&apos;s Attendance
            </span>
            <span className="text-gray-500">
              {summary.present + summary.late}/{summary.total} present
            </span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 rounded-l-full transition-all"
              style={{
                width: `${summary.total > 0 ? Math.round((summary.present / summary.total) * 100) : 0}%`,
              }}
            />
            <div
              className="h-full bg-amber-400 transition-all"
              style={{
                width: `${summary.total > 0 ? Math.round((summary.late / summary.total) * 100) : 0}%`,
              }}
            />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Present ({summary.present})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              Late ({summary.late})
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block" />
              Absent ({summary.absent})
            </span>
            <span className="sm:ml-auto font-medium text-gray-700">
              {attendancePct}% attendance rate
            </span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, department or position…"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Department filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="h-9 pl-9 pr-8 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Statuses</option>
          <option value="present">Present</option>
          <option value="late">Late</option>
          <option value="absent">Absent</option>
        </select>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchEmployees}
            className="ml-auto text-sm font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Clock-in
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    Hrs/wk
                    <TooltipIcon
                      content="Total hours logged via clocking terminals this week (Mon–Sun)"
                      side="top"
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <RowSkeleton key={i} />
                  ))
                : employees.map((emp) => {
                    const cfg = statusConfig[emp.status];
                    return (
                      <tr
                        key={emp.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        {/* Employee */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                              <span className="text-blue-700 font-semibold text-xs">
                                {emp.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {emp.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {emp.position}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Department */}
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">
                            {emp.department}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3">
                          <Badge variant={cfg.variant}>
                            <span className="flex items-center gap-1">
                              <cfg.icon className="w-3 h-3" />
                              {cfg.label}
                            </span>
                          </Badge>
                        </td>

                        {/* Clock-in time */}
                        <td className="px-4 py-3">
                          {emp.clockedInAt ? (
                            <span className="flex items-center gap-1 text-sm text-gray-700">
                              <Clock className="w-3.5 h-3.5 text-gray-400" />
                              {emp.clockedInAt}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>

                        {/* Hours this week */}
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-gray-900">
                            {emp.hoursThisWeek}h
                          </span>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {!loading && employees.length === 0 && !error && (
          <div className="py-16 px-6 text-center max-w-sm mx-auto">
            {search || deptFilter || statusFilter ? (
              <>
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-7 h-7 text-gray-400" />
                </div>
                <h3 className="text-base font-semibold text-gray-700 mb-1">
                  No results found
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  No employees match your current filters.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setDeptFilter("");
                    setStatusFilter("");
                  }}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Clear all filters
                </button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  No employees yet
                </h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  Employees are enrolled directly on your clocking terminals.
                  First, connect a terminal — then enrol staff on the device.
                </p>
                <div className="space-y-2">
                  <Link
                    href="/dashboard/devices"
                    className="flex items-center justify-between gap-3 p-3 rounded-xl border-2 border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Monitor className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900">
                          Add a clocking terminal
                        </p>
                        <p className="text-xs text-gray-500">Required first step</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </Link>
                  <a
                    href="/help#guides"
                    className="flex items-center gap-2 justify-center text-sm text-blue-600 hover:underline mt-2"
                  >
                    Read the employee enrolment guide →
                  </a>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Row count */}
      {!loading && employees.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">
          Showing {employees.length} employee
          {employees.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
