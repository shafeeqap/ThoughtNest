import { authenticateUser } from "@/lib/auth/auth";
import { connectDB } from "@/lib/config/db";
import { createAccessToken, createRefreshToken } from "@/lib/jwt/jwt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await authenticateUser(email, password);

    const accessToken = await createAccessToken({
      userId: user.id,
      role: user.role,
    });
    const refreshToken = await createRefreshToken({
      userId: user.id,
      role: user.role,
    });

    const response = NextResponse.json({
      msg: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error.message === "User does not exist" ||
        error.message === "Invalid password"
      ) {
        return NextResponse.json({ msg: error.message }, { status: 401 });
      }
    }
    console.error("Login error:", error);
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
