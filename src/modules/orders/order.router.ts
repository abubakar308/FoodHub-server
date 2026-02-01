import { Router } from "express";
import auth from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { OrderController } from "./order.controller";


const router = Router();

router.post("/", auth(Role.CUSTOMER), OrderController.createOrder);

export const orderRoutes: Router = router;