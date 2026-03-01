import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createCategory = async (data: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.category.create({
        data
    })
    return result;
};

const getAllCategories = async () => {
    return await prisma.category.findMany({
        include: {
            class: true,
            subject: true
        }
    });
};

export const categoryService = {
    createCategory,
    getAllCategories
}