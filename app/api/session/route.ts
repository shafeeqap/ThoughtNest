import { getUserSession } from "@/lib/auth/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getUserSession();

  if (session) {
    return NextResponse.json({ isAuthenticated: true, userId: session.userId });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
