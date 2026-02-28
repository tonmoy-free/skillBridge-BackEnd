import { Request, Response } from "express";
import { subjectService } from "./subject.service";


const createSubject = async (req: Request, res: Response) => {
    try {
        const result = await subjectService.createSubject(req.body);
        res.status(201).json(result);
        console.log("Subject created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Subject creation failed",
            details: e
        })
    }
};

const getAllSubject= async (req: Request, res: Response) => {
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

export const subjectController = {
    createSubject,
    getAllSubject
}