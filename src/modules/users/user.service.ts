import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe


const getAlluser = async (payload: { search?: string | undefined }) => {
    const result = await prisma.user.findMany({
        where: {
            name: {
                contains: payload.search as string,
                mode: "insensitive"
            },
        },
    });
    return result;
};




export const userService = {
    getAlluser,
}