import { Request, Response } from "express";
export declare const AdminController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUserStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getAllOrders: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=admin.controller.d.ts.map