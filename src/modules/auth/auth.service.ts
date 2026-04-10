import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { Role } from "../../../generated/prisma/client";
import { RegisterPayload } from "./auth.validation";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAccessToken = (user: { id: string; email: string; role: Role }) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwtSecret as string,
    { expiresIn: "7d" }
  );
};

const register = async (payload: RegisterPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
      authProvider: "CREDENTIALS",
    },
  });

  const token = createAccessToken(user);

  return { user, token };
};

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.password) {
    throw new Error("This account uses social login. Please continue with Google.");
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new Error("Invalid credentials");
  }

  const token = createAccessToken(user);

  return { user, token };
};

const googleLogin = async (token: string) => {
  const ticket = (await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID!,
  })) as any;

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw new Error("Invalid Google token");
  }

  let user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: payload.name || "Google User",
        email: payload.email,
        password: null,
        avatar: payload.picture || null,
        role: "CUSTOMER",
        authProvider: "GOOGLE",
        providerId: payload.sub || null,
        isEmailVerified: true,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { email: payload.email },
      data: {
        avatar: user.avatar || payload.picture || null,
        providerId: user.providerId || payload.sub || null,
        isEmailVerified: true,
      },
    });
  }

  const accessToken = createAccessToken(user);

  return { user, token: accessToken };
};

export const authService = {
  register,
  login,
  googleLogin,
};