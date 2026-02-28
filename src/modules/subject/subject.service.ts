import { get } from "node:http";
import { Subject } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createSubject = async (data: Omit<Subject, "id" |"createdAt" | "updatedAt">) => {
    const result = await prisma.subject.create({
        data
    })
    return result;
};

const getAllSubject = async () => {
    return await prisma.subject.findMany();
};

const deleteSubject = async (id: string, isAdmin: boolean) => {
    const postData = await prisma.subject.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    })

    return await prisma.subject.delete({
        where: {
            id: id
        }
    })

};

const updateSubject = async (postId: string, data: Partial<Subject>, isAdmin: boolean) => {
    const postData = await prisma.subject.findUniqueOrThrow({
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

    const result = await prisma.subject.update({
        where: {
            id: postData.id
        },
        data
    })

    return result;
};

const getSingleSubjectById = async (id: string) => {
    return await prisma.subject.findUnique({
        where: {
            id: id
        }
    })
};

export const subjectService = {
    createSubject,
    getAllSubject,
    deleteSubject,
    updateSubject,
    getSingleSubjectById,
}