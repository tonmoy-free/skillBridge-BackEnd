import { Availability, TutorProfile } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createAvailability = async (data: Omit<Availability, "id" | "isActive" | "createdAt" | "updatedAt">) => {
    const result = await prisma.availability.create({
        data
    })
    return result;
}

export const availabilityService = {
    createAvailability,
} 