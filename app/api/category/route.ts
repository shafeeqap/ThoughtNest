import { connectDB } from "@/lib/config/db";
import categoryModel from "@/lib/models/CategoryModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { categoryName, description } = await req.json();

    const existCategory = await categoryModel.findOne({ categoryName });

    if (existCategory) {
      return NextResponse.json(
        { msg: "Category already exists" },
        { status: 409 }
      );
    }

    const newCategory = await categoryModel.create({
      categoryName,
      description,
    });

    return NextResponse.json(
      { msg: "Category added successfully!", newCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/category error:", error);
    return NextResponse.json({ msg: "Category added failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const category = await categoryModel.find();

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error("POST /api/category error:", error);
    return NextResponse.json(
      { msg: "Category fetching failed" },
      { status: 500 }
    );
  }
}
