import { RequestHandler } from "express";
import { authService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

const setAuthCookie = (res: any, token: string) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });
};

const register: RequestHandler = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    setAuthCookie(res, result.token);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    setAuthCookie(res, result.token);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const googleLogin: RequestHandler = async (req, res, next) => {
  try {
    const { token } = req.body;
    const result = await authService.googleLogin(token);
    setAuthCookie(res, result.token);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Google login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const authController = {
  register,
  login,
  googleLogin,
};