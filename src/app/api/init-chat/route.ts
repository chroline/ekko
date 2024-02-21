import { NextRequest } from "next/server";

import generateResponse from "~/app/api/generate-response";
import { api } from "~/convex/_generated/api";
import { convexHttpClient } from "~/lib/api-utils";
import Profile from "~/lib/types/Profile";

interface RequestData {
  config: Omit<Profile, "name">;
  userId: string;
}

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();

  const initialMessage: { text: string } = await generateResponse({ config: data.config, history: [] });

  const chatId = await convexHttpClient.mutation(api.chats.createChat, {
    userId: data.userId,
    initialMessage: initialMessage.text,
  });

  return Response.json({ chatId, initialMessage });
}
