import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
    profiles: defineTable({
        languageLearning: v.string(),
        name: v.string(),
        knownLanguages: v.string(),
        interests: v.string(),
        learningGoal: v.string(),
        id: v.string(),
        proficiencyLevel: v.string(),
    }),
    chats: defineTable({
        userId: v.string(),
        messages: v.array(v.object({ message: v.string(), isUser: v.boolean() })),
        proficiencyLevel: v.optional(v.string()),
    }),
    feedbacks: defineTable({ chatId: v.string(), message: v.string(), feedback: v.string(), proficiency: v.string() }),
    knowledge: defineTable({
        userId: v.string(),
        message: v.string(),
        embedding: v.array(v.float64()),
    }).vectorIndex("by_embedding", {
        vectorField: "embedding",
        dimensions: 768,
        filterFields: ["userId"],
    }),
});
