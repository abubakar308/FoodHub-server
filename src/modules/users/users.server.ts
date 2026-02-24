
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { User } from "../../../generated/prisma/client";


const register = async (payload: User) => {

      if (!["CUSTOMER", "PROVIDER"].includes(payload.role)) {
    throw new Error("Only CUSTOMER and PROVIDER can register");
  }

  const hashPassword = await bcrypt.hash(payload.password, 8);

  const user = await prisma.user.create({
    data: { ...payload, password: hashPassword },
  });

  return user;

};


const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid user");

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new Error("Invalid Password");

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );

  return {user, token};
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { providerProfile: true },
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const userService = {
   register,
    login,
    getProfile
  };