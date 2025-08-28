import mongoose, { Document, Schema, Model } from "mongoose";

interface ICategory extends Document {
  categoryName: string;
  description: string;
  status: "active" | "blocked";
  createdAt?: Date;
  updatedAt?: Date;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  { timestamps: true }
);

const categoryModel: Model<ICategory> =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default categoryModel;
