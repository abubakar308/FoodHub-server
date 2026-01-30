import { Router } from "express";
import { userController } from "./users.controller";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;