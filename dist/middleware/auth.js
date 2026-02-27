import jwt from "jsonwebtoken";
import config from "../config";
import { prisma } from "../lib/prisma";
const auth = (...roles) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token required" });
        }
        const token = authHeader.startsWith("Bearer")
            ? authHeader.split(" ")[1]
            : authHeader;
        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            req.user = decoded;
            const userData = await prisma.user.findUnique({
                where: {
                    email: decoded.email
                }
            });
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: "Forbidden" });
            }
            if (userData?.status !== "ACTIVE") {
                throw new Error("Unauthorized!!");
            }
            next();
        }
        catch (errror) {
            return res.status(401).json({ message: errror.message });
        }
    };
};
export default auth;
//# sourceMappingURL=auth.js.map