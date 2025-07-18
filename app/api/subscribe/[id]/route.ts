import { connectDB } from "@/lib/config/db";
import SubscribeModel from "@/lib/models/SubscribeModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to delete blogs <=====
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const subscribe = await SubscribeModel.findById(params.id);
    if (!subscribe) {
      return NextResponse.json({ msg: "Subscribe not found" }, { status: 404 });
    }

    await SubscribeModel.findByIdAndDelete(params.id);

    return NextResponse.json(
      { msg: "Subscribe deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error delete blog by ID", error },
      { status: 500 }
    );
  }
}
