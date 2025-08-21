import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    const prompt = `Split the following text into meaningful sentence-based chunks, each no longer than 3000 characters. Return as a JSON array of strings, without explanations.\n\nTEXT:\n${text}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawOutput = completion.choices[0].message.content || "[]";
    const chunks = JSON.parse(rawOutput);

    return NextResponse.json({ chunks });
  } catch (error) {
    console.error("OpenAI split error:", error);
    return NextResponse.json({ error: "Split failed" }, { status: 500 });
  }
}
