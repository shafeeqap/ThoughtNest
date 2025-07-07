import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

// const LoadDB = async () => {
//   await connectDB();
// };
// LoadDB();

export async function GET(req: Request) {
  console.log("Blog GET Hit");
  return NextResponse.json({ msg: "API Working" });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    // Debug: Log request headers
    const headers = Object.fromEntries(req.headers.entries());
    console.log("Request Headers:", headers);

    const contentType = req.headers.get("content-type") || "";
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type. Use multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    console.log("FormData fields:", Array.from(formData.keys()));

    // Validate all required fields based on your model
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

    const image = formData.get("image") as File | null;
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
      const publicDir = path.join(process.cwd(), "public");
      const filePath = path.join(publicDir, fileName);
      await writeFile(filePath, buffer); // using our image will be store in the public folder.
    } else {
      console.warn("No image file provided or invalid image field");
      // Handle case where image is missing but your model requires it
      // For now, we'll use a placeholder
      fileName = "default-image.jpg";
    }

    const blogData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      author: formData.get("author") as string,
      image: fileName,
      authorImg: formData.get("authorImg") as string,
    };

    await BlogModel.create(blogData);
    console.log("Blog Saved");

    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
