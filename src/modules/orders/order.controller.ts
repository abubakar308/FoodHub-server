import { Request, Response } from "express";
import { OrderServices } from "./order.service";


const addToCart = async (req: Request, res: Response) => {
  try {
    const customerId = req.user.id; // from auth middleware
    const { mealId, quantity } = req.body;

    const result = await OrderServices.addToCart(customerId, mealId, quantity);

    res.status(200).json({
      success: true,
      message: "Added to cart",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const createOrder = async (req: Request, res: Response) => {
  try {

    const { items, address } = req.body;

    if (!items || !items.length || !address) {
      return res.status(400).json({
        message: "Items and address are required",
      });
    }

    const order = await OrderServices.createOrder(req.user!.id, items, address);

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create order",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {

    console.log(req.user)
    const orders = await OrderServices.getCustomerOrders(req.user!.id);

    res.json({
      success: true,
      data: orders,
    });
  } catch {
    res.status(500).json({ 
      message: "Failed to fetch orders" 
    });
  }
};


const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderServices.getOrderById(
      req.user!.id,
      req.params.id as string,
    );

    res.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message || "Order not found",
    });
  }
};

export const OrderController = { 
  addToCart,
  createOrder, 
  getMyOrders,
  getOrderById
};