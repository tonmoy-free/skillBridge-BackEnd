import { Request, Response } from "express";
import { reviewService } from "./review.service";


const createReview = async (req: Request, res: Response) => {
  try {
    const result = await reviewService.createReview(req.body);
    res.status(201).json(result);
    console.log("Review created successfully", result);
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

const getTutorReviewsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const user = (req as any).user; 

    

    const tutorId = await reviewService.tutorId(id as string, user.id);

    const result = await reviewService.getTutorReviewsFromDB(tutorId as string);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Tutor reviews retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
}

export const reviewController = {
  createReview,
  createReviewIntoDB,
  getTutorReviewsById

}