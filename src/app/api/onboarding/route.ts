import { NextResponse } from "next/server";

interface OnboardingStep {
  id: string;
  step: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  completed: boolean;
  resources: { label: string; href: string }[];
}

const hardwareSteps: OnboardingStep[] = [
  {
    id: "hw-1",
    step: 1,
    title: "Unbox & Physical Setup",
    description:
      "Mount your terminal at your entrance, connect power, and verify the display powers on. Choose a location with reliable WiFi or an Ethernet port nearby.",
    estimatedMinutes: 15,
    completed: false,
    resources: [
      { label: "Mounting Guide (PDF)", href: "/docs/mounting-guide.pdf" },
      { label: "Video: Unboxing & Setup", href: "/docs/setup-video" },
    ],
  },
  {
    id: "hw-2",
    step: 2,
    title: "Network Configuration",
    description:
      "Connect the terminal to your network via Ethernet or WiFi. Enter your ClockSuite account credentials on the terminal to link it to your dashboard.",
    estimatedMinutes: 10,
    completed: false,
    resources: [
      { label: "Network Setup Guide", href: "/docs/network-setup" },
      { label: "Firewall Requirements", href: "/docs/firewall" },
    ],
  },
  {
    id: "hw-3",
    step: 3,
    title: "Employee Enrollment",
    description:
      "Enroll each employee's fingerprint or issue RFID cards through the terminal menu or ClockSuite dashboard. Aim for 3 fingerprint scans per hand for best accuracy.",
    estimatedMinutes: 30,
    completed: false,
    resources: [
      { label: "Enrollment Guide", href: "/docs/enrollment" },
      { label: "Bulk Import Template", href: "/docs/bulk-import.csv" },
    ],
  },
  {
    id: "hw-4",
    step: 4,
    title: "Test Clock-ins",
    description:
      "Ask 2–3 employees to test clock-in and clock-out. Verify events appear on the ClockSuite dashboard in real time. Check time zone settings are correct.",
    estimatedMinutes: 10,
    completed: false,
    resources: [
      { label: "Testing Checklist", href: "/docs/testing-checklist" },
      { label: "Troubleshooting", href: "/docs/troubleshoot" },
    ],
  },
];

const softwareSteps: OnboardingStep[] = [
  {
    id: "sw-1",
    step: 1,
    title: "Account Setup",
    description:
      "Complete your company profile: company name, address, timezone, pay period (weekly/monthly), and payroll start date. These settings affect how timesheets are calculated.",
    estimatedMinutes: 10,
    completed: false,
    resources: [
      { label: "Account Settings Guide", href: "/docs/account-setup" },
    ],
  },
  {
    id: "sw-2",
    step: 2,
    title: "Configure Shift Patterns",
    description:
      "Set up your standard working hours, shift patterns, and overtime rules. Define which days are working days and configure bank holiday handling.",
    estimatedMinutes: 20,
    completed: false,
    resources: [
      { label: "Shift Configuration Guide", href: "/docs/shifts" },
      { label: "Overtime Rules", href: "/docs/overtime" },
    ],
  },
  {
    id: "sw-3",
    step: 3,
    title: "Import Employees",
    description:
      "Add your employees via the dashboard manually or upload a CSV. Each employee needs: name, email, employee ID, department, and shift pattern.",
    estimatedMinutes: 20,
    completed: false,
    resources: [
      { label: "Employee Import Template", href: "/docs/employee-import.csv" },
      { label: "Import Guide", href: "/docs/import-employees" },
    ],
  },
  {
    id: "sw-4",
    step: 4,
    title: "Connect Hardware",
    description:
      "Link your TimeClock terminals to your ClockSuite account. Navigate to Devices → Add Device and follow the pairing instructions.",
    estimatedMinutes: 15,
    completed: false,
    resources: [
      { label: "Device Pairing Guide", href: "/docs/pair-device" },
    ],
  },
  {
    id: "sw-5",
    step: 5,
    title: "Go Live",
    description:
      "Run a final check: verify all employees are enrolled, test clock-ins are working, and confirm timesheets are generating correctly. Send your team the employee app download link.",
    estimatedMinutes: 15,
    completed: false,
    resources: [
      { label: "Go-Live Checklist", href: "/docs/go-live" },
      { label: "Employee App Guide", href: "/docs/employee-app" },
    ],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const planType = searchParams.get("planType") || "software";
  const orderNumber = searchParams.get("orderNumber");

  const steps = planType === "hardware" ? hardwareSteps : softwareSteps;

  return NextResponse.json({
    orderNumber: orderNumber || "CS-000000-000",
    planType,
    steps,
    totalSteps: steps.length,
    estimatedTotalMinutes: steps.reduce((sum, s) => sum + s.estimatedMinutes, 0),
  });
}
