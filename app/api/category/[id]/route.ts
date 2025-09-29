import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import categoryModel from "@/lib/models/CategoryModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to update category status <=====
export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const category = await categoryModel.findById(id);

    if (!category) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    const newStatus = category.status === "active" ? "blocked" : "active";

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    return NextResponse.json(
      { msg: "Category status updated successfully", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/category/[id] error:", error);
    return NextResponse.json(
      { msg: "Error category action by ID", error },
      { status: 500 }
    );
  }
}

// =====> API Endpoint to delete category <=====
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    console.log(id, "Cat ID...");

    const category = await categoryModel.findById(id);
    if (!category) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
    }

    const existsBlog = await BlogModel.findOne({ category: id });

    if (existsBlog) {
      return NextResponse.json(
        {
          msg: "This category is used in a blog; you can't delete it.",
        },
        { status: 409 }
      );
    }

    await categoryModel.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/category/[id] error:", error);
    return NextResponse.json(
      { msg: "Error delete category by ID", error },
      { status: 500 }
    );
  }
}

// =====> API Endpoint to edit category <=====
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { categoryName, description } = await req.json();

    const categoryExist = await categoryModel.findOne({ categoryName });

    if (categoryExist) {
      return NextResponse.json(
        { msg: "Category already exists" },
        { status: 409 }
      );
    }

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { categoryName, description },
      { new: true }
    );

    return NextResponse.json(
      { msg: "Category updated successfully", updatedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/category/[id] error:", error);
    return NextResponse.json(
      { msg: "Error update category by ID", error },
      { status: 500 }
    );
  }
}
