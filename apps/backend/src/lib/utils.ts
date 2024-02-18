import { ConvexHttpClient } from "convex/browser";
import OpenAI from "openai";

export { api } from "../../../../convex/_generated/api";

export const openai = new OpenAI({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://api.together.xyz",
});

export const convex = new ConvexHttpClient(process.env.CONVEX_URL as string);
