import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  image?: string;
  providers: {
    id: string;
    name: string;
  }[];
  role: "admin" | "user" | "author";
  status: "active" | "blocked";
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
      select: false,
    },
    image: {
      type: String,
    },
    providers: [
      {
        id: { type: String, required: true },
        name: { type: String, enum: ["google", "facebook"], required: true },
      },
    ],
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

const UserModal: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default UserModal;
