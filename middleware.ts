import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/jwt/jwt";
import { TokenPayload } from "./types/auth";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const nextAuthToken = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (nextAuthToken?.sub) {
    if (pathname.startsWith("/admin") && nextAuthToken.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect to home if trying to access login/signup
    if (["/login", "/signup"].includes(pathname)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  // Check for traditional JWT tokens (normal login)
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  // If accessing admin routes without any tokens, redirect to login
  if (
    pathname.startsWith("/admin") &&
    pathname !== "/admin" &&
    !accessToken &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (pathname.startsWith("/profile") && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (accessToken || refreshToken) {
    return handleJwtAuth(req);
  }

  return NextResponse.next();
}

// ====================> Helper function <==================== //
async function handleJwtAuth(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  let decoded: { role: string } | null = null;
  let newAccessToken: string | null = null;

  if (accessToken) {
    try {
      decoded = (await verifyAccessToken(accessToken)) as { role: string };
    } catch (error) {
      console.log("Access token expired or invalid", error);
    }
  }

  // If no valid access token, try refresh token
  if (!decoded && refreshToken) {
    try {
      const decodedRefresh = (await verifyRefreshToken(
        refreshToken
      )) as TokenPayload;

      newAccessToken = await createAccessToken({
        userId: decodedRefresh.userId,
        role: decodedRefresh.role,
      });

      decoded = (await verifyAccessToken(newAccessToken)) as { role: string };
    } catch (error) {
      console.error("Refresh failed:", error);
      const redirect = NextResponse.redirect(new URL("/login", req.url));
      redirect.cookies.delete("accessToken");
      redirect.cookies.delete("refreshToken");
      return redirect;
    }
  }

  if (!decoded) {
    if (pathname.startsWith("/admin")) {
      const response = NextResponse.redirect(new URL("/admin", req.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
    return NextResponse.next();
  }

  // Admin route protection
  if (pathname.startsWith("/admin") && decoded?.role !== "admin") {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  if (pathname === "/admin" && decoded.role === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // Redirect to home if trying to access login/signup while authenticated
  if (["/login", "/signup"].includes(pathname) && decoded.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (newAccessToken) {
    const response = NextResponse.next();

    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV !== "development",
    });

    return response;
  }

  return NextResponse.next();
}

// Ref: https://nextjs.org/docs/app/api-reference/file-conventions/middleware#matcher
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/profile",
    "/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
