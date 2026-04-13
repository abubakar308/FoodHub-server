import { z } from "zod";

const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

const recommendSchema = z.object({
  prompt: z.string().min(3),
});

const generateMealSchema = z.object({
  title: z.string(),
  category: z.string(),
  ingredients: z.string(),
});

export const AiValidation = {
  chatSchema,
  recommendSchema,
  generateMealSchema,
};