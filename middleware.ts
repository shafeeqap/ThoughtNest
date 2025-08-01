import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  console.log("MIDDLEWARE: Token =", token);
  console.log("MIDDLEWARE: Pathname =", pathname);

    // Redirect to home if trying to access login/signup while authenticated
    if (token && (pathname === "/login" || pathname === "/signup")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect to login if trying to access protected route without token
    if (!token && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/dashboard/:path*"],
};
