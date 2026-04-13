import { Request, Response } from "express";
import { MealService } from "./meal.service";
import { prisma } from "../../lib/prisma";
import { uploadToCloudinary } from "../../utils/upload";

const createMeal = async (req: Request, res: Response) => {
  try {
    const {
      title,
      shortDescription,
      description,
      ingredients,
      price,
      discountPrice,
      categoryId,
      isAvailable,
      isFeatured,
      preparationTime,
      calories,
      tags,
    } = req.body;

    if (!title || !price || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "title, price and categoryId are required",
      });
    }

    const imageUrl = req.file
      ? await uploadToCloudinary(req.file.buffer, "foodhub/users")
      : undefined;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const provider = await prisma.providerProfile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true, isApproved: true },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    if (!provider.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Provider is not approved yet",
      });
    }

    const mealPayload = {
      title,
      shortDescription,
      description,
      ingredients,
      price: Number(price),
      imageUrl,
      categoryId,
      isAvailable,
      isFeatured,
      tags,
      ...(discountPrice !== undefined && {
        discountPrice: Number(discountPrice),
      }),
      ...(preparationTime !== undefined && {
        preparationTime: Number(preparationTime),
      }),
      ...(calories !== undefined && {
        calories: Number(calories),
      }),
    };

    const meal = await MealService.createMeal(req.user!.id, mealPayload);

    return res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: meal,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "Provider profile not found"
          : error.message === "PROVIDER_NOT_APPROVED"
            ? "Provider is not approved yet"
            : error.message === "CATEGORY_NOT_FOUND"
              ? "Category not found"
              : "Failed to create meal",
      error: error.message,
    });
  }
};

// get all meals
const getMeals = async (req: Request, res: Response) => {
  try {
    const meals = await MealService.getMeals(
      req.query as any
    );

    return res.status(200).json({
      success: true,
      data: meals.data,
      meta: meals.meta
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meals",
      error: error.message,
    });
  }
};

// optional: get logged-in provider's own meals
const getMyMeals = async (req: Request, res: Response) => {
  try {
    const provider = await prisma.providerProfile.findUnique({
      where: { userId: req.user!.id },
      select: { id: true },
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const meals = await prisma.meal.findMany({
      where: {
        providerId: provider.id,
      },
      include: {
        category: true,
        provider: {
          select: {
            id: true,
            restaurantName: true,
            restaurantLogo: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      data: meals,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch provider meals",
      error: error.message,
    });
  }
};

// get meal details
const getMeal = async (req: Request, res: Response) => {
  try {
    const meal = await MealService.getMealById(req.params.id as string);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: meal,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch meal",
      error: error.message,
    });
  }
};

// update own meal
const updateMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.id;

    const result = await MealService.updateMeal(
      mealId as string,
      req.body,
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "Provider profile not found"
          : error.message === "MEAL_NOT_FOUND"
            ? "Meal not found"
            : error.message === "UNAUTHORIZED_UPDATE"
              ? "You are not authorized to update this meal"
              : error.message === "CATEGORY_NOT_FOUND"
                ? "Category not found"
                : "Failed to update meal",
      error: error.message,
    });
  }
};

// delete own meal
const deleteMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.id;
    const userId = req.user!.id;

    const result = await MealService.deleteMeal(mealId as string, userId);

    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message === "PROVIDER_PROFILE_NOT_FOUND"
          ? "Provider profile not found"
          : error.message === "MEAL_NOT_FOUND"
            ? "Meal not found"
            : error.message === "UNAUTHORIZED_DELETE"
              ? "You are not authorized to delete this meal"
              : "Meal deletion failed",
      error: error.message,
    });
  }
};

export const MealController = {
  createMeal,
  getMeals,
  getMyMeals,
  getMeal,
  updateMeal,
  deleteMeal,
};