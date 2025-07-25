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
      fps: 24,
      width: 1024,
      height: 576,
      prompt,
      guidance_scale: 17.5,
      negative_prompt:
        "very blue, dust, noisy, washed out, ugly, distorted, broken",
    };

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      { input }
    );

    return NextResponse.json({ url: output[0].url() });
  } catch (error) {
    console.error("[VIDEO_GENERATION_ERROR]", error);
    return new NextResponse(`[VIDEO_ERROR] - ${error}`, {
      status: 500,
    });
  }
}
