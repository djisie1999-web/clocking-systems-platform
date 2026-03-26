"use client";

import { useState, useEffect, useCallback } from "react";
import {
  HardHat,
  Search,
  Plus,
  Clock,
  Building2,
  AlertCircle,
  Filter,
  X,
  CheckCircle,
  XCircle,
  CalendarDays,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Types ─────────────────────────────────────────────────────────────────────

type ContractorStatus = "active" | "on-site" | "completed";
type AccessLevel = "Full Site" | "Restricted" | "Visitor";

interface Contractor {
  id: string;
  name: string;
  company: string;
  contact: string;
  site: string;
  accessLevel: AccessLevel;
  startDate: string;
  endDate: string;
  hoursToday: number;
  status: ContractorStatus;
  induction: boolean;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: "c1",
    name: "Gary Watts",
    company: "Watts Electrical Services",
    contact: "07700 900111",
    site: "Main Building",
    accessLevel: "Full Site",
    startDate: "2026-03-24",
    endDate: "2026-04-07",
    hoursToday: 4.5,
    status: "on-site",
    induction: true,
  },
  {
    id: "c2",
    name: "Michelle Ford",
    company: "CleanPro UK",
    contact: "07700 900222",
    site: "All Areas",
    accessLevel: "Full Site",
    startDate: "2026-01-06",
    endDate: "2026-12-31",
    hoursToday: 3.0,
    status: "on-site",
    induction: true,
  },
  {
    id: "c3",
    name: "Darren Price",
    company: "SafeGuard Security",
    contact: "07700 900333",
    site: "Reception & Car Park",
    accessLevel: "Restricted",
    startDate: "2026-02-01",
    endDate: "2026-07-31",
    hoursToday: 0,
    status: "active",
    induction: true,
  },
  {
    id: "c4",
    name: "Nina Patel",
    company: "IT Solutions Ltd",
    contact: "07700 900444",
    site: "Server Room",
    accessLevel: "Restricted",
    startDate: "2026-03-25",
    endDate: "2026-03-26",
    hoursToday: 2.0,
    status: "completed",
    induction: true,
  },
  {
    id: "c5",
    name: "Liam Barker",
    company: "Barker Plumbing",
    contact: "07700 900555",
    site: "Warehouse",
    accessLevel: "Restricted",
    startDate: "2026-03-26",
    endDate: "2026-03-28",
    hoursToday: 1.5,
    status: "on-site",
    induction: false,
  },
];

const ACCESS_COLORS: Record<AccessLevel, string> = {
  "Full Site": "bg-emerald-100 text-emerald-700",
  "Restricted": "bg-amber-100 text-amber-700",
  "Visitor": "bg-gray-100 text-gray-600",
};

const STATUS_CONFIG: Record<ContractorStatus, { label: string; variant: "success" | "warning" | "secondary" }> = {
  "on-site": { label: "On Site", variant: "success" },
  "active": { label: "Active", variant: "warning" },
  "completed": { label: "Completed", variant: "secondary" },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Add Contractor Modal ──────────────────────────────────────────────────────

function AddContractorModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (c: Omit<Contractor, "id" | "hoursToday" | "status">) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    contact: "",
    site: "",
    accessLevel: "Restricted" as AccessLevel,
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    induction: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  function validate() {
    const e: Partial<Record<keyof typeof form, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.endDate) e.endDate = "End date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    onAdd({
      name: form.name.trim(),
      company: form.company.trim(),
      contact: form.contact.trim() || "—",
      site: form.site.trim() || "General",
      accessLevel: form.accessLevel,
      startDate: form.startDate,
      endDate: form.endDate,
      induction: form.induction,
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <HardHat className="w-4 h-4 text-blue-600" />
            Add Contractor
          </h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4" noValidate>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
            <input type="text" value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
              placeholder="John Smith"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-300 bg-red-50" : "border-gray-300"}`} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company *</label>
            <input type="text" value={form.company} onChange={(e) => { setForm({ ...form, company: e.target.value }); if (errors.company) setErrors({ ...errors, company: undefined }); }}
              placeholder="ABC Contractors Ltd"
              className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.company ? "border-red-300 bg-red-50" : "border-gray-300"}`} />
            {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company}</p>}
          </div>
          {/* Contact + Site */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact</label>
              <input type="text" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="Phone / email"
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Area</label>
              <input type="text" value={form.site} onChange={(e) => setForm({ ...form, site: e.target.value })}
                placeholder="e.g. Warehouse"
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          {/* Access Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Access Level</label>
            <select value={form.accessLevel} onChange={(e) => setForm({ ...form, accessLevel: e.target.value as AccessLevel })}
              className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="Restricted">Restricted</option>
              <option value="Full Site">Full Site</option>
              <option value="Visitor">Visitor</option>
            </select>
          </div>
          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full h-10 rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date *</label>
              <input type="date" value={form.endDate} onChange={(e) => { setForm({ ...form, endDate: e.target.value }); if (errors.endDate) setErrors({ ...errors, endDate: undefined }); }}
                className={`w-full h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endDate ? "border-red-300 bg-red-50" : "border-gray-300"}`} />
              {errors.endDate && <p className="text-xs text-red-600 mt-1">{errors.endDate}</p>}
            </div>
          </div>
          {/* Induction */}
          <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Site Induction Complete</p>
              <p className="text-xs text-gray-500">Required before accessing site</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input type="checkbox" checked={form.induction} onChange={(e) => setForm({ ...form, induction: e.target.checked })} className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-blue-400 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-4 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-transform" />
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-10 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 h-10 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors">Add Contractor</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Contractor Card (mobile) ──────────────────────────────────────────────────

function ContractorCard({ contractor }: { contractor: Contractor }) {
  const cfg = STATUS_CONFIG[contractor.status];
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <HardHat className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-gray-900 truncate">{contractor.name}</p>
            <p className="text-xs text-gray-500 truncate">{contractor.company}</p>
          </div>
        </div>
        <Badge variant={cfg.variant}>
          {cfg.label}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
        <div>
          <p className="text-gray-400 mb-0.5">Site</p>
          <p className="font-medium text-gray-800 truncate">{contractor.site}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Access</p>
          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ACCESS_COLORS[contractor.accessLevel]}`}>
            {contractor.accessLevel}
          </span>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Contract Ends</p>
          <p className="font-medium text-gray-800">{fmtDate(contractor.endDate)}</p>
        </div>
        <div>
          <p className="text-gray-400 mb-0.5">Hrs Today</p>
          <p className="font-medium text-gray-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />{contractor.hoursToday}h
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {contractor.induction ? (
          <span className="flex items-center gap-1 text-xs text-emerald-600">
            <CheckCircle className="w-3 h-3" /> Inducted
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-600">
            <AlertCircle className="w-3 h-3" /> Induction required
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setContractors(MOCK_CONTRACTORS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const handleAdd = useCallback(
    (data: Omit<Contractor, "id" | "hoursToday" | "status">) => {
      const newContractor: Contractor = {
        ...data,
        id: `c${Date.now()}`,
        hoursToday: 0,
        status: "active",
      };
      setContractors((prev) => [newContractor, ...prev]);
    },
    []
  );

  const filtered = contractors.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.site.toLowerCase().includes(q);
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onSiteCount = contractors.filter((c) => c.status === "on-site").length;
  const activeCount = contractors.filter((c) => c.status === "active").length;
  const pendingInduction = contractors.filter((c) => !c.induction).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contractors</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage on-site contractors and access control
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Add Contractor
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {[
          { label: "On Site", value: onSiteCount, color: "bg-emerald-50 text-emerald-700", icon: HardHat, iconColor: "text-emerald-500" },
          { label: "Active Contracts", value: activeCount + onSiteCount, color: "bg-blue-50 text-blue-700", icon: Building2, iconColor: "text-blue-500" },
          { label: "Pending Induction", value: pendingInduction, color: pendingInduction > 0 ? "bg-amber-50 text-amber-700" : "bg-gray-50 text-gray-700", icon: Shield, iconColor: pendingInduction > 0 ? "text-amber-500" : "text-gray-400" },
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

      {/* Induction warning */}
      {!loading && pendingInduction > 0 && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">{pendingInduction} contractor{pendingInduction !== 1 ? "s" : ""}</span>{" "}
            {pendingInduction !== 1 ? "have" : "has"} not completed site induction and should not be on site.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company or site…"
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
            <option value="on-site">On Site</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
                <HardHat className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No contractors found</p>
            </div>
          )
          : filtered.map((c) => <ContractorCard key={c.id} contractor={c} />)}
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                {["Contractor", "Company", "Site", "Access", "Contract End", "Hrs Today", "Induction", "Status"].map((h) => (
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
                : filtered.map((c) => {
                    const cfg = STATUS_CONFIG[c.status];
                    return (
                      <tr key={c.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                              <HardHat className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{c.name}</p>
                              <p className="text-xs text-gray-500">{c.contact}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{c.company}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{c.site}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${ACCESS_COLORS[c.accessLevel]}`}>
                            {c.accessLevel}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <CalendarDays className="w-3.5 h-3.5 text-gray-400" />
                            {fmtDate(c.endDate)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-sm text-gray-700">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />{c.hoursToday}h
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          {c.induction ? (
                            <span className="flex items-center gap-1 text-xs text-emerald-600">
                              <CheckCircle className="w-3.5 h-3.5" /> Done
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs text-amber-600">
                              <AlertCircle className="w-3.5 h-3.5" /> Required
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={cfg.variant}>{cfg.label}</Badge>
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
              <HardHat className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              {search || statusFilter ? "No contractors match your filters" : "No contractors on record"}
            </p>
            {(search || statusFilter) && (
              <button onClick={() => { setSearch(""); setStatusFilter(""); }} className="text-sm text-blue-600 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {!loading && filtered.length > 0 && (
        <p className="text-xs text-gray-400 mt-3 text-right">
          {filtered.length} contractor{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {showModal && (
        <AddContractorModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}
