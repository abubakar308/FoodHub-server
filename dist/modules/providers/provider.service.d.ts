export declare const ProviderService: {
    createProviderProfile: (userId: string, restaurantName: string, address: string, phone: string) => Promise<{
        id: string;
        restaurantName: string;
        address: string;
        phone: string;
        userId: string;
    }>;
    getMyProviderProfile: (userId: string) => Promise<({
        meals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            title: string;
            description: string | null;
            price: number;
            imageUrl: string | null;
            isAvailable: boolean;
            categoryId: string;
        }[];
    } & {
        id: string;
        restaurantName: string;
        address: string;
        phone: string;
        userId: string;
    }) | null>;
    getAllProviders: () => Promise<{
        id: string;
        restaurantName: string;
        address: string;
        phone: string;
    }[]>;
    getProviderById: (id: string) => Promise<({
        meals: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            providerId: string;
            title: string;
            description: string | null;
            price: number;
            imageUrl: string | null;
            isAvailable: boolean;
            categoryId: string;
        }[];
    } & {
        id: string;
        restaurantName: string;
        address: string;
        phone: string;
        userId: string;
    }) | null>;
    getProviderOrders: (providerId: string) => Promise<({
        customer: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        items: ({
            meal: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                providerId: string;
                title: string;
                description: string | null;
                price: number;
                imageUrl: string | null;
                isAvailable: boolean;
                categoryId: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            mealId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        customerId: string;
        providerId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    })[]>;
    updateOrderStatus: (orderId: string, providerId: string, status: "PREPARING" | "READY" | "DELIVERED") => Promise<{
        id: string;
        status: import("../../../generated/prisma/enums").OrderStatus;
        createdAt: Date;
        updatedAt: Date;
        address: string;
        customerId: string;
        providerId: string;
        totalPrice: import("@prisma/client-runtime-utils").Decimal;
    }>;
};
//# sourceMappingURL=provider.service.d.ts.map