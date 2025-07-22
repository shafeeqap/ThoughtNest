import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { decodeEntities } from "@/lib/utils/helpers/decodeEntities";
import { sanitizeHtml } from "@/lib/utils/sanitize/sanitizeHtmlServer";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// =====> API Endpoint to get all blogs <=====
export async function GET(req: Request) {
  // const blogId = await req.nextUrl.searchParams.get('id')
  try {
    await connectDB();

    const blogs = await BlogModel.find({});
    return NextResponse.json({ msg: "Blogs", blogs });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ msg: "Error fetching blogs" }, { status: 500 });
  }
}

// =====> API Endpoint for uploading blogs <=====
export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const image = formData.get("image") as File;
    
    let fileName = "";
    const timestamp = Date.now();

    const safeName = image.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
    fileName = `${timestamp}_${safeName}`;
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const filePath = `./public/${fileName}`;
    await writeFile(filePath, buffer);

    const description = formData.get("description") as string;

    const decodedDescription = decodeEntities(description);
    const safeDescription = sanitizeHtml(decodedDescription);

    if (safeDescription.length > 10000) {
      return NextResponse.json(
        { error: "Description is too long" },
        { status: 400 }
      );
    }

    const blogData = {
      title: formData.get("title") as string,
      description: safeDescription,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      image: `/${fileName}`,
      authorImg: formData.get("authorImg") as string,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog:", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to upload blog" },
      { status: 500 }
    );
  }
}
