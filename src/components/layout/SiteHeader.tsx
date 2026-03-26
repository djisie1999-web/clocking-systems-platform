"use client";
import Link from "next/link";
import { useState } from "react";
import { Clock, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/compare", label: "Compare" },
  { href: "/roi-calculator", label: "ROI Calculator" },
  { href: "/demo", label: "Live Demo" },
  { href: "/blog", label: "Resources" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">Clocking Systems</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center h-8 rounded-md px-3 text-xs font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Book Demo
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center h-8 rounded-md px-3 text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link
              href="/demo"
              className="inline-flex items-center justify-center w-full h-10 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Book Demo
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center w-full h-10 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
