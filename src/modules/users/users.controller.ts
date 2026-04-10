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

  console.log(req.body)
  const user = await userService.updateProfile(req.user?.id as string, req.body);

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