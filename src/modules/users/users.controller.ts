import { RequestHandler } from "express";
import { userService } from "./users.server";
import sendResponse from "../../utils/sendResponse";

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
console.log("req.user:", req.user);
console.log("req.body:", req.body);
  const user = await userService.updateProfile(req.user?.id as string, {
    name: req.body.name,
    phone: req.body.phone,
    avatar: req.body.avatar,
    bio: req.body.bio,
    address: req.body.address
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: user
  })
};


export const userController = {
  getProfile,
  updateProfile
};