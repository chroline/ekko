import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://api.together.xyz",
});
