import express, { Application } from "express";
import { bookingRouter} from "./modules/booking/booking.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorProfileRouter } from "./modules/tutorProfile/tutorProfile.router";
import { classRouter } from "./modules/class/class.router";
import { subjectRouter } from "./modules/subject/subject.router";
import { categoryRouter } from "./modules/category/category.router";
import { assignTutorToCategoryRouter } from "./modules/assignTutorToCategory/assignTutorToCategory.router";
import { availabilityRouter } from "./modules/availability/availability.router";
import { reviewRouter } from "./modules/review/review.router";


const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/dashboard/booking", bookingRouter);

app.use("/tutors/tutors-profile", tutorProfileRouter);

app.use("/class", classRouter);

app.use("/subject", subjectRouter);

app.use("/tutors/category", categoryRouter);

app.use("/tutors/assign-tutor-to-category", assignTutorToCategoryRouter);

app.use("/tutors/availability", availabilityRouter);

app.use("/tutors/review", reviewRouter);


app.get("/", (req, res) => {
    res.send("Hello world!");
})

export default app;