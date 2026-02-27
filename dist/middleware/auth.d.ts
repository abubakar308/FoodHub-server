import { Request, Response, NextFunction } from "express";
import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user: JwtPayload & {
                id: string;
                role: string;
            };
        }
    }
}
declare const auth: (...roles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default auth;
//# sourceMappingURL=auth.d.ts.map