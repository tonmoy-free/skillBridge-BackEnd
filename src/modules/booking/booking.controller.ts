import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(400).json({
                error: "unauthorized",
            })
        }
        const result = await bookingService.createBooking(req.body, user.id as string);
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({
            error: "Booking creation failed",
            details: e
        })
    }
}

export const BookingController = {
    createBooking,
}