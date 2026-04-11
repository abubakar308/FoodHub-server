import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { MealController } from "./meal.controller";


const router = Router();

// PUBLIC
router.get("/meals", MealController.getMeals);
router.get("/meals/:id", MealController.getMeal);

router.post(
  "/meals",
  auth(Role.PROVIDER),
  MealController.createMeal,
);



router.put(
  "/meals/:id",
  auth(Role.PROVIDER),
  MealController.updateMeal,
);

router.delete(
  "/meals/:id",
  auth(Role.PROVIDER),
  MealController.deleteMeal,
);

export const MealRouter: Router = router;