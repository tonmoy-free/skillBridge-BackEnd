import { Request, Response } from "express";
import { userService } from "./user.service";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { UserStatus } from "../../../generated/prisma/enums";
import { UserRole } from "../../middleware/auth";
import { classService } from "../class/class.service";

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
            success:true,
            message: "User updated successfully",
            data: result
        })
    } catch (e) {
        res.status(400).json({
            error: "User update failed",
            details: e
        })
    }
}

export const userController = {
    getAllUser,
    updateUser,
};