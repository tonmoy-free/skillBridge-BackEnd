import express, { Application } from "express";
import { bookingRouter } from "./modules/booking/booking.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorProfileRouter } from "./modules/tutorProfile/tutorProfile.router";
import { categoryRouter } from "./modules/category/category.router";
import { availabilityRouter } from "./modules/availability/availability.router";
import { reviewRouter } from "./modules/review/review.router";
import errorHandler from "./middleware/globalErrorHandler";
import { userRouter } from "./modules/users/user.router";
import { UserRole } from "./middleware/auth";
import cookieParser from "cookie-parser";
import path from "path";
import qs from "qs";
// import cron from "node-cron";
import { bookingService } from "./modules/booking/booking.service";



const app: Application = express();
app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.APP_URL || "https://skill-bridge-frontend-pearl.vercel.app",
    // origin: "http://localhost:3000",
    // methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    // allowedHeaders: [["Content-Type", "Authorization", "Cookie"],
}))

// Better-auth handler-এর আগে express.json() থাকা নিরাপদ
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/dashboard/booking", bookingRouter);

app.use("/dashboard/user",

    userRouter);

app.use("/api/v1/tutors/tutors-profile", tutorProfileRouter);



app.use("/api/v1/tutors/category", categoryRouter);

app.use("/api/v1/category", categoryRouter);



app.use("/api/v1/tutor/availability", availabilityRouter);

app.use("/api/v1/tutors/review", reviewRouter);

app.use(errorHandler)


app.get("/", (req, res) => {
    res.send("Hello world!");
})

// প্রতি ১ ঘন্টা পরপর এই টাস্কটি চলবে (0 * * * *)
// cron.schedule("0 * * * *", async () => {
//     console.log("Checking for completed bookings...");
//     try {
//         const result = await bookingService.autoUpdateBookingStatus();
//         console.log(`${result.count} bookings marked as COMPLETED.`);
//     } catch (error) {
//         console.error("Cron job error:", error);
//     }
// });

// dont use corn, multer, socket.io etc (scheduler, file uploader, socket) for free hosting system.

export default app;