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
      providerId: providerProfile.id
    });

    res.status(201).json({
      success: true,
      message: "mail create successfull",
      data: meal
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create meal",
      error: error.message
    });
  }
};


// get all meals (optional category filter)
const getMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealService.getMeals(
      req.query.categoryId as string | undefined,
    );
    res.json({ success: true, data: meals });
  } catch {
    res.status(500).json({ message: "Failed to fetch meals" });
  }
};

// get meal details
const getMeal = async (req: Request, res: Response) => {
  const meal = await MealService.getMealById(req.params.id as string);

  if (!meal) {
    return res.status(404).json({ message: "Meal not found" });
  }

  res.json({ success: true, data: meal });
};


// update own meal
const updateMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.id;
    const user = req.user

    const result = await MealService.updateMeal(mealId as string, req.body, user?.id as string)
    res.status(200).json({
      success: true,
      message: "meal update successfull",
      data: result
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to create meal",
      error: error.message
    });
  }
};

// delete own meal
const deleteMeal = async (req: Request, res: Response) => {

  try {

    const mealid = req.params.id as string;
    const userId = req.user.id;

    const result = await MealService.deleteMeal( mealid, userId );

    
    const provider = await prisma.providerProfile.findUnique({
  where: { userId: req.user.id }
});

if (!provider) throw new Error("Provider not found");
    
  res.status(200).json({ 
      success: true,
      message: "meal delete successfull",
       data: result });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Meal delation failed",
      error: error.message
    });
  }
};

export const MealController = {
  createMeal,
  getMeals,
  getMeal,
  updateMeal,
  deleteMeal

}
