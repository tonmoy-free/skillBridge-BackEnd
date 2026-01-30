import { Request, Response } from "express";
import { assignTutorToCategoryService } from "./assignTutorToCategory.service";


const createAssignTutorToCategory = async (req: Request, res: Response) => {
    try {
        const result = await assignTutorToCategoryService.createAssignTutorToCategory(req.body);
        res.status(201).json(result);
        console.log("Assign Tutor To Category created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Assign Tutor To Category creation failed",
            details: e
        })
    }
}

export const assignTutorToCategoryController = {
    createAssignTutorToCategory,
}