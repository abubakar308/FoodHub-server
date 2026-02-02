import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { OrderController } from "./order.controller";


const router = Router();

router.post("/orders", auth(Role.CUSTOMER), OrderController.createOrder);
router.get("/orders", auth(Role.CUSTOMER), OrderController.getMyOrders);
router.get("/order/:id", auth(Role.CUSTOMER), OrderController.getOrderById);


export const orderRoutes: Router = router;