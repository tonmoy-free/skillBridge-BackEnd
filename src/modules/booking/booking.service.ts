import { Booking } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


//Partial => typescript ke bole dewa kicu data thakbe kishu deta thakbe na

//Omit => "id" |"createdAt" | "updatedAt" => ei gula data thakbe na baki gula thakbe
const createBooking = async (data: Omit<Booking, "id" | "status" | "createdAt" | "updatedAt">) => {
    const result = await prisma.booking.create({
        data
    });
    return result;
}

export const bookingService = {
    createBooking,
}