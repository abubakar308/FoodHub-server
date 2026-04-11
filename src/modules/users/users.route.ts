import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/users/me", auth(), userController.getProfile)
router.patch("/users/me", auth(), userController.updateProfile)

export const userRouter: Router =  router;