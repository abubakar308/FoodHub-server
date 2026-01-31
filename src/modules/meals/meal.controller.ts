import { Request, Response } from "express";
import { MealService } from "./meal.service";
import { prisma } from "../../lib/prisma";

const createMeal = async (req: Request, res: Response) => {
  try {
    const { title, description, price, imageUrl, categoryId } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const providerProfile = await prisma.providerProfile.findUnique({
      where: { userId: req.user!.id },
    });

    if (!providerProfile) {
      return res.status(403).json({ message: "Provider profile not found" });
    }

    const meal = await MealService.createMeal({
      title,
      description,
      price,
      imageUrl,
      categoryId,
      providerId: providerProfile.id,
    });

    res.status(201).json({ success: true, data: meal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create meal" });
  }
};


export const MealController = {
    createMeal
}
