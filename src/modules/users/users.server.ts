
import { prisma } from "../../lib/prisma";

const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { providerProfile: true },
  });

  if (!user) throw new Error("User not found");

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

const updateProfile = async (userId: string, payload: { name?: string, phone?: string, avatar?: string, bio?: string, address?: string }) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });
  return user;
};



const getCustomerDashboardStats = async (userId: string) => {
  const [
    totalOrders,
    pendingOrders,
    preparingOrders,
    readyOrders,
    deliveredOrders,
    cancelledOrders,
    spendingAgg,
    recentOrders,
    wishlistItems,
  ] = await Promise.all([
    prisma.order.count({
      where: { customerId: userId },
    }),

    prisma.order.count({
      where: { customerId: userId, status: "PLACED" },
    }),

    prisma.order.count({
      where: { customerId: userId, status: "PREPARING" },
    }),

    prisma.order.count({
      where: { customerId: userId, status: "READY" },
    }),

    prisma.order.count({
      where: { customerId: userId, status: "DELIVERED" },
    }),

    prisma.order.count({
      where: { customerId: userId, status: "CANCELLED" },
    }),

    prisma.order.aggregate({
      where: {
        customerId: userId,
        status: "DELIVERED",
      },
      _sum: {
        totalPrice: true,
      },
    }),

    prisma.order.findMany({
      where: { customerId: userId },
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        provider: {
          select: {
            id: true,
            restaurantName: true,
            restaurantLogo: true,
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

    prisma.wishlist.findMany({
      where: { userId },
      take: 5,
      include: {
        meal: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            price: true,
            discountPrice: true,
            averageRating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

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
      amount: 0,
    };
  });

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const chartOrders = await prisma.order.findMany({
    where: {
      customerId: userId,
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

  for (const order of chartOrders) {
    const date = new Date(order.createdAt);
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const found = monthlyBase.find((item) => item.key === key);

    if (found) {
      found.count += 1;
      if (order.status === "DELIVERED") {
        found.amount += Number(order.totalPrice || 0);
      }
    }
  }

  const monthlyOrders = monthlyBase.map((item) => ({
    month: item.month,
    count: item.count,
  }));

  const monthlySpending = monthlyBase.map((item) => ({
    month: item.month,
    amount: item.amount,
  }));

  return {
    overview: {
      totalOrders,
      pendingOrders,
      preparingOrders,
      readyOrders,
      deliveredOrders,
      cancelledOrders,
      totalSpent: Number(spendingAgg._sum.totalPrice || 0),
      wishlistItems: wishlistItems.length,
    },
    orderStatusDistribution,
    monthlyOrders,
    monthlySpending,
    recentOrders,
    wishlistItems,
  };
};



export const userService = {
  getProfile,
  updateProfile,
  getCustomerDashboardStats
};