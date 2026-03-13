import { Review } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createReview = async (data: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.review.create({
        data
    })
    return result;
}

const createReviewIntoDB = async (payload: {
    rating: number;
    comment: string;
    tutorId: string;
    studentId: string;
    bookingId: string;
}) => {
    const { rating, comment, tutorId, studentId, bookingId } = payload;

    // ১. চেক করা যে এই বুকিংয়ের জন্য অলরেডি রিভিউ দেওয়া হয়েছে কি না
    const isAlreadyReviewed = await prisma.review.findUnique({
        where: { bookingId },
    });

    if (isAlreadyReviewed) {
        throw new Error("You have already submitted a review for this booking.");
    }

    // ২. ট্রানজেকশন ব্যবহার করা যাতে রিভিউ ক্রিয়েট এবং বুকিং আপডেট একসাথে হয়
    const result = await prisma.$transaction(async (tx) => {
        const newReview = await tx.review.create({
            data: {
                rating,
                comment,
                tutorId,
                studentId,
                bookingId,
            },
        });

        // বুকিং স্ট্যাটাস আপডেট করা (ঐচ্ছিক, যদি আপনি চান রিভিউ দেওয়ার পর স্ট্যাটাস বদলে যাবে)
        await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "COMPLETED", // অথবা আপনার প্রয়োজন অনুযায়ী
            },
        });

        return newReview;
    });

    return result;
};

export const reviewService = {
    createReview,
    createReviewIntoDB
}