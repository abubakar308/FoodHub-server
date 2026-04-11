import { Router } from "express";
import auth from "../../middleware/auth";
import { ReviewController } from "./review.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/reviews", auth(Role.CUSTOMER), ReviewController.createReview);


export const reviewRoutes: Router = router;