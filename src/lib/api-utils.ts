import { ConvexHttpClient } from "convex/browser";
import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://api.together.xyz/v1",
});

export const convexHttpClient = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL as string);
