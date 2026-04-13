import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const openai = new OpenAI({
    apiKey: config.openai_api_key,
});

export type ChatMessage = {
    role: "system" | "user" | "assistant";
    content: string;
};

// 1️⃣ Chat Assistant
const getChatReply = async (messages: ChatMessage[]) => {
    const formattedMessages: ChatCompletionMessageParam[] = messages.map(
        (message) => ({
            role: message.role,
            content: message.content,
        })
    );

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: formattedMessages,
    });

    return response.choices[0]?.message?.content || "";
};

// 2️⃣ Meal Recommendation
const getMealRecommendations = async (prompt: string) => {
    const meals = await prisma.meal.findMany({
        select: {
            title: true,
            price: true,
            category: {
                select: { name: true },
            },
        },
        take: 20,
    });

    const context = meals
        .map(
            (m) => `${m.title} - ${m.price} taka (${m.category?.name || "General"})`
        )
        .join("\n");

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: `You are a food recommendation assistant.
Only suggest meals from the given list below:

${context}`,
        },
        {
            role: "user",
            content: prompt,
        },
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
    });

    return response.choices[0]?.message?.content || "";
};

// 3️⃣ Meal Content Generator
const generateMealContent = async (payload: {
    title: string;
    category: string;
    ingredients: string;
}) => {
    const { title, category, ingredients } = payload;

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: "Generate JSON with shortDescription, description, tags",
        },
        {
            role: "user",
            content: `Title: ${title}, Category: ${category}, Ingredients: ${ingredients}`,
        },
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
    });

    return response.choices[0]?.message?.content || "";
};

// 4️⃣ Search Suggestion
const getSearchSuggestions = async (query: string) => {
    if (!query) return [];

    const meals = await prisma.meal.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive",
            },
        },
        select: {
            id: true,
            title: true,
        },
        take: 5,
    });

    return meals;
};

export const AiService = {
    getChatReply,
    getMealRecommendations,
    generateMealContent,
    getSearchSuggestions,
};