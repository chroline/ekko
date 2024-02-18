import { v } from "convex/values";

import { Id } from "./_generated/dataModel";
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

export const addMessageToChat = mutation({
  args: { chatId: v.string(), message: v.object({ isUser: v.boolean(), message: v.string() }) },
  handler: async (ctx, args) => {
    const chatDoc = await ctx.db
      .query("chats")
      .filter(q => q.eq(q.field("_id"), args.chatId))
      .first();

    return await ctx.db.patch<"chats">(args.chatId as Id<"chats">, {
      messages: [...chatDoc.messages, args.message],
    });
  },
});


export const getChatsProficiencyLevel = query({
  args: { userId: v.id("user") },
  handler: async (ctx, args) => {
    if (!args.userId) return undefined;
    const chats = await ctx.db
      .query("chats")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .take(5)
      var averageScore = -1;
      if (chats) {
        let totalScore = 0;
        chats.forEach(chat => {
          totalScore += chat.score;
        });
        averageScore = totalScore / chats.length;
      }

    const proficiencyLevels = ["Novice", "Intermediate", "Proficient", "Advanced", "Fluent"];
    const closestProficiencyLevel = proficiencyLevels[Math.round(averageScore) - 1];

    return closestProficiencyLevel;
  },
});
