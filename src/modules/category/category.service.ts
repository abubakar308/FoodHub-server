import { prisma } from "../../lib/prisma";

export const createCategory = async (name: string) => {
    console.log(name)
  return prisma.category.create({
    data: { name },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};