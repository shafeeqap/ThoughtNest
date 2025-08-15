import "server-only";

import { verifyAccessToken, verifyRefreshToken } from "@/lib/jwt/jwt";
import { cookies } from "next/headers";
import { TokenPayload } from "@/types/auth";
import UserModal, { IUser } from "../models/UserModel";
import bcrypt from "bcrypt";

// ===> Get access token from cookies <=== //
export async function getAcceessToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const payload = await verifyAccessToken(accessToken);
    return payload as TokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ===> Get refresh token from cookies <=== //
export async function getRefreshToken(): Promise<TokenPayload | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    const payload = await verifyRefreshToken(refreshToken);
    return payload as TokenPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ===> Helper function to access authenticate users when the user log in <=== //
export async function authenticateUser(
  email: string,
  password: string
): Promise<IUser> {
  const user: IUser | null = await UserModal.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  return user;
}
