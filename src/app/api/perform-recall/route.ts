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

    const recall = await convexHttpClient.action(api.knowledge.performRecall, { userId: data.userId, embedding });

    const messages = await Promise.all(
      recall.map(async result => {
        const message = await convexHttpClient.query(api.knowledge.retrieveKnowledge, { id: result._id });
        return message?.message;
      })
    );

    return Response.json(messages.filter(v => !!v));
  } catch (e) {
    return Response.json([]);
  }
}
