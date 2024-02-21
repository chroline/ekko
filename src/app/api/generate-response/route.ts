import { NextRequest } from "next/server";

import generateResponse from "~/app/api/generate-response/index";

export async function POST(request: NextRequest) {
  const data = await request.json();

  return Response.json(await generateResponse(data));
}
