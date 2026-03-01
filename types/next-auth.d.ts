// Ref: https://authjs.dev/getting-started/typescript#module-augmentation

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email: string | null;
      image?: string | null;
      provider?: string;
      status?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
    status?: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    status: string;
    provider?: string;
  }
}
