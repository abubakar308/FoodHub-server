import { Router } from "express";
import { AiController } from "./ai.controller";
import auth from "../../middleware/auth";

const router = Router();

router.post("/ai/chat", AiController.chatAssistant);

router.post("/ai/recommend-meals", AiController.recommendMeals);

router.post(
    "/ai/generate-meal-content",
    auth("PROVIDER", "ADMIN"),
    AiController.generateMealContent
);

router.post("/ai/search-suggestions", AiController.searchSuggestions);

export const AiRoutes = router;