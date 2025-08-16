import UserModal from "../models/UserModel";

interface UserInput {
  email: string | null | undefined;
  username?: string | null;
  provider: string;
}

export async function findOrCreateUser({
  email,
  username,
  provider,
}: UserInput) {
  if (!email) {
    throw new Error("Email is required");
  }

  let user = await UserModal.findOne({ email });

  if (!user) {
    user = new UserModal({
      email,
      username,
      provider,
    });
    await user.save();
  }

  return user;
}
