import { connectDB } from "@/lib/config/db";
import { authenticateUser } from "@/lib/db/users";
import { createAccessToken, createRefreshToken } from "@/lib/jwt/jwt";
import { handleError } from "@/lib/utils/errorHandler/errorHandler";
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
    return handleError(error);
  }
}
