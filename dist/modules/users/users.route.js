import { Router } from "express";
import { userController } from "./users.controller";
import auth from "../../middleware/auth";
const router = Router();
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", auth(), userController.getProfile);
export const userRouter = router;
//# sourceMappingURL=users.route.js.map