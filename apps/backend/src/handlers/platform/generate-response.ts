import { openai } from "../../lib/utils";

async function textToSpeechInputStreaming(textIterator: AsyncGenerator<string, void>) {
  const uri = `wss://api.elevenlabs.io/v1/text-to-speech/Lgq6SjqXaQmyYG6p9Y9n/stream-input?model_id=eleven_multilingual_v1`;

  const websocket = new WebSocket(uri);

  return await new Promise<any[]>((resolve, reject) => {
    websocket.addEventListener("open", async () => {
      let audio: any[] = [];

      websocket.addEventListener("message", message => {
        const data = JSON.parse((message.data as Buffer).toString());
        console.log("got message");
        if (data.audio) audio.push(data.audio);
        else resolve(audio);
      });

      const sendMessage = (message: Record<string, any>) => {
        console.log(message);
        return new Promise<void>((resolve, reject) => {
          websocket.send(JSON.stringify(message));
          resolve();
        });
      };

      await sendMessage({
        text: " ",
        voice_settings: { stability: 0.5, similarity_boost: 0.8 },
        xi_api_key: process.env.ELEVENLABS_API_KEY,
      });

      for await (const text of textIterator) {
        if (typeof text !== "undefined" && text !== "") await sendMessage({ text, try_trigger_generation: true });
      }

      await sendMessage({ text: "" });
    });

    websocket.addEventListener("error", error => {
      console.log(error);
      reject(error);
    });

    websocket.addEventListener("close", event => {
      console.log("Connection closed");
    });
  });
}

export default async function generateResponse({
  config,
  history,
  message,
}: {
  config: any;
  history: string[];
  message: string;
}) {
  const response = await openai.chat.completions.create({
    model: "Qwen/Qwen1.5-14B-Chat",
    messages: [
      {
        role: "system",
        content:
          "Your role is to assist the user in learning Spanish. Please only respond in Spanish. Please only respond in 1–3 sentences.",
      },
      { role: "user", content: message },
    ],
    stream: true,
  });

  async function* textIterator() {
    for await (const chunk of response) {
      const delta = chunk.choices[0].delta;
      yield delta.content as string;
    }
  }

  const res = await textToSpeechInputStreaming(textIterator());

  const mp3buffer = Buffer.concat(res.map(output => Buffer.from(output, "base64")));

  await Bun.write(`output.mp3`, mp3buffer);

  console.log("MP3 file saved successfully");
}
