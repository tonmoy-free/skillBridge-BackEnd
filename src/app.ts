import express, { Application } from "express";
import { bookingRouter} from "./modules/booking/booking.router";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorProfileRouter } from "./modules/tutorProfile/tutorProfile.router";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000",
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

app.use("/posts", bookingRouter);

app.use("/tutor-profiles", tutorProfileRouter);

app.get("/", (req, res) => {
    res.send("Hello world!");
})

export default app;