import express, { NextFunction, Request, Response, Router } from 'express';
import { BookingController } from './booking.controller';

const router = express.Router();

// const auth = () => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         // Example auth logic - in a real app, this would check if the user is authenticated
//         // if (!req.user) {
//         //     return res.status(401).json({ error: "Unauthorized" });
//         // }
//         // next();
//         console.log("Auth middleware called");
//         next();
//     }
// };

router.post(
    "/",
    // auth(),
    BookingController.createBooking,
)


export const bookingRouter: Router = router;