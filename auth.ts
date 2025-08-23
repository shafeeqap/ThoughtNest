// import "server-only";

// Ref: https://authjs.dev/guides/role-based-access-control

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import { findOrCreateUser } from "./lib/db/users";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),
    GitHub({})
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log(user, "Google / Facebook User...");

      try {
        if (!account) return true;
        if (!user.email) throw new Error("No email found");

        await findOrCreateUser({
          email: user.email,
          username: user.name || "Anonymous",
          provider: account.provider,
          providerId: account.providerAccountId,
          image: user.image ?? null,
        });

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider) {
        token.provider = account.provider;
      }
      if (user) {
        token.sub = user.id ?? token.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      if (token.provider) {
        session.user.provider = token.provider;
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
