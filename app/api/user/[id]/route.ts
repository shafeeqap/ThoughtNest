import { connectDB } from "@/lib/config/db";
import UserModal from "@/lib/models/UserModel";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const user = await UserModal.findById(id);

    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }

    const newStatus = user.status === "active" ? "blocked" : "active";

    const updatedUser = await UserModal.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );

    return NextResponse.json(
      { msg: "User status updated successfully", updatedUser },
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
