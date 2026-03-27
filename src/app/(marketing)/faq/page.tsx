"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  // Billing
  {
    category: "Billing",
    q: "How does EvoTime Pro pricing work?",
    a: "EvoTime Pro is priced per employee per year. For up to 70 employees, the price is £15/employee/year. For 71 or more employees, it drops to £10/employee/year. All prices are ex-VAT. You choose from fixed employee bands (10, 20, 30... up to 300) and pay annually.",
  },
  {
    category: "Billing",
    q: "Is there a free trial?",
    a: "No — we do not offer a free trial. Our demo page shows you exactly what the software looks like before you buy, and our team is happy to talk you through it on the phone. We keep pricing clear and honest rather than locking you into a trial-to-paid funnel.",
  },
  {
    category: "Billing",
    q: "Can I cancel my EvoTime Pro subscription?",
    a: "Yes. EvoTime Pro is an annual subscription. If you choose not to renew at the end of the year, your subscription simply ends. There are no cancellation fees or minimum terms.",
  },
  {
    category: "Billing",
    q: "Do hardware terminals have ongoing fees?",
    a: "No. Hardware terminals are a one-off purchase. The basic EvoTime cloud software is free and included. EvoTime Pro is the optional paid upgrade with advanced features.",
  },
  {
    category: "Billing",
    q: "Do prices include VAT?",
    a: "No. All prices shown on our website are ex-VAT. VAT at 20% is added at checkout. We issue a full VAT invoice with every order.",
  },
  // Hardware
  {
    category: "Hardware",
    q: "What is the warranty on hardware terminals?",
    a: "All Clocking Systems hardware terminals carry a 3-year warranty. If a terminal develops a fault within 3 years of purchase, we will repair or replace it at no cost to you.",
  },
  {
    category: "Hardware",
    q: "How long does delivery take?",
    a: "We offer next day delivery on all hardware orders placed before 2pm on a working day. Orders placed after 2pm or on weekends will ship the next working day.",
  },
  {
    category: "Hardware",
    q: "Can I use the terminals without EvoTime software?",
    a: "No. Our terminals are designed to work with EvoTime cloud software. The hardware and software are tightly integrated to ensure accurate clocking data, real-time sync, and correct payroll calculation.",
  },
  {
    category: "Hardware",
    q: "Which terminal should I choose?",
    a: "For most offices and small businesses, the A124 Face, Fingerprint & Card (£295) is the most popular choice as it gives you maximum flexibility. If you only need card/fob clocking, the A124 Cards/Fobs (£275) is simpler and cheaper. For outdoor or harsh environments, choose the Outdoor IP65 (£395). Call us on 0113 258 7856 if you're unsure.",
  },
  {
    category: "Hardware",
    q: "Can I add more terminals later?",
    a: "Yes. You can add terminals at any time. Each additional terminal simply connects to the same EvoTime account and syncs with your existing data.",
  },
  // Software
  {
    category: "Software",
    q: "What is EvoTime Pro?",
    a: "EvoTime Pro is our cloud-based time and attendance management software. It lets you manage employee clocking data, configure shifts and pay classifications, plan leave, and export to payroll — all from a browser. It's the paid upgrade to the free EvoTime software included with hardware.",
  },
  {
    category: "Software",
    q: "Which payroll systems does EvoTime Pro integrate with?",
    a: "EvoTime Pro exports to Sage, QuickBooks, and other major UK payroll packages. Standard payroll CSV export is also available for any system.",
  },
  {
    category: "Software",
    q: "Can employees access EvoTime Pro?",
    a: "Yes. Employees can view their own timesheet, submit leave requests, and check their hours from any browser. Manager access is separate and controlled by you.",
  },
  {
    category: "Software",
    q: "Is the data secure?",
    a: "Yes. EvoTime Pro is GDPR compliant. Clocking data is stored securely in UK-based servers with regular backups. Biometric templates are stored on the device only, not in the cloud.",
  },
  // Setup
  {
    category: "Setup",
    q: "How long does installation take?",
    a: "Most businesses are up and running within 2 hours. Hardware installation involves mounting the terminal and connecting to your network (WiFi or Ethernet). Software setup involves adding employees and configuring shifts — we have online guides and video walkthroughs.",
  },
  {
    category: "Setup",
    q: "Do I need an IT person to set it up?",
    a: "No. Our systems are designed for non-technical users. If you can plug in a router, you can install our terminal. The software is entirely browser-based with no installation required.",
  },
  {
    category: "Setup",
    q: "Can I import our existing employee data?",
    a: "Yes. EvoTime Pro supports bulk employee import via CSV. You can import names, departments, employee numbers, and working patterns in one step.",
  },
  // Support
  {
    category: "Support",
    q: "What support is available?",
    a: "Phone and email support is available Monday to Friday, 9am–5pm. Our UK-based support team resolves 97% of tickets within 24 hours. We don't use overseas call centres.",
  },
  {
    category: "Support",
    q: "What is your phone number?",
    a: "0113 258 7856. Lines are open Monday–Friday, 9am–5pm.",
  },
];

const categories = ["All", "Billing", "Hardware", "Software", "Setup", "Support"];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-semibold text-[#0A1628] text-sm">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-5 text-sm text-gray-600 leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = faqs.filter((faq) => {
    const matchesCat = category === "All" || faq.category === category;
    const matchesSearch =
      !search ||
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-blue-200 text-lg mb-8">
            Everything you need to know about our products, pricing and support.
          </p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions..."
              className="w-full h-12 pl-11 pr-4 rounded-xl border-0 text-[#0A1628] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-[#2563EB] text-white shadow"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            No questions match your search. Try different keywords or{" "}
            <Link href="/contact" className="text-[#2563EB] hover:underline">contact us directly</Link>.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        )}

        {/* Still have questions */}
        <div className="mt-12 bg-[#F8F9FB] border border-gray-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#0A1628] mb-2">Still have questions?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Call us on <a href="tel:01132587856" className="font-semibold text-[#2563EB]">0113 258 7856</a> or send us a message — we&apos;ll reply within 1 business day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center h-11 px-8 rounded-lg text-sm font-semibold bg-[#0A1628] text-white hover:bg-[#1e3a5f] transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
}
