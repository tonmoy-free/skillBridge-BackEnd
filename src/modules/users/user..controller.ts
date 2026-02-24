import { Request, Response } from "express";
import { userService } from "./user.service";


const getAllUser = async (req: Request, res: Response) => {
    try {
        const {search} = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const result = await userService.getAlluser({search: searchString});
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({
            error: "Failed to fetch users",
            details: e
        })
    }
};

export const userController = {
    getAllUser,
}