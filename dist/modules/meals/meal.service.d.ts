import { Meal } from "../../../generated/prisma/client";
export declare const MealService: {
    createMeal: (data: {
        title: string;
        description: string;
        price: number;
        imageUrl: string;
        categoryId: string;
        providerId: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        title: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
        categoryId: string;
    }>;
    getMeals: (categoryId?: string) => Promise<({
        provider: {
            restaurantName: string;
        };
        category: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        title: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
        categoryId: string;
    })[]>;
    getMealById: (id: string) => Promise<({
        reviews: {
            id: string;
            createdAt: Date;
            userId: string;
            mealId: string;
            rating: number;
            comment: string | null;
        }[];
        provider: {
            id: string;
            restaurantName: string;
            address: string;
            phone: string;
            userId: string;
        };
        category: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        title: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
        categoryId: string;
    }) | null>;
    updateMeal: (mealId: string, data: Partial<Meal>, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        title: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
        categoryId: string;
    }>;
    deleteMeal: (mealId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        providerId: string;
        title: string;
        description: string | null;
        price: number;
        imageUrl: string | null;
        isAvailable: boolean;
        categoryId: string;
    }>;
};
//# sourceMappingURL=meal.service.d.ts.map