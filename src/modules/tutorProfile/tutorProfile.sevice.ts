import { get } from "node:http";
import { TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createTutorProfile = async (data: Omit<TutorProfile, "id" | "rating" | "createdAt" | "updatedAt">) => {
    const result = await prisma.tutorProfile.create({
        data
    })
    return result;
};



// const getAllTutorProfile = async (payload: {
//     search?: string | undefined, // এখানে undefined যোগ করুন
//     categoryId?: string | undefined,
//     maxPrice?: number | undefined,
//     minRating?: number | undefined
// }) => {
//     const { search, categoryId, maxPrice, minRating } = payload;

//     const result = await prisma.tutorProfile.findMany({
//         where: {
//             AND: [
//                 // সার্চ ফিল্টার (নাম বা বায়ো)
//                 search ? {
//                     OR: [
//                         { bio: { contains: search, mode: "insensitive" } },
//                         { user: { name: { contains: search, mode: "insensitive" } } }
//                     ]
//                 } : {},
//                 // ক্যাটাগরি ফিল্টার
//                 categoryId ? {
//                     categories: { some: { id: categoryId } }
//                 } : {},
//                 // প্রাইস ফিল্টার
//                 maxPrice ? {
//                     hourlyFee: { lte: Number(maxPrice) }
//                 } : {},
//                 // রেটিং ফিল্টার
//                 minRating ? {
//                     rating: { gte: Number(minRating) }
//                 } : {},
//             ]
//         },
//         include: {
//             user: { select: { id: true, name: true, email: true, image: true } },
//             categories: true,
//             reviews: true
//         },
//         orderBy: { rating: 'desc' }
//     });
//     return result;
// };


const getAllTutorProfile = async (payload: {
    search?: string | undefined, // এখানে undefined যোগ করুন
    categoryId?: string | undefined,
    maxPrice?: number | undefined,
    minRating?: number | undefined
}) => {
    const { search, categoryId, maxPrice, minRating } = payload;

    // ১. একটি খালি অবজেক্ট দিয়ে শুরু করুন
    const where: any = {};

    // ২. ক্যাটাগরি ফিল্টার (এটিই আপনার মেইন সমস্যা সমাধান করবে)
    if (categoryId && categoryId !== 'undefined') {
        where.categories = {
            some: {
                id: categoryId
            }
        };
    }

    // ৩. সার্চ ফিল্টার
    if (search && search !== 'undefined') {
        where.OR = [
            { bio: { contains: search, mode: "insensitive" } },
            { user: { name: { contains: search, mode: "insensitive" } } }
        ];
    }

    // ৪. প্রাইস এবং রেটিং ফিল্টার (AND ব্যবহার করে)
    const andConditions = [];

    if (maxPrice && !isNaN(Number(maxPrice))) {
        andConditions.push({ hourlyFee: { lte: Number(maxPrice) } });
    }

    if (minRating && !isNaN(Number(minRating))) {
        andConditions.push({ rating: { gte: Number(minRating) } });
    }

    if (andConditions.length > 0) {
        where.AND = andConditions;
    }

    // ৫. ফাইনাল কোয়েরি
    const result = await prisma.tutorProfile.findMany({
        where: where, // এখানে তৈরি করা dynamic object-টি পাস করুন
        include: {
            user: { select: { id: true, name: true, email: true, image: true } },
            categories: true,
            reviews: true
        },
        orderBy: { rating: 'desc' }
    });

    return result;
};

const getSingleTutorProfileById = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { userId: id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            categories: true,
            availability: true,
            bookings: true,
            reviews: true
        },
    });

    return result;
};

const getAllTutorUser = async (payload: { search?: string | undefined }) => {
    const whereCondition: any = { role: "TUTOR" };

    if (payload.search) {
        whereCondition.name = {
            contains: payload.search,
            mode: "insensitive",
        };
    }

    const result = await prisma.user.findMany({
        where: whereCondition,
        include: { tutorProfile: true }
    });
    return result;
};

// const updateTutorProfile = async (userId: string, data: TutorProfile, isAdmin: boolean) => {
//     if (!isAdmin) {
//         throw new Error("You are unauthorized!");
//     }

//     const result = await prisma.tutorProfile.upsert({
//         where: {
//             userId: userId,
//         },
//         update: data, // If found, update with this data
//         create: {     // If not found, create with this data + userId
//             ...data,
//             userId: userId,
//         },
//     });

//     return result;
// };

const updateTutorProfile = async (userId: string, data: any, isAdmin: boolean) => {
    if (!isAdmin) {
        throw new Error("You are unauthorized!");
    }

    // Extract categoryIds from data and separate from the main profile fields
    const { categoryIds, ...profileData } = data;

    const result = await prisma.tutorProfile.upsert({
        where: {
            userId: userId,
        },
        update: {
            ...profileData,
            // Sync categories: This removes old ones and adds the new ones
            categories: {
                set: categoryIds?.map((id: string) => ({ id })) || [],
            },
        },
        create: {
            ...profileData,
            userId: userId,
            // Connect categories on creation
            categories: {
                connect: categoryIds?.map((id: string) => ({ id })) || [],
            },
        },
    });

    return result;
};



const getSingleTutorUserById = async (id: string) => {
    return await prisma.user.findUnique({
        where: {
            id: id
        }
    })
};


const updateTutorUserProfileInDBbyId = async (
    userId: string,
    updateData: { name?: string; image?: string; phone?: string }
) => {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { ...updateData },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                role: true,
                status: true,
            },
        });

        return updatedUser;
    } catch (error: any) {
        // Prisma error code for record not found
        if (error.code === "P2025") {
            throw new Error("User not found.");
        }
        throw new Error(error.message || "Failed to update user profile.");
    }
}


export const tutorProfileService = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfileById,
    getAllTutorUser,
    updateTutorProfile,
    getSingleTutorUserById,
    updateTutorUserProfileInDBbyId
}