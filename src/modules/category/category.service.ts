import { prisma } from "../../lib/prisma";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const createCategory = async (name: string) => {
  const existing = await prisma.category.findUnique({
    where: { name },
  });

  if (existing) {
    throw new Error("CATEGORY_ALREADY_EXISTS");
  }

  const slug = slugify(name);

  return prisma.category.create({
    data: {
      name,
      slug,
    },
  });
};

export const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
  });
};

export const updateCategory = async (id: string, name: string) => {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const slug = slugify(name);

  return prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });
};

export const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({
    where: { id },
    include: {
      meals: true,
    },
  });

  if (!existing) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  if (existing.meals.length > 0) {
    throw new Error("CATEGORY_HAS_MEALS");
  }

  return prisma.category.delete({
    where: { id },
  });
};