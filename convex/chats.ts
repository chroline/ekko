import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getChat = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    if (!args.chatId) return undefined;
    return await ctx.db
      .query("chats")
      .filter(q => q.eq(q.field("_id"), args.chatId))
      .first();
  },
});

export const createChat = mutation({
  args: { userId: v.string(), initialMessage: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("chats", {
      userId: args.userId,
      messages: [{ message: args.initialMessage, isUser: false }],
    });
  },
});
