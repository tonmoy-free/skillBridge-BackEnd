import { prisma } from "./lib/prisma";

async function run() {
    // const createUser = await prisma.user.create({
    //     data: {
    //         name: "tonmoy",
    //         email: "tonmoykhan.free@gmail.com",
    //         password: "12345",
    //     }
    // })
    // console.log("Created User:", createUser);

    //retrive all users
    const users = await prisma.user.findMany();
    console.log(users)
}

run();