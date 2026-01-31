import { prisma } from "../../lib/prisma";

const createProviderProfile = async (
  userId: string,
  restaurantName: string,
  address: string,
  phone: string
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
      restaurantName,
      address,
      phone
    },
  });
};


const getMyProviderProfile = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: { userId },
    include: {
      meals: true,
    },
  });
};

export const providService = {
    createProviderProfile,
    getMyProviderProfile
}