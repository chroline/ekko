import { NextRequest } from "next/server";

import { api } from "~/convex/_generated/api";
import { convexHttpClient } from "~/lib/api-utils";
import Profile from "~/lib/types/Profile";

interface RequestData {
  config: Omit<Profile, "name">;
  userId: string;
}

export async function POST(request: NextRequest) {
  const data: RequestData = await request.json();

  console.log(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/generate-response", {
    method: "POST",
    body: JSON.stringify({ config: data.config, history: [] }),
    headers: {
      Authorization: `Bearer ${request.cookies.get("__session").value}`,
    },
  });

  const initialMessage: { text: string } = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/generate-response", {
    method: "POST",
    body: JSON.stringify({ config: data.config, history: [] }),
    headers: {
      Authorization: `Bearer ${request.cookies.get("__session").value}`,
    },
  }).then(v => v.json());

  const chatId = await convexHttpClient.mutation(api.chats.createChat, {
    userId: data.userId,
    initialMessage: initialMessage.text,
  });

  return Response.json({ chatId, initialMessage });
}
