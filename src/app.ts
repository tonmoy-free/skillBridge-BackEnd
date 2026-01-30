import express, { Application } from "express";
import { bookingRouter} from "./modules/booking/booking.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorProfileRouter } from "./modules/tutorProfile/tutorProfile.router";
import { classRouter } from "./modules/class/class.router";
import { subjectRouter } from "./modules/subject/subject.router";
import { categoryRouter } from "./modules/category/category.router";


const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/posts", bookingRouter);

app.use("/tutors/tutors-profile", tutorProfileRouter);

app.use("/class", classRouter);

app.use("/subject", subjectRouter);

app.use("/tutors/category", categoryRouter);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

export default app;