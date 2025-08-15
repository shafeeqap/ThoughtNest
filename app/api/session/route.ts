import { getAcceessToken, getRefreshToken } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getAcceessToken();

    if (session) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: session.userId,
      });
    }

    const refresh = await getRefreshToken();

    if (refresh) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: refresh.userId,
      });
    }

    return NextResponse.json({ isAuthenticated: false });
  } catch (error) {
    console.error("Session check failed:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
