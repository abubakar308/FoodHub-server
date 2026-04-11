import { prisma } from "../../lib/prisma";

type CreateMealPayload = {
  title: string;
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  categoryId: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  preparationTime?: number;
  calories?: number;
  tags?: string;
};

type UpdateMealPayload = {
  title?: string;
  shortDescription?: string;
  description?: string;
  ingredients?: string;
  price?: number;
  discountPrice?: number;
  imageUrl?: string;
  categoryId?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  preparationTime?: number;
  calories?: number;
  tags?: string;
};

type GetMealsQuery = {
  searchTerm?: string;
  categoryId?: string;
  minPrice?: string;
  maxPrice?: string;
  isAvailable?: string;
  isFeatured?: string;
  providerId?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const generateUniqueSlug = async (title: string) => {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingMeal = await prisma.meal.findFirst({
      where: { slug },
      select: { id: true },
    });

    if (!existingMeal) return slug;

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

const createMeal = async (userId: string, payload: CreateMealPayload) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true, isApproved: true },
  });

  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  if (!provider.isApproved) {
    throw new Error("PROVIDER_NOT_APPROVED");
  }

  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
    select: { id: true },
  });

  if (!category) {
    throw new Error("CATEGORY_NOT_FOUND");
  }

  const slug = await generateUniqueSlug(payload.title);

  return prisma.meal.create({
    data: {
      title: payload.title,
      slug,
      shortDescription: payload.shortDescription,
      description: payload.description,
      ingredients: payload.ingredients,
      price: payload.price,
      discountPrice: payload.discountPrice,
      imageUrl: payload.imageUrl,
      categoryId: payload.categoryId,
      providerId: provider.id,
      isAvailable: payload.isAvailable ?? true,
      isFeatured: payload.isFeatured ?? false,
      preparationTime: payload.preparationTime,
      calories: payload.calories,
      tags: payload.tags,
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
        },
      },
    },
  });
};

const getMeals = async (query: GetMealsQuery) => {
  const {
    searchTerm,
    categoryId,
    minPrice,
    maxPrice,
    isAvailable,
    isFeatured,
    providerId,
    sortBy = "createdAt",
    sortOrder = "desc",
    page = "1",
    limit = "8",
  } = query;

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 8;
  const skip = (currentPage - 1) * perPage;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          shortDescription: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          tags: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          provider: {
            restaurantName: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  if (providerId) {
    andConditions.push({
      providerId,
    });
  }

  if (minPrice || maxPrice) {
    andConditions.push({
      price: {
        ...(minPrice ? { gte: Number(minPrice) } : {}),
        ...(maxPrice ? { lte: Number(maxPrice) } : {}),
      },
    });
  }

  if (isAvailable !== undefined) {
    if (isAvailable === "true" || isAvailable === "false") {
      andConditions.push({
        isAvailable: isAvailable === "true",
      });
    }
  }

  if (isFeatured !== undefined) {
    if (isFeatured === "true" || isFeatured === "false") {
      andConditions.push({
        isFeatured: isFeatured === "true",
      });
    }
  }

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const allowedSortFields = [
    "createdAt",
    "price",
    "title",
    "averageRating",
  ];

  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  const finalSortOrder = sortOrder === "asc" ? "asc" : "desc";

  const meals = await prisma.meal.findMany({
    where: whereConditions,
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          averageRating: true,
          totalReviews: true,
        },
      },
      reviews: {
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      [finalSortBy]: finalSortOrder,
    },
    skip,
    take: perPage,
  });

  const total = await prisma.meal.count({
    where: whereConditions,
  });

  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage),
    },
    data: meals,
  };
};

const getMealById = async (id: string) => {
  return prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
              phone: true,
            },
          },
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

const updateMeal = async (
  mealId: string,
  data: UpdateMealPayload,
  userId: string
) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  const mealData = await prisma.meal.findUnique({
    where: { id: mealId },
    select: {
      id: true,
      providerId: true,
      title: true,
    },
  });

  if (!mealData) {
    throw new Error("MEAL_NOT_FOUND");
  }

  if (mealData.providerId !== provider.id) {
    throw new Error("UNAUTHORIZED_UPDATE");
  }

  let updatedSlug: string | undefined = undefined;

  if (data.title && data.title !== mealData.title) {
    updatedSlug = await generateUniqueSlug(data.title);
  }

  if (data.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      select: { id: true },
    });

    if (!category) {
      throw new Error("CATEGORY_NOT_FOUND");
    }
  }

  const result = await prisma.meal.update({
    where: {
      id: mealData.id,
    },
    data: {
      ...data,
      ...(updatedSlug ? { slug: updatedSlug } : {}),
    },
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
        },
      },
    },
  });

  return result;
};

const deleteMeal = async (mealId: string, userId: string) => {
  const mealData = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
    select: {
      id: true,
      providerId: true,
    },
  });

  if (!mealData) throw new Error("MEAL_NOT_FOUND");

  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  if (mealData.providerId !== provider.id) {
    throw new Error("UNAUTHORIZED_DELETE");
  }

  return prisma.meal.delete({
    where: { id: mealId },
  });
};

export const MealService = {
  createMeal,
  getMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};