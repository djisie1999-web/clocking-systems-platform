"use client";

import { useState } from "react";
import {
  Bell,
  Clock,
  Wifi,
  WifiOff,
  FileText,
  AlertTriangle,
  Save,
  Mail,
  Smartphone,
  CheckCircle,
} from "lucide-react";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  email: boolean;
  inApp: boolean;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

// ─── Default Preferences ──────────────────────────────────────────────────────

const DEFAULT_PREFS: NotificationPreference[] = [
  {
    id: "late_clock_in",
    label: "Late clock-in alerts",
    description: "Receive an alert when an employee clocks in late for their shift",
    email: true,
    inApp: true,
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: "device_offline",
    label: "Device offline alerts",
    description: "Notify when a clocking terminal goes offline or is unreachable",
    email: true,
    inApp: true,
    icon: WifiOff,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
  },
  {
    id: "device_online",
    label: "Device back online",
    description: "Notify when an offline terminal reconnects successfully",
    email: false,
    inApp: true,
    icon: Wifi,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: "weekly_report",
    label: "Weekly attendance report",
    description: "Receive a summary of attendance data every Monday morning",
    email: true,
    inApp: false,
    icon: FileText,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "overtime_threshold",
    label: "Overtime threshold alerts",
    description: "Alert when an employee is approaching or exceeds their contracted hours",
    email: false,
    inApp: true,
    icon: AlertTriangle,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
  },
  {
    id: "absence_alerts",
    label: "Unplanned absence alerts",
    description: "Alert when an employee is absent without a recorded reason",
    email: true,
    inApp: true,
    icon: Bell,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
];

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer" aria-label={label}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform" />
    </label>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const { toasts, removeToast, toast } = useToast();

  const [prefs, setPrefs] = useState<NotificationPreference[]>(DEFAULT_PREFS);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  // ── Digest settings ───────────────────────────────────────────
  const [digestFrequency, setDigestFrequency] = useState<"daily" | "weekly" | "never">("weekly");
  const [digestTime, setDigestTime] = useState("08:00");

  // ── Channel settings ──────────────────────────────────────────
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(true);

  function updatePref(
    id: string,
    channel: "email" | "inApp",
    value: boolean
  ) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [channel]: value } : p))
    );
    setDirty(true);
  }

  async function savePreferences() {
    setSaving(true);
    // Simulate API call (no DB model exists for notification prefs yet)
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setDirty(false);
    toast.success(
      "Preferences saved",
      "Your notification settings have been updated."
    );
  }

  function resetToDefaults() {
    setPrefs(DEFAULT_PREFS);
    setDigestFrequency("weekly");
    setDigestTime("08:00");
    setEmailEnabled(true);
    setInAppEnabled(true);
    setDirty(true);
    toast.info("Defaults restored", "Click Save to apply the default settings.");
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Choose when and how you want to be notified
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetToDefaults}
            className="h-9 px-3 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={savePreferences}
            disabled={saving || !dirty}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* ── Channels ──────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Notification Channels
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Enable or disable entire notification channels
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <ChannelRow
            icon={Mail}
            label="Email notifications"
            description="Receive alerts at your registered email address"
            checked={emailEnabled}
            onChange={(v) => { setEmailEnabled(v); setDirty(true); }}
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <ChannelRow
            icon={Smartphone}
            label="In-app notifications"
            description="Show notification badges and alerts within the platform"
            checked={inAppEnabled}
            onChange={(v) => { setInAppEnabled(v); setDirty(true); }}
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
        </div>
      </div>

      {/* ── Preferences ───────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Alert Preferences
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Configure which events trigger notifications
            </p>
          </div>
        </div>

        {/* Channel header */}
        <div className="flex items-center justify-end gap-6 mb-3 pr-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" /> Email
          </span>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" /> In-App
          </span>
        </div>

        <div className="divide-y divide-gray-100">
          {prefs.map((pref) => (
            <div
              key={pref.id}
              className="flex items-center gap-4 py-4"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${pref.iconBg}`}
              >
                <pref.icon className={`w-4 h-4 ${pref.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{pref.description}</p>
              </div>
              <div className="flex items-center gap-6 shrink-0">
                <Toggle
                  checked={emailEnabled && pref.email}
                  onChange={(v) => updatePref(pref.id, "email", v)}
                  label={`${pref.label} email`}
                />
                <Toggle
                  checked={inAppEnabled && pref.inApp}
                  onChange={(v) => updatePref(pref.id, "inApp", v)}
                  label={`${pref.label} in-app`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Digest ────────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Report Digest
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Schedule a regular attendance summary to your inbox
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Frequency
            </label>
            <select
              value={digestFrequency}
              onChange={(e) => {
                setDigestFrequency(e.target.value as typeof digestFrequency);
                setDirty(true);
              }}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly (Monday)</option>
              <option value="never">Never</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Send Time
            </label>
            <input
              type="time"
              value={digestTime}
              onChange={(e) => { setDigestTime(e.target.value); setDirty(true); }}
              disabled={digestFrequency === "never"}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Save footer */}
      {dirty && (
        <div className="sticky bottom-4 flex justify-end">
          <div className="bg-white border border-gray-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <p className="text-sm text-gray-600">You have unsaved changes</p>
            <button
              onClick={savePreferences}
              disabled={saving}
              className="inline-flex items-center gap-2 h-8 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      )}

      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ─── Channel Row ──────────────────────────────────────────────────────────────

function ChannelRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
  iconBg,
  iconColor,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform" />
      </label>
    </div>
  );
}
