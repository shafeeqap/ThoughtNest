import { createAccessToken, verifyRefreshToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookiesStore = await cookies();
  const refreshToken = cookiesStore.get("refreshToken")?.value;

  console.log(refreshToken, 'refreshToken...');
  
  if (!refreshToken) {
    return NextResponse.json({ msg: "No refrsh token" }, { status: 401 });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as {
      userId: string;
      role: string;
    };

    const newAccessToken = createAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    const res = NextResponse.json({ msg: "Token refreshed" });

    res.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { msg: "Invalid refresh token", error },
      { status: 403 }
    );
  }
}
