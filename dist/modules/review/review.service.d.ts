export declare const ReviewService: {
    createReview: (userId: string, mealId: string, rating: number, comment?: string) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        mealId: string;
        rating: number;
        comment: string | null;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map