import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/LogoutButton";
import {
  Clock,
  UserCircle,
  AlertTriangle,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  getOrCreateSubscription,
  getTrialDaysRemaining,
  isTrialExpired,
} from "@/lib/stripe";
import { SubscriptionStatus } from "@prisma/client";
import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { SidebarNav, SidebarAdminNav } from "@/components/layout/SidebarNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch billing info for the trial banner
  const subscription = await getOrCreateSubscription(user.id);
  const trialDaysRemaining = getTrialDaysRemaining(
    subscription.trialEndsAt,
    subscription.status
  );
  const trialExpired = isTrialExpired(
    subscription.trialEndsAt,
    subscription.status
  );

  const showTrialBanner = subscription.status === SubscriptionStatus.TRIALING;

  const sidebar = (
    <>
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-200 shrink-0">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-sm">CS Platform</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <SidebarNav />

        {/* Admin section */}
        {user.role === "ADMIN" && <SidebarAdminNav />}
      </nav>

      {/* Trial badge */}
      {showTrialBanner && !trialExpired && (
        <div className="mx-3 mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg shrink-0">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="text-xs font-semibold text-blue-700">
              Free Trial
            </span>
          </div>
          <p className="text-xs text-blue-600 mb-2">
            {trialDaysRemaining} day{trialDaysRemaining !== 1 ? "s" : ""}{" "}
            remaining
          </p>
          <Link
            href="/dashboard/billing"
            className="block text-center text-xs font-medium bg-blue-600 text-white rounded-md py-1.5 hover:bg-blue-700 transition-colors"
          >
            Upgrade now
          </Link>
        </div>
      )}

      {/* User Footer */}
      <div className="p-4 border-t border-gray-200 shrink-0">
        <Link
          href="/profile"
          className="flex items-center gap-3 mb-3 rounded-lg p-1 hover:bg-gray-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
            <span className="text-blue-700 font-semibold text-xs">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
          <UserCircle className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors shrink-0" />
        </Link>
        <LogoutButton />
      </div>
    </>
  );

  const topBanner = trialExpired ? (
    <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shrink-0">
      <div className="flex items-center gap-2 text-amber-800 min-w-0">
        <AlertTriangle className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium truncate">
          Your 14-day free trial has ended.
        </span>
        <span className="text-sm text-amber-700 hidden sm:inline">
          Upgrade to keep full access to EvoTime Pro.
        </span>
      </div>
      <Link
        href="/dashboard/billing"
        className="shrink-0 text-xs font-semibold bg-amber-600 text-white px-3 py-1.5 rounded-lg hover:bg-amber-700 transition-colors"
      >
        Upgrade now
      </Link>
    </div>
  ) : undefined;

  return (
    <DashboardShell sidebar={sidebar} topBanner={topBanner}>
      <OnboardingWizard userName={user.name} />
      {children}
    </DashboardShell>
  );
}
