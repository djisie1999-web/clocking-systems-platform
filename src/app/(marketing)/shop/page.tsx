"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ChevronRight, ChevronLeft, Info } from "lucide-react";

// ─── Exact pricing from products.js ──────────────────────────────────────────
const EMPLOYEE_BANDS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300];

function getSoftwarePrice(employees: number): { perUser: number; annual: number } {
  const perUser = employees <= 70 ? 15.0 : 10.0;
  return { perUser, annual: perUser * employees };
}

const HARDWARE = [
  {
    id: "a124_face",
    name: "A124 — Face, Fingerprint & Card",
    description: "Multi-biometric terminal supporting face recognition, fingerprint scanning, and card access.",
    priceExVat: 295,
    image: "/images/products/biotime-face.png",
    popular: true,
  },
  {
    id: "a124_fp",
    name: "A124 — Fingerprint & Card",
    description: "Fingerprint and card access terminal with intuitive touchscreen interface.",
    priceExVat: 275,
    image: "/images/products/biotime-fp.png",
  },
  {
    id: "a124_fob",
    name: "A124 — Cards/Fobs Only",
    description: "Card and fob-based clocking terminal, ideal for environments where biometrics are not required.",
    priceExVat: 275,
    image: "/images/products/biotime-multi.webp",
  },
  {
    id: "a103_palm",
    name: "A103 — With Palm",
    description: "Premium terminal with palm vein recognition for the highest level of biometric accuracy.",
    priceExVat: 375,
    image: "/images/products/biotime-fr.png",
  },
  {
    id: "a103_no_palm",
    name: "A103 — Without Palm",
    description: "High-performance terminal with face and fingerprint recognition, without palm scanner.",
    priceExVat: 345,
    image: "/images/products/biotime-fp2.png",
  },
  {
    id: "outdoor_ip65",
    name: "Outdoor IP65 — Weatherproof Terminal",
    description: "Fully weatherproof IP65-rated terminal for outdoor and harsh environment installations. Fingerprint, card and fob clocking.",
    priceExVat: 395,
    image: "/images/products/evotime-tile.png",
  },
];

const VAT_RATE = 0.2;

function formatGBP(n: number) {
  return `£${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface HardwareSelection {
  hardwareId: string;
  qty: number;
}

export default function ShopPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [employees, setEmployees] = useState<number | null>(null);
  const [hardwareSelections, setHardwareSelections] = useState<HardwareSelection[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const softwareCalc = employees ? getSoftwarePrice(employees) : null;
  const totalHardwareExVat = hardwareSelections.reduce((sum, sel) => {
    const hw = HARDWARE.find((h) => h.id === sel.hardwareId);
    return sum + (hw ? hw.priceExVat * sel.qty : 0);
  }, 0);

  const softwareExVat = softwareCalc ? softwareCalc.annual : 0;
  const subtotalExVat = softwareExVat + totalHardwareExVat;
  const vatAmount = subtotalExVat * VAT_RATE;
  const totalIncVat = subtotalExVat + vatAmount;

  function updateHardwareQty(hardwareId: string, qty: number) {
    setHardwareSelections((prev) => {
      const existing = prev.find((s) => s.hardwareId === hardwareId);
      if (qty === 0) return prev.filter((s) => s.hardwareId !== hardwareId);
      if (existing) return prev.map((s) => s.hardwareId === hardwareId ? { ...s, qty } : s);
      return [...prev, { hardwareId, qty }];
    });
  }

  function getQty(hardwareId: string) {
    return hardwareSelections.find((s) => s.hardwareId === hardwareId)?.qty ?? 0;
  }

  async function handleCheckout() {
    if (!employees || !softwareCalc) return;
    setSubmitting(true);
    try {
      const items = [
        {
          productId: `evotime_pro_${employees}`,
          productName: `EvoTime Pro — ${employees} employees (annual)`,
          price: Math.round(softwareExVat * 100),
          quantity: 1,
        },
        ...hardwareSelections.map((sel) => {
          const hw = HARDWARE.find((h) => h.id === sel.hardwareId)!;
          return {
            productId: hw.id,
            productName: hw.name,
            price: Math.round(hw.priceExVat * 100),
            quantity: sel.qty,
          };
        }),
      ];
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customer: { name: "Customer", email: "customer@example.com" },
        }),
      });
      if (!res.ok) throw new Error("Checkout failed");
      const data = (await res.json()) as { orderNumber: string };
      router.push(`/shop/success?order=${data.orderNumber}`);
    } catch {
      alert("Something went wrong. Please call us on 0113 258 7856.");
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1628] text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Buy EvoTime Pro
          </h1>
          <p className="text-blue-200 text-lg">
            Transparent pricing. No hidden fees. No free trial — we sell, you own.
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14 gap-0">
            {[
              { n: 1, label: "Employees" },
              { n: 2, label: "Hardware" },
              { n: 3, label: "Checkout" },
            ].map(({ n, label }, idx) => (
              <div key={n} className="flex items-center gap-0">
                <div className="flex items-center gap-2 px-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step > n
                        ? "bg-emerald-500 text-white"
                        : step === n
                        ? "bg-[#2563EB] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {step > n ? <Check className="w-4 h-4" /> : n}
                  </div>
                  <span className={`text-sm font-medium ${step === n ? "text-[#2563EB]" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
                {idx < 2 && <div className={`h-px w-8 ${step > n ? "bg-emerald-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2">

            {/* ── STEP 1: Select employees ── */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A1628] mb-2">How many employees do you have?</h2>
                <p className="text-gray-500 mb-6">
                  Select the band that covers your team. Pricing: <strong>£15/employee/year</strong> for up to 70 employees, <strong>£10/employee/year</strong> for 71+. All prices ex-VAT.
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-2 text-sm text-blue-800">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>
                    Choose the next band up from your current headcount so you have room to grow.
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {EMPLOYEE_BANDS.map((band) => {
                    const calc = getSoftwarePrice(band);
                    const selected = employees === band;
                    return (
                      <button
                        key={band}
                        onClick={() => setEmployees(band)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all text-center ${
                          selected
                            ? "border-[#2563EB] bg-blue-50"
                            : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/50"
                        }`}
                      >
                        <span className="text-xl font-bold text-[#0A1628]">{band}</span>
                        <span className="text-[10px] text-gray-400 leading-tight">employees</span>
                        <span className="text-xs font-semibold text-gray-600 mt-1">
                          {formatGBP(calc.annual)}
                        </span>
                        <span className="text-[10px] text-gray-400">/year</span>
                      </button>
                    );
                  })}
                </div>

                {employees && softwareCalc && (
                  <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                    <div className="font-semibold text-[#0A1628] mb-1">
                      EvoTime Pro — {employees} employees
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatGBP(softwareCalc.perUser)}/employee/year × {employees} = <strong className="text-[#0A1628]">{formatGBP(softwareCalc.annual)}/year</strong> ex-VAT
                    </div>
                  </div>
                )}

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => employees && setStep(2)}
                    disabled={!employees}
                    className="inline-flex items-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Hardware
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: Hardware ── */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Choose your hardware terminals</h2>
                <p className="text-gray-500 mb-6">
                  Add the terminals you need. All prices ex-VAT. Hardware is optional — the software works with compatible existing terminals too.
                </p>

                <div className="space-y-4">
                  {HARDWARE.map((hw) => {
                    const qty = getQty(hw.id);
                    return (
                      <div
                        key={hw.id}
                        className={`bg-white border-2 rounded-xl p-5 transition-all ${
                          qty > 0 ? "border-[#2563EB] shadow-md" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-[#0A1628]">{hw.name}</span>
                              {hw.popular && (
                                <span className="text-[11px] font-semibold bg-[#2563EB] text-white px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-2">{hw.description}</p>
                            <div className="text-lg font-bold text-[#0A1628]">
                              {formatGBP(hw.priceExVat)} <span className="text-sm font-normal text-gray-400">ex-VAT per unit</span>
                            </div>
                          </div>
                          {/* Quantity stepper */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={() => updateHardwareQty(hw.id, Math.max(0, qty - 1))}
                              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-semibold text-[#0A1628]">{qty}</span>
                            <button
                              onClick={() => updateHardwareQty(hw.id, qty + 1)}
                              className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        {qty > 0 && (
                          <div className="mt-2 text-sm font-semibold text-[#2563EB]">
                            Subtotal: {formatGBP(hw.priceExVat * qty)} ex-VAT
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg text-base font-semibold bg-[#2563EB] text-white hover:bg-blue-700 shadow transition-colors"
                  >
                    Continue to Checkout
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Checkout ── */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-[#0A1628] mb-2">Order confirmation</h2>
                <p className="text-gray-500 mb-6">
                  Review your order below. You&apos;ll be emailed a full invoice after purchase.
                </p>

                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6">
                  <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
                    <span className="font-semibold text-sm text-[#0A1628]">Order Summary</span>
                  </div>

                  {/* Software line */}
                  {employees && softwareCalc && (
                    <div className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
                      <div>
                        <div className="font-medium text-[#0A1628] text-sm">EvoTime Pro — {employees} employees</div>
                        <div className="text-xs text-gray-400">Annual subscription · {formatGBP(softwareCalc.perUser)}/employee/year</div>
                      </div>
                      <div className="font-semibold text-[#0A1628]">{formatGBP(softwareCalc.annual)}</div>
                    </div>
                  )}

                  {/* Hardware lines */}
                  {hardwareSelections.map((sel) => {
                    const hw = HARDWARE.find((h) => h.id === sel.hardwareId)!;
                    return (
                      <div key={sel.hardwareId} className="px-5 py-4 flex items-center justify-between border-b border-gray-100">
                        <div>
                          <div className="font-medium text-[#0A1628] text-sm">{hw.name}</div>
                          <div className="text-xs text-gray-400">Qty: {sel.qty} × {formatGBP(hw.priceExVat)}</div>
                        </div>
                        <div className="font-semibold text-[#0A1628]">{formatGBP(hw.priceExVat * sel.qty)}</div>
                      </div>
                    );
                  })}

                  <div className="px-5 py-4 space-y-1.5 bg-gray-50">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal (ex-VAT)</span>
                      <span>{formatGBP(subtotalExVat)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>VAT (20%)</span>
                      <span>{formatGBP(vatAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#0A1628] border-t border-gray-200 pt-2 mt-2">
                      <span>Total inc. VAT</span>
                      <span className="text-[#2563EB] text-lg">{formatGBP(totalIncVat)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 h-12 px-6 rounded-lg text-sm font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={submitting}
                    className="flex-1 inline-flex items-center justify-center gap-2 h-12 rounded-lg text-base font-semibold bg-[#059669] text-white hover:bg-emerald-700 shadow transition-colors disabled:opacity-60"
                  >
                    {submitting ? "Processing..." : `Place Order — ${formatGBP(totalIncVat)} inc. VAT`}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3">
                  By placing an order you agree to our{" "}
                  <Link href="/terms" className="underline hover:text-gray-600">Terms of Service</Link>.
                  Hardware ships next business day. Software activated within 2 hours.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Price summary */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden sticky top-24">
              <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="font-semibold text-[#0A1628] text-sm">Your Order</h3>
              </div>
              <div className="px-5 py-4 space-y-3 text-sm">
                {employees && softwareCalc ? (
                  <div className="flex justify-between">
                    <span className="text-gray-500">EvoTime Pro ({employees} employees)</span>
                    <span className="font-medium text-[#0A1628]">{formatGBP(softwareCalc.annual)}</span>
                  </div>
                ) : (
                  <div className="text-gray-400 text-xs">Select employees to see pricing</div>
                )}
                {hardwareSelections.map((sel) => {
                  const hw = HARDWARE.find((h) => h.id === sel.hardwareId)!;
                  return (
                    <div key={sel.hardwareId} className="flex justify-between">
                      <span className="text-gray-500">{hw.name.split(" —")[0]} ×{sel.qty}</span>
                      <span className="font-medium text-[#0A1628]">{formatGBP(hw.priceExVat * sel.qty)}</span>
                    </div>
                  );
                })}

                {subtotalExVat > 0 && (
                  <div className="border-t border-gray-100 pt-3 space-y-1">
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span>Ex-VAT</span>
                      <span>{formatGBP(subtotalExVat)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span>VAT 20%</span>
                      <span>{formatGBP(vatAmount)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[#0A1628] pt-1">
                      <span>Total inc. VAT</span>
                      <span className="text-[#2563EB]">{formatGBP(totalIncVat)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust */}
            <div className="bg-[#F8F9FB] border border-gray-200 rounded-xl p-5 text-sm space-y-3">
              {[
                "Next day hardware delivery",
                "3-year hardware warranty",
                "UK-based phone support",
                "GDPR compliant software",
                "Cancel software anytime",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-gray-600">
                  <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              Need help choosing?{" "}
              <a href="tel:01132587856" className="font-semibold text-[#2563EB] hover:underline">
                Call 0113 258 7856
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
