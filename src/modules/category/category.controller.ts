import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";


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
}

export const categoryController = {
    createCategory,
}