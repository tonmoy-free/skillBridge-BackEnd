import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";
import { subjectService } from "../subject/subject.service";


const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await categoryService.createCategory(req.body);
        res.status(201).json(result);
        console.log("Category created successfully", result);
    } catch (e) {
        // res.status(400).json({
        //     error: "Category creation failed1",
        //     details: e
        // })
        next(e);
    }
};

const getAllCategory = async (req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategories();
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Category fetched failed",
            details: e
        })
    }
};

export const categoryController = {
    createCategory,
    getAllCategory
}