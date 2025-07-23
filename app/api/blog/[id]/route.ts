import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import fs from "fs/promises";

// =====> API Endpoint to get blogs by id <=====
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
    return NextResponse.json(
      { msg: "Error fetching blog by ID" },
      { status: 500 }
    );
  }
}

// =====> API Endpoint to delete blogs <=====
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    if (blog.image) {
      const imagePath = `./public${blog?.image}`;
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }

    await BlogModel.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error delete blog by ID", error },
      { status: 500 }
    );
  }
}
