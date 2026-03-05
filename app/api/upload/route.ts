import { NextRequest, NextResponse } from "next/server";
import uploadToCloudinary from "@/lib/cloudinary/uploadToCloudinary";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File | null;
  console.log("Received file:", file);

  if (!file) {
    return NextResponse.json({ msg: "No file uploaded" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { msg: "Only image files are allowed" },
      { status: 400 }
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    return NextResponse.json(
      { msg: "File size exceeds 5MB limit" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result = await uploadToCloudinary(buffer, "blog/content");
  // console.log("Cloudinary content image upload result:", result);

  return NextResponse.json({ url: result.secure_url }, { status: 200 });
}
