import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed — Clocking Systems",
  description: "Your EvoTime Pro order has been confirmed.",
};

export default function ShopSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>
      <h1 className="text-3xl font-bold text-[#0A1628] mb-3">
        Welcome to EvoTime Pro!
      </h1>
      <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        Your order is confirmed. Check your inbox for your invoice and account activation details.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left space-y-3">
        <h2 className="font-semibold text-[#0A1628]">What happens next?</h2>
        <div className="flex gap-3 text-sm text-gray-700">
          <span className="w-6 h-6 bg-[#2563EB] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">1</span>
          <span>You&apos;ll receive a confirmation email with your invoice and login instructions within 2 hours.</span>
        </div>
        <div className="flex gap-3 text-sm text-gray-700">
          <span className="w-6 h-6 bg-[#2563EB] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">2</span>
          <span>Hardware (if ordered) ships next business day by tracked courier.</span>
        </div>
        <div className="flex gap-3 text-sm text-gray-700">
          <span className="w-6 h-6 bg-[#2563EB] text-white rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-xs">3</span>
          <span>Once activated, log in to set up your company, add employees and configure your terminals.</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://app.evotime.pro"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
        >
          Set up my EvoTime Pro account →
        </a>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
        >
          Back to Home
        </Link>
      </div>
      <p className="text-sm text-gray-400 mt-8">
        Need help? Call us on{" "}
        <a href="tel:01132587856" className="text-[#2563EB] font-semibold hover:underline">
          0113 258 7856
        </a>{" "}
        — Monday to Friday, 9am–5pm.
      </p>
    </div>
  );
}
