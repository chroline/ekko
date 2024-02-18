import { v } from "convex/values";

import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const getProfile = query({
  args: { profileId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.profileId) return undefined;
    return await ctx.db
      .query("profiles")
      .filter(q => q.eq(q.field("id"), args.profileId))
      .first();
  },
});

export const createProfile = mutation({
  args: {
    languageLearning: v.string(),
    name: v.string(),
    knownLanguages: v.string(),
    interests: v.string(),
    learningGoal: v.string(),
    id: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("profiles", { ...args, proficiencyLevel: "Novice" });
  },
});
