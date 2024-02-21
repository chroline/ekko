import { NextRequest } from "next/server";

import { api } from "~/convex/_generated/api";
import { convexHttpClient, openai } from "~/lib/api-utils";

interface RequestData {
  message: string;
  userId: string;
}

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();

  try {
    const embedding = await openai.embeddings
      .create({
        model: "togethercomputer/m2-bert-80M-32k-retrieval",
        input: [data.message],
      })
      .then(v => v.data[0]?.embedding);

    await convexHttpClient.mutation(api.knowledge.saveKnowledge, {
      userId: data.userId,
      message: data.message,
      embedding,
    });
  } catch (e) {}

  return Response.json({}, { status: 200 });
}
