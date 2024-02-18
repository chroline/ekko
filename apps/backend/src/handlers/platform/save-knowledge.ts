import Profile from "@app/common/types/Profile";

import { api, convex, openai } from "~/lib/utils";

import generateResponse from "./generate-response";

export default async function saveKnowledge({ message, userId }: { message: string; userId: string }) {
  const embedding = await openai.embeddings
    .create({
      model: "togethercomputer/m2-bert-80M-32k-retrieval",
      input: [message],
    })
    .then(v => v.data[0].embedding);

  await convex.mutation(api.knowledge.saveKnowledge, { userId, message, embedding });
}
