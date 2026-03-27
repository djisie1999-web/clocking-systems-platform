import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Check,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  Package,
  Link2,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Clocking Systems — UK Time & Attendance Systems",
  description:
    "Time and attendance systems for UK businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier. Next day delivery. 3-year warranty.",
  openGraph: {
    title: "Clocking Systems — UK Time & Attendance Systems",
    description:
      "Time and attendance systems for UK businesses from 5 to 5,000 employees. Hardware, software and support all from one supplier.",
    url: "https://clockingsystems.co.uk",
    siteName: "Clocking Systems",
    locale: "en_GB",
    type: "website",
  },
};

const customerLogos = [
  { src: "/images/logos/nhs.svg", alt: "NHS" },
  { src: "/images/logos/dhl.svg", alt: "DHL" },
  { src: "/images/logos/starbucks.svg", alt: "Starbucks" },
  { src: "/images/logos/dpd.svg", alt: "DPD" },
  { src: "/images/logos/evri.svg", alt: "Evri" },
  { src: "/images/logos/post-office.svg", alt: "Post Office" },
  { src: "/images/logos/adecco.svg", alt: "Adecco" },
  { src: "/images/logos/stobart.svg", alt: "Eddie Stobart" },
];

const stats = [
  { value: "50,000+", label: "UK businesses" },
  { value: "4.8/5", label: "Trustpilot rating" },
  { value: "Next day", label: "delivery" },
  { value: "3-year", label: "warranty" },
];

const whyCards = [
  {
    icon: PhoneCall,
    color: "bg-emerald-100 text-emerald-600",
    title: "UK support that actually picks up",
    body: "Our helpdesk is rated best-in-class in the UK. Real people, real answers — not a ticket queue. Monday to Friday, 9am–5pm.",
    stat: "97% of tickets resolved within 24 hours",
    statColor: "text-emerald-600 border-emerald-600",
  },
  {
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-600",
    title: "Hardware built to last",
    body: "Every machine ships with a full 3-year warranty. If something goes wrong, we fix it — no quibbling, no small print.",
    stat: "3-year warranty on all hardware",
    statColor: "text-blue-600 border-blue-600",
  },
  {
    icon: Package,
    color: "bg-gray-100 text-[#0A1628]",
    title: "One supplier, everything included",
    body: "Hardware, software, setup guides, training and ongoing support — all from us. No third-party integrators or finger-pointing between vendors.",
    stat: "Everything under one roof",
    statColor: "text-[#0A1628] border-[#0A1628]",
  },
  {
    icon: Link2,
    color: "bg-purple-100 text-purple-600",
    title: "Connects to your payroll",
    body: "Export hours directly to Sage, QuickBooks, and other major UK payroll packages. One click, no manual entry, no errors.",
    stat: "Works with Sage, QuickBooks & more",
    statColor: "text-purple-600 border-purple-600",
  },
];

const caseStudies = [
  {
    image: "/images/case-studies/hirex.png",
    industry: "Manufacturing",
    industryColor: "bg-emerald-100 text-emerald-700",
    accentColor: "bg-emerald-500",
    title: "Eliminated manual timesheet calculations entirely",
    body: "Hirex needed a reliable system for 25 staff after payroll changes in 2017. EvoTime transformed how they track attendance and manage overtime.",
    href: "/case-studies",
  },
  {
    image: "/images/case-studies/wh-smith.png",
    industry: "Retail",
    industryColor: "bg-blue-100 text-blue-700",
    accentColor: "bg-blue-500",
    title: "Replaced a legacy system with zero downtime",
    body: "WH Smith needed a modern replacement for an aging time and attendance system. Migration was seamless and staff adoption was immediate.",
    href: "/case-studies",
  },
  {
    image: "/images/case-studies/industrious-people.png",
    industry: "Recruitment",
    industryColor: "bg-purple-100 text-purple-700",
    accentColor: "bg-purple-500",
    title: "Gained full visibility over a flexible temporary workforce",
    body: "As a recruitment agency supplying temporary workers to multiple clients, Industrious People needed real-time clocking visibility across sites.",
    href: "/case-studies",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-white pt-20 pb-20 md:pt-28 md:pb-28">
          {/* Dot grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: "radial-gradient(circle, #0A1628 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white rounded-full px-3 py-1 text-xs font-semibold mb-5">
                  <Star className="w-3 h-3 fill-current" />
                  Trusted by 50,000+ UK businesses
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-[56px] font-semibold text-[#0A1628] leading-[1.15] tracking-tight mb-5">
                  Track time. Cut admin. Pay people right.
                </h1>
                <p className="text-lg md:text-xl text-gray-500 mb-7 max-w-lg">
                  Time and attendance systems for UK businesses — from 5 to 5,000 employees. Hardware, software, and support all from one supplier.
                </p>

                {/* Trust items */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-9">
                  {[
                    "Free cloud software included",
                    "3-year warranty",
                    "UK-based support",
                    "Next day delivery",
                  ].map((item) => (
                    <span key={item} className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-[#2563EB] flex-shrink-0" strokeWidth={2.5} />
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg text-base font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] shadow transition-colors"
                  >
                    See pricing & buy
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-lg text-base font-semibold border-2 border-[#0A1628] text-[#0A1628] hover:bg-gray-50 transition-colors"
                  >
                    See a demo
                  </Link>
                </div>
              </div>

              {/* Right – stats grid */}
              <div className="hidden lg:grid grid-cols-2 gap-5">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm text-center"
                  >
                    <div className="text-4xl font-bold text-[#0A1628] mb-1">{s.value}</div>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGO BAR ────────────────────────────────────────────── */}
        <section className="bg-[#F8F9FB] border-t border-b border-gray-200 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
              Trusted by teams across the UK
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {customerLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="bg-gray-200 rounded-lg px-5 py-2.5 flex items-center justify-center h-[52px] min-w-[100px] opacity-55 hover:opacity-85 transition-opacity"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={100}
                    height={28}
                    className="h-7 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS OVERVIEW ───────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0A1628] tracking-tight mb-4">
                Find the right system for your business
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Three levels of time and attendance — from simple plug-and-play machines to full enterprise workforce management.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1 — EvoTime Hardware + Free Software */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                  <Package className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full px-3 py-0.5 mb-3 w-fit">
                  5–100 employees
                </span>
                <h3 className="text-xl font-semibold text-[#0A1628] mb-2">Hardware &amp; Free Cloud Software</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                  Plug-in proximity, fingerprint, or facial recognition terminals that connect to our free EvoTime cloud software. See who&apos;s in, track hours, manage leave — all from your browser.
                </p>
                <div className="text-3xl font-semibold text-[#0A1628] mb-1">From £275 + VAT</div>
                <div className="text-xs text-gray-400 mb-5">Complete boxed package, next day delivery</div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Free cloud software for life",
                    "Facial recognition & fingerprint options",
                    "DIY installation with online walkthrough",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0A1628]">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/hardware"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold bg-[#059669] text-white hover:bg-emerald-700 transition-colors w-full"
                >
                  View hardware terminals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 2 — EvoTime Pro (featured) */}
              <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col relative">
                <div className="absolute -top-px right-5 bg-[#2563EB] text-white text-[11px] font-semibold px-3 py-1 rounded-b-lg">
                  Most popular
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
                  </svg>
                </div>
                <span className="inline-flex items-center text-xs font-semibold bg-blue-100 text-blue-700 rounded-full px-3 py-0.5 mb-3 w-fit">
                  20–500 employees
                </span>
                <h3 className="text-xl font-semibold text-[#0A1628] mb-2">EvoTime Pro — Cloud Subscription</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                  A per-employee annual subscription giving you full cloud time and attendance, leave planning, payroll export, and real-time reporting. Scales as your team grows.
                </p>
                <div className="text-3xl font-semibold text-[#0A1628] mb-1">From £15/employee/year</div>
                <div className="text-xs text-gray-400 mb-5">No hardware contract required · ex-VAT</div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Payroll integration — Sage, QuickBooks & more",
                    "Leave planner included",
                    "Accessible anywhere, 24/7",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0A1628]">
                      <Check className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold bg-[#2563EB] text-white hover:bg-blue-700 transition-colors w-full"
                >
                  Buy EvoTime Pro
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card 3 — EcoTime Enterprise */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <span className="inline-flex items-center text-xs font-semibold bg-purple-100 text-purple-700 rounded-full px-3 py-0.5 mb-3 w-fit">
                  100–5,000 employees
                </span>
                <h3 className="text-xl font-semibold text-[#0A1628] mb-2">Enterprise Workforce Management</h3>
                <p className="text-sm text-gray-500 mb-6 flex-1">
                  Fully tailored, on-site installed and configured. Handles complex shift patterns, multi-site rotas, HR modules, visitor management, and mobile GPS clocking.
                </p>
                <div className="text-3xl font-semibold text-[#0A1628] mb-1">Bespoke pricing</div>
                <div className="text-xs text-gray-400 mb-5">Request a quote for your requirements</div>
                <ul className="space-y-2 mb-6">
                  {[
                    "Multi-site and multi-branch support",
                    "On-site installation & training",
                    "HR & visitor management modules",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#0A1628]">
                      <Check className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 h-11 rounded-lg text-sm font-semibold bg-[#7C3AED] text-white hover:bg-purple-700 transition-colors w-full"
                >
                  Get an enterprise quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ───────────────────────────────────────── */}
        <section className="py-20 bg-[#F8F9FB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0A1628] tracking-tight">
                Why 50,000 UK businesses choose us
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-7">
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-5`}>
                    <card.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0A1628] mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{card.body}</p>
                  <span className={`block text-sm font-semibold border-l-4 pl-3 ${card.statColor}`}>
                    {card.stat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ────────────────────────────────────────── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0A1628] tracking-tight mb-4">
                Real results from real businesses
              </h2>
              <p className="text-lg text-gray-500 max-w-xl mx-auto">
                See how UK businesses cut payroll admin and got visibility over their teams.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {caseStudies.map((cs) => (
                <article
                  key={cs.title}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group relative"
                >
                  <div className="h-40 overflow-hidden">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      width={400}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`inline-flex items-center text-xs font-semibold rounded-full px-2.5 py-0.5 mb-3 ${cs.industryColor}`}>
                      {cs.industry}
                    </span>
                    <h3 className="text-base font-semibold text-[#0A1628] mb-2">{cs.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{cs.body}</p>
                    <Link
                      href={cs.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] hover:gap-2.5 transition-all"
                    >
                      Read case study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`absolute bottom-0 left-0 w-0 h-0.5 ${cs.accentColor} group-hover:w-full transition-all duration-300`} />
                </article>
              ))}
            </div>

            {/* Trustpilot bar */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex gap-1" aria-label="5-star rating">
                {[1,2,3,4,5].map((i) => (
                  <span key={i} className="text-[#00B67A] text-2xl" aria-hidden>★</span>
                ))}
              </div>
              <span className="text-base font-semibold text-[#0A1628]">Excellent</span>
              <a
                href="https://www.trustpilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                See our Trustpilot reviews
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ── GET A QUOTE CTA ─────────────────────────────────────── */}
        <section className="py-20" style={{ background: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 100%)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-xs font-semibold px-3.5 py-1 rounded-full mb-5">
                  Free consultation
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">
                  Not sure which system you need?
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Tell us your team size and we&apos;ll recommend the right solution. No hard sell — just honest advice from people who know time and attendance.
                </p>
                <a
                  href="tel:01132587856"
                  className="flex items-center gap-3 text-white hover:text-blue-200 transition-colors mb-2"
                >
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  <span className="text-3xl font-semibold">0113 258 7856</span>
                </a>
                <p className="text-sm text-white/50">Or email us — we respond within 1 business day</p>
              </div>

              <div className="bg-white rounded-2xl p-7">
                <h3 className="text-lg font-semibold text-[#0A1628] mb-5">Get a free quote</h3>
                <form action="/contact" method="GET" className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Company name</label>
                    <input
                      type="text"
                      name="company"
                      placeholder="Your company name"
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Number of employees</label>
                    <select
                      name="employees"
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a range</option>
                      <option>1–10</option>
                      <option>11–50</option>
                      <option>51–200</option>
                      <option>201–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Your email address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@company.co.uk"
                      className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Link
                    href="/contact"
                    className="block w-full h-12 rounded-lg bg-[#0A1628] text-white text-base font-semibold flex items-center justify-center hover:bg-[#1e3a5f] transition-colors"
                  >
                    Get my free quote →
                  </Link>
                  <p className="text-xs text-gray-400 text-center">No commitment. We&apos;ll get back to you within 1 business day.</p>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </div>
  );
}
