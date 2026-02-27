import { ReviewService } from "./review.service";
const createReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { mealId, rating, comment } = req.body;
        const review = await ReviewService.createReview(userId, mealId, rating, comment);
        res.status(201).json({
            success: true,
            data: review,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};
export const ReviewController = {
    createReview
};
//# sourceMappingURL=review.controller.js.map