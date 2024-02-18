import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { google } from "@google-cloud/aiplatform/build/protos/protos";
import Mustache from "mustache";
import { ChatCompletionMessageParam } from "openai/resources";

import Profile from "@app/common/types/Profile";

import { api, convex, openai, predictionServiceClient } from "~/lib/utils";

import IPredictResponse = google.cloud.aiplatform.v1.IPredictResponse;

const GenerateFeedbackPrompt = await Bun.file("../../packages/prompts/GenerateFeedback.mustache").text();

export default async function generateFeedback({
  message,
  chatId,
  languageLearning,
}: {
  message: string;
  chatId: string;
  languageLearning: string;
}) {
  const response = await openai.chat.completions.create({
    model: "NousResearch/Nous-Hermes-2-Yi-34B" as any,
    messages: [
      {
        role: "system",
        content: Mustache.render(GenerateFeedbackPrompt, { languageLearning }),
      },
      { role: "user", content: message },
    ].filter(message => !!message) as ChatCompletionMessageParam[],
    stream: true,
    temperature: 1,
  });

  let feedback = "";
  for await (const chunk of response) {
    const delta = chunk.choices[0].delta;
    if (delta.content) feedback += delta.content;
  }

  const [proficiencyInference] = await predictionServiceClient.predict({
    endpoint: "projects/treehacks2024-414614/locations/us-central1/endpoints/5619746866074746880",
    instances: [{ stringValue: message }],
  });

  await convex.mutation(api.feedbacks.createFeedback, {
    chatId,
    message,
    feedback,
    proficiency: proficiencyInference.predictions?.[0].stringValue || "Novice",
  });
}
