import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { OrderController } from "./order.controller";


const router = Router();

router.post("/addtocart", auth(Role.CUSTOMER), OrderController.addToCart);
router.get("/mycart", auth(Role.CUSTOMER), OrderController.getMyCart);
router.patch("/cart/:id", auth(Role.CUSTOMER), OrderController.updateQuantity)

router.post("/orders", auth(Role.CUSTOMER), OrderController.createOrder);
router.get("/orders", auth(Role.CUSTOMER), OrderController.getMyOrders);
router.get("/orders/:id", auth(Role.CUSTOMER), OrderController.getOrderById);


export const orderRoutes: Router = router;