import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { ConvexHttpClient } from "convex/browser";
import OpenAI from "openai";

export { api } from "../../../../convex/_generated/api";

export const openai = new OpenAI({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://api.together.xyz/v1",
});

export const convex = new ConvexHttpClient(process.env.CONVEX_URL as string);

export const predictionServiceClient = new PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  fallback: true,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
