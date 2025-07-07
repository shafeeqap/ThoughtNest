import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB Connected:", db.connection.name);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};
