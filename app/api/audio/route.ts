import { NextResponse } from "next/server";

import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return new NextResponse("No content", {
        status: 400,
      });
    }
    const input = {
      prompt,
      model_version: "stereo-large",
      output_format: "mp3",
      duration: 5,
      normalization_strategy: "peak",
    };

    const output = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      { input }
    );
    return NextResponse.json({ url: output.url() });
  } catch (error) {
    console.error("[AUDIO_GENERATION_ERROR]", error);
    return new NextResponse(`[AUDIO_ERROR] - ${error}`, {
      status: 500,
    });
  }
}
