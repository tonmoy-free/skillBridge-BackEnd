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
}

export const reviewController = {
    createReview,
}