import { RequestHandler } from "express";
import { userService } from "./users.server";

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

        res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,        // localhost এ false
      sameSite: "none",     // 🔥 cross origin এর জন্য MUST
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: data
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