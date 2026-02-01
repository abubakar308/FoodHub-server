import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMeal = async (data: {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  providerId: string;
}) => {
  return prisma.meal.create({ data });
};


const getMeals = async (categoryId?: string) => {
  return prisma.meal.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      provider: {
        select: { restaurantName: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: true,
      reviews: true,
    },
  });
};

const updateMeal = async (mealId: string, data: Partial<Meal>, userId: string) => {

   
  const mealsData = await prisma.meal.findUniqueOrThrow({
    where: {
      id: mealId,
    },
    select: {
      id: true,
    },
  });

  const result = await prisma.meal.update({
    where: {
      id: mealsData.id,
    },
    data: {
      ...data,
    },
  });
  return result;
};


const deleteMeal = async (mealId: string, userId: string) => {

  const mealData = await prisma.meal.findUniqueOrThrow({
        where: {
            id: mealId
        },
        select: {
            id: true,
            providerId: true
        }
    })

    if (!mealData) throw new Error("Meal not found");


      const provider = await prisma.providerProfile.findUnique({
    where: { userId }
  });

    if (mealData.providerId !== provider?.id) {
    throw new Error("Unauthorized delete");
  }

  return prisma.meal.delete({
    where: { id: mealId },
  });
};

export const MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal
};
