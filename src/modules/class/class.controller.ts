import { Request, Response } from "express";
import { classService } from "./class.service";


const createClass = async (req: Request, res: Response) => {
    try {
        const result = await classService.createClass(req.body);
        res.status(201).json(result);
        console.log("Class created successfully",result);
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
}

export const classController = {
    createClass,
    getAllClasses,
}