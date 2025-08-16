import { getAcceessToken, getRefreshToken } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = await getAcceessToken();

    if (accessToken) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: accessToken.userId,
      });
    }

    const refreshToken = await getRefreshToken();

    if (refreshToken) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: refreshToken.userId,
      });
    }

    return NextResponse.json({ isAuthenticated: false });
  } catch (error) {
    console.error("Session check failed:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
