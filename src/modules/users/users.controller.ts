import { RequestHandler } from "express";
import { userService } from "./users.server";
import sendResponse from "../../utils/sendResponse";

const register: RequestHandler = async (req, res) => {

  try {
    const payload = req.body;
    const result = await userService.register(payload);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Register successfull",
      data: result,
    })

  } catch (error: any) {
    res.status(400).json({
      secces: false,
      error: "Registration failed",
      details: error.message
    })
  }
}

const login: RequestHandler = async (req, res) => {

  try {
    const { email, password } = req.body;
    const result = await userService.login(email, password);

       res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict", // none / strict / lax
    });

     sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "LogedIn successfull",
      data: result,
    })

  } catch (error: any) {
res.status(400).json({
      seccess: false,
      error: "Login failed",
      details: error.message
    })
  }
};


export const getProfile: RequestHandler = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(200).json({ success: true, message: "Profile fetched successfully", data: user });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const userController = {
  register,
  login,
  getProfile
};