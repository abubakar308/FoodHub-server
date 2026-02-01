import { Request, Response } from "express";
import { OrderServices } from "./order.service";


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

export const OrderController = { createOrder, };