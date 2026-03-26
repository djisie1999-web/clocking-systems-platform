"use client";
import { useState, useEffect } from "react";
import {
  Monitor,
  Wifi,
  WifiOff,
  Plus,
  RefreshCw,
  Clock,
  Users,
  Activity,
  Trash2,
  Settings,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipIcon } from "@/components/ui/tooltip";

interface Device {
  id: string;
  name: string;
  model: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  firmwareVersion: string;
  status: "online" | "offline";
  lastSeen: string;
  totalClockIns: number;
  enrolledEmployees: number;
  uptime: string;
}

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function DeviceSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
        <Skeleton className="h-12 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 flex-1 rounded-lg" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
    </div>
  );
}

function DeviceCard({ device }: { device: Device }) {
  const online = device.status === "online";

  return (
    <div
      className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${
        online ? "border-gray-200" : "border-red-200"
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                online ? "bg-blue-50" : "bg-red-50"
              }`}
            >
              <Monitor
                className={`w-5 h-5 ${online ? "text-blue-600" : "text-red-500"}`}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {device.name}
              </h3>
              <p className="text-xs text-gray-500">{device.location}</p>
            </div>
          </div>
          <Badge variant={online ? "success" : "destructive"}>
            <span className="flex items-center gap-1">
              {online ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3" />
              )}
              {online ? "Online" : "Offline"}
            </span>
          </Badge>
        </div>

        <p className="text-xs text-gray-400">{device.model}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
        {[
          {
            label: "Clock-ins",
            value: device.totalClockIns.toLocaleString(),
            icon: Activity,
            color: "text-blue-600",
          },
          {
            label: "Employees",
            value: device.enrolledEmployees,
            icon: Users,
            color: "text-emerald-600",
          },
          {
            label: "Uptime",
            value: device.uptime,
            icon: Clock,
            color: "text-purple-600",
          },
        ].map((stat) => (
          <div key={stat.label} className="p-3 text-center">
            <stat.icon
              className={`w-3.5 h-3.5 mx-auto mb-1 ${stat.color}`}
            />
            <div className="text-sm font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Tooltip content="The local network IP address assigned to this terminal. Used to communicate with the device." side="top">
              <span className="cursor-help underline decoration-dotted">IP</span>
            </Tooltip>
            : {device.ipAddress}
          </span>
          <span className="flex items-center gap-1">
            <Tooltip content="Firmware version running on this terminal. Keep devices updated for latest features and security patches." side="top">
              <span className="cursor-help underline decoration-dotted">FW</span>
            </Tooltip>
            : v{device.firmwareVersion}
          </span>
        </div>
        <div className="text-xs text-gray-400">
          Last seen: {timeAgo(device.lastSeen)}
        </div>

        {!online && (
          <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2 mt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            Device unreachable — check power and network
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button className="flex-1 inline-flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
            <Settings className="w-3.5 h-3.5" />
            Configure
          </button>
          <button className="w-8 h-8 rounded-lg inline-flex items-center justify-center bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchDevices(isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const res = await fetch("/api/devices");
      if (!res.ok) throw new Error("Failed to load devices");
      const data = (await res.json()) as { devices: Device[] };
      setDevices(data.devices ?? []);
      setError(null);
    } catch {
      setError("Could not load devices. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  const onlineCount = devices.filter((d) => d.status === "online").length;
  const offlineCount = devices.filter((d) => d.status === "offline").length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Devices</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage your clocking terminals and hardware
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchDevices(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 h-9 px-3 rounded-lg text-sm font-medium border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors">
            <Plus className="w-4 h-4" />
            Add Device
          </button>
        </div>
      </div>

      {/* Summary stats */}
      {!loading && devices.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Devices",
              value: devices.length,
              color: "text-gray-900",
              bg: "bg-gray-50",
            },
            {
              label: "Online",
              value: onlineCount,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
            {
              label: "Offline",
              value: offlineCount,
              color: "text-red-600",
              bg: "bg-red-50",
            },
            {
              label: "Total Clock-ins",
              value: devices
                .reduce((s, d) => s + d.totalClockIns, 0)
                .toLocaleString(),
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-xl p-4 text-center`}
            >
              <div className={`text-2xl font-bold ${stat.color} mb-0.5`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm">{error}</p>
          <button
            onClick={() => fetchDevices()}
            className="ml-auto text-sm font-medium underline hover:no-underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <DeviceSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && devices.length === 0 && (
        <div className="max-w-md mx-auto py-16 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Monitor className="w-10 h-10 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            No terminals connected yet
          </h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            Connect your first clocking terminal to start tracking employee
            attendance in real time.
          </p>
          <button className="inline-flex items-center gap-2 h-10 px-6 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow transition-colors mb-8">
            <Plus className="w-4 h-4" />
            Add Your First Device
          </button>

          {/* What you'll need */}
          <div className="bg-gray-50 rounded-xl border border-gray-200 p-5 text-left">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              What you&apos;ll need
            </p>
            <div className="space-y-2.5">
              {[
                {
                  label: "Device IP address",
                  tip: "Found in your router's connected devices list, or on the terminal's network settings screen",
                },
                {
                  label: "MAC address",
                  tip: "Printed on a label on the back or underside of the terminal",
                },
                {
                  label: "Firmware version",
                  tip: "Displayed in the terminal's About or System Info menu",
                },
                {
                  label: "Location name",
                  tip: "A descriptive label e.g. 'Main Entrance', 'Warehouse Door 2'",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <TooltipIcon content={item.tip} side="right" />
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Need help?{" "}
            <a href="/help#guides" className="text-blue-500 hover:underline">
              View device setup guide →
            </a>
          </p>
        </div>
      )}

      {/* Device grid */}
      {!loading && devices.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}

      {/* Offline warning banner */}
      {!loading && offlineCount > 0 && (
        <div className="mt-8 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">
              {offlineCount} device{offlineCount > 1 ? "s" : ""} offline
            </p>
            <p className="text-xs text-amber-700 mt-0.5">
              Employees assigned to offline terminals cannot clock in. Check the
              device power and network connection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
