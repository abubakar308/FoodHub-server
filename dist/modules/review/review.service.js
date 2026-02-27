import { prisma } from "../../lib/prisma";
const createReview = async (userId, mealId, rating, comment) => {
    // check user ordered this meal
    const ordered = await prisma.orderItem.findFirst({
        where: {
            mealId,
            order: { customerId: userId },
        },
    });
    if (!ordered) {
        throw new Error("You can only review meals you ordered");
    }
    return prisma.review.create({
        data: {
            userId,
            mealId,
            rating,
            comment: comment ?? null,
        },
    });
};
export const ReviewService = {
    createReview
};
//# sourceMappingURL=review.service.js.map