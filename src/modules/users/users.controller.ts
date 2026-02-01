import { RequestHandler } from "express";
import { userService } from "./users.server";
import { prisma } from "../../lib/prisma";

const register: RequestHandler = async (req, res) => {

  try {
    const payload = req.body;
    const user = await userService.register(payload);

    res.status(201).json({
      success: true,
      message: "Register successfull",
      data: user
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
    const data = await userService.login(email, password);

    res.status(200).json({
      message: "Logged in successfully",
      data: data
    })
  } catch (error: any) {
res.status(400).json({
      secces: false,
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