import Link from "next/link";
import {
  Clock,
  Shield,
  BarChart2,
  Smartphone,
  Zap,
  Users,
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Globe,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FAQAccordion } from "@/components/home/FAQAccordion";

export const metadata = {
  title: "Clocking Systems — UK Time & Attendance System",
  description:
    "The UK's most trusted time & attendance solution. Biometric terminals, cloud software, and payroll integrations for businesses of all sizes. From £149.",
};

const features = [
  {
    icon: Shield,
    title: "Biometric Security",
    description:
      "Eliminate buddy punching with fingerprint or facial recognition. 100% accurate identity verification.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Globe,
    title: "Cloud Dashboard",
    description:
      "Access your time and attendance data from anywhere, on any device. Real-time reporting.",
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: BarChart2,
    title: "Payroll Integration",
    description:
      "Connect directly to Xero, Sage, QuickBooks, and more. Eliminate manual data entry.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Zap,
    title: "Real-time Alerts",
    description:
      "Get notified instantly of late arrivals, unexpected absences, and overtime thresholds.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Employees can clock in from their phone with GPS verification. Perfect for remote teams.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: Phone,
    title: "UK-Based Support",
    description:
      "Talk to a real person. Our UK support team is available by phone and email every business day.",
    color: "bg-purple-50 text-purple-600",
  },
];

const testimonials = [
  {
    quote:
      "We were losing around £2,000 a month to buddy punching before we installed the biometric terminals. It paid for itself in six weeks. The ClockSuite dashboard is genuinely brilliant.",
    name: "Mark Thompson",
    company: "Thompson Engineering Ltd",
    industry: "Manufacturing",
    rating: 5,
  },
  {
    quote:
      "The Xero integration alone was worth the switch. Payroll used to take me half a day — now it takes twenty minutes. The support team were incredibly helpful during setup.",
    name: "Claire Watson",
    company: "Watson Care Homes",
    industry: "Healthcare",
    rating: 5,
  },
  {
    quote:
      "We have six retail sites and the multi-site dashboard gives us a complete view of attendance across all of them. It's transformed how we manage staffing during busy periods.",
    name: "James O'Brien",
    company: "O'Brien Retail Group",
    industry: "Retail",
    rating: 5,
  },
];

const industries = [
  "Manufacturing",
  "Healthcare",
  "Retail",
  "Hospitality",
  "Construction",
  "Education",
];

const pricingPlans = [
  {
    name: "ClockSuite Basic",
    price: "£49",
    interval: "/month",
    description: "Perfect for small teams",
    features: [
      "Up to 25 employees",
      "Cloud dashboard",
      "Payroll CSV export",
      "Email support",
    ],
    cta: "Get Started",
    href: "/products/clocksuite-basic",
    highlight: false,
  },
  {
    name: "ClockSuite Professional",
    price: "£99",
    interval: "/month",
    description: "Most popular for growing businesses",
    features: [
      "Up to 100 employees",
      "Multi-site management",
      "Xero, Sage & QuickBooks",
      "Priority support",
    ],
    cta: "Get Started",
    href: "/products/clocksuite-professional",
    highlight: true,
  },
  {
    name: "ClockSuite Enterprise",
    price: "£249",
    interval: "/month",
    description: "Unlimited scale, dedicated support",
    features: [
      "Unlimited employees",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 support + SLA",
    ],
    cta: "Contact Sales",
    href: "/demo",
    highlight: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Trusted by 500+ UK Businesses
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                The UK&apos;s Most Trusted Time &amp; Attendance System
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                Stop losing money to paper timesheets and buddy punching. Install in minutes, integrate with payroll, and save an average of{" "}
                <strong className="text-white">£12,400 per year</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-white text-blue-700 hover:bg-blue-50 shadow transition-colors"
                >
                  Shop Now — from £149
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border-2 border-white/40 text-white hover:bg-white/10 transition-colors"
                >
                  Try Live Demo
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  { icon: CheckCircle, text: "500+ businesses" },
                  { icon: CheckCircle, text: "99.9% uptime" },
                  { icon: CheckCircle, text: "UK-based support" },
                  { icon: CheckCircle, text: "GDPR compliant" },
                ].map((badge) => (
                  <div
                    key={badge.text}
                    className="flex items-center gap-2 text-sm text-blue-100"
                  >
                    <badge.icon className="w-4 h-4 text-emerald-400" />
                    {badge.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Bar */}
        <section className="bg-gray-50 border-y border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 mb-6">
              Trusted across all industries
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {industries.map((industry) => (
                <div
                  key={industry}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem → Solution */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Problem */}
              <div>
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                  The Problem
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Still using paper timesheets?
                </h2>
                <div className="space-y-4">
                  {[
                    "Hours lost processing timesheets manually every week",
                    "Buddy punching costing 1.5–2% of your payroll",
                    "Payroll errors leading to disputes and overpayments",
                    "No real-time visibility of who's actually in the building",
                    "Non-compliance with Working Time Regulations",
                  ].map((pain) => (
                    <div
                      key={pain}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-red-500 text-xs font-bold">✕</span>
                      </div>
                      {pain}
                    </div>
                  ))}
                </div>
              </div>
              {/* Solution */}
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-sm font-medium mb-4">
                  The Solution
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Switch to Clocking Systems
                </h2>
                <div className="space-y-4">
                  {[
                    "Automated timesheets — zero manual processing",
                    "Biometric terminals that make buddy punching impossible",
                    "Direct payroll integration — accurate to the minute",
                    "Real-time dashboard showing attendance across all sites",
                    "Full audit trail for Working Time compliance",
                  ].map((solution) => (
                    <div
                      key={solution}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {solution}
                    </div>
                  ))}
                </div>
                <Link
                  href="/roi-calculator"
                  className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Calculate your savings
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products Overview */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Hardware &amp; Software That Work Together
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Whether you need a single RFID terminal for a small team or an enterprise-wide biometric system, we have a solution to fit.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  label: "Hardware",
                  title: "TimeClock Terminals",
                  desc: "Biometric fingerprint, facial recognition, or RFID. From £149. 2-year warranty.",
                  href: "/products?category=hardware",
                  color: "bg-blue-600",
                  icon: Clock,
                  price: "From £149",
                },
                {
                  label: "Software",
                  title: "ClockSuite Cloud",
                  desc: "Cloud dashboard, payroll integrations, and real-time reporting. No IT required.",
                  href: "/products?category=software",
                  color: "bg-indigo-600",
                  icon: BarChart2,
                  price: "From £49/mo",
                },
                {
                  label: "Bundle",
                  title: "Starter Bundles",
                  desc: "Hardware + software combined at a discounted price. Everything you need in one order.",
                  href: "/products?category=bundle",
                  color: "bg-emerald-600",
                  icon: TrendingUp,
                  price: "From £349",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className={`${item.color} p-8 flex items-center justify-center`}>
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-blue-600">{item.price}</span>
                      <Link
                        href={item.href}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        View all
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Everything you need. Nothing you don&apos;t.
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Built specifically for UK businesses — from single-site SMEs to multi-location enterprises.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Teaser */}
        <section className="py-20 bg-blue-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="text-5xl font-bold text-white mb-4">£12,400</div>
              <p className="text-xl text-blue-100 mb-6">
                Average annual saving reported by our customers
              </p>
              <p className="text-blue-200 mb-8">
                Through reduced admin time, eliminated buddy punching, and better overtime management. Most businesses achieve full payback within 90 days.
              </p>
              <Link
                href="/roi-calculator"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-white text-blue-700 hover:bg-blue-50 shadow transition-colors"
              >
                Calculate My Savings
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by UK businesses
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <blockquote className="text-sm text-gray-600 leading-relaxed mb-4">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t.company} · {t.industry}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                No setup fees. No long-term contracts. Cancel any time. Hardware sold separately.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border p-6 ${
                    plan.highlight
                      ? "border-blue-600 shadow-lg shadow-blue-100 bg-white"
                      : "border-gray-200 bg-white shadow-sm"
                  } relative`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div className="text-sm font-medium text-gray-500 mb-1">
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-sm text-gray-400">{plan.interval}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-5">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block text-center w-full h-10 rounded-lg text-sm font-medium inline-flex items-center justify-center transition-colors ${
                      plan.highlight
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-gray-400 mt-6">
              Need hardware too?{" "}
              <Link href="/products?category=bundle" className="text-blue-600 hover:underline">
                View bundles from £349
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
            </div>
            <FAQAccordion />
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Start saving today
            </h2>
            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
              Join 500+ UK businesses that have switched to Clocking Systems. Get set up in under 2 hours, or book a free demo with our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
              >
                Shop Now — from £149
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                <Users className="w-4 h-4" />
                Book a Free Demo
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
