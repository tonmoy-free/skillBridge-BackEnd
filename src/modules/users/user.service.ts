import { User } from "../../../generated/prisma/client";
import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getAlluser = async ({
  search,
  status,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}: {
  search: string | undefined,
  status: UserStatus | undefined,
  page: number,
  limit: number,
  skip: number,
  sortBy: string,
  sortOrder: string
}) => {
  // 1. Construct the filter object
  const whereCondition: any = {};

  if (search) {
    whereCondition.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status) {
    whereCondition.status = status;
  }

  // 2. Fetch data and total count in parallel for better performance
  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where: whereCondition,
      skip: skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      // You can also include related data here
      include: {
        tutorProfile: true,
      }
    }),
    prisma.user.count({ where: whereCondition }),
  ]);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const updateUser = async (
  postId: string,
  data: Partial<Pick<User, "role" | "status">>, // User থেকে শুধু role ও status নিয়ে সেগুলোকে ঐচ্ছিক করা হয়েছে
  isAdmin: boolean
) => {
  const updateData = await prisma.user.findUniqueOrThrow({
    where: {
      id: postId
    },
    select: {
      id: true,
    }
  })

  if (!isAdmin) {
    throw new Error("You are unauthorized!")
  }

  // ১. ব্ল্যাঙ্ক ফিল্ডগুলো বাদ দিয়ে একটি নতুন অবজেক্ট তৈরি করুন
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== "")
  );

  // ২. যদি সব ফিল্ডই ব্ল্যাঙ্ক হয়, তবে আপডেট করার দরকার নেই
  if (Object.keys(filteredData).length === 0) {
    throw new Error("No valid data provided for update.");
  }

  const result = await prisma.user.update({
    where: {
      id: updateData.id
    },
    data: filteredData, // শুধু যেগুলোতে ভ্যালু আছে সেগুলোই আপডেট হবে
  })

  return result;
};

const deleteuser = async (id: string, isAdmin: boolean) => {
    const postData = await prisma.user.findUniqueOrThrow({
        where: {
            id: id
        },
        select: {
            id: true,
        }
    })

    return await prisma.user.delete({
        where: {
            id: id
        }
    })

}

export const userService = {
  getAlluser,
  updateUser,
  deleteuser
};