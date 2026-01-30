import express, { NextFunction, Request, Response, Router } from 'express';
import { availabilityController } from './availability.controller';

const router = express.Router();



router.post(
    "/",
    availabilityController.createAvailability
)


export const availabilityRouter: Router = router;