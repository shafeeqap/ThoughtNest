import { verifyJWT } from "@/lib/jwt/jwt";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log(token, "Token");

  const { pathname } = req.nextUrl;
  console.log(pathname, "Pathname");

  if (token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    if (token && pathname.startsWith("/dashboard")) {
      verifyJWT(token);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
