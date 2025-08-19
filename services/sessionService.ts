import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export const sessionService = {
  session: async (req?: NextRequest) => {
    try {
      // if (req) {
      //   const token = await getToken({ req, secret: process.env.AUTH_SECRET });
      //   return {
      //     isAuthenticated: !!token,
      //     userId: token?.sub || null,
      //     role: token?.role || null,
      //   };
      // } else {
        const response = await fetch("/api/session", { cache: "no-store" });
        return await response.json();
      // }
    } catch (error) {
      console.log("Session error:", error);
      return { isAuthenticated: false };
    }
  },
};
