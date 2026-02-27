import { Request, Response } from "express";
export declare const MealController: {
    createMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMeals: (req: Request, res: Response) => Promise<void>;
    getMeal: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateMeal: (req: Request, res: Response) => Promise<void>;
    deleteMeal: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=meal.controller.d.ts.map