import { connectDB } from "@/lib/config/db";

// =====> API Endpoint to get blogs by category <=====
export async function GET(
  req: Request,
  { params }: { params: { category: string } }
) {
  try {
    connectDB();

    const { category } = params;

    console.log(category, "Category...");
    
  } catch (error) {
    console.log(error);
  }
}
