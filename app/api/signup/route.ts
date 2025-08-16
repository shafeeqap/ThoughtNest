import { connectDB } from "@/lib/config/db";
import UserModal, { IUser } from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "@/lib/jwt/jwt";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { msg: "All fields are required" },
        { status: 400 }
      );
    }

    const existing: IUser | null = await UserModal.findOne({ email });

    if (existing) {
      return NextResponse.json({ msg: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModal({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const accessToken = await createAccessToken({
      userId: newUser.id,
      role: newUser.role,
    });
    const refreshToken = await createRefreshToken({
      userId: newUser.id,
      role: newUser.role,
    });

    const response = NextResponse.json(
      {
        msg: "User registered successfully",
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );

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
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
