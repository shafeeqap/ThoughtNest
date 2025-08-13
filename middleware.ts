import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/jwt/jwt";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  // Allow login/signup if no token
  if (!accessToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.next();
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  
  let decoded: { role: string } | null = null;

  try {
    decoded = verifyAccessToken(accessToken) as { role: string };
  } catch {
    if (refreshToken) {
      const refreshRes = await fetch(new URL("/api/token/refresh", req.url), {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const newAccessToken = (await refreshRes.json()).accessToken;
        try {
          decoded = verifyAccessToken(newAccessToken) as { role: string };
        } catch {
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // role-based check
  if (pathname.startsWith("/admin") && decoded?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Redirect to home if trying to access login/signup while authenticated
  if (accessToken && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
};
