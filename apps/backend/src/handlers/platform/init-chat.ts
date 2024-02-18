import Profile from "@app/common/types/Profile";

import { api, convex } from "~/lib/utils";

import generateResponse from "./generate-response";

export default async function initChat({ config, userId }: { config: Omit<Profile, "name">; userId: string }) {
  const initialMessage = await generateResponse({ config, history: [] });

  const chatId = await convex.mutation(api.chats.createChat, { userId, initialMessage: initialMessage.text });

  return { chatId, initialMessage };
}
