import connectToDb from "@/lib/connectToDb";
import PromptData from "@/models/Prompts";

export async function POST(req) {
  try {
    await connectToDb();

    const data = await req.json();
    console.log("Search query:", data.name);

    // ✅ Use regex to simulate "contains"
     const prompts = await PromptData.find({
      $or: [
        { name: { $regex: data.name, $options: "i" } },      // case-insensitive search in Name
        { hashtags: { $regex: data.name, $options: "i" } },  // case-insensitive search in Hashtags
      ],
    });

    return new Response(
      JSON.stringify({
        query: data.name,
        results: prompts,
        count: prompts.length,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch data",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
