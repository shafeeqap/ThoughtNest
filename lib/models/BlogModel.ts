import mongoose, { Document, Schema, Model } from "mongoose";

// Define TypeScript interface
export interface IBlog extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const BlogSchema: Schema<IBlog> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    authorImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogModel: Model<IBlog> =
  mongoose.models.BlogModel || mongoose.model<IBlog>("BlogModel", BlogSchema);

export default BlogModel;
