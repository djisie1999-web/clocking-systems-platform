"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/demo", label: "Demo" },
  { href: "/shop", label: "Pricing" },
  { href: "/hardware", label: "Hardware" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/images/logos/cs_logo.svg"
              alt="Clocking Systems Limited"
              width={160}
              height={40}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-[#0A1628] hover:text-[#2563EB] hover:bg-blue-50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:01132587856"
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0A1628] hover:text-[#2563EB] transition-colors"
            >
              <Phone className="w-4 h-4" />
              0113 258 7856
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center h-9 rounded-lg px-4 text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] shadow transition-colors"
            >
              Buy Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-semibold text-[#0A1628] hover:bg-gray-100 rounded-lg"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="tel:01132587856"
              className="flex items-center justify-center gap-2 w-full h-10 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-[#0A1628] hover:bg-gray-50 shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              0113 258 7856
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center w-full h-10 rounded-lg text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] shadow transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Buy Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
