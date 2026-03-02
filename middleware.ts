import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const user = req.auth?.user;

  // console.log("Middleware pathname:", pathname);
  // console.log("Middleware session:", session);
  // console.log("Middleware user:", user);

  // Protect admin routes
  if (pathname.startsWith("/admin/dashboard")) {
    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Protuct profile route
  if (pathname.startsWith("/profile") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to home if trying to access login/signup
  if (session && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

// Ref: https://nextjs.org/docs/app/api-reference/file-conventions/middleware#matcher
export const config = {
  matcher: ["/admin/:path*", "/login", "/signup", "/profile"],
};
