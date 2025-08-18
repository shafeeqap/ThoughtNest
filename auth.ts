import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { findOrCreateUser } from "./lib/db/users";
// import Facebook from "next-auth/providers/facebook";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log(user, "Google User...");

      try {
        if (account?.provider !== "google") return true;
        if (!user.email) throw new Error("No email found");

        await findOrCreateUser({
          email: user.email,
          username: user.name || "Anonymous",
          provider: account.provider,
          providerId: account.providerAccountId,
        });

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
