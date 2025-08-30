import { connectDB } from "@/lib/config/db";
import categoryModel from "@/lib/models/CategoryModel";
import { NextResponse } from "next/server";

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
    console.log(error);
    return NextResponse.json(
      { msg: "Error user action by ID", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    await categoryModel.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error delete category by ID", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    console.log(id);
    const { categoryName, description } = await req.json();
    console.log("CategoryName:", categoryName, "Description:", description);

    const category = await categoryModel.findById(id);
    console.log(category, "Category...");

    if (!category) {
      return NextResponse.json({ msg: "Category not found" }, { status: 404 });
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
    return NextResponse.json(
      { msg: "Error update category by ID", error },
      { status: 500 }
    );
  }
}
