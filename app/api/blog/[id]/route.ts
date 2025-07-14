import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to get blogs by id <=====
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const blog = await BlogModel.findById(params.id);

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
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const deletedBlog = await BlogModel.findByIdAndDelete(params.id);
    if (!deletedBlog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { msg: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error fetching blog by ID", error },
      { status: 500 }
    );
  }
}
