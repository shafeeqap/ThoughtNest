import { verifyAccessToken, verifyRefreshToken } from "@/lib/jwt/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const nextAuthToken = await getToken({
      req,
      secret: process.env.AUTH_SECRET,
    });

    console.log(nextAuthToken, 'NextAuthToken...');
    
    if (nextAuthToken?.sub) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: nextAuthToken.sub,
        name: nextAuthToken.name,
        image: nextAuthToken.picture,
        role: nextAuthToken.role,
        authMethod: "oauth",
      });
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);
      if (payload) {
        return NextResponse.json({
          isAuthenticated: true,
          userId: payload.userId,
          role: payload.role,
          authMethod: "jwt",
        });
      }
    }

    if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);
      if (payload) {
        return NextResponse.json({
          isAuthenticated: true,
          userId: payload.userId,
          role: payload.role,
          authMethod: "jwt",
        });
      }
    }

    return NextResponse.json({ isAuthenticated: false, authMethod: "none" });
  } catch (error) {
    console.error("Session check failed:", error);
    return NextResponse.json({ isAuthenticated: false });
  }
}
