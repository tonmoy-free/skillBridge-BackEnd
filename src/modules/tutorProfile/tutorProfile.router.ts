import express, { NextFunction, Request, Response, Router } from 'express';
import { tutorProfileController } from './tutorProfile.controller';
import auth, { UserRole } from '../../middleware/auth';


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

router.patch(
    "/:id",
    auth(UserRole.TUTOR, UserRole.ADMIN),
    tutorProfileController.updateTutorProfile
);


export const tutorProfileRouter: Router = router;