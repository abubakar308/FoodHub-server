import { Request } from "express";

export interface IProviderProfilePayload {
    restaurantName: string;
    restaurantLogo?: string;
    bannerImage?: string;
    address: string;
    phone: string;
    description?: string;
    cuisineType?: string;
    openingTime?: string;
    closingTime?: string;
    deliveryArea?: string;
}

export interface IAuthUser {
    id: string;
    email?: string;
    role?: string;
}

export interface IProviderFilesRequest extends Request {
    user?: IAuthUser;
    files?: {
        bannerImage?: Express.Multer.File[];
        restaurantLogo?: Express.Multer.File[];
    };
}