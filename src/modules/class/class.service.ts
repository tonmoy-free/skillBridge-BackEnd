import { Class } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createClass = async (data: Omit<Class, "id" |"createdAt" | "updatedAt">) => {
    const result = await prisma.class.create({
        data
    })
    return result;
};

const getAllClasses = async () => {
    return await prisma.class.findMany();
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

}

export const classService = {
    createClass,
    getAllClasses,
    deleteClass,
}