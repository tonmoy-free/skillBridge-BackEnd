import express, { NextFunction, Request, Response, Router } from 'express';
import { tutorProfileController } from './tutorProfile.controller';

const router = express.Router();



router.post(
    "/",
    tutorProfileController.createTutorProfile,
)


export const tutorProfileRouter: Router = router;