import { Request, Response } from "express";
import { availabilityService } from "./availability.service";
import { UserRole } from "../../middleware/auth";


const createAvailability = async (req: Request, res: Response) => {
    try {
        const result = await availabilityService.createAvailability(req.body);
        res.status(201).json(result);
        console.log("Availability created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Availability creation failed",
            details: e
        })
    }
};


const getAvailabilityById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Id is required!")
        }
        const result = await availabilityService.getAvailabilityById(id);
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Post creation failed",
            details: e
        })
    }
};

const deleteAvailabilityBYid = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
        // console.log("User info from request:", user);

        if (UserRole.TUTOR !== user?.role) {
            throw new Error("You don't have permission to delete this class!")
        }

        const { id } = req.params;
        const isTutor = user.role === UserRole.TUTOR
        const result = await availabilityService.deleteAvailabilityBYid(id as string, isTutor);
        res.status(200).json({
            success: true,
            message: "Availiability deleted successfully",
            data: result
        })
    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Availiability delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};

export const availabilityController = {
    createAvailability,
    getAvailabilityById,
    deleteAvailabilityBYid
}