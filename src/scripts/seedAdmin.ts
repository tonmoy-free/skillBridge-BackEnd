import { prisma } from "../lib/prisma";
import { UserRole } from "../middleware/auth";

async function seedAdmin() {
    try {
        const adminData = {
            name: "Admin User",
            email: "admin@admin.com",
            role: UserRole.ADMIN,
            password: "admin12345"
        }
        console.log(adminData)

        // check if admin user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: adminData.email },
        });

        if (existingUser) {
            console.log(" Admin user already exists. Skipping seed.");
            return;
        }

        //  create admin via auth API
        // const res = await fetch(
        //     "http://localhost:3000/api/auth/sign-up/email",
        //     {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Origin": "http://localhost:3000"
        //         },
        //         body: JSON.stringify(adminData),
        //     }
        // );

        const res = await fetch(
            `${process.env.APP_URL}/api/auth/sign-up/email`, // সরাসরি .env থেকে আসবে
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": process.env.APP_URL || "http://localhost:3000" // অরিজিন-ও .env থেকে
                },
                body: JSON.stringify(adminData),
            }
        );

        if (res.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email
                },
                data: {
                    emailVerified: true
                },
            })
        }

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Failed to create admin");
        }

        console.log(" Admin user seeded successfully:", data);
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
}

seedAdmin()