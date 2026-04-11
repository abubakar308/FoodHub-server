import { UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

type GetUsersQuery = {
  searchTerm?: string;
  role?: string;
  status?: string;
  page?: string;
  limit?: string;
};

type GetOrdersQuery = {
  status?: string;
  paymentStatus?: string;
  page?: string;
  limit?: string;
};

const getAllUsers = async (query: GetUsersQuery) => {
  const {
    searchTerm,
    role,
    status,
    page = "1",
    limit = "10",
  } = query;

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const skip = (currentPage - 1) * perPage;

  const andConditions: any[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        {
          providerProfile: {
            restaurantName: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (role) {
    andConditions.push({ role });
  }

  if (status) {
    andConditions.push({ status });
  }

  const where = andConditions.length ? { AND: andConditions } : {};

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      avatar: true,
      phone: true,
      address: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          id: true,
          restaurantName: true,
          isApproved: true,
          restaurantLogo: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: perPage,
  });

  const total = await prisma.user.count({ where });

  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage),
    },
    data: users,
  };
};

const updateUserStatus = async (userId: string, status: UserStatus) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { status },
  });
};

const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          status: true,
        },
      },
      meals: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const approveProvider = async (providerId: string, isApproved: boolean) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!provider) {
    throw new Error("PROVIDER_NOT_FOUND");
  }

  return prisma.providerProfile.update({
    where: { id: providerId },
    data: { isApproved },
  });
};

const getAllMeals = async () => {
  return prisma.meal.findMany({
    include: {
      category: true,
      provider: {
        select: {
          id: true,
          restaurantName: true,
          isApproved: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const deleteMeal = async (mealId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("MEAL_NOT_FOUND");
  }

  return prisma.meal.delete({
    where: { id: mealId },
  });
};

const getAllOrders = async (query: GetOrdersQuery) => {
  const {
    status,
    paymentStatus,
    page = "1",
    limit = "10",
  } = query;

  const currentPage = Number(page) || 1;
  const perPage = Number(limit) || 10;
  const skip = (currentPage - 1) * perPage;

  const andConditions: any[] = [];

  if (status) {
    andConditions.push({ status });
  }

  if (paymentStatus) {
    andConditions.push({ paymentStatus });
  }

  const where = andConditions.length ? { AND: andConditions } : {};

  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          phone: true,
          address: true,
        },
      },
      items: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    skip,
    take: perPage,
  });

  const total = await prisma.order.count({ where });

  return {
    meta: {
      page: currentPage,
      limit: perPage,
      total,
      totalPage: Math.ceil(total / perPage),
    },
    data: orders,
  };
};

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalProviders,
    totalMeals,
    totalOrders,
    activeUsers,
    pendingOrders,
    deliveredOrders,
    totalRevenueAgg,
    recentOrders,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.providerProfile.count(),
    prisma.meal.count(),
    prisma.order.count(),
    prisma.user.count({
      where: { status: "ACTIVE" },
    }),
    prisma.order.count({
      where: { status: "PLACED" },
    }),
    prisma.order.count({
      where: { status: "DELIVERED" },
    }),
    prisma.order.aggregate({
      _sum: { totalPrice: true },
    }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: { name: true, email: true },
        },
        provider: {
          select: { restaurantName: true },
        },
      },
    }),
  ]);

  return {
    overview: {
      totalUsers,
      totalProviders,
      totalMeals,
      totalOrders,
      activeUsers,
      pendingOrders,
      deliveredOrders,
      totalRevenue: Number(totalRevenueAgg._sum.totalPrice || 0),
    },
    recentOrders,
  };
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllProviders,
  approveProvider,
  getAllMeals,
  deleteMeal,
  getAllOrders,
  getDashboardStats,
};