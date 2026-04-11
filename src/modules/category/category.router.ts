import { Router } from "express";
import * as CategoryController from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post(
  "/categories",
  auth(Role.ADMIN),
  CategoryController.createCategory,
);
router.get("/categories", CategoryController.getCategories);

export const categoryRoutes: Router = router;