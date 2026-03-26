"use client";

import { useState, useEffect } from "react";
import { Delete, CheckCircle, XCircle, Clock } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────────

type KioskState = "idle" | "success" | "error";
type ClockAction = "in" | "out";

// ─── Clock ──────────────────────────────────────────────────────────────────────

function useLiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Set initial value on client only (avoids SSR hydration mismatch)
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

// ─── Keypad Button ──────────────────────────────────────────────────────────────

function KeyBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-14 sm:h-16 md:h-[72px] rounded-2xl text-xl sm:text-2xl font-bold text-white",
        "bg-white/10 hover:bg-white/20 active:bg-white/30",
        "transition-colors touch-manipulation select-none",
        "flex items-center justify-center",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function KioskPage() {
  const now = useLiveClock();
  const [pin, setPin] = useState("");
  const [state, setState] = useState<KioskState>("idle");
  const [lastAction, setLastAction] = useState<ClockAction>("in");
  const [actionTime, setActionTime] = useState("");
  const MAX_PIN = 6;

  function handleKey(k: string) {
    if (pin.length < MAX_PIN) setPin((prev) => prev + k);
  }

  function handleDelete() {
    setPin((prev) => prev.slice(0, -1));
  }

  function handleClear() {
    setPin("");
  }

  function handleClock(action: ClockAction) {
    if (!pin) return;
    const t = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setLastAction(action);
    setActionTime(t);
    setState("success");
    // Auto-reset after 3.5 seconds
    setTimeout(() => {
      setPin("");
      setState("idle");
    }, 3500);
  }

  const timeStr = now
    ? now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const dateStr = now
    ? now.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  // ── Success screen ──────────────────────────────────────────────────────────
  if (state === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-600 to-emerald-800 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle className="w-20 h-20 sm:w-28 sm:h-28 text-white mb-6 drop-shadow-lg" />
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight">
          Clocked {lastAction === "in" ? "In" : "Out"}
        </h1>
        <p className="text-emerald-100 text-xl sm:text-2xl mb-1">
          Employee #{pin}
        </p>
        <p className="text-emerald-200 text-lg sm:text-xl tabular-nums">{actionTime}</p>
        <p className="text-emerald-300 text-sm mt-8 animate-pulse">
          Returning to home screen…
        </p>
      </div>
    );
  }

  // ── Error screen ────────────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex flex-col items-center justify-center p-6 text-center">
        <XCircle className="w-20 h-20 sm:w-28 sm:h-28 text-white mb-6" />
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Employee Not Found</h1>
        <p className="text-red-100 text-lg sm:text-xl mb-8">
          ID #{pin} was not recognised. Please try again or contact your supervisor.
        </p>
        <button
          onClick={() => { setPin(""); setState("idle"); }}
          className="h-14 px-10 rounded-2xl bg-white text-red-700 font-bold text-lg hover:bg-red-50 transition-colors touch-manipulation"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ── Main kiosk screen ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-950 flex flex-col select-none">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base sm:text-lg leading-none">EvoTime</p>
            <p className="text-blue-300 text-xs sm:text-sm leading-none mt-0.5">Clocking Kiosk</p>
          </div>
        </div>

        {/* Live clock */}
        <div className="text-right">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight leading-none">
            {timeStr}
          </p>
          <p className="text-blue-300 text-xs sm:text-sm mt-1">{dateStr}</p>
        </div>
      </header>

      {/* ── Main content ───────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4 gap-5 sm:gap-6">

        {/* PIN display */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <p className="text-blue-300 text-center text-sm sm:text-base mb-3">
            Enter your Employee ID
          </p>
          <div className="bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl px-6 py-4 sm:py-5 text-center min-h-[72px] sm:min-h-[84px] flex items-center justify-center">
            {pin ? (
              <span className="text-4xl sm:text-5xl font-bold text-white tracking-[0.3em] tabular-nums font-mono">
                {"•".repeat(pin.length)}
              </span>
            ) : (
              <span className="text-2xl sm:text-3xl text-white/30 font-medium">
                — — — — — —
              </span>
            )}
          </div>
          {pin && (
            <p className="text-center text-blue-300 text-xs mt-2">
              {pin.length} digit{pin.length !== 1 ? "s" : ""} entered
            </p>
          )}
        </div>

        {/* Number keypad */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-sm">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((k) => (
            <KeyBtn key={k} onClick={() => handleKey(k)}>{k}</KeyBtn>
          ))}
          {/* Bottom row */}
          <KeyBtn onClick={handleDelete} className="text-white/70">
            <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
          </KeyBtn>
          <KeyBtn onClick={() => handleKey("0")}>0</KeyBtn>
          <KeyBtn
            onClick={handleClear}
            className="text-sm sm:text-base font-semibold text-white/50"
          >
            CLR
          </KeyBtn>
        </div>
      </main>

      {/* ── Footer — Clock In / Out buttons ────────────────────────────────── */}
      <footer className="px-4 sm:px-8 pb-5 sm:pb-8 pt-2 grid grid-cols-2 gap-3 sm:gap-4 shrink-0">
        <button
          onClick={() => handleClock("in")}
          disabled={!pin}
          aria-label="Clock in"
          className={[
            "h-16 sm:h-20 md:h-24 rounded-2xl font-bold text-white shadow-lg",
            "text-lg sm:text-xl md:text-2xl tracking-wide",
            "transition-all touch-manipulation",
            pin
              ? "bg-emerald-500 hover:bg-emerald-400 active:scale-95"
              : "bg-emerald-900/40 cursor-not-allowed opacity-50",
          ].join(" ")}
        >
          CLOCK IN
        </button>
        <button
          onClick={() => handleClock("out")}
          disabled={!pin}
          aria-label="Clock out"
          className={[
            "h-16 sm:h-20 md:h-24 rounded-2xl font-bold text-white shadow-lg",
            "text-lg sm:text-xl md:text-2xl tracking-wide",
            "transition-all touch-manipulation",
            pin
              ? "bg-blue-500 hover:bg-blue-400 active:scale-95"
              : "bg-blue-900/40 cursor-not-allowed opacity-50",
          ].join(" ")}
        >
          CLOCK OUT
        </button>
      </footer>
    </div>
  );
}
