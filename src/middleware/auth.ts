import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";

export enum UserRole {
  customer = "CUSTOMER",
  provider = "PROVIDER",
  admin = "ADMIN",
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string; role: string; email: string };
    }
  }
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    const bearerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    const cookieToken = req.cookies?.token;

    const token = bearerToken || cookieToken;

    if (!token) {
      return res.status(401).json({ message: "Token required" });
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload & { id: string; role: string; email: string };

      req.user = decoded;

      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      if (!userData) {
        return res.status(401).json({ message: "User not found" });
      }

      if (userData.status !== "ACTIVE") {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      next();
    } catch (error: any) {
      return res.status(401).json({ message: error.message || "Unauthorized" });
    }
  };
};

export default auth;