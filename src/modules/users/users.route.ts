import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
import { upload } from "../../middleware/upload";

const router = Router();

router.get("/users/me", auth(), userController.getProfile)
router.patch("/users/me", auth(), upload.single("avatar"), userController.updateProfile)

export const userRouter: Router = router;