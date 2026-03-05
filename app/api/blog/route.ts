import { auth } from "@/auth";
import uploadToCloudinary from "@/lib/cloudinary/uploadToCloudinary";
import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import "@/lib/models/CategoryModel";
import { decodeEntities } from "@/lib/utils/helpers/decodeEntities";
import { sanitizeHtml } from "@/lib/utils/sanitize/sanitizeHtmlServer";
import { writeFile } from "fs/promises";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// =====> API Endpoint to get all blogs <=====
export async function GET(req: Request) {
  try {
    await connectDB();
    const category = new URL(req.url).searchParams.get("category");

    const query = category && category !== "All" ? { category } : {};

    const blogs = await BlogModel.find(query).populate(
      "category",
      "categoryName"
    );

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json({ msg: "Error fetching blogs" }, { status: 500 });
  }
}

// =====> API Endpoint for uploading blogs <=====
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    console.log("Received form data:", formData);

    const image = formData.get("image") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const author = formData.get("author") as string;
    const authorImg = formData.get("authorImg") as string;

    // ---------- Validate required fields ----------
    if (!title || !description || !category || !author || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ---------- Validate image ----------
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        { error: `Unsupported image type: ${image.type}` },
        { status: 400 }
      );
    }

    const maxSize = 5 * 1024 * 1024; // 5MB

    // if (image.size > maxSize) {
    //   return NextResponse.json(
    //     { error: "Image too large (max 5MB)" },
    //     { status: 400 }
    //   );
    // }

    // ---------- Validate category id ----------
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return NextResponse.json(
        { error: "Invalid category id" },
        { status: 400 }
      );
    }

    // ---------- Upload image to Cloudinary ----------
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const uploadResult = await uploadToCloudinary(imageBuffer, "blog/cover");
    console.log("Cloudinary cover image upload result:", uploadResult);

    // ---------- Sanitize description ----------
    const decodedDescription = decodeEntities(description);
    const safeDescription = sanitizeHtml(decodedDescription);

    if (safeDescription.length > 10000) {
      return NextResponse.json(
        { error: "Description is too long" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    const blogData = {
      userId: session.user.id,
      title,
      description,
      category: new mongoose.Types.ObjectId(category),
      author,
      authorImg,
      image: uploadResult.secure_url,
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
