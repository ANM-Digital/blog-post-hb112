import { NextResponse } from "next/server";
import { OpenAI } from "openai";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const task = reqBody.task;

    if (!task) {
      return NextResponse.json({ error: "Missing 'task' field" }, { status: 400 });
    }

    if (task === "splitText") {
      const inputText = reqBody.input;

      if (!inputText || typeof inputText !== "string" || inputText.trim() === "") {
        return NextResponse.json({ error: "Invalid or empty 'input' text" }, { status: 400 });
      }

      let openaiRes;
      try {
        openaiRes = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Split the following long text into an array of 3–10 meaningful chunks, each ending at a natural sentence boundary. Respond only with a JSON array of strings.",
            },
            {
              role: "user",
              content: inputText,
            },
          ],
          temperature: 0.3,
          max_tokens: 4096,
        });
      } catch (openaiError) {
        console.error("OpenAI API Error:", openaiError);
        return NextResponse.json(
          { error: "Failed to generate response from OpenAI" },
          { status: 502 }
        );
      }

      const content = openaiRes.choices[0]?.message?.content;

      try {
        const parsedChunks: string[] = JSON.parse(content || "[]");

        if (!Array.isArray(parsedChunks)) {
          throw new Error("Response is not an array");
        }

        return NextResponse.json({ chunks: parsedChunks });
      } catch (parseErr) {
        console.error("Failed to parse OpenAI response:", content);
        return NextResponse.json(
          { error: "OpenAI returned an invalid format. Expected a JSON array." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ error: `Unknown task: ${task}` }, { status: 400 });
  } catch (err: any) {
    console.error("Internal Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err.message },
      { status: 500 }
    );
  }
}
