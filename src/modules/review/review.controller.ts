import { Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
    try {
        const result = await reviewService.createReview(req.body);
        res.status(201).json(result);
        console.log("Review created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Review creation failed",
            details: e
        })
    }
};

const createReviewIntoDB = async (req: Request, res: Response) => {
  try {
    const reviewData = req.body;
    const userId = req.user?.id;

    // সিকিউরিটি চেক: যে রিভিউ দিচ্ছে সে আসলেই এই স্টুডেন্ট কি না
    if (!userId || userId !== reviewData.studentId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! You can only review your own bookings.",
      });
    }

    const result = await reviewService.createReviewIntoDB(reviewData);

    return res.status(201).json({
      success: true,
      message: "Review submitted successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to submit review",
    });
  }
};

export const reviewController = {
    createReview,
    createReviewIntoDB
}