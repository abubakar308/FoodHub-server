import { Request, Response } from "express";
import { AiService, ChatMessage } from "./ai.service";

// Chat
const chatAssistant = async (req: Request, res: Response) => {
    try {
        const { messages } = req.body as { messages: ChatMessage[] };

        const reply = await AiService.getChatReply(messages);

        res.status(200).json({
            success: true,
            message: "AI response generated successfully",
            data: { reply },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "AI chat failed",
            error: error.message,
        });
    }
};

// Recommendation
const recommendMeals = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;

        const reply = await AiService.getMealRecommendations(prompt);

        res.status(200).json({
            success: true,
            message: "Meal recommendations generated successfully",
            data: { reply },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Recommendation failed",
            error: error.message,
        });
    }
};

// Content Generator
const generateMealContent = async (req: Request, res: Response) => {
    try {
        const result = await AiService.generateMealContent(req.body);

        res.status(200).json({
            success: true,
            message: "Meal content generated successfully",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Content generation failed",
            error: error.message,
        });
    }
};

const searchSuggestions = async (req: Request, res: Response) => {
    try {
        const { query } = req.query;

        const result = await AiService.getSearchSuggestions(query as string);

        res.status(200).json({
            success: true,
            message: "Suggestions fetched",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Suggestion failed",
            error: error.message,
        });
    }
};
export const AiController = {
    chatAssistant,
    recommendMeals,
    generateMealContent,
    searchSuggestions
};