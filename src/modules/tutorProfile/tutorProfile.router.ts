import express, { NextFunction, Request, Response, Router } from 'express';
import { tutorProfileController } from './tutorProfile.controller';

const router = express.Router();

router.get(
    "/",
    tutorProfileController.getAllTutorProfile
);

router.get(
    "/:id",
    tutorProfileController.getSingleTutorProfileById
);


router.post(
    "/",
    tutorProfileController.createTutorProfile,
);


router.get(
    "/",
    tutorProfileController.getAllTutorUser
);


export const tutorProfileRouter: Router = router;