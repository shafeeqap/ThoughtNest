import NextAuth, { CredentialsSignin } from "next-auth";
import { connectDB } from "./lib/config/db";
import UserModal from "./lib/models/UserModel";
import bcrypt from "bcrypt";
import { findOrCreateUser } from "./lib/db/users";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { baseJwt, baseSession } from "./lib/auth/callbacks.base";

// ---------- Custom Errors ----------
class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}
class AccountBlockedError extends CredentialsSignin {
  code = "account_blocked";
}

class OAuthAccountError extends CredentialsSignin {
  code = "oauth_account";
}
class InvalidPasswordError extends CredentialsSignin {
  code = "invalid_password";
}

// ---------- NextAuth ----------
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID!,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET!,
    }),

    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Partial<Record<"email" | "password", unknown>>
      ) {
        // console.log("Authorize called credentials:", credentials);

        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          throw new InvalidCredentialsError();
        }

        await connectDB();

        const user = await UserModal.findOne({
          email: credentials.email,
        }).select("+password");

        // console.log("Found user:", user);

        if (!user) {
          throw new InvalidCredentialsError();
        }

        if (!user.password) {
          throw new OAuthAccountError();
        }

        // console.log("User status:", user.status);

        if (user.status === "blocked") {
          throw new AccountBlockedError();
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        // console.log("Password valid:", isValid);

        if (!isValid) {
          throw new InvalidPasswordError();
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // console.log("SignIn callback triggered with user:", user);
      // console.log("account:", account);

      if (account?.provider !== "credentials") {
        await connectDB();

        await findOrCreateUser({
          email: user.email!,
          username: user.name || "Anonymous",
          provider: account?.provider,
          providerId: account?.providerAccountId,
          image: user.image ?? null,
          role: "user",
          status: "active",
        });
      }
      return true;
    },

    async jwt(params) {
      const { user, account } = params;
      // console.log("JWT callback triggered with user:", user);
      // console.log("JWT callback triggered with account:", account);

      const updatedToken = baseJwt(params);

      if (user && account?.provider !== "credentials") {
        await connectDB();

        const dbUser = await UserModal.findOne({
          email: user.email,
        });

        if (dbUser) {
          updatedToken.id = dbUser._id.toString();
          updatedToken.role = dbUser.role;
          updatedToken.status = dbUser.status;
        }
        updatedToken.provider = account?.provider;
      }

      return updatedToken;
    },

    session: baseSession,
  },
});
