import { connectDB } from "@/lib/config/db";
import SubscribeModel from "@/lib/models/SubscribeModel";
import { NextResponse } from "next/server";

// =====> API Endpoint to delete blogs <=====
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const subscribe = await SubscribeModel.findById(id);
    if (!subscribe) {
      return NextResponse.json({ msg: "Subscribe not found" }, { status: 404 });
    }

    await SubscribeModel.findByIdAndDelete(id);

    return NextResponse.json(
      { msg: "Subscribe deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/subscribe/[id] error:", error);
    return NextResponse.json(
      { msg: "Error delete blog by ID", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const subscribe = await SubscribeModel.findById(id);

    if (!subscribe) {
      return NextResponse.json(
        { msg: "Subscription not found" },
        { status: 404 }
      );
    }

    const newStatus = subscribe.status === "active" ? "blocked" : "active";

    const updatedSubscribe = await SubscribeModel.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    return NextResponse.json(
      { msg: "Subscribe status updated successfully", updatedSubscribe },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/subscribe/[id] error:", error);
    return NextResponse.json(
      { msg: "Error subscribe action by ID", error },
      { status: 500 }
    );
  }
}
