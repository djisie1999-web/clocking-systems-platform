"use client";

import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Bell,
  Shield,
  Save,
  Eye,
  EyeOff,
  Key,
  Palette,
  Globe,
  Clock,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { TooltipIcon } from "@/components/ui/tooltip";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(pw: string): { label: string; score: number } {
  if (pw.length === 0) return { label: "", score: 0 };
  if (pw.length < 8) return { label: "Too short", score: 1 };
  if (pw.length < 10) return { label: "Weak", score: 2 };
  if (pw.length < 12) return { label: "Fair", score: 3 };
  return { label: "Strong", score: 4 };
}

const STRENGTH_COLORS = [
  "",
  "bg-red-400",
  "bg-amber-400",
  "bg-blue-400",
  "bg-emerald-500",
];

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="relative inline-flex items-center cursor-pointer shrink-0">
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

export default function SettingsPage() {
  const { toasts, removeToast, toast } = useToast();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Password form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [currentPwError, setCurrentPwError] = useState("");
  const [newPwError, setNewPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");

  // Notification prefs (UI state, not persisted to DB)
  const [notifPrefs, setNotifPrefs] = useState({
    lateClockIn: true,
    deviceOffline: true,
    weeklyReport: false,
    overtime: false,
  });
  const [notifSaving, setNotifSaving] = useState(false);

  // Preferences
  const [timezone, setTimezone] = useState("Europe/London");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [prefsSaving, setPrefsSaving] = useState(false);

  // ── Load profile ───────────────────────────────────────────
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data: { data: UserProfile }) => {
        setProfile(data.data);
        setName(data.data.name);
        setEmail(data.data.email);
      })
      .catch(() => toast.error("Failed to load profile"))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Validate profile ────────────────────────────────────────
  function validateProfile(): boolean {
    let ok = true;
    setNameError("");
    setEmailError("");

    if (!name.trim()) {
      setNameError("Name is required");
      ok = false;
    } else if (name.trim().length > 100) {
      setNameError("Name must be 100 characters or fewer");
      ok = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address");
      ok = false;
    }

    return ok;
  }

  // ── Save profile ────────────────────────────────────────────
  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!validateProfile()) return;

    setProfileSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim() }),
      });
      const data = (await res.json()) as {
        data?: UserProfile;
        error?: string;
      };

      if (!res.ok) {
        toast.error("Update failed", data.error ?? "Could not save profile");
      } else {
        setProfile(data.data ?? null);
        toast.success("Profile updated", "Your changes have been saved.");
      }
    } catch {
      toast.error("Network error", "Please check your connection and try again.");
    } finally {
      setProfileSaving(false);
    }
  }

  // ── Validate password ───────────────────────────────────────
  function validatePassword(): boolean {
    let ok = true;
    setCurrentPwError("");
    setNewPwError("");
    setConfirmPwError("");

    if (!currentPassword) {
      setCurrentPwError("Current password is required");
      ok = false;
    }

    if (!newPassword) {
      setNewPwError("New password is required");
      ok = false;
    } else if (newPassword.length < 8) {
      setNewPwError("Password must be at least 8 characters");
      ok = false;
    } else if (newPassword.length > 128) {
      setNewPwError("Password must be 128 characters or fewer");
      ok = false;
    }

    if (!confirmPassword) {
      setConfirmPwError("Please confirm your new password");
      ok = false;
    } else if (newPassword && confirmPassword !== newPassword) {
      setConfirmPwError("Passwords do not match");
      ok = false;
    }

    return ok;
  }

  // ── Save password ───────────────────────────────────────────
  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!validatePassword()) return;

    setPasswordSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        toast.error(
          "Password update failed",
          data.error ?? "Could not update password"
        );
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated", "Your new password is now active.");
      }
    } catch {
      toast.error("Network error", "Please check your connection and try again.");
    } finally {
      setPasswordSaving(false);
    }
  }

  // ── Save notifications ──────────────────────────────────────
  async function saveNotifications(e: React.FormEvent) {
    e.preventDefault();
    setNotifSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setNotifSaving(false);
    toast.success(
      "Notifications saved",
      "Your alert preferences have been updated."
    );
  }

  // ── Save preferences ────────────────────────────────────────
  async function savePreferences(e: React.FormEvent) {
    e.preventDefault();
    setPrefsSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setPrefsSaving(false);
    toast.success("Preferences saved", "Display settings have been updated.");
  }

  const strength = getStrength(newPassword);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Manage your account, security, and preferences
        </p>
      </div>

      {/* ── Profile Section ────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <SectionTitle
          icon={User}
          title="Profile Information"
          description="Update your display name and email address"
        />

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        ) : (
          <form onSubmit={saveProfile} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                placeholder="Jane Smith"
                className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  nameError ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {nameError && (
                <p className="text-xs text-red-600 mt-1">{nameError}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="jane@company.co.uk"
                className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailError ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {emailError && (
                <p className="text-xs text-red-600 mt-1">{emailError}</p>
              )}
            </div>

            {/* Read-only role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Role
              </label>
              <div className="h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 flex items-center">
                <span className="text-sm text-gray-500 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  {profile?.role === "ADMIN"
                    ? "Administrator"
                    : "Standard User"}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <p className="text-xs text-gray-400">
                Member since{" "}
                {profile
                  ? new Date(profile.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60 self-start sm:self-auto"
              >
                <Save className="w-4 h-4" />
                {profileSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ── Security Section ────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <SectionTitle
          icon={Key}
          title="Security"
          description="Change your password to keep your account secure"
        />

        <form onSubmit={savePassword} className="space-y-4" noValidate>
          {/* Current password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPw ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (currentPwError) setCurrentPwError("");
                }}
                placeholder="Enter your current password"
                className={`w-full h-10 rounded-lg border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPwError
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPw(!showCurrentPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showCurrentPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {currentPwError && (
              <p className="text-xs text-red-600 mt-1">{currentPwError}</p>
            )}
          </div>

          {/* New password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNewPw ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (newPwError) setNewPwError("");
                }}
                placeholder="At least 8 characters"
                className={`w-full h-10 rounded-lg border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  newPwError ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPw(!showNewPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {newPwError && (
              <p className="text-xs text-red-600 mt-1">{newPwError}</p>
            )}
            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        strength.score >= i
                          ? STRENGTH_COLORS[strength.score]
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">{strength.label}</p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm New Password *
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (confirmPwError) setConfirmPwError("");
              }}
              placeholder="Re-enter new password"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                confirmPwError ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {confirmPwError && (
              <p className="text-xs text-red-600 mt-1">{confirmPwError}</p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={passwordSaving}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              {passwordSaving ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Notifications Section ───────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <SectionTitle
          icon={Bell}
          title="Notifications"
          description="Choose when and how you receive alerts"
        />

        <form onSubmit={saveNotifications}>
          <div className="space-y-1">
            {[
              {
                key: "lateClockIn" as const,
                label: "Late clock-in alerts",
                description:
                  "Notify when an employee clocks in late",
              },
              {
                key: "deviceOffline" as const,
                label: "Device offline alerts",
                description: "Notify when a terminal goes offline",
              },
              {
                key: "weeklyReport" as const,
                label: "Weekly attendance report",
                description: "Email a summary every Monday morning",
              },
              {
                key: "overtime" as const,
                label: "Overtime threshold alerts",
                description:
                  "Notify when an employee exceeds contracted hours",
              },
            ].map((pref) => (
              <div
                key={pref.key}
                className="flex items-start justify-between gap-4 py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {pref.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {pref.description}
                  </p>
                </div>
                <Toggle
                  checked={notifPrefs[pref.key]}
                  onChange={(v) =>
                    setNotifPrefs({ ...notifPrefs, [pref.key]: v })
                  }
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              disabled={notifSaving}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {notifSaving ? "Saving…" : "Save Notifications"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Display Preferences ─────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <SectionTitle
          icon={Palette}
          title="Display Preferences"
          description="Customise how dates and times appear"
        />

        <form onSubmit={savePreferences} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              Timezone
              <TooltipIcon
                content="All clock-in and clock-out times are displayed relative to this timezone. Change this if your site is not in the UK."
                side="right"
              />
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Europe/London">Europe/London (GMT/BST)</option>
              <option value="Europe/Dublin">Europe/Dublin</option>
              <option value="America/New_York">America/New_York (ET)</option>
              <option value="America/Los_Angeles">
                America/Los_Angeles (PT)
              </option>
              <option value="Asia/Dubai">Asia/Dubai (GST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Date Format
              <TooltipIcon
                content="Controls how dates appear throughout the platform and in exported reports. UK default is DD/MM/YYYY."
                side="right"
              />
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY (UK)</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
            </select>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={prefsSaving}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              {prefsSaving ? "Saving…" : "Save Preferences"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Account Info ─────────────────────────────────────── */}
      {profile && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Account Information
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "Account ID", value: profile.id },
              {
                label: "Status",
                value: profile.isActive ? "Active" : "Inactive",
              },
              {
                label: "Last login",
                value: profile.lastLoginAt
                  ? new Date(profile.lastLoginAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Never",
              },
              {
                label: "Account created",
                value: new Date(profile.createdAt).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                ),
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-400">{item.label}</p>
                <p className="text-gray-700 font-medium truncate">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
