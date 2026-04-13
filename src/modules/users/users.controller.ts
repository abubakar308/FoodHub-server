import { RequestHandler } from "express";
import { userService } from "./users.server";
import sendResponse from "../../utils/sendResponse";
import { uploadToCloudinary } from "../../utils/upload";

const getProfile: RequestHandler = async (req, res) => {

  const user = await userService.getProfile(req.user?.id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile fetched successfully",
    data: user
  })
};


const updateProfile: RequestHandler = async (req, res) => {
  const imageUrl = req.file
    ? await uploadToCloudinary(req.file.buffer, "foodhub/users")
    : undefined;

  const user = await userService.updateProfile(req.user?.id as string, {
    name: req.body.name,
    phone: req.body.phone,
    avatar: imageUrl ?? req.body.avatar,
    bio: req.body.bio,
    address: req.body.address,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: user,
  });
};

export const getDashboardStats: RequestHandler = async (req, res) => {
  try {
    const result = await userService.getCustomerDashboardStats(req.user!.id);

    res.status(200).json({
      success: true,
      message: "Customer dashboard stats fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch customer dashboard stats",
    });
  }
};

export const userController = {
  getProfile,
  updateProfile,
  getDashboardStats
};