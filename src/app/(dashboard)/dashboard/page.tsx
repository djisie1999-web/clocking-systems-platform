import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Clock,
  Users,
  Activity,
  CheckCircle,
  BarChart2,
  Settings,
  UserPlus,
  Monitor,
  ArrowRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { OnboardingBanner } from "@/components/onboarding/OnboardingWizard";

export const metadata = {
  title: "Dashboard | Clocking Systems",
};

const mockActivity = [
  { name: "Tom Walsh", action: "Clocked In", time: "2 min ago", dept: "Assembly" },
  { name: "Sarah Green", action: "Clocked Out", time: "5 min ago", dept: "Packing" },
  { name: "Mike Peters", action: "Clocked In (Late)", time: "12 min ago", dept: "Assembly" },
  { name: "Janet Brown", action: "Clocked Out", time: "18 min ago", dept: "Office" },
  { name: "Dave King", action: "Clocked In", time: "24 min ago", dept: "Dispatch" },
];

const quickActions = [
  { label: "Add Device", href: "/dashboard/devices", icon: Monitor, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
  { label: "Add Employee", href: "/dashboard/employees", icon: UserPlus, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
  { label: "View Reports", href: "/dashboard/reports", icon: BarChart2, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
  { label: "Settings", href: "/settings", icon: Settings, color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
];

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const stats = [
    {
      label: "Total Devices",
      value: "3",
      icon: Clock,
      color: "bg-blue-50 text-blue-600",
      change: "+1 this month",
    },
    {
      label: "Active Employees",
      value: "47",
      icon: Users,
      color: "bg-emerald-50 text-emerald-600",
      change: "+3 this month",
    },
    {
      label: "Clock-ins Today",
      value: "38",
      icon: Activity,
      color: "bg-purple-50 text-purple-600",
      change: "82% attendance",
    },
    {
      label: "System Status",
      value: "Online",
      icon: CheckCircle,
      color: "bg-emerald-50 text-emerald-600",
      change: "99.9% uptime",
    },
  ];

  return (
    <div className="max-w-6xl">
      {/* Onboarding banner — appears for users who dismissed the wizard without completing */}
      <OnboardingBanner />

      <div className="p-4 sm:p-6 lg:p-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 mb-8 text-white">
        <h1 className="text-2xl font-bold mb-1">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-blue-100 text-sm">
          {user.role === "ADMIN" ? "Administrator" : "User"} account ·{" "}
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/dashboard/reports"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg"
          >
            <BarChart2 className="w-4 h-4" />
            View Reports
          </Link>
          <Link
            href="/dashboard/employees"
            className="inline-flex items-center gap-1.5 text-sm font-medium bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg"
          >
            <Users className="w-4 h-4" />
            Manage Employees
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">
                Recent Activity
              </span>
            </div>
            <Link
              href="/dashboard/reports"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              View all
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {mockActivity.map((item, i) => (
              <div key={i} className="px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">{item.dept}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      item.action.includes("Late")
                        ? "bg-amber-100 text-amber-700"
                        : item.action.includes("In")
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.action}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              System Health
            </h3>
            <div className="space-y-3">
              {[
                { label: "Devices Online", value: 3, max: 3, color: "bg-emerald-500" },
                { label: "API Status", value: 100, max: 100, color: "bg-emerald-500" },
                { label: "Sync Status", value: 100, max: 100, color: "bg-emerald-500" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600">{item.label}</span>
                    <span className="font-medium text-gray-900">
                      {item.label === "Devices Online"
                        ? `${item.value}/${item.max}`
                        : `${item.value}%`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${(item.value / item.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600">
              <CheckCircle className="w-3.5 h-3.5" />
              All systems operational
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg text-center transition-colors ${action.color}`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin section */}
      {user.role === "ADMIN" && (
        <div className="bg-white rounded-xl border border-blue-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                Admin Overview
              </h3>
            </div>
            <Link
              href="/admin"
              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
            >
              Admin Panel
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Users", value: "1" },
              { label: "Admin Accounts", value: "1" },
              { label: "Active Sessions", value: "1" },
              { label: "Last Login", value: "Now" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
