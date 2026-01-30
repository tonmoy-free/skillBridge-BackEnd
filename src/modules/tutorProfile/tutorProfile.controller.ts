import { Request, Response } from "express";
import { tutorProfileService } from "./tutorProfile.sevice";


const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const result = await tutorProfileService.createTutorProfile(req.body);
        res.status(201).json(result);
        console.log("Tutor Profile created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Tutor Profile creation failed",
            details: e
        })
    }
}

export const tutorProfileController = {
    createTutorProfile,
}