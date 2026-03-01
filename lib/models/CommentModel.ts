import mongoose, { Document, Schema, Model } from "mongoose";

interface IComment extends Document {
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentModel: Model<IComment> =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default commentModel;
