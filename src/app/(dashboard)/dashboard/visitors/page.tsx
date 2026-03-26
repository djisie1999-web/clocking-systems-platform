"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserCheck,
  UserX,
  Search,
  Plus,
  Clock,
  Building2,
  AlertCircle,
  Filter,
  X,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Visitor {
  id: string;
  name: string;
  company: string;
  host: string;
  purpose: string;
  signedInAt: string;
  signedOutAt: string | null;
  badge: string;
  status: "signed-in" | "signed-out";
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_VISITORS: Visitor[] = [
  {
    id: "v1",
    name: "Rachel Morris",
    company: "Apex Logistics",
    host: "Tom Walsh",
    purpose: "Supplier meeting",
    signedInAt: "09:14",
    signedOutAt: null,
    badge: "V-001",
    status: "signed-in",
  },
  {
    id: "v2",
    name: "James Turner",
    company: "TechSupport Ltd",
    host: "Sarah Green",
    purpose: "IT maintenance",
    signedInAt: "08:45",
    signedOutAt: "11:30",
    badge: "V-002",
    status: "signed-out",
  },
  {
    id: "v3",
    name: "Linda Clarke",
    company: "Clarke & Associates",
    host: "Mike Peters",
    purpose: "Audit review",
    signedInAt: "10:00",
    signedOutAt: null,
    badge: "V-003",
    status: "signed-in",
  },
  {
    id: "v4",
    name: "Steven Hall",
    company: "BrightMark Agency",
    host: "Janet Brown",
    purpose: "Marketing consultation",
    signedInAt: "11:15",
    signedOutAt: "13:45",
    badge: "V-004",
    status: "signed-out",
  },
  {
    id: "v5",
    name: "Priya Sharma",
    company: "Compliance Partners",
    host: "Dave King",
    purpose: "Annual compliance check",
    signedInAt: "13:00",
    signedOutAt: null,
    badge: "V-005",
    status: "signed-in",
  },
];

// ─── Sign In Modal ──────────────────────────────────────────────────────────────

function SignInModal({ onClose, onSignIn }: { onClose: () => void; onSignIn: (v: Omit<Visitor, "id" | "badge" | "signedOutAt" | "status">) => void }) {
  const [form, setForm] = useState({ name: "", company: "", host: "", purpose: "" });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.host.trim()) e.host = "Host name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onSignIn({
      name: form.name.trim(),
      company: form.company.trim() || "—",
      host: form.host.trim(),
      purpose: form.purpose.trim() || "Visit",
      signedInAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            Sign In Visitor
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
              placeholder="Jane Smith"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"}`}
            />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Acme Ltd (optional)"
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Host / Meeting With *</label>
            <input
              type="text"
              value={form.host}
              onChange={(e) => { setForm({ ...form, host: e.target.value }); if (errors.host) setErrors({ ...errors, host: undefined }); }}
              placeholder="Employee they are visiting"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.host ? "border-red-300 bg-red-50" : "border-gray-300"}`}
            />
            {errors.host && <p className="text-xs text-red-600 mt-1">{errors.host}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Purpose of Visit</label>
            <input
              type="text"
              value={form.purpose}
              onChange={(e) => setForm({ ...form, purpose: e.target.value })}
              placeholder="e.g. Supplier meeting, Delivery, Interview"
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="flex-1 h-10 rounded-lg text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow transition-colors">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Visitor Card (mobile) ─────────────────────────────────────────────────────

function VisitorCard({ visitor, onSignOut }: { visitor: Visitor; onSignOut: (id: string) => void }) {
  const isIn = visitor.status === "signed-in";
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${isIn ? "bg-emerald-100" : "bg-gray-100"}`}>
            <span className={`font-semibold text-sm ${isIn ? "text-emerald-700" : "text-gray-500"}`}>
              {visitor.name.charAt(0)}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{visitor.name}</p>
            <p className="text-xs text-gray-500 truncate">{visitor.company}</p>
          </div>
        </div>
        <Badge variant={isIn ? "success" : "secondary"}>
          <span className="flex items-center gap-1">
            {isIn ? <CheckCircle className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
            {isIn ? "Signed in" : "Signed out"}
          </span>
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
        <div>
          <p className="text-gray-400 mb-0.5">Host</p>
          <p className="font-medium text-gray-800 truncate">{visitor.host}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Purpose</p>
          <p className="font-medium text-gray-800 truncate">{visitor.purpose}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Time In</p>
          <p className="font-medium text-gray-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />{visitor.signedInAt}
          </p>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Time Out</p>
          <p className="font-medium text-gray-800">{visitor.signedOutAt ?? "—"}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400 font-mono">{visitor.badge}</span>
        {isIn && (
          <button
            onClick={() => onSignOut(visitor.id)}
            className="h-8 px-3 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function VisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Simulate load
    const t = setTimeout(() => {
      setVisitors(MOCK_VISITORS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleSignOut = useCallback((id: string) => {
    setVisitors((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: "signed-out" as const,
              signedOutAt: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
            }
          : v
      )
    );
  }, []);

  const handleSignIn = useCallback(
    (data: Omit<Visitor, "id" | "badge" | "signedOutAt" | "status">) => {
      const newVisitor: Visitor = {
        ...data,
        id: `v${Date.now()}`,
        badge: `V-${String(visitors.length + 1).padStart(3, "0")}`,
        signedOutAt: null,
        status: "signed-in",
      };
      setVisitors((prev) => [newVisitor, ...prev]);
    },
    [visitors.length]
  );

  const filtered = visitors.filter((v) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      v.name.toLowerCase().includes(q) ||
      v.company.toLowerCase().includes(q) ||
      v.host.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const signedInCount = visitors.filter((v) => v.status === "signed-in").length;
  const signedOutCount = visitors.filter((v) => v.status === "signed-out").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Visitors</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Visitor sign-in log and badge management
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Sign In Visitor
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "On Site Now", value: signedInCount, color: "bg-emerald-50 text-emerald-700", icon: UserCheck, iconColor: "text-emerald-500" },
          { label: "Signed Out Today", value: signedOutCount, color: "bg-gray-50 text-gray-700", icon: UserX, iconColor: "text-gray-400" },
          { label: "Total Today", value: visitors.length, color: "bg-blue-50 text-blue-700", icon: Building2, iconColor: "text-blue-500" },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4 flex items-center gap-3`}>
            <stat.icon className={`w-5 h-5 ${stat.iconColor} shrink-0`} />
            <div>
              <div className="text-2xl font-bold leading-none">{stat.value}</div>
              <div className="text-xs opacity-75 mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company or host…"
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 pl-9 pr-8 rounded-lg border border-gray-300 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none w-full sm:w-auto"
          >
            <option value="">All Status</option>
            <option value="signed-in">On Site</option>
            <option value="signed-out">Signed Out</option>
          </select>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="sm:hidden space-y-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))
          : filtered.length === 0
          ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserCheck className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No visitors found</p>
            </div>
          )
          : filtered.map((v) => (
              <VisitorCard key={v.id} visitor={v} onSignOut={handleSignOut} />
            ))}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Visitor", "Company", "Host", "Purpose", "Time In", "Time Out", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                        <td key={j} className="px-4 py-3">
                          <Skeleton className="h-4 w-16" />
                        </td>
                      ))}
                    </tr>
                  ))
                : filtered.map((v) => {
                    const isIn = v.status === "signed-in";
                    return (
                      <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isIn ? "bg-emerald-100" : "bg-gray-100"}`}>
                              <span className={`font-semibold text-xs ${isIn ? "text-emerald-700" : "text-gray-500"}`}>
                                {v.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{v.name}</p>
                              <p className="text-xs text-gray-400 font-mono">{v.badge}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{v.company}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{v.host}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 max-w-[160px] truncate">{v.purpose}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-sm text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />{v.signedInAt}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">{v.signedOutAt ?? "—"}</td>
                        <td className="px-4 py-3">
                          <Badge variant={isIn ? "success" : "secondary"}>
                            <span className="flex items-center gap-1">
                              {isIn ? <CheckCircle className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                              {isIn ? "On site" : "Out"}
                            </span>
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          {isIn && (
                            <button
                              onClick={() => handleSignOut(v.id)}
                              className="h-7 px-2.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors whitespace-nowrap"
                            >
                              Sign Out
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>

        {!loading && filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              {search || statusFilter ? (
                <Search className="w-7 h-7 text-gray-400" />
              ) : (
                <UserCheck className="w-7 h-7 text-gray-400" />
              )}
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {search || statusFilter ? "No visitors match your filters" : "No visitors today"}
            </p>
            {(search || statusFilter) && (
              <button
                onClick={() => { setSearch(""); setStatusFilter(""); }}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">
          Showing {filtered.length} visitor{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {showModal && (
        <SignInModal onClose={() => setShowModal(false)} onSignIn={handleSignIn} />
      )}
    </div>
  );
}
