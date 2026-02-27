import { prisma } from "../../lib/prisma";
const addToCart = async (customerId, mealId) => {
    // 1️⃣ fetch meal
    const meal = await prisma.meal.findUnique({
        where: { id: mealId },
        select: { id: true, price: true, providerId: true },
    });
    if (!meal)
        throw new Error("Meal not found");
    // 2️⃣ find or create cart
    let cart = await prisma.cart.findFirst({
        where: { customerId },
        include: { items: true },
    });
    if (!cart) {
        cart = await prisma.cart.create({
            data: { customerId },
            include: { items: true },
        });
    }
    // 3️⃣ ensure same provider
    if (cart.items.length > 0) {
        const existingProvider = cart.items[0]?.providerId;
        if (existingProvider !== meal.providerId) {
            throw new Error("You can order from only one provider at a time");
        }
    }
    let quantity = 1;
    // 4️⃣ check existing item
    const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            mealId,
        },
    });
    // 5️⃣ update quantity
    if (existingItem) {
        return prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
        });
    }
    // 6️⃣ create new item
    return prisma.cartItem.create({
        data: {
            cartId: cart.id,
            mealId,
            providerId: meal.providerId,
            quantity: quantity,
            priceAtAddTime: meal.price,
        },
    });
};
const getMyCart = async (customerId) => {
    const cart = await prisma.cart.findFirst({
        where: { customerId },
        include: {
            items: {
                include: {
                    meal: true,
                },
            },
        },
    });
    if (!cart)
        return null;
    // 🔥 calculate total
    const totalPrice = cart.items.reduce((sum, item) => {
        return sum + Number(item.priceAtAddTime) * item.quantity;
    }, 0);
    return {
        ...cart,
        totalPrice,
    };
};
const updateQuantity = async (customerId, cartItemId, quantity) => {
    if (!Number.isInteger(quantity)) {
        throw new Error("Quantity must be integer");
    }
    // 🔎 find item first
    const item = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
            cart: {
                customerId,
            },
        },
    });
    if (!item) {
        throw new Error("Cart item not found");
    }
    // 🗑 delete if 0
    if (quantity < 1) {
        return prisma.cartItem.delete({
            where: { id: cartItemId },
        });
    }
    // 🔄 update
    return prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
    });
};
// const createOrder = async (customerId: string,
//   items: OrderItemInput[],
//   address: string,) => {
//   // fetch meals
//   const meals = await prisma.meal.findMany({
//     where: {
//       id: { in: items.map((i) => i.mealId) },
//     },
//     include: { provider: true },
//   });
//   if (meals.length !== items.length) {
//     throw new Error("Invalid meal selected");
//   }
//   // ensure same provider
//   const providerId = meals[0]?.providerId;
//   if (!providerId) {
//     throw new Error("Invalid meal provider");
//   }
//   const sameProvider = meals.every((meal) => meal.providerId === providerId);
//   if (!sameProvider) {
//     throw new Error("You can order from only one provider");
//   }
//   // calculate total
//   let totalPrice = 0;
//   const orderItems = items.map((item) => {
//     const meal = meals.find((m) => m.id === item.mealId)!;
//     const price = meal.price * item.quantity;
//     totalPrice += price;
//     return {
//       mealId: item.mealId,
//       quantity: item.quantity,
//       price: meal.price,
//     };
//   });
//   // Create order
//   return prisma.order.create({
//     data: {
//       customerId,
//       providerId,
//       address,
//       totalPrice,
//       items: {
//         create: orderItems,
//       },
//     },
//     include: {
//       items: {
//         include: { meal: true },
//       },
//     },
//   });
// }
// Get customer orders
const createOrder = async (customerId, address) => {
    const cart = await prisma.cart.findFirst({
        where: { customerId },
        include: {
            items: {
                include: { meal: true },
            },
        },
    });
    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const providerId = cart.items[0].meal.providerId;
    let totalPrice = 0;
    const orderItems = cart.items.map((item) => {
        const price = item.meal.price * item.quantity;
        totalPrice += price;
        return {
            mealId: item.mealId,
            quantity: item.quantity,
            price: item.meal.price,
        };
    });
    const order = await prisma.order.create({
        data: {
            customerId,
            providerId,
            address,
            totalPrice,
            items: {
                create: orderItems,
            },
        },
        include: {
            items: { include: { meal: true } },
        },
    });
    // clear cart after order
    await prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
    });
    return order;
};
const getCustomerOrders = async (customerId) => {
    console.log(customerId);
    return prisma.order.findMany({
        where: { customerId },
        include: {
            items: { include: { meal: true } },
            provider: true,
        },
        orderBy: { createdAt: "desc" },
    });
};
// Get order by id
const getOrderById = async (customerId, orderId) => {
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId,
        },
        include: {
            items: { include: { meal: true } },
            provider: true,
        },
    });
    if (!order) {
        throw new Error("Order not found");
    }
    return order;
};
export const OrderServices = {
    addToCart,
    getMyCart,
    updateQuantity,
    createOrder,
    getCustomerOrders,
    getOrderById
};
//# sourceMappingURL=order.service.js.map