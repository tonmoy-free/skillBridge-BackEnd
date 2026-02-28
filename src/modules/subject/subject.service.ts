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

export const subjectService = {
    createSubject,
    getAllSubject
}