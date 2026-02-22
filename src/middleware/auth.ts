import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload & { id: string; role: string };
    }
  }
}

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    try {
      const decoded = jwt.verify(token as string, config.jwtSecret as string) as any;

      req.user = decoded;

      const userData = await prisma.user.findUnique({
        where:{
          email:decoded.email
        }
      });

      console.log(userData)

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

         if(userData?.status !== "ACTIVE") {
        throw new Error("Unauthorized!!");
      }

      next();
    } catch(errror: any) {
      return res.status(401).json({ message:  errror.message});
    }
  };
};


export default auth;
