import { Router } from "express";
import auth from "../../middleware/auth";
import { ReviewController } from "./review.controller";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/review", auth(Role.CUSTOMER), ReviewController.createReview);
router.get("/meal/:mealId", ReviewController.getMealReviews);
router.get("/my-reviews", auth(Role.CUSTOMER), ReviewController.getMyReviews);

router.get("/testimonials", ReviewController.getTestimonials);

router.patch("/:id", auth(Role.CUSTOMER), ReviewController.updateReview);
router.delete("/:id", auth(Role.CUSTOMER), ReviewController.deleteReview);


export const reviewRoutes: Router = router;