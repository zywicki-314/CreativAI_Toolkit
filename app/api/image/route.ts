import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const openAI = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, amount, size, model } = body;

    if (!prompt) {
      return new NextResponse("No content", {
        status: 400,
      });
    }

    const responseImages = await openAI.images.generate({
      model,
      prompt,
      n: Number(amount),
      size,
    });

    return NextResponse.json(responseImages.data);
  } catch (error) {
    return new NextResponse(`[IMAGE_ERROR] - ${error}`, {
      status: 500,
    });
  }
}
