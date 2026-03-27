"use client";
import { useState } from "react";
import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";

// Note: metadata export won't work in client components — moved to a wrapper
// This page keeps its client interactivity for the form.

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-blue-200 text-lg max-w-xl">
            Get in touch for a free quote, product advice, or technical support. Real people, real answers.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0A1628] mb-3">Message sent!</h2>
                <p className="text-gray-500 max-w-md mx-auto">
                  Thank you, {form.name}. We&apos;ll get back to you within 1 business day. If you need an immediate response, call us on{" "}
                  <a href="tel:01132587856" className="text-[#2563EB] font-semibold">0113 258 7856</a>.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-[#0A1628] mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Full name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Email address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane@company.co.uk"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Company name</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="Acme Ltd"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="07700 123456"
                        className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Number of employees</label>
                    <select
                      value={form.employees}
                      onChange={(e) => setForm({ ...form, employees: e.target.value })}
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
                    <label className="block text-sm font-semibold text-[#0A1628] mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you need — team size, type of clocking, any specific requirements..."
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full h-12 rounded-lg bg-[#0A1628] text-white text-base font-semibold hover:bg-[#1e3a5f] transition-colors"
                  >
                    Send message →
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    No commitment. We&apos;ll respond within 1 business day.
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-[#F8F9FB] border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-[#0A1628] mb-5">Get in touch</h3>
              <div className="space-y-4">
                <a href="tel:01132587856" className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Phone</div>
                    <div className="text-sm font-semibold text-[#0A1628] group-hover:text-[#2563EB] transition-colors">0113 258 7856</div>
                  </div>
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Email</div>
                    <div className="text-sm font-semibold text-[#0A1628]">hello@clockingsystems.co.uk</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Address</div>
                    <div className="text-sm text-[#0A1628]">Leeds, West Yorkshire<br />United Kingdom</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Hours</div>
                    <div className="text-sm text-[#0A1628]">Monday–Friday<br />9:00am – 5:00pm</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-sm text-emerald-800">
              <strong>97% of tickets resolved within 24 hours.</strong> Our UK-based support team picks up the phone — no overseas call centres, no ticket queues.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
