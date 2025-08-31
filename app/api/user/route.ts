import { connectDB } from "@/lib/config/db";
import UserModal from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const user = await UserModal.find();
    console.log(user, "user...");

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ msg: "User fetching failed" }, { status: 500 });
  }
}
