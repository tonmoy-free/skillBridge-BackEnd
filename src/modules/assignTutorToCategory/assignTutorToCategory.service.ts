import { TutorCategory } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createAssignTutorToCategory = async (data: Omit<TutorCategory, "id" |"createdAt" | "updatedAt">) => {
    const result = await prisma.tutorCategory.create({
        data
    })
    return result;
}

export const assignTutorToCategoryService = {
    createAssignTutorToCategory,
}