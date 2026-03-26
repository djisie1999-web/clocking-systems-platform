"use client";

import { useState, useCallback } from "react";
import type { ToastItem, ToastType } from "@/components/ui/toast";

// ─── useToast ─────────────────────────────────────────────────────────────────
//
// Local hook for managing toast notifications.
// Each page/component uses its own instance and renders a <Toaster> alongside it.
//
// Usage:
//   const { toasts, removeToast, toast } = useToast();
//   toast.success("Profile updated", "Your changes have been saved.");
//   toast.error("Failed to save", "Network error. Please try again.");
//   // In JSX:
//   <Toaster toasts={toasts} onRemove={removeToast} />

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastType, title: string, message?: string) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);
    },
    []
  );

  const toast = {
    success: (title: string, message?: string) =>
      addToast("success", title, message),
    error: (title: string, message?: string) =>
      addToast("error", title, message),
    warning: (title: string, message?: string) =>
      addToast("warning", title, message),
    info: (title: string, message?: string) =>
      addToast("info", title, message),
  };

  return { toasts, removeToast, toast };
}
