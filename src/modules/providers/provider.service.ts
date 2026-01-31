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


export const providService = {
    createProviderProfile
}