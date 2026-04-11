import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment?: string
) => {
  // validate rating
  if (rating < 1 || rating > 5) {
    throw new Error("INVALID_RATING");
  }

  // check user ordered this meal
  const ordered = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: { customerId: userId },
    },
  });

  if (!ordered) {
    throw new Error("NOT_ELIGIBLE_TO_REVIEW");
  }

  // prevent duplicate review
  const existingReview = await prisma.review.findFirst({
    where: {
      userId,
      mealId,
    },
  });

  if (existingReview) {
    throw new Error("REVIEW_ALREADY_EXISTS");
  }

  // create review
  const review = await prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment: comment ?? null,
    },
  });

  // update meal rating
  await updateMealRating(mealId);

  return review;
};

const updateReview = async (
  userId: string,
  reviewId: string,
  rating: number,
  comment?: string
) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  if (review.userId !== userId) {
    throw new Error("UNAUTHORIZED");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("INVALID_RATING");
  }

  const updated = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating,
      comment: comment ?? null,
    },
  });

  await updateMealRating(review.mealId);

  return updated;
};

const deleteReview = async (userId: string, reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error("REVIEW_NOT_FOUND");
  }

  if (review.userId !== userId) {
    throw new Error("UNAUTHORIZED");
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });

  await updateMealRating(review.mealId);

  return null;
};


// 🔥 IMPORTANT: rating calculation
const updateMealRating = async (mealId: string) => {
  const reviews = await prisma.review.findMany({
    where: { mealId },
    select: { rating: true },
  });

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews;

  await prisma.meal.update({
    where: { id: mealId },
    data: {
      averageRating: Number(averageRating.toFixed(2)),
      totalReviews,
    },
  });
};


const getMealReviews = async (mealId: string) => {
  return prisma.review.findMany({
    where: {
      mealId,
      isVisible: true,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getMyReviews = async (userId: string) => {
  return prisma.review.findMany({
    where: {
      userId,
    },
    include: {
      meal: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
          slug: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getTestimonials = async () => {
  return prisma.review.findMany({
    where: {
      isVisible: true,
      rating: {
        gte: 4,
      },
      comment: {
        not: null,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      meal: {
        select: {
          id: true,
          title: true,
          imageUrl: true,
        },
      },
    },
    orderBy: [
      { rating: "desc" },
      { createdAt: "desc" },
    ],
    take: 6,
  });
};

export const ReviewService = {
  createReview,
  updateReview,
  deleteReview,
  getMealReviews,
  getMyReviews,
  getTestimonials
};