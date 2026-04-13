import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/upload";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/users/me", auth(), userController.getProfile)
router.patch("/users/me", auth(), upload.single("avatar"), userController.updateProfile);
router.get("/users/me/dashboard-stats", auth(Role.CUSTOMER), userController.getDashboardStats);

export const userRouter: Router = router;