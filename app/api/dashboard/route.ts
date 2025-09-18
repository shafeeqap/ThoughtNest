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

    const authorCount = await UserModal.aggregate([
      { $match: { role: "author" } },
      { $group: { _id: "$role", count: { $sum: 1 } } },
      { $project: { _id: 0, role: "$_id", count: 1 } },
    ]);

    const blogResult = await BlogModel.aggregate([
      {
        $facet: {
          totalBlogs: [{ $count: "total" }],
          blogByStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
          blogAction: [
            { $group: { _id: "$action", count: { $sum: 1 } } },
            { $project: { _id: 0, action: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
          blogByCategory: [
            {
              $lookup: {
                from: "categories",
                localField: "category",
                foreignField: "_id",
                as: "categoryDetails",
              },
            },
            { $unwind: "$categoryDetails" },
            {
              $group: {
                _id: "$categoryDetails.categoryName",
                count: { $sum: 1 },
              },
            },
            { $project: { _id: 0, category: "$_id", count: 1 } },
            { $sort: { Count: -1 } },
          ],
        },
      },
    ]);

    const userResult = await UserModal.aggregate([
      {
        $facet: {
          totalUser: [{ $count: "total" }],
          userByStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const catResult = await categoryModel.aggregate([
      {
        $facet: {
          totalCategory: [{ $count: "total" }],
          categoryStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const subResult = await SubscribeModel.aggregate([
      {
        $facet: {
          totalSubscribers: [{ $count: "total" }],
          subscriberStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } },
            { $project: { _id: 0, status: "$_id", count: 1 } },
            { $sort: { count: -1 } },
          ],
        },
      },
    ]);

    const blogData = {
      totalBlogs: blogResult[0].totalBlogs[0]?.total || 0,
      blogByStatus: blogResult[0].blogByStatus,
      blogAction: blogResult[0].blogAction,
      blogByCategory: blogResult[0].blogByCategory,
    };
    
    const userData = {
      totalUser: userResult[0].totalUser[0]?.total || 0,
      userBystatus: userResult[0].userByStatus,
    };

    const catData = {
      totalCategory: catResult[0].totalCategory[0]?.total || 0,
      catStatus: catResult[0].categoryStatus,
    };

    const subData = {
      totalSub: subResult[0].totalSubscribers[0]?.total || 0,
      subscriberStatus: subResult[0].subscriberStatus,
    };

    return NextResponse.json(
      {
        blogData,
        userData,
        catData,
        subData,
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
