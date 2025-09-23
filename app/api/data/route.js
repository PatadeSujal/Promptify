import connectToDb from "@/lib/connectToDb";
import PromptData from "@/models/Prompts";

export async function GET(req) {
  try {
    await connectToDb();

    // Parse query params (default: page=1, limit=8)
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 8;
    const skip = (page - 1) * limit;

    // Fetch paginated data
    const prompts = await PromptData.find().skip(skip).limit(limit);

    // Count total documents for frontend navigation
    const total = await PromptData.countDocuments();
    const totalPages = Math.ceil(total / limit);

    return new Response(
      JSON.stringify({
        page,
        totalPages,
        total,
        prompts,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch data",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
