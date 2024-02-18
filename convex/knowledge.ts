import { v } from "convex/values";

import { action, mutation, query } from "./_generated/server";

export const saveKnowledge = mutation({
  args: { userId: v.string(), message: v.string(), embedding: v.array(v.float64()) },
  handler: async (ctx, args) => {
    await ctx.db.insert("knowledge", { ...args });
  },
});

export const performRecall = action({
  args: { userId: v.string(), embedding: v.array(v.float64()) },
  handler: async (ctx, args) => {
    return await ctx.vectorSearch("knowledge", "by_embedding", {
      vector: args.embedding,
      limit: 4,
      filter: q => q.eq("userId", args.userId),
    });
  },
});

export const retrieveKnowledge = query({
  args: { id: v.id("knowledge") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
