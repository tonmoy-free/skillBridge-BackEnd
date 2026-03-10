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



const getAllTutorProfile = async (payload: { search?: string | undefined }) => {
    const result = await prisma.tutorProfile.findMany({
        where: {
            bio: {
                contains: payload.search as string,
                mode: "insensitive"
            },
        },
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

const updateTutorProfile = async (userId: string, data: TutorProfile, isAdmin: boolean) => {
    if (!isAdmin) {
        throw new Error("You are unauthorized!");
    }

    const result = await prisma.tutorProfile.upsert({
        where: {
            userId: userId,
        },
        update: data, // If found, update with this data
        create: {     // If not found, create with this data + userId
            ...data,
            userId: userId,
        },
    });

    return result;
};


export const tutorProfileService = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfileById,
    getAllTutorUser,
    updateTutorProfile
}