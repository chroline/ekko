import fs from "fs/promises";
import Mustache from "mustache";
import { NextRequest } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources";
import path from "path";

import { api } from "~/convex/_generated/api";
import { convexHttpClient, openai } from "~/lib/api-utils";
import { predictionServiceClient } from "~/lib/backend-utils";

interface RequestData {
  message: string;
  chatId: string;
  languageLearning: string;
}

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();

  const GenerateFeedbackPrompt = await fs.readFile(
    path.join(process.cwd(), "src/prompts/GenerateFeedback.mustache"),
    "utf-8"
  );

  const response = await openai.chat.completions.create({
    model: "NousResearch/Nous-Hermes-2-Yi-34B" as any,
    messages: [
      {
        role: "system",
        content: Mustache.render(GenerateFeedbackPrompt, { languageLearning: data.languageLearning }),
      },
      { role: "user", content: data.message },
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
    instances: [{ stringValue: data.message }],
  });

  await convexHttpClient.mutation(api.feedbacks.createFeedback, {
    chatId: data.chatId,
    message: data.message,
    feedback,
    proficiency: proficiencyInference.predictions?.[0].stringValue || "Novice",
  });

  return Response.json({}, { status: 200 });
}
