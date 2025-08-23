// Ref: https://authjs.dev/getting-started/typescript#module-augmentation

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      provider?: string; 
    } & DefaultSession["user"];
  }

  interface User {
    provider?: string; 
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
  }
}
