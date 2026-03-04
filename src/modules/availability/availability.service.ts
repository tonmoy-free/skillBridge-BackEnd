import { Availability, TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createAvailability = async (data: Omit<Availability, "id" | "isActive" | "createdAt" | "updatedAt">) => {
    const result = await prisma.availability.create({
        data
    })
    return result;
};

const getAvailabilityById = async (id: string) => {
    const result = await prisma.availability.findMany({
        where: { tutorId: id },
        include: {
            tutor: {
                select: {
                    id: true,
                    userId: true,
                    bio: true,
                    hourlyFee: true,
                    monthlyFee: true,
                    experience: true,
                    rating: true,
                },
            },
        },
    });

    return result;
};


const deleteAvailabilityBYid = async (id: string, isTutor: boolean) => {
    const postData = await prisma.availability.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    })

    return await prisma.availability.delete({
        where: {
            id: id
        }
    })

};



export const availabilityService = {
    createAvailability,
    getAvailabilityById,
    deleteAvailabilityBYid
} 