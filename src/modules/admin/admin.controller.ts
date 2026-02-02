import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await AdminService.getAllUsers();
    res.json({ success: true, data: users });
  } catch {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const user = await AdminService.updateUserStatus(id as string, status);

    res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to update user status",
    });
  }
};


const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await AdminService.getAllOrders();
    res.json({ success: true, data: orders });
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};


export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getAllOrders
}