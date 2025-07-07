import mongoose, { Document, Schema, Model } from "mongoose";

// Define TypeScript interface
export interface IBlog extends Document {
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImg: string;
  date?: Date;
}

// Define the schema
const BlogSchema: Schema<IBlog> = new Schema({
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
  date: {
    type: Date,
    default: Date.now(),
  },
});

const BlogModel: Model<IBlog> =
  mongoose.models.BlogModel || mongoose.model<IBlog>("BlogModel", BlogSchema);

export default BlogModel;
