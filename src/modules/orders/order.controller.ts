import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const addToCart = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    const { mealId } = req.body;

    if (!mealId) {
      return res.status(400).json({
        success: false,
        message: "mealId is required",
      });
    }

    const result = await OrderServices.addToCart(customerId, mealId);

    return res.status(200).json({
      success: true,
      message: "Added to cart successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "MEAL_NOT_FOUND"
          ? "Meal not found"
          : error.message === "MEAL_NOT_AVAILABLE"
            ? "Meal is not available"
            : error.message === "ONE_PROVIDER_ONLY"
              ? "You can order from only one provider at a time"
              : error.message || "Failed to add to cart",
    });
  }
};

const getMyCart = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;

    const cart = await OrderServices.getMyCart(customerId);

    return res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch cart",
    });
  }
};

const updateQuantity = async (req: Request, res: Response) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;
    const customerId = req.user!.id;

    if (quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "quantity is required",
      });
    }

    const result = await OrderServices.updateQuantity(
      customerId,
      cartItemId as string,
      Number(quantity)
    );

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "QUANTITY_MUST_BE_INTEGER"
          ? "Quantity must be an integer"
          : error.message === "CART_ITEM_NOT_FOUND"
            ? "Cart item not found"
            : error.message || "Failed to update cart item",
    });
  }
};

const removeCartItem = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    const cartItemId = req.params.id;

    const result = await OrderServices.removeCartItem(customerId, cartItemId as string);

    return res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "CART_ITEM_NOT_FOUND"
          ? "Cart item not found"
          : error.message || "Failed to remove cart item",
    });
  }
};

const clearCart = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;

    await OrderServices.clearCart(customerId);

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: null,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "CART_NOT_FOUND"
          ? "Cart not found"
          : error.message || "Failed to clear cart",
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const customerId = req.user!.id;
    const { address, phone, notes, paymentMethod } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const order = await OrderServices.createOrder(customerId, {
      address,
      phone,
      notes,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "CART_IS_EMPTY"
          ? "Cart is empty"
          : error.message === "INVALID_PROVIDER"
            ? "Invalid provider"
            : error.message === "ONE_PROVIDER_ONLY"
              ? "You can order from only one provider at a time"
              : error.message || "Failed to create order",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getCustomerOrders(req.user!.id);

    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderServices.getOrderById(
      req.user!.id,
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message:
        error.message === "ORDER_NOT_FOUND"
          ? "Order not found"
          : error.message || "Failed to fetch order",
    });
  }
};

export const OrderController = {
  addToCart,
  getMyCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  createOrder,
  getMyOrders,
  getOrderById,
};