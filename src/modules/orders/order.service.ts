import { prisma } from "../../lib/prisma";
import { OrderStatus, PaymentMethod, PaymentStatus } from "../../../generated/prisma/client";

const addToCart = async (customerId: string, mealId: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
    select: {
      id: true,
      price: true,
      discountPrice: true,
      providerId: true,
      isAvailable: true,
    },
  });

  if (!meal) {
    throw new Error("MEAL_NOT_FOUND");
  }

  if (!meal.isAvailable) {
    throw new Error("MEAL_NOT_AVAILABLE");
  }

  let cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: {
            select: {
              providerId: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
      include: {
        items: {
          include: {
            meal: {
              select: {
                providerId: true,
              },
            },
          },
        },
      },
    });
  }

  if (cart.items.length > 0) {
    const existingProviderId = cart.items[0]?.meal.providerId;

    if (existingProviderId !== meal.providerId) {
      throw new Error("ONE_PROVIDER_ONLY");
    }
  }

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId,
    },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + 1,
      },
      include: {
        meal: true,
      },
    });
  }
  const finalPrice =
    meal.discountPrice && Number(meal.discountPrice) > 0
      ? meal.discountPrice
      : meal.price;

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      quantity: 1,
      priceAtAddTime: finalPrice
    },
    include: {
      meal: true,
    },
  });
};


const getMyCart = async (customerId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: {
            include: {
              category: true,
              provider: {
                select: {
                  id: true,
                  restaurantName: true,
                  restaurantLogo: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!cart) return null;

  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + Number(item.priceAtAddTime) * item.quantity;
  }, 0);

  return {
    ...cart,
    totalPrice,
  };
};

const updateQuantity = async (
  customerId: string,
  cartItemId: string,
  quantity: number
) => {
  if (!Number.isInteger(quantity)) {
    throw new Error("QUANTITY_MUST_BE_INTEGER");
  }

  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        customerId,
      },
    },
    include: {
      meal: true,
    },
  });

  if (!item) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }

  if (quantity < 1) {
    return prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  return prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
    include: {
      meal: true,
    },
  });
};

const removeCartItem = async (customerId: string, cartItemId: string) => {
  const item = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        customerId,
      },
    },
  });

  if (!item) {
    throw new Error("CART_ITEM_NOT_FOUND");
  }

  return prisma.cartItem.delete({
    where: { id: cartItemId },
  });
};

const clearCart = async (customerId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
  });

  if (!cart) {
    throw new Error("CART_NOT_FOUND");
  }

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return null;
};

const createOrder = async (
  customerId: string,
  payload: {
    address: string;
    phone?: string;
    notes?: string;
    paymentMethod?: PaymentMethod;
  }
) => {
  const cart = await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("CART_IS_EMPTY");
  }

  const providerId = cart.items[0]?.meal.providerId;

  if (!providerId) {
    throw new Error("INVALID_PROVIDER");
  }

  const sameProvider = cart.items.every(
    (item) => item.meal.providerId === providerId
  );

  if (!sameProvider) {
    throw new Error("ONE_PROVIDER_ONLY");
  }

  let totalPrice = 0;

  const orderItems = cart.items.map((item) => {
    const linePrice = Number(item.priceAtAddTime) * item.quantity;
    totalPrice += linePrice;

    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: item.priceAtAddTime,
    };
  });

  const order = await prisma.order.create({
    data: {
      customerId,
      providerId,
      address: payload.address,
      phone: payload.phone,
      notes: payload.notes,
      status: OrderStatus.PLACED,
      paymentStatus: PaymentStatus.UNPAID,
      paymentMethod: payload.paymentMethod ?? PaymentMethod.CASH_ON_DELIVERY,
      totalPrice,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
        },
      },
    },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return order;
};

const getCustomerOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          phone: true,
          address: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (customerId: string, orderId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
          restaurantLogo: true,
          phone: true,
          address: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("ORDER_NOT_FOUND");
  }

  return order;
};

export const OrderServices = {
  addToCart,
  getMyCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  createOrder,
  getCustomerOrders,
  getOrderById,
};