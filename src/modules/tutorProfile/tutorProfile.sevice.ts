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
                },
            },
        },
    });
    return result;
};


const getSingleTutorProfileById = async (id: string) => {
    const result = await prisma.tutorProfile.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });

    return result;
};

export const tutorProfileService = {
    createTutorProfile,
    getAllTutorProfile,
    getSingleTutorProfileById,
}