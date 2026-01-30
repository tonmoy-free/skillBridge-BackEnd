import express, { Router } from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

router.post(
    "/",
    BookingController.createBooking,
)


export const postRouter: Router = router;