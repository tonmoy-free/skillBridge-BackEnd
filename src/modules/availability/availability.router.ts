import express, { NextFunction, Request, Response, Router } from 'express';
import { availabilityController } from './availability.controller';
import auth, { UserRole } from '../../middleware/auth';

const router = express.Router();


router.post(
    "/",
    availabilityController.createAvailability
);

router.get(
    "/:id",
    availabilityController.getAvailabilityById
);

router.delete(
    "/:id",
    auth(UserRole.ADMIN, UserRole.TUTOR),
    availabilityController.deleteAvailabilityBYid
);


export const availabilityRouter: Router = router;