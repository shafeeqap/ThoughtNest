import { createJWT } from "@/lib/jwt/jwt";
import UserModal from "@/lib/models/UserModel";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await UserModal.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 401 });
    }

    const token = createJWT({ userId: user._id });

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({
      msg: "Login successful",
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
