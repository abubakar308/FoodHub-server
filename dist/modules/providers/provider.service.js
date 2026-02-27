import { prisma } from "../../lib/prisma";
const createProviderProfile = async (userId, restaurantName, address, phone) => {
    const existingProfile = await prisma.providerProfile.findUnique({
        where: { userId },
    });
    if (existingProfile) {
        throw new Error("PROVIDER_PROFILE_EXISTS");
    }
    return prisma.providerProfile.create({
        data: {
            userId,
            restaurantName,
            address,
            phone
        },
    });
};
const getMyProviderProfile = async (userId) => {
    return prisma.providerProfile.findUnique({
        where: { userId },
        include: {
            meals: true,
        },
    });
};
const getAllProviders = async () => {
    return prisma.providerProfile.findMany({
        select: {
            id: true,
            restaurantName: true,
            address: true,
            phone: true
        },
    });
};
const getProviderById = async (id) => {
    return prisma.providerProfile.findUnique({
        where: { id },
        include: {
            meals: true,
        },
    });
};
const getProviderOrders = async (providerId) => {
    return prisma.order.findMany({
        where: { providerId },
        include: {
            items: {
                include: { meal: true },
            },
            customer: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
const updateOrderStatus = async (orderId, providerId, status) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            providerId,
        },
    });
    if (!order) {
        throw new Error("ORDER_NOT_FOUND");
    }
    return prisma.order.update({
        where: { id: orderId },
        data: { status },
    });
};
export const ProviderService = {
    createProviderProfile,
    getMyProviderProfile,
    getAllProviders,
    getProviderById,
    getProviderOrders,
    updateOrderStatus
};
//# sourceMappingURL=provider.service.js.map