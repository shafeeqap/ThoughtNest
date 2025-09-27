import { connectDB } from "@/lib/config/db";
import categoryModel from "@/lib/models/CategoryModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to add category <=====
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

// =====> API Endpoint to get all category <=====
export async function GET() {
  try {
    await connectDB();
    const categories = await categoryModel.aggregate([
      {
        $lookup: {
          from: "blogmodels",
          localField: "_id",
          foreignField: "category",
          as: "blogs",
        },
      },
      {
        $addFields: {
          blogCount: { $size: "$blogs" },
        },
      },
      {
        $project: { blogs: 0 },
      },
    ]);


    // const categoryData = await Promise.all(
    //   categories.map(async (cat) => {
    //     const countBlogs = await BlogModel.countDocuments({
    //       category: cat._id,
    //     });

    //     return {
    //       _id: cat._id,
    //       categoryName: cat.categoryName,
    //       description: cat.description,
    //       status: cat.status,
    //       blogCount: countBlogs,
    //     };
    //   })
    // );

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error("POST /api/category error:", error);
    return NextResponse.json(
      { msg: "Category fetching failed" },
      { status: 500 }
    );
  }
}
