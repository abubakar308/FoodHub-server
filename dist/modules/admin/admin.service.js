import { prisma } from "../../lib/prisma";
const getAllUsers = async () => {
    return prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            providerProfile: {
                select: {
                    restaurantName: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
const updateUserStatus = async (userId, status) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    return prisma.user.update({
        where: { id: userId },
        data: { status },
    });
};
const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            customer: true,
            provider: true,
            items: {
                include: { meal: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });
};
export const AdminService = {
    getAllUsers,
    updateUserStatus,
    getAllOrders
};
//# sourceMappingURL=admin.service.js.map