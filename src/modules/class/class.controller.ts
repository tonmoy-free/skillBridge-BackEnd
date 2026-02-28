import { Request, Response } from "express";
import { classService } from "./class.service";
import { UserRole } from "../../middleware/auth";


const createClass = async (req: Request, res: Response) => {
    try {
        const result = await classService.createClass(req.body);
        res.status(201).json(result);
        console.log("Class created successfully", result);
    } catch (e) {
        res.status(400).json({
            error: "Class creation failed",
            details: e
        })
    }
};

const getAllClasses = async (req: Request, res: Response) => {
    try {
        const result = await classService.getAllClasses()
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Class fetched failed",
            details: e
        })
    }
};
const getSingleClassById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Class ID is required")
        }

        const result = await classService.getSingleClassById(id as string);
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Class fetched failed",
            details: e
        })
    }
};

const updateClass = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await classService.updateClass(id as string, req.body, isAdmin);
        res.status(200).json({
            success:true,
            message: "Class updated successfully",
            data: result
        })
    } catch (e) {
        res.status(400).json({
            error: "Class update failed",
            details: e
        })
    }
};


const deleteClass = async (req: Request, res: Response) => {
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
        const result = await classService.deleteClass(id as string, isAdmin);
        res.status(200).json({
            success: true,
            message: "Class deleted successfully",
            data: result
        })
    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Class delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};

export const classController = {
    createClass,
    getAllClasses,
    deleteClass,
    getSingleClassById,
    updateClass,
}