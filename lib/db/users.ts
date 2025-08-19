import "server-only";

import { connectDB } from "@/lib/config/db";
import UserModal, { IUser } from "../models/UserModel";
import bcrypt from "bcrypt";

interface UserInput {
  email: string;
  username?: string;
  provider: string;
  providerId: string;
}

// ===> Helper function to find/create users when the user log in with OAuth <=== //
export async function findOrCreateUser({
  email,
  username = "Anonymous",
  provider,
  providerId,
}: UserInput) {
  await connectDB();

  let user = await UserModal.findOne({
    $or: [{ email }, { "providers.id": providerId }],
  });
  console.log(user, "Google Auth...");

  if (!user) {
    user = new UserModal({
      email,
      username,
      providers: [{ name: provider, id: providerId }],
    });
    await user.save();
  } else {
    // provider if not already linked
    const hasProvider = user.providers.some(
      (p) => p.name === provider && p.id === providerId
    );

    if (!hasProvider) {
      user.providers.push({ name: provider, id: providerId });
      await user.save();
    }
  }

  return user;
}


// ===> Helper function to access authenticate users when the user log in <=== //
export async function authenticateUser(
  email: string,
  password: string
): Promise<IUser> {
  const user: IUser | null = await UserModal.findOne({ email }).select(
    "+password"
  );

  if (!user) {
    throw new Error("ACCOUNT_NOT_FOUND");
  }

  if (!user.password) {
    throw new Error("SOCIAL_ACCOUNT");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("INVALID_PASSWORD");
  }
  return user;
}
