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

export const userService = {
  getAlluser,
};