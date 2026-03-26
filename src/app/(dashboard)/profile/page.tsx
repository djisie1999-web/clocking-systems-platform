"use client";

import { useState, useEffect } from "react";
import {
  User,
  Lock,
  Shield,
  Calendar,
  Clock,
  Mail,
  Eye,
  EyeOff,
  Save,
  CheckCircle,
  Edit2,
  Key,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(dateStr: string | null): string {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Password strength ────────────────────────────────────────────────────────

function getStrength(pw: string): { label: string; score: number } {
  if (pw.length === 0) return { label: "", score: 0 };
  if (pw.length < 8) return { label: "Too short", score: 1 };
  if (pw.length < 10) return { label: "Weak", score: 2 };
  if (pw.length < 12) return { label: "Fair", score: 3 };
  return { label: "Strong", score: 4 };
}

const STRENGTH_COLORS = ["", "bg-red-400", "bg-amber-400", "bg-blue-400", "bg-emerald-500"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { toasts, removeToast, toast } = useToast();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Profile editing
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Password change
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [currentPwError, setCurrentPwError] = useState("");
  const [newPwError, setNewPwError] = useState("");
  const [confirmPwError, setConfirmPwError] = useState("");

  // ── Fetch profile ─────────────────────────────────────────────
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

  // ── Validate profile ──────────────────────────────────────────
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

  // ── Save profile ──────────────────────────────────────────────
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
      const data = (await res.json()) as { data?: UserProfile; error?: string };

      if (!res.ok) {
        toast.error("Update failed", data.error ?? "Could not save profile");
      } else {
        setProfile(data.data ?? null);
        setEditMode(false);
        toast.success("Profile updated", "Your changes have been saved.");
      }
    } catch {
      toast.error("Network error", "Please check your connection and try again.");
    } finally {
      setProfileSaving(false);
    }
  }

  function cancelEdit() {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
    setNameError("");
    setEmailError("");
    setEditMode(false);
  }

  // ── Validate password ─────────────────────────────────────────
  function validatePassword(): boolean {
    let ok = true;
    setCurrentPwError("");
    setNewPwError("");
    setConfirmPwError("");

    if (!currentPw) {
      setCurrentPwError("Current password is required");
      ok = false;
    }

    if (!newPw) {
      setNewPwError("New password is required");
      ok = false;
    } else if (newPw.length < 8) {
      setNewPwError("Password must be at least 8 characters");
      ok = false;
    } else if (newPw.length > 128) {
      setNewPwError("Password must be 128 characters or fewer");
      ok = false;
    }

    if (!confirmPw) {
      setConfirmPwError("Please confirm your new password");
      ok = false;
    } else if (newPw && confirmPw !== newPw) {
      setConfirmPwError("Passwords do not match");
      ok = false;
    }

    return ok;
  }

  // ── Save password ─────────────────────────────────────────────
  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!validatePassword()) return;

    setPwSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        toast.error("Password update failed", data.error ?? "Could not update password");
      } else {
        setCurrentPw("");
        setNewPw("");
        setConfirmPw("");
        toast.success("Password updated", "Your new password is now active.");
      }
    } catch {
      toast.error("Network error", "Please check your connection and try again.");
    } finally {
      setPwSaving(false);
    }
  }

  const strength = getStrength(newPw);

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          View and update your personal information
        </p>
      </div>

      {/* ── Avatar + Summary card ─────────────────────────────── */}
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-center gap-5">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ) : profile ? (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center shrink-0 border-2 border-white/40">
              <span className="text-2xl font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-blue-100 text-sm mt-0.5">{profile.email}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                  <Shield className="w-3.5 h-3.5" />
                  {profile.role === "ADMIN" ? "Administrator" : "Standard User"}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                    profile.isActive
                      ? "bg-emerald-400/30 text-emerald-100"
                      : "bg-red-400/30 text-red-100"
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  {profile.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* ── Profile Information ───────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Profile Information
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Update your name and email address
              </p>
            </div>
          </div>
          {!editMode && !loading && (
            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors border border-blue-200"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ) : editMode ? (
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

            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={cancelEdit}
                className="h-9 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={profileSaving}
                className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                {profileSaving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <InfoRow icon={User} label="Full Name" value={profile?.name ?? "—"} />
            <InfoRow icon={Mail} label="Email Address" value={profile?.email ?? "—"} />
            <InfoRow
              icon={Shield}
              label="Role"
              value={profile?.role === "ADMIN" ? "Administrator" : "Standard User"}
            />
          </div>
        )}
      </div>

      {/* ── Change Password ───────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
            <Key className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Choose a strong password with at least 8 characters
            </p>
          </div>
        </div>

        <form onSubmit={savePassword} className="space-y-4" noValidate>
          {/* Current password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrentPw ? "text" : "password"}
                value={currentPw}
                onChange={(e) => {
                  setCurrentPw(e.target.value);
                  if (currentPwError) setCurrentPwError("");
                }}
                placeholder="Your current password"
                className={`w-full h-10 rounded-lg border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  currentPwError ? "border-red-300 bg-red-50" : "border-gray-300"
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
                value={newPw}
                onChange={(e) => {
                  setNewPw(e.target.value);
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
                {showNewPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {newPwError && (
              <p className="text-xs text-red-600 mt-1">{newPwError}</p>
            )}
            {newPw.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        strength.score >= i ? STRENGTH_COLORS[strength.score] : "bg-gray-200"
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
              value={confirmPw}
              onChange={(e) => {
                setConfirmPw(e.target.value);
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

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={pwSaving}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              {pwSaving ? "Updating…" : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* ── Account Metadata ──────────────────────────────────── */}
      {profile && (
        <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Shield, label: "Account ID", value: profile.id },
              {
                icon: CheckCircle,
                label: "Account Status",
                value: profile.isActive ? "Active" : "Inactive",
              },
              {
                icon: Clock,
                label: "Last Login",
                value: formatDateTime(profile.lastLoginAt),
              },
              {
                icon: Calendar,
                label: "Member Since",
                value: formatDate(profile.createdAt),
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 bg-white rounded-lg border border-gray-200 p-3"
              >
                <item.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ─── InfoRow ──────────────────────────────────────────────────────────────────

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2.5 border-b border-gray-100 last:border-0">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
        <Icon className="w-4 h-4 text-gray-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 truncate">{value}</p>
      </div>
    </div>
  );
}
