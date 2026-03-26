"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Factory,
  ShoppingBag,
  Heart,
  Coffee,
  HardHat,
  BookOpen,
  Check,
  Clock,
  User,
  ChevronRight,
  Calendar,
} from "lucide-react";

type Industry =
  | "manufacturing"
  | "retail"
  | "healthcare"
  | "hospitality"
  | "construction"
  | "education";

interface ClockEvent {
  name: string;
  time: string;
  status: "in" | "out" | "late";
  department: string;
}

const industries: { id: Industry; label: string; icon: React.ElementType; color: string }[] = [
  { id: "manufacturing", label: "Manufacturing", icon: Factory, color: "bg-blue-100 text-blue-700" },
  { id: "retail", label: "Retail", icon: ShoppingBag, color: "bg-purple-100 text-purple-700" },
  { id: "healthcare", label: "Healthcare", icon: Heart, color: "bg-rose-100 text-rose-700" },
  { id: "hospitality", label: "Hospitality", icon: Coffee, color: "bg-amber-100 text-amber-700" },
  { id: "construction", label: "Construction", icon: HardHat, color: "bg-orange-100 text-orange-700" },
  { id: "education", label: "Education", icon: BookOpen, color: "bg-emerald-100 text-emerald-700" },
];

const demoData: Record<Industry, { employees: number; presentToday: number; lateToday: number; events: ClockEvent[] }> = {
  manufacturing: {
    employees: 82,
    presentToday: 74,
    lateToday: 3,
    events: [
      { name: "Tom Walsh", time: "06:02", status: "in", department: "Assembly" },
      { name: "Sarah Green", time: "06:05", status: "in", department: "Packing" },
      { name: "Mike Peters", time: "06:18", status: "late", department: "Assembly" },
      { name: "Janet Brown", time: "14:01", status: "out", department: "Packing" },
      { name: "Dave King", time: "14:03", status: "out", department: "Dispatch" },
    ],
  },
  retail: {
    employees: 34,
    presentToday: 28,
    lateToday: 1,
    events: [
      { name: "Emma Wilson", time: "08:58", status: "in", department: "Shop Floor" },
      { name: "Luke Davies", time: "09:14", status: "late", department: "Stockroom" },
      { name: "Sophie Hall", time: "09:00", status: "in", department: "Tills" },
      { name: "Ben Carter", time: "13:00", status: "out", department: "Shop Floor" },
      { name: "Olivia Fox", time: "13:02", status: "out", department: "Tills" },
    ],
  },
  healthcare: {
    employees: 120,
    presentToday: 108,
    lateToday: 2,
    events: [
      { name: "Dr. Alice Moore", time: "07:45", status: "in", department: "Ward A" },
      { name: "Nurse James Reid", time: "07:58", status: "in", department: "Ward B" },
      { name: "Dr. Susan Park", time: "08:12", status: "late", department: "A&E" },
      { name: "Nurse Pat Young", time: "15:00", status: "out", department: "Ward A" },
      { name: "Porters Team", time: "15:05", status: "out", department: "Logistics" },
    ],
  },
  hospitality: {
    employees: 45,
    presentToday: 38,
    lateToday: 4,
    events: [
      { name: "Carlos Lopez", time: "11:00", status: "in", department: "Kitchen" },
      { name: "Mia Russo", time: "11:15", status: "late", department: "Front of House" },
      { name: "Tony Marsh", time: "11:00", status: "in", department: "Bar" },
      { name: "Leila Hassan", time: "16:00", status: "out", department: "Kitchen" },
      { name: "Dan Price", time: "16:05", status: "out", department: "Front of House" },
    ],
  },
  construction: {
    employees: 58,
    presentToday: 51,
    lateToday: 5,
    events: [
      { name: "Roy Jenkins", time: "07:01", status: "in", department: "Groundworks" },
      { name: "Phil Stone", time: "07:00", status: "in", department: "Steelwork" },
      { name: "Gary Cox", time: "07:32", status: "late", department: "Groundworks" },
      { name: "Mark Allen", time: "15:30", status: "out", department: "Roofing" },
      { name: "Lee Evans", time: "15:35", status: "out", department: "Steelwork" },
    ],
  },
  education: {
    employees: 96,
    presentToday: 90,
    lateToday: 1,
    events: [
      { name: "Mrs. K. Patel", time: "07:55", status: "in", department: "Science" },
      { name: "Mr. D. Scott", time: "08:00", status: "in", department: "Maths" },
      { name: "Ms. F. Clarke", time: "08:22", status: "late", department: "English" },
      { name: "Mr. A. Bell", time: "15:45", status: "out", department: "PE" },
      { name: "Mrs. L. Hunt", time: "15:50", status: "out", department: "Admin" },
    ],
  },
};

function StepIndicator({ step, current }: { step: number; current: number }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              s < current
                ? "bg-emerald-500 text-white"
                : s === current
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {s < current ? <Check className="w-4 h-4" /> : s}
          </div>
          {s < 3 && (
            <div
              className={`h-0.5 w-8 transition-colors ${
                s < current ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DemoPage() {
  const [step, setStep] = useState(1);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bestTime: "morning",
  });
  const [submitted, setSubmitted] = useState(false);

  const demo = selectedIndustry ? demoData[selectedIndustry] : null;

  return (
    <>
      <div className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Interactive Demo
          </h1>
          <p className="text-blue-200">
            See Clocking Systems in action for your industry — no sign-up required.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step indicator */}
        <div className="flex justify-center mb-10">
          <StepIndicator step={step} current={step} />
        </div>

        {/* Step 1: Choose Industry */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Which industry are you in?
            </h2>
            <p className="text-gray-500 text-center mb-8">
              We&apos;ll show you a dashboard tailored to your sector.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => {
                    setSelectedIndustry(ind.id);
                    setStep(2);
                  }}
                  className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedIndustry === ind.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl ${ind.color} flex items-center justify-center`}>
                    <ind.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {ind.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Simulated Dashboard */}
        {step === 2 && demo && selectedIndustry && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Your{" "}
              {industries.find((i) => i.id === selectedIndustry)?.label} Dashboard
            </h2>
            <p className="text-gray-500 text-center mb-8">
              This is what ClockSuite looks like for your business — live data, updated in real time.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Total Employees", value: demo.employees, color: "text-blue-600" },
                {
                  label: "Present Today",
                  value: demo.presentToday,
                  color: "text-emerald-600",
                },
                { label: "Late Today", value: demo.lateToday, color: "text-amber-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent clock events */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-700">
                  Recent Clock Events
                </span>
              </div>
              <div className="divide-y divide-gray-50">
                {demo.events.map((event, i) => (
                  <div key={i} className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {event.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {event.department}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{event.time}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          event.status === "in"
                            ? "bg-emerald-100 text-emerald-700"
                            : event.status === "out"
                            ? "bg-gray-100 text-gray-600"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {event.status === "in"
                          ? "Clocked In"
                          : event.status === "out"
                          ? "Clocked Out"
                          : "Late"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance bar */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="font-medium text-gray-700">Today&apos;s Attendance</span>
                <span className="text-gray-500">
                  {demo.presentToday}/{demo.employees} present
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{
                    width: `${Math.round((demo.presentToday / demo.employees) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((demo.presentToday / demo.employees) * 100)}% attendance rate
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStep(3)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
              >
                Book a Call to See More
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setStep(1)}
                className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                Try Another Industry
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Book a Call */}
        {step === 3 && !submitted && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
              Book a Free Demo Call
            </h2>
            <p className="text-gray-500 text-center mb-8">
              A product specialist will walk you through ClockSuite live and answer all your questions. No hard sell.
            </p>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Work Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jane@company.co.uk"
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="07700 123456"
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Best Time to Call
                </label>
                <select
                  value={formData.bestTime}
                  onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })}
                  className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="morning">Morning (9am–12pm)</option>
                  <option value="afternoon">Afternoon (12pm–5pm)</option>
                  <option value="anytime">Anytime</option>
                </select>
              </div>

              <button
                onClick={() => {
                  if (formData.name && formData.email) {
                    setSubmitted(true);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Book My Demo Call
              </button>
            </div>

            <p className="text-center text-sm text-gray-400 mt-4">
              Or{" "}
              <Link href="/products" className="text-blue-600 hover:underline">
                start a free trial
              </Link>{" "}
              — no credit card required
            </p>
          </div>
        )}

        {/* Submitted */}
        {step === 3 && submitted && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Demo Booked!
            </h2>
            <p className="text-gray-500 max-w-md mx-auto mb-8">
              Thank you, {formData.name}. We&apos;ll call you at your preferred time. You&apos;ll also receive a confirmation email at {formData.email}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
