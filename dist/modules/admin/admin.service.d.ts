import { UserStatus } from "../../../generated/prisma/enums";
export declare const AdminService: {
    getAllUsers: () => Promise<{
        name: string;
        id: string;
        email: string;
        role: import("../../../generated/prisma/enums").Role;
        status: UserStatus;
        createdAt: Date;
        providerProfile: {
            restaurantName: string;
        } | null;
    }[]>;
    updateUserStatus: (userId: string, status: UserStatus) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllOrders: () => Promise<({
        customer: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("../../../generated/prisma/enums").Role;
            status: UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        provider: {
            id: string;
            restaurantName: string;
            address: string;
            phone: string;
            userId: string;
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
};
//# sourceMappingURL=admin.service.d.ts.map