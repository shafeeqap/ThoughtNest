import { connectDB } from "@/lib/config/db";
import UserModal from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { createJWT } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

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

    const existing = await UserModal.findOne({ email });

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

    const token = createJWT({ userId: newUser._id });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json(
      {
        msg: "User registered successfully",
        user: {
          id: newUser._id,
          uername: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
