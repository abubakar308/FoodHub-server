import { prisma } from "../../lib/prisma";
const createMeal = async (data) => {
    return prisma.meal.create({ data });
};
const getMeals = async (categoryId) => {
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
const getMealById = async (id) => {
    return prisma.meal.findUnique({
        where: { id },
        include: {
            category: true,
            provider: true,
            reviews: true,
        },
    });
};
const updateMeal = async (mealId, data, userId) => {
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
const deleteMeal = async (mealId, userId) => {
    const mealData = await prisma.meal.findUniqueOrThrow({
        where: {
            id: mealId
        },
        select: {
            id: true,
            providerId: true
        }
    });
    if (!mealData)
        throw new Error("Meal not found");
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
//# sourceMappingURL=meal.service.js.map