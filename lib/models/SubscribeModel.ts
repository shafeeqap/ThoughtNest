import mongoose, { Document, Schema, Model } from "mongoose";

interface ISubscribe extends Document {
  email: string;
  date: Date;
}
const SubscribeSchema: Schema<ISubscribe> = new Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const SubscribeModel: Model<ISubscribe> =
  mongoose.models.SubscribeModel ||
  mongoose.model("SubscribeModel", SubscribeSchema);
export default SubscribeModel;
