import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
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

    const requiredFields = [
      "title",
      "description",
      "category",
      "author",
      "image",
      "authorImg",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData.get(field)
    );
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const image = formData.get("image") as File;
    let fileName = "";

    // Only process if image exists and is valid
    if (image && typeof image !== "string" && image.size > 0) {
      // Check file size
      const maxFileSize = 10 * 1024 * 1024; // 10MB
      if (image.size > maxFileSize) {
        return NextResponse.json(
          { error: "Image file exceeds 10MB limit" },
          { status: 400 }
        );
      }

      const timestamp = Date.now();

      const safeName = image.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
      fileName = `${timestamp}_${safeName}`;
      const imageByteData = await image.arrayBuffer();
      const buffer = Buffer.from(imageByteData);
      const filePath = `./public/${fileName}`;
      await writeFile(filePath, buffer);
    } else {
      console.warn("No image file provided or invalid image field");
      fileName = "default-image.jpg";
    }

    const blogData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      image: `/${fileName}`,
      authorImg: formData.get("authorImg") as string,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json(
      { error: "Failed to upload blog" },
      { status: 500 }
    );
  }
}
