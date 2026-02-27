export declare const OrderServices: {
    addToCart: (customerId: string, mealId: string) => Promise<{
        id: string;
        providerId: string;
        cartId: string;
        mealId: string;
        quantity: number;
        priceAtAddTime: import("@prisma/client-runtime-utils").Decimal;
    }>;
    getMyCart: (customerId: string) => Promise<{
        totalPrice: number;
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
            providerId: string;
            cartId: string;
            mealId: string;
            quantity: number;
            priceAtAddTime: import("@prisma/client-runtime-utils").Decimal;
        })[];
        id: string;
        createdAt: Date;
        customerId: string;
    } | null>;
    updateQuantity: (customerId: string, cartItemId: string, quantity: number) => Promise<{
        id: string;
        providerId: string;
        cartId: string;
        mealId: string;
        quantity: number;
        priceAtAddTime: import("@prisma/client-runtime-utils").Decimal;
    }>;
    createOrder: (customerId: string, address: string) => Promise<{
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
    }>;
    getCustomerOrders: (customerId: string) => Promise<({
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
    getOrderById: (customerId: string, orderId: string) => Promise<{
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
    }>;
};
//# sourceMappingURL=order.service.d.ts.map