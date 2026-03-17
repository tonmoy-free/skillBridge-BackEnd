import express, { NextFunction, Request, Response, Router } from 'express';
import { reviewController } from './review.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();


router.get(
    "/:id",
    auth(UserRole.ADMIN,UserRole.TUTOR),
    reviewController.getTutorReviewsById,
)
router.post(
    "/",
    auth(UserRole.STUDENT),
    reviewController.createReviewIntoDB,
)


export const reviewRouter: Router = router;