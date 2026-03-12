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

const getMyBookingsFromDB = async (req: Request, res: Response) => {
    try {
        // আপনার অথেনটিকেশন মিডলওয়্যার থেকে ইউজার এবং রোল নিতে হবে
        const userId = req.user?.id;
        const role = req.user?.role; // 'STUDENT' বা 'TUTOR'

        if (!userId || !role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login again.",
            });
        }

        const result = await bookingService.getMyBookingsFromDB(userId, role);

        return res.status(200).json({
            success: true,
            message: `Successfully retrieved bookings for ${role.toLowerCase()}`,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

const cancelBookingFromDB = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; 
        const userId = req.user?.id;
        const role = req.user?.role;
console.log("concel",id)
        // ১. ID চেক (টাইপস্ক্রিপ্ট এখন নিশ্চিত হবে যে id একটি string)
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid Booking ID",
            });
        }

        // ২. User এবং Role চেক 
        // এখানে চেক করার পর আমরা 'as string' ব্যবহার করে টাইপস্ক্রিপ্টকে নিশ্চিত করব
        if (!userId || !role) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Please login again.",
            });
        }

        // ৩. সার্ভিস কল (টাইপ কাস্টিং ব্যবহার করে এরর দূর করা হয়েছে)
        const result = await bookingService.cancelBookingFromDB(
            id, 
            userId as string, 
            role as string
        );

        return res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: result,
        });
    } catch (error: any) {
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to cancel booking",
        });
    }
};



export const BookingController = {
    createBooking,
    getAllBooking,
    createBookingIntoDB,
    getMyBookingsFromDB,
    cancelBookingFromDB
}