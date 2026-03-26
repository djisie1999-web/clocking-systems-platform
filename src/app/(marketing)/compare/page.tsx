import { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Compare Time & Attendance Plans | Clocking Systems",
  description:
    "Compare ClockSuite Basic, Professional, and Enterprise plans side by side. See which hardware terminal is right for your business.",
};

const softwareFeatures = [
  { label: "Employees included", basic: "Up to 25", pro: "Up to 100", enterprise: "Unlimited" },
  { label: "Sites / locations", basic: "1", pro: "Unlimited", enterprise: "Unlimited" },
  { label: "Cloud dashboard", basic: true, pro: true, enterprise: true },
  { label: "Mobile app", basic: true, pro: true, enterprise: true },
  { label: "Automated timesheets", basic: true, pro: true, enterprise: true },
  { label: "Absence & leave management", basic: true, pro: true, enterprise: true },
  { label: "Payroll CSV export", basic: true, pro: true, enterprise: true },
  { label: "Xero / Sage / QuickBooks", basic: false, pro: true, enterprise: true },
  { label: "Custom shift patterns", basic: false, pro: true, enterprise: true },
  { label: "Overtime calculations", basic: false, pro: true, enterprise: true },
  { label: "Advanced analytics", basic: false, pro: true, enterprise: true },
  { label: "REST API access", basic: false, pro: true, enterprise: true },
  { label: "SSO (SAML / Azure AD)", basic: false, pro: false, enterprise: true },
  { label: "Custom integrations", basic: false, pro: false, enterprise: true },
  { label: "Dedicated account manager", basic: false, pro: false, enterprise: true },
  { label: "Full audit logs", basic: false, pro: false, enterprise: true },
  { label: "99.9% uptime SLA", basic: false, pro: false, enterprise: true },
  { label: "Support", basic: "Email", pro: "Phone + Email", enterprise: "24/7 Priority" },
  { label: "Data retention", basic: "2 years", pro: "5 years", enterprise: "Unlimited" },
  { label: "Price per month", basic: "£49", pro: "£99", enterprise: "£249" },
];

const hardwareFeatures = [
  { label: "Technology", m100: "RFID Card", x200: "Fingerprint", f500: "Face Recognition" },
  { label: "Contact-free operation", m100: false, x200: false, f500: true },
  { label: "Eliminates buddy punching", m100: false, x200: true, f500: true },
  { label: "Recognition speed", m100: "< 1 sec", x200: "< 0.5 sec", f500: "< 0.5 sec" },
  { label: "Employee capacity", m100: "1,000", x200: "3,000", f500: "10,000" },
  { label: "Transaction log", m100: "50,000", x200: "100,000", f500: "500,000" },
  { label: "Display", m100: '2.4" LCD', x200: '2.8" Colour TFT', f500: '4.3" Colour IPS' },
  { label: "WiFi connectivity", m100: false, x200: true, f500: true },
  { label: "Ethernet connectivity", m100: true, x200: true, f500: true },
  { label: "4G connectivity", m100: false, x200: false, f500: true },
  { label: "Works offline", m100: true, x200: true, f500: true },
  { label: "RFID backup", m100: true, x200: true, f500: false },
  { label: "Warranty", m100: "1 year", x200: "2 years", f500: "3 years" },
  { label: "Price", m100: "£149", x200: "£299", f500: "£499" },
];

type CellValue = string | boolean;

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return (
      <div className="flex justify-center">
        <Check className="w-5 h-5 text-emerald-500" />
      </div>
    );
  if (value === false)
    return (
      <div className="flex justify-center">
        <X className="w-4 h-4 text-gray-300" />
      </div>
    );
  return <span className="text-sm text-gray-700">{value}</span>;
}

export default function ComparePage() {
  return (
    <>
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Compare Plans</h1>
          <p className="text-gray-300 max-w-2xl">
            Side-by-side comparison of all ClockSuite software tiers and hardware terminals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Software Comparison */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Software Plans
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-16">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/3">
                  Feature
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-900">
                    ClockSuite Basic
                  </div>
                  <div className="text-lg font-bold text-gray-900">£49/mo</div>
                </th>
                <th className="px-5 py-4 text-center bg-blue-50 relative">
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-1">
                    <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-blue-800">
                    ClockSuite Professional
                  </div>
                  <div className="text-lg font-bold text-blue-900">£99/mo</div>
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-900">
                    ClockSuite Enterprise
                  </div>
                  <div className="text-lg font-bold text-gray-900">£249/mo</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {softwareFeatures.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">
                    {row.label}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.basic} />
                  </td>
                  <td className="px-5 py-3 text-center bg-blue-50/30">
                    <Cell value={row.pro} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.enterprise} />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="px-5 py-4"></td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/products/clocksuite-basic"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Choose Basic
                  </Link>
                </td>
                <td className="px-5 py-4 text-center bg-blue-50/30">
                  <Link
                    href="/products/clocksuite-professional"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
                  >
                    Choose Professional
                  </Link>
                </td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/demo"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Contact Sales
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Hardware Comparison */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Hardware Terminals
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-sm font-medium text-gray-500 bg-gray-50 w-1/3">
                  Specification
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-900">
                    TimeClock Lite M100
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">Best Value</div>
                  <div className="text-lg font-bold text-gray-900">£149</div>
                </th>
                <th className="px-5 py-4 text-center bg-blue-50">
                  <div className="text-sm font-semibold text-blue-800">
                    TimeClock Pro X200
                  </div>
                  <div className="text-xs text-blue-600 font-medium">Best Seller</div>
                  <div className="text-lg font-bold text-blue-900">£299</div>
                </th>
                <th className="px-5 py-4 text-center bg-gray-50">
                  <div className="text-sm font-semibold text-gray-900">
                    TimeClock Elite F500
                  </div>
                  <div className="text-xs text-purple-600 font-medium">Premium</div>
                  <div className="text-lg font-bold text-gray-900">£499</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {hardwareFeatures.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  <td className="px-5 py-3 text-sm text-gray-700 font-medium">
                    {row.label}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.m100} />
                  </td>
                  <td className="px-5 py-3 text-center bg-blue-50/30">
                    <Cell value={row.x200} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <Cell value={row.f500} />
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 border-t border-gray-200">
                <td className="px-5 py-4"></td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/products/timeclock-lite-m100"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Buy M100
                  </Link>
                </td>
                <td className="px-5 py-4 text-center bg-blue-50/30">
                  <Link
                    href="/products/timeclock-pro-x200"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
                  >
                    Buy X200
                  </Link>
                </td>
                <td className="px-5 py-4 text-center">
                  <Link
                    href="/products/timeclock-elite-f500"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
                  >
                    Buy F500
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Not sure which to choose?
          </p>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors"
          >
            Talk to a Product Specialist
          </Link>
        </div>
      </div>
    </>
  );
}
