import { Request, Response } from "express";
export declare const ProviderController: {
    createProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    getMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getProviders: (_req: Request, res: Response) => Promise<void>;
    getProvider: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateOrderStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=provider.controller.d.ts.map