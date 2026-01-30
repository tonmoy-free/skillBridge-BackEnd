import { Review} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createReview = async (data: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.review.create({
        data
    })
    return result;
}

export const reviewService = {
    createReview,
}