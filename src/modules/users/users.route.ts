import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/me", auth(), userController.getProfile)
router.patch("/me", auth(), userController.updateProfile)

export const userRouter: Router =  router;