import { prisma } from "../../lib/prisma";

type CreateProviderProfilePayload = {
  restaurantName: string;
  address: string;
  phone: string;
  restaurantLogo?: string;
  bannerImage?: string;
  description?: string;
  cuisineType?: string;
  openingTime?: string;
  closingTime?: string;
  deliveryArea?: string;
};

type UpdateProviderProfilePayload = {
  restaurantName?: string;
  restaurantLogo?: string;
  bannerImage?: string;
  address?: string;
  phone?: string;
  description?: string;
  cuisineType?: string;
  openingTime?: string;
  closingTime?: string;
  deliveryArea?: string;
};


const createProviderProfile = async (
  userId: string,
  payload: CreateProviderProfilePayload
) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existingProfile) {
    throw new Error("PROVIDER_PROFILE_EXISTS");
  }

  return prisma.providerProfile.create({
    select: {
      userId: true,
      restaurantName: true,
      address: true,
      phone: true,
      restaurantLogo: true,
      bannerImage: true,
      description: true,
      cuisineType: true,
      openingTime: true,
      closingTime: true,
      deliveryArea: true,
    },
    data: { userId, ...payload },
  });
};

const getProviderDashboardStats = async (userId: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { userId },
    select: {
      id: true,
      restaurantName: true,
    },
  });

  if (!provider) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  const providerId = provider.id;

  const [
    totalMeals,
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    deliveredOrders,
    cancelledOrders,
    revenueAgg,
    recentOrders,
    providerMeals,
  ] = await Promise.all([
    prisma.meal.count({
      where: { providerId },
    }),

    prisma.order.count({
      where: { providerId },
    }),

    prisma.order.count({
      where: { providerId, status: "PLACED" },
    }),

    prisma.order.count({
      where: { providerId, status: "PREPARING" },
    }),

    prisma.order.count({
      where: { providerId, status: "READY" },
    }),

    prisma.order.count({
      where: { providerId, status: "DELIVERED" },
    }),

    prisma.order.count({
      where: { providerId, status: "CANCELLED" },
    }),

    prisma.order.aggregate({
      where: {
        providerId,
        status: "DELIVERED",
      },
      _sum: {
        totalPrice: true,
      },
    }),

    prisma.order.findMany({
      where: { providerId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        items: {
          include: {
            meal: {
              select: {
                id: true,
                title: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    }),

    prisma.meal.findMany({
      where: { providerId },
      select: {
        id: true,
        title: true,
        averageRating: true,
        totalReviews: true,
        orderItems: {
          select: {
            quantity: true,
            price: true,
          },
        },
      },
    }),
  ]);

  const totalReviews = providerMeals.reduce(
    (sum, meal) => sum + (meal.totalReviews || 0),
    0
  );

  const totalRatingValue = providerMeals.reduce(
    (sum, meal) => sum + (meal.averageRating || 0) * (meal.totalReviews || 0),
    0
  );

  const averageRating =
    totalReviews > 0 ? Number((totalRatingValue / totalReviews).toFixed(1)) : 0;

  const orderStatusDistribution = [
    { status: "PLACED", count: pendingOrders },
    { status: "PREPARING", count: preparingOrders },
    { status: "READY", count: readyOrders },
    { status: "DELIVERED", count: deliveredOrders },
    { status: "CANCELLED", count: cancelledOrders },
  ];

  const monthlyBase = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));
    return {
      key: `${date.getFullYear()}-${date.getMonth()}`,
      month: date.toLocaleString("en-US", { month: "short" }),
      year: date.getFullYear(),
      count: 0,
      revenue: 0,
    };
  });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const ordersForCharts = await prisma.order.findMany({
    where: {
      providerId,
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      createdAt: true,
      totalPrice: true,
      status: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  for (const order of ordersForCharts) {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const found = monthlyBase.find((item) => item.key === key);

    if (found) {
      found.count += 1;
      if (order.status === "DELIVERED") {
        found.revenue += Number(order.totalPrice || 0);
      }
    }
  }

  const monthlyOrders = monthlyBase.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  const monthlyRevenue = monthlyBase.map((item) => ({
    month: item.month,
    revenue: item.revenue,
  }));

  const topMeals = providerMeals
    .map((meal) => {
      const totalSold = meal.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      const revenue = meal.orderItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
      );

      return {
        mealId: meal.id,
        title: meal.title,
        totalSold,
        revenue,
        averageRating: meal.averageRating || 0,
        totalReviews: meal.totalReviews || 0,
      };
    })
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5);

  return {
    provider: {
      id: provider.id,
      restaurantName: provider.restaurantName,
    },
    overview: {
      totalMeals,
      totalOrders,
      pendingOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalRevenue: Number(revenueAgg._sum.totalPrice || 0),
      totalReviews,
      averageRating,
    },
    orderStatusDistribution,
    monthlyOrders,
    monthlyRevenue,
    topMeals,
    recentOrders,
  };
};

const getMyProviderProfile = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          bio: true,
          role: true,
          status: true,
        },
      },
      meals: true,
      orders: true,
    },
  });
};

const updateProviderProfile = async (
  userId: string,
  payload: UpdateProviderProfilePayload
) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  return prisma.providerProfile.update({
    where: { userId },
    data: {
      restaurantName: payload.restaurantName,
      restaurantLogo: payload.restaurantLogo,
      bannerImage: payload.bannerImage,
      address: payload.address,
      phone: payload.phone,
      description: payload.description,
      cuisineType: payload.cuisineType,
      openingTime: payload.openingTime,
      closingTime: payload.closingTime,
      deliveryArea: payload.deliveryArea,
    },
  });
};

const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    select: {
      id: true,
      restaurantName: true,
      restaurantLogo: true,
      bannerImage: true,
      address: true,
      phone: true,
      description: true,
      cuisineType: true,
      openingTime: true,
      closingTime: true,
      deliveryArea: true,
      isApproved: true,
      averageRating: true,
      totalReviews: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
};

const getProviderById = async (id: string) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          phone: true,
          address: true,
          bio: true,
          role: true,
          status: true,
        },
      },
      meals: true,
      orders: true,
    },
  });
};


const getProviderOrders = async (userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  return prisma.order.findMany({
    where: { providerId: providerProfile.id },
    include: {
      items: {
        include: { meal: true },
      },
      customer: true,
    },
    orderBy: { createdAt: "desc" },
  });
};


const updateOrderStatus = async (
  orderId: string,
  userId: string,
  status: "PREPARING" | "READY" | "DELIVERED"
) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("PROVIDER_PROFILE_NOT_FOUND");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      providerId: providerProfile.id,
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const ProviderService = {
  createProviderProfile,
  updateProviderProfile,
  getMyProviderProfile,
  getAllProviders,
  getProviderById,
  getProviderOrders,
  updateOrderStatus,
  getProviderDashboardStats,
};