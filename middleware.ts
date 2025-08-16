import { NextRequest, NextResponse } from "next/server";
import {
  createAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "./lib/jwt/jwt";
import { TokenPayload } from "./types/auth";
import { auth } from "./auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (req.auth && pathname.startsWith("/login")) {
    const dashboardUrl = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
});

// export async function middleware(req: NextRequest) {
//   const accessToken = req.cookies.get("accessToken")?.value;
//   const refreshToken = req.cookies.get("refreshToken")?.value;
//   const { pathname } = req.nextUrl;

//   let decoded: { role: string } | null = null;
//   let newAccessToken: string | null = null;

//   if (accessToken) {
//     try {
//       decoded = (await verifyAccessToken(accessToken)) as { role: string };
//     } catch (error) {
//       console.log("Access token expired or invalid", error);
//     }
//   }

//   // If no valid access token, try refresh token
//   if (
//     !decoded &&
//     refreshToken &&
//     pathname !== "/login" &&
//     pathname !== "/signup"
//   ) {
//     try {
//       const decodedRefresh = (await verifyRefreshToken(
//         refreshToken
//       )) as TokenPayload;

//       // Generate new access token
//       newAccessToken = await createAccessToken({
//         userId: decodedRefresh.userId,
//         role: decodedRefresh.role,
//       });

//       // Verify new token
//       decoded = (await verifyAccessToken(newAccessToken)) as { role: string };
//     } catch (error) {
//       console.error("Refresh failed:", error);
//       const redirect = NextResponse.redirect(new URL("/login", req.url));
//       redirect.cookies.delete("accessToken");
//       redirect.cookies.delete("refreshToken");
//       return redirect;
//     }
//   }

//   // Admin route protection
//   if (pathname.startsWith("/admin") && decoded?.role !== "admin") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Redirect to home if trying to access login/signup while authenticated
//   if (decoded && (pathname === "/login" || pathname === "/signup")) {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   // Handle unauthenticated users
//   if (!decoded && !["/login", "/signup"].includes(pathname)) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   const res = NextResponse.next();

//   if (newAccessToken) {
//     res.cookies.set("accessToken", newAccessToken, {
//       httpOnly: true,
//       maxAge: 15 * 60,
//       path: "/",
//       sameSite: "lax",
//       secure: process.env.NODE_ENV !== "development",
//     });
//   }

//   return res;
// }

export const config = {
  matcher: [
    // "/login",
    // "/signup",
    // "/dashboard/:path*",
    // "/profile/:path*",
    // "/admin/:path*",
    // "/api/session",
    // "/api/((?!login|signup|token/refresh).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
