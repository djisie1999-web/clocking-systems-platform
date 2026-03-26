import { NextResponse } from "next/server";
import { clearAuthCookies, getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST() {
  try {
    const user = await getCurrentUser();

    if (user) {
      // Invalidate the stored refresh token
      await db.user.update({
        where: { id: user.id },
        data: { refreshToken: null },
      });
    }

    await clearAuthCookies();
    return NextResponse.json({ success: true });
  } catch {
    // Always clear cookies, even if DB update fails
    await clearAuthCookies();
    return NextResponse.json({ success: true });
  }
}
