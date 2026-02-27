import { Request, Response } from "express";
export declare const OrderController: {
    addToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMyCart: (req: Request, res: Response) => Promise<void>;
    updateQuantity: (req: Request, res: Response) => Promise<void>;
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMyOrders: (req: Request, res: Response) => Promise<void>;
    getOrderById: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=order.controller.d.ts.map