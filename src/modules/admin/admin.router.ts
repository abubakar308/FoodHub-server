import { Router } from "express";
import { AdminController } from "./admin.controller";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("/admin/users", auth(Role.ADMIN), AdminController.getAllUsers);
router.patch("/admin/users/:id/status", auth("ADMIN"), AdminController.updateUserStatus);

router.get("/admin/providers", auth(Role.ADMIN), AdminController.getAllProviders);
router.patch("/admin/providers/:id/approve", auth(Role.ADMIN), AdminController.approveProvider);

router.get("/admin/meals", auth(Role.ADMIN), AdminController.getAllMeals);
router.delete("/admin/meals/:id", auth(Role.ADMIN), AdminController.deleteMeal);

router.get("/admin/orders", auth(Role.ADMIN), AdminController.getAllOrders);

router.get("/admin/dashboard-stats", auth(Role.ADMIN), AdminController.getDashboardStats);


export const adminRouter: Router = router;