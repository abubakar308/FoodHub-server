
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

const updateProfile = async (userId: string, payload: {name?: string, phone?: string, avatar?: string, bio?: string, address?: string}) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: payload,
  });
  return user;
};


export const userService = {
    getProfile,
    updateProfile
  };