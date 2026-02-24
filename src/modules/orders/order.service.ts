import { prisma } from "../../lib/prisma";

type OrderItemInput = {
  mealId: string;
  quantity: number;
};


const addToCart = async (
  customerId: string,
  mealId: string,
  quantity: number
) => {

  // 1️⃣ fetch meal
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
    select: { id: true, price: true, providerId: true },
  });

  if (!meal) throw new Error("Meal not found");

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
      quantity,
      priceAtAddTime: meal.price,
    },
  });
};



const createOrder = async (customerId: string,
  items: OrderItemInput[],
  address: string,) => {

  // fetch meals
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: items.map((i) => i.mealId) },
    },
    include: { provider: true },
  });

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
  addToCart,
  createOrder,
  getCustomerOrders,
  getOrderById
}