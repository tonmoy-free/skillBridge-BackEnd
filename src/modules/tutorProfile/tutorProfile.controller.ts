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
};

const getAllTutorProfile = async (req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const result = await tutorProfileService.getAllTutorProfile({search: searchString});
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({
            error: "Failed to fetch tutor profiles",
            details: e
        })
    }
}

export const tutorProfileController = {
    createTutorProfile,
    getAllTutorProfile,
}