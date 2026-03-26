"use client";
import { useState, useEffect } from "react";
import {
  BarChart2,
  Download,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Monitor,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { TooltipIcon } from "@/components/ui/tooltip";
import Link from "next/link";

interface WeeklyDataPoint {
  day: string;
  present: number;
  late: number;
  absent: number;
}

interface DepartmentRow {
  department: string;
  employees: number;
  avgHours: number;
  attendance: number;
  lateRate: number;
}

interface ReportSummary {
  totalEmployees: number;
  avgAttendanceRate: number;
  avgHoursPerEmployee: number;
  totalOvertimeHours: number;
  lateClockins: number;
  absentToday: number;
  totalClockInsThisWeek: number;
  payrollHoursThisWeek: number;
}

interface ReportData {
  summary: ReportSummary;
  weeklyData: WeeklyDataPoint[];
  departmentData: DepartmentRow[];
}

function SummarySkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
          <Skeleton className="h-3 w-24 mb-3" />
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      ))}
    </div>
  );
}

function BarChartRow({
  label,
  present,
  late,
  absent,
  max,
}: {
  label: string;
  present: number;
  late: number;
  absent: number;
  max: number;
}) {
  const total = present + late + absent;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-gray-500 w-8 shrink-0">
        {label}
      </span>
      <div className="flex-1 h-6 bg-gray-100 rounded-md overflow-hidden flex">
        <div
          className="h-full bg-emerald-500 transition-all"
          style={{ width: `${max > 0 ? (present / max) * 100 : 0}%` }}
          title={`Present: ${present}`}
        />
        <div
          className="h-full bg-amber-400 transition-all"
          style={{ width: `${max > 0 ? (late / max) * 100 : 0}%` }}
          title={`Late: ${late}`}
        />
        <div
          className="h-full bg-gray-200 transition-all"
          style={{ width: `${max > 0 ? (absent / max) * 100 : 0}%` }}
          title={`Absent: ${absent}`}
        />
      </div>
      <span className="text-xs text-gray-500 w-6 shrink-0 text-right">
        {total}
      </span>
    </div>
  );
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("this_week");

  useEffect(() => {
    setLoading(true);
    fetch(`/api/reports?period=${period}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load reports");
        return r.json() as Promise<ReportData>;
      })
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch(() => setError("Could not load report data."))
      .finally(() => setLoading(false));
  }, [period]);

  const maxBar =
    data && data.weeklyData.length > 0
      ? Math.max(
          1,
          ...data.weeklyData.map((d) => d.present + d.late + d.absent)
        )
      : 1;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Time &amp; attendance analytics and payroll data
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Period selector */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="h-9 px-3 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <button
            onClick={() => {
              setLoading(true);
              setError(null);
              fetch(`/api/reports?period=${period}`)
                .then((r) => r.json() as Promise<ReportData>)
                .then(setData)
                .catch(() => setError("Could not load report data."))
                .finally(() => setLoading(false));
            }}
            className="ml-auto text-sm font-medium underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Summary KPIs */}
      {loading ? (
        <SummarySkeleton />
      ) : data ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Avg Attendance Rate",
              value: `${data.summary.avgAttendanceRate}%`,
              sub: `${data.summary.totalEmployees} employees`,
              icon: Users,
              iconColor: "text-blue-600",
              iconBg: "bg-blue-50",
              trend: "up",
              tooltip: "Percentage of employees who clocked in (present + late) out of total headcount for the selected period",
            },
            {
              label: "Avg Hours / Employee",
              value: `${data.summary.avgHoursPerEmployee}h`,
              sub: "Per week",
              icon: Clock,
              iconColor: "text-emerald-600",
              iconBg: "bg-emerald-50",
              trend: "up",
              tooltip: "Average contracted hours worked per employee this week, calculated from clock-in and clock-out times",
            },
            {
              label: "Overtime Hours",
              value: `${data.summary.totalOvertimeHours}h`,
              sub: "This week",
              icon: TrendingUp,
              iconColor: "text-amber-600",
              iconBg: "bg-amber-50",
              trend: "neutral",
              tooltip: "Total hours worked beyond contracted hours across all employees. Used for payroll overtime calculations",
            },
            {
              label: "Late Clock-ins",
              value: data.summary.lateClockins,
              sub: `${data.summary.absentToday} absent today`,
              icon: AlertCircle,
              iconColor: "text-red-600",
              iconBg: "bg-red-50",
              trend: "down",
              tooltip: "Employees who clocked in after their scheduled start time during the selected period",
            },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                  {kpi.label}
                  <TooltipIcon content={kpi.tooltip} side="top" />
                </span>
                <div
                  className={`w-8 h-8 rounded-lg ${kpi.iconBg} flex items-center justify-center`}
                >
                  <kpi.icon className={`w-4 h-4 ${kpi.iconColor}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">
                {kpi.value}
              </p>
              <p className="text-xs text-gray-400">{kpi.sub}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Weekly attendance chart */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-700">
              Weekly Attendance
            </h2>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-3 w-8" />
                  <Skeleton className="h-6 flex-1 rounded-md" />
                  <Skeleton className="h-3 w-6" />
                </div>
              ))}
            </div>
          ) : data && data.weeklyData.length > 0 ? (
            <div className="space-y-2.5">
              {data.weeklyData.map((row) => (
                <BarChartRow
                  key={row.day}
                  label={row.day}
                  present={row.present}
                  late={row.late}
                  absent={row.absent}
                  max={maxBar}
                />
              ))}
            </div>
          ) : !loading ? (
            <div className="py-8 text-center">
              <BarChart2 className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-sm text-gray-400">No data for this period</p>
            </div>
          ) : null}

          {/* Legend */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
            {[
              { color: "bg-emerald-500", label: "Present" },
              { color: "bg-amber-400", label: "Late" },
              { color: "bg-gray-200", label: "Absent" },
            ].map((item) => (
              <span key={item.label} className="flex items-center gap-1.5 text-xs text-gray-500">
                <span className={`w-2.5 h-2.5 rounded-sm ${item.color} inline-block`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Summary stats */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="text-sm font-semibold text-gray-700 mb-5">
            Week Summary
          </h2>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          ) : data ? (
            <div className="space-y-4">
              {[
                {
                  label: "Total Clock-ins",
                  value: data.summary.totalClockInsThisWeek.toLocaleString(),
                  trend: "up",
                },
                {
                  label: "Payroll Hours",
                  value: `${data.summary.payrollHoursThisWeek.toLocaleString()}h`,
                  trend: "neutral",
                },
                {
                  label: "Attendance Rate",
                  value: `${data.summary.avgAttendanceRate}%`,
                  trend: "up",
                },
                {
                  label: "Overtime Hours",
                  value: `${data.summary.totalOvertimeHours}h`,
                  trend: "down",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    {item.trend === "up" && (
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                    )}
                    {item.trend === "down" && (
                      <TrendingDown className="w-3.5 h-3.5 text-red-400" />
                    )}
                    <span className="text-sm font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {/* Department breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">
            Department Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Department", "Employees", "Avg Hours", "Attendance", "Late Rate"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      {[1, 2, 3, 4, 5].map((j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-4 w-16" />
                        </td>
                      ))}
                    </tr>
                  ))
                : data?.departmentData.map((row) => (
                    <tr
                      key={row.department}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {row.department}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.employees}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.avgHours}h
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                row.attendance >= 95
                                  ? "bg-emerald-500"
                                  : row.attendance >= 85
                                  ? "bg-amber-400"
                                  : "bg-red-400"
                              }`}
                              style={{ width: `${row.attendance}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-700">
                            {row.attendance}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-sm font-medium ${
                            row.lateRate <= 5
                              ? "text-emerald-600"
                              : row.lateRate <= 10
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                        >
                          {row.lateRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {!loading && (!data || data.departmentData.length === 0) && !error && (
          <div className="text-center py-16 px-6 max-w-sm mx-auto">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart2 className="w-8 h-8 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              No attendance data yet
            </h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              Reports are generated automatically once employees start clocking
              in via your connected terminals.
            </p>
            <div className="space-y-2">
              <Link
                href="/dashboard/devices"
                className="flex items-center justify-between gap-3 p-3 rounded-xl border-2 border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100 transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                    <Monitor className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      Add a clocking terminal
                    </p>
                    <p className="text-xs text-gray-500">Start generating data</p>
                  </div>
                </div>
                <TrendingUp className="w-4 h-4 text-amber-400 group-hover:text-amber-600 transition-colors shrink-0" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Export actions */}
      <div className="mt-6 grid grid-cols-2 sm:flex sm:flex-wrap gap-3">
        {[
          "Payroll Export (CSV)",
          "Attendance Summary (PDF)",
          "Late Arrivals Report",
          "Overtime Report",
        ].map((label) => (
          <button
            key={label}
            className="inline-flex items-center justify-center gap-2 h-9 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
