// import { Review } from "../../../generated/prisma/client";
import { Review } from "../../generated/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createReview = async (data: Omit<Review, "id" | "createdAt" | "updatedAt">) => {
    const result = await prisma.review.create({
        data
    })
    return result;
}

// const createReviewIntoDB = async (payload: {
//     rating: number;
//     comment: string;
//     tutorId: string;
//     studentId: string;
//     bookingId: string;
// }) => {
//     const { rating, comment, tutorId, studentId, bookingId } = payload;

//     // ১. চেক করা যে এই বুকিংয়ের জন্য অলরেডি রিভিউ দেওয়া হয়েছে কি না
//     const isAlreadyReviewed = await prisma.review.findUnique({
//         where: { bookingId },
//     });

//     if (isAlreadyReviewed) {
//         throw new Error("You have already submitted a review for this booking.");
//     }

//     // ২. ট্রানজেকশন ব্যবহার করা যাতে রিভিউ ক্রিয়েট এবং বুকিং আপডেট একসাথে হয়
//     const result = await prisma.$transaction(async (tx) => {
//         const newReview = await tx.review.create({
//             data: {
//                 rating,
//                 comment,
//                 tutorId,
//                 studentId,
//                 bookingId,
//             },
//         });

//         // বুকিং স্ট্যাটাস আপডেট করা (ঐচ্ছিক, যদি আপনি চান রিভিউ দেওয়ার পর স্ট্যাটাস বদলে যাবে)
//         await tx.booking.update({
//             where: { id: bookingId },
//             data: {
//                 status: "COMPLETED", // অথবা আপনার প্রয়োজন অনুযায়ী
//             },
//         });

//         return newReview;
//     });

//     return result;
// };

const createReviewIntoDB = async (payload: {
    rating: number;
    comment: string;
    tutorId: string;
    studentId: string;
    bookingId: string;
}) => {
    const { rating, comment, tutorId, studentId, bookingId } = payload;

    // ১. চেক করা যে এই বুকিংয়ের জন্য অলরেডি রিভিউ দেওয়া হয়েছে কি না
    const isAlreadyReviewed = await prisma.review.findUnique({
        where: { bookingId },
    });

    if (isAlreadyReviewed) {
        throw new Error("You have already submitted a review for this booking.");
    }

    // ২. ট্রানজেকশন ব্যবহার করা যাতে রিভিউ ক্রিয়েট, বুকিং আপডেট এবং টিউটর রেটিং আপডেট একসাথে হয়
    const result = await prisma.$transaction(async (tx) => {
        // নতুন রিভিউ তৈরি করা
        const newReview = await tx.review.create({
            data: {
                rating,
                comment,
                tutorId,
                studentId,
                bookingId,
            },
        });

        // ৩. ওই টিউটরের সব রিভিউর গড় (Average) বের করা
        const stats = await tx.review.aggregate({
            where: {
                tutorId: tutorId
            },
            _avg: {
                rating: true
            }
        });

        const averageRating = stats._avg.rating || 0;

        // ৪. TutorProfile-এ নতুন এভারেজ রেটিং আপডেট করা
        await tx.tutorProfile.update({
            where: {
                id: tutorId
            },
            data: {
                rating: parseFloat(averageRating.toFixed(1)) // ১ দশমিক ঘর পর্যন্ত রাখা (যেমন: 4.5)
            }
        });

        // ৫. বুকিং স্ট্যাটাস আপডেট করা
        await tx.booking.update({
            where: { id: bookingId },
            data: {
                status: "COMPLETED",
            },
        });

        return newReview;
    });

    return result;
};

const tutorId = async (tutorProfileId: string, loggedInUserId: string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            userId: tutorProfileId,
        },
        select: {
            id: true, // টিউটর প্রোফাইল টেবিল থেকে userId নিচ্ছি
        }
    });

    // console.log("tutorProfileId",tutorProfileId)
    // console.log("tutor.id",tutor?.id)
    // console.log("loggedInUserId",loggedInUserId)
    // যদি টিউটর প্রোফাইল পাওয়া যায় এবং তার userId লগইন করা ইউজারের সাথে মিলে যায়
    return tutor?.id;
};

const getTutorReviewsFromDB = async (tutorProfileId: string) => {
    // ১. ডাটাবেস থেকে সকল রিভিউ ফেচ করা
    const reviews = await prisma.review.findMany({
        where: {
            tutorId: tutorProfileId
        },
        include: {
            student: {
                select: {
                    name: true,
                    image: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // ২. এভারেজ রেটিং ক্যালকুলেট করা
    const totalReviews = reviews.length;

    // যদি কোনো রিভিউ না থাকে তবে ডিফল্ট ০ রিটার্ন করবে
    const averageRating = totalReviews > 0
        ? reviews.reduce((sum, rev) => sum + rev.rating, 0) / totalReviews
        : 0;

    // ৩. আপনার দেওয়া ফরম্যাটে ডাটা রিটার্ন করা
    return {
        rating: Number(averageRating.toFixed(1)), // দশমিকের পর ১ ঘর পর্যন্ত রাখা
        reviews: reviews.map(rev => ({
            id: rev.id,
            rating: rev.rating,
            comment: rev.comment,
            createdAt: rev.createdAt,
            student: {
                name: rev.student.name,
                image: rev.student.image
            }
        }))
    };
}

export const reviewService = {
    createReview,
    createReviewIntoDB,
    getTutorReviewsFromDB,
    tutorId
}