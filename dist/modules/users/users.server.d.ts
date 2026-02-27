import { User } from "../../../generated/prisma/client";
export declare const userService: {
    register: (payload: User) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login: (email: string, password: string) => Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            password: string;
            role: import("../../../generated/prisma/enums").Role;
            status: import("../../../generated/prisma/enums").UserStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    getProfile: (userId: string) => Promise<{
        providerProfile: {
            id: string;
            restaurantName: string;
            address: string;
            phone: string;
            userId: string;
        } | null;
    } & {
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("../../../generated/prisma/enums").Role;
        status: import("../../../generated/prisma/enums").UserStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
};
//# sourceMappingURL=users.server.d.ts.map