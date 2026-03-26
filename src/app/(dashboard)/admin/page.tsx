"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Shield,
  Users,
  Search,
  UserPlus,
  CheckCircle,
  XCircle,
  Crown,
  User,
  Trash2,
  ToggleLeft,
  ToggleRight,
  X,
  Edit2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SystemUser {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string | null) {
  if (!dateStr) return "Never";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Row Skeleton ─────────────────────────────────────────────────────────────

function RowSkeleton() {
  return (
    <tr className="border-b border-gray-100">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}

// ─── User Form Modal ──────────────────────────────────────────────────────────

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  isActive: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function UserModal({
  mode,
  initial,
  onClose,
  onSuccess,
}: {
  mode: "create" | "edit";
  initial?: SystemUser;
  onClose: () => void;
  onSuccess: (user: SystemUser) => void;
}) {
  const { toasts, removeToast, toast } = useToast();

  const [form, setForm] = useState<UserFormData>({
    name: initial?.name ?? "",
    email: initial?.email ?? "",
    password: "",
    role: initial?.role ?? "USER",
    isActive: initial?.isActive ?? true,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const [showPw, setShowPw] = useState(false);

  function validate(): boolean {
    const errs: FormErrors = {};

    if (!form.name.trim()) {
      errs.name = "Full name is required";
    } else if (form.name.trim().length > 100) {
      errs.name = "Name must be 100 characters or fewer";
    }

    if (!form.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address";
    }

    if (mode === "create") {
      if (!form.password) {
        errs.password = "Password is required";
      } else if (form.password.length < 8) {
        errs.password = "Password must be at least 8 characters";
      } else if (form.password.length > 128) {
        errs.password = "Password must be 128 characters or fewer";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      let res: Response;
      if (mode === "create") {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            password: form.password,
            role: form.role,
            isActive: form.isActive,
          }),
        });
      } else {
        const payload: Record<string, unknown> = {
          role: form.role,
          isActive: form.isActive,
        };
        if (form.name.trim() !== initial?.name) payload.name = form.name.trim();
        if (form.email.trim() !== initial?.email)
          payload.email = form.email.trim();
        if (form.password) payload.password = form.password;

        res = await fetch(`/api/users/${initial!.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = (await res.json()) as {
        data?: SystemUser;
        error?: string;
      };

      if (!res.ok) {
        toast.error(
          mode === "create" ? "Failed to create user" : "Failed to update user",
          data.error ?? "An unexpected error occurred"
        );
      } else {
        onSuccess(data.data!);
        onClose();
      }
    } catch {
      toast.error("Network error", "Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            {mode === "create" ? (
              <UserPlus className="w-4 h-4 text-blue-600" />
            ) : (
              <Edit2 className="w-4 h-4 text-blue-600" />
            )}
            {mode === "create" ? "Create New User" : `Edit ${initial?.name}`}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-4"
          noValidate
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => {
                setForm({ ...form, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="Jane Smith"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="jane@company.co.uk"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {mode === "create" ? "Password *" : "New Password"}
              {mode === "edit" && (
                <span className="text-gray-400 font-normal ml-1">
                  (leave blank to keep unchanged)
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                placeholder={
                  mode === "create"
                    ? "Minimum 8 characters"
                    : "Enter to change password"
                }
                className={`w-full h-10 rounded-lg border px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPw ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as "ADMIN" | "USER" })
              }
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          {/* Active (edit only) */}
          {mode === "edit" && (
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Account Active
                </p>
                <p className="text-xs text-gray-500">
                  Inactive accounts cannot log in
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform" />
              </label>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-10 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-10 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors disabled:opacity-60"
            >
              {saving
                ? mode === "create"
                  ? "Creating…"
                  : "Saving…"
                : mode === "create"
                ? "Create User"
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({
  user,
  onClose,
  onConfirm,
  deleting,
}: {
  user: SystemUser;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="p-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
            Delete User
          </h3>
          <p className="text-sm text-gray-500 text-center mb-1">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">{user.name}</span>?
          </p>
          <p className="text-xs text-red-500 text-center mb-6">
            This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 h-10 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={deleting}
              className="flex-1 h-10 rounded-lg text-sm font-semibold bg-red-600 text-white hover:bg-red-700 shadow transition-colors disabled:opacity-60"
            >
              {deleting ? "Deleting…" : "Delete User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { toasts, removeToast, toast } = useToast();

  const [users, setUsers] = useState<SystemUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<SystemUser | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<SystemUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ── Fetch users ───────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);

    const params = new URLSearchParams({ page: String(page), limit: "15" });
    if (search) params.set("search", search);
    if (roleFilter) params.set("role", roleFilter);

    try {
      const res = await fetch(`/api/users?${params.toString()}`);

      if (res.status === 403 || res.status === 401) {
        setForbidden(true);
        return;
      }

      if (!res.ok) throw new Error("Failed to load users");

      const data = (await res.json()) as {
        data: SystemUser[];
        pagination: Pagination;
      };

      setUsers(data.data ?? []);
      setPagination(data.pagination ?? null);
    } catch {
      toast.error("Failed to load users", "Please try refreshing the page.");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, roleFilter, page]);

  useEffect(() => {
    const timer = setTimeout(fetchUsers, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [fetchUsers, search]);

  // ── Toggle active ─────────────────────────────────────────
  async function toggleActive(u: SystemUser) {
    try {
      const res = await fetch(`/api/users/${u.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !u.isActive }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error("Update failed", data.error ?? "Could not update user status");
        return;
      }

      setUsers((prev) =>
        prev.map((x) => (x.id === u.id ? { ...x, isActive: !u.isActive } : x))
      );
      toast.success(
        u.isActive ? "User deactivated" : "User activated",
        `${u.name} is now ${u.isActive ? "inactive" : "active"}.`
      );
    } catch {
      toast.error("Network error", "Please try again.");
    }
  }

  // ── Confirm delete ────────────────────────────────────────
  async function confirmDelete() {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/users/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        toast.error("Delete failed", data.error ?? "Could not delete user");
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      if (pagination) {
        setPagination({ ...pagination, total: pagination.total - 1 });
      }
      toast.success("User deleted", `${deleteTarget.name} has been removed.`);
      setDeleteTarget(null);
    } catch {
      toast.error("Network error", "Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  // ── Access denied ─────────────────────────────────────────
  if (forbidden) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-sm text-gray-500">
            You need Administrator privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
              Admin
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Manage platform accounts, roles, and access
          </p>
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Create User
        </button>
      </div>

      {/* Stats */}
      {pagination && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            {
              label: "Total Users",
              value: pagination.total,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Admins",
              value: users.filter((u) => u.role === "ADMIN").length,
              icon: Crown,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "Active",
              value: users.filter((u) => u.isActive).length,
              icon: CheckCircle,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-4 flex items-center gap-3`}
            >
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div>
                <div className="text-xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email…"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="h-9 px-3 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["User", "Role", "Status", "Last Login", "Joined", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <RowSkeleton key={i} />
                  ))
                : users.map((u) => (
                    <tr
                      key={u.id}
                      className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !u.isActive ? "opacity-60" : ""
                      }`}
                    >
                      {/* User */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                            {u.role === "ADMIN" ? (
                              <Crown className="w-4 h-4 text-amber-500" />
                            ) : (
                              <span className="text-blue-700 font-semibold text-xs">
                                {u.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {u.name}
                            </div>
                            <div className="text-xs text-gray-500 truncate max-w-[160px]">
                              {u.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <Badge
                          variant={u.role === "ADMIN" ? "warning" : "secondary"}
                        >
                          <span className="flex items-center gap-1">
                            {u.role === "ADMIN" ? (
                              <Crown className="w-3 h-3" />
                            ) : (
                              <User className="w-3 h-3" />
                            )}
                            {u.role}
                          </span>
                        </Badge>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <Badge
                          variant={u.isActive ? "success" : "destructive"}
                        >
                          <span className="flex items-center gap-1">
                            {u.isActive ? (
                              <CheckCircle className="w-3 h-3" />
                            ) : (
                              <XCircle className="w-3 h-3" />
                            )}
                            {u.isActive ? "Active" : "Inactive"}
                          </span>
                        </Badge>
                      </td>

                      {/* Last login */}
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(u.lastLoginAt)}
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {formatDate(u.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          {/* Edit */}
                          <button
                            onClick={() => setEditTarget(u)}
                            title="Edit user"
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          {/* Toggle active */}
                          <button
                            onClick={() => toggleActive(u)}
                            title={u.isActive ? "Deactivate" : "Activate"}
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          >
                            {u.isActive ? (
                              <ToggleRight className="w-4 h-4" />
                            ) : (
                              <ToggleLeft className="w-4 h-4" />
                            )}
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => setDeleteTarget(u)}
                            title="Delete user"
                            className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {!loading && users.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">
              No users found
            </h3>
            <p className="text-sm text-gray-500">
              {search || roleFilter
                ? "Try adjusting your filters."
                : "Create the first user account."}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-xs text-gray-400">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.total} users
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="h-8 w-8 rounded-lg flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm text-gray-600 px-2">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="h-8 w-8 rounded-lg flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      {createOpen && (
        <UserModal
          mode="create"
          onClose={() => setCreateOpen(false)}
          onSuccess={(user) => {
            toast.success("User created", `${user.name} has been added.`);
            fetchUsers();
          }}
        />
      )}

      {editTarget && (
        <UserModal
          mode="edit"
          initial={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={(updated) => {
            setUsers((prev) =>
              prev.map((u) => (u.id === updated.id ? updated : u))
            );
            toast.success("User updated", `${updated.name}'s profile saved.`);
          }}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          user={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          deleting={deleting}
        />
      )}

      <Toaster toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
