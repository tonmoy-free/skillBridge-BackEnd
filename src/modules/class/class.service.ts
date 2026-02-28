import { Class } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createClass = async (data: Omit<Class, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.class.create({
        data
    })
    return result;
};

const getAllClasses = async () => {
    return await prisma.class.findMany();
};

const getSingleClassById = async (id: string) => {
    return await prisma.class.findUnique({
        where: {
            id: id
        }
    })
};

const updateClass = async (postId: string, data: Partial<Class>, isAdmin: boolean) => {
    const postData = await prisma.class.findUniqueOrThrow({
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

    const result = await prisma.class.update({
        where: {
            id: postData.id
        },
        data
    })

    return result;
};

const deleteClass = async (id: string, isAdmin: boolean) => {
    const postData = await prisma.class.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    })

    return await prisma.class.delete({
        where: {
            id: id
        }
    })

};

export const classService = {
    createClass,
    getAllClasses,
    deleteClass,
    getSingleClassById,
    updateClass,
}