import { Request, Response } from "express";
import { tutorProfileService } from "./tutorProfile.sevice";
import { UserRole } from "../../middleware/auth";


const createTutorProfile = async (req: Request, res: Response) => {
    try {
        const result = await tutorProfileService.createTutorProfile(req.body);
        res.status(201).json({
            success: true,
            data: result
        });
        console.log("Tutor Profile created successfully",result);
    } catch (e) {
        res.status(400).json({
            error: "Tutor Profile creation failed",
            details: e
        })
    }
};

// const assignTutorCategory = async (req: Request, res: Response) => {
//     try {
//         // ১. বডি থেকে প্রয়োজনীয় ডাটা বের করে নিন
//         const { tutorId, categoryId, ...updateData } = req.body;
        
//         // ২. রিকোয়েস্ট ইউজার থেকে অ্যাডমিন স্ট্যাটাস নিন (আপনার Auth Middleware অনুযায়ী)
//         // সাধারণত req.user এ এই তথ্য থাকে
//         const isAdmin = req.user?.role === "ADMIN"; 

//         // ৩. সার্ভিসে আলাদা আলাদা প্যারামিটার হিসেবে ডাটা পাস করুন
//         const result = await tutorProfileService.assignTutorCategory(
//             tutorId, 
//             categoryId, 
//             updateData, 
//             isAdmin
//         );

//         return res.status(200).json({ // আপডেট বা অ্যাসাইনমেন্টের জন্য ২০০ ব্যবহার করা ভালো
//             success: true,
//             message: "Tutor Category assigned/updated successfully",
//             data: result
//         });
        
//     } catch (e: any) {
//         console.error("Assignment Error:", e);
//         return res.status(e.message === "You are unauthorized!" ? 403 : 400).json({
//             success: false,
//             error: "Assignment failed",
//             message: e instanceof Error ? e.message : "Internal Server Error"
//         });
//     }
// };

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
};

const getSingleTutorProfileById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error("Id is required!")
        }
        const result = await tutorProfileService.getSingleTutorProfileById(id);
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json({
            error: "Post creation failed",
            details: e
        })
    }
};


const getAllTutorUser = async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        // সার্চ না থাকলে undefined ই যাবে
        const searchString = typeof search === "string" ? search : undefined;
        
        const result = await tutorProfileService.getAllTutorUser({ search: searchString });
        
        // রেজাল্ট এম্পটি অ্যারে [] হলেও ২০০ সাকসেস আসবে
        return res.status(200).json({
            success: true,
            data: result
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            error: "Failed to fetch tutor profiles",
            message: e instanceof Error ? e.message : "Unknown error"
        });
    }
};

const updateTutorProfile = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized!")
        }

        const { id } = req.params;
        const isAdmin = user.role === UserRole.TUTOR
        const result = await tutorProfileService.updateTutorProfile(id as string, req.body, isAdmin);
        res.status(200).json({
            success:true,
            message: "Tutor profile updated successfully",
            data: result
        })
    } catch (e) {
        res.status(400).json({
            error: "Tutor profile update failed",
            details: e
        })
    }
};

const getSingleTutorUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const loggedInUser = req.user; // আপনার অ্যাথ মিডলওয়্যার থেকে আসা ডাটা

        // ১. চেক করুন ইউজার লগইন করা আছে কি না
        if (!loggedInUser) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        // এখন টাইপস্ক্রিপ্ট আর এরর দিবে না
        if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== id) {
            return res.status(403).json({
                error: "Forbidden",
                message: "You can only view your own profile."
            });
        }

        const result = await tutorProfileService.getSingleTutorUserById(id as string);
        res.status(200).json(result);
    } catch (e: any) {
        res.status(400).json({
            error: "Fetch failed",
            details: e.message
        });
    }
};


const updateTutorUserProfileInDBbyId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // যে আইডিটি আপডেট করতে চাওয়া হচ্ছে
        const updateData = req.body;
        const loggedInUser = req.user; // মিডলওয়্যার থেকে আসা লগইন করা ইউজার

        // ১. ইউজার অথেনটিকেটেড কিনা চেক করুন
        if (!loggedInUser) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: Please login first"
            });
        }

        if (!id) {
            throw new Error("User ID is required");
        }

        // ২. সিকিউরিটি চেক: যদি এডমিন না হয় এবং রিকোয়েস্ট করা আইডিটি নিজের না হয়
        if (loggedInUser.role !== 'ADMIN' && loggedInUser.id !== id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You can only update your own profile"
            });
        }

        // ৩. ডাটাবেজ আপডেট কল
        const result = await tutorProfileService.updateTutorUserProfileInDBbyId(id as string, updateData);

        res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: result,
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "An error occurred while updating profile",
        });
    }
}

export const tutorProfileController = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfileById,
    getAllTutorUser,
    updateTutorProfile,
    getSingleTutorUserById,
    updateTutorUserProfileInDBbyId
}