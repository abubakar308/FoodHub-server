import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { MealController } from "./meal.controller";


const router = Router();

// PUBLIC
router.get("/", MealController.getMeals);
router.get("/:id", MealController.getMeal);

router.post(
  "/",
  auth(Role.PROVIDER),
  MealController.createMeal,
);



router.put(
  "/:id",
  auth(Role.PROVIDER),
  MealController.updateMeal,
);

router.delete(
  "/:id",
  auth(Role.PROVIDER),
  MealController.deleteMeal,
);

export const MealRouter: Router = router;