"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Monitor,
  Users,
  UserCheck,
  HardHat,
  BarChart2,
  CreditCard,
  Bell,
  Settings,
  HelpCircle,
  Tablet,
  Shield,
} from "lucide-react";

// ─── Nav item definitions ─────────────────────────────────────────────────────

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/devices", label: "Devices", icon: Monitor },
  { href: "/dashboard/employees", label: "Employees", icon: Users },
  { href: "/dashboard/visitors", label: "Visitors", icon: UserCheck },
  { href: "/dashboard/contractors", label: "Contractors", icon: HardHat },
  { href: "/dashboard/reports", label: "Reports", icon: BarChart2 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Help", icon: HelpCircle },
  { href: "/kiosk", label: "Kiosk", icon: Tablet },
] as const;

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Users", icon: Shield },
  { href: "/team", label: "Team", icon: Users },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isNavActive(pathname: string, href: string): boolean {
  // Dashboard is exact-match only so /dashboard/devices doesn't highlight it
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

// ─── SidebarNav ───────────────────────────────────────────────────────────────

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon
              className={cn(
                "w-4 h-4 shrink-0",
                active ? "text-blue-600" : "text-gray-400"
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

// ─── SidebarAdminNav ──────────────────────────────────────────────────────────

export function SidebarAdminNav() {
  const pathname = usePathname();

  return (
    <>
      <div className="pt-4 pb-1 px-3">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Admin
        </span>
      </div>
      {ADMIN_NAV_ITEMS.map((item) => {
        const active = isNavActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon
              className={cn(
                "w-4 h-4 shrink-0",
                active ? "text-blue-600" : "text-gray-400"
              )}
            />
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
