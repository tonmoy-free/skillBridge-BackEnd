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
}

export const subjectController = {
    createSubject,
}