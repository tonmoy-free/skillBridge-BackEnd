import { Booking, BookingStatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createBooking = async (data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt" | "studentId">, userId: string) => {
    const result = await prisma.booking.create({
        data: {
            ...data,
            studentId: userId
        }
    });
    return result;
};


const getAllBooking = async ({
    search,
    status,
    tutorId,
    studentId,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
}: {
    search: string | undefined,
    status: BookingStatus | undefined,
    tutorId: string | undefined,
    studentId: string | undefined,
    page: number,
    limit: number,
    skip: number,
    sortBy: string,
    sortOrder: string
}) => {
    const andConditions: any[] = []

    if (search) {
        andConditions.push({
            OR: [
                {
                    student: {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                },
                {
                    tutor: {
                        name: {
                            contains: search,
                            mode: "insensitive"
                        }
                    }
                }
            ]
        })
    }

    if (status) {
        andConditions.push({
            status
        })
    }

    if (tutorId) {
        andConditions.push({
            tutorId
        })
    }

    if (studentId) {
        andConditions.push({
            studentId
        })
    }

    const where = andConditions.length > 0 ? { AND: andConditions } : {}

    const allBookings = await prisma.booking.findMany({
        take: limit,
        skip,
        where,
        orderBy: {
            [sortBy]: sortOrder
        },
        include: {
            student: true,
            tutor: true,
            review: true
        }
    });

    const total = await prisma.booking.count({
        where
    })
    return {
        data: allBookings,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
}


const createBookingIntoDB = async (payload: {
    tutorId: string;
    studentId: string;
    date: string | Date;
    startTime: string;
    endTime: string;
    duration: number;
}) => {
    const { tutorId, date, startTime, studentId, endTime, duration } = payload;

    // ১. চেক করা ওই সময়ে টিউটর খালি আছে কিনা
    const existingBooking = await prisma.booking.findFirst({
        where: {
            tutorId: tutorId,
            date: new Date(date), // নিশ্চিত করুন এটা Date অবজেক্ট
            startTime: startTime,
            status: {
                not: BookingStatus.CANCELLED,
            },
        },
    });

    if (existingBooking) {
        throw new Error("This time slot is already booked for this tutor.");
    }

    // ২. বুকিং তৈরি করা (Connect পদ্ধতি ব্যবহার করে)
    const result = await prisma.booking.create({
        data: {
            date: new Date(date),
            startTime,
            endTime,
            duration: Number(duration), // নিশ্চিত করুন এটা Number
            status: BookingStatus.BOOKED,
            // রিলেশন হ্যান্ডেল করার সঠিক উপায়
            student: {
                connect: { id: studentId },
            },
            tutor: {
                connect: { id: tutorId },
            },
        },
        // চাইলে রিটার্ন ডাটাতে স্টুডেন্ট বা টিউটরের ডিটেইলস ইনক্লুড করতে পারেন
        include: {
            tutor: true,
            student: true,
        }
    });
    return result;
};

const getMyBookingsFromDB = async (userId: string, role: string) => {
    let whereCondition = {};

    if (role === "STUDENT") {
        // স্টুডেন্ট শুধু তার নিজের করা বুকিং দেখবে
        whereCondition = { studentId: userId };
    } else if (role === "TUTOR") {
        // টিউটর শুধু তার কাছে আসা বুকিংগুলো দেখবে
        // আপনার স্কিমা অনুযায়ী TutorProfile এর মাধ্যমে userId দিয়ে ফিল্টার করছি
        whereCondition = {
            tutor: {
                userId: userId
            }
        };
    }

    const result = await prisma.booking.findMany({
        where: whereCondition,
        include: {
            tutor: {
                include: { user: true }
            },
            student: true
        },
        orderBy: { date: 'asc' }
    });

    return result;
};


const cancelBookingFromDB = async (bookingId: string, userId: string, role: string) => {
    // ১. চেক করা যে বুকিংটি আসলেই এই ইউজারের কি না
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { tutor: true }
    });

    if (!booking) {
        throw new Error("Booking not found!");
    }

    // ২. সিকিউরিটি চেক: শুধু সংশ্লিষ্ট স্টুডেন্ট বা টিউটরই ক্যান্সেল করতে পারবে
    const isStudent = booking.studentId === userId;
    const isTutor = booking.tutor.userId === userId;

    if (!isStudent && !isTutor) {
        throw new Error("You are not authorized to cancel this booking!");
    }

    // ৩. স্ট্যাটাস আপডেট করা
    const result = await prisma.booking.update({
        where: { id: bookingId },
        data: {
            status: BookingStatus.CANCELLED,
        },
    });

    return result;
};

const updateBookingFromDB = async (bookingId: string, userId: string, role: string) => {
    // ১. চেক করা যে বুকিংটি আসলেই এই ইউজারের কি না
    const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: { tutor: true }
    });

    if (!booking) {
        throw new Error("Booking not found!");
    }

    // ২. সিকিউরিটি চেক: শুধু সংশ্লিষ্ট স্টুডেন্ট বা টিউটরই ক্যান্সেল করতে পারবে
    const isStudent = booking.studentId === userId;
    const isTutor = booking.tutor.userId === userId;

    if (!isStudent && !isTutor) {
        throw new Error("You are not authorized to cancel this booking!");
    }

    // ৩. স্ট্যাটাস আপডেট করা
    const result = await prisma.booking.update({
        where: { id: bookingId },
        data: {
            status: BookingStatus.COMPLETED,
        },
    });

    return result;
};

const autoUpdateBookingStatus = async () => {
    const currentTime = new Date();

    // ১. সেই বুকিংগুলো খুঁজে বের করা যেগুলোর তারিখ আজকের বা আগের 
    // এবং যেগুলোর স্ট্যাটাস এখনো 'BOOKED' আছে
    const result = await prisma.booking.updateMany({
        where: {
            status: BookingStatus.BOOKED,
            date: {
                lt: currentTime, // বর্তমান সময়ের চেয়ে কম (অতীতের তারিখ)
            },
        },
        data: {
            status: BookingStatus.COMPLETED,
        },
    });

    return result;
};


const isTutorOwner = async (tutorProfileId: string, loggedInUserId: string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            userId: tutorProfileId,
        },
        select: {
            id: true, // টিউটর প্রোফাইল টেবিল থেকে userId নিচ্ছি
        }
    });

    console.log("tutorProfileId",tutorProfileId)
    console.log("tutor.id",tutor?.id)
    console.log("loggedInUserId",loggedInUserId)
    // যদি টিউটর প্রোফাইল পাওয়া যায় এবং তার userId লগইন করা ইউজারের সাথে মিলে যায়
    return tutor?.id;
};

// সেশন নিয়ে আসার মেথড (আপনার আগের কোড)
const getTutorSessionsbyIdFromDB = async (id: string) => {
    return await prisma.booking.findMany({
        where: {
            tutorId: id, // এখানে টিউটর প্রোফাইল আইডি ব্যবহার হচ্ছে
        },
        include: {
            student: {
                select: {
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
        orderBy: {
            date: "desc",
        },
    });
};


export const bookingService = {
    createBooking,
    getAllBooking,
    createBookingIntoDB,
    getMyBookingsFromDB,
    cancelBookingFromDB,
    autoUpdateBookingStatus,
    getTutorSessionsbyIdFromDB,
    isTutorOwner,
    updateBookingFromDB
     
}