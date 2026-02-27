import { Router } from "express";
import auth from "../../middleware/auth";
import { ReviewController } from "./review.controller";
import { Role } from "../../../generated/prisma/enums";
const router = Router();
router.post("/review", auth(Role.CUSTOMER), ReviewController.createReview);
export const reviewRoutes = router;
//# sourceMappingURL=review.route.js.map