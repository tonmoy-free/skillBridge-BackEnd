import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { Booking } from "../../../generated/prisma/client";
import { error } from "node:console";

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body);
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