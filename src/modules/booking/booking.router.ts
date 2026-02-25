import express, { NextFunction, Request, Response, Router } from 'express';
import { BookingController } from './booking.controller';
import auth, { UserRole } from '../../middleware/auth';


const router = express.Router();

router.get(
    "/",
     auth(UserRole.ADMIN, UserRole.STUDENT, UserRole.TUTOR),
    BookingController.getAllBooking,
)

router.post(
    "/",
    auth(UserRole.ADMIN, UserRole.STUDENT),
    BookingController.createBooking,
)


export const bookingRouter: Router = router;