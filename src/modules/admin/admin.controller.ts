import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllUsers(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.updateUserStatus(
      req.params.id as string,
      req.body.status
    );

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "USER_NOT_FOUND"
          ? "User not found"
          : error.message || "Failed to update user status",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllOrders(req.query as any);

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch orders",
    });
  }
};

const getAllProviders = async (_req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllProviders();

    return res.status(200).json({
      success: true,
      message: "Providers fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch providers",
    });
  }
};

const approveProvider = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.approveProvider(
      req.params.id,
      Boolean(req.body.isApproved)
    );

    return res.status(200).json({
      success: true,
      message: "Provider approval updated successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "PROVIDER_NOT_FOUND"
          ? "Provider not found"
          : error.message || "Failed to update provider approval",
    });
  }
};

const getAllMeals = async (_req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllMeals();

    return res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch meals",
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.deleteMeal(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message === "MEAL_NOT_FOUND"
          ? "Meal not found"
          : error.message || "Failed to delete meal",
    });
  }
};

const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    const result = await AdminService.getDashboardStats();

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch dashboard stats",
    });
  }
};

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllProviders,
  approveProvider,
  getAllMeals,
  deleteMeal,
  getAllOrders,
  getDashboardStats,
};