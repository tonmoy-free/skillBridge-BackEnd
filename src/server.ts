import app from "./app";
import { prisma } from "./lib/prisma"

const PORT = process.env.PORT || 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect(); //if error disconnect from prisma
        process.exit(1); //procee to exit from all
    }
}

main();