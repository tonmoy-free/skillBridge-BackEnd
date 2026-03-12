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



export const bookingService = {
    createBooking,
    getAllBooking,
    createBookingIntoDB
}