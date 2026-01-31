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





export const MealService = {
  createMeal,
};
