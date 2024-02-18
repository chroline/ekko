import { v } from "convex/values";

import { query } from "./_generated/server";

export const getChat = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    if (!args.chatId) return undefined;
    return await ctx.db
      .query("chats")
      .filter(q => q.eq(q.field("id"), args.chatId))
      .first();
  },
});
