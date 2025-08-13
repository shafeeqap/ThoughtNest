import { connectDB } from "@/lib/config/db";
import { createAccessToken, createRefreshToken } from "@/lib/jwt/jwt";
import UserModal from "@/lib/models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await UserModal.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { msg: "User does not exist!" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ msg: "Invalid password" }, { status: 401 });
    }

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });

    const res = NextResponse.json({
      msg: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      path: "/api/token/refresh",
      maxAge: 7 * 24 * 60 * 60,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
