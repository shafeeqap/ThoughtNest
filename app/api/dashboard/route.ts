import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import categoryModel from "@/lib/models/CategoryModel";
import SubscribeModel from "@/lib/models/SubscribeModel";
import UserModal from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to get data for admin dashboard using mongoDB aggregation <=====
export async function GET() {
  try {
    await connectDB();

    const blogsCount = await BlogModel.countDocuments();
    const usersCount = await UserModal.countDocuments();
    const categoriesCount = await categoryModel.countDocuments();
    const subscribersCount = await SubscribeModel.countDocuments();
    const authorCount = await UserModal.aggregate([
      { $match: { role: "author" } },
      { $group: { _id: "$role", count: { $sum: 1 } } },
      { $project: { _id: 0, role: "$_id", count: 1 } },
    ]);

    const blogData = await BlogModel.aggregate([
      {
        $facet: {
          totalBlogs: [{ $count: "total" }],
          blogByStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    console.log(JSON.stringify(blogData, null, 2));

    
    const usersStatuses = await UserModal.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const categoryStatus = await categoryModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const subscriberStatus = await SubscribeModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const blogByCategory = await BlogModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      { $unwind: "$categoryDetails" },
      { $group: { _id: "$categoryDetails.categoryName", count: { $sum: 1 } } },
      { $project: { _id: 0, category: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    console.log(blogByCategory);

    return NextResponse.json(
      {
        blogsCount,
        usersCount,
        categoriesCount,
        subscribersCount,
        // blogStatuses,
        usersStatuses,
        categoryStatus,
        subscriberStatus,
        authorCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/dashboard error:", error);
    return NextResponse.json(
      { msg: "Dashboard failed while fetching data." },
      { status: 500 }
    );
  }
}
