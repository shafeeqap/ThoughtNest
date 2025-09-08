import { connectDB } from "@/lib/config/db";
import { verifyAccessToken } from "@/lib/jwt/jwt";
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

    const accessToken = req.cookies.get("accessToken")?.value;
    let decoded: any;

    if (accessToken) {
      decoded = await verifyAccessToken(accessToken);
    }

    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

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
      userId: decoded.userId,
      title: formData.get("title") as string,
      description: safeDescription,
      category: new mongoose.Types.ObjectId(formData.get("category") as string),
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
