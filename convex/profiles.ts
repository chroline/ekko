import { v } from "convex/values";

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
