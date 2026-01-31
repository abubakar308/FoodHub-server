import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { MealController } from "./meal.controller";


const router = Router();
router.post(
  "/provider/meals",
  auth(Role.PROVIDER),
  MealController.createMeal,
);

export const MealRouter: Router = router;