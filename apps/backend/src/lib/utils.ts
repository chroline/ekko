import { PredictionServiceClient } from "@google-cloud/aiplatform";
import { ConvexHttpClient } from "convex/browser";
import OpenAI from "openai";

export { api } from "../../../../convex/_generated/api";

export const openai = new OpenAI({
  apiKey: process.env["TOGETHER_API_KEY"],
  baseURL: "https://api.together.xyz",
});

export const convex = new ConvexHttpClient(process.env.CONVEX_URL as string);

export const predictionServiceClient = new PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  // credentials: {
  //   client_email: process.env.GCLOUD_CLIENT_EMAIL,
  //   private_key: process.env.GCLOUD_PRIVATE_KEY,
  // },
});
