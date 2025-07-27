import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubscribe extends Document {
  email: string;
  subscribedAt: Date;
  userId: mongoose.Types.ObjectId;
}
const SubscribeSchema: Schema<ISubscribe> = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: { createdAt: "subscribedAt", updatedAt: false } }
);

const SubscribeModel: Model<ISubscribe> =
  mongoose.models.SubscribeModel ||
  mongoose.model("SubscribeModel", SubscribeSchema);
export default SubscribeModel;
