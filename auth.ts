import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser } from "./lib/db/users";
import { createAccessToken, createRefreshToken } from "./lib/jwt/jwt";
import { cookies } from "next/headers";
// import Facebook from "next-auth/providers/facebook";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   try {
    //     const dbUser = await findOrCreateUser({
    //       email: user.email,
    //       username: user.name || "Anonymous",
    //       provider: account?.provider || "google",
    //     });

    //     const accessToken = await createAccessToken({
    //       userId: dbUser.id,
    //       role: dbUser.role,
    //     });

    //     const refreshToken = await createRefreshToken({
    //       userId: dbUser.id,
    //       role: dbUser.role,
    //     });

    //     const cookieStore = await cookies();
    //     cookieStore.set("accessToken", accessToken, {
    //       httpOnly: true,
    //       maxAge: 15 * 60,
    //       path: "/",
    //     });
    //     cookieStore.set("refreshToken", refreshToken, {
    //       httpOnly: true,
    //       maxAge: 15 * 60,
    //       path: "/",
    //     });

    //     return true;
    //   } catch (error) {
    //     console.error("SignIn error:", error);
    //     return false;
    //   }
    // },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      if (token?.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
});
