import express, { NextFunction, Request, Response, Router } from 'express';
import { availabilityController } from './availability.controller';

const router = express.Router();


router.post(
    "/",
    availabilityController.createAvailability
);

router.get(
    "/:id",
    availabilityController.getAvailabilityById
);


export const availabilityRouter: Router = router;