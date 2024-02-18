import Mustache from "mustache";
import { ChatCompletionMessageParam } from "openai/resources";

import Profile from "@app/common/types/Profile";

import { openai } from "~/lib/utils";

const GenerateResponsePrompt = await Bun.file("../../packages/prompts/GenerateResponse.mustache").text();

const QuestionPrompt =
  "\n\nDon't introduce the conversation to the user. Ask a specific, open-ended, thought-provoking question that is related to the user's specific interests. Only ask ONE question. Keep the length around 1-2 sentences.";

async function textToSpeechInputStreaming(textIterator: AsyncGenerator<string, void>) {
  const uri = `wss://api.elevenlabs.io/v1/text-to-speech/pMsXgVXv3BLzUgSXRplE/stream-input?model_id=eleven_multilingual_v1`;

  const websocket = new WebSocket(uri);

  return await new Promise<{ text: string; audio: any[] }>((resolve, reject) => {
    websocket.addEventListener("open", async () => {
      let text = "";
      let audio: any[] = [];

      websocket.addEventListener("message", message => {
        const data = JSON.parse((message.data as Buffer).toString());
        if (data.audio) audio.push(data.audio);
        else resolve({ text, audio });
      });

      const sendMessage = (message: Record<string, any>) => {
        return new Promise<void>((resolve, reject) => {
          websocket.send(JSON.stringify(message));
          resolve();
        });
      };

      await sendMessage({
        text: " ",
        voice_settings: { stability: 0.4, similarity_boost: 0.75 },
        xi_api_key: process.env.ELEVENLABS_API_KEY,
      });

      for await (const newText of textIterator) {
        if (typeof newText !== "undefined" && newText !== "") {
          text += newText;
          await sendMessage({ text: newText, try_trigger_generation: true });
        }
      }

      await sendMessage({ text: "" });
    });

    websocket.addEventListener("error", error => {
      reject(error);
    });
  });
}

export default async function generateResponse({
  config,
  history,
  message,
}: {
  config: Omit<Profile, "name">;
  history: string[];
  message?: string;
}) {
  const response = await openai.chat.completions.create({
    model: "NousResearch/Nous-Hermes-2-Yi-34B" as any,
    messages: [
      {
        role: "system",
        content: Mustache.render(GenerateResponsePrompt, config) + (message ? "" : QuestionPrompt),
      },
      ...history.map((message, i) => ({ role: i % 2 === 0 ? "assistant" : "user", content: message || "" })),
      { role: "user", content: message || "" },
    ].filter(message => !!message) as ChatCompletionMessageParam[],
    stream: true,
    temperature: 1,
  });

  async function* textIterator() {
    for await (const chunk of response) {
      const delta = chunk.choices[0].delta;
      yield delta.content as string;
    }
  }

  const { text, audio } = await textToSpeechInputStreaming(textIterator());

  const mp3buffer = Buffer.concat(audio.map(output => Buffer.from(output, "base64")));

  return { text, mp3buffer };
}
