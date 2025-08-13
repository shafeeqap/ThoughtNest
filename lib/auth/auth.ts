import "server-only";

import { verifyAccessToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";

interface UserPayload {
  userId: string;
}
export async function getUserSession(): Promise<UserPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAccessToken(token);
    console.log(payload, "Payload...");

    return payload as UserPayload;

    // if (payload && typeof payload === "object" && "userId" in payload) {
    // }
    // return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
