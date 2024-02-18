import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const getFeedbacksFromChat = query({
  args: { chatId: v.string() },
  handler: async (ctx, args) => {
    if (!args.chatId) return [];
    return ctx.db.query("feedbacks").filter(q => q.eq(q.field("chatId"), args.chatId));
  },
});

export const createFeedback = mutation({
  args: { chatId: v.string(), message: v.string(), feedback: v.string(), proficiency: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedbacks", args);
  },
});
