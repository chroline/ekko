import Profile from "@app/common/types/Profile";

import { api, convex, openai } from "~/lib/utils";

import generateResponse from "./generate-response";

export default async function performRecall({ message, userId }: { message: string; userId: string }) {
  const embedding = await openai.embeddings
    .create({
      model: "togethercomputer/m2-bert-80M-32k-retrieval",
      input: [message],
    })
    .then(v => v.data[0].embedding);

  const recall = await convex.action(api.knowledge.performRecall, { userId, embedding });

  const messages = await Promise.all(
    recall.map(async result => {
      const message = await convex.query(api.knowledge.retrieveKnowledge, { id: result._id });
      return message?.message;
    })
  );

  return messages.filter(v => !!v);
}
