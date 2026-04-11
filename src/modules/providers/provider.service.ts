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
    data: {
      userId,
      restaurantName: payload.restaurantName,
      address: payload.address,
      phone: payload.phone,
      restaurantLogo: payload.restaurantLogo,
      bannerImage: payload.bannerImage,
      description: payload.description,
      cuisineType: payload.cuisineType,
      openingTime: payload.openingTime,
      closingTime: payload.closingTime,
      deliveryArea: payload.deliveryArea,
    },
  });
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
};