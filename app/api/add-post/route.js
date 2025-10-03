import connectToDb from "@/lib/connectToDb";
import PromptData from "@/models/Prompts";

export async function POST(req) {
  try {
    await connectToDb();
    const body = await req.json();

    // Accept both uppercase and lowercase keys
    const { Name, Prompt, image_link, Hashtags, hashtags } = body;

    // Normalize fields
    const name = Name || body.name;
    const prompt = Prompt || body.prompt;

    // Convert hashtags array to string if needed
    let tags = Hashtags || hashtags;
    if (Array.isArray(tags)) {
      tags = tags.join(" "); // join array into single string
    }

    // Validate required fields
    if (!name || !prompt || !image_link) {
      return Response.json(
        { message: "Name, Prompt and image_link are required" },
        { status: 400 }
      );
    }

    // Insert into DB
    const result = await PromptData.create({
      name,
      prompt,
      image_link,
      hashtags: tags || "", // always string
    });

    // Response
    return Response.json(
      {
        message: "Data inserted successfully",
        insertedId: result._id,
        data: {
          _id: result._id,
          image_link: result.image_link,
          Name: result.name,
          Prompt: result.prompt,
          Hashtags: result.hashtags, // single string
          createdAt: result.createdAt,
          updatedAt: result.updatedAt,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error inserting data:", err);
    return Response.json(
      { message: "Error inserting data", error: err.message },
      { status: 500 }
    );
  }
}
