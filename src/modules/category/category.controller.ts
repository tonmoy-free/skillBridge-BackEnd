import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";
import { subjectService } from "../subject/subject.service";
import { UserRole } from "../../middleware/auth";


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

const deleteCategory = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }
        // console.log("User info from request:", user);

        if (UserRole.ADMIN !== user?.role) {
            throw new Error("You don't have permission to delete this category!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await categoryService.deleteCategory(id as string, isAdmin);
        res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            data: result
        })
    } catch (e) {
        const errorMessage = (e instanceof Error) ? e.message : "Category delete failed!"
        res.status(400).json({
            error: errorMessage,
            details: e
        })
    }
};

const updateCategory = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.ADMIN
        const result = await categoryService.updateCategory(id as string, req.body, isAdmin);
        res.status(200).json({
            success:true,
            message: "Category updated successfully",
            data: result
        })
    } catch (e) {
        res.status(400).json({
            error: "Category update failed",
            details: e
        })
    }
};

const getSingleCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Category ID is required")
        }

        const result = await categoryService.getSingleCategoryById(id as string);
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
    getAllCategory,
    deleteCategory,
    updateCategory,
    getSingleCategoryById,
}