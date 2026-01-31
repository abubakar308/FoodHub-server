import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";

const userRouter = Router();

userRouter.post("/api/auth/register", userController.register);
userRouter.post("/api/auth/login", userController.login);
userRouter.get("/api/auth/me", auth(), userController.getProfile)

export default userRouter;