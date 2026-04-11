import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { mealId, rating, comment } = req.body;

    if (!mealId || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "mealId and rating are required",
      });
    }

    const review = await ReviewService.createReview(
      userId,
      mealId,
      Number(rating),
      comment
    );

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "INVALID_RATING"
          ? "Rating must be between 1 and 5"
          : error.message === "NOT_ELIGIBLE_TO_REVIEW"
            ? "You can only review meals you ordered"
            : error.message === "REVIEW_ALREADY_EXISTS"
              ? "You have already reviewed this meal"
              : error.message || "Failed to create review",
    });
  }
};

const updateReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    if (rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "rating is required",
      });
    }

    const review = await ReviewService.updateReview(
      userId,
      reviewId as string,
      Number(rating),
      comment
    );

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "REVIEW_NOT_FOUND"
          ? "Review not found"
          : error.message === "UNAUTHORIZED"
            ? "You are not allowed to update this review"
            : error.message === "INVALID_RATING"
              ? "Rating must be between 1 and 5"
              : error.message || "Failed to update review",
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const reviewId = req.params.id;

    await ReviewService.deleteReview(userId, reviewId as string);

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "REVIEW_NOT_FOUND"
          ? "Review not found"
          : error.message === "UNAUTHORIZED"
            ? "You are not allowed to delete this review"
            : error.message || "Failed to delete review",
    });
  }
};

const getMealReviews = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.mealId;

    const reviews = await ReviewService.getMyReviews(mealId as string);

    return res.status(200).json({
      success: true,
      message: "Meal reviews fetched successfully",
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch meal reviews",
    });
  }
};

const getMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const reviews = await ReviewService.getMyReviews(userId);

    return res.status(200).json({
      success: true,
      message: "My reviews fetched successfully",
      data: reviews,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch your reviews",
    });
  }
};


const getTestimonials = async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getTestimonials();

    return res.status(200).json({
      success: true,
      message: "Testimonials fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch testimonials",
    });
  }
};

export const ReviewController = {
  createReview,
  updateReview,
  deleteReview,
  getMealReviews,
  getMyReviews,
  getTestimonials
};