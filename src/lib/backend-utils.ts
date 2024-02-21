import { PredictionServiceClient } from "@google-cloud/aiplatform";

export const predictionServiceClient = new PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  fallback: true,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});
