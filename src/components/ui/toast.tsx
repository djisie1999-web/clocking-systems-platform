"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, X, AlertCircle, Info } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

// ─── Single Toast ─────────────────────────────────────────────────────────────

function ToastIcon({ type }: { type: ToastType }) {
  const cls = "w-5 h-5 shrink-0 mt-0.5";
  switch (type) {
    case "success":
      return <CheckCircle className={`${cls} text-emerald-500`} />;
    case "error":
      return <XCircle className={`${cls} text-red-500`} />;
    case "warning":
      return <AlertCircle className={`${cls} text-amber-500`} />;
    case "info":
      return <Info className={`${cls} text-blue-500`} />;
  }
}

function SingleToast({
  item,
  onRemove,
}: {
  item: ToastItem;
  onRemove: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 10);
    const t2 = setTimeout(() => setVisible(false), 3700);
    const t3 = setTimeout(onRemove, 4100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onRemove]);

  function dismiss() {
    setVisible(false);
    setTimeout(onRemove, 300);
  }

  const borderColor = {
    success: "border-emerald-200",
    error: "border-red-200",
    warning: "border-amber-200",
    info: "border-blue-200",
  }[item.type];

  return (
    <div
      className={`
        flex items-start gap-3 w-80 rounded-xl border shadow-xl bg-white
        px-4 py-3 transition-all duration-300
        ${borderColor}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
    >
      <ToastIcon type={item.type} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {item.title}
        </p>
        {item.message && (
          <p className="text-xs text-gray-500 mt-0.5 leading-snug">
            {item.message}
          </p>
        )}
      </div>
      <button
        onClick={dismiss}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Toaster Container ────────────────────────────────────────────────────────

export function Toaster({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <SingleToast item={t} onRemove={() => onRemove(t.id)} />
        </div>
      ))}
    </div>
  );
}
