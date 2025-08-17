import { connectDB } from "@/lib/config/db";
import UserModal from "../models/UserModel";
interface UserInput {
  email: string;
  username?: string;
  provider: string;
  providerId: string;
}

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
