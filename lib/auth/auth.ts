import "server-only";

import { verifyJWT } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

interface UserPayload {
  userId: string;
}
export async function getUserSession(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  console.log(token, "Token...");

  if (!token) {
    return null;
  }

  try {
    const payload = verifyJWT(token);

    if (payload && typeof payload === "object" && "userId" in payload) {
      return payload as UserPayload;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
