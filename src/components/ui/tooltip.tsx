"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ─── Tooltip ──────────────────────────────────────────────────────────────────
// A lightweight hover/focus tooltip. No extra libraries needed.
//
// Usage:
//   <Tooltip content="Explain this">
//     <button>?</button>
//   </Tooltip>

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  /** Which side the tooltip bubble appears on. Default: "top" */
  side?: "top" | "bottom" | "left" | "right";
  /** Max-width class override (e.g. "max-w-xs") */
  maxWidth?: string;
  className?: string;
}

const POSITION: Record<string, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW: Record<string, string> = {
  top: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800",
  bottom:
    "absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-gray-800",
  left: "absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-800",
  right:
    "absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-800",
};

export function Tooltip({
  content,
  children,
  side = "top",
  maxWidth = "max-w-xs",
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className={cn("relative inline-flex items-center", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}

      {visible && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 px-2.5 py-1.5 text-xs leading-snug text-white bg-gray-800 rounded-lg pointer-events-none shadow-lg whitespace-normal",
            maxWidth,
            POSITION[side]
          )}
        >
          {content}
          <span className={ARROW[side]} />
        </span>
      )}
    </span>
  );
}

// ─── TooltipIcon ──────────────────────────────────────────────────────────────
// A small ⓘ icon that shows a tooltip on hover. Drop-in helper for labels.
//
// Usage:
//   <label>MAC Address <TooltipIcon content="Found on the device label" /></label>

import { HelpCircle } from "lucide-react";

interface TooltipIconProps {
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  iconClassName?: string;
}

export function TooltipIcon({
  content,
  side = "top",
  iconClassName,
}: TooltipIconProps) {
  return (
    <Tooltip content={content} side={side}>
      <HelpCircle
        className={cn(
          "w-3.5 h-3.5 text-gray-400 hover:text-gray-600 cursor-help transition-colors",
          iconClassName
        )}
      />
    </Tooltip>
  );
}
