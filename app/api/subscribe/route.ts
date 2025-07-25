import { connectDB } from "@/lib/config/db";
import SubscribeModel from "@/lib/models/SubscribeModel";
import { NextResponse } from "next/server";

// =====> API Endpoint for subscribing blogs <=====
export async function POST(req: Request) {
  try {
    await connectDB();

    const { email } = await req.json();
    const existing = await SubscribeModel.findOne({ email });

    if (existing) {
      return NextResponse.json({ msg: "Already subscribed" }, { status: 409 });
    }

    await SubscribeModel.create({ email });

    return NextResponse.json(
      { success: true, msg: "Subscribed successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/subscribe error:", error);
    return NextResponse.json({ msg: "Subscription failed" }, { status: 500 });
  }
}

// =====> API Endpoint to get all subscription <=====
export async function GET(req: Request) {
  try {
    await connectDB();

    const subscription = await SubscribeModel.find({});
    
    return NextResponse.json(
      { msg: "Subscription", subscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("GETT /api/subscribe error:", error);
    return NextResponse.json(
      { msg: "Error fetching Subscription" },
      { status: 500 }
    );
  }
}
