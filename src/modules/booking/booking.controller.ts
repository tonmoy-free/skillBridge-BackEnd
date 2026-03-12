import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { BookingStatus } from "../../../generated/prisma/enums";


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
};

const getAllBooking = async (req: Request, res: Response) => {
    try {
        const search = typeof req.query.search === 'string' ? req.query.search : undefined
        const status = req.query.status as BookingStatus | undefined
        const tutorId = req.query.tutorId as string | undefined
        const studentId = req.query.studentId as string | undefined

        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query)

        const result = await bookingService.getAllBooking({
            search,
            status,
            tutorId,
            studentId,
            page,
            limit,
            skip,
            sortBy,
            sortOrder
        })
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Booking retrieval failed",
            details: e
        })
    }
};

const createBookingIntoDB = async (req: Request, res: Response) => {
    try {
        const bookingData = req.body;

        // সার্ভিসকে কল করা
        const result = await bookingService.createBookingIntoDB(bookingData);

        // সফল রেসপন্স
        return res.status(201).json({
            success: true,
            message: "Booking created successfully!",
            data: result,
        });

    } catch (error: any) {
        // সার্ভিস থেকে আসা এরর বা অন্য যেকোনো এরর হ্যান্ডেল করা
        const statusCode = error.message.includes("already booked") ? 400 : 500;

        return res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};



export const BookingController = {
    createBooking,
    getAllBooking,
    createBookingIntoDB
}