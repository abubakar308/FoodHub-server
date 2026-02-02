import { prisma } from "../../lib/prisma";

type OrderItemInput = {
  mealId: string;
  quantity: number;
};

const createOrder = async(customerId: string,
  items: OrderItemInput[],
  address: string,) =>{


    // fetch meals
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: items.map((i) => i.mealId) },
    },
    include: { provider: true },
  });

  console.log(meals)

  if (meals.length !== items.length) {
    throw new Error("Invalid meal selected");
  }

  // ensure same provider
  const providerId = meals[0]?.providerId;
  if (!providerId) {
    throw new Error("Invalid meal provider");
  }
  const sameProvider = meals.every((meal) => meal.providerId === providerId);

  if (!sameProvider) {
    throw new Error("You can order from only one provider");
  }

  // calculate total
  let totalPrice = 0;

  const orderItems = items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
    const price = meal.price * item.quantity;
    totalPrice += price;

    return {
      mealId: item.mealId,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  // Create order
  return prisma.order.create({
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
      items: {
        include: { meal: true },
      },
    },
  });

}
// Get customer orders
const getCustomerOrders = async (customerId: string) => {
  console.log(customerId)
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
const getOrderById = async (customerId: string, orderId: string) => {
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
    createOrder,
    getCustomerOrders,
    getOrderById
}