import { Router } from "express";
import * as CategoryController from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";


const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  CategoryController.createCategory,
);
router.get("/", CategoryController.getCategories);

export const categoryRoutes: Router = router;