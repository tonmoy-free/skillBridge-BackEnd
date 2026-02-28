import { Request, Response } from "express";
import { subjectService } from "./subject.service";
import { UserRole } from "../../middleware/auth";


const createSubject = async (req: Request, res: Response) => {
    try {
        const result = await subjectService.createSubject(req.body);
        res.status(201).json(result);
        console.log("Subject created successfully", result);
    } catch (e) {
        res.status(400).json({
            error: "Subject creation failed",
            details: e
        })
    }
};

const getAllSubject = async (req: Request, res: Response) => {
    try {
        const result = await subjectService.getAllSubject();
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Subject fetched failed",
            details: e
        })
    }
};

const deleteSubject = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
        // console.log("User info from request:", user);

        if (UserRole.ADMIN !== user?.role) {
            throw new Error("You don't have permission to delete this class!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await subjectService.deleteSubject(id as string, isAdmin);
        res.status(200).json({
            success: true,
            message: "Subject deleted successfully",
            data: result
        })
    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Subject delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};

export const subjectController = {
    createSubject,
    getAllSubject,
    deleteSubject
}