import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file = data.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ msg: "No file uploaded" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  await fs.writeFile(filePath, buffer);

  return NextResponse.json({ url: `/upload/${fileName}` }, { status: 200 });
}
