import { Router } from "express";
import { authController } from "./auth.controller";
import { validateRequest } from "../../middleware/validate";
import { loginSchema, registerSchema } from "./auth.validation";

const router = Router();

router.post("/register", validateRequest(registerSchema), authController.register);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post("/google-login", authController.googleLogin);

export const authRouter = router;