import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  provider: string;
  role: "admin" | "user" | "author";
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
  },
  { timestamps: true }
);

const UserModal: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModal;
