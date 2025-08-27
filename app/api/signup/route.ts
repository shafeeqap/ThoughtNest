import { connectDB } from "@/lib/config/db";
import UserModal, { IUser } from "@/lib/models/UserModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


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


    return response;
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ msg: "Server error", error }, { status: 500 });
  }
}
