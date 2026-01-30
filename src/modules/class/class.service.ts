import { Class } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createClass = async (data: Omit<Class, "id" |"createdAt" | "updatedAt">) => {
    const result = await prisma.class.create({
        data
    })
    return result;
}

export const classService = {
    createClass,
}