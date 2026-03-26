"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function DashboardShell({
  sidebar,
  topBanner,
  children,
}: {
  sidebar: React.ReactNode;
  topBanner?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — off-screen on mobile, always visible on lg+ */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col shrink-0",
          "transition-transform duration-200 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0",
        ].join(" ")}
      >
        {/* Close button visible only on mobile */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
          className="absolute top-3 right-3 w-8 h-8 lg:hidden inline-flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
        {sidebar}
      </aside>

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top-bar — hidden on lg+ */}
        <header className="lg:hidden h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 shrink-0 sticky top-0 z-10">
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            className="w-9 h-9 inline-flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              {/* Clock icon */}
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">CS Platform</span>
          </div>
        </header>

        {topBanner}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
