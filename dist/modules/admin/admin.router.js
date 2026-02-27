import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.get("/users", auth(Role.ADMIN), AdminController.getAllUsers);
router.patch("/user/:id", auth(Role.ADMIN), AdminController.updateUserStatus);
router.get("/orders", auth(Role.ADMIN), AdminController.getAllOrders);
export const adminRouter = router;
//# sourceMappingURL=admin.router.js.map