import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { ids, status } = await req.json();

    if (!ids || ids.length === 0) {
      return NextResponse.json(
        { msg: "No IDs provided" },
        {
          status: 400,
        }
      );
    }

    const updateBlog = await BlogModel.updateMany(
      { _id: { $in: ids } },
      { $set: { status } }
    );

    return NextResponse.json(
      { msg: "Bulk update successful", updateBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/blog/bulk-update error:", error);
    return NextResponse.json(
      { msg: "Error while blog bulk updating", error },
      { status: 500 }
    );
  }
}
