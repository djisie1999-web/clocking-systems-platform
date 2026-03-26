"use client";

import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  MessageSquare,
  Mail,
  ExternalLink,
  Zap,
  Shield,
  Users,
  Monitor,
  BarChart2,
  Settings,
  Search,
  CheckCircle,
  Clock,
  Bell,
  CreditCard,
  ArrowRight,
  Keyboard,
  AlertCircle,
  FileText,
  Wifi,
  Lock,
} from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface GuideItem {
  icon: React.ElementType;
  title: string;
  description: string;
  steps: string[];
  color: string;
  bg: string;
  href: string;
}

interface FeatureGuide {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
  href: string;
  bullets: string[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FAQ_ITEMS: FAQItem[] = [
  // Devices
  {
    category: "Devices",
    question: "How do I add a new clocking terminal?",
    answer:
      "Navigate to Devices in the sidebar, then click 'Add Device'. Enter the terminal's IP address, MAC address, location name, and firmware version. Once saved, the terminal will begin syncing clock-in/out events within a few minutes.",
  },
  {
    category: "Devices",
    question: "What happens when a terminal goes offline?",
    answer:
      "Clock events are buffered locally on the terminal and synced automatically when the connection is restored. You will receive an alert (if enabled in Notifications) when a device goes offline or comes back online.",
  },
  {
    category: "Devices",
    question: "How do I find my terminal's MAC address?",
    answer:
      "The MAC address is printed on a label on the back or underside of the terminal. It is typically formatted as six pairs of hexadecimal digits separated by colons, e.g. AA:BB:CC:DD:EE:FF.",
  },
  {
    category: "Devices",
    question: "My terminal shows as offline but it is powered on — why?",
    answer:
      "This usually means the IP address has changed (e.g. after a router reboot with DHCP). Check your router's connected devices list for the terminal's current IP, then update it in Devices > Configure. We recommend assigning a static IP to your terminals to prevent this.",
  },
  // Employees
  {
    category: "Employees",
    question: "Why is an employee not showing on the attendance list?",
    answer:
      "Check that the employee has been enrolled on the clocking terminal and their profile is set to active. If they clocked in but don't appear, try refreshing the Employees page or check if the terminal is online in the Devices section.",
  },
  {
    category: "Employees",
    question: "How are employees enrolled?",
    answer:
      "Employees are enrolled directly on the clocking terminal — not via the web platform. Use the terminal's on-device menu to add a new user and register their biometric (fingerprint or face) or RFID card. Their clock-in events will then appear in the platform automatically.",
  },
  {
    category: "Employees",
    question: "Can I view who is absent right now?",
    answer:
      "Yes. Go to Employees in the sidebar. The table shows each employee's real-time status (Present, Late, or Absent) alongside their clock-in time. Use the Status filter to view only absent employees.",
  },
  // Reports
  {
    category: "Reports",
    question: "How do I export attendance reports?",
    answer:
      "Go to the Reports page and select your date range and department filters. Click the 'Export CSV' or 'Export PDF' button in the top right. Reports are generated instantly and downloaded to your device.",
  },
  {
    category: "Reports",
    question: "What is included in the Payroll Export?",
    answer:
      "The payroll export (CSV) includes each employee's name, department, total hours worked, overtime hours, and number of late clock-ins for the selected period. It is formatted for direct import into most UK payroll software.",
  },
  {
    category: "Reports",
    question: "How is the attendance rate calculated?",
    answer:
      "Attendance rate = (present + late) ÷ total headcount × 100. Employees who are absent are excluded from the numerator. Late arrivals count as present for attendance purposes but are flagged separately.",
  },
  // Team & Users
  {
    category: "Team & Users",
    question: "Can I grant other users administrator access?",
    answer:
      "Yes. Go to Team Management (Admin section) and find the user. Click the edit (pencil) icon and change their Role to 'Administrator'. Admins can manage users, devices, and all system settings.",
  },
  {
    category: "Team & Users",
    question: "How do I reset a user's password?",
    answer:
      "Admins can reset any user's password via the Team Management page — click Edit on the user and enter a new password in the 'New Password' field. Users can also reset their own password from Settings > Security.",
  },
  {
    category: "Team & Users",
    question: "How do I deactivate a user account?",
    answer:
      "In Team Management, find the user and click the toggle icon to deactivate them, or click Edit and toggle the 'Account Active' switch off. Deactivated accounts retain all their data but cannot log in.",
  },
  // Billing
  {
    category: "Billing",
    question: "How does the 14-day free trial work?",
    answer:
      "Your trial gives you full access to all EvoTime Pro features for 14 days, with no credit card required to start. At the end of the trial, you can upgrade via Billing to continue uninterrupted, or your account will be limited to read-only access.",
  },
  {
    category: "Billing",
    question: "How is my subscription price calculated?",
    answer:
      "Pricing is based on the number of users on your account. Standard rate is £15/user/year. For organisations with 71 or more users, volume pricing applies at £10/user/year. You can see your current plan and user count in the Billing section.",
  },
  {
    category: "Billing",
    question: "Can I cancel at any time?",
    answer:
      "Yes. You can cancel your subscription at any time from the Billing section by clicking 'Cancel Subscription'. Your account remains active until the end of the current billing period. No refunds are issued for partial months.",
  },
  // Data & Security
  {
    category: "Data & Security",
    question: "Is my data backed up?",
    answer:
      "Yes. All attendance data is stored in a managed PostgreSQL database with automatic daily backups retained for 30 days. You can also export your data at any time from the Reports page.",
  },
  {
    category: "Data & Security",
    question: "Is CS Platform GDPR compliant?",
    answer:
      "Yes. All data is stored on UK/EU servers. Employee biometric data is stored only on the clocking terminal — it is never transmitted to or stored in the CS Platform cloud. You can request a data export or deletion at any time by contacting support.",
  },
];

const GUIDES: GuideItem[] = [
  {
    icon: Zap,
    title: "Quick Start",
    description: "Get up and running in under 10 minutes",
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/dashboard/devices",
    steps: [
      "Sign in to your CS Platform account",
      "Add your first clocking terminal in Devices",
      "Enrol employees on the terminal itself",
      "Check attendance in real time on the Dashboard",
    ],
  },
  {
    icon: Monitor,
    title: "Device Configuration",
    description: "Connect and manage clocking terminals",
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/dashboard/devices",
    steps: [
      "Ensure the terminal is on the same network",
      "Add the device via Devices > Add Device",
      "Enter the IP, MAC address, and location",
      "Monitor status — green = online, red = offline",
    ],
  },
  {
    icon: Users,
    title: "Managing Your Team",
    description: "Add, edit, and control user access",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/team",
    steps: [
      "Go to Team Management in the Admin section",
      "Click 'Add User' to create a new account",
      "Set the role: User for staff, Admin for managers",
      "Toggle accounts on/off without losing data",
    ],
  },
  {
    icon: BarChart2,
    title: "Attendance Reports",
    description: "Analyse data and export for payroll",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/dashboard/reports",
    steps: [
      "Navigate to Reports in the sidebar",
      "Filter by department, date range, or employee",
      "View daily, weekly, or monthly summaries",
      "Export to CSV for payroll processing",
    ],
  },
];

const FEATURE_GUIDES: FeatureGuide[] = [
  {
    icon: BarChart2,
    title: "Dashboard",
    description:
      "Your real-time command centre — attendance stats, recent activity, and system health at a glance.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/dashboard",
    bullets: [
      "View total devices, active employees, and today's clock-ins",
      "See a live feed of recent clock-in/out events by employee",
      "Monitor API status and device sync health",
      "Admin users see an additional overview of all platform accounts",
    ],
  },
  {
    icon: Monitor,
    title: "Devices",
    description:
      "Add, configure, and monitor your biometric and RFID clocking terminals.",
    color: "text-purple-600",
    bg: "bg-purple-50",
    href: "/dashboard/devices",
    bullets: [
      "Register terminals by IP address, MAC address, location, and firmware",
      "See live online/offline status with last-seen timestamp",
      "View per-device clock-in count, enrolled employees, and uptime",
      "Offline terminals buffer clock events and sync when reconnected",
    ],
  },
  {
    icon: Users,
    title: "Employees",
    description:
      "Monitor real-time attendance for all enrolled employees across all terminals.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    href: "/dashboard/employees",
    bullets: [
      "Filter by department, attendance status (present / late / absent)",
      "See each employee's clock-in time and hours worked this week",
      "View attendance rate progress bar for today's workforce",
      "Search by employee name, department, or job title",
    ],
  },
  {
    icon: BarChart2,
    title: "Reports",
    description:
      "Weekly charts, department breakdowns, overtime tracking, and one-click payroll exports.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    href: "/dashboard/reports",
    bullets: [
      "Toggle between This Week, Last Week, This Month, and Last Month",
      "Stacked bar chart visualises present / late / absent per day",
      "Department table shows avg hours, attendance %, and late rate",
      "Export Payroll CSV, Attendance PDF, Late Arrivals, or Overtime reports",
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Receive in-app and email alerts for important attendance and device events.",
    color: "text-pink-600",
    bg: "bg-pink-50",
    href: "/notifications",
    bullets: [
      "Late clock-in alerts — notified when an employee arrives late",
      "Device offline alerts — instant notification when a terminal loses connection",
      "Weekly attendance report — emailed every Monday morning",
      "Overtime threshold alerts — flag when contracted hours are exceeded",
    ],
  },
  {
    icon: Settings,
    title: "Settings",
    description:
      "Manage your profile, update your password, and customise display preferences.",
    color: "text-gray-600",
    bg: "bg-gray-100",
    href: "/settings",
    bullets: [
      "Update your display name and email address",
      "Change your password with real-time strength indicator",
      "Set notification preferences per alert type",
      "Choose timezone and date format (UK, US, or ISO)",
    ],
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Create and manage platform accounts, assign roles, and control login access.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    href: "/team",
    bullets: [
      "Add new platform users and set their role (Admin or Standard User)",
      "Edit existing users — update name, email, password, or role",
      "Deactivate accounts to revoke login access without deleting data",
      "View all team members and their current account status",
    ],
  },
  {
    icon: CreditCard,
    title: "Billing",
    description:
      "Manage your subscription plan, view invoices, and update payment details.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    href: "/dashboard/billing",
    bullets: [
      "Upgrade from free trial to EvoTime Pro with one click",
      "View current plan, user count, and next renewal date",
      "Access the Stripe billing portal to update payment method or download invoices",
      "Cancel or reactivate your subscription at any time",
    ],
  },
];

const KEYBOARD_SHORTCUTS = [
  { keys: ["G", "D"], description: "Go to Dashboard" },
  { keys: ["G", "V"], description: "Go to Devices" },
  { keys: ["G", "E"], description: "Go to Employees" },
  { keys: ["G", "R"], description: "Go to Reports" },
  { keys: ["G", "S"], description: "Go to Settings" },
  { keys: ["G", "H"], description: "Go to Help" },
  { keys: ["?"], description: "Show keyboard shortcuts" },
];

const FAQ_CATEGORIES = ["All", "Devices", "Employees", "Reports", "Team & Users", "Billing", "Data & Security"];

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-100">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 py-4 text-left"
          >
            <span className="text-sm font-medium text-gray-900">
              {item.question}
            </span>
            {open === i ? (
              <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
            )}
          </button>
          {open === i && (
            <div className="pb-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  const [faqSearch, setFaqSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("All");

  const filteredFAQ = FAQ_ITEMS.filter((item) => {
    const matchesSearch =
      !faqSearch.trim() ||
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase());
    const matchesCategory =
      faqCategory === "All" || item.category === faqCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Help Centre</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Guides, feature walkthroughs, FAQs, and support
        </p>
      </div>

      {/* ── Support cards ────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: BookOpen,
            title: "Feature Guides",
            description: "Step-by-step walkthroughs below",
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "#guides",
          },
          {
            icon: MessageSquare,
            title: "Live Chat",
            description: "Mon–Fri, 8 am–6 pm",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            href: "mailto:support@clockingsystems.com",
          },
          {
            icon: Mail,
            title: "Email Support",
            description: "support@clockingsystems.com",
            color: "text-purple-600",
            bg: "bg-purple-50",
            href: "mailto:support@clockingsystems.com",
          },
        ].map((card) => (
          <a
            key={card.title}
            href={card.href}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow flex items-start gap-4 group"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${card.bg}`}
            >
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                {card.title}
                <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{card.description}</p>
            </div>
          </a>
        ))}
      </div>

      {/* ── Getting Started ───────────────────────────────────── */}
      <div id="guides" className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Getting Started
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              The essentials to get CS Platform live at your site
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GUIDES.map((guide) => (
            <div
              key={guide.title}
              className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${guide.bg}`}
                >
                  <guide.icon className={`w-4 h-4 ${guide.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {guide.title}
                  </p>
                  <p className="text-xs text-gray-500">{guide.description}</p>
                </div>
                <Link
                  href={guide.href}
                  className="shrink-0 text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                >
                  Open
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <ol className="space-y-1.5">
                {guide.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-gray-600 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* ── Feature Guides ────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Feature Guides
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Everything you can do in each section of the platform
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {FEATURE_GUIDES.map((feature) => (
            <div
              key={feature.title}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-100 transition-colors"
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${feature.bg}`}
                  >
                    <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">
                        {feature.title}
                      </p>
                      <Link
                        href={feature.href}
                        className="shrink-0 text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        Open
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-1.5 pl-1">
                  {feature.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Troubleshooting ───────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
            <AlertCircle className="w-4 h-4 text-red-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Troubleshooting
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Common issues and how to fix them quickly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: Wifi,
              title: "Terminal shows offline",
              steps: [
                "Check power LED on the terminal",
                "Verify the terminal is connected to your network",
                "Check if the IP address has changed — update in Devices > Configure",
                "Ping the terminal's IP from a PC on the same network",
              ],
              color: "text-red-600",
              bg: "bg-red-50",
            },
            {
              icon: Users,
              title: "Employee not appearing",
              steps: [
                "Confirm the employee is enrolled on the terminal",
                "Check that the terminal is online and syncing",
                "Refresh the Employees page",
                "If the issue persists, contact support",
              ],
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              icon: FileText,
              title: "Export is blank or incomplete",
              steps: [
                "Check your date range — ensure it covers the period with data",
                "Remove department or status filters and re-export",
                "Try a different browser if the download is blocked",
                "Contact support if data is missing for a specific date",
              ],
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              icon: Lock,
              title: "Cannot log in",
              steps: [
                "Confirm you are using the correct email address",
                "Reset your password via Settings > Security (if logged in) or contact an admin",
                "Check that your account has not been deactivated",
                "Clear your browser cache and cookies, then try again",
              ],
              color: "text-purple-600",
              bg: "bg-purple-50",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="border border-gray-200 rounded-xl p-4"
            >
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {item.title}
                </p>
              </div>
              <ol className="space-y-1.5">
                {item.steps.map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center shrink-0 text-[10px] font-bold text-gray-600 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyboard shortcuts ────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Keyboard className="w-4 h-4 text-gray-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Keyboard Shortcuts
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Navigate the platform faster with these shortcuts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {KEYBOARD_SHORTCUTS.map((shortcut, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm text-gray-700">
                {shortcut.description}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, j) => (
                  <span key={j} className="flex items-center gap-1">
                    <kbd className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-xs font-mono text-gray-700 shadow-sm">
                      {key}
                    </kbd>
                    {j < shortcut.keys.length - 1 && (
                      <span className="text-xs text-gray-400">then</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-4">
          Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-xs font-mono">?</kbd> anywhere to view shortcuts.
        </p>
      </div>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {FAQ_ITEMS.length} questions across{" "}
              {FAQ_CATEGORIES.length - 1} categories
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={faqSearch}
            onChange={(e) => setFaqSearch(e.target.value)}
            placeholder="Search questions…"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-5">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFaqCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                faqCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredFAQ.length > 0 ? (
          <FAQAccordion items={filteredFAQ} />
        ) : (
          <div className="text-center py-8">
            <HelpCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">
              No results for &ldquo;{faqSearch}&rdquo;
            </p>
            <button
              onClick={() => {
                setFaqSearch("");
                setFaqCategory("All");
              }}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* ── Contact banner ────────────────────────────────────── */}
      <div className="bg-blue-600 rounded-xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">Still need help?</h3>
            <p className="text-blue-100 text-sm mt-0.5">
              Our UK-based support team is available Monday–Friday, 8 am–6 pm.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="mailto:support@clockingsystems.com"
              className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-white text-blue-600 hover:bg-blue-50 shadow transition-colors"
            >
              <Mail className="w-4 h-4" />
              Email Us
            </a>
            <div className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-500 text-white border border-blue-400">
              <Clock className="w-4 h-4" />
              Response within 4h
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { label: "Avg response time", value: "< 4 hours" },
            { label: "Customer satisfaction", value: "98%" },
            { label: "Uptime SLA", value: "99.9%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-blue-500/50 rounded-lg px-3 py-2 text-center"
            >
              <p className="text-lg font-bold">{stat.value}</p>
              <p className="text-xs text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System status */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        All systems operational ·{" "}
        <a href="#" className="underline hover:text-gray-600">
          View status page
        </a>
      </div>
    </div>
  );
}
