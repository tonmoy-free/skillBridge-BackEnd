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

router.get(
    "/user/:id",
    auth(UserRole.ADMIN,UserRole.TUTOR),
    tutorProfileController.getSingleTutorUserById
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

router.patch(
    "/user/:id",
    auth(UserRole.TUTOR, UserRole.ADMIN),
    tutorProfileController.updateTutorUserProfileInDBbyId
);


export const tutorProfileRouter: Router = router;