import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextRequest, NextResponse } from "next/server";
import fs, { writeFile } from "fs/promises";
import mongoose from "mongoose";
import { decodeEntities } from "@/lib/utils/helpers/decodeEntities";
import { sanitizeHtml } from "@/lib/utils/sanitize/sanitizeHtmlServer";
import { verifyAccessToken } from "@/lib/jwt/jwt";
import UserModal from "@/lib/models/UserModel";

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
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const formData = await req.formData();
    const { id } = await context.params;

    const decoded = await verifyAccessToken(accessToken);
    if (!decoded) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await UserModal.findById(decoded.userId);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json({ msg: "Blog not found" }, { status: 404 });
    }

    const blogTitle = formData.get("blogTitle") as string;
    const description = formData.get("description") as string;
    const categoryId = formData.get("category") as string;

    const decodedDescription = decodeEntities(description);
    const safeDescription = sanitizeHtml(decodedDescription);

    if (safeDescription.length > 10000) {
      return NextResponse.json(
        { error: "Description is too long" },
        { status: 400 }
      );
    }

    const image = formData.get("image") as File | null;

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
      userId: user._id,
      title: blogTitle,
      description: safeDescription,
      category: new mongoose.Types.ObjectId(categoryId),
      author: formData.get("author") as string,
      image: fileName
        ? fileName.startsWith("/")
          ? fileName
          : `/${fileName}`
        : blog.image,
      authorImg: formData.get("authorImg") as string,
    };

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blogData, {
      new: true,
    }).populate("category", "categoryName");

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
