import { NextResponse } from "next/server";
import { z } from "zod";

// ─── Validation Schema ────────────────────────────────────────────────────────

const ROISchema = z.object({
  employees: z.number().min(1, "At least 1 employee required").default(10),
  avgHourlyRate: z
    .number()
    .min(0, "Hourly rate must be non-negative")
    .default(12),
  manualHoursPerWeek: z
    .number()
    .min(0, "Manual hours must be non-negative")
    .default(5),
  buddyPunchingPercent: z
    .number()
    .min(0, "Percentage must be non-negative")
    .max(100, "Percentage cannot exceed 100")
    .default(1.5),
  overtimePercent: z
    .number()
    .min(0, "Percentage must be non-negative")
    .max(100, "Percentage cannot exceed 100")
    .default(8),
  currentSolution: z
    .enum(["paper", "spreadsheet", "basic_software", "none"])
    .default("none"),
});

// ─── Types ────────────────────────────────────────────────────────────────────

interface ROIResult {
  annualAdminSavings: number;
  annualTheftPrevention: number;
  annualOvertimeSavings: number;
  totalAnnualSavings: number;
  systemCost: number;
  paybackMonths: number;
  threeYearROI: number;
  recommendedProduct: string;
  recommendedProductSlug: string;
}

// ─── POST /api/roi ────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const parsed = ROISchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const {
      employees,
      avgHourlyRate,
      manualHoursPerWeek,
      buddyPunchingPercent,
      overtimePercent,
    } = parsed.data;

    // Admin savings: manual hours saved per year (assume 80% reduction)
    const weeksPerYear = 52;
    const adminHoursSavedPerYear = manualHoursPerWeek * 0.8 * weeksPerYear;
    const annualAdminSavings = Math.round(adminHoursSavedPerYear * avgHourlyRate);

    // Annual payroll total
    const avgAnnualSalary = avgHourlyRate * 40 * 52; // assume 40hr week
    const totalPayroll = employees * avgAnnualSalary;

    // Buddy punching / time theft prevention
    const annualTheftPrevention = Math.round(
      (totalPayroll * buddyPunchingPercent) / 100
    );

    // Overtime savings (assume 30% reduction in unnecessary overtime)
    const totalOvertimeCost = totalPayroll * (overtimePercent / 100);
    const annualOvertimeSavings = Math.round(totalOvertimeCost * 0.3);

    const totalAnnualSavings =
      annualAdminSavings + annualTheftPrevention + annualOvertimeSavings;

    // Recommend product based on employee count
    let recommendedProduct: string;
    let recommendedProductSlug: string;
    let systemCost: number;

    if (employees <= 25) {
      recommendedProduct = "Starter Bundle + ClockSuite Basic";
      recommendedProductSlug = "starter-bundle";
      // Hardware one-off £349 + software £49/mo for 12mo
      systemCost = 34900 + 4900 * 12;
    } else if (employees <= 100) {
      recommendedProduct = "Professional Bundle + ClockSuite Professional";
      recommendedProductSlug = "professional-bundle";
      // Hardware £999 + £99/mo for 12mo
      systemCost = 99900 + 9900 * 12;
    } else {
      recommendedProduct = "ClockSuite Enterprise + TimeClock Pro X200 (×5)";
      recommendedProductSlug = "clocksuite-enterprise";
      // 5× X200 + Enterprise
      systemCost = 5 * 29900 + 24900 * 12;
    }

    const systemCostPounds = systemCost / 100;
    const paybackMonths =
      totalAnnualSavings > 0
        ? Math.ceil((systemCostPounds / totalAnnualSavings) * 12)
        : 999;

    const threeYearROI =
      systemCostPounds > 0
        ? Math.round(
            ((totalAnnualSavings * 3 - systemCostPounds) / systemCostPounds) *
              100
          )
        : 0;

    const result: ROIResult = {
      annualAdminSavings,
      annualTheftPrevention,
      annualOvertimeSavings,
      totalAnnualSavings,
      systemCost: Math.round(systemCostPounds),
      paybackMonths,
      threeYearROI,
      recommendedProduct,
      recommendedProductSlug,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("[roi]", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
