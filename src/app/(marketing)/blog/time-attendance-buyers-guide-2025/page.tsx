import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Time & Attendance Systems: Buyer's Guide 2025 (UK) — Clocking Systems",
  description:
    "Everything UK businesses need to know when buying a time and attendance system in 2025. Hardware types, software features, pricing, and what questions to ask.",
  openGraph: {
    title: "Time & Attendance Systems Buyer's Guide 2025 — UK",
    description: "A plain-English guide to buying time & attendance for UK businesses. Hardware, software, pricing, and pitfalls.",
    type: "article",
  },
};

const checklist = [
  "What are my contracted working hours and overtime rules?",
  "Do I need biometric clocking, or will card/fob suffice?",
  "Do I have multiple sites or just one?",
  "Which payroll software am I using, and does the system integrate?",
  "Do I need employees to be able to request leave from the system?",
  "What is my approximate employee count now and in 12 months?",
  "Do any employees work outdoors or in harsh environments?",
  "What is my budget — hardware and ongoing software subscription?",
];

export default function BuyersGuideArticle() {
  return (
    <>
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
          <span className="text-xs font-semibold bg-emerald-600 rounded-full px-3 py-1 mb-4 inline-block">Buyer Guide</span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Time &amp; Attendance Systems: Buyer&apos;s Guide 2025 (UK)
          </h1>
          <div className="text-blue-200 text-sm">
            Published February 2025 · 10 min read · By Clocking Systems
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
          <p className="text-lg">
            Buying a time and attendance system is one of those decisions that feels bigger than it needs to be. This guide cuts through the noise and tells you exactly what to look for, what to avoid, and how to make the right choice for your business in 2025.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Step 1: Understand what you actually need</h2>
          <p>
            Most businesses buy more system than they need because salespeople push the most expensive option. Start with your requirements:
          </p>
          <ul>
            <li><strong>Team size:</strong> 5–20 employees? A single terminal and basic cloud software is all you need. 50–200? Think about multi-department reporting and shift management. 200+? You&apos;re in enterprise territory — expect bespoke pricing.</li>
            <li><strong>Clocking method:</strong> Card/fob is simplest and cheapest. Fingerprint eliminates buddy punching. Facial recognition is fastest for large teams. Don&apos;t pay for biometrics if you don&apos;t need them.</li>
            <li><strong>Payroll integration:</strong> If you&apos;re on Sage or QuickBooks, make sure the system integrates directly. Manual export via CSV is always a fallback but adds admin.</li>
            <li><strong>Leave management:</strong> Do you need employees to request leave through the system, or will you manage this separately? Most modern T&A software includes it.</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0A1628]">Step 2: Hardware — what are your options?</h2>
          <p>
            Hardware terminals fall into a few clear categories:
          </p>
          <div className="bg-[#F8F9FB] rounded-xl p-5 space-y-3 my-4">
            <div className="text-sm"><strong>Card/fob only (from £275):</strong> Employees tap a card or fob. Fast, simple, GDPR-straightforward. Best for low-risk environments or where biometrics are unwanted.</div>
            <div className="text-sm"><strong>Fingerprint + card (from £275):</strong> Eliminates buddy punching with fingerprint verification. The most common choice for small-medium businesses.</div>
            <div className="text-sm"><strong>Face recognition (from £295):</strong> Fastest for large groups. Contactless, hygienic. Works in under 1 second.</div>
            <div className="text-sm"><strong>Palm vein (from £375):</strong> Highest accuracy, fully contactless. Used in healthcare and high-security environments.</div>
            <div className="text-sm"><strong>Outdoor/weatherproof (from £395):</strong> IP65 rated for construction sites, car parks, external entrances.</div>
          </div>
          <p>
            A 3-year warranty should be standard. Be wary of suppliers who offer 1-year only or charge extra for extended cover.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Step 3: Software — what to look for</h2>
          <p>
            The hardware is only half the story. The software is where you spend every day. Key features to require:
          </p>
          <ul>
            <li>Real-time dashboard showing who&apos;s in, who&apos;s out, who&apos;s late</li>
            <li>Configurable shift patterns — fixed, rotating, flexible</li>
            <li>Pay classifications — normal time, overtime rates, bank holiday rules</li>
            <li>Leave management with employee self-service</li>
            <li>Payroll export to your existing software</li>
            <li>Audit trail — every clocking event recorded with timestamp</li>
            <li>Multi-site support if you have more than one location</li>
          </ul>

          <h2 className="text-2xl font-bold text-[#0A1628]">Step 4: Pricing models explained</h2>
          <p>
            There are three main pricing models in the market:
          </p>
          <p>
            <strong>Per-employee annual subscription:</strong> You pay a fixed amount per employee per year. Predictable, scales with your team. EvoTime Pro uses this model: £15/employee/year up to 70, £10 above that.
          </p>
          <p>
            <strong>Flat monthly fee:</strong> One price regardless of team size. Can be good value for large teams, expensive for small ones. Watch for tiered bands — the &ldquo;flat&rdquo; fee jumps at employee thresholds.
          </p>
          <p>
            <strong>Free software with hardware purchase:</strong> Hardware is the revenue, software is included free. This is what we offer with our basic EvoTime cloud software — you buy the terminal, software is free.
          </p>

          <h2 className="text-2xl font-bold text-[#0A1628]">Buyer&apos;s checklist</h2>
          <div className="bg-[#F8F9FB] rounded-xl p-6 my-4">
            <div className="space-y-3">
              {checklist.map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#0A1628]">Red flags to avoid</h2>
          <ul>
            <li>Long minimum contract terms (18–24 months) — most modern systems are month-to-month or annual with no lock-in</li>
            <li>No UK support — overseas call centres are a real problem when you have a payroll deadline tomorrow</li>
            <li>Setup fees or training charges — installation should be DIY from a walkthrough guide</li>
            <li>Proprietary cards and fobs — you should be able to buy standard 125kHz RFID cards from anyone</li>
            <li>No free trial or demo — if they won&apos;t show you the software before you buy, ask why</li>
          </ul>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 my-8">
            <h3 className="text-lg font-bold text-[#0A1628] mb-2">Still not sure? Ask us.</h3>
            <p className="text-sm text-gray-600 mb-4">
              We&apos;ve helped thousands of UK businesses choose the right system. Call us — 30 seconds on the phone is worth 30 minutes of research.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="tel:01132587856" className="inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] transition-colors">
                0113 258 7856
              </a>
              <Link href="/shop" className="inline-flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
                See pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
