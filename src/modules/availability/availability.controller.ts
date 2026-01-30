import { Request, Response } from "express";
import { availabilityService } from "./availability.service";


const createAvailability = async (req: Request, res: Response) => {
    try {
        const result = await availabilityService.createAvailability(req.body);
        res.status(201).json(result);
        console.log("Availability created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Availability creation failed",
            details: e
        })
    }
}

export const availabilityController = {
    createAvailability,
}