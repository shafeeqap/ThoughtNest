import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs/promises";
import mongoose from "mongoose";
import { decodeEntities } from "@/lib/utils/helpers/decodeEntities";
import { sanitizeHtml } from "@/lib/utils/sanitize/sanitizeHtmlServer";
import { verifyAccessToken } from "@/lib/jwt/jwt";

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

// =====> API Endpoint to update blog action(active/blocked) and status(pending/approved/rejected) <=====
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { status, action } = await req.json();

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    const updateData: Record<string, string> = {};

    if (status) updateData.status = status;
    if (action) updateData.action = action;

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    return NextResponse.json(
      { msg: "Blog updated successfully", updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Error blog updating by ID", error },
      { status: 500 }
    );
  }
}

// =====> API Endpoint to edit blog <=====
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const accessToken = req.cookies.get("accessToken")?.value;
    let decoded: any;

    if (accessToken) {
      decoded = await verifyAccessToken(accessToken);
    }

    console.log(decoded.userId, "User id...");

    const formData = await req.formData();
    const { id } = await context.params;

    const blog = await BlogModel.findById(id);
    console.log(blog, "Blog");

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    const blogTitle = formData.get("blogTitle") as string;
    const description = formData.get("description") as string;

    const decodedDescription = decodeEntities(description);
    const safeDescription = sanitizeHtml(decodedDescription);

    if (safeDescription.length > 10000) {
      return NextResponse.json(
        { error: "Description is too long" },
        { status: 400 }
      );
    }

    const image = formData.get("image") as File | null;
    console.log(image, "Image");

    let fileName: string | null = null;
    const timestamp = Date.now();

    if (image instanceof File) {
      const safeName = image.name.replace(/[^a-z0-9.]/gi, "_").toLowerCase();
      fileName = `${timestamp}_${safeName}`;
      const buffer = Buffer.from(await image.arrayBuffer());
      const filePath = `./public/${fileName}`;
      await writeFile(filePath, buffer);
    } else if (typeof image === "string") {
      fileName = image;
    }

    const blogData = {
      userId: decoded.userId,
      title: blogTitle,
      description: safeDescription,
      category: new mongoose.Types.ObjectId(formData.get("category") as string),
      author: formData.get("author") as string,
      image: fileName
        ? fileName.startsWith("/")
          ? fileName
          : `/${fileName}`
        : null,
      authorImg: formData.get("authorImg") as string,
    };

    console.log(blogData, "Blog Data...");

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blogData, {
      new: true,
    });

    return NextResponse.json(
      { msg: "Blog updated successfully", updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Error blog editing by ID", error },
      { status: 500 }
    );
  }
}
