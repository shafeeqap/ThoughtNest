import { verifyAccessToken, verifyRefreshToken } from "@/lib/jwt/jwt";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import UserModal from "@/lib/models/UserModel";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  try {
    // const nextAuthToken = await getToken({
    //   req,
    //   secret: process.env.AUTH_SECRET,
    // });

    const session = await auth();

    const email = session?.user?.email;

    const user = await UserModal.findOne({ email });

    if (user) {
      return NextResponse.json({
        isAuthenticated: true,
        userId: user?.id,
        name: user?.username,
        email: user?.email,
        image: session?.user?.image,
        role: user?.role,
        provider: user?.providers,
        authMethod: "oauth",
      });
    }

    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (accessToken) {
      const payload = await verifyAccessToken(accessToken);

      if (payload) {
        const user = await UserModal.findById(payload.userId);

        return NextResponse.json({
          isAuthenticated: true,
          userId: user?._id,
          name: user?.username,
          email: user?.email,
          role: user?.role,
          authMethod: "jwt",
        });
      }
    }

    if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);

      if (payload) {
        const user = await UserModal.findById(payload.userId);

        return NextResponse.json({
          isAuthenticated: true,
          userId: user?._id,
          name: user?.username,
          email: user?.email,
          role: user?.role,
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
