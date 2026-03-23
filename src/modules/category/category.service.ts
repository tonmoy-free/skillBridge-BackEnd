// import { Category } from "../../../generated/prisma/client";
import { Category } from "../../generated/client";
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
            tutorProfiles: true,
        }
    });
};

const deleteCategory = async (id: string, isAdmin: boolean) => {
    const postData = await prisma.category.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    })

    return await prisma.category.delete({
        where: {
            id: id
        }
    })

};

const updateCategory = async (postId: string, data: Partial<Category>, isAdmin: boolean) => {
    const postData = await prisma.category.findUniqueOrThrow({
        where: {
            id: postId
        },
        select: {
            id: true,
        }
    })

    if (!isAdmin) {
        throw new Error("You are unauthorized!")
    }

    const result = await prisma.category.update({
        where: {
            id: postData.id
        },
        data
    })

    return result;
};

const getSingleCategoryById = async (id: string) => {
    return await prisma.category.findUnique({
        where: {
            id: id
        },
        include: {
            tutorProfiles: true
        }
    })
};

export const categoryService = {
    createCategory,
    getAllCategories,
    deleteCategory,
    updateCategory,
    getSingleCategoryById,
}