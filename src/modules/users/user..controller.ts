import { Request, Response } from "express";
import { userService } from "./user.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
// import { UserStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../middleware/auth";
import { UserStatus } from "../../generated/enums";

const getAllUser = async (req: Request, res: Response) => {
    try {
        // 1. Extract and validate search string
        const { search, status } = req.query;
        const searchString = typeof search === "string" ? search : undefined;

        // 2. Validate and cast status to UserStatus enum
        // If status is not a valid UserStatus, we pass undefined
        const userStatus = Object.values(UserStatus).includes(status as UserStatus)
            ? (status as UserStatus)
            : undefined;

        // 3. Get pagination and sorting helpers
        const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(req.query);

        // 4. Call service (Now includes the required 'status' property)
        const result = await userService.getAlluser({
            search: searchString,
            status: userStatus, // This solves the missing property error
            page,
            limit,
            skip,
            sortBy,
            sortOrder
        });

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            ...result
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch users",
            details: e instanceof Error ? e.message : e
        });
    }
};


const updateUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await userService.updateUser(id as string, req.body, isAdmin);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result
        })
    } catch (e) {
        res.status(400).json({
            error: "User update failed",
            details: e
        })
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }

        console.log("User info from request:", user);

        if (UserRole.ADMIN !== user?.role) {
            throw new Error("You don't have permission to delete this class!")
        }


        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await userService.deleteuser(id as string, isAdmin);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: result
        })
    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "User delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
}

const getSingleStudentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("User ID is required")
        }

        const result = await userService.getSingleStudentById(id as string);
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Category fetched failed",
            details: e
        })
    }
};

const updateUserInDBbyId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        console.log("from update student profile", id)
        if (!id) {
            throw new Error("User ID is required")
        }
        console.log("userId", id)
        // সার্ভিস কল করে ডাটাবেজ আপডেট করা
        const result = await userService.updateUserInDBbyId(id as string, updateData);

        // সফল রেসপন্স পাঠানো
        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: result,
        });
    } catch (error: any) {
        // এরর রেসপন্স পাঠানো
        res.status(400).json({
            success: false,
            message: error.message || "An error occurred while updating profile",
        });
    }
}

const getAdminAnalytics = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAdminAnalyticsFromDB();

        res.status(200).json({
            success: true,
            message: "Analytics fetched successfully",
            data: result
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            message: "Failed to fetch analytics",
            details: e instanceof Error ? e.message : e
        });
    }
};



export const userController = {
    getAllUser,
    updateUser,
    deleteUser,
    getSingleStudentById,
    updateUserInDBbyId,
    getAdminAnalytics
};